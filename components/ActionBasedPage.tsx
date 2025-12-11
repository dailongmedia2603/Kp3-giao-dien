import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  Zap, 
  PlayCircle, 
  CheckCircle2, 
  Lock, 
  ArrowUp, 
  UploadCloud, 
  FileText, 
  User, 
  TrendingUp, 
  Flame,
  Award,
  ArrowLeft
} from 'lucide-react';

// --- TYPES & MOCK DATA ---

interface RoadmapStep {
  id: number;
  title: string;
  type: 'lesson' | 'milestone';
  status: 'completed' | 'current' | 'locked';
}

const MOCK_ROADMAP: RoadmapStep[] = [
  { id: 6, title: 'The Summit: Mastery Achieved', type: 'milestone', status: 'locked' },
  { id: 5, title: 'Lesson 4: Scaling Your System', type: 'lesson', status: 'locked' },
  { id: 4, title: 'Lesson 3: The Offer Stack', type: 'lesson', status: 'locked' },
  { id: 3, title: 'MILESTONE: The Godfather Offer', type: 'milestone', status: 'current' },
  { id: 2, title: 'Lesson 2: Identifying Pain Points', type: 'lesson', status: 'completed' },
  { id: 1, title: 'Lesson 1: The Core Concept', type: 'lesson', status: 'completed' },
];

interface ActionItem {
  id: number;
  text: string;
  completed: boolean;
}

const MOCK_LESSON_DATA = {
  title: 'MILESTONE: The Godfather Offer',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  actionItems: [
    { id: 1, text: 'Define your core offer value proposition.', completed: false },
    { id: 2, text: 'List 3 bonuses that complement your offer.', completed: false },
    { id: 3, text: 'Create a sense of urgency (e.g., limited time).', completed: false },
  ],
  homework: {
    required: true,
    prompt: 'Upload a one-page PDF outlining your full "Godfather Offer".',
    status: 'none' as 'none' | 'pending' | 'approved' | 'resubmit',
  }
};

// --- MAIN COMPONENT ---
export const ActionBasedPage: React.FC = () => {
  const [view, setView] = useState<'map' | 'player'>('map');
  const [currentStep, setCurrentStep] = useState<RoadmapStep | null>(MOCK_ROADMAP.find(s => s.status === 'current') || null);

  const handleStartLesson = (step: RoadmapStep) => {
    if (step.status === 'current') {
      setCurrentStep(step);
      setView('player');
    }
  };

  const handleCompleteLesson = () => {
    // In a real app, this would update backend state
    setView('map');
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            The Implementation Hub
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight flex items-center gap-3">
          <Zap size={28} className="text-amber-500" />
          The Action-Based OS
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Consumption does not equal transformation. Do the work, unlock the next level.
        </p>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        {view === 'map' && <ProgressMapView roadmap={MOCK_ROADMAP} onStartLesson={handleStartLesson} />}
        {view === 'player' && currentStep && <CoursePlayerView lesson={MOCK_LESSON_DATA} onComplete={handleCompleteLesson} />}
      </div>
    </div>
  );
};

// --- SUB-VIEWS ---

