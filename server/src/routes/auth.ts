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

router.put('/update', async (req, res) => {
    try {
        const { id, username, currentPassword, newPassword } = req.body;

        const user = await prisma.user.findFirst({
            where: { id }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.password !== currentPassword) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        const data: any = { username };
        if (newPassword) {
            data.password = newPassword;
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data
        });

        res.json({ success: true, user: { id: updatedUser.id, username: updatedUser.username, role: updatedUser.role } });
    } catch (error) {
        res.status(500).json({ error: 'Update failed' });
    }
});

export default router;
