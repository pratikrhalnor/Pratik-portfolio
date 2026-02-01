import { Resend } from "resend";

export default async function handler(req, res) {
  try {
    // Method guard
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Body guard
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    // Env guard
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY missing");
      return res.status(500).json({
        error: "Server misconfiguration",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email
    const response = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "krishna.wable.mail@gmail.com",
      replyTo: email,
      subject: `New Portfolio Lead: ${name}`,
      html: `
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("🔥 CONTACT API ERROR:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
