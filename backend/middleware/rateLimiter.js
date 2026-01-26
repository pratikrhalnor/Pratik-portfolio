import rateLimit from 'express-rate-limit';

export const contactLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5,
    message: {
        success: false,
        error: {
            message: 'Too many contact requests from this IP, please try again later.'
        }
    },
    standardHeaders: true,
    legacyHeaders: false,
});
