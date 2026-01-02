import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import TourEditor from './TourEditor';

const TourList: React.FC = () => {
    const [tours, setTours] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
    const [selectedTour, setSelectedTour] = useState<any>(null);

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        try {
            const response = await api.get('/tours');
            setTours(response.data);
        } catch (error) {
            console.error('Failed to fetch tours');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this tour?')) return;

        try {
            await api.delete(`/tours/${id}`);
            fetchTours();
        } catch (error) {
            console.error('Failed to delete tour');
        }
    };

    const handleEdit = (tour: any) => {
        setSelectedTour(tour);
        setView('edit');
    };

    const handleCreate = () => {
        setSelectedTour(null);
        setView('create');
    };

    const handleSave = () => {
        fetchTours();
        setView('list');
    };

    if (view === 'create' || view === 'edit') {
        return (
            <TourEditor
                initialData={selectedTour}
                onSave={handleSave}
                onCancel={() => setView('list')}
            />
        );
    }

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <button
                    onClick={handleCreate}
                    className="bg-amber-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-700 transition flex items-center gap-2"
                >
                    <span>+ Add New Tour</span>
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-stone-100 border-b border-stone-200">
                        <tr>
                            <th className="p-4 font-bold text-stone-600">Image</th>
                            <th className="p-4 font-bold text-stone-600">Title</th>
                            <th className="p-4 font-bold text-stone-600">Category</th>
                            <th className="p-4 font-bold text-stone-600">Price</th>
                            <th className="p-4 font-bold text-stone-600">Duration</th>
                            <th className="p-4 font-bold text-stone-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {tours.map((tour) => (
                            <tr key={tour.id} className="hover:bg-stone-50">
                                <td className="p-4">
                                    <img
                                        src={tour.image}
                                        alt={tour.title}
                                        className="w-16 h-12 object-cover rounded"
                                    />
                                </td>
                                <td className="p-4 font-bold text-stone-900">{tour.title}</td>
                                <td className="p-4 text-stone-600">
                                    <span className="px-2 py-1 bg-stone-100 rounded text-xs">
                                        {tour.category}
                                    </span>
                                </td>
                                <td className="p-4 font-bold text-amber-600">${tour.price}</td>
                                <td className="p-4 text-stone-600">{tour.duration}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(tour)}
                                            className="bg-stone-100 text-stone-600 px-3 py-1 rounded hover:bg-stone-200 text-xs font-bold"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(tour.id)}
                                            className="bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 text-xs font-bold"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TourList;
