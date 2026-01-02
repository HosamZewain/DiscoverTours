
export interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  category: TourCategory;
  rating: number;
  reviews: number;
  tags: string[];
}

export enum TourCategory {
  DAY_TOURS = 'Day Tours',
  NILE_CRUISES = 'Nile Cruises',
  SHORE_EXCURSIONS = 'Shore Excursions',
  MULTI_DAY = 'Multi-Day Packages',
  DESERT_SAFARI = 'Desert Safari'
}

export type ViewState = 'home' | 'destinations' | 'about' | 'tour-details' | 'contact' | 'faq' | 'privacy' | 'terms' | 'cruises' | 'blog' | 'shore-excursions' | 'checkout' | 'payment-success';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface BookingDetails {
  tour: Tour;
  date: string;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
}
