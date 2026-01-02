import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // In real app, compare hashed password
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // In real app, return JWT
        res.json({
            user: { id: user.id, username: user.username, role: user.role },
            token: 'mock-jwt-token'
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

export default router;
