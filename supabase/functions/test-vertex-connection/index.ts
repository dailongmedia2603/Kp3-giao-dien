// @ts-nocheck
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { GoogleAuth } from "https://deno.land/x/google_auth@v0.4.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { projectId, location, serviceAccountJson } = await req.json();

    if (!projectId || !location || !serviceAccountJson) {
      throw new Error('Missing required fields: projectId, location, or serviceAccountJson');
    }

    const serviceAccount = JSON.parse(serviceAccountJson);

    const googleAuth = new GoogleAuth({
      creds: serviceAccount,
      scope: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    const accessToken = await googleAuth.getAccessToken();

    if (!accessToken) {
      throw new Error('Failed to get Google Auth access token.');
    }

    // Make a simple, lightweight call to test the connection, e.g., list models
    const testApiUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models`;

    const testResponse = await fetch(testApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!testResponse.ok) {
      const errorBody = await testResponse.text();
      throw new Error(`Connection failed: ${testResponse.status} ${errorBody}`);
    }

    return new Response(JSON.stringify({ message: 'Connection successful!' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});