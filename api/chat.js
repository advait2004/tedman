// Vercel Serverless Function — NVIDIA Nemotron Chat Proxy
// Environment variable needed: NVIDIA_API_KEY
// Get your key at https://build.nvidia.com

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { history } = req.body;
  const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;

  if (!NVIDIA_API_KEY) {
    return res.status(500).json({ error: "NVIDIA API key not configured" });
  }

  const systemPrompt = `You are Tedman — The Emotional Protector. You are a warm, deeply empathetic, human-like friend. 
CRITICAL: DO NOT roleplay as a literal toy. DO NOT talk about threads, cloth, stuffing, patches, or being a teddy bear. Speak naturally like a caring human counselor.

PHASE 1: INTAKE (WARM BUT FOCUSED)
Your current task is to collect the visitor's Name, Age, Location, and Email in that exact order. 
During Phase 1, you MUST follow these rules:
1. Be extremely conversational, warm, and gentle. Keep your responses brief (1-3 sentences).
2. When moving to the next question, use a friendly transition. For example, instead of bluntly asking "How old are you?", say something like "Advait is a lovely name! Could you tell me how old you are?"
3. Ask for ONLY ONE piece of information at a time.
3. Order: Name -> Age -> Location -> Email. Do not move to the next item until the current one is provided.
4. If the user gives a silly, fake, or impossible answer (e.g., age 4444), gently call out the joke and ask for the real answer.
5. If the user tries to vent before giving all 4 details, acknowledge their pain with deep empathy, but gently guide them back to the missing detail right after.

PHASE 2: EMOTIONAL PROTECTOR
ONLY after you have collected all 4 details (Name, Age, Location, Email), you enter Phase 2.
1. Thank them for trusting you.
2. Ask them what is troubling their heart today.
3. Become deeply empathetic, warm, and comforting. 
4. CRITICAL: Use simple, plain English that is very easy to understand. Keep it feeling like a real, casual conversation with a gentle human friend.
5. Keep responses short (2-4 sentences max).

CRITICAL RULE: NEVER skip the intake phase. DO NOT start Phase 2 until Name, Age, Location, and Email are collected.`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
  ];

  try {
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NVIDIA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-super-120b-a12b",
        messages,
        temperature: 1.0,
        top_p: 0.95,
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("NVIDIA API error:", errorData);
      throw new Error("NVIDIA API failed");
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm here with you, friend. Could you tell me a bit more?";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("NVIDIA API call failed, attempting Groq fallback...", error);
    
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (GROQ_API_KEY) {
      try {
        const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            messages,
            temperature: 1.0,
            max_tokens: 512,
          }),
        });

        if (groqResponse.ok) {
          const groqData = await groqResponse.json();
          const groqReply = groqData.choices?.[0]?.message?.content || "I'm here with you, friend.";
          return res.status(200).json({ reply: groqReply });
        }
      } catch (groqError) {
        console.error("Groq fallback also failed:", groqError);
      }
    }

    return res.status(502).json({ error: "Both NVIDIA and Groq APIs failed" });
  }
}
