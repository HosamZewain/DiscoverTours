import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tour } from '../types';
import { bookingService } from '../services/api';
import SEO from './SEO';

const Checkout: React.FC<any> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tour = location.state?.tour as Tour;

  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!tour) {
      navigate('/');
    }
  }, [tour, navigate]);

  if (!tour) return null;

  const totalPrice = tour.price * guests;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await bookingService.create({
        fullName,
        email,
        phone,
        date,
        guests,
        tourId: tour.id,
        totalPrice,
        receipt
      });

      //   onComplete({ ... });
      const details = { tour, date, guests, fullName, email, phone };
      // Navigate to confirmation page
      navigate('/confirmation', { state: { details } });

    } catch (error) {
      console.error(error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <SEO title="Checkout" description="Secure your booking with Discover Tours." />
      <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12">
            <button
              onClick={() => navigate(-1)}
              className="text-stone-500 hover:text-amber-600 font-medium flex items-center gap-2 mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Cancel Booking
            </button>
            <h1 className="text-4xl font-serif text-stone-900">Secure Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Flow */}
            <div className="lg:col-span-2">
              {/* Progress Bar */}
              <div className="flex items-center gap-4 mb-10 px-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${step >= 1 ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-500'}`}>1</div>
                <div className="flex-grow h-0.5 bg-stone-200">
                  <div className={`h-full bg-amber-600 transition-all duration-500 ${step > 1 ? 'w-full' : 'w-0'}`}></div>
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${step >= 2 ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-500'}`}>2</div>
              </div>

              {step === 1 ? (
                <form onSubmit={handleNext} className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-stone-100 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-serif text-stone-900">Traveler Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Full Name</label>
                      <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Email Address</label>
                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Tour Date</label>
                      <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Number of Guests</label>
                      <div className="flex items-center gap-4 bg-stone-50 border border-stone-200 rounded-2xl p-2">
                        <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-stone-100 text-stone-900 font-bold">-</button>
                        <span className="flex-grow text-center font-bold">{guests}</span>
                        <button type="button" onClick={() => setGuests(guests + 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-stone-100 text-stone-900 font-bold">+</button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Mobile Phone</label>
                    <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20" placeholder="+1 (555) 000-0000" />
                  </div>

                  <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-amber-600/20 transition-all flex items-center justify-center gap-3">
                    Proceed to Payment
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePayment} className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-stone-100 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-serif text-stone-900">Payment Information</h2>

                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 space-y-4">
                    <h3 className="font-bold text-amber-800 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                      Bank Transfer Instructions
                    </h3>
                    <p className="text-sm text-amber-900">Please transfer the total amount to the following bank account and upload the receipt below to confirm your booking.</p>

                    <div className="bg-white p-4 rounded-xl space-y-2 text-sm border border-amber-100">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Bank Name</span>
                        <span className="font-bold text-stone-900">CIB Egypt</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Account Name</span>
                        <span className="font-bold text-stone-900">Discover Tours LLC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Account Number</span>
                        <span className="font-bold text-stone-900 font-mono">1000 2345 6789</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">IBAN</span>
                        <span className="font-bold text-stone-900 font-mono">EG12 0000 0000 0000 1234 5678 90</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Upload Payment Receipt</label>
                    <div className="relative border-2 border-dashed border-stone-300 rounded-2xl p-8 hover:bg-stone-50 transition-colors text-center cursor-pointer">
                      <input
                        required
                        type="file"
                        accept="image/*"
                        onChange={(e) => setReceipt(e.target.files ? e.target.files[0] : null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="space-y-2">
                        <div className="mx-auto w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        {receipt ? (
                          <div className="space-y-1">
                            <p className="font-bold text-amber-600">{receipt.name}</p>
                            <p className="text-xs text-stone-500">Click to change file</p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p className="font-bold text-stone-900">Click to upload receipt</p>
                            <p className="text-xs text-stone-500">JPG, PNG or PDF (Max 5MB)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row gap-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-grow bg-stone-100 hover:bg-stone-200 text-stone-600 py-5 rounded-2xl font-bold transition-all">
                      Go Back
                    </button>
                    <button type="submit" disabled={isProcessing || !receipt} className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                      {isProcessing ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        `Confirm Payment $${totalPrice}`
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-stone-900 text-white rounded-[40px] overflow-hidden shadow-2xl">
                <div className="h-40 overflow-hidden">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif mb-2">{tour.title}</h3>
                    <div className="flex items-center gap-2 text-amber-500 text-sm font-bold">
                      <span>{tour.duration}</span>
                      <span>•</span>
                      <span>{tour.category}</span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-400">Price per person</span>
                      <span className="font-bold">${tour.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-400">Number of guests</span>
                      <span className="font-bold">x {guests}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-400">Tax & Fees</span>
                      <span className="text-emerald-400 font-bold">Included</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xl font-serif">Total</span>
                      <span className="text-3xl font-bold text-amber-500">${totalPrice}</span>
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl space-y-3">
                    <div className="flex items-center gap-3 text-xs text-stone-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Instant Confirmation
                    </div>
                    <div className="flex items-center gap-3 text-xs text-stone-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Free cancellation (24h)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
