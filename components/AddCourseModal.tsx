import React, { useState } from 'react';
import { X, Loader2, Save } from 'lucide-react';

interface Avatar {
  id: string;
  name: string;
}

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; dream_buyer_avatar: string; outcome: string }) => Promise<void>;
  avatars: Avatar[];
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onSave, avatars }) => {
  const [title, setTitle] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [outcome, setOutcome] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveClick = async () => {
    if (!title || !selectedAvatar || !outcome) return;
    setIsSaving(true);
    await onSave({ title, dream_buyer_avatar: selectedAvatar, outcome });
    setIsSaving(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-900">Tạo Đề cương Khóa học Mới</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tên khóa học</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., The Godfather Offer"
              className="w-full p-3 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Dream Buyer Avatar</label>
            <select
              value={selectedAvatar}
              onChange={(e) => setSelectedAvatar(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="">-- Chọn một avatar --</option>
              {avatars.map(avatar => (
                <option key={avatar.id} value={avatar.name}>{avatar.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Kết quả mong muốn (Outcome)</label>
            <textarea
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              placeholder="e.g., Scale to $100k/month with predictability."
              className="w-full p-3 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-blue-500 h-24 resize-none"
            />
          </div>
        </div>
        <div className="p-4 bg-slate-50 border-t flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-slate-200 bg-white text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-50">
            Hủy
          </button>
          <button
            onClick={handleSaveClick}
            disabled={isSaving || !title || !selectedAvatar || !outcome}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-sm disabled:bg-blue-400"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Lưu lại
          </button>
        </div>
      </div>
    </div>
  );
};