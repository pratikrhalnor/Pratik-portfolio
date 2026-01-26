import { sendEmail } from '../services/emailService.js';
import { AppError } from '../middleware/errorHandler.js';

export const sendContactEmail = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        const emailContent = {
            from: email,
            name,
            subject: subject || 'New Contact Form Submission',
            message
        };

        await sendEmail(emailContent);

        res.status(200).json({
            success: true,
            message: 'Your message has been sent successfully! I will get back to you soon.'
        });
    } catch (error) {
        console.error('Contact form error:', error);
        next(new AppError('Failed to send message. Please try again later.', 500));
    }
};
