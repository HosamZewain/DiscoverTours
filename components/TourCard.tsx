import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tour } from '../types';
import Image from './common/Image';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const navigate = useNavigate();

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/tours/${tour.id}`);
  };

  return (
    <Link
      to={`/tours/${tour.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-stone-100 cursor-pointer block"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {tour.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm border border-white/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span className="text-xs font-bold text-stone-800">{tour.rating}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors line-clamp-1">
            {tour.title}
          </h3>
        </div>

        <p className="text-stone-500 text-sm mb-4 line-clamp-2">
          {tour.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {tour.tags.map((tag) => (
            <span
              key={tag}
              className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-100/50 uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-stone-400 text-xs mb-6 mt-auto">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{tour.reviews} reviews</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stone-100 gap-2">
          <div className="shrink-0">
            <span className="text-stone-400 text-xs block">From</span>
            <span className="text-2xl font-bold text-amber-600">${tour.price}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleBookNow}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors whitespace-nowrap shadow-sm hover:shadow-md transform active:scale-95"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
