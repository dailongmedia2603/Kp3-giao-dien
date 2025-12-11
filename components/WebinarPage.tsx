import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Layout, 
  Activity, 
  Award, 
  Layers, 
  Clock, 
  Image as ImageIcon, 
  Mic, 
  AlertCircle,
  TrendingDown,
  CheckCircle2,
  Plus,
  Trash2,
  MonitorPlay,
  Save
} from 'lucide-react';

interface WebinarPageProps {
  onBack: () => void;
}

// --- Types ---
interface ScriptSection {
  id: string;
  title: string;
  type: 'Intro' | 'Story' | 'Value' | 'Offer' | 'Objection' | 'Q&A';
  content: string;
  slideImage: string | null;
  estimatedDuration: number; // in minutes
}

interface StackItem {
  id: string;
  name: string;
  value: number;
  description: string;
}

// --- Mock Data ---
const INITIAL_SCRIPT: ScriptSection[] = [
  { id: '1', title: ' The "Big Promise" Hook', type: 'Intro', content: "In the next 45 minutes, I'm going to show you exactly how to [Result] without [Pain]...", slideImage: null, estimatedDuration: 2 },
  { id: '2', title: 'The Origin Story', type: 'Story', content: "I wasn't always a guru. 3 years ago, I was sleeping on my brother's couch...", slideImage: null, estimatedDuration: 5 },
  { id: '3', title: 'Secret #1: The Vehicle', type: 'Value', content: "Most people think they need [Old Way], but actually they need [New Way]...", slideImage: null, estimatedDuration: 10 },
  { id: '4', title: 'The Stack Reveal', type: 'Offer', content: "So here is everything you're going to get today...", slideImage: null, estimatedDuration: 8 },
];

const INITIAL_STACK: StackItem[] = [
  { id: '1', name: 'Masterclass Core Training', value: 1997, description: 'The complete 6-week system.' },
  { id: '2', name: 'Bonus #1: Template Library', value: 497, description: 'Copy-paste templates to save time.' },
  { id: '3', name: 'Bonus #2: Private Community', value: 997, description: '24/7 access to networking.' },
];

export const WebinarPage: React.FC<WebinarPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'storyboard' | 'analytics' | 'scorecard' | 'stack'>('storyboard');

  return (
    <div className="animate-in fade-in duration-300 font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              Webinar Optimization <span className="text-[#0EB869] text-xs px-2 py-0.5 bg-[#E8FCF3] rounded-full uppercase tracking-wide">Live</span>
            </h2>
            <p className="text-slate-500 text-sm">High-Ticket Sales Science</p>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">
                <MonitorPlay size={14} /> Preview
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0EB869] text-white text-xs font-bold rounded-lg hover:bg-[#0B9655] transition-colors shadow-sm">
                <Save size={14} /> Save Project
            </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex border-b border-slate-200 mb-6 shrink-0">
        <NavButton active={activeTab === 'storyboard'} onClick={() => setActiveTab('storyboard')} icon={Layout} label="Storyboard Script" />
        <NavButton active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={Activity} label="Retention EKG" />
        <NavButton active={activeTab === 'scorecard'} onClick={() => setActiveTab('scorecard')} icon={Award} label="Performance Scorecard" />
        <NavButton active={activeTab === 'stack'} onClick={() => setActiveTab('stack')} icon={Layers} label="Offer Stack Builder" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {activeTab === 'storyboard' && <StoryboardView />}
        {activeTab === 'analytics' && <RetentionEKGView />}
        {activeTab === 'scorecard' && <ScorecardView />}
        {activeTab === 'stack' && <StackBuilderView />}
      </div>
    </div>
  );
};

// --- Sub-Views ---

