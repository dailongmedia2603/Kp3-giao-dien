import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  BookOpen, 
  Users, 
  Calendar, 
  DollarSign, 
  Building, 
  ChevronDown, 
  Search, 
  Filter, 
  Clock, 
  UserCheck, 
  UserX, 
  AlertTriangle, 
  CheckCircle2, 
  Printer, 
  Send,
  ArrowLeft,
  X
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_BRANCHES = [
  { id: 'hq', name: 'All Branches (HQ View)' },
  { id: 'q1', name: 'Cơ sở 1 - Quận 1' },
  { id: 'q7', name: 'Cơ sở 2 - Quận 7' },
];

const MOCK_TEACHERS = {
  'q1': [{ id: 't1', name: 'Teacher Alice' }, { id: 't2', name: 'Teacher Bob' }],
  'q7': [{ id: 't3', name: 'Teacher Carol' }, { id: 't1', name: 'Teacher Alice' }], // Alice works at both
};

const MOCK_ROOMS = {
  'q1': ['Room 101', 'Room 102'],
  'q7': ['Room A', 'Room B'],
};

const MOCK_CLASSES = [
  { id: 'c1', branchId: 'q1', name: 'IELTS-02', teacherId: 't1', roomId: 'Room 101', day: 'Mon', start: 9, duration: 2 },
  { id: 'c2', branchId: 'q1', name: 'TOEIC-A', teacherId: 't2', roomId: 'Room 102', day: 'Tue', start: 14, duration: 3 },
  { id: 'c3', branchId: 'q7', name: 'KIDS-B1', teacherId: 't3', roomId: 'Room A', day: 'Wed', start: 10, duration: 1 },
  // Conflict: Alice is booked at the same time in two branches
  { id: 'c4', branchId: 'q7', name: 'COM-01', teacherId: 't1', roomId: 'Room B', day: 'Mon', start: 9, duration: 2 },
];

const MOCK_STUDENTS = [
    { id: 's1', name: 'Nguyễn Văn A', classId: 'c1', status: 'paid', remaining: 12, balance: 0, dueDate: 'N/A' },
    { id: 's2', name: 'Trần Thị B', classId: 'c1', status: 'expiring', remaining: 2, balance: 0, dueDate: '2024-11-10' },
    { id: 's3', name: 'Lê Văn C', classId: 'c2', status: 'overdue', remaining: 0, balance: 2500000, dueDate: '2024-10-15' },
    { id: 's4', name: 'Phạm Thị D', classId: 'c3', status: 'paid', remaining: 20, balance: 0, dueDate: 'N/A' },
];

const MOCK_PAYROLL = [
    { teacherId: 't1', name: 'Teacher Alice', hours: 40, rate: 500000, bonus: 2000000 },
    { teacherId: 't2', name: 'Teacher Bob', hours: 35, rate: 450000, bonus: 0 },
    { teacherId: 't3', name: 'Teacher Carol', hours: 38, rate: 480000, bonus: 1000000 },
];

