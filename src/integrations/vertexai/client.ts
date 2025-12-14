import { supabase } from '@/src/integrations/supabase/client';

export const generateSummaryWithAI = async (prompt: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('vertex-ai-generate', {
      body: { prompt },
    });

    if (error) {
      throw new Error(`Supabase function error: ${error.message}`);
    }

    if (data.error) {
      throw new Error(`Vertex AI error: ${data.error}`);
    }

    return data.summary;
  } catch (err) {
    console.error("Error generating summary:", err);
    return "Đã xảy ra lỗi khi tạo tóm tắt. Vui lòng kiểm tra cấu hình API.";
  }
};