import React, { useState, useRef, useCallback } from 'react';
import { 
  Home, 
  ChevronRight, 
  Plus, 
  Minus, 
  Move, 
  Trash2,
  Facebook,
  Mail,
  Video,
  ShoppingCart,
  Calendar,
  CreditCard,
  MousePointer2,
  LayoutTemplate,
  X,
  Calculator,
  DollarSign,
  Eye
} from 'lucide-react';

// --- Types ---
type NodeType = 'traffic' | 'page' | 'video' | 'email' | 'checkout' | 'calendar' | 'purchase' | 'cpm';

interface NodeData {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  label: string;
  // Data for calculator nodes
  data?: {
    cost?: number;
    impressions?: number;
    cpm?: string;
  };
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
}

// --- Configuration for Node Visuals ---
const NODE_CONFIG: Record<NodeType, { icon: any, color: string, bg: string, label: string }> = {
  traffic: { icon: Facebook, color: '#1877F2', bg: '#E7F5FF', label: 'Facebook Ad' },
  page: { icon: LayoutTemplate, color: '#64748B', bg: '#F1F5F9', label: 'Landing Page' },
  video: { icon: Video, color: '#EF4444', bg: '#FEF2F2', label: 'Video Page' },
  email: { icon: Mail, color: '#F59E0B', bg: '#FFFBEB', label: 'Email' },
  checkout: { icon: ShoppingCart, color: '#0EA5E9', bg: '#E0F2FE', label: 'Sales Page' },
  calendar: { icon: Calendar, color: '#8B5CF6', bg: '#F3E8FF', label: 'Calendar' },
  purchase: { icon: CreditCard, color: '#10B981', bg: '#ECFDF5', label: 'Purchase' },
  cpm: { icon: Calculator, color: '#10B981', bg: '#ECFDF5', label: 'CPM Calculator' },
} as any; 

