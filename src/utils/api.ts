import { supabase } from '@/src/integrations/supabase/client';

interface ApiCallOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: Record<string, any>;
  headers?: Record<string, string>;
}

export const callApi = async (endpoint: string, options: ApiCallOptions = {}) => {
  const { method = 'GET', payload, headers = {} } = options;
  const { data: { user } } = await supabase.auth.getUser();

  const startTime = Date.now();
  let responseStatus: number | undefined;
  let responseBody: any;
  let errorMessage: string | undefined;

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: payload ? JSON.stringify(payload) : undefined,
    });

    responseStatus = response.status;
    responseBody = await response.json();

    if (!response.ok) {
      throw new Error(responseBody.message || `Request failed with status ${response.status}`);
    }

    return responseBody;
  } catch (error: any) {
    errorMessage = error.message;
    console.error(`API call to ${endpoint} failed:`, error);
    throw error;
  } finally {
    const durationMs = Date.now() - startTime;

    if (user) {
      await supabase.from('api_logs').insert({
        user_id: user.id,
        method,
        endpoint,
        request_payload: payload,
        response_status: responseStatus,
        response_body: responseBody,
        duration_ms: durationMs,
        error_message: errorMessage,
      });
    }
  }
};