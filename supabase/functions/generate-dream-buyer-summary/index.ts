// @ts-nocheck
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const DEFAULT_DREAM_BUYER_PROMPT = `You are a world-class marketing strategist and psychologist. Based on the following answers about a "Dream Buyer" named {{name}}, create a concise, insightful summary of the avatar.

Here are the details:
- Where they hang out: {{q1_hangouts}}
- Information sources: {{q2_info_sources}}
- Frustrations: {{q3_frustrations}}
- Dreams: {{q4_dreams}}
- Fears: {{q5_fears}}
- Communication channels: {{q6_communication_channel}}
- Language they use: {{q7_language}}
- Daily routine: {{q8_daily_routine}}
- Happiness triggers: {{q9_happiness_triggers}}

Synthesize this information into a compelling persona description in Vietnamese. The summary should be a narrative that brings the person to life, focusing on their core motivations, fears, and what would make them say "yes" to an offer.`;

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

  const startTime = Date.now();
  let responseStatus: number | undefined;
  let responseBody: any;
  let errorMsg: string | undefined;
  let userId: string | undefined;
  let requestBody: any;

  const serviceClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    console.log("Function `generate-dream-buyer-summary` invoked.");
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      throw new Error('Unauthorized: User not found.');
    }
    userId = user.id;
    console.log(`Authenticated user: ${userId}`);

    requestBody = await req.json();
    const { answers } = requestBody;
    if (!answers) {
      throw new Error('Bad Request: Missing answers payload.');
    }
    console.log("Request body parsed successfully.");

    const { data: apiConfig, error: configError } = await serviceClient
      .from('api_configurations')
      .select('dream_buyer_prompt, project_id, location, model, service_account_json')
      .eq('user_id', user.id)
      .single();

    if (configError && configError.code !== 'PGRST116') {
      console.error("API config error:", configError?.message);
      throw new Error('API configuration not found. Please configure your API settings in the settings page.');
    }
    console.log("API configuration loaded.");

    const { project_id, location, model, service_account_json, dream_buyer_prompt } = apiConfig || {};

    if (!project_id || !location || !model || !service_account_json) {
      throw new Error('Incomplete API configuration. Please check your settings for Project ID, Location, Model, and Service Account JSON.');
    }

    const serviceAccount = JSON.parse(service_account_json);
    if (!serviceAccount.private_key || !serviceAccount.client_email) {
        throw new Error("Service Account JSON must contain 'private_key' and 'client_email'.");
    }
    console.log("Service account parsed.");

    const privateKey = await importKey(serviceAccount.private_key);
    console.log("Private key imported.");

    const now = Math.floor(Date.now() / 1000);
    const exp = now + 3600;

    const header = { alg: "RS256", typ: "JWT" };
    const payload = {
      iss: serviceAccount.client_email,
      scope: "https://www.googleapis.com/auth/cloud-platform",
      aud: "https://oauth2.googleapis.com/token",
      exp: exp,
      iat: now,
    };

    const encodedHeader = base64url(new TextEncoder().encode(JSON.stringify(header)));
    const encodedPayload = base64url(new TextEncoder().encode(JSON.stringify(payload)));
    
    const dataToSign = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`);
    const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", privateKey, dataToSign);
    const encodedSignature = base64url(signature);
    const jwt = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
    console.log("JWT created.");

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });

    if (!tokenResponse.ok) {
      const errorBody = await tokenResponse.text();
      console.error("Failed to get access token:", errorBody);
      throw new Error(`Failed to get access token: ${tokenResponse.status} ${errorBody}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error('Access token not found in Google Auth response.');
    }
    console.log("Access token fetched.");

    const systemPromptTemplate = dream_buyer_prompt || DEFAULT_DREAM_BUYER_PROMPT;

    const keyMap = {
      '{{name}}': answers.name,
      '{{q1_hangouts}}': answers.q1,
      '{{q2_info_sources}}': answers.q2,
      '{{q3_frustrations}}': answers.q3,
      '{{q4_dreams}}': answers.q4,
      '{{q5_fears}}': answers.q5,
      '{{q6_communication_channel}}': answers.q6,
      '{{q7_language}}': answers.q7,
      '{{q8_daily_routine}}': answers.q8,
      '{{q9_happiness_triggers}}': answers.q9,
    };

    let processedPrompt = systemPromptTemplate;
    for (const [placeholder, value] of Object.entries(keyMap)) {
      processedPrompt = processedPrompt.replace(new RegExp(placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), value || '');
    }

    const vertexApiUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${project_id}/locations/${location}/publishers/google/models/${model}:generateContent`;
    console.log(`Calling Vertex AI with processed prompt.`);

    const vertexResponse = await fetch(vertexApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: processedPrompt }]
          }
        ]
      }),
    });
    
    responseStatus = vertexResponse.status;

    if (!vertexResponse.ok) {
      const errorBody = await vertexResponse.text();
      console.error("Vertex AI API error:", errorBody);
      throw new Error(`Vertex AI API error: ${vertexResponse.status} ${errorBody}`);
    }

    const vertexData = await vertexResponse.json();
    const summary = vertexData.candidates[0].content.parts[0].text;
    responseBody = { summary };
    console.log("Summary generated successfully.");

    return new Response(JSON.stringify(responseBody), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    errorMsg = error.message;
    responseStatus = responseStatus || 500;
    responseBody = { error: error.message };
    console.error("An error occurred in `generate-dream-buyer-summary`:", error);
    return new Response(JSON.stringify(responseBody), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: responseStatus,
    })
  } finally {
    const durationMs = Date.now() - startTime;
    if (userId) {
      await serviceClient.from('api_logs').insert({
        user_id: userId,
        method: 'POST',
        endpoint: 'supabase/functions/generate-dream-buyer-summary',
        request_payload: requestBody,
        response_status: responseStatus,
        response_body: responseBody,
        duration_ms: durationMs,
        error_message: errorMsg,
      });
    }
  }
})