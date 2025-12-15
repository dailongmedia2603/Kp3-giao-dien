import React, { useState, useEffect } from 'react';
import { supabase } from '@/src/integrations/supabase/client';
import { Loader2, Edit, Plus, ArrowLeft, ChevronDown } from 'lucide-react';
import { CourseOutlineBuilder } from './CourseOutlineBuilder';

interface Lesson {
  id: string;
  title: string;
  duration: string | null;
  format: string | null;
  is_pro: boolean;
  cta_problem: string | null;
  source_link: string | null;
  demo_link: string | null;
  deadline: string | null;
  video_final_deadline: string | null;
  thumbnail_url: string | null;
  notes: string | null;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseDetailPageProps {
  course: any;
  onBack: () => void;
}

const EditableCell: React.FC<{
  value: string | null | undefined;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}> = ({ value, onChange, className = '', placeholder = '' }) => {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full h-full bg-transparent px-3 py-3 focus:outline-none focus:bg-blue-50 focus:ring-1 focus:ring-blue-300 rounded-sm ${className}`}
      placeholder={placeholder}
    />
  );
};

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course, onBack }) => {
  const [view, setView] = useState('table');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openChapters, setOpenChapters] = useState<string[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      const { data: chaptersData, error: chaptersError } = await supabase
        .from('course_chapters')
        .select('*')
        .eq('course_id', course.id)
        .order('chapter_order', { ascending: true });

      if (chaptersError) {
        console.error('Error fetching chapters:', chaptersError);
        setIsLoading(false);
        return;
      }

      const chaptersWithLessons = await Promise.all(
        chaptersData.map(async (chapter) => {
          const { data: lessonsData, error: lessonsError } = await supabase
            .from('course_lessons')
            .select('*')
            .eq('chapter_id', chapter.id)
            .order('lesson_order', { ascending: true });
          
          if (lessonsError) {
            console.error(`Error fetching lessons for chapter ${chapter.id}:`, lessonsError);
          }
          
          return { ...chapter, lessons: lessonsData || [] };
        })
      );

      setChapters(chaptersWithLessons);
      setOpenChapters(chaptersWithLessons.map(c => c.id)); // Open all chapters by default
      setIsLoading(false);
    };
    fetchDetails();
  }, [course.id]);

  const toggleChapter = (chapterId: string) => {
    setOpenChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const handleChapterChange = (chapterId: string, newTitle: string) => {
    setChapters(prevChapters =>
      prevChapters.map(ch => (ch.id === chapterId ? { ...ch, title: newTitle } : ch))
    );
  };

  const handleLessonChange = (chapterId: string, lessonId: string, field: keyof Lesson, value: any) => {
    setChapters(prevChapters =>
      prevChapters.map(ch => {
        if (ch.id === chapterId) {
          return {
            ...ch,
            lessons: ch.lessons.map(l => (l.id === lessonId ? { ...l, [field]: value } : l)),
          };
        }
        return ch;
      })
    );
  };

  if (view === 'builder') {
    return <CourseOutlineBuilder course={course} onBack={() => setView('table')} initialChapters={chapters} />;
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{course.title}</h2>
            <p className="text-slate-500 text-sm">Chi tiết đề cương khóa học</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView('builder')} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 shadow-sm">
            <Edit size={14} /> Edit
          </button>
          <button onClick={() => setView('builder')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-sm">
            <Plus size={14} /> Tạo kế hoạch
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 size={32} className="animate-spin text-slate-400" />
          </div>
        ) : (
          chapters.map((chapter, chapterIndex) => (
            <div key={chapter.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50/50" onClick={() => toggleChapter(chapter.id)}>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-400 font-bold">Chương</span>
                    <span className="text-2xl font-bold text-slate-800">{chapterIndex + 1}</span>
                  </div>
                  <input
                    type="text"
                    value={chapter.title}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleChapterChange(chapter.id, e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="text-lg font-bold text-slate-900 bg-transparent focus:outline-none focus:bg-blue-50 p-1 rounded"
                  />
                </div>
                <ChevronDown size={20} className={`text-slate-400 transition-transform ${openChapters.includes(chapter.id) ? 'rotate-180' : ''}`} />
              </div>

              {openChapters.includes(chapter.id) && (
                <div className="overflow-x-auto">
                  <div className="min-w-[1200px]">
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_2fr_2fr] gap-4 px-5 py-3 bg-slate-50 border-y border-slate-200 text-xs font-bold text-slate-500 uppercase">
                      <div className="col-span-1">Bài học</div>
                      <div className="col-span-1 text-center">Thời lượng</div>
                      <div className="col-span-1 text-center">Định dạng</div>
                      <div className="col-span-1 text-center">Free/Pro</div>
                      <div className="col-span-1">Nút bấm/Vấn đề</div>
                      <div className="col-span-1">Link Source</div>
                      <div className="col-span-1">Video Demo</div>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {chapter.lessons.map(lesson => (
                        <div key={lesson.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_2fr_2fr] gap-4 px-2 items-center hover:bg-slate-50/50">
                          <div className="col-span-1"><EditableCell value={lesson.title} onChange={v => handleLessonChange(chapter.id, lesson.id, 'title', v)} /></div>
                          <div className="col-span-1"><EditableCell value={lesson.duration} onChange={v => handleLessonChange(chapter.id, lesson.id, 'duration', v)} className="text-center" /></div>
                          <div className="col-span-1"><EditableCell value={lesson.format} onChange={v => handleLessonChange(chapter.id, lesson.id, 'format', v)} className="text-center" /></div>
                          <div className="col-span-1 p-3 text-center">
                            <button onClick={() => handleLessonChange(chapter.id, lesson.id, 'is_pro', !lesson.is_pro)} className={`px-3 py-1 rounded-full text-xs font-bold ${lesson.is_pro ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                              {lesson.is_pro ? 'PRO' : 'FREE'}
                            </button>
                          </div>
                          <div className="col-span-1"><EditableCell value={lesson.cta_problem} onChange={v => handleLessonChange(chapter.id, lesson.id, 'cta_problem', v)} /></div>
                          <div className="col-span-1"><EditableCell value={lesson.source_link} onChange={v => handleLessonChange(chapter.id, lesson.id, 'source_link', v)} /></div>
                          <div className="col-span-1"><EditableCell value={lesson.demo_link} onChange={v => handleLessonChange(chapter.id, lesson.id, 'demo_link', v)} /></div>
                        </div>
                      ))}
                    </div>
                    <div className="p-5">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '30%'}}></div>
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};