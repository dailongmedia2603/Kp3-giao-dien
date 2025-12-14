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
  console.log("Function `test-vertex-connection` invoked.");

  if (req.method === 'OPTIONS') {
    console.log("Handling OPTIONS request.");
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log("Parsing request body...");
    const { projectId, location, serviceAccountJson } = await req.json();
    console.log(`Received projectId: ${projectId}, location: ${location}`);

    if (!projectId || !location || !serviceAccountJson) {
      console.error("Missing required fields in request body.");
      throw new Error('Missing required fields: projectId, location, or serviceAccountJson');
    }

    let serviceAccount;
    try {
      serviceAccount = JSON.parse(serviceAccountJson);
      console.log("Service Account JSON parsed successfully.");
    } catch (e) {
      console.error("Failed to parse Service Account JSON:", e.message);
      throw new Error('Invalid Service Account JSON format.');
    }

    if (!serviceAccount.private_key || !serviceAccount.client_email) {
        console.error("Service Account JSON is missing `private_key` or `client_email`.");
        throw new Error("Service Account JSON must contain 'private_key' and 'client_email'.");
    }

    console.log("Importing private key...");
    const privateKey = await importKey(serviceAccount.private_key);
    console.log("Private key imported successfully.");

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

    console.log("Creating JWT...");
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
    console.log("JWT created successfully.");

    console.log("Fetching access token from Google...");
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
      console.error("Failed to get access token. Status:", tokenResponse.status, "Body:", errorBody);
      throw new Error(`Failed to get access token: ${tokenResponse.status} ${errorBody}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    console.log("Access token fetched successfully.");

    if (!accessToken) {
      console.error("Access token not found in Google Auth response.");
      throw new Error('Access token not found in Google Auth response.');
    }

    const testApiUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models`;
    console.log(`Testing connection to Vertex AI endpoint: ${testApiUrl}`);

    const testResponse = await fetch(testApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!testResponse.ok) {
      const errorBody = await testResponse.text();
      console.error("Vertex AI connection test failed. Status:", testResponse.status, "Body:", errorBody);
      throw new Error(`Connection failed: ${testResponse.status} ${errorBody}`);
    }

    console.log("Connection to Vertex AI successful!");
    return new Response(JSON.stringify({ message: 'Connection successful!' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("An error occurred in `test-vertex-connection` function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});