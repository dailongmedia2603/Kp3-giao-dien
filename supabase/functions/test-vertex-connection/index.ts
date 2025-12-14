// @ts-nocheck
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { serve } from "https://deno.land/std@0.224.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

  try {
    const { projectId, location, serviceAccountJson } = await req.json();

    if (!projectId || !location || !serviceAccountJson) {
      throw new Error('Missing required fields: projectId, location, or serviceAccountJson');
    }

    const serviceAccount = JSON.parse(serviceAccountJson);
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
    
    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      privateKey,
      dataToSign
    );

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
      status: 500,
    });
  }
});