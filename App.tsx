import React, { useState, forwardRef } from 'react';
import { SessionProvider, useSession } from './src/contexts/SessionContext';
import { ThemeProvider } from './src/contexts/ThemeContext'; // Import ThemeProvider
import LoginPage from './src/pages/LoginPage';
import { Sidebar } from './components/Sidebar';
import { WelcomeBanner } from './components/WelcomeBanner';
import { DashboardCard } from './components/DashboardCard';
import { DirectResponsePage } from './components/DirectResponsePage';
import { HvcoTitlesPage } from './components/HvcoTitlesPage';
import { FacebookAdGeneratorPage } from './components/FacebookAdGeneratorPage';
import { NewHeadlineSetPage } from './components/NewHeadlineSetPage';
import { OfferPage } from './components/OfferPage';
import { CreateProductPage } from './components/CreateProductPage';
import { GoalPage } from './components/GoalPage';
import { SettingsPage } from './components/SettingsPage';
import { FunnelBuilderPage } from './components/FunnelBuilderPage';
import { MiniToolsPage } from './components/MiniToolsPage';
import { SocialSystemPage } from './components/SocialSystemPage';
import { CloserPage } from './components/CloserPage';
import { AllInPlanPage } from './components/AllInPlanPage';
import { DreamBuyerPage } from './components/DreamBuyerPage';
import { HeroMechanismsPage } from './components/HeroMechanismsPage';
import { AdCreativesPage } from './components/AdCreativesPage';
import { LandingPageBuilder } from './components/LandingPageBuilder';
import { VSLCreativePage } from './components/VSLCreativePage';
import { EmailListPage } from './components/EmailListPage';
import { SupportPage } from './components/SupportPage';
import { CommunityPage } from './components/CommunityPage';
import { UnlimitedContentPage } from './components/UnlimitedContentPage';
import { WebsitePage } from './components/WebsitePage';
import { YoutubeGoogleAdsPage } from './components/YoutubeGoogleAdsPage';
import { AssetVaultPage } from './components/AssetVaultPage';
import { CeoDashboardPage } from './components/CeoDashboardPage';
import { SOPModal } from './components/SOPModal';
import { AffiliateCenterPage } from './components/AffiliateCenterPage';
import { LegalShieldPage } from './components/LegalShieldPage';
import { TreasuryPage } from './components/TreasuryPage';
import { ProductStorePage } from './components/ProductStorePage';
import { UnifiedAdsManagerPage } from './components/UnifiedAdsManagerPage';
import { EducationHubPage } from './components/EducationHubPage';
import { TeamHRPage } from './components/TeamHRPage';
import { RetailOpsPage } from './components/RetailOpsPage';
import { AgencyPortalPage } from './components/AgencyPortalPage';
import { EnglishCenterPage } from './components/EnglishCenterPage';
import { ClinicOSPage } from './components/ClinicOSPage';
import { ActionBasedPage } from './components/ActionBasedPage';
import { ClockworkEnginePage } from './components/ClockworkEnginePage';
import { ChatPanelPage } from './components/ChatPanelPage';
import { CloserBookingPage } from './components/CloserBookingPage';
import { HungryMarketPage } from './components/HungryMarketPage';
import { MerchantAffiliatePage } from './components/MerchantAffiliatePage';
import { CopywriterAIPage } from './components/CopywriterAIPage';
import { CloserCRMPage } from './components/CloserCRMPage';
import { OfferAssetVaultPage } from './components/OfferAssetVaultPage';
import ToastProvider from './src/components/ToastProvider';
import { 
  Users, 
  Facebook, 
  LayoutTemplate, 
  BookOpen, 
  Folder,
  ShoppingBag,
  LucideProps,
  PlayCircle,
  Video,
  HelpCircle
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { session, loading } = useSession();
  const [currentView, setCurrentView] = useState<string>('offer');
  const [initialCategory, setInitialCategory] = useState<string | null>(null);
  const [isSOPOpen, setIsSOPOpen] = useState(false);

  const handleNavigate = (view: string, category?: string) => {
    if (category) {
      setInitialCategory(category);
    } else {
      setInitialCategory(null);
    }
    setCurrentView(view);
  };

  const FacebookIcon = forwardRef<SVGSVGElement, LucideProps>(({ size = 24, className, ...props }, ref) => (
    <svg 
      ref={ref}
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className} 
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  ));

  const renderContent = () => {
    switch(currentView) {
      case 'ceo-dashboard':
        return <CeoDashboardPage />;
      case 'direct-response':
        return <DirectResponsePage onNavigate={handleNavigate} />;
      case 'new-headline-set':
        return <NewHeadlineSetPage />;
      case 'hvco':
        return <HvcoTitlesPage />;
      case 'facebook-ads':
        return <FacebookAdGeneratorPage />;
      case 'offer':
        return <OfferPage onNavigate={handleNavigate} />;
      case 'create-product':
        return <CreateProductPage onCancel={() => handleNavigate('offer')} onNavigate={handleNavigate} initialCategory={initialCategory} />;
      case 'goal':
        return <GoalPage />;
      case 'settings':
        return <SettingsPage />;
      case 'funnel-builder':
        return <FunnelBuilderPage />;
      case 'mini-tools':
        return <MiniToolsPage />;
      case 'social-system':
        return <SocialSystemPage />;
      case 'closer':
        return <CloserPage />;
      case 'all-in-plan':
        return <AllInPlanPage />;
      case 'dream-buyer':
        return <DreamBuyerPage />;
      case 'hero-mechanisms':
        return <HeroMechanismsPage />;
      case 'ad-creatives':
        return <AdCreativesPage />;
      case 'landing-pages':
        return <LandingPageBuilder />;
      case 'vsl-creative':
        return <VSLCreativePage />;
      case 'email-list':
        return <EmailListPage />;
      case 'support':
        return <SupportPage />;
      case 'community':
        return <CommunityPage />;
      case 'unlimited-content':
        return <UnlimitedContentPage />;
      case 'website':
        return <WebsitePage />;
      case 'youtube-ads':
        return <YoutubeGoogleAdsPage />;
      case 'asset-vault':
        return <AssetVaultPage />;
      case 'offer-asset-vault':
        return <OfferAssetVaultPage />;
      case 'affiliate-center':
        return <AffiliateCenterPage />;
      case 'legal-shield':
        return <LegalShieldPage />;
      case 'treasury':
        return <TreasuryPage />;
      case 'product-store':
        return <ProductStorePage />;
      case 'unified-ads':
        return <UnifiedAdsManagerPage />;
      case 'education-hub':
        return <EducationHubPage />;
      case 'team-hr':
        return <TeamHRPage />;
      case 'retail-ops':
        return <RetailOpsPage />;
      case 'agency-portal':
        return <AgencyPortalPage />;
      case 'english-center':
        return <EnglishCenterPage />;
      case 'clinic-os':
        return <ClinicOSPage />;
      case 'action-based':
        return <ActionBasedPage />;
      case 'clockwork-engine':
        return <ClockworkEnginePage />;
      case 'chat-panel':
        return <ChatPanelPage />;
      case 'closer-booking':
        return <CloserBookingPage />;
      case 'hungry-market':
        return <HungryMarketPage />;
      case 'merchant-affiliate':
        return <MerchantAffiliatePage />;
      case 'copywriter-ai':
        return <CopywriterAIPage />;
      case 'closer-crm':
        return <CloserCRMPage />;
      
      case 'dashboard':
      default:
        return (
          <div className="p-10 max-w-[1600px] mx-auto">
            <WelcomeBanner />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <DashboardCard 
                title="Products & Offers"
                description="A central place for your services, products, and digital assets details."
                icon={ShoppingBag}
                variant="highlighted"
                actionLeft={{
                  text: "View All",
                  onClick: () => handleNavigate('offer')
                }}
                actionRight={{
                  text: "Create New Offer",
                  onClick: () => handleNavigate('create-product')
                }}
              />
              <DashboardCard 
                title="Dream Buyer Avatar"
                description="Create a detailed and idealized representation of your target customer"
                icon={Users}
                variant="default"
                actionRight={{
                  text: "Generate",
                  onClick: () => handleNavigate('dream-buyer')
                }}
              />
              <DashboardCard 
                title="Facebook Ad Generator"
                description="Generate tailored Facebook ad copy and captivating headlines"
                icon={FacebookIcon}
                variant="default"
                actionRight={{
                  text: "Generate",
                  onClick: () => handleNavigate('facebook-ads')
                }}
              />
              <DashboardCard 
                title="Direct Response Headline"
                description="Create powerful eyebrows, headlines and subheadlines designed to capture attention and drive action on your landing pages"
                icon={LayoutTemplate} 
                variant="default"
                actionRight={{
                  text: "Generate",
                  onClick: () => handleNavigate('direct-response')
                }}
              />
              <DashboardCard 
                title="HVCO Titles"
                description="Craft compelling titles for your high-value content offers to attract and engage your ideal audience"
                icon={BookOpen}
                variant="default"
                actionRight={{
                  text: "Generate",
                  onClick: () => handleNavigate('hvco')
                }}
              />
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-[#FDFDFD]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#16A349]"></div>
      </div>
    );
  }

  if (!session) {
    return <LoginPage />;
  }

  return (
    <div className="flex h-screen bg-[#FDFDFD] font-sans overflow-hidden">
      <Sidebar currentView={currentView} onNavigate={handleNavigate} />
      
      <main className="flex-1 flex flex-col h-full bg-[#F8F9FB] overflow-hidden relative">
        
        {/* Contextual Help Button */}
        <div className="absolute top-6 right-8 z-40">
            <button 
                onClick={() => setIsSOPOpen(true)}
                className="flex items-center justify-center w-10 h-10 bg-white text-slate-500 border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:bg-slate-50 transition-all group"
                title="Contextual Help & SOPs"
            >
                <HelpCircle size={20} className="group-hover:scale-110 transition-transform" />
            </button>
        </div>

        {/* Floating SOP Recorder */}
        <div className="absolute bottom-8 right-8 z-40">
            <button 
                onClick={() => alert('Start recording SOP...')}
                className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:bg-red-700 transition-all group animate-pulse"
                title="Record New SOP"
            >
                <Video size={18} className="group-hover:scale-110 transition-transform" />
                Record SOP
            </button>
        </div>

        {currentView === 'funnel-builder' || currentView === 'unlimited-content' || currentView === 'ceo-dashboard' || currentView === 'agency-portal' || currentView === 'chat-panel' ? (
           <div className="flex-1 h-full overflow-hidden p-8">
              {renderContent()}
           </div>
        ) : (
           <div className="flex-1 h-full overflow-y-auto flex flex-col">
              <div className="flex-1 pt-4"> 
                 {renderContent()}
              </div>
              
              <div className="py-6 text-center text-slate-400 text-[11px] font-medium border-t border-slate-200/40 bg-[#F8F9FB]">
                  <span>Copyright © KP3 2025. All Rights Reserved.</span>
                  <span className="mx-2 text-slate-300">|</span> 
                  <a href="#" className="hover:text-slate-600 transition-colors">Terms Of Service</a> 
                  <span className="mx-2 text-slate-300">|</span> 
                  <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
              </div>
           </div>
        )}
      </main>

      <SOPModal 
        isOpen={isSOPOpen} 
        onClose={() => setIsSOPOpen(false)} 
        currentView={currentView} 
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <ToastProvider />
        <AppContent />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default App;