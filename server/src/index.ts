import 'dotenv/config'; // Load env vars immediately
import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

console.log('--- BACKEND STARTING ---');
console.log('CWD:', process.cwd());
console.log('DATABASE_URL set:', !!process.env.DATABASE_URL);

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

import tourRoutes from './routes/tours';
import bookingRoutes from './routes/bookings';
import authRoutes from './routes/auth';
import destinationRoutes from './routes/destinations';
import settingsRoutes from './routes/settings';

app.use(cors());
app.use(express.json());

app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/uploads', express.static('uploads')); // Serve uploaded receipts

// Basic health check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { app, prisma };