export const FunnelBuilderPage: React.FC = () => {
  // --- State ---
  const [nodes, setNodes] = useState<NodeData[]>([
    { id: '1', type: 'traffic', x: 50, y: 150, label: 'Facebook Ad' },
    { id: '2', type: 'cpm', x: 350, y: 150, label: 'CPM Metric', data: { cost: 500, impressions: 25000, cpm: '20.00' } },
  ]);
  
  const [edges, setEdges] = useState<EdgeData[]>([
    { id: 'e1-2', source: '1', target: '2' },
  ]);

  // Dragging Nodes State
  const [isDraggingNode, setIsDraggingNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Connecting Nodes State
  const [isConnecting, setIsConnecting] = useState<{ sourceId: string, x: number, y: number } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);

  // --- Actions ---

  // 1. Add Node (Drag from Sidebar)
  const handleDragStartFromSidebar = (e: React.DragEvent, type: NodeType) => {
    e.dataTransfer.setData('nodeType', type);
  };

  const handleDropOnCanvas = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('nodeType') as NodeType;
    if (!type || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 100; // Center the drop roughly
    const y = e.clientY - rect.top - 40;

    const newNode: NodeData = {
      id: `node-${Date.now()}`,
      type,
      x,
      y,
      label: NODE_CONFIG[type].label,
      data: type === 'cpm' ? { cost: 0, impressions: 0, cpm: '0.00' } : undefined
    };

    setNodes([...nodes, newNode]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // 2. Move Node (Mouse Events)
  const handleNodeMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent canvas drag if implemented
    const node = nodes.find(n => n.id === id);
    if (!node) return;

    setIsDraggingNode(id);
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    setMousePos({ x: relativeX, y: relativeY });

    if (isDraggingNode) {
      setNodes(nodes.map(n => {
        if (n.id === isDraggingNode) {
          return {
            ...n,
            x: e.clientX - dragOffset.x,
            y: e.clientY - dragOffset.y
          };
        }
        return n;
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDraggingNode(null);
    setIsConnecting(null);
  };

  // 3. Connect Nodes
  const handleConnectStart = (e: React.MouseEvent, sourceId: string) => {
    e.stopPropagation();
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setIsConnecting({ 
      sourceId, 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  };

  const handleConnectEnd = (e: React.MouseEvent, targetId: string) => {
    e.stopPropagation();
    if (isConnecting && isConnecting.sourceId !== targetId) {
      // Check if connection already exists
      const exists = edges.find(e => e.source === isConnecting.sourceId && e.target === targetId);
      if (!exists) {
        setEdges([...edges, {
          id: `e-${Date.now()}`,
          source: isConnecting.sourceId,
          target: targetId
        }]);
      }
    }
    setIsConnecting(null);
  };

  // 4. Update Node Data (Calculation Logic)
  const updateNodeData = (id: string, field: 'cost' | 'impressions', value: string) => {
    const numValue = parseFloat(value) || 0;
    
    setNodes(prevNodes => prevNodes.map(node => {
        if (node.id !== id) return node;

        const currentData = node.data || { cost: 0, impressions: 0 };
        const newData = { ...currentData, [field]: numValue };
        
        // Calculate CPM: (Cost / Impressions) * 1000
        let cpm = 0;
        if (newData.impressions && newData.impressions > 0) {
            cpm = (newData.cost! / newData.impressions) * 1000;
        }

        return {
            ...node,
            data: {
                ...newData,
                cpm: cpm.toFixed(2)
            }
        };
    }));
  };

  // 5. Helpers
  const deleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
    setEdges(edges.filter(e => e.source !== id && e.target !== id));
  };

  const deleteEdge = (id: string) => {
    setEdges(edges.filter(e => e.id !== id));
  };

  // Bezier Curve Logic
  const getPath = (x1: number, y1: number, x2: number, y2: number) => {
    // Horizontal layout curve
    const controlPointX1 = x1 + 80;
    const controlPointX2 = x2 - 80;
    return `M ${x1} ${y1} C ${controlPointX1} ${y1}, ${controlPointX2} ${y2}, ${x2} ${y2}`;
  };

  return (
    <div className="flex h-full font-sans overflow-hidden">
      
      {/* Sidebar Toolbar */}
      <div className="w-[240px] bg-white border-r border-slate-200 p-5 flex flex-col shrink-0 overflow-y-auto">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Components</h3>
        
        <div className="space-y-3">
          {Object.entries(NODE_CONFIG).map(([key, config]: [string, any]) => (
            <div 
              key={key}
              draggable
              onDragStart={(e) => handleDragStartFromSidebar(e, key as NodeType)}
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-grab active:cursor-grabbing hover:border-[#0EB869] hover:shadow-sm bg-white transition-all select-none"
            >
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: config.bg, color: config.color }}>
                <config.icon size={16} />
              </div>
              <span className="text-sm font-medium text-slate-700">{config.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto border-t border-slate-100 pt-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            Drag items from this menu onto the canvas. Connect dots to create flows.
          </p>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col h-full bg-[#F0F2F5] relative overflow-hidden">
        
        {/* Toolbar Header */}
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between pointer-events-none">
          <div className="bg-white/90 backdrop-blur border border-slate-200 p-2 rounded-lg shadow-sm pointer-events-auto flex items-center gap-2">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500 px-2">
                <Home size={14} />
                <span>/ Funnels /</span>
                <span className="text-slate-900">Q3 Launch Campaign</span>
             </div>
          </div>
          <div className="bg-white/90 backdrop-blur border border-slate-200 p-1.5 rounded-lg shadow-sm pointer-events-auto flex gap-1">
             <button className="p-2 hover:bg-slate-100 rounded text-slate-600"><Minus size={16} /></button>
             <button className="p-2 hover:bg-slate-100 rounded text-slate-600"><Plus size={16} /></button>
          </div>
        </div>

        {/* Canvas */}
        <div 
          ref={canvasRef}
          className="w-full h-full relative cursor-dot"
          onDrop={handleDropOnCanvas}
          onDragOver={handleDragOver}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ 
            backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }}
        >
          {/* SVG Layer for Edges */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0">
             <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#94A3B8" />
                </marker>
             </defs>
             
             {/* Existing Connections */}
             {edges.map(edge => {
               const sourceNode = nodes.find(n => n.id === edge.source);
               const targetNode = nodes.find(n => n.id === edge.target);
               if (!sourceNode || !targetNode) return null;

               // Adjust connection points based on node type width
               const sourceWidth = sourceNode.type === 'cpm' ? 240 : 200;
               const startX = sourceNode.x + sourceWidth; 
               const startY = sourceNode.y + 40;  
               const endX = targetNode.x;
               const endY = targetNode.y + 40;

               const path = getPath(startX, startY, endX, endY);
               const midX = (startX + endX) / 2;
               const midY = (startY + endY) / 2;

               return (
                 <g key={edge.id} className="group pointer-events-auto">
                   <path 
                      d={path} 
                      stroke="#94A3B8" 
                      strokeWidth="2" 
                      fill="none" 
                      markerEnd="url(#arrowhead)"
                      className="transition-colors group-hover:stroke-[#0EB869] group-hover:stroke-[3px]"
                    />
                    {/* Delete Edge Button (Visible on hover) */}
                    <foreignObject x={midX - 10} y={midY - 10} width={20} height={20} className="opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                        onClick={() => deleteEdge(edge.id)}
                        className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 shadow-sm"
                       >
                         <X size={12} />
                       </button>
                    </foreignObject>
                 </g>
               );
             })}

             {/* Dragging Connection Line */}
             {isConnecting && (
                <path 
                  d={getPath(
                    nodes.find(n => n.id === isConnecting.sourceId)!.x + (nodes.find(n => n.id === isConnecting.sourceId)?.type === 'cpm' ? 240 : 200), 
                    nodes.find(n => n.id === isConnecting.sourceId)!.y + 40,
                    mousePos.x, 
                    mousePos.y
                  )}
                  stroke="#0EB869" 
                  strokeWidth="2" 
                  strokeDasharray="5,5"
                  fill="none" 
                />
             )}
          </svg>

          {/* Node Layer */}
          {nodes.map(node => {
            const config = NODE_CONFIG[node.type];
            const isCPM = node.type === 'cpm';
            const width = isCPM ? '240px' : '200px';

            return (
              <div
                key={node.id}
                style={{ 
                  transform: `translate(${node.x}px, ${node.y}px)`,
                  width: width
                }}
                className="absolute z-10 flex flex-col"
              >
                {/* Connection Handle Input (Left) */}
                <div 
                  className="absolute -left-3 top-8 -translate-y-1/2 w-3 h-3 bg-slate-400 rounded-full border-2 border-white cursor-crosshair hover:bg-[#0EB869] hover:scale-125 transition-all z-20"
                  onMouseUp={(e) => handleConnectEnd(e, node.id)}
                ></div>

                {/* Node Card Content */}
                {isCPM ? (
                    // --- CPM CALCULATOR SPECIFIC UI ---
                    <div 
                        className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                        onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                    >
                        {/* Header */}
                        <div className="h-1.5 w-full bg-[#10B981]"></div>
                        <div className="p-4">
                             <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 bg-[#ECFDF5] text-[#10B981]">
                                  <Calculator size={16} />
                                </div>
                                <div>
                                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Metric</div>
                                   <div className="text-[13px] font-bold text-slate-900">CPM Calculator</div>
                                </div>
                             </div>

                             {/* Inputs */}
                             <div className="space-y-3 mb-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                                        <DollarSign size={10} /> Total Cost
                                    </label>
                                    <input 
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full p-1.5 px-2 bg-slate-50 border border-slate-200 rounded text-sm font-medium text-slate-700 focus:outline-none focus:border-[#10B981] transition-colors"
                                        value={node.data?.cost || ''}
                                        onChange={(e) => updateNodeData(node.id, 'cost', e.target.value)}
                                        onMouseDown={(e) => e.stopPropagation()} // Allow clicking input without dragging node
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                                        <Eye size={10} /> Impressions
                                    </label>
                                    <input 
                                        type="number"
                                        placeholder="0"
                                        className="w-full p-1.5 px-2 bg-slate-50 border border-slate-200 rounded text-sm font-medium text-slate-700 focus:outline-none focus:border-[#10B981] transition-colors"
                                        value={node.data?.impressions || ''}
                                        onChange={(e) => updateNodeData(node.id, 'impressions', e.target.value)}
                                        onMouseDown={(e) => e.stopPropagation()} // Allow clicking input without dragging node
                                    />
                                </div>
                             </div>

                             {/* Result */}
                             <div className="border-t border-slate-100 pt-3">
                                <div className="text-[10px] font-bold text-slate-400 uppercase">Calculated CPM</div>
                                <div className="text-2xl font-bold text-[#10B981] flex items-baseline gap-1">
                                    <span className="text-sm font-normal text-slate-400">$</span>
                                    {node.data?.cpm || '0.00'}
                                </div>
                             </div>
                        </div>
                        {/* Delete Btn */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }} 
                            className="absolute top-3 right-3 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                             <Trash2 size={14} />
                        </button>
                    </div>
                ) : (
                    // --- STANDARD NODE UI ---
                    <div 
                      className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                      onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                    >
                      {/* Node Header */}
                      <div className="h-1.5 w-full" style={{ backgroundColor: config.color }}></div>
                      <div className="p-3">
                         <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ backgroundColor: config.bg, color: config.color }}>
                              <config.icon size={16} />
                            </div>
                            <div className="overflow-hidden">
                               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{config.label}</div>
                               <div className="text-[13px] font-bold text-slate-900 truncate w-full" title={node.label}>{node.label}</div>
                            </div>
                         </div>
                         
                         {/* Mini Metrics / Footer */}
                         <div className="flex items-center justify-between border-t border-slate-50 pt-2 mt-1">
                            <div className="text-[10px] text-slate-400 font-medium">CTR: 2.4%</div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }} className="text-slate-400 hover:text-red-500">
                                 <Trash2 size={14} />
                               </button>
                            </div>
                         </div>
                      </div>
                    </div>
                )}

                {/* Connection Handle Output (Right) */}
                <div 
                  className="absolute -right-1.5 top-8 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-[#0EB869] cursor-crosshair flex items-center justify-center hover:scale-125 transition-transform z-20"
                  onMouseDown={(e) => handleConnectStart(e, node.id)}
                >
                   <div className="w-1.5 h-1.5 bg-[#0EB869] rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};