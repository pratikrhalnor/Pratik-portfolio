import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
    res.json({
        status: 'running',
        message: 'Portfolio Backend API v2.0',
        endpoints: {
            contact: 'POST /api/contact'
        }
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

        console.log(`📧 New contact request from: ${name} (${email})`);

        // Create email transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Email HTML template
        const emailHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
                    .content { background: #f9f9f9; padding: 20px; }
                    .field { margin-bottom: 15px; }
                    .label { font-weight: bold; color: #555; }
                    .value { margin-top: 5px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>🎯 New Portfolio Lead</h2>
                        <p>Someone wants to connect with you!</p>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">Name:</div>
                            <div class="value">${name}</div>
                        </div>
                        <div class="field">
                            <div class="label">Email:</div>
                            <div class="value"><a href="mailto:${email}">${email}</a></div>
                        </div>
                        <div class="field">
                            <div class="label">Message:</div>
                            <div class="value">${message}</div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Send email
        const info = await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: 'krishna.wable.mail@gmail.com',
            subject: `New Lead: ${name}`,
            html: emailHTML,
            replyTo: email,
        });

        console.log('✅ Email sent successfully! Message ID:', info.messageId);

        res.json({
            success: true,
            message: 'Your message has been sent successfully!'
        });

    } catch (error) {
        console.error('❌ Error sending email:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send message. Please try again later.'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📧 Email configured for: ${process.env.EMAIL_USER || 'NOT SET'}`);
});
