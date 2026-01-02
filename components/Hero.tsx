import React from 'react';
import { useSettings } from '../context/SettingsContext';

const Hero: React.FC = () => {
  const { settings } = useSettings();

  const handleExplore = () => {
    const element = document.getElementById('packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden bg-stone-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${settings.heroImage || 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2000&auto=format&fit=crop'}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight drop-shadow-lg">
          {settings.heroTitle ? <span dangerouslySetInnerHTML={{ __html: settings.heroTitle }} /> : <>Unveil the Secrets <br /> of <span className="text-amber-400">Ancient Egypt</span></>}
        </h1>
        <p className="text-lg md:text-xl text-stone-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          {settings.heroSubtitle || 'Experience world-class luxury tours, mesmerizing Nile cruises, and adventurous desert safaris with Discover Tours.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleExplore}
            className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            Explore Tours
          </button>
          <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-bold text-lg transition-all">
            Watch Video
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          {[
            { label: 'Happy Travelers', val: '15k+' },
            { label: 'Tour Packages', val: '50+' },
            { label: 'Years Experience', val: '12+' },
            { label: 'Top Destinations', val: '24+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-amber-400">{stat.val}</div>
              <div className="text-sm text-stone-300 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] fill-stone-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.7,118.82,109.11,177.34,103.52,235.86,97.93,293.07,76.53,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
