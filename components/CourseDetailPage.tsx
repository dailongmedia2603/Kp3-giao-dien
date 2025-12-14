import React, { useState, useEffect } from 'react';
import { supabase } from '@/src/integrations/supabase/client';
import { Loader2, Edit, Plus, BookOpen, ArrowLeft } from 'lucide-react';

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

const TableHeader: React.FC = () => {
    const headers = [
        "STT", "Chương", "Bài", "Thời lượng", "Định dạng", "Free/Pro", 
        "Nút bấm/Vấn đề", "Link Source", "Video Demo", "Deadline", 
        "Video Final", "Deadline", "Thumbnail", "Note"
    ];
    return (
        <div className="grid grid-cols-[40px_1fr_2fr_repeat(11,_1fr)] gap-px bg-slate-200 sticky top-0 z-10 text-xs font-bold text-slate-600 uppercase tracking-wider">
            {headers.map((header, i) => (
                <div key={i} className="bg-slate-50 p-3 text-center">{header}</div>
            ))}
        </div>
    );
};

const TableRow: React.FC<{ lesson: Lesson; index: number }> = ({ lesson, index }) => {
    return (
        <div className="grid grid-cols-[40px_1fr_2fr_repeat(11,_1fr)] gap-px text-sm text-slate-800 items-center">
            <div className="bg-white p-3 text-center">{index + 1}</div>
            <div className="bg-white p-3"></div> {/* Placeholder for Chapter */}
            <div className="bg-white p-3 font-medium">{lesson.title}</div>
            <div className="bg-white p-3 text-center">{lesson.duration}</div>
            <div className="bg-white p-3 text-center">{lesson.format}</div>
            <div className="bg-white p-3 text-center">
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${lesson.is_pro ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {lesson.is_pro ? 'PRO' : 'FREE'}
                </span>
            </div>
            <div className="bg-white p-3">{lesson.cta_problem}</div>
            <div className="bg-white p-3 truncate"><a href={lesson.source_link || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{lesson.source_link}</a></div>
            <div className="bg-white p-3 truncate"><a href={lesson.demo_link || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{lesson.demo_link}</a></div>
            <div className="bg-white p-3 text-center">{lesson.deadline}</div>
            <div className="bg-white p-3"></div> {/* Placeholder for Video Final */}
            <div className="bg-white p-3 text-center">{lesson.video_final_deadline}</div>
            <div className="bg-white p-3 truncate">{lesson.thumbnail_url}</div>
            <div className="bg-white p-3">{lesson.notes}</div>
        </div>
    );
};

const ChapterRow: React.FC<{ title: string }> = ({ title }) => (
    <div className="grid grid-cols-[40px_1fr_2fr_repeat(11,_1fr)] gap-px text-sm font-bold text-slate-900 items-center">
        <div className="bg-blue-50 p-3 text-center"></div>
        <div className="bg-blue-100 p-3 col-span-13">{title}</div>
    </div>
);

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course, onBack }) => {
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

  let lessonCounter = 0;

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
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-sm">
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
          <div className="min-w-[1800px]">
            <TableHeader />
            <div className="bg-slate-200">
              {chapters.map(chapter => (
                <React.Fragment key={chapter.id}>
                  <ChapterRow title={chapter.title} />
                  {chapter.lessons.map(lesson => (
                    <TableRow key={lesson.id} lesson={lesson} index={lessonCounter++} />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};