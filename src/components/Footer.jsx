export default function Footer() {
  return (
    <footer className="bg-umber py-12 border-t-4 border-dashed border-mustard/50 text-parchment/70 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-fur border border-mustard flex items-center justify-center text-ember font-serif font-bold text-xs">
              T
            </div>
            <div>
              <p className="font-serif font-bold text-parchment text-sm">Tedman — The Emotional Protector</p>
              <p className="text-xs text-parchment/60">Every tear can be mended. You are never alone.</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs text-parchment/80">Crafted with needle, thread, and unconditional warmth.</p>
            <p className="text-[11px] text-parchment/50 mt-1">© 2026 Tedman Sanctuary Portal. All rights preserved with love.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
