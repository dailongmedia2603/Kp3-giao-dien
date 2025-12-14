// @ts-nocheck
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import { GoogleAuth } from "https://deno.land/x/google_auth/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
    userId = user.id;

    const { answers } = await req.json()
    if (!answers) {
      throw new Error('Bad Request: Missing answers payload.');
    }

    const { data: apiConfig, error: configError } = await serviceClient
      .from('api_configurations')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (configError || !apiConfig) {
      throw new Error('API configuration not found. Please configure your API settings.');
    }

    const { project_id, location, model, service_account_json, dream_buyer_prompt } = apiConfig;

    if (!project_id || !location || !model || !service_account_json) {
      throw new Error('Incomplete API configuration. Please check your settings.');
    }

    const serviceAccount = JSON.parse(service_account_json);
    const googleAuth = new GoogleAuth({
      credentials: {
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
      },
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    const accessToken = await googleAuth.getAccessToken();

    const systemPrompt = dream_buyer_prompt || `You are a world-class marketing strategist and psychologist. Based on the following answers about a "Dream Buyer", create a concise, insightful summary of the avatar. The summary should be a narrative that brings the person to life, focusing on their core motivations, fears, and what would make them say "yes" to an offer. Synthesize the provided information into a compelling persona description.`;

    const userPrompt = `
      Here are the details of the Dream Buyer:
      - Name: ${answers.name}
      - Where they hang out: ${answers.q1}
      - Information sources: ${answers.q2}
      - Frustrations: ${answers.q3}
      - Dreams: ${answers.q4}
      - Fears: ${answers.q5}
      - Communication channels: ${answers.q6}
      - Language they use: ${answers.q7}
      - Daily routine: ${answers.q8}
      - Happiness triggers: ${answers.q9}

      Please generate the summary in Vietnamese.
    `;

    const vertexApiUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${project_id}/locations/${location}/publishers/google/models/${model}:generateContent`;

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
            parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
          }
        ]
      }),
    });
    
    responseStatus = vertexResponse.status;

    if (!vertexResponse.ok) {
      const errorBody = await vertexResponse.text();
      throw new Error(`Vertex AI API error: ${vertexResponse.status} ${errorBody}`);
    }

    const vertexData = await vertexResponse.json();
    const summary = vertexData.candidates[0].content.parts[0].text;
    responseBody = { summary };

    return new Response(JSON.stringify(responseBody), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    errorMsg = error.message;
    responseStatus = responseStatus || 500;
    responseBody = { error: error.message };
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
        request_payload: req.body ? await req.json() : null,
        response_status: responseStatus,
        response_body: responseBody,
        duration_ms: durationMs,
        error_message: errorMsg,
      });
    }
  }
})