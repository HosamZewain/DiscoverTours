import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BookingList from './BookingList';
import TourList from './TourList';
import SettingsEditor from './SettingsEditor';
import HomeEditor from './HomeEditor';
import DestinationsEditor from './DestinationsEditor';
import PagesEditor from './PagesEditor';
import TestimonialsEditor from './TestimonialsEditor';
import ProfileEditor from './ProfileEditor';
import AdminSidebar from './AdminSidebar';

const AdminDashboard: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    // Mapping for header titles based on path
    const getPageTitle = () => {
        const path = location.pathname.split('/').pop();
        switch (path) {
            case 'bookings': return 'Booking Management';
            case 'tours': return 'Tour Adventures';
            case 'settings': return 'Global Settings';
            case 'home': return 'Home Page Content';
            case 'destinations': return 'Destinations';
            case 'pages': return 'Static Pages';
            case 'testimonials': return 'Reviews & Testimonials';
            case 'profile': return 'Admin Profile';
            default: return 'Dashboard';
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex">
            {/* Sidebar Navigation */}
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content */}
            <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">

                {/* Mobile Header */}
                <header className="bg-white border-b border-stone-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm/50">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 -ml-2 text-stone-500 hover:bg-stone-50 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-serif font-bold text-stone-900">{getPageTitle()}</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-sm">
                            AD
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto">
                        <Routes>
                            <Route path="bookings" element={<BookingList />} />
                            <Route path="tours" element={<TourList />} />
                            <Route path="settings" element={<SettingsEditor />} />
                            <Route path="home" element={<HomeEditor />} />
                            <Route path="destinations" element={<DestinationsEditor />} />
                            <Route path="pages" element={<PagesEditor />} />
                            <Route path="testimonials" element={<TestimonialsEditor />} />
                            <Route path="profile" element={<ProfileEditor />} />
                            <Route path="*" element={<Navigate to="bookings" replace />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
