import React, { useState } from 'react';
import { api } from '../../services/api';

interface TourEditorProps {
    initialData?: any;
    onSave: () => void;
    onCancel: () => void;
}

const TourEditor: React.FC<TourEditorProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        price: initialData?.price || '',
        duration: initialData?.duration || '',
        image: initialData?.image || '',
        category: initialData?.category || '',
        tags: initialData?.tags ? initialData.tags.join(', ') : ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            tags: formData.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t)
        };

        try {
            if (initialData?.id) {
                await api.put(`/tours/${initialData.id}`, payload);
            } else {
                await api.post('/tours', payload);
            }
            onSave();
        } catch (error) {
            console.error('Failed to save tour', error);
            alert('Failed to save tour');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
            <h2 className="text-2xl font-serif text-stone-900 mb-6">
                {initialData ? 'Edit Tour' : 'Create New Tour'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Cultural">Cultural</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Cruise">Cruise</option>
                            <option value="Family">Family</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Duration</label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="e.g. 3 Days"
                            className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-stone-600 mb-2">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-stone-600 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-stone-600 mb-2">Tags (comma separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="e.g. History, Pyramids, Cairo"
                            className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-stone-100">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-amber-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-700 transition"
                    >
                        {loading ? 'Saving...' : 'Save Tour'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-stone-100 text-stone-600 px-6 py-3 rounded-lg font-bold hover:bg-stone-200 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TourEditor;
