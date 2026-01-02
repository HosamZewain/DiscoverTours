import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { destinationService } from '../services/api';
import SEO from './SEO';
import Image from './common/Image';

interface Destination {
    id: string;
    slug: string;
    name: string;
    description: string;
    image: string;
    headerImage?: string;
    content?: string;
    tours?: any[];
}

const DestinationDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [destination, setDestination] = useState<Destination | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestination = async () => {
            if (!id) return;
            try {
                const data = await destinationService.getByIdOrSlug(id);
                setDestination(data);
            } catch (error) {
                console.error('Failed to fetch destination', error);
                navigate('/destinations');
            } finally {
                setLoading(false);
            }
        };

        fetchDestination();
        window.scrollTo(0, 0);
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!destination) return null;

    return (
        <>
            <SEO
                title={`${destination.name} - Discover Tours`}
                description={destination.description}
                image={destination.image}
            />

            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-stone-900"
                    style={{
                        backgroundImage: `url("${destination.headerImage || destination.image}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-xl">{destination.name}</h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">{destination.description}</p>
                    </div>
                </div>
            </div>

            <div className="bg-stone-50 min-h-screen py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Main Content */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 prose prose-stone prose-lg max-w-none">
                                {destination.content ? (
                                    <div dangerouslySetInnerHTML={{ __html: destination.content }} />
                                ) : (
                                    <p>No additional content available for this destination.</p>
                                )}
                            </div>
                        </div>

                        {/* Sidebar / Tours */}
                        <div className="lg:w-1/3 space-y-8">
                            <div className="bg-amber-600 rounded-3xl p-8 text-white shadow-xl">
                                <h3 className="text-2xl font-serif font-bold mb-4">Plan Your Visit</h3>
                                <p className="mb-6 text-amber-50">Ready to explore {destination.name}? Our experts can craft the perfect itinerary for you.</p>
                                <button onClick={() => navigate('/contact')} className="w-full bg-white text-amber-900 py-3 rounded-xl font-bold hover:bg-amber-50 transition-colors">
                                    Contact Us Now
                                </button>
                            </div>

                            {/* Linked Tours (Future Feature) */}
                            {destination.tours && destination.tours.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-6">Tours calling at {destination.name}</h3>
                                    <div className="space-y-4">
                                        {destination.tours.map((tour: any) => (
                                            <div
                                                key={tour.id}
                                                onClick={() => navigate(`/tours/${tour.id}`)}
                                                className="group bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 border border-stone-100"
                                            >
                                                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                                    <Image src={tour.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={tour.title} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-stone-900 group-hover:text-amber-600 transition-colors line-clamp-2">{tour.title}</h4>
                                                    <p className="text-xs text-stone-500 mt-1">{tour.duration} • From ${tour.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DestinationDetails;
