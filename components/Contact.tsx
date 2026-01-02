import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import SEO from './SEO';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { settings } = useSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEO title="Contact Us" description="Get in touch with our expert team to plan your Egyptian adventure." />
      <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-3">Get in Touch</h2>
            <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6">Contact Our Experts</h1>
            <p className="text-stone-500 text-lg">Have questions about your upcoming trip or want a custom itinerary? Our Egyptologists are here to help you 24/7.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-stone-100">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-4">Message Sent!</h3>
                  <p className="text-stone-500 mb-8">Thank you for reaching out. One of our travel specialists will contact you shortly.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-amber-600 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Full Name</label>
                      <input required type="text" className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Email Address</label>
                      <input required type="email" className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Subject</label>
                    <select className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all">
                      <option>General Inquiry</option>
                      <option>Custom Tour Request</option>
                      <option>Booking Problem</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Your Message</label>
                    <textarea required rows={5} className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all" placeholder="How can we help you plan your dream Egypt trip?"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-amber-600/20 transition-all active:scale-95">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Details & Info */}
            <div className="flex flex-col justify-center space-y-12 lg:pl-12">
              <div>
                <h3 className="text-2xl font-serif text-stone-900 mb-8">Our Headquarters</h3>
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 mb-1">Visit Us</h4>
                      <p className="text-stone-500 leading-relaxed">{settings.address || '123 Sphinx Avenue, Giza District\nCairo, Egypt 11511'}</p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 mb-1">Call Us</h4>
                      <p className="text-stone-500 leading-relaxed">{settings.phone || '+20 123 456 7890'}<br />WhatsApp available 24/7</p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-14 h-14 bg-stone-900 rounded-2xl flex items-center justify-center text-white shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 mb-1">Email Us</h4>
                      <p className="text-stone-500 leading-relaxed">{settings.email || 'info@discovertours.com\nsupport@discovertours.com'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
                <h4 className="font-bold text-amber-900 mb-2">Office Hours</h4>
                <div className="flex justify-between text-sm text-amber-800">
                  <span>Saturday - Thursday</span>
                  <span className="font-bold">09:00 - 21:00</span>
                </div>
                <div className="flex justify-between text-sm text-amber-800 mt-2">
                  <span>Friday</span>
                  <span className="font-bold">14:00 - 21:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
