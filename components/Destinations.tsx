import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { destinationService } from '../services/api';
import Image from './common/Image';

const Destinations: React.FC = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState<any[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationService.getAll();
        setDestinations(data);
      } catch (error) {
        console.error('Failed to fetch destinations', error);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-3">Explore Egypt</h2>
          <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6">Legendary Destinations</h1>
          <p className="text-stone-500">From the bustling streets of Cairo to the tranquil banks of the Nile, explore the diverse beauty of Egypt's most iconic cities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <div
              key={dest.id || i}
              className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
              onClick={() => navigate(`/destinations/${dest.slug}`)}
            >
              <Image src={dest.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={dest.name} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{dest.name}</h3>
                <p className="text-stone-300 text-sm line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {dest.description}
                </p>
                <div className="mt-4 w-10 h-0.5 bg-amber-500 transition-all duration-500 group-hover:w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
