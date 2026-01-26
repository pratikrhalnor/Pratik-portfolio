# Portfolio Backend API

Backend API for Krishna's Portfolio website with contact form functionality.

## 📁 Project Structure

```
backend/
├── config/
│   └── config.js              # Centralized configuration
├── controllers/
│   └── contactController.js   # Contact form logic
├── middleware/
│   ├── errorHandler.js        # Error handling
│   ├── rateLimiter.js         # Rate limiting
│   └── validator.js           # Input validation
├── routes/
│   └── contactRoutes.js       # API routes
├── services/
│   └── emailService.js        # Email sending service
├── .env.example               # Environment variables template
├── package.json
├── server.js                  # Entry point
└── README.md
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Production Server
```bash
npm start
```

## 📧 Email Configuration

For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `EMAIL_PASSWORD`

## 🔒 Security Features

- ✅ Helmet.js for security headers
- ✅ CORS protection
- ✅ Rate limiting on contact form
- ✅ Input validation and sanitization
- ✅ Error handling middleware

## 📡 API Endpoints

### GET /
Health check endpoint
```json
{
  "message": "Portfolio API is running",
  "version": "1.0.0",
  "endpoints": {
    "contact": "/api/contact"
  }
}
```

### POST /api/contact
Send contact form message

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
```

## 🛠️ Tech Stack

- Express.js - Web framework
- Nodemailer - Email sending
- Express Validator - Input validation
- Helmet - Security headers
- CORS - Cross-origin resource sharing
- Express Rate Limit - Rate limiting

## 📝 License

MIT
