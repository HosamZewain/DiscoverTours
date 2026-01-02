import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tour } from '../types';
import { tourService } from '../services/api';
import Image from './common/Image';

interface CruisesProps {
  onSelectTour: (tour: Tour) => void;
}

const Cruises: React.FC<CruisesProps> = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDestinations = async () => {
      try {
        const allTours = await tourService.getAll();
        setTours(allTours.filter(t => t.category.includes('Cruise')));
      } catch (error) {
        console.error("Failed to load cruises", error);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-3">Nile Cruises</h2>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">Sailing Through History</h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Experience the magic of the Nile on our fleet of luxury cruisers.
            From 3-night escapes to week-long voyages, discover Egypt from its life-giving river.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map(tour => (
            <div key={tour.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100 flex flex-col h-full">
              <div className="relative h-64 overflow-hidden">
                <Image src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-900 shadow-lg">
                  {tour.duration}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <svg key={s} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-stone-400 font-medium">({tour.reviews} reviews)</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-amber-600 transition-colors">{tour.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-2">{tour.description}</p>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-stone-100">
                  <div>
                    <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">Starting at</span>
                    <div className="text-2xl font-bold text-stone-900">${tour.price}</div>
                  </div>
                  <button
                    onClick={() => navigate(`/tours/${tour.id}`)}
                    className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors shadow-lg active:scale-95"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cruises;
