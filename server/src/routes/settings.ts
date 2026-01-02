import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all settings
router.get('/', async (req, res) => {
    try {
        const settings = await prisma.settings.findMany();
        // Convert array to object { key: value }
        const settingsMap = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);

        res.json(settingsMap);
    } catch (error) {
        console.error('Failed to fetch settings:', error);
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

// Update settings (upsert)
router.post('/', async (req, res) => {
    try {
        const settings = req.body; // Expect { key: value, key2: value2 }

        const updates = Object.entries(settings).map(([key, value]) => {
            return prisma.settings.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value) }
            });
        });

        await prisma.$transaction(updates);

        // Return updated settings
        const updatedSettings = await prisma.settings.findMany();
        const settingsMap = updatedSettings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);

        res.json(settingsMap);
    } catch (error) {
        console.error('Failed to update settings:', error);
        res.status(500).json({ error: 'Failed to update settings' });
    }
});

export default router;
