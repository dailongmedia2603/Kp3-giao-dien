import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  Sparkles, 
  Type, 
  Mail, 
  FileText, 
  Bold, 
  Italic, 
  Underline, 
  Loader2,
  BookOpen,
  Facebook
} from 'lucide-react';

// --- TYPES & MOCK DATA ---
type Tool = 'headline' | 'hvco' | 'adcopy' | 'email';

const MOCK_HEADLINES = [
  "Cách duy nhất để có được [Kết quả mong muốn] mà không cần [Nỗi đau]",
  "Cảnh báo: Đừng thử [Hoạt động] cho đến khi bạn đọc điều này",
  "Bí mật mà [Đối thủ cạnh tranh] không muốn bạn biết về [Chủ đề]",
  "Làm thế nào tôi đã [Thành tích đáng kinh ngạc] trong [Thời gian ngắn]",
  "Cuối cùng, một phương pháp đã được chứng minh để [Giải quyết vấn đề]",
  "Nếu bạn có thể [Hành động đơn giản], bạn có thể [Đạt được kết quả lớn]",
  "Ba lý do tại sao [Niềm tin phổ biến] của bạn là sai",
  "Lộ trình chính xác để từ [Điểm bắt đầu] đến [Điểm kết thúc]",
  "Dành cho những người muốn [Mục tiêu] nhưng không biết bắt đầu từ đâu",
  "Thêm [Lợi ích] vào [Thứ gì đó] của bạn trong vòng chưa đầy [Thời gian]",
];

// --- SUB-COMPONENTS ---

