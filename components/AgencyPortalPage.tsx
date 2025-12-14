import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  FileText, 
  MoreHorizontal, 
  Clock, 
  Download, 
  ArrowLeft,
  X
} from 'lucide-react';

// --- TYPES & MOCK DATA ---

interface Stage {
  id: string;
  name: string;
  color: string;
}

interface Project {
  id: string;
  clientName: string;
  projectName: string;
  stageId: string;
  health: 'good' | 'warning' | 'danger';
  revenue: number;
  hoursLogged: number;
  hourlyRate: number;
  dueDate: string;
  approvalPending?: boolean;
}

const MOCK_BLUEPRINT_STAGES: Stage[] = [
  { id: 'stage1', name: 'Onboarding', color: 'bg-slate-500' },
  { id: 'stage2', name: 'Strategy & Kickoff', color: 'bg-blue-500' },
  { id: 'stage3', name: 'Execution', color: 'bg-purple-500' },
  { id: 'stage4', name: 'Client Review', color: 'bg-amber-500' },
  { id: 'stage5', name: 'Reporting & Offboarding', color: 'bg-green-500' },
];

const MOCK_PROJECTS: Project[] = [
  { id: 'proj1', clientName: 'TechFlow Inc.', projectName: 'Q4 SEO Overhaul', stageId: 'stage2', health: 'good', revenue: 15000, hoursLogged: 25, hourlyRate: 150, dueDate: '3 days left' },
  { id: 'proj2', clientName: 'Bloom Cosmetics', projectName: 'Holiday Ad Campaign', stageId: 'stage3', health: 'good', revenue: 25000, hoursLogged: 80, hourlyRate: 180, dueDate: '12 days left' },
  { id: 'proj3', clientName: 'Innovate Solutions', projectName: 'New Website Build', stageId: 'stage4', health: 'warning', revenue: 45000, hoursLogged: 200, hourlyRate: 200, dueDate: 'Due Tomorrow', approvalPending: true },
  { id: 'proj4', clientName: 'HealthCo', projectName: 'Content Marketing Retainer', stageId: 'stage3', health: 'danger', revenue: 8000, hoursLogged: 60, hourlyRate: 120, dueDate: 'Overdue' },
];

// --- SUB-COMPONENTS ---

