import React from 'react';
import { useNavigate } from 'react-router-dom';
import { destinationService } from '../services/api';
import Hero from './Hero';
import TourGrid from './TourGrid';
import { useSettings } from '../context/SettingsContext';
import SEO from './SEO';
import Image from './common/Image';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { settings } = useSettings();

    return (
        <>
            <SEO
                title="Home"
                description="Discover the wonders of Ancient Egypt with our premium guided tours. From the Pyramids of Giza to luxury Nile cruises, we craft unforgettable experiences."
            />
            <Hero />

            {/* Trust Badges Bar */}
            <div className="bg-stone-50 border-y border-stone-200 py-10 overflow-hidden">
                <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Tripadvisor_Logo.svg/1024px-Tripadvisor_Logo.svg.png" className="h-8 md:h-10 w-auto object-contain" alt="TripAdvisor" fallback="https://placehold.co/150x50?text=TripAdvisor" />
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Viator_logo.svg/2560px-Viator_logo.svg.png" className="h-6 md:h-8 w-auto object-contain" alt="Viator" fallback="https://placehold.co/150x50?text=Viator" />
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Trustpilot_Logo_%282022%29.svg/2560px-Trustpilot_Logo_%282022%29.svg.png" className="h-6 md:h-8 w-auto object-contain" alt="Trustpilot" fallback="https://placehold.co/150x50?text=Trustpilot" />
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/GetYourGuide_logo.svg/1280px-GetYourGuide_logo.svg.png" className="h-8 md:h-10 w-auto object-contain" alt="GetYourGuide" fallback="https://placehold.co/150x50?text=GetYourGuide" />
                </div>
            </div>

            {/* Value Propositions */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-3">Why Discover Tours</h2>
                        <h3 className="text-4xl font-serif text-stone-900">Excellence in Every Detail</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: 'Certified Experts', icon: '🏛️', desc: 'Our guides are professional Egyptologists with years of archaeological experience.' },
                            { title: 'Best Price Guarantee', icon: '💰', desc: 'Premium experiences at competitive prices, high value without compromise.' },
                            { title: '24/7 Premium Support', icon: '⭐', desc: 'Always available to help, from planning until you return home safely.' }
                        ].map((item, i) => (
                            <div key={i} className="text-center group p-8 rounded-3xl hover:bg-stone-50 transition-colors">
                                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-600 transition-colors duration-500">
                                    <span className="text-3xl group-hover:scale-110 transition-transform">{item.icon}</span>
                                </div>
                                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Destination Preview */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-3">Popular Regions</h2>
                            <h3 className="text-4xl font-serif text-stone-900">Explore Legendary Cities</h3>
                        </div>
                        <button onClick={() => navigate('/destinations')} className="text-amber-600 font-bold hover:underline flex items-center gap-2 group">
                            View All Destinations <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {(settings.popularDestinations ? JSON.parse(settings.popularDestinations) : [
                            { name: 'Cairo', count: '12 Tours', img: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=600&auto=format&fit=crop' },
                            { name: 'Luxor', count: '8 Tours', img: 'https://images.unsplash.com/photo-1599108600124-b6389f913d8c?q=80&w=600&auto=format&fit=crop' },
                            { name: 'Red Sea', count: '15 Tours', img: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=600&auto=format&fit=crop' },
                            { name: 'Aswan', count: '6 Tours', img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop' },
                        ]).map((dest: any, i: number) => (
                            <div key={i} onClick={() => navigate('/destinations')} className="relative h-[400px] rounded-[32px] overflow-hidden group cursor-pointer shadow-lg">
                                <Image src={dest.img} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={dest.name} />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-0 left-0 p-8">
                                    <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">{dest.count}</p>
                                    <h4 className="text-2xl font-bold text-white mb-2">{dest.name}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Tours Grid */}
            <TourGrid />

            {/* Travel Guide Preview */}
            <section className="py-24 bg-stone-900 text-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4">Travel Guide</h2>
                            <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Mastering Your <br /> Egyptian Odyssey</h3>
                            <div className="space-y-8">
                                {[
                                    { title: 'Best Time to Visit', desc: 'Discover when to catch the best weather and avoid the crowds.' },
                                    { title: 'Cultural Etiquette', desc: 'Insights into local customs to ensure a respectful journey.' },
                                    { title: 'Packing Essentials', desc: 'The ultimate checklist for desert heat and cool Nile nights.' }
                                ].map((blog, i) => (
                                    <div key={i} className="flex gap-6 group cursor-pointer">
                                        <div className="text-amber-600 font-serif text-3xl">0{i + 1}</div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition-colors">{blog.title}</h4>
                                            <p className="text-stone-400 text-sm">{blog.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-12 bg-white text-stone-900 px-8 py-3 rounded-full font-bold hover:bg-amber-500 hover:text-white transition-all">Read Full Guide</button>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                            <Image src="https://images.squarespace-cdn.com/content/v1/5f7f580e2a273179f84ceaee/1741766129715-A6Z969CQU0T46D6V34HX/TempleOfKarnak_Luxor-crop.jpg" className="rounded-2xl h-64 w-full object-cover" alt="Egypt Travel Guide 1" />
                            <Image src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=500&auto=format&fit=crop" className="rounded-2xl h-64 w-full object-cover mt-12" alt="Egypt Travel Guide 2" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Nile Cruise Spotlight */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="bg-stone-50 rounded-[48px] overflow-hidden flex flex-col lg:flex-row border border-stone-100">
                        <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
                            <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4">Floating Luxury</h2>
                            <h3 className="text-4xl md:text-5xl font-serif mb-6 text-stone-900 leading-tight">The Ultimate Nile <br /> Cruise Experience</h3>
                            <p className="text-stone-500 text-lg mb-10 leading-relaxed">Wander through time as you sail the worlds most iconic river on a 5-star floating hotel.</p>
                            <button onClick={() => navigate('/cruises')} className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all w-fit shadow-xl">Browse Nile Cruises</button>
                        </div>
                        <div className="lg:w-1/2 h-[400px] lg:h-auto">
                            <Image src="https://ramsestours.com/wp-content/uploads/2023/09/image-125.png" className="w-full h-full object-cover" alt="Luxury Nile Cruise Deck" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-3">Testimonials</h2>
                    <h3 className="text-4xl font-serif text-stone-900 mb-12">What Our Guests Say</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(settings.testimonials ? JSON.parse(settings.testimonials) : [
                            { name: 'Sarah J.', country: 'United Kingdom', quote: 'The Nile cruise was the highlight of our lives. Everything was handled perfectly.' },
                            { name: 'Mark T.', country: 'United States', quote: 'Our guide was so knowledgeable about the Luxor temples. Unforgettable experience.' },
                            { name: 'Elena R.', country: 'Spain', quote: 'Alexandria was beautiful and our driver was very professional. Highly recommend.' }
                        ]).map((testimonial: any, i: number) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-left">
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${star <= (testimonial.rating || 5) ? 'text-amber-500 fill-amber-500' : 'text-stone-200 fill-stone-200'}`} viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-stone-600 italic mb-6">"{testimonial.quote}"</p>
                                <h5 className="font-bold text-stone-900">{testimonial.name}</h5>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
