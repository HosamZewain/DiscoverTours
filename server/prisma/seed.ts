import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

const TOURS = [
    {
        id: '1',
        title: 'Giza Pyramids & Sphinx Half-Day Tour',
        description: 'Explore the only remaining Wonder of the Ancient World. Professional Egyptologist guide included.',
        price: 45,
        duration: '4-5 Hours',
        image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=800&auto=format&fit=crop',
        category: 'Day Tours',
        rating: 4.9,
        reviews: 1250,
        tags: JSON.stringify(['History', 'Must See', 'Cairo'])
    },
    {
        id: '2',
        title: '5-Day Nile Cruise: Luxor to Aswan',
        description: 'Experience the magic of the Nile on a 5-star cruise ship. Visits to Valley of the Kings and Karnak Temple.',
        price: 650,
        duration: '5 Days',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop',
        category: 'Nile Cruises',
        rating: 4.8,
        reviews: 430,
        tags: JSON.stringify(['Luxury', 'Nile', 'Luxor', 'Aswan'])
    },
    {
        id: '3',
        title: 'Cairo Egyptian Museum & Khan el-Khalili',
        description: 'Dive into the rich history of Tutankhamun and shop in the world-famous bazaar.',
        price: 35,
        duration: '6 Hours',
        image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=800&auto=format&fit=crop',
        category: 'Day Tours',
        rating: 4.7,
        reviews: 890,
        tags: JSON.stringify(['Culture', 'Shopping', 'Museum'])
    },
    {
        id: '4',
        title: 'Alexandria Shore Excursion',
        description: 'Perfect for cruise passengers. Visit the Citadel of Qaitbay and the Library of Alexandria.',
        price: 95,
        duration: '8 Hours',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop',
        category: 'Shore Excursions',
        rating: 4.9,
        reviews: 156,
        tags: JSON.stringify(['Alexandria', 'Seaside', 'History'])
    },
    {
        id: '5',
        title: 'White Desert Overnight Safari',
        description: 'Sleep under the stars in the surreal landscapes of the Bahariya Oasis.',
        price: 220,
        duration: '2 Days',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop',
        category: 'Desert Safari',
        rating: 5.0,
        reviews: 88,
        tags: JSON.stringify(['Adventure', 'Camping', 'Nature'])
    },
    {
        id: '6',
        title: 'Abu Simbel Private Flight Tour',
        description: 'Fly from Aswan to witness the magnificent sun temples of Ramses II.',
        price: 310,
        duration: '4 Hours',
        image: 'https://images.unsplash.com/photo-1568322422622-f321c77acfaf?q=80&w=800&auto=format&fit=crop',
        category: 'Multi-Day Packages',
        rating: 4.9,
        reviews: 212,
        tags: JSON.stringify(['Private', 'Aswan', 'Ancient'])
    }
];

async function main() {
    console.log('Start seeding ...');

    // Seed Tours
    for (const tour of TOURS) {
        const existingTour = await prisma.tour.findUnique({
            where: { id: tour.id }
        });

        if (!existingTour) {
            const t = await prisma.tour.create({
                data: tour
            });
            console.log(`Created tour with id: ${t.id}`);
        } else {
            console.log(`Tour ${tour.id} already exists`);
        }
    }

    // Seed Admin User
    const adminExists = await prisma.user.findUnique({
        where: { username: 'admin' }
    });

    if (!adminExists) {
        // In a real app, hash this password!
        await prisma.user.create({
            data: {
                username: 'admin',
                password: 'admin123', // Simple password for demo
                role: 'ADMIN'
            }
        });
        console.log('Created admin user');
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
