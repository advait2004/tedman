export default function ChatBubble({ sender, text }) {
  const isTedman = sender === "tedman";

  if (!isTedman) {
    return (
      <div className="flex items-start justify-end gap-3 max-w-[85%] ml-auto animate-fade-in">
        <div className="bg-mustard/30 text-parchment p-4 rounded-2xl rounded-tr-sm border border-dashed border-mustard/60 leading-relaxed shadow-sm">
          <p className="font-semibold text-xs text-parchment/70 mb-1 text-right">You</p>
          {text}
        </div>
        <div className="w-8 h-8 rounded-full bg-mustard/40 border border-mustard flex-shrink-0 flex items-center justify-center text-xs text-ink font-bold">
          You
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 max-w-[85%] animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-fur border border-mustard flex-shrink-0 flex items-center justify-center relative overflow-hidden">
        <svg className="w-5 h-5 text-ember relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" fill="#8B5A3C" r="9" stroke="#D99A34" strokeWidth="2" />
          <circle cx="9.5" cy="9.5" fill="#1A120D" r="1.5" />
          <circle cx="14.5" cy="9.5" fill="#1A120D" r="1.5" />
          <circle cx="9.5" cy="14.5" fill="#1A120D" r="1.5" />
          <circle cx="14.5" cy="14.5" fill="#1A120D" r="1.5" />
          <line stroke="#FFD9A0" strokeLinecap="round" strokeWidth="1.2" x1="9.5" x2="14.5" y1="9.5" y2="14.5" />
          <line stroke="#FFD9A0" strokeLinecap="round" strokeWidth="1.2" x1="14.5" x2="9.5" y1="9.5" y2="14.5" />
        </svg>
      </div>
      <div className="bg-fur/60 text-parchment p-4 rounded-2xl rounded-tl-sm border border-dashed border-mustard/40 leading-relaxed shadow-sm">
        <p className="font-semibold text-xs text-ember mb-1">Tedman</p>
        {text}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-parchment/60 text-xs pl-11 animate-fade-in">
      <span>Tedman is threading a thoughtful response</span>
      <span className="inline-flex gap-1">
        <span className="w-1.5 h-1.5 bg-ember rounded-full animate-bounce"></span>
        <span className="w-1.5 h-1.5 bg-ember rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
        <span className="w-1.5 h-1.5 bg-ember rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
      </span>
    </div>
  );
}
