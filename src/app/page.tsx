import HeroSection from "../components/home/HeroSection";
import ArrivalsSection from "../components/home/ArrivalsSection";
import CampaignSection from "../components/home/CampaignSection";
import CategoriesSection from "../components/home/CategoriesSection";
import IdentitySection from "../components/home/IdentitySection";
import FilmSection from "../components/home/FilmSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F7] relative">
      {/* Main container */}
      <main className="main flex-1 relative">
        {/* Hero section sticky pinned */}
        <div className="sticky top-0 left-0 w-full h-screen z-0">
          <HeroSection />
        </div>

        {/* Subsequent sections sliding over hero with parallax effect */}
        <div className="relative z-10 bg-[#FFF9F7] shadow-[0_-20px_30px_rgba(0,0,0,0.1)]">
          <ArrivalsSection />
          <CampaignSection />
          
          {/* Categories section with ID for smooth scroll from navbar */}
          <div id="categories-section">
            <CategoriesSection />
          </div>

          <IdentitySection />
          <FilmSection />
        </div>
      </main>
    </div>
  );
}