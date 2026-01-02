import React from 'react';
import { useSettings } from '../context/SettingsContext';
import SEO from './SEO';

const About: React.FC = () => {
  const { settings } = useSettings();
  const customContent = settings['page_about'];

  return (
    <>
      <SEO title="About Us" description="Learn about our story, mission, and the expert team behind Discover Tours." />
      <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
        <div className="container mx-auto px-4">
          {customContent ? (
            <div className="bg-white p-8 md:p-16 rounded-[40px] shadow-sm border border-stone-100">
              <div className="prose prose-stone max-w-none text-lg" dangerouslySetInnerHTML={{ __html: customContent }} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-100 rounded-full -z-10"></div>
                  <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-3">Our Story</h2>
                  <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8 leading-tight">
                    Crafting Memorable Journeys Since <span className="text-amber-600">2012</span>
                  </h1>
                  <p className="text-stone-600 text-lg leading-relaxed mb-6">
                    Founded by a group of passionate Egyptologists, Discover Tours was born from a simple vision:
                    to show travelers the Egypt that exists beyond the postcards. We believe that true discovery
                    happens when history is told with passion and logistics are handled with precision.
                  </p>
                  <p className="text-stone-600 text-lg leading-relaxed">
                    Over the last decade, we have hosted over 15,000 travelers, helping them navigate the complex beauty
                    of the ancient world. From private pyramid tours to luxury Nile cruises, every itinerary we create
                    is a bridge between the ancient past and your future memories.
                  </p>
                </div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
                  <img src="https://tours-greece.gr//storage/uploads/excursions/9-day-luxury-greek-island-tour-Mykonos-Santorini-2024-02-19-17-33-41-83.jpg" className="w-full h-full object-cover" alt="Agency Team" />
                  <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
                    <div className="text-amber-600 font-bold text-3xl mb-1">98%</div>
                    <p className="text-stone-500 text-sm font-medium">Customer satisfaction rate across all platforms.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[40px] p-12 shadow-sm border border-stone-100">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-serif text-stone-900 mb-4">Our Core Values</h2>
                  <div className="w-16 h-1 bg-amber-50 mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {[
                    { title: 'Authenticity', desc: 'We skip the tourist traps in favor of local gems and true archaeological context.' },
                    { title: 'Excellence', desc: 'From the luxury of our vehicles to the depth of our guides\' knowledge.' },
                    { title: 'Sustainability', desc: 'Supporting local communities and preserving monuments for future generations.' }
                  ].map((value, i) => (
                    <div key={i} className="text-center p-6 hover:bg-stone-50 rounded-3xl transition-colors">
                      <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 text-2xl font-bold mb-6 mx-auto">
                        0{i + 1}
                      </div>
                      <h3 className="text-xl font-bold text-stone-900 mb-4">{value.title}</h3>
                      <p className="text-stone-500 text-sm leading-relaxed">{value.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default About;
