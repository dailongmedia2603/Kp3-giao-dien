import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, MoreHorizontal, Trash2, Edit, BookOpen, Users, Loader2 } from 'lucide-react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from '@/src/contexts/SessionContext';

interface Course {
  id: string; // UUID from Supabase
  title: string;
  modules: number;
  students: number;
  user_id: string;
  created_at: string;
}

const CourseCard: React.FC<{ course: Course; onDelete: (id: string) => void; }> = ({ course, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 group hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
          <BookOpen size={24} />
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600">
          <MoreHorizontal size={18} />
        </button>
      </div>
      <h3 className="font-bold text-slate-900 text-lg mb-2">{course.title}</h3>
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
        <span className="flex items-center gap-1.5"><BookOpen size={14} /> {course.modules} Modules</span>
        <span className="flex items-center gap-1.5"><Users size={14} /> {course.students.toLocaleString()} Students</span>
      </div>
      <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
        <button onClick={() => onDelete(course.id)} className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 p-2 rounded hover:bg-red-50">
          <Trash2 size={14} /> Delete
        </button>
        <button className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 p-2 rounded hover:bg-blue-50">
          <Edit size={14} /> Edit
        </button>
      </div>
    </div>
  );
};

export const CourseOutlineTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { user } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching courses:', error);
      } else {
        setCourses(data || []);
      }
      setIsLoading(false);
    };

    fetchCourses();
  }, [user]);

  const handleAddCourse = async () => {
    if (!user || isAdding) return;
    
    setIsAdding(true);
    const { data, error } = await supabase
      .from('courses')
      .insert({ 
        title: `New Course #${courses.length + 1}`, 
        user_id: user.id 
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding course:', error);
    } else if (data) {
      setCourses(prevCourses => [data, ...prevCourses]);
    }
    setIsAdding(false);
  };

  const handleDeleteCourse = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('courses')
      .delete()
      .match({ id: id, user_id: user.id });

    if (error) {
      console.error('Error deleting course:', error);
    } else {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Course Outlines</h2>
            <p className="text-slate-500 text-sm">Manage and structure your educational products.</p>
          </div>
        </div>
        <button 
          onClick={handleAddCourse}
          disabled={isAdding}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-sm disabled:bg-blue-400"
        >
          {isAdding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} 
          New Course
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 size={32} className="animate-spin text-slate-400" />
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <BookOpen size={24} />
            </div>
            <h3 className="text-slate-900 font-bold mb-1">No Courses Yet</h3>
            <p className="text-slate-500 text-sm mb-4">Click "New Course" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} onDelete={handleDeleteCourse} />
          ))}
        </div>
      )}
    </div>
  );
};