// Tool Sidebar
const ToolSidebar: React.FC<{ 
  activeTool: Tool; 
  setActiveTool: (tool: Tool) => void;
  onGenerate: (tool: Tool, input: string, framework?: string) => void;
  generatedContent: string[];
  isLoading: boolean;
}> = ({ activeTool, setActiveTool, onGenerate, generatedContent, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const [framework, setFramework] = useState('AIDA');

  const toolConfig = {
    headline: { icon: Type, name: 'Tạo Tiêu đề', placeholder: 'Nhập lĩnh vực, ví dụ: Giảm cân' },
    hvco: { icon: BookOpen, name: 'Tiêu đề HVCO', placeholder: 'Nhập một câu "hook" hấp dẫn' },
    adcopy: { icon: Facebook, name: 'Viết Quảng cáo', placeholder: 'Nhập tên sản phẩm/dịch vụ' },
    email: { icon: Mail, name: 'Soạn Email', placeholder: 'Nhập mục tiêu của chuỗi email' },
  };

  const handleGenerateClick = () => {
    onGenerate(activeTool, inputValue, framework);
  };

  return (
    <div className="w-full lg:w-[400px] shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-full">
      <div className="p-5 border-b border-slate-100">
        <h3 className="font-bold text-slate-900">Công cụ Copywriting</h3>
      </div>
      
      {/* Tool Selection */}
      <div className="p-3 grid grid-cols-2 gap-2 border-b border-slate-100">
        {Object.keys(toolConfig).map(key => (
          <button 
            key={key}
            onClick={() => setActiveTool(key as Tool)}
            className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-colors ${
              activeTool === key ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <toolConfig[key as Tool].icon size={16} />
            {toolConfig[key as Tool].name}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-5 space-y-4">
        <textarea 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={toolConfig[activeTool].placeholder}
          className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0EB869] resize-none h-24"
        />
        {activeTool === 'adcopy' && (
          <div className="flex gap-2">
            <button onClick={() => setFramework('AIDA')} className={`flex-1 py-2 text-xs font-bold rounded border ${framework === 'AIDA' ? 'bg-[#E8FCF3] text-[#0EB869] border-[#0EB869]' : 'bg-white'}`}>AIDA</button>
            <button onClick={() => setFramework('PAS')} className={`flex-1 py-2 text-xs font-bold rounded border ${framework === 'PAS' ? 'bg-[#E8FCF3] text-[#0EB869] border-[#0EB869]' : 'bg-white'}`}>PAS</button>
          </div>
        )}
        <button 
          onClick={handleGenerateClick}
          disabled={isLoading || !inputValue}
          className="w-full py-3 bg-[#0EB869] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm hover:bg-[#0B9655] disabled:bg-slate-300 transition-colors"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          Tạo
        </button>
      </div>

      {/* Results Area */}
      <div className="flex-1 p-5 border-t border-slate-100 overflow-y-auto bg-slate-50/50 space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kết quả</h4>
        {generatedContent.map((item, index) => (
          <div 
            key={index}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', item)}
            className="bg-white p-3 rounded-lg border border-slate-200 text-sm text-slate-800 cursor-grab active:cursor-grabbing hover:border-[#0EB869] hover:shadow-sm transition-all"
          >
            {item}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center items-center h-24 text-slate-400">
            <Loader2 size={24} className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

// Editor Workspace
const EditorWorkspace: React.FC<{
  content: string;
  setContent: (content: string) => void;
}> = ({ content, setContent }) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [popover, setPopover] = useState<{ visible: boolean; x: number; y: number }>({ visible: false, x: 0, y: 0 });

  const handleTextSelect = () => {
    if (editorRef.current) {
      const selectionStart = editorRef.current.selectionStart;
      const selectionEnd = editorRef.current.selectionEnd;
      if (selectionStart !== selectionEnd) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          setPopover({ visible: true, x: rect.left, y: rect.bottom + 5 });
        }
      } else {
        setPopover({ visible: false, x: 0, y: 0 });
      }
    }
  };

  const handleSpiceUp = (style: string) => {
    if (editorRef.current) {
      const start = editorRef.current.selectionStart;
      const end = editorRef.current.selectionEnd;
      const selectedText = content.substring(start, end);
      const newText = `${content.substring(0, start)}[${style}: ${selectedText}]${content.substring(end)}`;
      setContent(newText);
      setPopover({ visible: false, x: 0, y: 0 });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const text = e.dataTransfer.getData('text/plain');
    const cursorPosition = e.currentTarget.selectionStart;
    const newContent = `${content.substring(0, cursorPosition)}\n${text}\n${content.substring(cursorPosition)}`;
    setContent(newContent);
  };

  return (
    <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-full">
      {/* Toolbar */}
      <div className="p-3 border-b border-slate-100 flex items-center gap-2">
        <button className="p-2 hover:bg-slate-100 rounded"><Bold size={16} /></button>
        <button className="p-2 hover:bg-slate-100 rounded"><Italic size={16} /></button>
        <button className="p-2 hover:bg-slate-100 rounded"><Underline size={16} /></button>
      </div>
      
      {/* Editor */}
      <div className="flex-1 p-2 relative">
        <textarea
          ref={editorRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onSelect={handleTextSelect}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          placeholder="Kéo kết quả từ bên trái hoặc bắt đầu viết ở đây..."
          className="w-full h-full p-6 text-base leading-relaxed text-slate-800 focus:outline-none resize-none"
        />
      </div>

      {/* "Spice It Up" Popover */}
      {popover.visible && (
        <div 
          className="fixed z-10 bg-slate-900 text-white rounded-lg p-1 flex gap-1 shadow-lg animate-in fade-in zoom-in-95"
          style={{ left: `${popover.x}px`, top: `${popover.y}px` }}
        >
          <button onClick={() => handleSpiceUp('Punchier')} className="px-3 py-1 text-xs font-bold hover:bg-slate-700 rounded">Làm cho hấp dẫn hơn</button>
          <button onClick={() => handleSpiceUp('Sabri Style')} className="px-3 py-1 text-xs font-bold hover:bg-slate-700 rounded">Phong cách Sabri</button>
        </div>
      )}
    </div>
  );
};

// --- MAIN COMPONENT ---
export const CopywriterAIPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>('headline');
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  const handleGenerate = (tool: Tool, input: string, framework?: string) => {
    setIsLoading(true);
    setGeneratedContent([]);
    setTimeout(() => {
      // Simulate AI generation based on tool
      switch (tool) {
        case 'headline':
          setGeneratedContent(MOCK_HEADLINES.map(h => h.replace('[Chủ đề]', input)));
          break;
        case 'hvco':
          setGeneratedContent([
            `Bí mật để [${input}] mà không ai nói cho bạn biết`,
            `Làm thế nào để [${input}] trong 7 ngày tới`,
            `Lộ trình chính xác để [${input}]`,
          ]);
          break;
        case 'adcopy':
          if (framework === 'AIDA') {
            setGeneratedContent([`**Attention:** Bạn có mệt mỏi với [Vấn đề]?\n**Interest:** Hãy tưởng tượng một thế giới nơi [Giải pháp] là dễ dàng.\n**Desire:** Với ${input}, bạn có thể đạt được [Kết quả].\n**Action:** Nhấp vào đây để bắt đầu ngay hôm nay!`]);
          } else { // PAS
            setGeneratedContent([`**Problem:** [Vấn đề] đang kìm hãm bạn.\n**Agitate:** Mỗi ngày trôi qua, bạn lại mất đi [Chi phí cơ hội].\n**Solution:** ${input} là giải pháp cuối cùng.`]);
          }
          break;
        case 'email':
          setGeneratedContent([
            `**Email 1 (Hook):** Chủ đề: Bạn có mắc phải sai lầm [Chủ đề] này không?\n\n**Email 2 (Value):** Chủ đề: Đây là cách khắc phục [Chủ đề] miễn phí\n\n**Email 3 (CTA):** Chủ đề: Sẵn sàng để thực sự giải quyết [Chủ đề]?`
          ]);
          break;
        default:
          setGeneratedContent([]);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Copywriter AI
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Không gian làm việc AI Copywriting
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Tạo, chỉnh sửa và kết hợp nội dung quảng cáo của bạn ở một nơi duy nhất.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        <ToolSidebar 
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          onGenerate={handleGenerate}
          generatedContent={generatedContent}
          isLoading={isLoading}
        />
        <EditorWorkspace 
          content={editorContent}
          setContent={setEditorContent}
        />
      </div>
    </div>
  );
};