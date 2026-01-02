import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants';
import { Tour, TourCategory } from '../types';
import TourCard from './TourCard';
import { tourService } from '../services/api';

const TourGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<TourCategory | 'All'>('All');
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    tourService.getAll().then(setTours).catch(console.error);
  }, []);

  const filteredTours = activeCategory === 'All'
    ? tours
    : tours.filter(t => t.category === activeCategory);

  return (
    <section id="packages" className="py-24 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-3">Our Experiences</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Choose Your Adventure</h3>
            <p className="text-stone-500">From the golden pyramids of Giza to the serene waters of the Nile, we curate the best Egyptian experiences.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'All'
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-400'
                }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-400'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-500 text-lg">No tours found in this category. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TourGrid;
