import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookingDetails } from '../types';
import SEO from './SEO';

const PaymentSuccess: React.FC<any> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const details = location.state?.details as BookingDetails;

  const reference = 'DT-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  useEffect(() => {
    if (!details) {
      navigate('/');
    }
  }, [details, navigate]);

  if (!details) return null;

  return (
    <>
      <SEO title="Booking Confirmed" description="Thank you for your booking with Discover Tours." />
      <div className="pt-24 pb-20 bg-stone-50 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-white p-12 md:p-16 rounded-[48px] shadow-2xl border border-stone-100 relative overflow-hidden">
            {/* Confetti-like decoration */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-100 rounded-full opacity-50"></div>

            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-serif text-stone-900 mb-4">Booking Received</h1>
            <p className="text-stone-500 max-w-md mx-auto mb-8">
              Thank you! We have received your booking request and payment receipt. Our team will verify the transfer and send you a confirmation email shortly.
            </p>

            <div className="bg-stone-50 rounded-3xl p-8 mb-10 text-left space-y-4 relative z-10 border border-stone-100">
              <div className="flex justify-between items-center border-b border-stone-200 pb-4">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Booking Ref</span>
                <span className="text-lg font-bold text-amber-600">{reference}</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Tour</span>
                  <span className="font-bold text-stone-900">{details.tour.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Date</span>
                  <span className="font-bold text-stone-900">{details.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Travelers</span>
                  <span className="font-bold text-stone-900">{details.guests} Adults</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <p className="text-sm text-stone-400">
                A confirmation email with your voucher and meeting point details has been sent to <strong>{details.email}</strong>.
              </p>
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.print()}
                  className="flex-grow bg-stone-100 hover:bg-stone-200 text-stone-700 py-4 rounded-2xl font-bold transition-all"
                >
                  Download Receipt
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex-[2] bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-amber-600/20 transition-all"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-stone-400 text-xs uppercase tracking-widest">
            Need assistance? Our 24/7 concierge is standing by on WhatsApp.
          </p>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
