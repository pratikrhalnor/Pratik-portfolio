import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* -------------------- Resend Init -------------------- */
const resend = new Resend(process.env.RESEND_API_KEY);

/* -------------------- Middleware -------------------- */
app.use(cors({
  origin: '*', // OK for portfolio; restrict later if needed
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- Rate Limiter -------------------- */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    error: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/* -------------------- Health Check -------------------- */
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    message: 'Portfolio Backend API v2.0',
  });
});

/* -------------------- Helpers -------------------- */
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }[char]));

const containsSpam = (text) => {
  const spamWords = ['viagra', 'casino', 'lottery', 'prize', 'click here', 'buy now'];
  return spamWords.some(word => text.toLowerCase().includes(word));
};

/* -------------------- Contact API -------------------- */
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    /* ---- Validation ---- */
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address' });
    }

    if (message.length < 10 || message.length > 1000) {
      return res.status(400).json({ success: false, error: 'Message length invalid' });
    }

    if (name.length > 100 || containsSpam(name) || containsSpam(message)) {
      return res.status(400).json({ success: false, error: 'Prohibited content detected' });
    }

    /* ---- Sanitization ---- */
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim());

    /* -------------------- SEND EMAIL (YOUR TEMPLATE) -------------------- */
    await resend.emails.send({
      from: 'Portfolio <no-reply@resend.dev>', // SAFE for Render
      to: process.env.RECEIVER_EMAIL, // YOUR email
      subject: `🎯 New Portfolio Lead: ${safeName}`,
      reply_to: safeEmail,                     // ✅ FIXED
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial;
    background: linear-gradient(135deg, #667eea, #764ba2);
    padding: 40px 20px;
  }
  .container {
    max-width: 600px;
    background: #fff;
    margin: auto;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,.3);
  }
  .header {
    background: #111;
    color: #fff;
    padding: 32px;
    text-align: center;
  }
  .content {
    padding: 30px;
  }
  .label {
    font-size: 11px;
    text-transform: uppercase;
    opacity: .6;
    margin-bottom: 6px;
  }
  .value {
    font-size: 16px;
    margin-bottom: 24px;
  }
  .message {
    background: #f4f6ff;
    padding: 16px;
    border-left: 4px solid #667eea;
    border-radius: 8px;
  }
  .footer {
    text-align: center;
    padding: 20px;
    font-size: 12px;
    opacity: .7;
  }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h2>New Portfolio Contact</h2>
  </div>
  <div class="content">
    <div class="label">Name</div>
    <div class="value">${safeName}</div>

    <div class="label">Email</div>
    <div class="value">${safeEmail}</div>

    <div class="label">Message</div>
    <div class="message">${safeMessage}</div>
  </div>
  <div class="footer">
    Received on ${new Date().toLocaleString()}
  </div>
</div>
</body>
</html>
      `,
    });

    res.json({ success: true, message: 'Message sent successfully!' });

  } catch (err) {
    console.error('❌ Email Error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Try again later.',
    });
  }
});

/* -------------------- Server Start -------------------- */
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  
});
