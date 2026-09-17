// Vercel Serverless Function — Send email via Resend API
// Environment variable needed: RESEND_API_KEY
// Get your key at https://resend.com/api-keys

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, age, location, grievance, timestamp } = req.body;

  if (!name || !email || !grievance) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  // Change this to the email where you want to receive notifications
  const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "your-email@example.com";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tedman Guardian Network <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        subject: `🧸 New Help Request from ${name} — Tedman Guardian Network`,
        html: `
          <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #241813; color: #F1E4CC; padding: 32px; border-radius: 16px; border: 2px dashed #D99A34;">
            <h1 style="color: #D99A34; font-family: Georgia, serif; margin-top: 0;">🧸 Tedman Help Request</h1>
            <hr style="border: 1px dashed #D99A34; margin: 16px 0;" />
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #FFD9A0; font-weight: bold; width: 100px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #FFD9A0; font-weight: bold;">Age</td><td style="padding: 8px 0;">${age}</td></tr>
              <tr><td style="padding: 8px 0; color: #FFD9A0; font-weight: bold;">Location</td><td style="padding: 8px 0;">${location}</td></tr>
              <tr><td style="padding: 8px 0; color: #FFD9A0; font-weight: bold;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #FFD9A0;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #FFD9A0; font-weight: bold;">Time (IST)</td><td style="padding: 8px 0;">${timestamp}</td></tr>
            </table>
            
            <hr style="border: 1px dashed #D99A34; margin: 16px 0;" />
            <h2 style="color: #D99A34; font-family: Georgia, serif;">Conversation Transcript</h2>
            <pre style="white-space: pre-wrap; font-size: 14px; line-height: 1.7; color: #F1E4CC; background: #1A120D; padding: 16px; border-radius: 8px; border: 1px dashed #8B5A3C;">${grievance}</pre>
            
            <p style="margin-top: 24px; font-size: 12px; color: #8B5A3C; text-align: center;">
              Sent from Tedman's Sanctuary Portal • Stitched with care
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API error:", errorData);
      return res.status(500).json({ error: "Failed to send email", details: errorData });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
