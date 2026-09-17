const powers = [
  {
    tag: "Cloth Tag: Empathy Radar",
    title: "Heart-Sense",
    desc: "Senses emotional heaviness, grief, and silent worries through his glowing chest emblem, even when you can't find the words.",
    icon: (
      <svg className="w-6 h-6 text-ember fill-current" viewBox="0 0 20 20">
        <path clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" fillRule="evenodd" />
      </svg>
    ),
    footLeft: "Warm Ember Signal",
    footRight: "Always Tuned",
    radius: "patch-radius-1",
  },
  {
    tag: "Cloth Tag: Gentle Comfort",
    title: "Mend-Touch",
    desc: "Offers unconditional listening, grounding advice, and a comforting presence that helps re-thread broken and chaotic days.",
    icon: (
      <svg className="w-6 h-6 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
    footLeft: "No Judgments",
    footRight: "100% Gentle",
    radius: "patch-radius-2",
  },
  {
    tag: "Cloth Tag: Resilient Hope",
    title: "Unbreakable Stitching",
    desc: "Proof that tears, seams, and scars aren't weaknesses — they are the very places where our strength was sewn in.",
    icon: (
      <svg className="w-6 h-6 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
    footLeft: "Wabi-Sabi Spirit",
    footRight: "Stronger Together",
    radius: "patch-radius-3",
  },
];

export default function PowersSection() {
  return (
    <section className="py-16 lg:py-24" id="how-he-helps">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-mustard uppercase tracking-widest inline-block mb-2">Capabilities of the Heart</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-parchment font-bold">How Tedman Mends</h2>
          <p className="text-parchment/80 mt-3 text-sm sm:text-base">
            He carries no weapons, shields, or armor — only thread, warmth, and the strength to hold space for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {powers.map((p) => (
            <div key={p.title} className="group perspective-1000 h-[380px] sm:h-[400px]">
              <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180 cursor-pointer">
                
                {/* Front Face */}
                <article
                  className={`absolute inset-0 backface-hidden bg-fur/40 ${p.radius} border-2 border-dashed border-mustard p-7 flex flex-col justify-between shadow-lg`}
                >
                  <div className="flex flex-col items-center text-center h-full pt-4">
                    <div className="inline-block px-3 py-1 bg-mustard text-ink font-semibold text-xs rounded-sm mb-6 shadow-sm">
                      {p.tag}
                    </div>
                    <div className="w-20 h-20 rounded-xl bg-umber/80 border border-mustard/60 flex items-center justify-center mb-6">
                      {/* Increase SVG size manually by overriding w-6 h-6 if they exist in the icon prop, but the icon prop has hardcoded classes. Let's just wrap the icon in a scaling div or replace the icon classes. */}
                      <div className="scale-[1.6]">
                        {p.icon}
                      </div>
                    </div>
                    <h3 className="font-serif text-2xl text-parchment font-bold mb-3">{p.title}</h3>
                  </div>
                  <div className="mt-6 pt-4 border-t border-dashed border-mustard/30 text-xs text-parchment/70 flex items-center justify-between w-full">
                    <span>{p.footLeft}</span>
                    <span className="text-ember font-bold">Hover to Read &rarr;</span>
                  </div>
                </article>

                {/* Back Face */}
                <article
                  className={`absolute inset-0 backface-hidden rotate-y-180 bg-fur/55 ${p.radius} border-2 border-dashed border-mustard p-7 flex flex-col justify-center items-center text-center shadow-[0_0_20px_rgba(217,154,52,0.15)]`}
                >
                  <h3 className="font-serif text-xl text-ember font-bold mb-4">{p.title}</h3>
                  <p className="text-parchment/90 text-sm sm:text-base leading-relaxed px-2">{p.desc}</p>
                </article>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
