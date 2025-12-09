import React from 'react';
import { Home, ChevronRight, Folder, Plus } from 'lucide-react';

interface ProductsPageProps {
  onNavigate?: (view: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate }) => {
  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-10 text-center">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#F3E8FF] text-[#7C3AED] px-3 py-1 rounded text-xs font-bold">
            All Products
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          All Products
        </h1>
        
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          A central place for your product/service's details, to be used in resource generation across the site.
        </p>

        <button 
          onClick={() => onNavigate && onNavigate('create-product')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] text-white text-[14px] font-bold hover:bg-[#6D28D9] transition-colors shadow-sm mb-4"
        >
            <Plus size={18} strokeWidth={3} />
            Add New Product
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard 
            title="Weight Loss Course"
            category="Weight Loss"
            description="Real estate services cover buying, selling, renting, and managing properties. Key services include property sales, purchases, rentals..."
          />
          <ProductCard 
            title="Real Estate Appointment Setti..."
            category="Real Estate"
            description="Real estate services cover buying, selling, renting, and managing properties. Key services include property sales, purchases, rentals..."
          />
          <ProductCard 
            title="Pilates Lead Machine"
            category="Fitness"
            description="Real estate services cover buying, selling, renting, and managing properties. Key services include property sales, purchases, rentals..."
          />
          <ProductCard 
            title="Weight Loss Course"
            category="Weight Loss"
            description="Real estate services cover buying, selling, renting, and managing properties. Key services include property sales, purchases, rentals..."
          />
           <ProductCard 
            title="Real Estate Appointment Setti..."
            category="Real Estate"
            description="Real estate services cover buying, selling, renting, and managing properties. Key services include property sales, purchases, rentals..."
          />
      </div>

      <div className="h-10"></div>
    </div>
  );
};

interface ProductCardProps {
    title: string;
    category: string;
    description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, category, description }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col p-6 h-full">
            <div className="flex items-start gap-4 mb-4">
                 <div className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 bg-white shrink-0">
                   <Folder size={24} strokeWidth={1.5} />
                </div>
                <div>
                    <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-1">{title}</h3>
                    <p className="text-[13px] text-slate-500">{category}</p>
                </div>
            </div>
            
            <p className="text-[13px] text-slate-500 leading-relaxed mb-8 flex-1">
                {description}
            </p>

            <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                 <button className="text-[13px] font-bold text-slate-700 hover:text-slate-900 transition-colors">
                    Delete
                </button>
                <button className="text-[13px] font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors">
                    Edit Product
                </button>
            </div>
        </div>
    )
}