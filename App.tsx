import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import ChatAssistant from './components/ChatAssistant';

// Pages
import Home from './components/Home';
import Destinations from './components/Destinations';
import DestinationDetails from './components/DestinationDetails';
import ToursPage from './components/ToursPage';
import About from './components/About';
import Contact from './components/Contact';
import InfoPage from './components/InfoPage';
import Cruises from './components/Cruises';
import TourDetails from './components/TourDetails';
import Checkout from './components/Checkout';
import PaymentSuccess from './components/PaymentSuccess';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { SettingsProvider } from './context/SettingsContext';
import SEO from './components/SEO';

// Wrapper for Admin Routes
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Simple check - in a real app use context/auth state
  // We'll rely on AdminLogin component to handle login state for now
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const [adminUser, setAdminUser] = useState<any>(null);

  const handleAdminLogin = (user: any) => {
    setAdminUser(user);
  };

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-amber-200 selection:text-amber-900">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={
            <>
              <SEO title="Destinations" description="Explore the most beautiful regions of Egypt." />
              <Destinations />
            </>
          } />
          <Route path="/destinations/:id" element={<DestinationDetails />} />
          <Route path="/about" element={
            <>
              <SEO title="About Us" description="Learn about our story and mission." />
              <About />
            </>
          } />
          <Route path="/contact" element={
            <>
              <SEO title="Contact Us" description="Get in touch with our team." />
              <Contact />
            </>
          } />
          <Route path="/faq" element={<InfoPage type="faq" />} />
          <Route path="/privacy" element={<InfoPage type="privacy" />} />
          <Route path="/terms" element={<InfoPage type="terms" />} />

          <Route path="/cruises" element={
            <>
              <SEO title="Nile Cruises" description="Luxury Nile cruises between Luxor and Aswan." />
              <Cruises onSelectTour={() => { }} />
            </>
          } />

          <Route path="/tours" element={<ToursPage />} />

          <Route path="/tours/:id" element={<TourDetails />} />

          <Route path="/checkout" element={
            <Checkout
              tour={null} // Checkout logic needs refactoring to read from location state or context
              onCancel={() => { }} // Navigation handled by component
              onComplete={() => { }} // Navigation handled by component
            />
          } />

          <Route path="/confirmation" element={<PaymentSuccess details={null} onReturnHome={() => { }} />} />

          <Route path="/admin/*" element={
            adminUser ? <AdminDashboard /> : <AdminLogin onLoginSuccess={handleAdminLogin} />
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <ChatAssistant />
    </div>
  );
};

const App: React.FC = () => (
  <SettingsProvider>
    <AppContent />
  </SettingsProvider>
);

export default App;
