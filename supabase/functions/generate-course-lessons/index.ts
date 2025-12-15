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
Return ONLY a valid JSON array of strings. Do not output any markdown code blocks or additional text. Just the raw JSON array.
Example: ["Lesson Title 1", "Lesson Title 2", "Lesson Title 3"]`;

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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) throw new Error('Unauthorized: User not found.');
    userId = user.id;

    requestBody = await req.json();
    const { customerProfile, majorSteps, minorSteps, chapterTitle } = requestBody;
    if (!customerProfile || !majorSteps || !minorSteps || !chapterTitle) {
      throw new Error('Bad Request: Missing required context for generation.');
    }

    const { data: apiConfig, error: configError } = await serviceClient
      .from('api_configurations')
      .select('troll_api_key, course_outline_prompt')
      .eq('user_id', user.id)
      .single();

    if (configError || !apiConfig) {
      throw new Error('API configuration not found. Please save your settings first.');
    }

    const { troll_api_key, course_outline_prompt } = apiConfig;
    if (!troll_api_key) {
      throw new Error('Troll API Key not found. Please configure it in Settings > API > TrollLLM.');
    }

    const systemPromptTemplate = course_outline_prompt || DEFAULT_COURSE_OUTLINE_PROMPT;
    const processedPrompt = systemPromptTemplate
      .replace('{{customer_profile}}', customerProfile)
      .replace('{{major_steps}}', majorSteps)
      .replace('{{minor_steps}}', minorSteps)
      .replace('{{chapter_title}}', chapterTitle);

    const trollBaseUrl = 'https://chat.trollllm.xyz/v1';
    const trollModel = 'gemini-3-pro-preview';

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
    const rawText = aiData.choices?.[0]?.message?.content || "";
    
    // Clean and parse the JSON array from the raw text
    const jsonMatch = rawText.match(/\[.*\]/s);
    if (!jsonMatch) throw new Error("AI did not return a valid JSON array.");
    
    const lessons = JSON.parse(jsonMatch[0]);
    responseBody = { lessons };

    return new Response(JSON.stringify(responseBody), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    errorMsg = error.message;
    responseStatus = responseStatus || 500;
    responseBody = { error: error.message };
    return new Response(JSON.stringify(responseBody), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: responseStatus,
    });
  } finally {
    const durationMs = Date.now() - startTime;
    if (userId) {
      await serviceClient.from('api_logs').insert({
        user_id: userId,
        method: 'POST',
        endpoint: 'supabase/functions/generate-course-lessons (TrollLLM)',
        request_payload: requestBody,
        response_status: responseStatus,
        response_body: responseBody,
        duration_ms: durationMs,
        error_message: errorMsg,
      });
    }
  }
});