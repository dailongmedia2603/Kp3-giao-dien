import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Users, 
  Filter, 
  AlertTriangle, 
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Command
} from 'lucide-react';

// --- Sub-Components for the Dashboard ---

// 1. Sparkline Chart for Profit Trend
const SparklineChart = () => {
  const data = [5, 8, 6, 10, 9, 12, 11]; // Mock 7-day trend
  const svgWidth = 120;
  const svgHeight = 40;
  const maxVal = Math.max(...data);
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * svgWidth;
    const y = svgHeight - (val / maxVal) * (svgHeight - 5) - 5; // Keep it off the edges
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={svgWidth} height={svgHeight} className="opacity-50 group-hover:opacity-100 transition-opacity">
      <polyline
        points={points}
        fill="none"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 2. ROAS Gauge Meter
const Gauge = ({ value }: { value: number }) => {
  const percentage = Math.min(Math.max(value / 6, 0), 1); // Cap between 0 and 1 (for a 6x max gauge)
  const circumference = 2 * Math.PI * 28; // 2 * pi * radius
  const strokeDashoffset = circumference * (1 - percentage * 0.5); // Use 0.5 for semi-circle

  let color = 'text-amber-400';
  if (value < 2.0) color = 'text-red-500';
  if (value >= 4.0) color = 'text-green-400';

  return (
    <div className="relative w-32 h-16">
      <svg className="w-full h-full" viewBox="0 0 64 32">
        {/* Background Arc */}
        <path
          d="M 4 30 A 28 28 0 0 1 60 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-slate-700"
        />
        {/* Value Arc */}
        <path
          d="M 4 30 A 28 28 0 0 1 60 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`transition-all duration-1000 ease-out ${color}`}
        />
      </svg>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <span className={`text-2xl font-bold ${color}`}>{value.toFixed(2)}x</span>
      </div>
    </div>
  );
};

// 3. Department Status Card
const StatusCard = ({ title, icon: Icon, metrics, status, alerts }: { title: string, icon: any, metrics: {label: string, value: string}[], status: 'green' | 'yellow' | 'red', alerts?: string[] }) => {
  const statusColor = status === 'green' ? 'bg-green-500' : status === 'yellow' ? 'bg-amber-400' : 'bg-red-500';

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-5 flex flex-col hover:bg-slate-800 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Icon className="text-slate-400" size={18} />
          <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wider">{title}</h3>
        </div>
        <div className={`w-2.5 h-2.5 rounded-full ${statusColor} shadow-[0_0_8px] ${statusColor.replace('bg-', 'shadow-')}`}></div>
      </div>
      
      <div className="flex-1 space-y-3">
        {metrics.map((metric, i) => (
          <div key={i} className="flex justify-between items-baseline">
            <span className="text-slate-400 text-xs">{metric.label}</span>
            <span className="font-mono font-bold text-slate-100 text-lg">{metric.value}</span>
          </div>
        ))}
      </div>

      {alerts && alerts.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-700 space-y-2">
          {alerts.map((alert, i) => (
            <div key={i} className="flex items-center gap-2 text-red-400 text-xs font-medium animate-pulse">
              <AlertTriangle size={14} />
              <span>{alert}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export const CEODashboardPage: React.FC = () => {
  // Mock Data
  const financials = {
    revenue: 12450.50,
    spend: 4200.00,
    profit: 8250.50,
    roas: 2.96
  };

  return (
    <div className="bg-slate-900 text-white p-6 h-full overflow-y-auto font-sans">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
          <Command size={24} className="text-slate-400" />
          CEO Command Center
        </h1>
        <p className="text-sm text-slate-400">Live pulse check of all business operations.</p>
      </div>

      {/* 1. The "North Star" Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Revenue */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-5">
          <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Revenue Today</div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">${financials.revenue.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
            <span className="text-green-400 font-bold text-sm flex items-center"><ArrowUp size={14} /> 8%</span>
          </div>
        </div>

        {/* Ad Spend */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-5">
          <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Ad Spend Today</div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-red-400">${financials.spend.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
            <span className="text-red-400 font-bold text-sm flex items-center"><ArrowDown size={14} /> 2%</span>
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-5 group">
          <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Net Profit (Est.)</div>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-bold text-green-400">${financials.profit.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
            <SparklineChart />
          </div>
        </div>

        {/* ROAS */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-5 flex flex-col items-center justify-center">
          <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">ROAS</div>
          <Gauge value={financials.roas} />
        </div>
      </div>

      {/* 2. Department Health Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard 
          title="Traffic"
          icon={TrendingUp}
          metrics={[
            { label: 'Cost Per Lead', value: '$18.45' },
            { label: 'Hook Rate (3s)', value: '48%' }
          ]}
          status="green"
        />
        <StatusCard 
          title="Funnel"
          icon={Filter}
          metrics={[
            { label: 'Opt-in Rate', value: '22.5%' },
            { label: 'Sales CVR', value: '1.8%' }
          ]}
          status="yellow"
        />
        <StatusCard 
          title="Community"
          icon={Users}
          metrics={[
            { label: 'Daily Active', value: '1,420' },
            { label: 'Engagement', value: '12%' }
          ]}
          status="green"
        />
        <StatusCard 
          title="Operations"
          icon={Shield}
          metrics={[
            { label: 'Domains', value: '4 Safe' },
            { label: 'Tickets', value: '12 Resolved' }
          ]}
          status="red"
          alerts={[
            "1 Domain Expiring in 7 Days",
            "3 Urgent Tickets Unassigned"
          ]}
        />
      </div>

    </div>
  );
};