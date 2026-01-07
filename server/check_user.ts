import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
    console.log('Checking database for admin user...');

    try {
        const user = await prisma.user.findUnique({
            where: { username: 'admin' }
        });

        if (user) {
            console.log('User found:');
            console.log('ID:', user.id);
            console.log('Username:', user.username);
            console.log('Role:', user.role);
            console.log('Password (first 3 chars):', user.password.substring(0, 3));
            console.log('Password length:', user.password.length);

            if (user.password === 'admin123') {
                console.log('SUCCESS: Password matches "admin123" exactly.');
            } else {
                console.log('FAILURE: Password DOES NOT match "admin123".');
                console.log('Actual password is:', user.password);
            }
        } else {
            console.log('FAILURE: User "admin" NOT found.');
        }

        const count = await prisma.user.count();
        console.log(`Total users in database: ${count}`);

    } catch (error) {
        console.error('Error querying database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
