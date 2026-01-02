
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

const EXTRA_CRUISES = [
    {
        id: '20',
        title: '3-Night Aswan to Luxor Cruise',
        description: 'A shorter but equally mesmerizing journey. Perfect for those with limited time who still want to see the key highlights like Philae Temple and Kom Ombo.',
        price: 450,
        duration: '4 Days',
        image: 'https://images.unsplash.com/photo-1599108600124-b6389f913d8c?q=80&w=800&auto=format&fit=crop',
        category: 'Nile Cruises',
        rating: 4.7,
        reviews: 215,
        tags: JSON.stringify(['Classic', 'Nile', 'Aswan'])
    },
    {
        id: '21',
        title: 'Luxury Dahabiya Sailing Experience',
        description: 'Sail the Nile on a traditional Dahabiya yacht. This intimate experience avoids the crowds and accesses smaller islands and villages larger ships cannot reach.',
        price: 950,
        duration: '6 Days',
        image: 'https://images.unsplash.com/photo-1560130958-809099863219?q=80&w=800&auto=format&fit=crop',
        category: 'Luxury Nile Cruises',
        rating: 4.9,
        reviews: 89,
        tags: JSON.stringify(['Luxury', 'Private', 'Yacht'])
    },
    {
        id: '22',
        title: 'Long Cruise: Cairo to Aswan',
        description: 'The ultimate 12-day expedition following the full path of the Nile from Cairo to the heart of Nubia. A once-in-a-lifetime historical odyssey.',
        price: 1800,
        duration: '12 Days',
        image: 'https://images.unsplash.com/photo-1626014902263-12a149f1f00a?q=80&w=800&auto=format&fit=crop',
        category: 'Royal Nile Cruises',
        rating: 5.0,
        reviews: 42,
        tags: JSON.stringify(['Expedition', 'Full River', 'Exclusive'])
    }
];

async function main() {
    console.log('Seeding extra cruises...');

    for (const tour of EXTRA_CRUISES) {
        const existingTour = await prisma.tour.findUnique({
            where: { id: tour.id }
        });

        if (!existingTour) {
            await prisma.tour.create({
                data: tour
            });
            console.log(`Created cruise: ${tour.title}`);
        } else {
            console.log(`Cruise ${tour.id} already exists`);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