const KanbanColumn: React.FC<{ stage: Stage; projects: Project[]; onProjectClick: (p: Project) => void; }> = ({ stage, projects, onProjectClick }) => (
  <div className="min-w-[320px] w-[320px] bg-slate-50 rounded-xl border border-slate-200 flex flex-col h-full max-h-[calc(100vh-280px)]">
    <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-slate-50 rounded-t-xl z-10">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${stage.color}`}></div>
        <h3 className="text-sm font-bold text-slate-800">{stage.name}</h3>
      </div>
      <span className="text-xs font-bold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full">{projects.length}</span>
    </div>
    <div className="p-3 space-y-3 overflow-y-auto flex-1">
      {projects.map(p => <ProjectCard key={p.id} project={p} onClick={() => onProjectClick(p)} />)}
      <button className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-slate-400 text-xs font-medium hover:border-[#0EB869] hover:text-[#0EB869] transition-colors">
        + New Project
      </button>
    </div>
  </div>
);

const ProjectCard: React.FC<{ project: Project; onClick: () => void; }> = ({ project, onClick }) => {
  const profit = project.revenue - (project.hoursLogged * project.hourlyRate);
  const profitMargin = project.revenue > 0 ? (profit / project.revenue) * 100 : 0;

  const healthColors = {
    good: 'border-green-300 bg-green-50 text-green-700',
    warning: 'border-amber-300 bg-amber-50 text-amber-700',
    danger: 'border-red-300 bg-red-50 text-red-700',
  };

  return (
    <div onClick={onClick} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-shadow group">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-bold text-slate-800 text-sm">{project.projectName}</p>
          <p className="text-xs text-slate-500">{project.clientName}</p>
        </div>
        <button className="text-slate-300 hover:text-slate-500"><MoreHorizontal size={14} /></button>
      </div>
      
      {project.approvalPending && (
        <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs font-bold text-amber-700 flex items-center gap-2">
          <Clock size={14} /> Waiting for Client Approval
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div className="text-left">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Profit Meter</div>
          <div className={`text-sm font-bold ${profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${profit.toLocaleString()}
            <span className="text-xs font-medium text-slate-400 ml-1">({profitMargin.toFixed(0)}%)</span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${healthColors[project.health]}`}>
          {project.dueDate}
        </div>
      </div>
    </div>
  );
};

const ClientPortalView: React.FC<{ project: Project; onBack: () => void; }> = ({ project, onBack }) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const currentStageIndex = MOCK_BLUEPRINT_STAGES.findIndex(s => s.id === project.stageId);
  const progress = ((currentStageIndex + 1) / MOCK_BLUEPRINT_STAGES.length) * 100;

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto rounded-xl border border-slate-200 shadow-lg animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <img src="/logo-full.png" alt="Agency Logo" className="h-8 mb-4" />
          <h1 className="text-2xl font-bold text-slate-900">{project.projectName}</h1>
          <p className="text-slate-500">Client Portal for {project.clientName}</p>
        </div>
        <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1">
          <ArrowLeft size={14} /> Back to Admin View
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Project Progress</h3>
        <div className="w-full bg-slate-100 rounded-full h-4 relative">
          <div className="bg-blue-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">{MOCK_BLUEPRINT_STAGES[currentStageIndex].name}</div>
        </div>
      </div>

      {/* Action Needed */}
      {project.approvalPending && (
        <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-xl p-6 mb-8 text-center">
          <h2 className="text-xl font-bold text-amber-800 mb-2">Action Needed: Your Approval is Required!</h2>
          <p className="text-amber-700 mb-4">Please review the latest designs for the new website homepage.</p>
          <button onClick={() => setShowFeedbackModal(true)} className="bg-amber-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-amber-600 shadow-md">
            Review & Leave Feedback
          </button>
        </div>
      )}

      {/* Project Vault */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Project Vault</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-slate-400" />
              <span className="font-medium text-slate-800">Final_Strategy_Doc.pdf</span>
            </div>
            <button className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><Download size={16} /></button>
          </div>
        </div>
      </div>

      {showFeedbackModal && <VisualFeedbackModal onClose={() => setShowFeedbackModal(false)} />}
    </div>
  );
};

const VisualFeedbackModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-900">Visual Feedback: Homepage V1</h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={18} /></button>
      </div>
      <div className="flex-1 p-4 bg-slate-100 overflow-auto relative">
        <img src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1500" alt="Design Preview" className="max-w-full max-h-full object-contain mx-auto shadow-lg" />
        {/* Mock Comments */}
        <div className="absolute top-[20%] left-[30%]">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-md cursor-pointer group">1</div>
          <div className="hidden group-hover:block absolute top-full left-0 mt-2 bg-white p-3 rounded-lg shadow-xl w-64 z-10">
            <p className="text-xs font-bold">Sarah Jenkins</p>
            <p className="text-sm">Can we make this logo bigger?</p>
          </div>
        </div>
        <div className="absolute top-[50%] left-[70%]">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-md cursor-pointer group">2</div>
           <div className="hidden group-hover:block absolute top-full left-0 mt-2 bg-white p-3 rounded-lg shadow-xl w-64 z-10">
            <p className="text-xs font-bold">Mike (Account Manager)</p>
            <p className="text-sm">@Sarah - Good point, I'll let the design team know.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export const AgencyPortalPage: React.FC = () => {
  const [view, setView] = useState<'pipeline' | 'client_portal'>('pipeline');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setActiveProject(project);
    setView('client_portal');
  };

  return (
    <div className="p-8 max-w-[1800px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Agency Portal
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Agency Delivery Command Center
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          The engine room for your service business. Automate delivery from "Sold" to "Done".
        </p>
      </div>

      {view === 'pipeline' && (
        <div className="flex gap-6 overflow-x-auto pb-4 h-full items-start animate-in fade-in duration-300">
          {MOCK_BLUEPRINT_STAGES.map(stage => (
            <KanbanColumn 
              key={stage.id} 
              stage={stage} 
              projects={MOCK_PROJECTS.filter(p => p.stageId === stage.id)}
              onProjectClick={handleProjectClick}
            />
          ))}
        </div>
      )}

      {view === 'client_portal' && activeProject && (
        <ClientPortalView project={activeProject} onBack={() => setView('pipeline')} />
      )}
    </div>
  );
};