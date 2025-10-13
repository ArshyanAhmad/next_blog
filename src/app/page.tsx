import { HeroSection } from "@/components/hero/hero-section";
import TopNavbarWrapper from "@/components/TopNavbarWrapper";

export default function Home() {
  return (
    <div>
      <nav className="fixed left-0 top-0 w-full z-[99]">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-lg dark:bg-neutral-900/60"></div>

        <TopNavbarWrapper />
      </nav>

      <div>
        <HeroSection />
      </div>

    </div>
  );
}
