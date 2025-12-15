// @ts-nocheck
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const DEFAULT_OFFER_SUMMARY_PROMPT = `You are a master copywriter specializing in "Godfather Offers". Synthesize the following 7 components for an offer titled "{{title}}" into a single, powerful, and persuasive offer summary in Vietnamese.

1.  **Rationale (Lý do hợp lý):** {{rationale}}
2.  **Build Value (Xây dựng giá trị):** {{value_build}}
3.  **Pricing (Định giá):** {{pricing}}
4.  **Payment Options (Tùy chọn thanh toán):** {{payment_options}}
5.  **Premiums (Quà tặng kèm/Bonuses):** {{premiums}}
6.  **Power Guarantee (Cam kết mạnh mẽ):** {{power_guarantee}}
7.  **Scarcity (Sự khan hiếm):** {{scarcity}}

Combine these elements into a cohesive and irresistible offer description. The output should be in Vietnamese.`;

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
    console.log("Function `generate-offer-summary` invoked (Provider: TrollLLM).");
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
    const { offerDetails } = requestBody;
    if (!offerDetails) {
      throw new Error('Bad Request: Missing offerDetails payload.');
    }

    // Lấy cấu hình API Troll từ database
    const { data: apiConfig, error: configError } = await serviceClient
      .from('api_configurations')
      .select('troll_api_key, offer_summary_prompt')
      .eq('user_id', user.id)
      .single();

    if (configError && configError.code !== 'PGRST116') {
      console.error("API config error:", configError?.message);
      throw new Error('API configuration not found.');
    }

    const { troll_api_key, offer_summary_prompt } = apiConfig || {};

    if (!troll_api_key) {
      throw new Error('Troll API Key not found. Please configure it in Settings > API > TrollLLM.');
    }

    // Xử lý Prompt
    const systemPromptTemplate = offer_summary_prompt || DEFAULT_OFFER_SUMMARY_PROMPT;
    let processedPrompt = systemPromptTemplate;
    for (const [key, value] of Object.entries(offerDetails)) {
      processedPrompt = processedPrompt.replace(new RegExp(`{{${key}}}`, 'g'), value as string || '');
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
    const durationMs = Date.now() - startTime;
    if (userId) {
      await serviceClient.from('api_logs').insert({
        user_id: userId,
        method: 'POST',
        endpoint: 'supabase/functions/generate-offer-summary (TrollLLM)',
        request_payload: requestBody,
        response_status: responseStatus,
        response_body: responseBody,
        duration_ms: durationMs,
        error_message: errorMsg,
      });
    }
  }
})