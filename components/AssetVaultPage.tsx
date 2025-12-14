import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  Bell, 
  Smartphone, 
  Mail, 
  Globe, 
  Server, 
  CreditCard, 
  Plus, 
  Search, 
  RefreshCw,
  TrendingUp,
  AlertOctagon,
  Check,
  Copy
} from 'lucide-react';

// --- Types ---
type AssetType = 'domain' | 'hosting' | 'saas' | 'license';

interface Asset {
  id: string;
  name: string;
  provider: string;
  type: AssetType;
  expiryDate: string; // ISO Date string
  cost: number; // Monthly equivalent
  billingCycle: 'monthly' | 'yearly';
  autoRenew: boolean;
  status: 'safe' | 'warning' | 'critical';
  username?: string;
  password?: string;
}

// --- Mock Data ---
const INITIAL_ASSETS: Asset[] = [
  { id: '1', name: 'gettime.money', provider: 'GoDaddy', type: 'domain', expiryDate: '2024-10-28', cost: 12, billingCycle: 'yearly', autoRenew: true, status: 'critical', username: 'mike@gettime.money', password: 'supersecretpassword123' },
  { id: '2', name: 'AWS Production Cluster', provider: 'AWS', type: 'hosting', expiryDate: '2024-11-15', cost: 450, billingCycle: 'monthly', autoRenew: true, status: 'warning', username: 'aws-admin', password: 'anothersecurepassword' },
  { id: '3', name: 'ClickFunnels Platinum', provider: 'ClickFunnels', type: 'saas', expiryDate: '2024-12-01', cost: 297, billingCycle: 'monthly', autoRenew: false, status: 'safe', username: 'cf-user', password: 'passwordclickfunnels' },
  { id: '4', name: 'agency-scale.io', provider: 'Namecheap', type: 'domain', expiryDate: '2025-03-10', cost: 10, billingCycle: 'yearly', autoRenew: true, status: 'safe', username: 'admin@agency.io', password: 'agencyscalepass' },
  { id: '5', name: 'Adobe Creative Cloud', provider: 'Adobe', type: 'saas', expiryDate: '2024-11-20', cost: 54, billingCycle: 'monthly', autoRenew: true, status: 'warning', username: 'design@gettime.money', password: 'adobepassword' },
];

