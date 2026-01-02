import React from 'react';
import { useSettings } from '../context/SettingsContext';
import SEO from './SEO';

interface InfoPageProps {
  type: 'faq' | 'privacy' | 'terms';
}

const InfoPage: React.FC<InfoPageProps> = ({ type }) => {
  const { settings } = useSettings();

  const content = {
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about traveling with us.',
      sections: [
        { q: 'Is it safe to travel to Egypt right now?', a: 'Yes, Egypt is a safe destination for millions of tourists every year. Our team monitors security updates 24/7 to ensure your itinerary is safe and enjoyable.' },
        { q: 'Do I need a visa to enter Egypt?', a: 'Most nationalities require a visa. Many can get a visa-on-arrival at Cairo International Airport for $25 USD, or apply for an E-Visa online before departure.' },
        { q: 'What is the best time of year to visit?', a: 'The ideal time is between October and April when the weather is cooler. Summer (May-September) can be very hot, especially in Upper Egypt (Luxor/Aswan).' },
        { q: 'Are tips (Baksheesh) mandatory?', a: 'Tipping is a common social practice in Egypt and is expected for most services. We provide a tipping guide to all our guests to help navigate this customs.' },
        { q: 'What should I wear when visiting temples?', a: 'Light, loose-fitting cotton clothing is best. While there isn\'t a strict dress code for temples, modest clothing that covers shoulders and knees is recommended.' }
      ]
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How we handle and protect your personal data.',
      body: `At Discover Tours, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard the personal information you provide when booking with us.

      We collect only the necessary data required to facilitate your travel arrangements, including name, passport details for permits, and contact information. Your payment details are processed through secure, encrypted gateways and are never stored on our servers.

      We do not sell or share your data with third parties except for essential service providers like hotels, airlines, and local tour operators strictly for your bookings.`
    },
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'The legal agreement for our travel services.',
      body: `By booking a tour with Discover Tours, you agree to the following terms:

      1. Bookings & Payments: A deposit is required to secure your reservation. Final payment is due 30 days prior to departure.
      2. Cancellations: Cancellations made more than 45 days before departure are subject to a small admin fee. Cancellations within 30 days are subject to tiered refund schedules.
      3. Liability: Discover Tours acts as an agent for transport and accommodation. While we strive for excellence, we are not liable for delays or accidents caused by third-party providers.
      4. Insurance: We strongly recommend all travelers purchase comprehensive travel insurance including medical and cancellation coverage.`
    }
  };

  const page = content[type];
  const settingKey = `page_${type}`;
  const customContent = settings[settingKey];

  return (
    <>
      <SEO title={page.title} description={page.subtitle} />
      <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-3">Support & Information</h2>
            <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6">{page.title}</h1>
            <p className="text-stone-500 text-lg">{page.subtitle}</p>
          </div>

          <div className="bg-white p-8 md:p-16 rounded-[40px] shadow-sm border border-stone-100">
            {customContent ? (
              <div className="prose prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: customContent }} />
            ) : (
              <>
                {type === 'faq' ? (
                  <div className="space-y-10">
                    {content.faq.sections.map((item, i) => (
                      <div key={i} className="group">
                        <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-start gap-3">
                          <span className="text-amber-500">Q.</span>
                          {item.q}
                        </h3>
                        <p className="text-stone-600 leading-relaxed pl-8">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="prose prose-stone max-w-none">
                    <div className="whitespace-pre-line text-stone-600 leading-loose text-lg">
                      {(page as any).body}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPage;
