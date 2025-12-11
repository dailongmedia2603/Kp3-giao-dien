import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  Warehouse, 
  Shield, 
  FileText, 
  ShoppingCart, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  ArrowUp, 
  ArrowDown, 
  Barcode, 
  Plus, 
  Trash2,
  Printer,
  MoreHorizontal
} from 'lucide-react';

// --- Types ---
interface Order {
  id: string;
  customer: string;
  orderValue: number;
  cogs: number;
  adSpend: number;
  shippingFee: number;
  netProfit: number;
}

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  price: number;
}

// --- Mock Data ---
const MOCK_ORDERS: Order[] = [
  { id: '#1024', customer: 'Nguyễn Văn A', orderValue: 120, cogs: 30, adSpend: 15, shippingFee: 5, netProfit: 70 },
  { id: '#1023', customer: 'Trần Thị B', orderValue: 85, cogs: 25, adSpend: 20, shippingFee: 5, netProfit: 35 },
  { id: '#1022', customer: 'Lê Văn C', orderValue: 50, cogs: 20, adSpend: 25, shippingFee: 5, netProfit: 0 },
  { id: '#1021', customer: 'Phạm Thị D', orderValue: 250, cogs: 80, adSpend: 30, shippingFee: 10, netProfit: 130 },
];

const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'P001', name: 'Keto Supplement Pack', sku: 'KSP-001', stock: 42, price: 99 },
  { id: 'P002', name: 'Ergonomic Office Chair', sku: 'EOC-002', stock: 8, price: 349 },
  { id: 'P003', name: 'The Godfather Offer Ebook', sku: 'GFE-003', stock: 999, price: 27 },
  { id: 'P004', name: 'KP3 Branded Mug', sku: 'KPM-004', stock: 150, price: 15 },
];

// --- Main Component ---
export const RetailOpsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'pos'>('dashboard');

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Retail Ops
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight flex items-center gap-3">
          <Warehouse size={28} className="text-blue-600" />
          Retail Operations & Profit
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Quản lý COD, lợi nhuận thực, tồn kho và bán hàng tại cửa hàng.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-slate-100/50 rounded-xl border border-slate-200 p-1.5 flex mb-8 gap-1 max-w-3xl mx-auto shrink-0">
        <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={FileText} label="Dashboard" />
        <TabButton active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} icon={Warehouse} label="Inventory" />
        <TabButton active={activeTab === 'pos'} onClick={() => setActiveTab('pos')} icon={ShoppingCart} label="POS Lite" />
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'inventory' && <InventoryView />}
        {activeTab === 'pos' && <POSView />}
      </div>
    </div>
  );
};

// --- Sub-Views ---

