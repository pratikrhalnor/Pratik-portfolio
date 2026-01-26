import express from 'express';
import { sendContactEmail } from '../controllers/contactController.js';
import { validateContactForm, handleValidationErrors } from '../middleware/validator.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post(
    '/',
    contactLimiter,
    validateContactForm,
    handleValidationErrors,
    sendContactEmail
);

export default router;
