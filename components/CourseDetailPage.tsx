import React, { useState, useEffect } from 'react';
import { supabase } from '@/src/integrations/supabase/client';
import { Loader2, Edit, Plus, ArrowLeft } from 'lucide-react';
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
      className={`w-full h-full bg-transparent p-3 focus:outline-none focus:bg-blue-50 focus:ring-1 focus:ring-blue-300 rounded-sm ${className}`}
      placeholder={placeholder}
    />
  );
};

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course, onBack }) => {
  const [view, setView] = useState('table');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    };
    fetchDetails();
  }, [course.id]);

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
    return <CourseOutlineBuilder course={course} onBack={() => setView('table')} />;
  }

  let lessonCounter = 0;
  const headers = [
    "STT", "Chương", "Bài", "Thời lượng", "Định dạng", "Free/Pro", 
    "Nút bấm/Vấn đề", "Link Source", "Video Demo", "Deadline", 
    "Video Final", "Deadline", "Thumbnail", "Note"
  ];

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
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 shadow-sm">
            <Edit size={14} /> Edit
          </button>
          <button onClick={() => setView('builder')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-sm">
            <Plus size={14} /> Tạo kế hoạch
          </button>
        </div>
      </div>

      <div className="bg-slate-100 border border-slate-200 rounded-xl shadow-sm overflow-auto h-[calc(100vh-280px)]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 size={32} className="animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="grid grid-cols-[40px_1fr_2fr_repeat(11,_1fr)] gap-px bg-slate-200 min-w-[2200px]">
            {/* Headers */}
            {headers.map((header, i) => (
              <div key={i} className="bg-slate-50 p-3 text-center text-xs font-bold text-slate-600 uppercase tracking-wider sticky top-0 z-10">{header}</div>
            ))}

            {/* Body */}
            {chapters.map(chapter => {
              const chapterLessons = chapter.lessons;
              return (
                <React.Fragment key={chapter.id}>
                  {/* Chapter Row */}
                  <div className="bg-blue-100 col-span-1"></div>
                  <div className="bg-blue-100 col-span-13">
                    <input
                      type="text"
                      value={chapter.title}
                      onChange={(e) => handleChapterChange(chapter.id, e.target.value)}
                      className="w-full bg-transparent p-3 font-bold text-slate-900 focus:outline-none focus:bg-blue-200"
                    />
                  </div>

                  {/* Lesson Rows */}
                  {chapterLessons.map(lesson => {
                    lessonCounter++;
                    return (
                      <React.Fragment key={lesson.id}>
                        <div className="bg-white p-3 text-center">{lessonCounter}</div>
                        <div className="bg-white p-3"></div> {/* Empty Chapter Cell */}
                        
                        <div className="bg-white"><EditableCell value={lesson.title} onChange={v => handleLessonChange(chapter.id, lesson.id, 'title', v)} /></div>
                        <div className="bg-white"><EditableCell value={lesson.duration} onChange={v => handleLessonChange(chapter.id, lesson.id, 'duration', v)} className="text-center" /></div>
                        <div className="bg-white"><EditableCell value={lesson.format} onChange={v => handleLessonChange(chapter.id, lesson.id, 'format', v)} className="text-center" /></div>
                        
                        <div className="bg-white p-3 text-center">
                          <button onClick={() => handleLessonChange(chapter.id, lesson.id, 'is_pro', !lesson.is_pro)} className={`px-2 py-0.5 rounded-full text-xs font-bold ${lesson.is_pro ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                            {lesson.is_pro ? 'PRO' : 'FREE'}
                          </button>
                        </div>

                        <div className="bg-white"><EditableCell value={lesson.cta_problem} onChange={v => handleLessonChange(chapter.id, lesson.id, 'cta_problem', v)} /></div>
                        <div className="bg-white"><EditableCell value={lesson.source_link} onChange={v => handleLessonChange(chapter.id, lesson.id, 'source_link', v)} /></div>
                        <div className="bg-white"><EditableCell value={lesson.demo_link} onChange={v => handleLessonChange(chapter.id, lesson.id, 'demo_link', v)} /></div>
                        <div className="bg-white"><EditableCell value={lesson.deadline} onChange={v => handleLessonChange(chapter.id, lesson.id, 'deadline', v)} className="text-center" /></div>
                        <div className="bg-white p-3"></div> {/* Placeholder for Video Final */}
                        <div className="bg-white"><EditableCell value={lesson.video_final_deadline} onChange={v => handleLessonChange(chapter.id, lesson.id, 'video_final_deadline', v)} className="text-center" /></div>
                        <div className="bg-white"><EditableCell value={lesson.thumbnail_url} onChange={v => handleLessonChange(chapter.id, lesson.id, 'thumbnail_url', v)} /></div>
                        <div className="bg-white"><EditableCell value={lesson.notes} onChange={v => handleLessonChange(chapter.id, lesson.id, 'notes', v)} /></div>
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};