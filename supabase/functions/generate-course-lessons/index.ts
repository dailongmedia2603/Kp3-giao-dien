// @ts-nocheck
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const DEFAULT_COURSE_OUTLINE_PROMPT = `You are an expert instructional designer. Your task is to generate a list of 3-5 specific, actionable lesson titles for a single chapter of an online course.

**Course Context:**
- **Target Audience & Outcome:** {{customer_profile}}
- **Major Steps (Overall Course):** {{major_steps}}
- **Minor Steps (Detailed Actions):** {{minor_steps}}

**Your Task:**
Based on the context above, generate lesson titles for the following chapter:
- **Chapter Title:** {{chapter_title}}

**Output Format:**
Return ONLY a valid JSON array of strings. Each string is a lesson title.
Example: ["Lesson Title 1", "Lesson Title 2", "Lesson Title 3"]`;

// Helper to Base64URL encode
function base64url(source: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(source)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

// Helper to import a PEM-formatted key
async function importKey(pem: string) {
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = pem.replace(pemHeader, "").replace(pemFooter, "").replace(/\s/g, "");
  const binaryDer = atob(pemContents);
  const keyData = new Uint8Array(binaryDer.length);
  for (let i = 0; i < binaryDer.length; i++) {
    keyData[i] = binaryDer.charCodeAt(i);
  }
  return await crypto.subtle.importKey(
    "pkcs8",
    keyData,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    true,
    ["sign"]
  );
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const serviceClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) throw new Error('Unauthorized: User not found.');

    const { customerProfile, majorSteps, minorSteps, chapterTitle } = await req.json();
    if (!customerProfile || !majorSteps || !minorSteps || !chapterTitle) {
      throw new Error('Bad Request: Missing required context for generation.');
    }

    const { data: apiConfig, error: configError } = await serviceClient
      .from('api_configurations')
      .select('project_id, location, model, service_account_json, course_outline_prompt')
      .eq('user_id', user.id)
      .single();

    if (configError || !apiConfig) {
      throw new Error('API configuration not found. Please save your settings first.');
    }

    const { project_id, location, model, service_account_json, course_outline_prompt } = apiConfig;
    if (!project_id || !location || !model || !service_account_json) {
      throw new Error('Incomplete API configuration.');
    }

    const serviceAccount = JSON.parse(service_account_json);
    const privateKey = await importKey(serviceAccount.private_key);

    const now = Math.floor(Date.now() / 1000);
    const exp = now + 3600;
    const header = { alg: "RS256", typ: "JWT" };
    const payload = {
      iss: serviceAccount.client_email,
      scope: "https://www.googleapis.com/auth/cloud-platform",
      aud: "https://oauth2.googleapis.com/token",
      exp,
      iat: now,
    };

    const encodedHeader = base64url(new TextEncoder().encode(JSON.stringify(header)));
    const encodedPayload = base64url(new TextEncoder().encode(JSON.stringify(payload)));
    const dataToSign = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`);
    const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", privateKey, dataToSign);
    const jwt = `${encodedHeader}.${encodedPayload}.${base64url(signature)}`;

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
    });

    if (!tokenResponse.ok) throw new Error(`Failed to get access token: ${await tokenResponse.text()}`);
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const systemPromptTemplate = course_outline_prompt || DEFAULT_COURSE_OUTLINE_PROMPT;
    const processedPrompt = systemPromptTemplate
      .replace('{{customer_profile}}', customerProfile)
      .replace('{{major_steps}}', majorSteps)
      .replace('{{minor_steps}}', minorSteps)
      .replace('{{chapter_title}}', chapterTitle);

    const vertexApiUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${project_id}/locations/${location}/publishers/google/models/${model}:generateContent`;
    const vertexResponse = await fetch(vertexApiUrl, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: processedPrompt }] }] }),
    });

    if (!vertexResponse.ok) throw new Error(`Vertex AI API error: ${await vertexResponse.text()}`);
    
    const vertexData = await vertexResponse.json();
    const rawText = vertexData.candidates[0].content.parts[0].text;
    
    // Clean and parse the JSON array from the raw text
    const jsonMatch = rawText.match(/\[.*\]/s);
    if (!jsonMatch) throw new Error("AI did not return a valid JSON array.");
    
    const lessons = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify({ lessons }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});