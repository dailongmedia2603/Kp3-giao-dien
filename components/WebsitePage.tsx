import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

// --- Mock Data ---
const SITES = [
  { id: '1', domain: 'paperpillar.com', visits: '1.5M', bandwidth: '1.5M', type: 'Primary', status: 'Active', dotColor: 'bg-green-500' },
  { id: '2', domain: 'paperpillar.bigscoots-staging.com', visits: '-', bandwidth: '-', type: 'Staging', status: 'Active', dotColor: 'bg-pink-500', isStaging: true },
  { id: '3', domain: 'supply.paperpillar.com', visits: '1.5M', bandwidth: '1.5M', type: 'Add-on', status: 'Active', dotColor: 'bg-blue-500' },
  { id: '4', domain: 'stock.paperpillar.com', visits: '1.5M', bandwidth: '1.5M', type: 'Add-on', status: 'Active', dotColor: 'bg-orange-500' },
];

// --- Sub-Components ---

const MultiColorProgressBar: React.FC<{ segments: { value: number; color: string }[] }> = ({ segments }) => (
  <div className="w-full bg-slate-200 rounded-full h-2 flex overflow-hidden">
    {segments.map((seg, i) => (
      <div key={i} className={`${seg.color} h-2`} style={{ width: `${seg.value}%` }}></div>
    ))}
  </div>
);

const CircularProgress: React.FC<{ value: number; max: number }> = ({ value, max }) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 18; // 2 * pi * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-12 h-12">
      <svg className="w-full h-full" viewBox="0 0 40 40">
        <circle
          className="text-slate-200"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
        />
        <circle
          className="text-blue-500"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
          transform="rotate(-90 20 20)"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700">
        {value}/{max}
      </span>
    </div>
  );
};

const Badge: React.FC<{ text: string; color: 'primary' | 'staging' | 'addon' | 'active' }> = ({ text, color }) => {
  const colors = {
    primary: 'bg-blue-100 text-blue-700',
    staging: 'bg-pink-100 text-pink-700',
    addon: 'bg-yellow-100 text-yellow-700',
    active: 'bg-teal-100 text-teal-700',
  };
  return (
    <span className={`px-3 py-1 rounded-md text-xs font-bold ${colors[color]}`}>
      {text}
    </span>
  );
};

// --- Main Component ---
export const WebsitePage: React.FC = () => {
  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Website Hub
          </span>
        </div>
        <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
          Site Management
        </h1>
        <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Manage your sites, domains, and environments from a single dashboard.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Card Header */}
        <div className="p-6 border-b border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-1">
            <h2 className="font-bold text-slate-900">paperpillar.com</h2>
            <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              Professional Plan
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div className="sm:col-span-1">
              <MultiColorProgressBar segments={[
                { value: 40, color: 'bg-green-500' },
                { value: 20, color: 'bg-purple-500' },
                { value: 10, color: 'bg-blue-500' },
                { value: 5, color: 'bg-pink-500' },
              ]} />
              <p className="text-xs text-slate-500 mt-1.5">35.36 GB of 1.2 GB</p>
            </div>
            <div className="sm:col-span-1">
              <MultiColorProgressBar segments={[
                { value: 40, color: 'bg-green-500' },
                { value: 20, color: 'bg-purple-500' },
                { value: 10, color: 'bg-blue-500' },
                { value: 5, color: 'bg-pink-500' },
              ]} />
              <p className="text-xs text-slate-500 mt-1.5">35.36 GB of 1.2 GB</p>
            </div>
            <div className="sm:col-span-1 flex justify-end">
              <CircularProgress value={5} max={10} />
            </div>
          </div>
        </div>

        {/* Site List */}
        <div className="p-6">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-4">
            <div className="col-span-2">Domain</div>
            <div>Visits</div>
            <div>Bandwidth</div>
            <div>Type</div>
            <div>Status</div>
          </div>

          {/* Table Body */}
          <div className="space-y-2">
            {SITES.map(site => (
              <div key={site.id} className={`grid grid-cols-6 gap-4 items-center p-4 rounded-lg hover:bg-slate-50 transition-colors relative ${site.isStaging ? 'ml-8' : ''}`}>
                {site.isStaging && (
                  <div className="absolute -left-4 top-0 h-full w-px border-l-2 border-dotted border-slate-300"></div>
                )}
                <div className={`col-span-2 font-medium ${site.isStaging ? 'text-slate-400' : 'text-slate-800'}`}>{site.domain}</div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  {site.visits}
                  {site.visits !== '-' && <div className={`w-2 h-2 rounded-full ${site.dotColor}`}></div>}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  {site.bandwidth}
                  {site.bandwidth !== '-' && <div className={`w-2 h-2 rounded-full ${site.dotColor}`}></div>}
                </div>
                <div>
                  <Badge text={site.type} color={site.type.toLowerCase() as any} />
                </div>
                <div>
                  <Badge text={site.status} color={site.status.toLowerCase() as any} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};