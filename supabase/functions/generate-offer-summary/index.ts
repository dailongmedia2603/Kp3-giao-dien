// @ts-nocheck
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const DEFAULT_OFFER_PROMPT = `You are a world-class direct response copywriter. Based on the following details for a new offer, write a compelling and persuasive description in Vietnamese.

Offer Details:
- Title: {{title}}
- Category: {{category}}
- Target Market: {{target_market}}
- Pressing Problem it Solves: {{pressing_problem}}
- Desired Outcome it Delivers: {{desired_outcome}}
- Features/USPs: {{features}}
- Specific Technology/Method: {{technology}}
- Scientific Studies/Statistics: {{studies}}
- Social Proof (Featured in): {{social_proof}}
- Credible Authority Figure: {{authority_figure}}
- Unique Mechanism: {{unique_mechanism}}
- Number of Reviews: {{review_count}}
- Average Review Rating: {{avg_review_rating}}
- Total Customers: {{total_customers}}
- Testimonials: {{testimonials}}

Your task is to synthesize this information into a powerful description that can be used on a landing page or in an ad. The tone should be persuasive and clearly articulate the value proposition. The output should be in Vietnamese.`;

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
    if (!user) {
      throw new Error('Unauthorized: User not found.');
    }

    const { offerDetails } = await req.json();
    if (!offerDetails) {
      throw new Error('Bad Request: Missing offerDetails payload.');
    }

    const { data: apiConfig, error: configError } = await serviceClient
      .from('api_configurations')
      .select('project_id, location, model, service_account_json')
      .eq('user_id', user.id)
      .single();

    if (configError || !apiConfig) {
      throw new Error('API configuration not found. Please save your settings first.');
    }

    const { project_id, location, model, service_account_json } = apiConfig;

    if (!project_id || !location || !model || !service_account_json) {
      throw new Error('Incomplete API configuration. Please check your settings.');
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
      exp: exp,
      iat: now,
    };

    const encodedHeader = base64url(new TextEncoder().encode(JSON.stringify(header)));
    const encodedPayload = base64url(new TextEncoder().encode(JSON.stringify(payload)));
    
    const dataToSign = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`);
    const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", privateKey, dataToSign);
    const encodedSignature = base64url(signature);
    const jwt = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;

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
      throw new Error(`Failed to get access token: ${tokenResponse.status} ${errorBody}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error('Access token not found in Google Auth response.');
    }

    let processedPrompt = DEFAULT_OFFER_PROMPT;
    for (const [key, value] of Object.entries(offerDetails)) {
      processedPrompt = processedPrompt.replace(new RegExp(`{{${key}}}`, 'g'), value as string || '');
    }

    const vertexApiUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${project_id}/locations/${location}/publishers/google/models/${model}:generateContent`;

    const vertexResponse = await fetch(vertexApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: processedPrompt }] }]
      }),
    });
    
    if (!vertexResponse.ok) {
      const errorBody = await vertexResponse.text();
      throw new Error(`Vertex AI API error: ${vertexResponse.status} ${errorBody}`);
    }

    const vertexData = await vertexResponse.json();
    const generatedDescription = vertexData.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ description: generatedDescription }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})