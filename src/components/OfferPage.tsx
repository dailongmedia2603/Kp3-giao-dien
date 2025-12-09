import React from 'react';
import { Plus, ShoppingBag } from 'lucide-react';

interface OfferPageProps {
  onNavigate: (view: string) => void;
}

export const OfferPage: React.FC<OfferPageProps> = ({ onNavigate }) => {
  const offers: any[] = [];

  return (
    <div className="p-8 flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Offers</h1>
          <p className="text-slate-500 mt-1">Manage your services, products, and digital assets.</p>
        </div>
        <button
          onClick={() => onNavigate('create-product')}
          className="flex items-center gap-2 bg-[#0EB869] text-white font-bold py-2.5 px-5 rounded-lg shadow-sm hover:bg-[#0B9655] transition-colors"
        >
          <Plus size={18} />
          Create New Offer
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/80 shadow-sm p-6">
        {offers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">No Offers Yet</h3>
            <p className="text-slate-500 mt-2 max-w-sm">
              You haven't created any offers. Click the button below to add your first product or service.
            </p>
            <button
              onClick={() => onNavigate('create-product')}
              className="mt-6 flex items-center gap-2 bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Plus size={16} />
              Create Your First Offer
            </button>
          </div>
        ) : (
          <div>
            <p>List of offers will be here.</p>
          </div>
        )}
      </div>
    </div>
  );
};