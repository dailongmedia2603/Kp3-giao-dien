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
    console.log("Function `generate-dream-buyer-summary` invoked (Provider: TrollLLM).");
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

    requestBody = await req.json();
    const { answers } = requestBody;
    if (!answers) {
      throw new Error('Bad Request: Missing answers payload.');
    }

    // Lấy cấu hình API Troll từ database
    const { data: apiConfig, error: configError } = await serviceClient
      .from('api_configurations')
      .select('troll_api_key, dream_buyer_prompt')
      .eq('user_id', user.id)
      .single();

    if (configError && configError.code !== 'PGRST116') {
      console.error("API config error:", configError?.message);
      throw new Error('API configuration not found.');
    }

    const { troll_api_key, dream_buyer_prompt } = apiConfig || {};

    if (!troll_api_key) {
      throw new Error('Troll API Key not found. Please configure it in Settings > API > TrollLLM.');
    }

    // Xử lý Prompt
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

    // Cấu hình gọi TrollLLM API
    const trollBaseUrl = 'https://chat.trollllm.xyz/v1';
    const trollModel = 'gemini-3-pro-preview';
    
    console.log(`Calling TrollLLM API: ${trollBaseUrl}/chat/completions`);

    const aiResponse = await fetch(`${trollBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${troll_api_key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: trollModel,
        messages: [
          { role: "user", content: processedPrompt }
        ],
        temperature: 0.7
      }),
    });
    
    responseStatus = aiResponse.status;

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("TrollLLM API error:", errorText);
      throw new Error(`TrollLLM API error: ${aiResponse.status} ${errorText}`);
    }

    const aiData = await aiResponse.json();
    
    // Parse response theo chuẩn OpenAI format (TrollLLM thường follow chuẩn này)
    const summary = aiData.choices?.[0]?.message?.content || "";
    
    if (!summary) {
        throw new Error("No content received from AI.");
    }

    responseBody = { summary };
    console.log("Summary generated successfully via TrollLLM.");

    return new Response(JSON.stringify(responseBody), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    errorMsg = error.message;
    responseStatus = responseStatus || 500;
    responseBody = { error: error.message };
    console.error("An error occurred:", error);
    return new Response(JSON.stringify(responseBody), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: responseStatus,
    })
  } finally {
    // Log vào DB
    const durationMs = Date.now() - startTime;
    if (userId) {
      await serviceClient.from('api_logs').insert({
        user_id: userId,
        method: 'POST',
        endpoint: 'supabase/functions/generate-dream-buyer-summary (TrollLLM)',
        request_payload: requestBody,
        response_status: responseStatus,
        response_body: responseBody,
        duration_ms: durationMs,
        error_message: errorMsg,
      });
    }
  }
})