const DashboardView: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [trustScore, setTrustScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckPhone = () => {
    if (!phone) return;
    setIsLoading(true);
    setTimeout(() => {
      // Simulate API call based on phone number
      const fakeScore = phone.length > 9 ? 92 : 35;
      setTrustScore(fakeScore);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="animate-in fade-in duration-300 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COD Shield */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Shield size={18} className="text-blue-600" /> COD Shield (Anti-Fraud)
          </h3>
          <div className="flex gap-2 mb-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập SĐT khách hàng..."
              className="flex-1 p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
            <button onClick={handleCheckPhone} className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <Search size={18} />
            </button>
          </div>
          {isLoading && <div className="text-center text-sm text-slate-500">Đang kiểm tra...</div>}
          {trustScore !== null && !isLoading && (
            <div className={`p-4 rounded-lg border-2 ${trustScore > 70 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`font-bold text-lg ${trustScore > 70 ? 'text-green-700' : 'text-red-700'}`}>
                  {trustScore > 70 ? 'Đáng tin cậy' : 'Rủi ro cao'}
                </span>
                <div className={`flex items-center gap-1 text-xs font-bold ${trustScore > 70 ? 'text-green-600' : 'text-red-600'}`}>
                  {trustScore > 70 ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                  Điểm: {trustScore}/100
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded border border-slate-200">
                  <div className="text-slate-500">Tỷ lệ thành công</div>
                  <div className="font-bold text-slate-800">{trustScore > 70 ? '92%' : '45%'}</div>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200">
                  <div className="text-slate-500">Tỷ lệ hoàn hàng</div>
                  <div className="font-bold text-slate-800">{trustScore > 70 ? '8%' : '55%'}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Real Profit Dashboard */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Real Profit Dashboard</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Đơn hàng</th>
                  <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Giá trị</th>
                  <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Giá vốn</th>
                  <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Chi phí QC</th>
                  <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Phí Ship</th>
                  <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase text-right">Lợi nhuận ròng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_ORDERS.map(order => (
                  <tr key={order.id}>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{order.id}</div>
                      <div className="text-xs text-slate-500">{order.customer}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-700">${order.orderValue.toFixed(2)}</td>
                    <td className="px-6 py-4 font-mono text-slate-700">${order.cogs.toFixed(2)}</td>
                    <td className="px-6 py-4 font-mono text-slate-700">${order.adSpend.toFixed(2)}</td>
                    <td className="px-6 py-4 font-mono text-slate-700">${order.shippingFee.toFixed(2)}</td>
                    <td className={`px-6 py-4 font-mono font-bold text-right ${order.netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {order.netProfit > 0 ? '+' : ''}${order.netProfit.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const InventoryView: React.FC = () => (
  <div className="animate-in fade-in duration-300 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
    <div className="p-5 border-b border-slate-100 flex justify-between items-center">
      <h3 className="font-bold text-slate-900">Quản lý tồn kho</h3>
      <button className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2">
        <Printer size={14} /> In báo cáo tồn kho
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Sản phẩm</th>
            <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">SKU</th>
            <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Tồn kho</th>
            <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Giá</th>
            <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase text-right">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {MOCK_INVENTORY.map(item => {
            const isLowStock = item.stock < 10;
            return (
              <tr key={item.id} className={isLowStock ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                <td className="px-6 py-4 font-mono text-slate-500">{item.sku}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${isLowStock ? 'text-red-600' : 'text-slate-800'}`}>{item.stock}</span>
                    {isLowStock && <AlertTriangle size={14} className="text-red-500" />}
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-slate-700">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <button className="bg-white border border-slate-200 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-slate-50">
                    Nhập kho
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

const POSView: React.FC = () => {
  const [cart, setCart] = useState<InventoryItem[]>([]);
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const addToCart = (item: InventoryItem) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full animate-in fade-in duration-300">
      {/* Product Grid */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm p-4">
        <div className="relative mb-4">
          <Barcode size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Quét mã vạch hoặc tìm kiếm sản phẩm..." className="w-full pl-10 p-3 border border-slate-200 rounded-lg text-sm" />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {MOCK_INVENTORY.map(item => (
            <div key={item.id} onClick={() => addToCart(item)} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
              <p className="text-xs font-bold text-slate-800 line-clamp-2 h-8">{item.name}</p>
              <p className="text-sm font-bold text-blue-600 mt-2">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Cart */}
      <div className="w-full lg:w-96 shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Đơn hàng hiện tại</h3>
        </div>
        <div className="flex-1 p-5 space-y-3 overflow-y-auto">
          {cart.length === 0 && <p className="text-sm text-slate-400 text-center py-8">Chưa có sản phẩm nào trong giỏ hàng.</p>}
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-800">{item.name}</p>
                <p className="text-xs text-slate-500">${item.price.toFixed(2)}</p>
              </div>
              <button onClick={() => removeFromCart(index)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
        <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-2">
          <div className="flex justify-between text-sm text-slate-600"><span>Tạm tính</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm text-slate-600"><span>Thuế (8%)</span><span>${tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-lg font-bold text-slate-900"><span>Tổng cộng</span><span>${total.toFixed(2)}</span></div>
          <button className="w-full mt-2 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-sm">Thanh toán</button>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---
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