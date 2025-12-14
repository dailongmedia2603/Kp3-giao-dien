import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  MessageSquare, 
  LayoutGrid, 
  ArrowLeft, 
  Camera
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_STAFF = [
  { id: 'dr_anna', name: 'Dr. Anna', role: 'Dermatologist' },
  { id: 'tech_ben', name: 'Ben (Tech)', role: 'Laser Technician' },
  { id: 'tech_chloe', name: 'Chloe (Tech)', role: 'Facialist' },
];

const MOCK_APPOINTMENTS = [
  { id: 'apt1', staffId: 'dr_anna', patientName: 'Nguyễn Thị Lan', service: 'Tư vấn da', start: 9, duration: 1, status: 'confirmed' },
  { id: 'apt2', staffId: 'tech_ben', patientName: 'Trần Văn Hùng', service: 'Triệt lông Laser', start: 10, duration: 2, status: 'checked-in' },
  { id: 'apt3', staffId: 'tech_chloe', patientName: 'Lê Minh Anh', service: 'Chăm sóc da mặt chuyên sâu', start: 11, duration: 1.5, status: 'pending' },
  { id: 'apt4', staffId: 'dr_anna', patientName: 'Phạm Hoàng Yến', service: 'Tư vấn da', start: 13, duration: 1, status: 'no-show' },
];

const MOCK_PATIENT = {
  id: 'p1',
  name: 'Trần Văn Hùng',
  age: 32,
  phone: '090xxxx123',
  email: 'hung.tran@email.com',
  history: [
    { date: '2024-10-26', service: 'Triệt lông Laser (Lần 3)', notes: 'Phản ứng tốt, giảm 70% lông.', staff: 'Ben (Tech)' },
    { date: '2024-09-25', service: 'Triệt lông Laser (Lần 2)', notes: 'Da hơi đỏ sau điều trị, đã dịu sau 2 giờ.', staff: 'Ben (Tech)' },
    { date: '2024-08-24', service: 'Triệt lông Laser (Lần 1)', notes: 'Bắt đầu liệu trình.', staff: 'Ben (Tech)' },
    { date: '2024-08-10', service: 'Tư vấn ban đầu', notes: 'Tình trạng lông rậm, không có vấn đề da liễu.', staff: 'Dr. Anna' },
  ],
  gallery: [
    { type: 'before', url: 'https://images.unsplash.com/photo-1580615647975-5a05e6755a3b?q=80&w=400' },
    { type: 'after', url: 'https://images.unsplash.com/photo-1616552414598-c52b37441657?q=80&w=400' },
  ]
};

