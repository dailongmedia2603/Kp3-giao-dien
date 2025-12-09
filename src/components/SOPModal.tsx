import React from 'react';

interface SOPModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
}

export const SOPModal: React.FC<SOPModalProps> = ({ isOpen, onClose, currentView }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">SOP Tutorial for {currentView}</h2>
        <p>This is where the tutorial video or content would go.</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded-lg">Close</button>
      </div>
    </div>
  );
};