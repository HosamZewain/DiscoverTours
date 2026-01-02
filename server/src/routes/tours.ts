import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all tours
router.get('/', async (req, res) => {
    try {
        const tours = await prisma.tour.findMany();
        // Parse tags back to array
        const formattedTours = tours.map(tour => ({
            ...tour,
            tags: JSON.parse(tour.tags)
        }));
        res.json(formattedTours);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tours' });
    }
});

// Get single tour
router.get('/:id', async (req, res) => {
    try {
        const tour = await prisma.tour.findUnique({
            where: { id: req.params.id }
        });

        if (!tour) {
            return res.status(404).json({ error: 'Tour not found' });
        }

        res.json({
            ...tour,
            tags: JSON.parse(tour.tags)
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tour' });
    }
});

// Create new tour
router.post('/', async (req, res) => {
    try {
        const { title, description, price, duration, image, category, tags } = req.body;

        const tour = await prisma.tour.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                duration,
                image,
                category,
                tags: JSON.stringify(tags || [])
            }
        });

        res.json({
            ...tour,
            tags: JSON.parse(tour.tags)
        });
    } catch (error) {
        console.error('Error creating tour:', error);
        res.status(500).json({ error: 'Failed to create tour' });
    }
});

// Update tour
router.put('/:id', async (req, res) => {
    try {
        const { title, description, price, duration, image, category, tags } = req.body;

        const tour = await prisma.tour.update({
            where: { id: req.params.id },
            data: {
                title,
                description,
                price: parseFloat(price),
                duration,
                image,
                category,
                tags: JSON.stringify(tags || [])
            }
        });

        res.json({
            ...tour,
            tags: JSON.parse(tour.tags)
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update tour' });
    }
});

// Delete tour
router.delete('/:id', async (req, res) => {
    try {
        await prisma.tour.delete({
            where: { id: req.params.id }
        });
        res.json({ message: 'Tour deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete tour' });
    }
});

export default router;
