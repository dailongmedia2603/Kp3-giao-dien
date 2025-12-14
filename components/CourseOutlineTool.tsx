import React, { useState } from 'react';
import { ArrowLeft, Plus, MoreHorizontal, Trash2, Edit, BookOpen, Users } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  modules: number;
  students: number;
}

const MOCK_COURSES: Course[] = [
  { id: 1, title: 'The Godfather Offer', modules: 12, students: 4500 },
  { id: 2, title: 'Direct Response Mastery', modules: 8, students: 2100 },
  { id: 3, title: 'AI Content Engine', modules: 15, students: 1800 },
];

const CourseCard: React.FC<{ course: Course; onDelete: (id: number) => void; }> = ({ course, onDelete }) => {
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
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);

  const handleAddCourse = () => {
    const newCourse: Course = {
      id: Date.now(),
      title: `New Course #${courses.length + 1}`,
      modules: 0,
      students: 0,
    };
    setCourses([newCourse, ...courses]);
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
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
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-sm"
        >
          <Plus size={14} /> New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} onDelete={handleDeleteCourse} />
        ))}
      </div>
    </div>
  );
};