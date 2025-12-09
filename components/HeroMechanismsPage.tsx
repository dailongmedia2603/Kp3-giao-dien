import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Zap, 
  Settings, 
  Cpu, 
  Layers, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  Sparkles,
  RefreshCw,
  Download,
  Share2,
  PenTool
} from 'lucide-react';

export const HeroMechanismsPage: React.FC = () => {
  // State for the mechanism configuration
  const [config, setConfig] = useState({
    name: "The Tri-Vector Scaling Protocol",
    current_state: "Overwhelmed & Stagnant",
    desired_state: "Automated Growth",
    problem: "Burnout",
    steps: [
      { 
        id: 1, 
        title: "Diagnose & Deconstruct", 
        desc: "We identify the bottlenecks choking your efficiency and break them down into atomic units.",
        icon: "scan"
      },
      { 
        id: 2, 
        title: "The Velocity Engine", 
        desc: "Install our proprietary automation layer that handles 80% of repetitive tasks instantly.",
        icon: "cpu" 
      },
      { 
        id: 3, 
        title: "Compound Scaling", 
        desc: "Reinvest reclaimed time into high-leverage activities that compound your results exponentially.",
        icon: "zap" 
      }
    ]
  });

  const handleStepChange = (index: number, field: string, value: string) => {
    const newSteps = [...config.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setConfig({ ...config, steps: newSteps });
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col items-center mb-10 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Hero Mechanisms
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Unique Mechanism Builder
        </h1>
        
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Turn your service into a tangible product. Visualize your proprietary process to justify your price and eliminate competitors.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 flex-1 min-h-0">
        
        {/* LEFT: Configuration Panel */}
        <div className="w-full xl:w-[450px] shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-fit">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Settings size={18} className="text-slate-400" />
                    Mechanism Configuration
                </h3>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto max-h-[800px]">
                {/* Core Identity */}
                <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Core Identity</label>
                    <div>
                        <label className="block text-[13px] font-bold text-slate-700 mb-1">Mechanism Name</label>
                        <input 
                            type="text" 
                            value={config.name}
                            onChange={(e) => setConfig({...config, name: e.target.value})}
                            className="w-full p-2.5 border border-slate-200 rounded-lg text-sm font-bold text-indigo-600 focus:outline-none focus:border-indigo-500 bg-indigo-50/30"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[13px] font-bold text-slate-700 mb-1">From (Pain)</label>
                            <input 
                                type="text" 
                                value={config.current_state}
                                onChange={(e) => setConfig({...config, current_state: e.target.value})}
                                className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-bold text-slate-700 mb-1">To (Desire)</label>
                            <input 
                                type="text" 
                                value={config.desired_state}
                                onChange={(e) => setConfig({...config, desired_state: e.target.value})}
                                className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[13px] font-bold text-slate-700 mb-1">Without (The Enemy)</label>
                        <input 
                            type="text" 
                            value={config.problem}
                            onChange={(e) => setConfig({...config, problem: e.target.value})}
                            className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div className="h-px bg-slate-100"></div>

                {/* Steps Config */}
                <div className="space-y-6">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">The 3-Step Process</label>
                    
                    {config.steps.map((step, idx) => (
                        <div key={step.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                                <span className="text-xs font-bold text-slate-400 uppercase">Phase {idx + 1}</span>
                            </div>
                            <div className="space-y-3">
                                <input 
                                    type="text" 
                                    value={step.title}
                                    onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                                    className="w-full p-2 border border-slate-200 rounded text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                                    placeholder="Phase Name"
                                />
                                <textarea 
                                    rows={3}
                                    value={step.desc}
                                    onChange={(e) => handleStepChange(idx, 'desc', e.target.value)}
                                    className="w-full p-2 border border-slate-200 rounded text-xs text-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                                    placeholder="Phase Description"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* RIGHT: Visual Preview (The Mechanism) */}
        <div className="flex-1 bg-[#F8FAFC] rounded-xl border border-slate-200 shadow-inner p-8 flex flex-col relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" 
                style={{ 
                    backgroundImage: 'radial-gradient(#4F46E5 1px, transparent 1px)', 
                    backgroundSize: '24px 24px' 
                }}>
            </div>

            {/* Toolbar */}
            <div className="absolute top-6 right-6 z-20 flex gap-2">
                 <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 shadow-sm">
                    <RefreshCw size={14} /> Regenerate
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 shadow-sm">
                    <Download size={14} /> Export Graphic
                </button>
            </div>

            {/* The Blueprint Canvas */}
            <div className="flex-1 flex items-center justify-center z-10 p-4">
                
                {/* Main Mechanism Card Container */}
                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative group">
                    
                    {/* Top Bar / Branding */}
                    <div className="bg-slate-900 text-white p-6 flex flex-col md:flex-row justify-between items-center border-b border-slate-800">
                        <div className="flex items-center gap-3 mb-4 md:mb-0">
                            <div className="p-2 bg-indigo-500 rounded-lg">
                                <Sparkles className="text-white" size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold tracking-tight">{config.name}</h2>
                                <p className="text-indigo-200 text-xs uppercase tracking-widest font-semibold">Proprietary Framework</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
                             <Lock size={12} className="text-indigo-400" />
                             <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Internal Use Only</span>
                        </div>
                    </div>

                    {/* Promise Statement */}
                    <div className="bg-indigo-50 border-b border-indigo-100 p-6 text-center">
                        <p className="text-lg text-slate-700 font-medium">
                            How we take you from <span className="font-bold text-red-500 border-b-2 border-red-200">{config.current_state}</span> to <span className="font-bold text-green-600 border-b-2 border-green-200">{config.desired_state}</span> without <span className="font-bold text-slate-900 italic">{config.problem}</span>.
                        </p>
                    </div>

                    {/* The Process Flow */}
                    <div className="p-10 lg:p-14 relative">
                        
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-1/2 left-20 right-20 h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                            
                            {/* Step 1 */}
                            <MechanismStepCard 
                                step={config.steps[0]} 
                                number="01" 
                                color="indigo"
                                icon={<RefreshCw size={32} className="text-indigo-600" />}
                            />

                            {/* Arrow 1 (Desktop) */}
                            <div className="hidden lg:flex absolute top-1/2 left-[30%] -translate-y-1/2 z-0 text-slate-300">
                                <ArrowRight size={32} strokeWidth={3} />
                            </div>

                            {/* Step 2 */}
                            <MechanismStepCard 
                                step={config.steps[1]} 
                                number="02" 
                                color="purple"
                                icon={<Cpu size={32} className="text-purple-600" />}
                            />

                            {/* Arrow 2 (Desktop) */}
                            <div className="hidden lg:flex absolute top-1/2 right-[30%] -translate-y-1/2 z-0 text-slate-300">
                                <ArrowRight size={32} strokeWidth={3} />
                            </div>

                            {/* Step 3 */}
                            <MechanismStepCard 
                                step={config.steps[2]} 
                                number="03" 
                                color="emerald"
                                icon={<Zap size={32} className="text-emerald-600" />}
                            />
                        </div>
                    </div>

                    {/* Footer / Guarantee */}
                    <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-center">
                         <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                            <CheckCircle2 size={14} className="text-[#0EB869]" />
                            <span>Systematized & Predictable Results</span>
                         </div>
                    </div>

                </div>

            </div>
        </div>

      </div>
    </div>
  );
};

// --- Sub-components ---

interface StepCardProps {
    step: { title: string, desc: string };
    number: string;
    color: 'indigo' | 'purple' | 'emerald';
    icon: React.ReactNode;
}

const MechanismStepCard: React.FC<StepCardProps> = ({ step, number, color, icon }) => {
    const colorStyles = {
        indigo: "border-indigo-100 hover:border-indigo-300 hover:shadow-indigo-100",
        purple: "border-purple-100 hover:border-purple-300 hover:shadow-purple-100",
        emerald: "border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-100",
    };

    const bgBadgeStyles = {
        indigo: "bg-indigo-50 text-indigo-600",
        purple: "bg-purple-50 text-purple-600",
        emerald: "bg-emerald-50 text-emerald-600",
    };

    return (
        <div className={`bg-white rounded-2xl p-6 border-2 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col items-center text-center relative group ${colorStyles[color]}`}>
            
            {/* Number Badge */}
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-black tracking-widest border border-white shadow-sm z-20 ${bgBadgeStyles[color]}`}>
                STEP {number}
            </div>

            {/* Icon Circle */}
            <div className={`w-20 h-20 rounded-full ${bgBadgeStyles[color]} flex items-center justify-center mb-5 relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}>
                <div className="absolute inset-0 bg-white/40 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                {icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">{step.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
                {step.desc}
            </p>

            {/* Bottom Indicator */}
            <div className={`mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <div className={`h-1 w-12 rounded-full mx-auto ${bgBadgeStyles[color].replace('text', 'bg')}`}></div>
            </div>
        </div>
    );
};
