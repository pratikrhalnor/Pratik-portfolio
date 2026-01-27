import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting: 3 requests per 15 minutes per IP
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limit each IP to 3 requests per window
    message: {
        success: false,
        error: 'Too many requests. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Health check route
app.get('/', (req, res) => {
    res.json({
        status: 'running',
        message: 'Portfolio Backend API v2.0'
    });
});

// Helper function to validate email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Helper function to escape HTML (prevent XSS)
const escapeHtml = (text) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Helper function to check for spam keywords
const containsSpam = (text) => {
    const spamKeywords = ['viagra', 'casino', 'lottery', 'prize', 'click here', 'buy now'];
    const lowerText = text.toLowerCase();
    return spamKeywords.some(keyword => lowerText.includes(keyword));
};

// Contact form endpoint with rate limiting
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // 1. Check if all fields are provided
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Please provide name, email, and message'
            });
        }

        // 2. Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                error: 'Please provide a valid email address'
            });
        }

        // 3. Check minimum length
        if (message.length < 10) {
            return res.status(400).json({
                success: false,
                error: 'Message must be at least 10 characters long'
            });
        }

        // 4. Check maximum lengths (prevent abuse)
        if (name.length > 100) {
            return res.status(400).json({
                success: false,
                error: 'Name is too long (max 100 characters)'
            });
        }

        if (message.length > 1000) {
            return res.status(400).json({
                success: false,
                error: 'Message is too long (max 1000 characters)'
            });
        }

        // 5. Check for spam content
        if (containsSpam(name) || containsSpam(message)) {
            return res.status(400).json({
                success: false,
                error: 'Your message contains prohibited content'
            });
        }

        // 6. Sanitize inputs (escape HTML to prevent XSS)
        const safeName = escapeHtml(name.trim());
        const safeEmail = escapeHtml(email.trim());
        const safeMessage = escapeHtml(message.trim());

        console.log(`📧 New contact from: ${safeName}`);

        // Send email via Resend
        const data = await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: 'krishna.wable.mail@gmail.com',
            subject: `🎯 New Lead: ${safeName}`,
            replyTo: safeEmail,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            padding: 40px 20px;
                        }
                        .container { 
                            max-width: 600px; 
                            margin: 0 auto; 
                            background: white;
                            border-radius: 16px;
                            overflow: hidden;
                            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                        }
                        .header { 
                            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                            color: white; 
                            padding: 40px 30px;
                            text-align: center;
                        }
                        .header h1 { 
                            font-size: 28px; 
                            margin-bottom: 10px;
                            font-weight: 700;
                        }
                        .badge {
                            display: inline-block;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            padding: 8px 16px;
                            border-radius: 20px;
                            font-size: 12px;
                            font-weight: 600;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            margin-top: 10px;
                        }
                        .content { 
                            padding: 40px 30px;
                            background: #ffffff;
                        }
                        .field { 
                            margin-bottom: 30px;
                            padding-bottom: 25px;
                            border-bottom: 2px solid #f0f0f0;
                        }
                        .field:last-child { border-bottom: none; }
                        .label { 
                            font-size: 11px;
                            text-transform: uppercase;
                            color: #999;
                            font-weight: 700;
                            letter-spacing: 1.5px;
                            margin-bottom: 8px;
                        }
                        .value { 
                            font-size: 16px;
                            color: #333;
                            line-height: 1.6;
                            font-weight: 500;
                        }
                        .value a {
                            color: #667eea;
                            text-decoration: none;
                            font-weight: 600;
                        }
                        .message-box {
                            background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
                            padding: 20px;
                            border-radius: 12px;
                            border-left: 4px solid #667eea;
                            margin-top: 10px;
                            line-height: 1.8;
                        }
                        .footer {
                            background: #f8f9fa;
                            padding: 25px 30px;
                            text-align: center;
                            color: #666;
                            font-size: 13px;
                            border-top: 1px solid #e0e0e0;
                        }
                        .footer-link {
                            color: #667eea;
                            text-decoration: none;
                            font-weight: 600;
                        }
                        .timestamp {
                            color: #999;
                            font-size: 12px;
                            margin-top: 10px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🎯 New Portfolio Lead</h1>
                            <div class="badge">Portfolio Website</div>
                        </div>
                        
                        <div class="content">
                            <div class="field">
                                <div class="label">👤 Name</div>
                                <div class="value">${safeName}</div>
                            </div>
                            
                            <div class="field">
                                <div class="label">📧 Email Address</div>
                                <div class="value">
                                    <a href="mailto:${safeEmail}">${safeEmail}</a>
                                </div>
                            </div>
                            
                            <div class="field">
                                <div class="label">💬 Message</div>
                                <div class="message-box">${safeMessage}</div>
                            </div>
                        </div>
                        
                        <div class="footer">
                            <p>This email was sent from the contact form on <a href="https://buildwithkrishna.vercel.app" class="footer-link">buildwithkrishna.vercel.app</a></p>
                            <p class="timestamp">Received on ${new Date().toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'short'
            })}</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        console.log('✅ Email sent!', data);

        res.json({
            success: true,
            message: 'Your message has been sent successfully!'
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send message. Please try again later.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