export const AssetVaultPage: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [panicMode, setPanicMode] = useState(false);
  const [justSecuredId, setJustSecuredId] = useState<string | null>(null);
  const [isWhoisLoading, setIsWhoisLoading] = useState(false);

  // --- Calculations ---
  const totalMonthlySpend = assets.reduce((acc, curr) => acc + curr.cost, 0);
  const criticalCount = assets.filter(a => a.status === 'critical').length;

  // --- Helpers ---
  const getDaysRemaining = (dateStr: string) => {
    const today = new Date('2024-10-24'); // Mocking "Today" to match scenarios
    const expiry = new Date(dateStr);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  };

  const handleRenew = (id: string) => {
    setJustSecuredId(id);
    setTimeout(() => {
        setAssets(prev => prev.map(a => {
            if (a.id === id) {
                // Extend by 1 year for demo
                const newDate = new Date(a.expiryDate);
                newDate.setFullYear(newDate.getFullYear() + 1);
                return { ...a, expiryDate: newDate.toISOString().split('T')[0], status: 'safe' };
            }
            return a;
        }));
        setJustSecuredId(null);
    }, 2000);
  };

  const handleWhoisLookup = () => {
      setIsWhoisLoading(true);
      setTimeout(() => setIsWhoisLoading(false), 1500);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col bg-[#F8F9FB]">
      
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Asset Vault
          </span>
        </div>

        <h1 className="text-[26px] font-bold text-slate-900 mb-2 tracking-tight flex items-center gap-3">
          Asset Protection System <ShieldCheck className="text-[#0EB869]" size={32} />
        </h1>
        
        <p className="text-slate-500 text-[13px] leading-relaxed mb-6 max-w-2xl mx-auto">
          Prevent catastrophic loss. Monitor domains, hosting, and critical SaaS subscriptions in real-time.
        </p>

        {/* Security Status Bar */}
        <div className={`w-full max-w-4xl px-6 py-3 rounded-full flex items-center justify-between border shadow-sm transition-colors ${criticalCount > 0 ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'}`}>
            <div className="flex items-center gap-3">
                {criticalCount > 0 ? (
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                        <AlertTriangle className="text-red-600" size={20} />
                    </div>
                ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <ShieldCheck className="text-emerald-600" size={20} />
                    </div>
                )}
                <div className="text-left">
                    <div className={`text-sm font-bold ${criticalCount > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                        {criticalCount > 0 ? `${criticalCount} Critical Assets At Risk` : "System Secure"}
                    </div>
                    <div className="text-xs text-slate-500">
                        {criticalCount > 0 ? "Immediate action required to prevent service interruption." : "All assets secured and auto-renewals verified."}
                    </div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Projected Burn</div>
                <div className="text-lg font-bold text-slate-900">${totalMonthlySpend.toLocaleString()}/mo</div>
            </div>
        </div>
      </div>

      {/* 1. The Expiry Horizon (Timeline) */}
      <div className="mb-8">
          <div className="flex justify-between items-end mb-4 px-2">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ClockIcon /> Expiry Horizon <span className="text-slate-400 text-xs font-normal">(Next 12 Months)</span>
              </h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm overflow-x-auto">
              <div className="min-w-[1000px] relative pt-8 pb-4">
                  {/* Timeline Track */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 rounded-full"></div>
                  
                  {/* Months Grid */}
                  <div className="grid grid-cols-12 gap-0 relative z-10">
                      {Array.from({ length: 12 }).map((_, i) => {
                          const date = new Date('2024-10-01');
                          date.setMonth(date.getMonth() + i);
                          const monthName = date.toLocaleString('default', { month: 'short' });
                          const isCurrentMonth = i === 0;

                          // Find assets in this month
                          const monthAssets = assets.filter(a => {
                              const aDate = new Date(a.expiryDate);
                              return aDate.getMonth() === date.getMonth() && aDate.getFullYear() === date.getFullYear();
                          });

                          return (
                              <div key={i} className="flex flex-col items-center relative h-32 group">
                                  {/* Month Label */}
                                  <div className={`absolute -top-8 text-xs font-bold uppercase tracking-wider ${isCurrentMonth ? 'text-[#0EB869]' : 'text-slate-400'}`}>
                                      {monthName}
                                  </div>
                                  
                                  {/* Tick Mark */}
                                  <div className={`w-0.5 h-3 mb-auto ${isCurrentMonth ? 'bg-[#0EB869]' : 'bg-slate-200'}`}></div>

                                  {/* Asset Nodes */}
                                  <div className="flex flex-col gap-2 mt-auto absolute top-1/2 -translate-y-1/2">
                                      {monthAssets.map(asset => (
                                          <div 
                                            key={asset.id}
                                            className={`
                                                w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center text-[10px] font-bold text-white cursor-pointer hover:scale-110 transition-transform
                                                ${asset.status === 'critical' ? 'bg-red-500 animate-pulse ring-4 ring-red-100' : 
                                                  asset.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}
                                            `}
                                            title={`${asset.name} (${asset.expiryDate})`}
                                          >
                                              {asset.type === 'domain' ? 'D' : asset.type === 'hosting' ? 'H' : 'S'}
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              </div>
          </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 flex-1 min-h-0">
        
        {/* LEFT COLUMN: Asset Cards (65%) */}
        <div className="flex-[2] flex flex-col gap-6">
            
            {/* Toolbar */}
            <div className="flex justify-between items-center">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Search assets..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#0EB869]" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-sm">
                    <Plus size={16} /> Add Asset
                </button>
            </div>

            {/* Asset List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assets.map(asset => (
                    <AssetCard 
                        key={asset.id} 
                        asset={asset} 
                        daysRemaining={getDaysRemaining(asset.expiryDate)}
                        onRenew={handleRenew}
                        isSecured={justSecuredId === asset.id}
                    />
                ))}
                
                {/* Add New Placeholder */}
                <div className="border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center p-6 text-slate-500 hover:border-[#0EB869] hover:text-[#0EB869] hover:bg-slate-800/50 transition-all cursor-pointer min-h-[200px] group">
                    <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center mb-3 transition-colors">
                        <Plus size={24} />
                    </div>
                    <span className="text-sm font-bold">Register New Asset</span>
                    <div className="mt-4 w-full px-4">
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="example.com" 
                                className="flex-1 text-xs p-2 bg-slate-700 border border-slate-600 rounded focus:outline-none text-white"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <button 
                                className="px-3 py-1 bg-slate-600 text-slate-300 text-xs font-bold rounded hover:bg-slate-500"
                                onClick={(e) => { e.stopPropagation(); handleWhoisLookup(); }}
                            >
                                {isWhoisLoading ? <RefreshCw size={12} className="animate-spin" /> : 'Fetch Whois'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: SaaS Wasteland & Alerts (35%) */}
        <div className="flex-1 flex flex-col gap-6">
            
            {/* Doomsday Alert System */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <AlertOctagon className="text-red-500" size={18} /> Doomsday Alerts
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${panicMode ? 'text-red-600' : 'text-slate-400'}`}>
                            {panicMode ? 'Panic Mode ON' : 'Normal'}
                        </span>
                        <button 
                            onClick={() => setPanicMode(!panicMode)}
                            className={`w-10 h-6 rounded-full p-1 transition-colors ${panicMode ? 'bg-red-500' : 'bg-slate-200'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${panicMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
                        </button>
                    </div>
                </div>

                <div className="space-y-4 relative z-10">
                    <AlertRow days="30" method="Email to Admin" icon={Mail} active={true} />
                    <AlertRow days="7" method="SMS to Owner" icon={Smartphone} active={true} />
                    <AlertRow days="1" method="WhatsApp Urgent" icon={Bell} active={panicMode} isPanic={true} />
                </div>

                {panicMode && (
                    <div className="absolute inset-0 bg-red-50/10 pointer-events-none border-2 border-red-500 rounded-xl animate-pulse z-0"></div>
                )}
            </div>

            {/* SaaS Wasteland (Cost Audit) */}
            <div className="bg-slate-900 text-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <CreditCard size={18} className="text-slate-400" /> SaaS Wasteland
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">Monthly Fixed Costs Audit</p>
                    </div>
                    <button className="text-xs font-bold text-[#0EB869] hover:underline flex items-center gap-1">
                        Sort by Cost <TrendingUp size={12} />
                    </button>
                </div>

                <div className="space-y-4">
                    {assets.sort((a, b) => b.cost - a.cost).slice(0, 4).map(asset => (
                        <div key={asset.id} className="group">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-medium text-slate-300 group-hover:text-white">{asset.name}</span>
                                <span className="font-mono text-slate-400 group-hover:text-white">${asset.cost}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-slate-600 group-hover:bg-[#0EB869] transition-colors rounded-full" 
                                    style={{ width: `${(asset.cost / 500) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-end">
                    <span className="text-xs text-slate-500">Total Monthly Burn</span>
                    <span className="text-xl font-bold text-[#0EB869]">${totalMonthlySpend.toLocaleString()}</span>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

// --- Sub Components ---

const AssetCard: React.FC<{ 
    asset: Asset, 
    daysRemaining: number, 
    onRenew: (id: string) => void,
    isSecured: boolean
}> = ({ asset, daysRemaining, onRenew, isSecured }) => {
    
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const getStatusStyles = (days: number) => {
        if (days < 7) return { border: 'border-red-500', bg: 'bg-slate-800', text: 'text-red-400', badge: 'bg-red-500/20 text-red-300' };
        if (days < 30) return { border: 'border-amber-500', bg: 'bg-slate-800', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300' };
        return { border: 'border-slate-700', bg: 'bg-slate-800', text: 'text-slate-300', badge: 'bg-emerald-500/20 text-emerald-300' };
    };

    const styles = getStatusStyles(daysRemaining);

    return (
        <div className={`relative rounded-xl border-2 p-5 shadow-lg transition-all overflow-hidden group text-white ${styles.bg} ${styles.border}`}>
            
            {isSecured && (
                <div className="absolute inset-0 bg-[#0EB869]/90 z-20 flex flex-col items-center justify-center text-white animate-in fade-in zoom-in duration-300">
                    <ShieldCheck size={48} className="mb-2" />
                    <span className="text-lg font-bold">SECURED</span>
                </div>
            )}

            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center shadow-sm">
                        {asset.type === 'domain' && <Globe size={20} className="text-blue-400" />}
                        {asset.type === 'hosting' && <Server size={20} className="text-orange-400" />}
                        {asset.type === 'saas' && <CreditCard size={20} className="text-purple-400" />}
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-sm">{asset.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>{asset.provider}</span>
                            <span className="text-slate-600">•</span>
                            <span>{asset.type}</span>
                        </div>
                    </div>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border border-transparent ${styles.badge}`}>
                    {daysRemaining < 0 ? 'Expired' : `${daysRemaining} Days Left`}
                </div>
            </div>

            {/* Credentials Section */}
            {(asset.username || asset.password) && (
                <div className="space-y-2 my-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    {asset.username && (
                        <div className="flex justify-between items-center">
                            <div className="text-xs text-slate-400">Username:</div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-slate-300">{asset.username}</span>
                                <button onClick={() => handleCopy(asset.username!, 'username')} className="text-slate-500 hover:text-white">
                                    {copiedField === 'username' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                </button>
                            </div>
                        </div>
                    )}
                    {asset.password && (
                        <div className="flex justify-between items-center">
                            <div className="text-xs text-slate-400">Password:</div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-slate-300">••••••••••••</span>
                                <button onClick={() => handleCopy(asset.password!, 'password')} className="text-slate-500 hover:text-white">
                                    {copiedField === 'password' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Cost</span>
                    <span className="font-bold text-white">${asset.cost}<span className="text-xs font-normal text-slate-400">/{asset.billingCycle === 'monthly' ? 'mo' : 'yr'}</span></span>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Auto-Renew</span>
                        <div className={`flex items-center gap-1 text-xs font-bold ${asset.autoRenew ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {asset.autoRenew ? <Lock size={12} /> : <Unlock size={12} />}
                            {asset.autoRenew ? 'On' : 'Off'}
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => onRenew(asset.id)}
                        className={`p-2 rounded-lg transition-colors shadow-sm ${daysRemaining < 30 ? 'bg-white text-slate-800 hover:bg-slate-200' : 'bg-slate-700 border border-slate-600 text-slate-300 hover:bg-slate-600'}`}
                        title="Renew / Secure Asset"
                    >
                        <RefreshCw size={16} className={isSecured ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const AlertRow: React.FC<{ days: string, method: string, icon: any, active: boolean, isPanic?: boolean }> = ({ days, method, icon: Icon, active, isPanic }) => (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${isPanic ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100'} transition-opacity ${active ? 'opacity-100' : 'opacity-50 grayscale'}`}>
        <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPanic ? 'bg-red-100 text-red-600' : 'bg-white text-slate-500 shadow-sm'}`}>
                <Icon size={14} />
            </div>
            <div>
                <div className={`text-sm font-bold ${isPanic ? 'text-red-700' : 'text-slate-700'}`}>{days} Days Out</div>
                <div className="text-xs text-slate-500">{method}</div>
            </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${active ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-300'}`}></div>
    </div>
);

const ClockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);