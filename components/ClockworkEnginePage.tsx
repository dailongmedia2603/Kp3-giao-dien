import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { 
  Home, 
  ChevronRight, 
  Cog, 
  Search, 
  FileText, 
  Flame, 
  Link as LinkIcon, 
  Printer, 
  Smartphone,
  X
} from 'lucide-react';

// --- MOCK DATA ---
const CATEGORIES = {
  'Sales': [
    { id: 'sop1', title: 'How to Handle the "Price is Too High" Objection', usage: 128 },
    { id: 'sop2', title: 'Lead Qualification Checklist (BANT)', usage: 95 },
  ],
  'Marketing': [
    { id: 'sop3', title: 'Pre-Launch Ad Campaign Sequence', usage: 210 },
    { id: 'sop4', title: 'Weekly Content Repurposing Workflow', usage: 180 },
  ],
  'Operations': [
    { id: 'sop5', title: 'New Client Onboarding Process', usage: 75 },
    { id: 'sop6', title: 'End-of-Day Financial Reconciliation', usage: 60 },
  ],
  'Tech': [
    { id: 'sop7', title: 'Staging to Production Deployment Checklist', usage: 45 },
  ],
};

const MOST_USED = [
  CATEGORIES['Marketing'][0],
  CATEGORIES['Marketing'][1],
  CATEGORIES['Sales'][0],
];

// --- MAIN COMPONENT ---
export const ClockworkEnginePage: React.FC = () => {
  const [qrLink, setQrLink] = useState('');
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const handlePrint = () => {
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'sop-qr-code.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-10 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            The Clockwork Engine
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight flex items-center gap-3">
          <Cog size={28} className="text-slate-500" />
          Company Wiki & SOPs
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Designing the business to run itself. Your central nervous system for processes and knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Wiki & SOPs */}
        <div className="lg:col-span-2 space-y-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="How do I..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869] text-md shadow-sm"
            />
          </div>

          {/* Most Used */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Flame size={18} className="text-orange-500" /> Most Used SOPs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOST_USED.map(sop => (
                <div key={sop.id} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <FileText size={20} className="text-slate-400 mb-3" />
                  <p className="text-sm font-semibold text-slate-800 line-clamp-2">{sop.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">All Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(CATEGORIES).map(([category, sops]) => (
                <div key={category} className="bg-white border border-slate-200 rounded-xl p-5">
                  <h4 className="font-bold text-slate-800 mb-3">{category}</h4>
                  <div className="space-y-2">
                    {sops.map(sop => (
                      <a href="#" key={sop.id} className="block text-sm text-slate-600 hover:text-[#0EB869] hover:underline truncate">
                        {sop.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: QR Code Generator */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sticky top-8">
            <h3 className="font-bold text-slate-900 mb-4">SOP QR Code Generator</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">SOP Link</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    value={qrLink}
                    onChange={(e) => setQrLink(e.target.value)}
                    placeholder="Paste link to SOP video or doc..." 
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0EB869]"
                  />
                </div>
              </div>
              
              {qrLink && (
                <div className="flex flex-col items-center bg-slate-50 p-4 rounded-lg border border-slate-200 animate-in fade-in">
                  <QRCodeCanvas id="qr-canvas" value={qrLink} size={160} />
                  <p className="text-xs text-slate-500 mt-3 text-center">Scan to view on mobile</p>
                </div>
              )}

              <div className="flex gap-2">
                <button onClick={() => setShowMobilePreview(true)} disabled={!qrLink} className="flex-1 flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50">
                  <Smartphone size={16} /> Preview
                </button>
                <button onClick={handlePrint} disabled={!qrLink} className="flex-1 flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50">
                  <Printer size={16} /> Print Label
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showMobilePreview && <MobilePreviewModal onClose={() => setShowMobilePreview(false)} />}
    </div>
  );
};

// --- Mobile Preview Modal ---
const MobilePreviewModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div className="relative w-[340px] h-[700px] bg-slate-800 rounded-[2.5rem] p-2 shadow-2xl border-4 border-slate-600 animate-in fade-in zoom-in-95">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-slate-900 rounded-full"></div>
      <div className="bg-white rounded-[2rem] h-full overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-bold text-center">Pre-Launch Checklist</h2>
        </div>
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          <div className="text-xs text-slate-500">SOP for: Marketing</div>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <input type="checkbox" className="h-6 w-6 rounded-md border-slate-300 text-[#0EB869] focus:ring-[#0EB869]/50" />
              <span className="text-sm font-medium text-slate-800">Confirm ad budget is allocated in Treasury.</span>
            </label>
            <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <input type="checkbox" className="h-6 w-6 rounded-md border-slate-300 text-[#0EB869] focus:ring-[#0EB869]/50" />
              <span className="text-sm font-medium text-slate-800">Finalize 3 ad creative variations.</span>
            </label>
            <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <input type="checkbox" className="h-6 w-6 rounded-md border-slate-300 text-[#0EB869] focus:ring-[#0EB869]/50" />
              <span className="text-sm font-medium text-slate-800">Test tracking pixel on landing page.</span>
            </label>
          </div>
        </div>
      </div>
      <button onClick={onClose} className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-500 hover:text-slate-800">
        <X size={18} />
      </button>
    </div>
  </div>
);