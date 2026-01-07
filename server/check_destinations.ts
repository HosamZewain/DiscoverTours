import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log('Checking destinations in database...');
    const count = await prisma.destination.count();
    console.log(`Total destinations: ${count}`);

    if (count === 0) {
        console.log('No destinations found. You might need to seed them.');
    } else {
        const dests = await prisma.destination.findMany({ take: 3 });
        console.log('Sample destinations:', dests.map(d => d.name));
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