const ProgressMapView: React.FC<{ roadmap: RoadmapStep[], onStartLesson: (step: RoadmapStep) => void }> = ({ roadmap, onStartLesson }) => (
  <div className="w-full h-full flex items-end justify-center p-8 bg-slate-50 rounded-xl border border-slate-200 animate-in fade-in duration-500">
    <div className="relative w-full max-w-4xl h-[500px]">
      {/* The Path */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <path 
          d="M 50 480 C 250 480, 150 360, 350 360 S 550 240, 750 240 S 550 120, 350 120 S 150 0, 50 0" 
          fill="none" 
          stroke="#e2e8f0" 
          strokeWidth="8" 
          strokeDasharray="15 15"
        />
      </svg>
      
      {/* The Steps */}
      {roadmap.map((step, index) => {
        const position = {
          1: { bottom: '20px', left: '50px' },
          2: { bottom: '120px', left: '200px' },
          3: { bottom: '120px', left: '500px' },
          4: { bottom: '240px', left: '600px' },
          5: { bottom: '360px', left: '450px' },
          6: { bottom: '480px', left: '50px' },
        }[step.id] || { bottom: '0', left: '0' };

        return (
          <div key={step.id} className="absolute" style={position}>
            <StepNode step={step} onClick={() => onStartLesson(step)} />
          </div>
        );
      })}
    </div>
  </div>
);

const CoursePlayerView: React.FC<{ lesson: typeof MOCK_LESSON_DATA, onComplete: () => void }> = ({ lesson, onComplete }) => {
  const [actionItems, setActionItems] = useState<ActionItem[]>(lesson.actionItems);
  const [homeworkStatus, setHomeworkStatus] = useState(lesson.homework.status);
  const [unlocking, setUnlocking] = useState(false);

  const allActionsCompleted = actionItems.every(item => item.completed) && (lesson.homework.required ? homeworkStatus === 'approved' : true);

  const handleToggleAction = (id: number) => {
    setActionItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handleComplete = () => {
    if (!allActionsCompleted) return;
    setUnlocking(true);
    // Simulate animation and sound
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full animate-in fade-in duration-300">
      {/* Left: Video Player */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
        <div className="aspect-video bg-black rounded-t-xl flex items-center justify-center">
          <PlayCircle size={64} className="text-white/30" />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">{lesson.title}</h2>
          <p className="text-sm text-slate-500">A detailed walkthrough of crafting an offer so good, people feel stupid saying no.</p>
        </div>
        <div className="mt-auto p-6 border-t border-slate-100">
          <AccountabilityWidget />
        </div>
      </div>

      {/* Right: Action Hub */}
      <div className="w-full lg:w-[450px] shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Action Hub</h3>
        </div>
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Action Checklist */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <h4 className="text-sm font-bold text-slate-900 mb-4">Action Checklist</h4>
            <div className="space-y-3">
              {actionItems.map(item => (
                <label key={item.id} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={item.completed} onChange={() => handleToggleAction(item.id)} className="h-5 w-5 rounded border-slate-300 text-[#0EB869] focus:ring-[#0EB869]/50 mt-0.5" />
                  <span className={`text-sm ${item.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{item.text}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Homework Submission */}
          {lesson.homework.required && (
            <HomeworkSubmission status={homeworkStatus} setStatus={setHomeworkStatus} prompt={lesson.homework.prompt} />
          )}
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50">
          <button 
            onClick={handleComplete}
            disabled={!allActionsCompleted || unlocking}
            className={`w-full py-3 rounded-lg text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2
              ${unlocking ? 'bg-green-500' : 
                allActionsCompleted ? 'bg-[#0EB869] hover:bg-[#0B9655]' : 'bg-slate-300 cursor-not-allowed'}
            `}
          >
            {unlocking ? <><CheckCircle2 size={18} /> Module Unlocked!</> : 
             allActionsCompleted ? <><Lock size={18} /> Mark as Complete & Unlock Next</> : <><Lock size={18} /> Complete Actions to Proceed</>}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const StepNode: React.FC<{ step: RoadmapStep, onClick: () => void }> = ({ step, onClick }) => {
  const isCompleted = step.status === 'completed';
  const isCurrent = step.status === 'current';
  const isLocked = step.status === 'locked';

  const baseStyle = "w-40 h-24 rounded-xl border-2 p-3 flex flex-col justify-between transition-all duration-300";
  const stateStyle = isCompleted ? "bg-white border-slate-200" :
                     isCurrent ? "bg-white border-[#0EB869] shadow-lg shadow-green-500/20 cursor-pointer hover:shadow-xl hover:-translate-y-1" :
                     "bg-slate-100 border-slate-200 opacity-60";

  const icon = isCompleted ? <CheckCircle2 size={20} className="text-green-500" /> :
               isCurrent ? <ArrowUp size={20} className="text-green-500 animate-bounce" /> :
               <Lock size={20} className="text-slate-400" />;

  return (
    <div onClick={onClick} className={`${baseStyle} ${stateStyle}`}>
      <div className="flex justify-between items-start">
        <span className={`text-xs font-bold ${isLocked ? 'text-slate-400' : 'text-slate-500'}`}>{step.type}</span>
        {icon}
      </div>
      <h4 className={`font-bold text-sm leading-tight ${isLocked ? 'text-slate-400' : 'text-slate-800'}`}>{step.title}</h4>
    </div>
  );
};

const HomeworkSubmission: React.FC<{ status: string, setStatus: (s: any) => void, prompt: string }> = ({ status, setStatus, prompt }) => {
  const handleFileDrop = () => {
    setStatus('pending');
    setTimeout(() => setStatus('approved'), 2000); // Simulate review
  };

  return (
    <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-5 text-center">
      <h4 className="text-sm font-bold text-slate-900 mb-2">Homework Submission</h4>
      <p className="text-xs text-slate-500 mb-4">{prompt}</p>
      {status === 'none' && (
        <button onClick={handleFileDrop} className="w-full py-4 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors">
          <UploadCloud size={24} className="mx-auto text-slate-400 mb-2" />
          <span className="text-sm font-medium text-slate-600">Drop file or Click to Upload</span>
        </button>
      )}
      {status === 'pending' && <div className="text-sm font-bold text-amber-600">Pending Review...</div>}
      {status === 'approved' && <div className="text-sm font-bold text-green-600 flex items-center justify-center gap-2"><CheckCircle2 /> Approved! (+50 XP)</div>}
      {status === 'resubmit' && <div className="text-sm font-bold text-red-600">Resubmit: Missing details.</div>}
    </div>
  );
};

const AccountabilityWidget: React.FC = () => (
  <div className="space-y-4">
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
      <Flame size={24} className="text-blue-600" />
      <div>
        <p className="font-bold text-blue-900">You're on a 5-day streak!</p>
        <p className="text-xs text-blue-700">Keep up the momentum.</p>
      </div>
    </div>
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center gap-3">
      <Users size={24} className="text-slate-500" />
      <div>
        <p className="font-bold text-slate-800">3 people just finished this lesson.</p>
        <p className="text-xs text-slate-500">You're right on track with the cohort.</p>
      </div>
    </div>
  </div>
);