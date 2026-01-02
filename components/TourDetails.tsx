import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tour } from '../types';
import { tourService } from '../services/api';
import SEO from './SEO';

const TourDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      if (!id) return;
      try {
        const data = await tourService.getById(id);
        setTour(data);
      } catch (error) {
        console.error("Failed to load tour", error);
        navigate('/'); // Redirect to home on error
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-24"><div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!tour) return null;

  const inclusions = [
    'Hotel pickup and drop-off',
    'Professional Egyptologist guide',
    'Bottled water and soft drinks',
    'Entry fees to mentioned sites',
    'Private air-conditioned transport'
  ];

  return (
    <>
      <SEO
        title={tour.title}
        description={tour.description}
        image={tour.image}
      />
      <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-stone-500 hover:text-amber-600 transition-colors mb-8 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-8">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="bg-amber-600 text-white font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest shadow-lg">
                      {tour.category}
                    </span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">{tour.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-stone-500 mb-8 border-b border-stone-200 pb-8">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <svg key={s} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-bold text-stone-900">{tour.rating}</span>
                    <span className="text-sm">({tour.reviews} Reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">{tour.duration}</span>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-stone-900 mb-4">Overview</h2>
                <p className="text-stone-600 leading-relaxed text-lg mb-8">
                  {tour.description} This curated experience is designed to immerse you in the authentic atmosphere of ancient Egypt.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
                    <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      What's Included
                    </h3>
                    <ul className="space-y-3">
                      {inclusions.map((item, i) => (
                        <li key={i} className="text-stone-500 text-sm flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-stone-900 text-white p-8 rounded-3xl shadow-xl">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Important Information
                    </h3>
                    <p className="text-stone-400 text-xs leading-relaxed">
                      Please wear comfortable walking shoes and bring sun protection. Tours operate in all weather conditions except sandstorms.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-6">
                <div>
                  <span className="text-stone-400 text-xs uppercase font-bold tracking-widest">Pricing From</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-bold text-stone-900">${tour.price}</span>
                    <span className="text-stone-500 text-sm">/ person</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => navigate('/checkout', { state: { tour } })}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    Book This Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetails;
