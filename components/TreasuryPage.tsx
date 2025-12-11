import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  Landmark, 
  DollarSign, 
  Shield, 
  TrendingUp, 
  Briefcase, 
  PieChart, 
  FileText, 
  Users, 
  Clock,
  Settings,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ArrowDown,
  Handshake
} from 'lucide-react';

// --- Types ---
type VaultType = 'income' | 'profit' | 'owner_comp' | 'tax' | 'opex';

interface Vault {
  id: VaultType;
  title: string;
  icon: React.ElementType;
  color: string;
  amount: number;
  percentage: number;
}

// --- Main Component ---
export const TreasuryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'allocations' | 'pnl'>('dashboard');
  
  //<think>**Refining the Solution**

\n\n

I've confirmed the initial assessment and am moving toward the fix. The corrupted import statement, specifically the `<think>` tags injected, is the primary issue. I will generate the corrected `components/TreasuryPage.tsx` using `dyad-write`, ensuring the import statement is clean. I am focused on delivering a correct version.


</think> --- State for the entire page ---
  const [vaults, setVaults] = useState<Record<VaultType, Vault>>({
    income: { id: 'income', title: 'Income', icon: DollarSign, color: 'blue', amount: 100000, percentage: 100 },
    profit: { id: 'profit', title: 'Profit', icon: TrendingUp, color: 'green', amount: 5000, percentage: 5 },
    owner_comp: { id: 'owner_comp', title: 'Owner\'s Comp', icon: Users, color: 'purple', amount: 20000, percentage: 20 },
    tax: { id: 'tax', title: 'Tax', icon: Shield, color: 'amber', amount: 15000, percentage: 15 },
    opex: { id: 'opex', title: 'Opex', icon: Briefcase, color: 'slate', amount: 60000, percentage: 60 },
  });

  const [taxLiability, setTaxLiability] = useState(18500);
  const [monthlyExpenses, setMonthlyExpenses] = useState(55000);
  const [pendingCommissions, setPendingCommissions] = useState(4200);
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedVault, setHighlightedVault] = useState<VaultType | null>(null);

  const handleNewSale = (saleAmount: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    // 1. Highlight Income
    setHighlightedVault('income');
    
    setTimeout(() => {
      // 2. Update income and start distributing
      setVaults(prev => ({ ...prev, income: { ...prev.income, amount: prev.income.amount + saleAmount }}));
      
      const distributionOrder: VaultType[] = ['profit', 'owner_comp', 'tax', 'opex'];
      let delay = 0;
      
      distributionOrder.forEach((key, index) => {
        setTimeout(() => {
          setHighlightedVault(key);
          setVaults(prev => {
            const vault = prev[key];
            const newAmount = vault.amount + (saleAmount * (vault.percentage / 100));
            return { ...prev, [key]: { ...vault, amount: newAmount }};
          });
        }, (index + 1) * 300);
        delay = (index + 1) * 300;
      });

      // 3. End animation
      setTimeout(() => {
        setHighlightedVault(null);
        setIsAnimating(false);
      }, delay + 500);

    }, 500);
  };

  const handleMarkTaxPaid = () => {
    setVaults(prev => ({ ...prev, tax: { ...prev.tax, amount: 0 }}));
    setTaxLiability(0); // Or adjust as needed
  };

  const totalCashReserves = vaults.profit.amount + vaults.owner_comp.amount + vaults.tax.amount + vaults.opex.amount;
  const runwayMonths = monthlyExpenses > 0 ? (totalCashReserves / monthlyExpenses).toFixed(1) : '∞';

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Treasury
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight flex items-center gap-3">
          <Landmark className="text-blue-600" size={28} />
          Financial Command Center
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          A real-time cashflow allocation system based on the "Profit First" methodology.
        </p>
      </div>

      {/* Main Content */}
      <div className="animate-in fade-in duration-300">
        
        {/* The Waterfall & Vaults */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-900">The Waterfall: Cash Allocation</h2>
            <button 
              onClick={() => handleNewSale(1000)}
              disabled={isAnimating}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 shadow-sm disabled:opacity-50"
            >
              <RefreshCw size={14} className={isAnimating ? 'animate-spin' : ''} /> Simulate New Sale ($1,000)
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <VaultCard vault={vaults.income} isHighlighted={highlightedVault === 'income'} />
            <div className="hidden lg:flex items-center justify-center text-slate-300">
              <ArrowDown size={32} strokeWidth={3} className={isAnimating ? 'animate-bounce' : ''} />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
              <VaultCard vault={vaults.profit} isHighlighted={highlightedVault === 'profit'} />
              <VaultCard vault={vaults.owner_comp} isHighlighted={highlightedVault === 'owner_comp'} />
              <TaxVaultCard vault={vaults.tax} liability={taxLiability} onPay={handleMarkTaxPaid} isHighlighted={highlightedVault === 'tax'} />
              <VaultCard vault={vaults.opex} isHighlighted={highlightedVault === 'opex'} />
            </div>
          </div>
        </div>

        {/* P&L, Runway, and Liabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2"><FileText size={18} className="text-slate-400" /> P&L Snapshot</h3>
              <div className="bg-slate-100 p-1 rounded-lg flex text-xs font-bold">
                <button className="px-3 py-1 rounded bg-white text-slate-800 shadow-sm">Cash</button>
                <button className="px-3 py-1 rounded text-slate-500">Accrual</button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <StatCard title="Gross Revenue" value="$125,000" />
              <StatCard title="Net Revenue" value="$118,750" />
              <StatCard title="Real Profit" value="$5,000" isProfit />
            </div>
          </div>

          <div className="space-y-6">
            <RunwayCard months={runwayMonths} />
            <LiabilitiesCard tax={taxLiability} commissions={pendingCommissions} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const VaultCard: React.FC<{ vault: Vault, isHighlighted?: boolean }> = ({ vault, isHighlighted }) => {
  const colors = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
    slate: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
  };
  const style = colors[vault.color as keyof typeof colors];

  return (
    <div className={`
      p-5 rounded-xl border-2 transition-all duration-300
      ${isHighlighted ? `shadow-lg scale-105 ${style.border}` : 'bg-white border-slate-200'}
    `}>
      <div className="flex justify-between items-start mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${style.bg}`}>
          <vault.icon className={style.text} size={20} />
        </div>
        {vault.id !== 'income' && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full border ${style.bg} ${style.text} ${style.border}`}>
            {vault.percentage}%
          </span>
        )}
      </div>
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{vault.title}</h4>
      <p className="text-2xl font-bold text-slate-900">${vault.amount.toLocaleString()}</p>
    </div>
  );
};

const TaxVaultCard: React.FC<{ vault: Vault, liability: number, onPay: () => void, isHighlighted?: boolean }> = ({ vault, liability, onPay, isHighlighted }) => {
  const isSafe = vault.amount >= liability;
  const statusStyle = isSafe 
    ? { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
    : { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };

  return (
    <div className={`
      p-5 rounded-xl border-2 flex flex-col transition-all duration-300
      ${isHighlighted ? `shadow-lg scale-105 border-amber-300` : 'bg-white border-slate-200'}
    `}>
      <div className="flex justify-between items-start mb-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-50 text-amber-600">
          <Shield size={20} />
        </div>
        <span className="text-xs font-bold px-2 py-1 rounded-full border bg-amber-50 text-amber-600 border-amber-200">
          {vault.percentage}%
        </span>
      </div>
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{vault.title}</h4>
      <p className="text-2xl font-bold text-slate-900">${vault.amount.toLocaleString()}</p>
      
      <div className={`mt-auto pt-3 border-t border-slate-100`}>
        <div className={`flex items-center justify-between p-2 rounded-lg text-xs font-bold ${statusStyle.bg} ${statusStyle.border}`}>
          <div className={`flex items-center gap-1.5 ${statusStyle.text}`}>
            {isSafe ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
            {isSafe ? 'Safe' : 'Underfunded'}
          </div>
          <span className={statusStyle.text}>Liab: ${liability.toLocaleString()}</span>
        </div>
        <button onClick={onPay} className="w-full mt-2 text-center text-[10px] font-bold text-slate-400 hover:text-slate-600">
          Mark Tax Paid
        </button>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string, value: string, isProfit?: boolean }> = ({ title, value, isProfit }) => (
  <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
    <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">{title}</h4>
    <p className={`text-2xl font-bold ${isProfit ? 'text-green-600' : 'text-slate-900'}`}>{value}</p>
  </div>
);

const RunwayCard: React.FC<{ months: string }> = ({ months }) => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
    <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3"><Clock size={18} className="text-slate-400" /> Runway Forecast</h3>
    <div className="text-center bg-slate-50 p-4 rounded-lg border border-slate-100">
      <p className="text-4xl font-black text-slate-800">{months}</p>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Months of Runway Left</p>
    </div>
  </div>
);

const LiabilitiesCard: React.FC<{ tax: number, commissions: number }> = ({ tax, commissions }) => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
    <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4"><AlertTriangle size={18} className="text-red-500" /> Current Liabilities</h3>
    <div className="space-y-3">
      <div className="flex justify-between items-center p-3 bg-red-50 border border-red-100 rounded-lg">
        <span className="text-sm font-bold text-red-800 flex items-center gap-2"><Shield size={14} /> Tax Liability</span>
        <span className="text-sm font-mono font-bold text-red-800">${tax.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-red-50 border border-red-100 rounded-lg">
        <span className="text-sm font-bold text-red-800 flex items-center gap-2"><Handshake size={14} /> Affiliate Payouts</span>
        <span className="text-sm font-mono font-bold text-red-800">${commissions.toLocaleString()}</span>
      </div>
    </div>
  </div>
);

const TabButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ElementType, label: string }> = ({ active, onClick, icon: Icon, label }) => (
    <button 
      onClick={onClick}
      className={`flex-1 min-w-[120px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
        ${active 
          ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' 
          : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
        }`}
    >
      <Icon size={18} />
      {label}
    </button>
);