import React from 'react';
import { 
  Sparkles,
  ArrowRight,
  Target,
  Users,
  Lock,
  Activity,
  Clock,
  QrCode,
  BrainCircuit
} from 'lucide-react';

// --- Helper Components ---

// Card cho các chỉ số chính
const MetricCard = ({ icon: Icon, title, amount, subtext, percentage, color, alert }: { icon: any, title: string, amount: string, subtext: string, percentage: string, color: string, alert?: boolean }) => {
  const colorClasses = {
    green: { border: 'border-green-400', text: 'text-green-600', bg: 'bg-green-50' },
    blue: { border: 'border-blue-400', text: 'text-blue-600', bg: 'bg-blue-50' },
    yellow: { border: 'border-yellow-400', text: 'text-yellow-600', bg: 'bg-yellow-50' },
    red: { border: 'border-red-400', text: 'text-red-600', bg: 'bg-red-50' },
  };
  const styles = colorClasses[color as keyof typeof colorClasses] || colorClasses.green;

  return (
    <div className={`bg-white rounded-xl border ${styles.border} shadow-sm p-5 relative flex flex-col`}>
      <div className={`absolute top-4 right-4 px-2 py-0.5 rounded text-xs font-bold ${styles.bg} ${styles.text}`}>
        {percentage}
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${styles.bg}`}>
          <Icon className={styles.text} size={18} />
        </div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</h3>
      </div>
      <div className="mt-auto">
        <p className={`text-3xl font-bold ${alert ? 'text-red-500' : 'text-slate-800'}`}>{amount}</p>
        <p className="text-xs text-slate-400 mt-1">{subtext}</p>
      </div>
    </div>
  );
};

// Card cho Clockwork Score
const ClockworkCard = () => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-slate-800 flex items-center gap-2"><Clock size={18} className="text-slate-400" /> Clockwork Score</h3>
      <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">+5% tuần này</span>
    </div>
    <div className="space-y-4 mb-4">
      <div>
        <div className="flex justify-between text-xs font-medium text-slate-500 mb-1"><span>Designing</span><span>20%</span></div>
        <div className="w-full bg-slate-100 h-2 rounded-full"><div className="w-[20%] h-2 rounded-full bg-purple-500"></div></div>
      </div>
      <div>
        <div className="flex justify-between text-xs font-medium text-slate-500 mb-1"><span>Deciding</span><span>15%</span></div>
        <div className="w-full bg-slate-100 h-2 rounded-full"><div className="w-[15%] h-2 rounded-full bg-slate-300"></div></div>
      </div>
      <div>
        <div className="flex justify-between text-xs font-medium text-slate-500 mb-1"><span>Doing (Cần giảm)</span><span>65%</span></div>
        <div className="w-full bg-slate-100 h-2 rounded-full"><div className="w-[65%] h-2 rounded-full bg-red-500"></div></div>
      </div>
    </div>
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mt-4">
      <p className="text-xs text-blue-800 leading-relaxed"><span className="font-bold flex items-center gap-1"><BrainCircuit size={14}/> AI Insight:</span> Team Media đang tốn 40% thời gian vào việc "Lên Camp thủ công". Hãy dùng Otis Ads để giải phóng họ.</p>
    </div>
  </div>
);

// Card cho Pumpkin Plan
const PumpkinCard = () => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center">
    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 self-start"><Users size={18} className="text-slate-400" /> Pumpkin Plan</h3>
    <div className="relative w-32 h-32 flex items-center justify-center my-4">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#FDBA74" strokeWidth="12" strokeOpacity="0.3" />
        <circle cx="60" cy="60" r="54" fill="none" stroke="#F97316" strokeWidth="12" strokeDasharray="250 339.29" strokeLinecap="round" />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-bold text-slate-800">12</p>
        <p className="text-xs font-bold text-slate-400">HẠNG A</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3 w-full mt-auto">
      <div className="bg-green-50 text-green-700 p-3 rounded-lg text-center">
        <p className="text-xs font-bold">DT HẠNG A</p>
        <p className="text-lg font-bold">1.2 Tỷ</p>
      </div>
      <div className="bg-red-50 text-red-700 p-3 rounded-lg text-center">
        <p className="text-xs font-bold">SA THẢI (HẠNG D)</p>
        <p className="text-lg font-bold">5 Khách</p>
      </div>
    </div>
  </div>
);

// Card cho Live Traffic
const LiveTrafficCard = () => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-slate-800 flex items-center gap-2"><Activity size={18} className="text-slate-400" /> Live Traffic</h3>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="text-xs font-bold text-red-500">LIVE</span>
      </div>
    </div>
    <div className="space-y-3">
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
        <div className="w-8 h-8 rounded bg-blue-500 text-white flex items-center justify-center font-bold text-sm">FB</div>
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-800">New Lead: Nguyen Van A</p>
          <p className="text-xs text-slate-400">Campaign "Tet 2026"</p>
        </div>
        <p className="text-xs text-slate-400">Vừa xong</p>
      </div>
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
        <div className="w-8 h-8 rounded bg-green-500 text-white flex items-center justify-center"><QrCode size={16} /></div>
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-800">Đơn #9928 Đã TT</p>
          <p className="text-xs text-slate-400">via SePay</p>
        </div>
        <p className="text-xs text-slate-400">2p trước</p>
      </div>
    </div>
    <button className="w-full mt-4 text-center py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
      Xem tất cả
    </button>
  </div>
);

export const CeoDashboardPage: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 bg-slate-50 min-h-screen font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl p-8 mb-8 flex justify-between items-start shadow-lg">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">VITAL NEED</span>
            <button className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium">
              <Sparkles size={16} /> AI Re-Analyze
            </button>
          </div>
          <h1 className="text-3xl font-bold mb-2">Tập trung vào: SALES (BÁN HÀNG)</h1>
          <p className="text-blue-200 max-w-lg">Doanh thu tháng này đang thấp hơn 20% so với điểm hòa vốn. Đừng lo về Quy trình (Clockwork) hay Di sản (Legacy) lúc này. Hãy bán hàng ngay!</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 w-64 text-center border border-white/30">
          <p className="text-xs font-bold text-blue-200 uppercase">TRẠNG THÁI</p>
          <p className="text-2xl font-bold my-2">Alert</p>
          <div className="w-full bg-white/20 h-1 rounded-full mb-3"><div className="w-3/4 bg-white h-1 rounded-full"></div></div>
          <button className="bg-white text-blue-600 font-bold text-sm py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-blue-50">
            Xử lý ngay <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          icon={Target}
          title="PROFIT VAULT"
          amount="250.000.000₫"
          subtext="Cấm đụng vào."
          percentage="10%"
          color="green"
        />
        <MetricCard 
          icon={Users}
          title="LƯƠNG CHỦ"
          amount="120.000.000₫"
          subtext="Đã sẵn sàng rút."
          percentage="20%"
          color="blue"
        />
        <MetricCard 
          icon={Lock}
          title="QUỸ THUẾ"
          amount="90.000.000₫"
          subtext="Đủ nộp Q1/2026."
          percentage="15%"
          color="yellow"
        />
        <MetricCard 
          icon={Activity}
          title="CHI PHÍ VẬN HÀNH"
          amount="15.000.000₫"
          subtext="CẢNH BÁO: Quỹ sắp cạn!"
          percentage="55%"
          color="red"
          alert
        />
      </div>

      {/* Lower Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ClockworkCard />
        <PumpkinCard />
        <LiveTrafficCard />
      </div>
    </div>
  );
};