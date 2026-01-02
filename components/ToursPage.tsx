
import React from 'react';
import TourGrid from './TourGrid';
import SEO from './SEO';

const ToursPage: React.FC = () => {
    return (
        <>
            <SEO
                title="All Tours - Discover Tours"
                description="Browse our complete collection of premium Egypt tours. From Cairo to Aswan, find your perfect adventure."
            />
            <div className="pt-24 min-h-screen bg-stone-50">
                <div className="container mx-auto px-4 mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">All Tours</h1>
                    <p className="text-stone-500 max-w-2xl mx-auto">Explore our diverse range of curated experiences designed to show you the best of Egypt.</p>
                </div>
                <TourGrid />
            </div>
        </>
    );
};

export default ToursPage;
