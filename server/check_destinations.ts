
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const count = await prisma.destination.count();
    console.log(`Destination count: ${count}`);
    const destinations = await prisma.destination.findMany({ select: { name: true, slug: true } });
    console.log('Destinations:', destinations);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
