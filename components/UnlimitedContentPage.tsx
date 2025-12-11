import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  Plus, 
  Minus, 
  Trash2,
  Youtube,
  MessageSquare,
  FileText,
  Twitter,
  Linkedin,
  Bot,
  Sparkles,
  Play,
  MoreHorizontal,
  Link as LinkIcon,
  X
} from 'lucide-react';

// --- Types ---
type ContentNodeType = 'youtube' | 'chat' | 'note' | 'twitter' | 'linkedin';

interface VideoData {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
}

interface ContentNodeData {
  id: string;
  type: ContentNodeType;
  x: number;
  y: number;
  data: {
    title?: string;
    content?: string;
    // Updated for multiple videos
    videos?: VideoData[]; 
    messages?: { role: 'user' | 'ai'; text: string }[];
  };
}

interface Connection {
  id: string;
  source: string;
  target: string;
}

// --- Configuration ---
const NODE_CONFIG: Record<ContentNodeType, { icon: any, label: string, color: string, bg: string }> = {
  youtube: { icon: Youtube, label: 'YouTube Sources', color: '#FF0000', bg: '#FEF2F2' },
  chat: { icon: Bot, label: 'AI Assistant', color: '#8B5CF6', bg: '#F3E8FF' },
  note: { icon: FileText, label: 'Sticky Note', color: '#F59E0B', bg: '#FFFBEB' },
  twitter: { icon: Twitter, label: 'Twitter Thread', color: '#1DA1F2', bg: '#E0F2FE' },
  linkedin: { icon: Linkedin, label: 'LinkedIn Post', color: '#0A66C2', bg: '#E0F2FE' },
};

