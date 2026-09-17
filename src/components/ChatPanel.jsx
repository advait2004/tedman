import { useState, useRef, useEffect } from "react";
import ChatBubble, { TypingIndicator } from "./ChatBubble";

/* ── Serverless API endpoints (Vercel) ── */
const EMAIL_API_URL = "/api/send-email";
const CHAT_API_URL = "/api/chat";

const INITIAL_GREETING = "Hello friend. I am Tedman, your emotional protector. Take a gentle breath. I felt a little storm brewing over your way, and I'm here to listen. Before we settle in, what's your name?";

const QUICK_PROMPTS = [
  "I need a comforting thought",
  "Feeling overwhelmed with work",
  "Just need to vent",
  "Remind me I'm doing okay",
];

/* ── Fallback empathic responses ── */
const FALLBACK_REPLIES = [
  "I hear you so clearly. Sometimes the kindest thing we can do is just set down the needle and thread, and let our hearts rest. You're doing better than you think.",
  "That sounds really heavy to carry by yourself. I'm right here in your corner. Take all the time you need — you don't have to prove anything right now.",
  "Your feelings make complete sense. A teddy bear's seams only show because he was loved enough to be held through the rough patches. You are worthy of that same gentleness.",
  "Take a slow, deep breath with me. In... and out. The world moves fast, but here in our listening patch, we take things one gentle stitch at a time.",
  "You haven't let anyone down by needing a break. Even superheroes have to repair their capes. What would bring your heart just 5% more peace right now?",
  "I'm keeping my chest warm for you. No matter how messy the thoughts feel, you're safe here to express every bit of it.",
];

