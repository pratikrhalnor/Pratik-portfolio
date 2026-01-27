# Portfolio Backend

Simple Express backend for handling contact form submissions via email.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your credentials:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

3. Run the server:
```bash
npm start
```

## API Endpoints

- `GET /` - Health check
- `POST /api/contact` - Submit contact form

## Deployment

This backend is designed to be deployed on Render.com or similar platforms.
