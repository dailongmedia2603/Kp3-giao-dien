import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Users, Layers, List, Save, Sparkles, Plus, Trash2 } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

const InputField: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ icon: Icon, title, description, value, onChange }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-start gap-3 mb-3">
      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="font-bold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
    <textarea 
      value={value}
      onChange={onChange}
      placeholder="Nhập thông tin của bạn ở đây..."
      className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-y min-h-[120px]"
    />
  </div>
);

export const CourseOutlineBuilder: React.FC<{ course: any; onBack: () => void; }> = ({ course, onBack }) => {
  const [isInputCollapsed, setIsInputCollapsed] = useState(true);
  const [customerProfile, setCustomerProfile] = useState('');
  const [majorSteps, setMajorSteps] = useState('');
  const [minorSteps, setMinorSteps] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const addChapter = () => {
    const newChapter: Chapter = {
      id: `ch-${Date.now()}`,
      title: `Chương ${chapters.length + 1}: Tiêu đề mới`,
      lessons: [],
    };
    setChapters([...chapters, newChapter]);
  };

  const addLesson = (chapterId: string) => {
    setChapters(chapters.map(ch => {
      if (ch.id === chapterId) {
        const newLesson: Lesson = { id: `l-${Date.now()}`, title: '' };
        return { ...ch, lessons: [...ch.lessons, newLesson] };
      }
      return ch;
    }));
  };

  const updateChapterTitle = (chapterId: string, newTitle: string) => {
    setChapters(chapters.map(ch => ch.id === chapterId ? { ...ch, title: newTitle } : ch));
  };

  const updateLessonTitle = (chapterId: string, lessonId: string, newTitle: string) => {
    setChapters(chapters.map(ch => {
      if (ch.id === chapterId) {
        const newLessons = ch.lessons.map(l => l.id === lessonId ? { ...l, title: newTitle } : l);
        return { ...ch, lessons: newLessons };
      }
      return ch;
    }));
  };

  const deleteLesson = (chapterId: string, lessonId: string) => {
      setChapters(chapters.map(ch => {
          if (ch.id === chapterId) {
              return { ...ch, lessons: ch.lessons.filter(l => l.id !== lessonId) };
          }
          return ch;
      }));
  };

  const suggestLessons = (chapterId: string) => {
      setChapters(chapters.map(ch => {
          if (ch.id === chapterId) {
              return { ...ch, lessons: [
                  { id: `l-${Date.now()}-1`, title: 'Bài học đề xuất 1 từ AI' },
                  { id: `l-${Date.now()}-2`, title: 'Bài học đề xuất 2 từ AI' },
                  { id: `l-${Date.now()}-3`, title: 'Bài học đề xuất 3 từ AI' },
              ]};
          }
          return ch;
      }));
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Tạo kế hoạch: {course.title}</h2>
          <p className="text-slate-500 text-sm">Sử dụng AI để xây dựng đề cương khóa học của bạn.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-8">
        <button onClick={() => setIsInputCollapsed(!isInputCollapsed)} className="w-full flex justify-between items-center p-5">
          <h3 className="font-bold text-lg text-slate-800">Thông tin đầu vào cho AI</h3>
          <ChevronDown size={20} className={`text-slate-400 transition-transform ${!isInputCollapsed && 'rotate-180'}`} />
        </button>
        {!isInputCollapsed && (
          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <InputField icon={Users} title="Chân dung khách hàng & Outcome" description="Mô tả khách hàng lý tưởng và kết quả họ muốn đạt được." value={customerProfile} onChange={(e) => setCustomerProfile(e.target.value)} />
              <InputField icon={Layers} title="5-7 bước lớn" description="Liệt kê các cột mốc chính để đạt được kết quả." value={majorSteps} onChange={(e) => setMajorSteps(e.target.value)} />
              <InputField icon={List} title="3-5 bước nhỏ" description="Chia nhỏ từng bước lớn thành các hành động cụ thể." value={minorSteps} onChange={(e) => setMinorSteps(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-sm">
                <Save size={14} /> Lưu thông tin
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-800">Đề cương khóa học</h3>
            <button onClick={addChapter} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 shadow-sm">
                <Plus size={14} /> Thêm chương
            </button>
        </div>
        {chapters.map((chapter) => (
          <div key={chapter.id} className="bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <input 
                type="text" 
                value={chapter.title} 
                onChange={(e) => updateChapterTitle(chapter.id, e.target.value)}
                className="font-bold text-slate-900 bg-transparent focus:outline-none w-full"
              />
              <button onClick={() => suggestLessons(chapter.id)} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 whitespace-nowrap">
                <Sparkles size={14} /> AI Đề xuất
              </button>
            </div>
            <div className="p-4 space-y-3">
              {chapter.lessons.map((lesson, lessonIndex) => (
                <div key={lesson.id} className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={lesson.title}
                    onChange={(e) => updateLessonTitle(chapter.id, lesson.id, e.target.value)}
                    className="flex-1 p-2 border border-slate-200 rounded-md text-sm"
                    placeholder={`Bài học ${lessonIndex + 1}`}
                  />
                  <button onClick={() => deleteLesson(chapter.id, lesson.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              ))}
              <button onClick={() => addLesson(chapter.id)} className="text-xs font-bold text-blue-600 hover:underline mt-2">
                + Thêm bài học
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};