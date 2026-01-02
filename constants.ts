
import { Tour, TourCategory } from './types';

export const TOURS: Tour[] = [
  {
    id: '1',
    title: 'Giza Pyramids & Sphinx Half-Day Tour',
    description: 'Explore the only remaining Wonder of the Ancient World. Professional Egyptologist guide included.',
    price: 45,
    duration: '4-5 Hours',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=800&auto=format&fit=crop',
    category: TourCategory.DAY_TOURS,
    rating: 4.9,
    reviews: 1250,
    tags: ['History', 'Must See', 'Cairo']
  },
  {
    id: '2',
    title: '5-Day Nile Cruise: Luxor to Aswan',
    description: 'Experience the magic of the Nile on a 5-star cruise ship. Visits to Valley of the Kings and Karnak Temple.',
    price: 650,
    duration: '5 Days',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop',
    category: TourCategory.NILE_CRUISES,
    rating: 4.8,
    reviews: 430,
    tags: ['Luxury', 'Nile', 'Luxor', 'Aswan']
  },
  {
    id: '3',
    title: 'Cairo Egyptian Museum & Khan el-Khalili',
    description: 'Dive into the rich history of Tutankhamun and shop in the world-famous bazaar.',
    price: 35,
    duration: '6 Hours',
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=800&auto=format&fit=crop',
    category: TourCategory.DAY_TOURS,
    rating: 4.7,
    reviews: 890,
    tags: ['Culture', 'Shopping', 'Museum']
  },
  {
    id: '4',
    title: 'Alexandria Shore Excursion',
    description: 'Perfect for cruise passengers. Visit the Citadel of Qaitbay and the Library of Alexandria.',
    price: 95,
    duration: '8 Hours',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop',
    category: TourCategory.SHORE_EXCURSIONS,
    rating: 4.9,
    reviews: 156,
    tags: ['Alexandria', 'Seaside', 'History']
  },
  {
    id: '5',
    title: 'White Desert Overnight Safari',
    description: 'Sleep under the stars in the surreal landscapes of the Bahariya Oasis.',
    price: 220,
    duration: '2 Days',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop',
    category: TourCategory.DESERT_SAFARI,
    rating: 5.0,
    reviews: 88,
    tags: ['Adventure', 'Camping', 'Nature']
  },
  {
    id: '6',
    title: 'Abu Simbel Private Flight Tour',
    description: 'Fly from Aswan to witness the magnificent sun temples of Ramses II.',
    price: 310,
    duration: '4 Hours',
    image: 'https://images.unsplash.com/photo-1568322422622-f321c77acfaf?q=80&w=800&auto=format&fit=crop',
    category: TourCategory.MULTI_DAY,
    rating: 4.9,
    reviews: 212,
    tags: ['Private', 'Aswan', 'Ancient']
  }
];

export const CATEGORIES = Object.values(TourCategory);