// --- Main Component ---
export const ClinicOSPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'board' | 'patients' | 'zalo'>('board');
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);

  const renderContent = () => {
    if (selectedPatient) {
      return <PatientProfileView patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;
    }
    switch (activeTab) {
      case 'board': return <AppointmentBoard onSelectPatient={() => setSelectedPatient(MOCK_PATIENT)} />;
      case 'patients': return <PatientListView onSelectPatient={() => setSelectedPatient(MOCK_PATIENT)} />;
      case 'zalo': return <ZaloAutomationView />;
      default: return <AppointmentBoard onSelectPatient={() => setSelectedPatient(MOCK_PATIENT)} />;
    }
  };

  return (
    <div className="p-8 max-w-[1800px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Clinic OS
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Clinic & Spa Management
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Giao diện chuyên nghiệp để quản lý lịch hẹn, hồ sơ bệnh nhân và tự động hóa Zalo.
        </p>
      </div>

      {/* Tabs */}
      {!selectedPatient && (
        <div className="bg-white rounded-xl border border-slate-200 p-1.5 flex mb-8 gap-1 max-w-3xl mx-auto shrink-0">
          <TabButton active={activeTab === 'board'} onClick={() => setActiveTab('board')} icon={LayoutGrid} label="Bảng lịch hẹn" />
          <TabButton active={activeTab === 'patients'} onClick={() => setActiveTab('patients')} icon={Users} label="Hồ sơ bệnh nhân" />
          <TabButton active={activeTab === 'zalo'} onClick={() => setActiveTab('zalo')} icon={MessageSquare} label="Tự động hóa Zalo" />
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        {renderContent()}
      </div>
    </div>
  );
};

// --- Sub-Views ---

const AppointmentBoard: React.FC<{ onSelectPatient: () => void }> = ({ onSelectPatient }) => {
  const timeSlots = Array.from({ length: 12 }, (_, i) => 8 + i); // 8 AM to 7 PM

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'checked-in': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'no-show': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-full animate-in fade-in duration-300">
      <div className="p-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-900">Lịch hẹn hôm nay</h3>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-4 min-w-[1000px]">
          {/* Time Column */}
          <div className="col-span-1">
            <div className="h-10"></div>
            {timeSlots.map(time => (
              <div key={time} className="h-16 text-right text-xs font-mono text-slate-400 pr-2 border-t border-slate-100 pt-1">{time}:00</div>
            ))}
          </div>
          {/* Staff Columns */}
          {MOCK_STAFF.map(staff => (
            <div key={staff.id} className="col-span-1 border-l border-slate-100">
              <div className="h-10 text-center font-bold text-sm text-slate-700 py-2 border-b border-slate-200">{staff.name}</div>
              <div className="relative">
                {timeSlots.map(time => (
                  <div key={time} className="h-16 border-t border-slate-100"></div>
                ))}
                {MOCK_APPOINTMENTS.filter(a => a.staffId === staff.id).map(apt => (
                  <div
                    key={apt.id}
                    onClick={onSelectPatient}
                    className={`absolute w-[95%] left-1/2 -translate-x-1/2 p-2 rounded-lg text-white cursor-pointer hover:opacity-90 transition-opacity shadow-md ${getStatusColor(apt.status)}`}
                    style={{ top: `${(apt.start - 8) * 4}rem`, height: `${apt.duration * 4}rem` }}
                  >
                    <p className="font-bold text-xs leading-tight">{apt.patientName}</p>
                    <p className="text-[10px] opacity-80">{apt.service}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PatientListView: React.FC<{ onSelectPatient: () => void }> = ({ onSelectPatient }) => (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm animate-in fade-in duration-300">
        <div className="p-4 border-b"><h3 className="font-bold text-slate-900">Danh sách bệnh nhân</h3></div>
        <table className="w-full text-left text-sm">
            {/* Table content would go here */}
            <tbody>
                <tr onClick={onSelectPatient} className="cursor-pointer hover:bg-slate-50">
                    <td className="p-4 font-medium">Trần Văn Hùng</td>
                    <td className="p-4 text-slate-500">090xxxx123</td>
                    <td className="p-4 text-slate-500">Laser (3/6)</td>
                </tr>
            </tbody>
        </table>
    </div>
);

const PatientProfileView: React.FC<{ patient: any, onBack: () => void }> = ({ patient, onBack }) => (
  <div className="flex flex-col lg:flex-row gap-8 h-full animate-in fade-in duration-300">
    {/* Left: Profile & History */}
    <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><ArrowLeft size={18} /></button>
        <h2 className="text-xl font-bold text-slate-900">Hồ sơ bệnh nhân: {patient.name}</h2>
      </div>
      {/* Treatment Timeline */}
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Lịch sử điều trị</h3>
      <div className="relative pl-6 border-l-2 border-slate-200">
        {patient.history.map((item: any, index: number) => (
          <div key={index} className="mb-6">
            <div className="absolute -left-[11px] w-5 h-5 bg-white border-2 border-teal-500 rounded-full"></div>
            <p className="text-xs text-slate-400 font-medium mb-1">{item.date}</p>
            <p className="font-bold text-teal-700">{item.service}</p>
            <p className="text-sm text-slate-600 italic">"{item.notes}" - <span className="font-medium">{item.staff}</span></p>
          </div>
        ))}
      </div>
    </div>
    {/* Right: Before & After */}
    <div className="w-full lg:w-96 shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm p-6">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Camera size={18} className="text-slate-400" /> Thư viện Trước & Sau</h3>
      <div className="grid grid-cols-2 gap-4">
        {patient.gallery.map((img: any, index: number) => (
          <div key={index} className="aspect-square bg-slate-100 rounded-lg overflow-hidden relative">
            <img src={img.url} alt={img.type} className="w-full h-full object-cover" />
            <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${img.type === 'before' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{img.type}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ZaloAutomationView: React.FC = () => (
  <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-8 animate-in fade-in duration-300">
    <h2 className="text-xl font-bold text-slate-900 mb-6">Cài đặt Tự động hóa Zalo</h2>
    <div className="space-y-6">
      <ToggleItem label="Nhắc hẹn 24 giờ trước" description="Gửi tin nhắn ZNS nhắc lịch hẹn trước 1 ngày." defaultChecked={true} />
      <ToggleItem label="Nhắc hẹn 1 giờ trước" description="Gửi tin nhắn ZNS nhắc lịch hẹn trước 1 giờ." defaultChecked={true} />
      <ToggleItem label="Gửi tin nhắn chúc mừng sinh nhật" description="Tự động gửi ưu đãi chúc mừng sinh nhật." defaultChecked={false} />
    </div>
    <div className="mt-8 pt-6 border-t border-slate-200">
      <h3 className="font-bold text-slate-900 mb-4">Chỉnh sửa Mẫu tin nhắn</h3>
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Mẫu nhắc hẹn</label>
        <textarea
          defaultValue="[Tên Spa] xin chào {{PatientName}}, chúng tôi xin nhắc bạn có lịch hẹn {{Service}} vào lúc {{Time}} ngày {{Date}}. Vui lòng xác nhận. Cảm ơn bạn!"
          className="w-full p-3 border border-slate-200 rounded-lg font-mono text-xs leading-relaxed h-32"
        />
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-teal-600 text-white font-bold text-sm px-6 py-2 rounded-lg hover:bg-teal-700">Lưu thay đổi</button>
      </div>
    </div>
  </div>
);

// --- Helper Components ---

const TabButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ElementType, label: string }> = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 min-w-[120px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
      ${active 
        ? 'bg-white text-teal-600 shadow-sm ring-1 ring-slate-200' 
        : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
      }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

const ToggleItem: React.FC<{ label: string, description: string, defaultChecked: boolean }> = ({ label, description, defaultChecked }) => {
  const [isOn, setIsOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
      <div>
        <p className="font-bold text-slate-800">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <button onClick={() => setIsOn(!isOn)} className={`w-11 h-6 rounded-full p-1 transition-colors ${isOn ? 'bg-teal-500' : 'bg-slate-300'}`}>
        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isOn ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </button>
    </div>
  );
};