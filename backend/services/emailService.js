import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    pool: true,   // Reuse connections
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Adding debug logging to help identify the exact point of failure
    debug: true,
    logger: true
  });

  transporter.verify((error, success) => {
    if (error) {
      console.log('❌ Email Service Verification Error:', error);
    } else {
      console.log('✅ Email Server is ready to send');
    }
  });

  return transporter;
};

export const sendEmail = async ({ from, name, subject, message }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `New Lead via Portfolio: ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 30px auto; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; }
            .header { background: #1a1a1a; color: white; padding: 25px; text-align: center; }
            .header h2 { margin: 0; font-size: 24px; letter-spacing: 1px; }
            .content { padding: 30px; }
            .field-group { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
            .field-group:last-child { border-bottom: none; }
            .label { font-size: 12px; text-transform: uppercase; color: #888; margin-bottom: 5px; letter-spacing: 0.5px; font-weight: bold; }
            .value { font-size: 16px; color: #222; font-weight: 500; }
            .message-box { background: #f9f9f9; padding: 15px; border-left: 4px solid #646cff; border-radius: 4px; margin-top: 5px; }
            .footer { background: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888; }
            .badge { display: inline-block; background: #646cff; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Portfolio Lead</h2>
              <div class="badge">Source: Portfolio Website</div>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field-group">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${from}" style="color: #646cff; text-decoration: none;">${from}</a></div>
              </div>

              <div class="field-group">
                <div class="label">Message</div>
                <div class="value message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the contact form on your portfolio website.</p>
              <p>&copy; ${new Date().getFullYear()} Krishna Wable Portfolio</p>
            </div>
          </div>
        </body>
      </html>
    `,
    replyTo: from,
  };

  await transporter.sendMail(mailOptions);
};
