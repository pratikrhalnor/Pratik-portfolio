import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
    res.json({
        status: 'running',
        message: 'Portfolio Backend API v2.0'
    });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Please provide name, email, and message'
            });
        }

        if (message.length < 10) {
            return res.status(400).json({
                success: false,
                error: 'Message must be at least 10 characters long'
            });
        }

        console.log(`📧 New contact from: ${name}`);

        // Send email via Resend
        const data = await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: 'krishna.wable.mail@gmail.com',
            subject: `🎯 New Lead: ${name}`,
            replyTo: email,
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
                                <div class="value">${name}</div>
                            </div>
                            
                            <div class="field">
                                <div class="label">📧 Email Address</div>
                                <div class="value">
                                    <a href="mailto:${email}">${email}</a>
                                </div>
                            </div>
                            
                            <div class="field">
                                <div class="label">💬 Message</div>
                                <div class="message-box">${message}</div>
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
