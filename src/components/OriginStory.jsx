export default function OriginStory() {
  return (
    <section className="py-12 lg:py-20" id="the-story">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative bg-fur/35 quilt-radius border-2 border-dashed border-mustard p-8 sm:p-12 shadow-xl backdrop-blur-sm">
          {/* Vintage Stitched Cross Accents */}
          <div aria-hidden="true" className="absolute top-3 left-4 text-mustard/70 font-mono text-sm select-none">✕ ✕</div>
          <div aria-hidden="true" className="absolute top-3 right-4 text-mustard/70 font-mono text-sm select-none">✕ ✕</div>
          <div aria-hidden="true" className="absolute bottom-3 left-4 text-mustard/70 font-mono text-sm select-none">✕ ✕</div>
          <div aria-hidden="true" className="absolute bottom-3 right-4 text-mustard/70 font-mono text-sm select-none">✕ ✕</div>

          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 mb-4 rounded bg-mustard/20 border border-mustard/50 text-xs font-semibold text-ember">
              The Mended Hero
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-parchment font-bold mb-6 leading-snug">
              Every seam tells a story of survival.
            </h2>
            <blockquote className="text-base sm:text-lg text-parchment/90 font-serif italic leading-relaxed">
              &ldquo;Once a discarded, worn-out teddy bear tossed aside in a quiet attic, he was carefully mended with yellow thread, courage, and unconditional love. Brought to life with a heart that warms whenever someone nearby is silently hurting, Tedman stands ready — not to fight villains, but to soften the world.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-mustard/40"></span>
              <span className="text-xs font-semibold text-mustard tracking-wider uppercase">Stitched with Care</span>
              <span className="h-px w-12 bg-mustard/40"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