// 1. Storyboard View
const StoryboardView = () => {
    const [sections, setSections] = useState<ScriptSection[]>(INITIAL_SCRIPT);

    const calculateTime = (text: string) => {
        // Avg speaking rate ~130 words per minute
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / 130);
    };

    const handleContentChange = (id: string, newContent: string) => {
        setSections(prev => prev.map(sec => 
            sec.id === id ? { ...sec, content: newContent, estimatedDuration: calculateTime(newContent) } : sec
        ));
    };

    const totalDuration = sections.reduce((acc, curr) => acc + curr.estimatedDuration, 0);

    return (
        <div className="flex h-full">
            {/* Left: Script Editor */}
            <div className="flex-1 border-r border-slate-200 flex flex-col min-w-0">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 text-sm">Script Editor</h3>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Clock size={14} /> Total Est: <span className="text-slate-900 font-bold">{totalDuration} mins</span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {sections.map((section, idx) => (
                        <div key={section.id} className="group">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                                    <span className="font-bold text-slate-900 text-sm">{section.title}</span>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                                        section.type === 'Offer' ? 'bg-green-50 text-green-700 border-green-200' : 
                                        section.type === 'Story' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-500 border-slate-200'
                                    }`}>{section.type}</span>
                                </div>
                                <span className="text-xs text-slate-400 font-mono">~{section.estimatedDuration}m</span>
                            </div>
                            <textarea 
                                value={section.content}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleContentChange(section.id, e.target.value)}
                                className="w-full p-4 border border-slate-200 rounded-lg text-sm text-slate-700 leading-relaxed focus:outline-none focus:border-[#0EB869] focus:ring-2 focus:ring-[#0EB869]/10 resize-none min-h-[120px]"
                            />
                        </div>
                    ))}
                    <button className="w-full py-3 border border-dashed border-slate-300 rounded-lg text-slate-400 font-bold text-sm hover:border-[#0EB869] hover:text-[#0EB869] transition-colors flex items-center justify-center gap-2">
                        <Plus size={16} /> Add New Section
                    </button>
                </div>
            </div>

            {/* Right: Slide Sync */}
            <div className="w-[350px] bg-slate-50 flex flex-col shrink-0 border-l border-slate-200">
                <div className="p-4 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800 text-sm">Visual Cues</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-8">
                    {sections.map((section, idx) => (
                        <div key={section.id} className="relative">
                            {/* Connector Line */}
                            {idx < sections.length - 1 && (
                                <div className="absolute left-1/2 top-full h-8 w-px bg-slate-300 -translate-x-1/2 z-0"></div>
                            )}
                            
                            <div className="bg-white border-2 border-slate-200 border-dashed rounded-lg aspect-video flex flex-col items-center justify-center text-slate-400 hover:border-[#0EB869] hover:text-[#0EB869] hover:bg-[#E8FCF3]/20 cursor-pointer transition-all z-10 relative">
                                <ImageIcon size={24} className="mb-2" />
                                <span className="text-xs font-bold">Drop Slide {idx + 1}</span>
                                <span className="text-[10px] opacity-60">Matches "{section.title}"</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 2. Retention EKG View
const RetentionEKGView = () => {
    // Mock Data for Graph (60 minutes)
    const dataPoints = [
        100, 98, 98, 97, 96, 95, 95, 94, 92, 90, // 0-9
        88, 85, 82, 70, 65, 62, 60, 58, 55, 54, // 10-19 (Big drop at 13-15)
        53, 52, 52, 51, 50, 50, 49, 48, 48, 47, // 20-29
        47, 46, 45, 44, 43, 42, 40, 38, 35, 30, // 30-39 (Offer drop)
        28, 25, 24, 22, 20, 18, 15, 12, 10, 8,  // 40-49
        5, 4, 3, 2, 1                           // 50-54
    ];

    // SVG scaling
    const width = 800;
    const height = 300;
    const maxVal = 100;
    const points = dataPoints.map((val, i) => {
        const x = (i / (dataPoints.length - 1)) * width;
        const y = height - (val / maxVal) * height;
        return `${x},${y}`;
    }).join(' ');

    // Detect Drops (Simple heuristic: delta > 5)
    const drops = [];
    for(let i = 1; i < dataPoints.length; i++) {
        if(dataPoints[i-1] - dataPoints[i] > 3) {
            drops.push(i);
        }
    }

    return (
        <div className="p-8 h-full overflow-y-auto">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">The Retention EKG</h3>
                    <p className="text-slate-500 text-sm">Analyze second-by-second engagement. Identify boring sections immediately.</p>
                </div>

                {/* The Chart */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative mb-8">
                    <div className="absolute top-4 right-6 flex items-center gap-4 text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#0EB869]"></div> Live Attendees</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500/50"></div> Drop-off Event</span>
                    </div>

                    <div className="h-[350px] w-full relative flex items-end">
                        {/* Y-Axis Labels */}
                        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-slate-400 font-mono py-2">
                            <span>100%</span>
                            <span>75%</span>
                            <span>50%</span>
                            <span>25%</span>
                            <span>0%</span>
                        </div>

                        {/* Chart SVG */}
                        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full pl-8 overflow-visible">
                            {/* Grid Lines */}
                            <line x1="0" y1="0" x2={width} y2="0" stroke="#f1f5f9" strokeWidth="1" />
                            <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke="#f1f5f9" strokeWidth="1" />
                            <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="#f1f5f9" strokeWidth="1" />
                            <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="#f1f5f9" strokeWidth="1" />
                            <line x1="0" y1={height} x2={width} y2={height} stroke="#f1f5f9" strokeWidth="1" />

                            {/* Drop Zones Highlight */}
                            {drops.map(idx => {
                                const x = (idx / (dataPoints.length - 1)) * width;
                                return (
                                    <rect 
                                        key={idx} 
                                        x={x - 10} 
                                        y="0" 
                                        width="20" 
                                        height={height} 
                                        fill="red" 
                                        fillOpacity="0.1" 
                                        className="cursor-pointer hover:fillOpacity-0.2 transition-all"
                                    />
                                );
                            })}

                            {/* The Line */}
                            <polyline 
                                points={points} 
                                fill="none" 
                                stroke="#0EB869" 
                                strokeWidth="3" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="drop-shadow-sm"
                            />
                        </svg>

                        {/* X-Axis Labels */}
                        <div className="absolute bottom-0 left-8 right-0 flex justify-between text-[10px] text-slate-400 font-mono translate-y-4">
                            <span>0m</span>
                            <span>15m</span>
                            <span>30m</span>
                            <span>45m</span>
                            <span>60m</span>
                        </div>
                    </div>
                </div>

                {/* Analysis Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                        <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                            <TrendingDown size={18} /> Major Drop-off Detected
                        </h4>
                        <div className="flex items-start gap-4">
                            <div className="text-3xl font-black text-red-800">14:00</div>
                            <div>
                                <p className="text-sm text-red-700/80 font-medium mb-1">Context: "The Transition"</p>
                                <p className="text-xs text-red-600 leading-relaxed">
                                    You lost 12% of viewers here. This correlates with the "Technical Explanation" section. 
                                </p>
                                <button className="mt-3 text-xs font-bold bg-white text-red-600 px-3 py-1.5 rounded border border-red-200 shadow-sm hover:bg-red-50">
                                    Jump to Script
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-[#0EB869]" /> Engagement Spike
                        </h4>
                        <div className="flex items-start gap-4">
                            <div className="text-3xl font-black text-slate-800">22:30</div>
                            <div>
                                <p className="text-sm text-slate-600 font-medium mb-1">Context: "Client Case Study"</p>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Retention flattened (stopped dropping) during the Sarah Jenkins story. Do more of this.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Scorecard View
const ScorecardView = () => {
    const [scores, setScores] = useState({
        hook: 8,
        indoctrination: 6,
        pitch: 9,
        objection: 5
    });

    const averageScore = ((scores.hook + scores.indoctrination + scores.pitch + scores.objection) / 4).toFixed(1);

    const renderSlider = (key: keyof typeof scores, label: string, desc: string) => (
        <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <label className="font-bold text-slate-900 text-sm">{label}</label>
                    <p className="text-xs text-slate-500">{desc}</p>
                </div>
                <span className={`text-xl font-bold ${
                    scores[key] >= 8 ? 'text-[#0EB869]' : scores[key] >= 5 ? 'text-amber-500' : 'text-red-500'
                }`}>{scores[key]}/10</span>
            </div>
            <input 
                type="range" 
                min="1" 
                max="10" 
                step="1"
                value={scores[key]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScores({ ...scores, [key]: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0EB869]"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-bold uppercase">
                <span>Needs Work</span>
                <span>World Class</span>
            </div>
        </div>
    );

    return (
        <div className="flex h-full">
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Webinar Grading Rubric</h3>
                    
                    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                        {renderSlider('hook', 'The Hook', 'Did we grab attention in the first 2 minutes?')}
                        <div className="h-px bg-slate-100 my-6"></div>
                        {renderSlider('indoctrination', 'The Indoctrination', 'Did we build authority and break false beliefs?')}
                        <div className="h-px bg-slate-100 my-6"></div>
                        {renderSlider('pitch', 'The Pitch / Stack', 'Was the offer clear, logical, and irresistible?')}
                        <div className="h-px bg-slate-100 my-6"></div>
                        {renderSlider('objection', 'Objection Handling', 'Did we systematically dismantle doubts?')}
                    </div>
                </div>
            </div>

            <div className="w-[320px] bg-slate-50 border-l border-slate-200 p-8 flex flex-col items-center justify-center shrink-0">
                <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                    <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="3"
                        />
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={Number(averageScore) >= 8 ? '#0EB869' : Number(averageScore) >= 5 ? '#f59e0b' : '#ef4444'}
                            strokeWidth="3"
                            strokeDasharray={`${Number(averageScore) * 10}, 100`}
                            className="transition-all duration-1000 ease-out drop-shadow-md"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-4xl font-black text-slate-900">{averageScore}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Score</span>
                    </div>
                </div>
                
                <h4 className="font-bold text-slate-800 text-lg mb-2">
                    {Number(averageScore) >= 8 ? 'World Class Webinar' : Number(averageScore) >= 5 ? 'Good Foundation' : 'Needs Optimization'}
                </h4>
                <p className="text-center text-sm text-slate-500 leading-relaxed">
                    Based on your grading, your objection handling needs the most attention to increase conversion rate.
                </p>
            </div>
        </div>
    );
};

// 4. Offer Stack Builder
const StackBuilderView = () => {
    const [items, setItems] = useState<StackItem[]>(INITIAL_STACK);
    const [newItem, setNewItem] = useState({ name: '', value: 0, description: '' });

    const totalValue = items.reduce((acc, curr) => acc + curr.value, 0);

    const handleAddItem = () => {
        if (!newItem.name || newItem.value <= 0) return;
        setItems([...items, { ...newItem, id: Date.now().toString() }]);
        setNewItem({ name: '', value: 0, description: '' });
    };

    const handleDelete = (id: string) => {
        setItems(items.filter(i => i.id !== id));
    };

    return (
        <div className="flex h-full flex-col lg:flex-row">
            {/* Input Panel */}
            <div className="flex-1 p-8 overflow-y-auto border-r border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Build Your Offer Stack</h3>
                
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Item Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. The Copywriting Bible" 
                                className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0EB869]"
                                value={newItem.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({ ...newItem, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Real World Value ($)</label>
                            <input 
                                type="number" 
                                placeholder="e.g. 997" 
                                className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0EB869]"
                                value={newItem.value || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({ ...newItem, value: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Description (Bullet point)</label>
                        <input 
                            type="text" 
                            placeholder="e.g. My private swipe file of winning ads..." 
                            className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0EB869]"
                            value={newItem.description}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({ ...newItem, description: e.target.value })}
                        />
                    </div>
                    <button 
                        onClick={handleAddItem}
                        className="w-full py-2.5 bg-slate-900 text-white font-bold text-sm rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={16} /> Add To Stack
                    </button>
                </div>

                <div className="space-y-3">
                    {items.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg group">
                            <div>
                                <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                                <div className="text-xs text-slate-500">{item.description}</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-mono font-bold text-slate-700">${item.value.toLocaleString()}</span>
                                <button onClick={() => handleDelete(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visual Preview */}
            <div className="w-full lg:w-[500px] bg-slate-900 p-8 flex items-center justify-center shrink-0">
                <div className="w-full bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-center">
                        <h2 className="text-white font-black text-2xl uppercase tracking-widest">Here Is What You Get</h2>
                    </div>
                    <div className="p-8">
                        <div className="space-y-6">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between items-baseline border-b border-dashed border-slate-200 pb-2">
                                    <span className="font-bold text-slate-900 text-lg">{item.name}</span>
                                    <span className="font-bold text-slate-400 text-sm">(Value: ${item.value.toLocaleString()})</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-12 pt-6 border-t-4 border-slate-900 flex justify-between items-end">
                            <span className="font-black text-slate-900 text-xl uppercase">Total Value</span>
                            <span className="font-black text-red-600 text-4xl decoration-slate-900 line-through decoration-4 opacity-50">${totalValue.toLocaleString()}</span>
                        </div>
                        <div className="text-right mt-2">
                            <span className="font-black text-[#0EB869] text-5xl">${Math.round(totalValue * 0.1).toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="bg-[#E8FCF3] p-4 text-center border-t border-[#0EB869]/30">
                        <button className="bg-[#0EB869] text-white font-black text-xl py-3 px-8 rounded shadow-lg uppercase tracking-wide w-full hover:bg-[#0B9655]">
                            Yes! I Want Access Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helpers
const NavButton = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-4 border-b-2 text-sm font-bold transition-all ${
            active ? 'border-[#0EB869] text-[#0EB869]' : 'border-transparent text-slate-500 hover:text-slate-800'
        }`}
    >
        <Icon size={18} />
        {label}
    </button>
);