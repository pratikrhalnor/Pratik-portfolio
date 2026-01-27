import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Completely open CORS for testing
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple health check
app.get('/', (req, res) => {
    res.json({ status: 'healthy', version: '1.0.1' });
});

// TEST ROUTE: To see if the server can receive ANY post request
app.post('/api/test', (req, res) => {
    console.log('Test request received:', req.body);
    res.json({ message: 'CORS and Connection are working!', received: req.body });
});

app.use('/api/contact', contactRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

export default app;