// --- Helper Functions ---
const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// --- Sub Component: Youtube Node Content (Handles multiple links) ---
const YoutubeNodeContent: React.FC<{ 
  nodeId: string; 
  videos: VideoData[]; 
  onUpdate: (id: string, videos: VideoData[]) => void 
}> = ({ nodeId, videos = [], onUpdate }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddVideo = () => {
    if (!inputValue) return;
    const videoId = getYoutubeId(inputValue);
    
    if (videoId) {
      const newVideo: VideoData = {
        id: videoId,
        url: inputValue,
        thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, // standard thumbnail
        title: `Video ${videoId}` // In a real app, you'd fetch the title via API
      };
      onUpdate(nodeId, [...videos, newVideo]);
      setInputValue('');
    } else {
      console.error("Invalid YouTube URL");
    }
  };

  const handleRemoveVideo = (vidId: string) => {
    onUpdate(nodeId, videos.filter(v => v.id !== vidId));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Input Area */}
      <div className="p-3 border-b border-slate-100 bg-slate-50">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Paste YouTube Link..." 
            className="flex-1 text-xs p-1.5 border border-slate-200 rounded focus:outline-none focus:border-red-400"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddVideo()}
          />
          <button 
            onClick={handleAddVideo}
            className="bg-red-600 text-white p-1.5 rounded hover:bg-red-700 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Video List */}
      <div className="flex-1 overflow-y-auto max-h-[200px] p-2 space-y-2">
        {videos.length === 0 && (
          <div className="text-center text-xs text-slate-400 py-4 italic">
            No videos added yet.
          </div>
        )}
        {videos.map((video) => (
          <div key={video.id} className="flex gap-3 bg-white border border-slate-100 p-2 rounded-lg group hover:shadow-sm transition-all relative">
            <div className="w-16 h-10 bg-black rounded overflow-hidden shrink-0 relative">
                <img src={video.thumbnail} alt="thumb" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={10} className="text-white fill-current" />
                </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="text-[11px] font-medium text-slate-700 truncate">{video.url}</div>
                <div className="text-[9px] text-slate-400">ID: {video.id}</div>
            </div>
            <button 
                onClick={() => handleRemoveVideo(video.id)}
                className="absolute -top-1 -right-1 bg-white border border-slate-200 rounded-full p-0.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            >
                <X size={10} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


export const UnlimitedContentPage: React.FC = () => {
  // --- State ---
  const [scale, setScale] = useState(1); // Zoom State

  const [nodes, setNodes] = useState<ContentNodeData[]>([
    { 
      id: '1', 
      type: 'youtube', 
      x: 100, 
      y: 100, 
      data: { 
        videos: [
            { 
                id: 'dQw4w9WgXcQ', 
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
                thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg', 
                title: 'Existing Video' 
            }
        ]
      } 
    },
    { 
      id: '2', 
      type: 'chat', 
      x: 550, 
      y: 100, 
      data: { 
        title: 'AI Analysis',
        messages: [
          { role: 'user', text: 'Analyze these videos for content themes.' },
          { role: 'ai', text: 'I see a mix of tutorial content and vlogs. The primary hook seems to be...' }
        ]
      } 
    }
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    { id: 'c1', source: '1', target: '2' },
  ]);

  // Dragging Logic
  const [isDraggingNode, setIsDraggingNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Connecting Logic
  const [isConnecting, setIsConnecting] = useState<{ sourceId: string, x: number, y: number } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);

  // --- Handlers ---

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));

  const handleDragStartFromSidebar = (e: React.DragEvent, type: ContentNodeType) => {
    e.dataTransfer.setData('nodeType', type);
  };

  const handleDropOnCanvas = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('nodeType') as ContentNodeType;
    if (!type || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    
    // Adjust coordinates based on Scale
    const x = (e.clientX - rect.left) / scale - 150; 
    const y = (e.clientY - rect.top) / scale - 50;

    const newNode: ContentNodeData = {
      id: `node-${Date.now()}`,
      type,
      x,
      y,
      data: {
        title: 'New Item',
        content: 'Click to edit...',
        videos: [],
        messages: type === 'chat' ? [{ role: 'ai', text: 'How can I help repurpose this content?' }] : undefined
      }
    };

    setNodes([...nodes, newNode]);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleNodeMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === id);
    if (!node) return;
    setIsDraggingNode(id);
    
    // Calculate offset correctly even when scaled (though dragging logic usually uses delta)
    // Here we store raw screen coordinate delta
    setDragOffset({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    
    // Mouse Pos for connecting line (Adjusted for scale)
    setMousePos({ 
        x: (e.clientX - rect.left) / scale, 
        y: (e.clientY - rect.top) / scale 
    });

    if (isDraggingNode) {
      // Calculate delta movement
      const deltaX = (e.clientX - dragOffset.x) / scale;
      const deltaY = (e.clientY - dragOffset.y) / scale;

      setNodes(prev => prev.map(n => {
        if (n.id === isDraggingNode) {
            return { ...n, x: n.x + deltaX, y: n.y + deltaY };
        }
        return n;
      }));

      // Update drag offset to current position for next frame
      setDragOffset({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDraggingNode(null);
    setIsConnecting(null);
  };

  // Connecting
  const handleConnectStart = (e: React.MouseEvent, sourceId: string) => {
    e.stopPropagation();
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setIsConnecting({ 
        sourceId, 
        x: (e.clientX - rect.left) / scale, 
        y: (e.clientY - rect.top) / scale 
    });
  };

  const handleConnectEnd = (e: React.MouseEvent, targetId: string) => {
    e.stopPropagation();
    if (isConnecting && isConnecting.sourceId !== targetId) {
      if (!connections.find(c => c.source === isConnecting.sourceId && c.target === targetId)) {
        setConnections([...connections, { id: `c-${Date.now()}`, source: isConnecting.sourceId, target: targetId }]);
      }
    }
    setIsConnecting(null);
  };

  const deleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
    setConnections(connections.filter(c => c.source !== id && c.target !== id));
  };

  const updateNodeVideos = (nodeId: string, newVideos: VideoData[]) => {
      setNodes(prev => prev.map(n => 
        n.id === nodeId ? { ...n, data: { ...n.data, videos: newVideos } } : n
      ));
  };

  // Helper for curved lines
  const getPath = (x1: number, y1: number, x2: number, y2: number) => {
    const cX1 = x1 + 100;
    const cX2 = x2 - 100;
    return `M ${x1} ${y1} C ${cX1} ${y1}, ${cX2} ${y2}, ${x2} ${y2}`;
  };

  return (
    <div className="flex h-full font-sans overflow-hidden bg-[#F8F9FB]">
      
      {/* Sidebar */}
      <div className="w-[260px] bg-white border-r border-slate-200 flex flex-col shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-5 border-b border-slate-100">
           <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
             <Sparkles className="text-[#0EB869]" size={18} />
             Content Brain
           </h1>
           <p className="text-xs text-slate-400 mt-1">Drag sources to brainstorm</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Sources</h3>
                <div className="space-y-2">
                    <DraggableItem type="youtube" label="YouTube Sources" icon={Youtube} />
                    <DraggableItem type="note" label="Raw Text / Notes" icon={FileText} />
                </div>
            </div>
            
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">AI Processing</h3>
                <div className="space-y-2">
                    <DraggableItem type="chat" label="AI Assistant" icon={Bot} />
                </div>
            </div>

            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Output Formats</h3>
                <div className="space-y-2">
                    <DraggableItem type="twitter" label="Twitter Thread" icon={Twitter} />
                    <DraggableItem type="linkedin" label="LinkedIn Post" icon={Linkedin} />
                </div>
            </div>
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-100">
            <div className="text-xs text-slate-500 text-center">
                Credits: <span className="font-bold text-slate-900">4,200 / 5,000</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-[#0EB869] w-[84%]"></div>
            </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Top Toolbar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between pointer-events-none">
            <div className="bg-white/80 backdrop-blur border border-slate-200 p-2 rounded-lg shadow-sm pointer-events-auto flex items-center gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 px-2">
                    <Home size={14} />
                    <span>/ Brainstorming /</span>
                    <span className="text-slate-900">Project Alpha</span>
                </div>
            </div>
            <div className="bg-white/80 backdrop-blur border border-slate-200 p-1.5 rounded-lg shadow-sm pointer-events-auto flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 px-2">{Math.round(scale * 100)}%</span>
                <button onClick={handleZoomOut} className="p-2 hover:bg-slate-100 rounded text-slate-600"><Minus size={16} /></button>
                <button onClick={handleZoomIn} className="p-2 hover:bg-slate-100 rounded text-slate-600"><Plus size={16} /></button>
            </div>
        </div>

        {/* Canvas Area Container */}
        <div 
            ref={canvasRef}
            className="w-full h-full relative cursor-default overflow-hidden"
            onDrop={handleDropOnCanvas}
            onDragOver={handleDragOver}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ backgroundColor: '#F8F9FB' }}
        >
            {/* SCALABLE CONTENT WRAPPER */}
            <div 
                style={{ 
                    transform: `scale(${scale})`, 
                    transformOrigin: '0 0',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 pointer-events-none z-0" style={{ 
                    backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)', 
                    backgroundSize: '24px 24px',
                    width: '10000px', // Large enough to cover zoom
                    height: '10000px'
                }}></div>

                <svg className="absolute top-0 left-0 w-[10000px] h-[10000px] pointer-events-none overflow-visible z-0">
                    <defs>
                        <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                            <path d="M2,2 L10,6 L2,10 L2,2" fill="#CBD5E1" />
                        </marker>
                    </defs>
                    {connections.map(conn => {
                        const source = nodes.find(n => n.id === conn.source);
                        const target = nodes.find(n => n.id === conn.target);
                        if (!source || !target) return null;
                        
                        const startX = source.x + 300; 
                        const startY = source.y + 60; 
                        const endX = target.x;
                        const endY = target.y + 60;

                        return (
                            <path 
                                key={conn.id}
                                d={getPath(startX, startY, endX, endY)}
                                stroke="#CBD5E1"
                                strokeWidth="2"
                                fill="none"
                                markerEnd="url(#arrowhead)"
                            />
                        )
                    })}
                    {isConnecting && (
                        <path 
                            d={getPath(
                                nodes.find(n => n.id === isConnecting.sourceId)!.x + 300, 
                                nodes.find(n => n.id === isConnecting.sourceId)!.y + 60,
                                mousePos.x, mousePos.y
                            )}
                            stroke="#0EB869"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            fill="none"
                        />
                    )}
                </svg>

                {nodes.map(node => (
                    <div
                        key={node.id}
                        style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
                        className="absolute z-10 w-[300px] group"
                    >
                        {/* Node Card */}
                        <div 
                            onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                            className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-[#0EB869]/50 transition-all cursor-grab active:cursor-grabbing overflow-hidden"
                        >
                            {/* Render different content based on type */}
                            {node.type === 'youtube' ? (
                                <div className="flex flex-col">
                                    <div className="px-3 py-2 border-b border-slate-100 bg-[#FEF2F2] flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-red-600">
                                            <Youtube size={16} />
                                            <span className="text-xs font-bold uppercase tracking-wide">YouTube Inputs</span>
                                        </div>
                                        <span className="text-[10px] font-bold bg-white text-slate-500 px-1.5 rounded-full border border-slate-200">
                                            {node.data.videos?.length || 0}
                                        </span>
                                    </div>
                                    <YoutubeNodeContent 
                                        nodeId={node.id} 
                                        videos={node.data.videos || []} 
                                        onUpdate={updateNodeVideos} 
                                    />
                                </div>
                            ) : (
                                renderStandardNodeContent(node)
                            )}
                        </div>

                        {/* Delete Button */}
                        <button 
                            onClick={() => deleteNode(node.id)}
                            className="absolute -top-2 -right-2 bg-white text-slate-400 hover:text-red-500 p-1.5 rounded-full shadow-sm border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={12} />
                        </button>

                        {/* Connection Handles */}
                        <div 
                            onMouseDown={(e) => handleConnectStart(e, node.id)}
                            className="absolute top-1/2 -right-3 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-[#0EB869] hover:border-[#0EB869] cursor-crosshair shadow-sm z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Plus size={12} />
                        </div>
                        <div 
                            onMouseUp={(e) => handleConnectEnd(e, node.id)}
                            className="absolute top-1/2 -left-3 w-6 h-6 bg-transparent z-20"
                        ></div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Standard Node Renderer (For non-complex nodes) ---
const renderStandardNodeContent = (node: ContentNodeData) => {
    const config = NODE_CONFIG[node.type];
    
    switch(node.type) {
        case 'chat':
            return (
                <div className="flex flex-col h-[280px]">
                    <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-[#F3E8FF]">
                        <div className="flex items-center gap-2 text-purple-700">
                            <Bot size={16} />
                            <span className="text-xs font-bold uppercase tracking-wide">AI Assistant</span>
                        </div>
                        <MoreHorizontal size={14} className="text-purple-400" />
                    </div>
                    <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-white text-xs">
                        {node.data.messages?.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-2 rounded-lg max-w-[85%] ${msg.role === 'user' ? 'bg-slate-100 text-slate-700' : 'bg-purple-50 text-purple-800'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-2 border-t border-slate-100">
                        <input type="text" placeholder="Ask AI..." className="w-full text-xs p-2 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:border-purple-400" />
                    </div>
                </div>
            );

        case 'twitter':
            return (
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-3 text-[#1DA1F2]">
                        <Twitter size={16} fill="currentColor" />
                        <span className="text-xs font-bold uppercase">Twitter Thread</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-800 whitespace-pre-wrap font-medium">
                        {node.data.content}
                    </div>
                    <div className="mt-3 flex gap-2">
                        <button className="flex-1 py-1.5 bg-[#1DA1F2] text-white text-xs font-bold rounded hover:opacity-90">Tweet</button>
                        <button className="flex-1 py-1.5 border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-50">Edit</button>
                    </div>
                </div>
            );

        default: // Notes, Linkedin, etc.
            return (
                <div className="p-4 bg-[#FFFBEB]">
                    <div className="flex items-center gap-2 mb-2 text-amber-600">
                        <config.icon size={16} />
                        <span className="text-xs font-bold uppercase">{config.label}</span>
                    </div>
                    <textarea 
                        className="w-full bg-transparent border-none resize-none text-sm text-slate-700 focus:ring-0 p-0 font-medium"
                        rows={4}
                        defaultValue={node.data.content || "Brainstorming notes..."}
                    />
                </div>
            );
    }
};

const DraggableItem = ({ type, label, icon: Icon }: { type: ContentNodeType, label: string, icon: any }) => {
    const config = NODE_CONFIG[type];
    return (
        <div 
            draggable 
            onDragStart={(e: React.DragEvent) => { e.dataTransfer.setData('nodeType', type); }}
            className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white hover:border-[#0EB869] hover:shadow-sm cursor-grab active:cursor-grabbing transition-all select-none"
        >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: config.bg, color: config.color }}>
                <Icon size={16} />
            </div>
            <span className="text-sm font-medium text-slate-700">{label}</span>
        </div>
    );
};