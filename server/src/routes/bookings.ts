import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

import upload from '../middleware/upload';

// Create new booking with receipt
router.post('/', upload.single('receipt'), async (req, res) => {
    try {
        // req.body will preserve text fields
        const { fullName, email, phone, date, guests, tourId, totalPrice } = req.body;
        const receiptImage = req.file ? `/uploads/${req.file.filename}` : null;

        const booking = await prisma.booking.create({
            data: {
                fullName,
                email,
                phone,
                date: new Date(date),
                guests: parseInt(guests), // FormData sends numbers as strings
                tourId,
                totalPrice: parseFloat(totalPrice), // FormData sends numbers as strings
                receiptImage,
                status: 'PENDING'
            }
        });

        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

// Get all bookings (Admin protected - simplified for now)
router.get('/', async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                tour: {
                    select: { title: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

// Update booking status
router.patch('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await prisma.booking.update({
            where: { id: req.params.id },
            data: { status }
        });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update booking' });
    }
});

export default router;