// --- Main Component ---
export const EnglishCenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'tuition' | 'payroll' | 'communication'>('schedule');
  const [activeBranch, setActiveBranch] = useState('hq');

  return (
    <div className="p-8 max-w-[1800px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            English Center
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Trung tâm Quản lý
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Quản lý lịch học, điểm danh, học phí và nhân sự cho chuỗi trung tâm của bạn.
        </p>
      </div>

      {/* Top Bar: Branch Switcher & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <BranchSwitcher activeBranch={activeBranch} onSwitch={setActiveBranch} />
        <div className="bg-white rounded-xl border border-slate-200 p-1.5 flex gap-1 shadow-sm">
          <TabButton active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} icon={Calendar} label="Thời khóa biểu" />
          <TabButton active={activeTab === 'tuition'} onClick={() => setActiveTab('tuition')} icon={DollarSign} label="Học phí" />
          <TabButton active={activeTab === 'payroll'} onClick={() => setActiveTab('payroll')} icon={Users} label="Lương GV" />
          <TabButton active={activeTab === 'communication'} onClick={() => setActiveTab('communication')} icon={BookOpen} label="Sổ liên lạc" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        {activeTab === 'schedule' && <SchedulerView branchId={activeBranch} />}
        {activeTab === 'tuition' && <TuitionManagerView branchId={activeBranch} />}
        {activeTab === 'payroll' && <PayrollView branchId={activeBranch} />}
        {activeTab === 'communication' && <ParentCommunicationView branchId={activeBranch} />}
      </div>
    </div>
  );
};

// --- Sub-Views ---

const SchedulerView: React.FC<{ branchId: string }> = ({ branchId }) => {
    const [showAttendance, setShowAttendance] = useState<any | null>(null);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const timeSlots = Array.from({ length: 13 }, (_, i) => 8 + i); // 8 AM to 8 PM

    const filteredClasses = MOCK_CLASSES.filter(c => branchId === 'hq' || c.branchId === branchId);

    // Conflict Detection
    const conflicts = new Map<string, string[]>();
    filteredClasses.forEach(c1 => {
        filteredClasses.forEach(c2 => {
            if (c1.id < c2.id && c1.teacherId === c2.teacherId && c1.day === c2.day && c1.start < c2.start + c2.duration && c1.start + c1.duration > c2.start) {
                if (!conflicts.has(c1.id)) conflicts.set(c1.id, []);
                if (!conflicts.has(c2.id)) conflicts.set(c2.id, []);
                conflicts.get(c1.id)!.push(c2.id);
                conflicts.get(c2.id)!.push(c1.id);
            }
        });
    });

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-full animate-in fade-in duration-300">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Thời khóa biểu tuần</h3>
                <div className="flex gap-2">
                    <FilterDropdown label="Phòng" options={Object.values(MOCK_ROOMS).flat()} />
                    <FilterDropdown label="Giáo viên" options={Object.values(MOCK_TEACHERS).flat().map(t => t.name)} />
                </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
                <div className="grid grid-cols-8 min-w-[1200px]">
                    <div className="sticky left-0 bg-white z-10"></div>
                    {days.map(day => <div key={day} className="text-center font-bold text-sm text-slate-500 py-2 border-b">{day}</div>)}
                    
                    {timeSlots.map(time => (
                        <React.Fragment key={time}>
                            <div className="text-right text-xs font-mono text-slate-400 pr-2 py-2 border-r sticky left-0 bg-white z-10">{time}:00</div>
                            {days.map(day => (
                                <div key={`${day}-${time}`} className="border-r border-b h-16 relative">
                                    {filteredClasses.filter(c => c.day === day && c.start === time).map(c => {
                                        const isConflict = conflicts.has(c.id);
                                        return (
                                            <div 
                                                key={c.id} 
                                                onClick={() => setShowAttendance(c)}
                                                className={`absolute w-full p-2 rounded-lg text-white cursor-pointer hover:opacity-90 transition-opacity ${isConflict ? 'bg-red-500' : 'bg-blue-500'}`} 
                                                style={{ height: `${c.duration * 100}%`, zIndex: 10 }}
                                            >
                                                <p className="font-bold text-xs leading-tight">{c.name}</p>
                                                <p className="text-[10px] opacity-80">{MOCK_TEACHERS[c.branchId as keyof typeof MOCK_TEACHERS].find(t => t.id === c.teacherId)?.name}</p>
                                                <p className="text-[10px] opacity-80">{c.roomId}</p>
                                                {isConflict && <AlertTriangle size={12} className="absolute top-1 right-1" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            {showAttendance && <AttendanceModal classInfo={showAttendance} onClose={() => setShowAttendance(null)} />}
        </div>
    );
};

const TuitionManagerView: React.FC<{ branchId: string }> = ({ branchId }) => {
    const filteredStudents = MOCK_STUDENTS.filter(s => branchId === 'hq' || MOCK_CLASSES.find(c => c.id === s.classId)?.branchId === branchId);
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
            <div className="p-5 border-b border-slate-100"><h3 className="font-bold text-slate-900">Quản lý học phí</h3></div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Học viên</th>
                            <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Buổi còn lại</th>
                            <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Công nợ</th>
                            <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Ngày hết hạn</th>
                            <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Trạng thái</th>
                            <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredStudents.map(s => (
                            <tr key={s.id}>
                                <td className="px-6 py-4 font-medium text-slate-800">{s.name}</td>
                                <td className="px-6 py-4 text-center">{s.remaining}</td>
                                <td className="px-6 py-4 font-mono">{s.balance.toLocaleString()}đ</td>
                                <td className="px-6 py-4">{s.dueDate}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                        s.status === 'paid' ? 'bg-green-100 text-green-700' :
                                        s.status === 'expiring' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                    }`}>{s.status}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-600">Gửi hóa đơn</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PayrollView: React.FC<{ branchId: string }> = ({ branchId }) => (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
        <div className="p-5 border-b border-slate-100"><h3 className="font-bold text-slate-900">Bảng lương giáo viên</h3></div>
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
                <tr>
                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Giáo viên</th>
                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Tổng giờ dạy</th>
                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Lương/giờ</th>
                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Thưởng</th>
                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase text-right">Tổng lương</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {MOCK_PAYROLL.map(p => (
                    <tr key={p.teacherId}>
                        <td className="px-6 py-4 font-medium text-slate-800">{p.name}</td>
                        <td className="px-6 py-4">{p.hours}h</td>
                        <td className="px-6 py-4 font-mono">{p.rate.toLocaleString()}đ</td>
                        <td className="px-6 py-4 font-mono">{p.bonus.toLocaleString()}đ</td>
                        <td className="px-6 py-4 font-mono font-bold text-right text-green-600">{(p.hours * p.rate + p.bonus).toLocaleString()}đ</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="p-4 bg-slate-50 border-t text-right">
            <button className="bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-900">Sync & Payout via job.ai.vn</button>
        </div>
    </div>
);

const ParentCommunicationView: React.FC<{ branchId: string }> = ({ branchId }) => {
    const [selectedStudent, setSelectedStudent] = useState(MOCK_STUDENTS[0]);
    return (
        <div className="flex gap-8 h-full animate-in fade-in duration-300">
            <div className="w-80 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
                <div className="p-4 border-b"><h3 className="font-bold text-slate-900">Danh sách học viên</h3></div>
                <div className="flex-1 overflow-y-auto">
                    {MOCK_STUDENTS.map(s => (
                        <div key={s.id} onClick={() => setSelectedStudent(s)} className={`p-4 cursor-pointer border-l-4 ${selectedStudent.id === s.id ? 'bg-blue-50 border-blue-500' : 'border-transparent hover:bg-slate-50'}`}>
                            <p className="font-bold text-sm text-slate-800">{s.name}</p>
                            <p className="text-xs text-slate-500">{MOCK_CLASSES.find(c => c.id === s.classId)?.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
                <div className="p-4 border-b"><h3 className="font-bold text-slate-900">Sổ liên lạc: {selectedStudent.name}</h3></div>
                <div className="flex-1 p-6 bg-slate-50 space-y-4 overflow-y-auto">
                    {/* Mock feed */}
                    <div className="bg-white p-4 rounded-lg border">
                        <p className="text-xs text-slate-500 mb-2">Hôm nay - Teacher Alice</p>
                        <p className="text-sm text-slate-800">"Điểm hôm nay: 8/10. Phát âm tốt, cần luyện thêm ngữ pháp."</p>
                    </div>
                </div>
                <div className="p-4 border-t bg-white">
                    <textarea placeholder="Nhập báo cáo mới..." className="w-full p-2 border rounded-lg text-sm mb-2"></textarea>
                    <button className="w-full py-2 bg-blue-600 text-white font-bold text-sm rounded-lg">Gửi báo cáo</button>
                </div>
            </div>
        </div>
    );
};


