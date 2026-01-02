
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

const DESTINATIONS = [
    {
        slug: 'cairo',
        name: 'Cairo',
        description: 'The City of a Thousand Minarets, Cairo is a chaotic, charming, and historic metropolis. Home to the Giza Pyramids, the Sphinx, and the Egyptian Museum, it is the starting point of most Egyptian adventures.',
        image: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=800&auto=format&fit=crop',
        headerImage: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1920&auto=format&fit=crop',
        content: `
            <h2>The Heart of Egypt</h2>
            <p>Cairo is more than just a gateway to the Pyramids; it's a vibrant city pulsating with life. From the narrow medieval streets of Islamic Cairo to the broad boulevards of Downtown, every corner tells a story.</p>
            <h3>Highlights</h3>
            <ul>
                <li><strong>Giza Plateau:</strong> The Great Pyramids and the Sphinx.</li>
                <li><strong>Egyptian Museum:</strong> Home to Tutankhamun's treasures.</li>
                <li><strong>Khan el-Khalili:</strong> A historic bazaar perfect for souvenir shopping.</li>
                <li><strong>Citadel of Saladin:</strong> Offering panoramic views of the city.</li>
            </ul>
        `
    },
    {
        slug: 'luxor',
        name: 'Luxor',
        description: 'Often called the world\'s greatest open-air museum, Luxor is built on the site of ancient Thebes. It is divided by the Nile into the East Bank (Temple of Karnak) and the West Bank (Valley of the Kings).',
        image: 'https://images.unsplash.com/photo-1599108600124-b6389f913d8c?q=80&w=800&auto=format&fit=crop',
        headerImage: 'https://images.unsplash.com/photo-1560130958-809099863219?q=80&w=1920&auto=format&fit=crop',
        content: `
            <h2>The Ancient Capital</h2>
            <p>Luxor offers an unparalleled window into ancient Egyptian civilization. The scale of the monuments here is staggering.</p>
            <h3>Highlights</h3>
            <ul>
                <li><strong>Valley of the Kings:</strong> Royal tombs, including Tutankhamun.</li>
                <li><strong>Karnak Temple:</strong> A vast temple complex dedicated to Amun-Ra.</li>
                <li><strong>Luxor Temple:</strong> Beautifully illuminated at night.</li>
                <li><strong>Hatshepsut Temple:</strong> A stunning architectural marvel.</li>
            </ul>
        `
    },
    {
        slug: 'aswan',
        name: 'Aswan',
        description: 'Egypt\'s sunniest southern city and ancient frontier town. Aswan is distinctively African, with a laid-back atmosphere and significant Nubian influence.',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop',
        headerImage: 'https://images.unsplash.com/photo-1568322422622-f321c77acfaf?q=80&w=1920&auto=format&fit=crop',
        content: `
            <h2>Nubian Splendor</h2>
            <p>Aswan is the place to relax and watch the feluccas sail by. It's also the gateway to Abu Simbel.</p>
            <h3>Highlights</h3>
            <ul>
                <li><strong>Philae Temple:</strong> Dedicated to the goddess Isis.</li>
                <li><strong>Abu Simbel:</strong> Ramses II's masterpiece (flight/drive away).</li>
                <li><strong>Nubian Village:</strong> Colorful houses and rich culture.</li>
                <li><strong>Old Cataract Hotel:</strong> Where Agatha Christie wrote Death on the Nile.</li>
            </ul>
        `
    },
    {
        slug: 'hurghada',
        name: 'Hurghada',
        description: 'A beach resort town stretching some 40km along Egypt’s Red Sea coast. Famous for scuba diving, snorkeling, and vibrant coral reefs.',
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop',
        headerImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop',
        content: `
            <h2>Red Sea Paradise</h2>
            <p>Perfect for relaxation after a cultural tour. The Red Sea offers some of the best diving in the world.</p>
            <h3>Highlights</h3>
            <ul>
                <li><strong>Giftun Island:</strong> Crystal clear waters and sandy beaches.</li>
                <li><strong>Scuba Diving:</strong> World-class reefs and wrecks.</li>
                <li><strong>Desert Safari:</strong> Quad biking in the Eastern Desert.</li>
            </ul>
        `
    },
    {
        slug: 'alexandria',
        name: 'Alexandria',
        description: 'The Pearl of the Mediterranean. Founded by Alexander the Great, it was once the intellectual capital of the world.',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop',
        headerImage: 'https://images.unsplash.com/photo-1558235222-29b1d3d63d6f?q=80&w=1920&auto=format&fit=crop',
        content: `
            <h2>Mediterranean Elegance</h2>
            <p>A cooler, more cosmopolitan vibe than Cairo, with a rich Greco-Roman history.</p>
            <h3>Highlights</h3>
            <ul>
                <li><strong>Bibliotheca Alexandrina:</strong> The modern reincarnation of the ancient library.</li>
                <li><strong>Citadel of Qaitbay:</strong> Built on the site of the Pharos Lighthouse.</li>
                <li><strong>Catacombs of Kom El Shoqafa:</strong> A blend of Egyptian and Roman art.</li>
            </ul>
        `
    }
];

async function main() {
    console.log('Seeding destinations...');

    for (const dest of DESTINATIONS) {
        const existing = await prisma.destination.findUnique({
            where: { slug: dest.slug }
        });

        if (!existing) {
            await prisma.destination.create({
                data: dest
            });
            console.log(`Created destination: ${dest.name}`);
        } else {
            console.log(`Destination ${dest.name} already exists`);
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
