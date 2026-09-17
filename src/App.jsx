import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import OriginStory from "./components/OriginStory";
import PowersSection from "./components/PowersSection";
import ChatPanel from "./components/ChatPanel";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

import CanvasScrollSection from "./components/CanvasScrollSection";

function StitchDivider() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="border-t-2 border-dashed border-mustard/40 my-4"></div>
    </div>
  );
}

function CrisisBanner() {
  return (
    <section className="py-8 bg-fur/20 border-y-2 border-dashed border-mustard/40">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm sm:text-base text-parchment/90 font-serif leading-relaxed">
          <span className="font-bold text-ember">Need immediate human care?</span>{" "}
          If you or someone you know is in deep distress or emergency crisis, please reach out:{" "}
          <strong className="text-ember underline decoration-dashed">iCall — 9152987821</strong>{" "}
          | <strong className="text-ember underline decoration-dashed">Vandrevala Foundation — 1860-2662-345</strong>{" "}
          | <strong className="text-ember underline decoration-dashed">AASRA — 9820466726</strong>.{" "}
          Tedman is here to accompany you, but real human support is always ready to embrace you.
        </p>
      </div>
    </section>
  );
}

export default function App() {
  const [scrollLoaded, setScrollLoaded] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  // The app is ready when both massive image sequences have finished preloading
  const isReady = scrollLoaded && heroLoaded;

  return (
    <div className="bg-woven text-parchment font-sans min-h-screen antialiased relative">
      <Loader isReady={isReady} />
      <Header />

      <main>
        <CanvasScrollSection onLoadComplete={setScrollLoaded} />
        <HeroSection onLoadComplete={setHeroLoaded} />
        <StitchDivider />
        <OriginStory />
        <StitchDivider />
        <PowersSection />
        <StitchDivider />
        <ChatPanel />
        <CrisisBanner />
      </main>

      <Footer />
    </div>
  );
}