// --- Helper Components ---

const BranchSwitcher: React.FC<{ activeBranch: string, onSwitch: (id: string) => void }> = ({ activeBranch, onSwitch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const activeBranchName = MOCK_BRANCHES.find(b => b.id === activeBranch)?.name;
    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-bold text-slate-800">
                <Building size={16} className="text-slate-500" />
                {activeBranchName}
                <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-64 bg-white border rounded-lg shadow-lg z-20">
                    {MOCK_BRANCHES.map(b => (
                        <div key={b.id} onClick={() => { onSwitch(b.id); setIsOpen(false); }} className="p-3 hover:bg-slate-50 cursor-pointer text-sm">{b.name}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

const TabButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ElementType, label: string }> = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 min-w-[120px] py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all duration-200 whitespace-nowrap
      ${active 
        ? 'bg-slate-900 text-white shadow-sm' 
        : 'text-slate-500 hover:bg-slate-200'
      }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

const FilterDropdown: React.FC<{ label: string, options: string[] }> = ({ label, options }) => (
    <div className="relative">
        <select className="text-xs font-bold bg-white border border-slate-200 rounded-md px-3 py-1.5 appearance-none focus:outline-none focus:border-blue-500">
            <option>{label}</option>
            {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
    </div>
);

const AttendanceModal: React.FC<{ classInfo: any, onClose: () => void }> = ({ classInfo, onClose }) => {
    const [attendance, setAttendance] = useState<{ [key: string]: 'present' | 'absent' | 'late' }>({});
    const [isSaving, setIsSaving] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const studentsInClass = MOCK_STUDENTS.filter(s => s.classId === classInfo.id);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setIsSent(true);
            setTimeout(() => {
                setIsSent(false);
                onClose();
            }, 2000);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col animate-in fade-in zoom-in-95">
                <div className="p-4 border-b flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg text-slate-900">Điểm danh: {classInfo.name}</h3>
                        <p className="text-xs text-slate-500">{new Date().toLocaleDateString()}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={18} /></button>
                </div>
                <div className="p-6 space-y-3 overflow-y-auto max-h-[60vh]">
                    {studentsInClass.map(s => (
                        <div key={s.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border">
                            <span className="font-medium text-slate-800">{s.name}</span>
                            <div className="flex gap-2">
                                <button onClick={() => setAttendance({...attendance, [s.id]: 'present'})} className={`px-3 py-1 text-xs font-bold rounded ${attendance[s.id] === 'present' ? 'bg-green-500 text-white' : 'bg-white border'}`}>Có mặt</button>
                                <button onClick={() => setAttendance({...attendance, [s.id]: 'absent'})} className={`px-3 py-1 text-xs font-bold rounded ${attendance[s.id] === 'absent' ? 'bg-red-500 text-white' : 'bg-white border'}`}>Vắng</button>
                                <button onClick={() => setAttendance({...attendance, [s.id]: 'late'})} className={`px-3 py-1 text-xs font-bold rounded ${attendance[s.id] === 'late' ? 'bg-amber-500 text-white' : 'bg-white border'}`}>Trễ</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t bg-slate-50">
                    <button 
                        onClick={handleSave}
                        disabled={isSaving || isSent}
                        className={`w-full py-3 rounded-lg text-white font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                            isSent ? 'bg-green-500' : isSaving ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isSaving ? 'Đang lưu...' : isSent ? <><CheckCircle2 size={16} /> Đã gửi báo cáo Zalo!</> : <><Send size={16} /> Lưu & Gửi báo cáo</>}
                    </button>
                </div>
            </div>
        </div>
    );
};