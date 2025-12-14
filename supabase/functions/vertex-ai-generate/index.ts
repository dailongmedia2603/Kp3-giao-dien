import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleAuth } from "https://deno.land/x/google_auth@v0.4.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();

    // Lấy các biến môi trường từ Supabase Vault
    const PROJECT_ID = Deno.env.get("VERTEX_PROJECT_ID");
    const LOCATION = Deno.env.get("VERTEX_LOCATION");
    const SERVICE_ACCOUNT_JSON = Deno.env.get("VERTEX_SERVICE_ACCOUNT_JSON");

    if (!PROJECT_ID || !LOCATION || !SERVICE_ACCOUNT_JSON) {
      throw new Error("Missing environment variables in Supabase Vault.");
    }

    // Xác thực với Google Cloud bằng Service Account
    const serviceAccount = JSON.parse(SERVICE_ACCOUNT_JSON);
    const googleAuth = new GoogleAuth({
      scope: ["https://www.googleapis.com/auth/cloud-platform"],
      credentials: {
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
      },
    });

    const accessToken = await googleAuth.getAccessToken();

    // Gọi đến Vertex AI API
    const API_ENDPOINT = `${LOCATION}-aiplatform.googleapis.com`;
    const MODEL_ID = "gemini-1.5-pro-001"; // Sử dụng model Gemini 1.5 Pro, sẵn sàng cho 2.5 khi có

    const response = await fetch(
      `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}:generateContent`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }],
          }],
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Vertex AI API error: ${response.status} ${errorBody}`);
    }

    const data = await response.json();
    const summary = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ summary }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});