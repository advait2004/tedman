export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-umber/90 border-b border-dashed border-mustard/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand & Identity */}
        <a aria-label="Tedman Home" className="flex items-center gap-3.5 group cursor-pointer" href="#">
          <div className="w-12 h-12 rounded-full bg-fur border-2 border-dashed border-mustard flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-200 relative overflow-hidden">
            <svg className="w-7 h-7 text-ember" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" fill="#8B5A3C" r="9" stroke="#D99A34" strokeWidth="2" />
              <circle cx="9.5" cy="9.5" fill="#1A120D" r="1.5" />
              <circle cx="14.5" cy="9.5" fill="#1A120D" r="1.5" />
              <circle cx="9.5" cy="14.5" fill="#1A120D" r="1.5" />
              <circle cx="14.5" cy="14.5" fill="#1A120D" r="1.5" />
              <line stroke="#FFD9A0" strokeLinecap="round" strokeWidth="1.2" x1="9.5" x2="14.5" y1="9.5" y2="14.5" />
              <line stroke="#FFD9A0" strokeLinecap="round" strokeWidth="1.2" x1="14.5" x2="9.5" y1="9.5" y2="14.5" />
            </svg>
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-normal text-parchment flex items-center gap-1.5">
              Tedman
              <span className="text-xs bg-mustard text-ink font-sans font-semibold px-2 py-0.5 rounded border border-ember/60 uppercase tracking-wider">Patch v1</span>
            </span>
            <p className="text-xs text-parchment/80 font-medium">The Emotional Protector</p>
          </div>
        </a>

        {/* Right: Status + Nav + CTA */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Heart-Sense Status */}
          <div className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-fur/50 border border-dashed border-mustard/50 text-xs text-parchment/90">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ember"></span>
            </span>
            <span>Tedman&apos;s Heart-Sense is active</span>
          </div>
          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a className="text-parchment/85 hover:text-ember transition-colors" href="#how-he-helps">How He Helps</a>
            <a className="text-parchment/85 hover:text-ember transition-colors" href="#the-story">The Story</a>
          </nav>
          {/* Signal Tedman CTA */}
          <a
            className="inline-flex items-center gap-2 bg-ember text-ink font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-mustard shadow-[0_4px_14px_rgba(255,217,160,0.35)] hover:shadow-[0_6px_20px_rgba(255,217,160,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
            href="#chat-section"
          >
            <svg className="w-4 h-4 text-ink fill-current" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span>Signal Tedman</span>
          </a>
        </div>
      </div>
    </header>
  );
}
