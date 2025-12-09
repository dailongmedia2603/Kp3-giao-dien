import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface CreateProductPageProps {
  onCancel: () => void;
}

export const CreateProductPage: React.FC<CreateProductPageProps> = ({ onCancel }) => {
  return (
    <div className="p-8 flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onCancel}
          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Create New Offer</h1>
          <p className="text-slate-500 mt-1">Add a new service, product, or digital asset to your collection.</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/80 shadow-sm p-8">
        <form className="space-y-6">
          <div>
            <label htmlFor="offerName" className="block text-sm font-medium text-slate-700 mb-1">
              Offer Name
            </label>
            <input
              type="text"
              id="offerName"
              placeholder="e.g., 'My Awesome Coaching Program'"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0EB869] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="offerDescription" className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              id="offerDescription"
              rows={4}
              placeholder="Briefly describe what this offer is about."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0EB869] focus:border-transparent"
            ></textarea>
          </div>

          <div>
            <label htmlFor="offerPrice" className="block text-sm font-medium text-slate-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              id="offerPrice"
              placeholder="e.g., 997"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0EB869] focus:border-transparent"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => { e.preventDefault(); alert('Offer creation logic not implemented yet.'); }}
              className="px-6 py-2 text-sm font-bold text-white bg-[#0EB869] rounded-lg shadow-sm hover:bg-[#0B9655] transition-colors"
            >
              Save Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};