import AutoLoopCanvas from "./AutoLoopCanvas";

export default function HeroSection({ onLoadComplete }) {
  return (
    <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Fabric Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-fur border-stitch text-xs font-semibold text-parchment tracking-wide shadow-sm mb-6 transform -rotate-1 hover:rotate-0 transition-transform">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-ember"></span>
              Hand-mended • Always here for you
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-parchment font-bold leading-[1.18] tracking-normal mb-6">
              You don&apos;t have to carry the heavy things alone.
            </h1>

            <p className="text-base sm:text-lg text-parchment/90 font-normal leading-relaxed mb-8 max-w-xl">
              When the weight feels too much, Tedman is here to listen, mend frayed spirits, and remind you that being mended makes you stronger.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                className="relative group inline-flex items-center justify-center gap-3 bg-ember text-ink font-bold text-lg px-8 py-4 rounded-2xl border-2 border-mustard shadow-[0_6px_25px_rgba(255,217,160,0.45)] hover:shadow-[0_8px_35px_rgba(255,217,160,0.65)] hover:-translate-y-0.5 transition-all"
                href="#chat-section"
              >
                <svg className="w-5 h-5 fill-current text-ink" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-4 0h-2v2h2V9z" fillRule="evenodd" />
                </svg>
                <span>Talk to Tedman</span>
              </a>
              <a className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-fur/40 hover:bg-fur/70 text-parchment border border-dashed border-mustard/60 transition-colors font-medium text-sm" href="#the-story">
                <span>Learn His Story</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Reassuring Pill */}
            <div className="mt-8 flex items-center gap-3 text-xs text-parchment/80 bg-fur/30 px-4 py-2.5 rounded-xl border border-dashed border-mustard/40">
              <span className="text-ember font-bold text-sm">✦</span>
              <span>Need a quiet space or a gentle ear right now? Press above anytime.</span>
            </div>
          </div>

          {/* Right Column: Tedman Hero Artwork */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Image Container with Dynamic Border Glow */}
            <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden border-4 border-mustard/40 bg-fur/20 animate-gentle-hover">
              <AutoLoopCanvas className="w-full h-full" onLoadComplete={onLoadComplete} />
              
              {/* Badge */}
              <div className="absolute bottom-4 left-4 bg-umber/90 backdrop-blur-sm border border-dashed border-mustard px-3.5 py-1.5 rounded-lg text-xs text-parchment shadow-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ember animate-ping"></span>
                <span>Heart-Sense Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
