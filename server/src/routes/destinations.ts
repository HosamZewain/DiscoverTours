
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all destinations
router.get('/', async (req, res) => {
    try {
        const destinations = await prisma.destination.findMany({
            include: { _count: { select: { tours: true } } }
        });
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch destinations' });
    }
});

// Get single destination by slug or ID
router.get('/:idOrSlug', async (req, res) => {
    const { idOrSlug } = req.params;
    try {
        const destination = await prisma.destination.findFirst({
            where: {
                OR: [
                    { id: idOrSlug },
                    { slug: idOrSlug }
                ]
            },
            include: {
                tours: true
            }
        });

        if (!destination) {
            return res.status(404).json({ error: 'Destination not found' });
        }
        res.json(destination);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch destination' });
    }
});

// Create destination
router.post('/', async (req, res) => {
    try {
        const destination = await prisma.destination.create({
            data: req.body
        });
        res.json(destination);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create destination' });
    }
});

// Update destination
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const destination = await prisma.destination.update({
            where: { id },
            data: req.body
        });
        res.json(destination);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update destination' });
    }
});

// Delete destination
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.destination.delete({
            where: { id }
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete destination' });
    }
});

export default router;