export default function ChatPanel() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: INITIAL_GREETING }
  ]);
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [capturedEmail, setCapturedEmail] = useState("");
  const scrollRef = useRef(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, submitting]);

  async function handleSend(e) {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text || submittingRef.current) return;

    // Scan for email silently
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const match = text.match(emailRegex);
    if (match && match.length > 0) {
      setCapturedEmail(match[0]);
    }

    const newHistory = [...messages, { role: "user", content: text }];
    setMessages(newHistory);
    setInput("");
    setSubmitting(true);
    submittingRef.current = true;

    try {
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: newHistory }),
      });

      if (!res.ok) throw new Error("API unavailable");
      const result = await res.json();
      const reply = result.reply;
      
      setMessages([...newHistory, { role: "assistant", content: reply }]);
    } catch {
      const reply = FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
      setMessages([...newHistory, { role: "assistant", content: reply }]);
    } finally {
      setSubmitting(false);
      submittingRef.current = false;
      if (newHistory.length > 3) setShowFinish(true); // Show finish button after a few exchanges
    }
  }

  /* ── Final Submission via Resend ── */
  async function handleFinish() {
    if (submittingRef.current || done || messages.length <= 1) return;
    
    if (!capturedEmail) {
      alert("Please provide an email address in the chat so Tedman can follow up with you before finishing!");
      return;
    }

    setSubmitting(true);
    submittingRef.current = true;

    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const transcriptText = messages
      .map((m) => `${m.role === "user" ? "Friend" : "Tedman"}: ${m.content}`)
      .join("\n\n");

    try {
      const res = await fetch(EMAIL_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Friend",
          email: capturedEmail,
          age: "Captured in chat",
          location: "Captured in chat",
          grievance: transcriptText,
          timestamp: timestamp,
        }),
      });

      if (!res.ok) throw new Error("Email send failed");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Thank you for trusting me with all of that. Your request has been carefully stitched into my records and sent to my helpers. Someone will follow up with you soon at ${capturedEmail}. Remember — every tear can be mended. You are never alone. 🧡` }
      ]);
      setDone(true);
    } catch (err) {
      console.error("Email failed:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong sending that. Mind trying again? I won't let your words be lost." }
      ]);
    } finally {
      setSubmitting(false);
      submittingRef.current = false;
    }
  }

  function handleClear() {
    if (window.confirm("Would you like to start fresh with Tedman?")) {
      setMessages([{ role: "assistant", content: INITIAL_GREETING }]);
      setCapturedEmail("");
      setDone(false);
      setShowFinish(false);
    }
  }

  return (
    <section className="py-16 lg:py-24" id="chat-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="inline-block px-3.5 py-1 bg-fur border border-dashed border-mustard text-xs font-semibold text-parchment rounded-full mb-3">
            Tedman&apos;s Listening Patch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-parchment">
            A Safe Corner Just for You
          </h2>
          <p className="text-sm sm:text-base text-parchment/80 mt-2">
            No rush, no requirements. Whisper what&apos;s on your heart or tap one of the prompts below.
          </p>
        </div>

        {/* Chat Box */}
        <div className="bg-umber rounded-3xl border-2 border-dashed border-mustard shadow-2xl overflow-hidden flex flex-col h-[650px] relative">
          {/* Chat Header */}
          <div className="bg-fur/80 border-b-2 border-dashed border-mustard/50 p-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-mustard/20 border-2 border-dashed border-mustard flex items-center justify-center relative">
                <svg className="w-6 h-6 text-ember" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" fill="#8B5A3C" r="9" stroke="#D99A34" strokeWidth="1.5" />
                  <circle cx="9" cy="10" fill="#1A120D" r="1.3" />
                  <circle cx="15" cy="10" fill="#1A120D" r="1.3" />
                  <path d="M9.5 14.5 Q12 17 14.5 14.5" fill="none" stroke="#1A120D" strokeLinecap="round" strokeWidth="1.5" />
                </svg>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-umber"></span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-parchment text-base flex items-center gap-2">
                  Tedman&apos;s Mending Station
                  <span className="text-xs font-sans text-ember/90 font-medium animate-pulse">● Heart-Sense Active</span>
                </h3>
                <p className="text-xs text-parchment/75">Whisper your worries, and let me carry them for a while.</p>
              </div>
            </div>
            <button
              className="text-xs text-parchment/70 hover:text-ember px-2.5 py-1 rounded border border-mustard/30 hover:border-mustard transition-colors"
              onClick={handleClear}
            >
              Start Fresh
            </button>
          </div>

          {/* Chat Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-sm"
          >
            {messages.map((m, i) => (
              <ChatBubble key={i} sender={m.role === "user" ? "user" : "tedman"} text={m.content} />
            ))}
            {submitting && <TypingIndicator />}
          </div>

          {/* Quick Prompts */}
          {!done && (
            <div className="px-4 sm:px-6 py-2 bg-umber/90 border-t border-mustard/30 flex gap-2 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  className="text-xs whitespace-nowrap bg-fur/40 hover:bg-mustard hover:text-ink text-parchment border border-dashed border-mustard/50 px-3 py-1.5 rounded-full transition-colors"
                  onClick={() => setInput(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* I'm Done Button */}
          {capturedEmail && !done && (
            <div className="px-4 py-2 bg-umber/80 border-t border-mustard/30 flex justify-center">
              <button
                className="inline-flex items-center gap-2 bg-ember text-ink font-bold px-6 py-2.5 rounded-xl border border-mustard shadow-[0_4px_14px_rgba(255,217,160,0.35)] hover:shadow-[0_6px_20px_rgba(255,217,160,0.55)] active:scale-95 transition-all text-sm disabled:opacity-50"
                onClick={handleFinish}
                disabled={submitting}
              >
                ✓ I&apos;m Done — Submit My Request
              </button>
            </div>
          )}

          {/* Input Form */}
          <form
            className="p-3 sm:p-4 bg-fur/30 border-t-2 border-dashed border-mustard/50 flex items-center gap-2 sm:gap-3"
            onSubmit={handleSend}
          >
            <input
              autoComplete="off"
              className="flex-1 bg-parchment text-ink placeholder-ink/60 border-2 border-mustard/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ember focus:border-mustard"
              placeholder={done ? "Tedman is still here if you need to talk more..." : "Whisper or speak your worry to Tedman..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={submitting}
            />
            <button
              aria-label="Send message to Tedman"
              className="bg-ember text-ink hover:bg-ember/90 font-bold px-5 py-3 rounded-xl border border-mustard shadow-[0_2px_10px_rgba(255,217,160,0.4)] hover:shadow-[0_4px_16px_rgba(255,217,160,0.7)] active:scale-95 transition-all flex items-center gap-1.5 text-sm disabled:opacity-50"
              type="submit"
              disabled={submitting || !input.trim()}
            >
              <span>Send</span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
