import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { settings } = useSettings();
  const navigate = useNavigate();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="bg-stone-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="bg-amber-600 rounded-[40px] p-10 md:p-16 mb-24 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 lg:w-1/2">
            <h3 className="text-3xl md:text-4xl font-serif mb-4">Stay Inspired</h3>
            <p className="text-amber-100 text-lg">Subscribe to our newsletter for exclusive tour offers and Egyptian travel tips.</p>
          </div>
          <div className="relative z-10 lg:w-1/2 w-full">
            {subscribed ? (
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-center border border-white/20">
                <p className="font-bold text-white">Shukran! (Thank you). Check your inbox soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow bg-white/20 border border-white/30 rounded-2xl px-6 py-4 placeholder:text-amber-100/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button type="submit" className="bg-white text-amber-600 px-8 py-4 rounded-2xl font-bold hover:bg-stone-900 hover:text-white transition-all shadow-xl">Join Now</button>
              </form>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">D</div>
              <span className="text-2xl font-bold tracking-tight">Discover <span className="text-amber-500">Tours</span></span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">Excellence in Egyptian hospitality. From historical wonders to modern luxury, we reveal the heart of the ancient world.</p>
            <div className="flex gap-4">
              {['Facebook', 'Instagram', 'TripAdvisor', 'WhatsApp'].map(social => (
                <button key={social} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-600 transition-colors text-xs text-stone-300 font-bold">{social[0]}</button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link to="/cruises" className="hover:text-amber-500 transition-colors">Nile Cruises</Link></li>
              <li><Link to="/blog" className="hover:text-amber-500 transition-colors">Travel Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><Link to="/faq" className="hover:text-amber-500 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Booking Guide</Link></li>
              <li><Link to="/terms" className="hover:text-amber-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li className="flex gap-3 text-xs">
                <span className="text-amber-500">📍</span>
                <span>{settings.address || '123 Sphinx Ave, Cairo, Egypt'}</span>
              </li>
              <li className="flex gap-3 text-xs">
                <span className="text-amber-500">📞</span>
                <span>{settings.phone || '+20 123 456 7890'}</span>
              </li>
              <li className="flex gap-3 text-xs">
                <span className="text-amber-500">✉️</span>
                <span>{settings.email || 'info@discovertours.com'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 text-center text-stone-600 text-[10px] uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Discover Tours. Licensed Egyptian Tour Operator.
            <Link to="/admin" className="ml-4 hover:text-amber-500 transition-colors">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
