import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Sparkles, 
  ChevronLeft, 
  ArrowRight, 
  ArrowLeft,
  Plus
} from 'lucide-react';

interface CreateProductPageProps {
  onCancel: () => void;
}

export const CreateProductPage: React.FC<CreateProductPageProps> = ({ onCancel }) => {
  const [showAuthorityExamples, setShowAuthorityExamples] = useState(false);
  const [mechanismInput, setMechanismInput] = useState("");

  const handleMechanismExampleClick = () => {
    setMechanismInput("$7.8 Billion AI Funnel That's Generating 90-480 Super Qualified Appointments A Month On Autopilot");
  };

  return (
    <div className="p-8 max-w-[800px] mx-auto font-sans mb-20">
      
      {/* Breadcrumb */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <button onClick={onCancel} className="flex items-center gap-1 hover:text-slate-700">
             <Home size={16} className="text-slate-400" />
          </button>
          <ChevronRight size={14} className="text-slate-300" />
          <button onClick={onCancel} className="hover:text-slate-700">Offers</button>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#F3E8FF] text-[#7C3AED] px-3 py-1 rounded text-xs font-bold">
            Create
          </span>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
          Create New Offer
        </h1>
        
        <p className="text-slate-500 text-center text-[15px]">
          Tell us a little bit about your offer/service.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-8">
        
        {/* Title */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Offer/Product/Service Title*
            </label>
            <div className="text-[12px] text-slate-500 mb-2">The name of the product/service/HVCO you are promoting.</div>
            <input 
                type="text" 
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">100 chars left</div>
        </div>

        {/* Category */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Category*
            </label>
            <div className="text-[12px] text-slate-500 mb-2">e.g. Dentures, Cosmetics, Property Investments, Digital Marketing</div>
            <input 
                type="text" 
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">100 chars left</div>
        </div>

        {/* Description */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Description*
            </label>
            <div className="text-[12px] text-slate-500 mb-2">KP3 wants to understand the offer you are promoting.<br/>What is it? What does it do? How does it work?<br/>How do people typically use it?</div>
            <textarea 
                rows={6}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none leading-relaxed"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">1000 chars left</div>
        </div>

        {/* Info Box */}
        <div className="bg-[#F3E8FF] rounded-lg p-5 border border-[#E9D5FF]">
            <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                <span className="font-bold">The fields below are optional but recommended to complete</span> - you may store commonly used product information here so you don't need to re-enter it across the site. You will be prompted to review this information if it is used for a particular resource.
            </p>
        </div>

        {/* Target Market */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Target Market
            </label>
            <div className="text-[12px] text-slate-500 mb-2">e.g. Women over 45.</div>
            <input 
                type="text" 
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">100 chars left</div>
        </div>

        {/* Pressing Problem */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Pressing Problem
            </label>
            <div className="text-[12px] text-slate-500 mb-2">e.g. Weight gain/metabolism slowing down due to menopause.</div>
            <textarea 
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">200 chars left</div>
        </div>

        {/* Desired Outcome */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Desired Outcome
            </label>
            <div className="text-[12px] text-slate-500 mb-2">e.g. Being slim, sexy, desirable, impressing their husband, looking like their younger slim self</div>
            <textarea 
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">200 chars left</div>
        </div>

        {/* Product Features/USPs */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Features/USPs:
            </label>
            <div className="text-[12px] text-slate-500 mb-2">e.g. 10g Protein Per Scoop, Made with Premium Coffee, Zero Sugar, All Natural, Organic</div>
            <textarea 
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">200 chars left</div>
        </div>

        {/* Specific technology... */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Specific technology/ingredients/methodology:
            </label>
            <div className="text-[12px] text-slate-500 mb-2">e.g. Breakthrough New AI, New 'FirmFit' Technology, Refinance Framework, Algorithm Loophole, JP Morgan Stock-Picking Strategy, Yield Farming Strategy, 1-Page Exercise, 3-Step Method etc.</div>
            <textarea 
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">200 chars left</div>
        </div>

        {/* Scientific Studies... */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Scientific Studies/Research/Stats:
            </label>
            <div className="text-[12px] text-slate-500 mb-2">e.g. 9/10 dentists recommend</div>
            <textarea 
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">200 chars left</div>
        </div>

        {/* Featured in... */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Featured in (Social Proof):
            </label>
            <div className="text-[12px] text-slate-500 mb-2">e.g. GQ, Elle, Vogue & Forbes</div>
            <textarea 
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">200 chars left</div>
        </div>

        {/* Credible Authority Figure */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Credible Authority Figure:
            </label>
            <button 
                onClick={() => setShowAuthorityExamples(!showAuthorityExamples)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#F3E8FF] hover:bg-[#E9D5FF] text-[#7C3AED] text-[13px] font-bold rounded-lg transition-colors mb-3"
            >
                <Sparkles size={16} />
                Show Examples
                {showAuthorityExamples ? <Plus className="rotate-45 transition-transform" size={16} /> : <Plus size={16} />}
            </button>
            <textarea 
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">200 chars left</div>
        </div>

        {/* Unique Mechanism */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Unique Mechanism:
            </label>
            <div className="text-[12px] text-slate-500 mb-3 leading-relaxed">
                What makes this solution unique? Think in terms of special process, framework, ingredient, algorithm, 3-step system etc. that enables your target market to actually get their desired result.
            </div>
            
            {/* Mechanism Examples Box */}
            <div className="bg-[#FDFBFF] border border-[#E9D5FF] rounded-lg p-5 mb-3">
                <div className="flex items-center gap-2 mb-3 text-[#7C3AED] font-bold text-[13px]">
                    <Sparkles size={16} />
                    Examples
                </div>
                
                <div className="text-center text-[12px] text-slate-500 mb-4">
                    Click any to populate the text field then edit for your own business
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 bg-[#7C3AED] text-white rounded-lg hover:bg-[#6D28D9] transition-colors shrink-0">
                        <ArrowLeft size={16} />
                    </button>
                    
                    <div 
                        onClick={handleMechanismExampleClick}
                        className="flex-1 bg-white border border-[#E9D5FF] rounded-lg p-4 text-center cursor-pointer hover:border-[#7C3AED] hover:shadow-md transition-all"
                    >
                        <p className="text-[13px] font-bold text-slate-900">
                           $7.8 Billion AI Funnel That's Generating 90-480 Super Qualified Appointments A Month On Autopilot
                        </p>
                    </div>

                    <button className="p-2 bg-[#7C3AED] text-white rounded-lg hover:bg-[#6D28D9] transition-colors shrink-0">
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            <textarea 
                rows={4}
                value={mechanismInput}
                onChange={(e) => setMechanismInput(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">200 chars left</div>
        </div>

        {/* Number of reviews */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Number of reviews:
            </label>
            <div className="text-[12px] text-slate-500 mb-2">e.g. 3144.</div>
            <input 
                type="text" 
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
        </div>

        {/* Average review rating */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Average review rating:
            </label>
            <div className="text-[12px] text-slate-500 mb-2">e.g. 4.75.</div>
            <input 
                type="text" 
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
        </div>

        {/* Total number of customers ALL TIME */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Total number of customers ALL TIME:
            </label>
            <div className="text-[12px] text-slate-500 mb-2">e.g. 475000.</div>
            <input 
                type="text" 
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
        </div>

        {/* Testimonials */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Testimonials:
            </label>
            <div className="text-[12px] text-slate-500 mb-2">e.g. actual testimonials from users, each on a new line.</div>
            <textarea 
                rows={6}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">1000 chars left</div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 pt-4">
            <button className="px-6 py-3 bg-[#7C3AED] text-white text-[14px] font-bold rounded-lg hover:bg-[#6D28D9] transition-colors shadow-sm">
                Create Offer
            </button>
            <button 
                onClick={onCancel}
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 text-[14px] font-bold rounded-lg hover:bg-slate-50 transition-colors"
            >
                Cancel
            </button>
        </div>

      </div>
    </div>
  );
};