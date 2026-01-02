import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

const BookingList: React.FC = () => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/bookings');
            setBookings(response.data);
        } catch (error) {
            console.error('Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await api.patch(`/bookings/${id}`, { status });
            fetchBookings();
        } catch (error) {
            console.error('Failed to update status');
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-stone-100 border-b border-stone-200">
                    <tr>
                        <th className="p-4 font-bold text-stone-600">Customer</th>
                        <th className="p-4 font-bold text-stone-600">Tour</th>
                        <th className="p-4 font-bold text-stone-600">Date</th>
                        <th className="p-4 font-bold text-stone-600">Guests</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="p-4 font-bold text-stone-600">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                    {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-stone-50">
                            <td className="p-4">
                                <div className="font-bold">{booking.fullName}</div>
                                <div className="text-sm text-stone-500">{booking.email}</div>
                                <div className="text-sm text-stone-500">{booking.phone}</div>
                            </td>
                            <td className="p-4 text-stone-600">{booking.tour?.title}</td>
                            <td className="p-4 text-stone-600">{new Date(booking.date).toLocaleDateString()}</td>
                            <td className="p-4 text-stone-600">{booking.guests}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${booking.totalPrice}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {booking.receiptImage ? (
                                    <a
                                        href={`http://localhost:3000${booking.receiptImage}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-amber-600 hover:text-amber-800 underline flex items-center gap-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View Receipt
                                    </a>
                                ) : (
                                    <span className="text-gray-400 text-xs text-center block">-</span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' :
                                    booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                        'bg-amber-100 text-amber-700'
                                    }`}>
                                    {booking.status}
                                </span>
                            </td>
                            <td className="p-4">
                                <div className="flex gap-2">
                                    {booking.status !== 'CONFIRMED' && (
                                        <button
                                            onClick={() => updateStatus(booking.id, 'CONFIRMED')}
                                            className="bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600 text-xs"
                                        >
                                            Confirm
                                        </button>
                                    )}
                                    {booking.status !== 'CANCELLED' && (
                                        <button
                                            onClick={() => updateStatus(booking.id, 'CANCELLED')}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {bookings.length === 0 && (
                        <tr>
                            <td colSpan={7} className="p-8 text-center text-stone-500">No bookings found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookingList;
