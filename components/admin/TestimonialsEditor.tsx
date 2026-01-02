import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';

interface Testimonial {
    id: number;
    name: string;
    country: string;
    quote: string;
    rating: number;
}

const TestimonialsEditor: React.FC = () => {
    const { settings, updateSettings, loading } = useSettings();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);

    // Form State
    const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>({
        name: '',
        country: '',
        quote: '',
        rating: 5
    });

    useEffect(() => {
        if (settings.testimonials) {
            try {
                const parsed = JSON.parse(settings.testimonials);
                // Ensure they have IDs and ratings if migrating from old format
                const normalized = parsed.map((t: any, index: number) => ({
                    ...t,
                    id: t.id || index + 1,
                    rating: t.rating || 5
                }));
                setTestimonials(normalized);
            } catch (e) {
                console.error("Failed to parse testimonials", e);
                setTestimonials([]);
            }
        }
    }, [settings.testimonials]);

    const handleSaveList = async (newList: Testimonial[]) => {
        setSaving(true);
        try {
            await updateSettings({
                ...settings,
                testimonials: JSON.stringify(newList)
            });
            setMessage('Testimonials saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to save testimonials.');
        } finally {
            setSaving(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let newList: Testimonial[];

        if (editingId !== null) {
            newList = testimonials.map(t =>
                t.id === editingId ? { ...formData, id: editingId } : t
            );
            setEditingId(null);
        } else {
            const newId = Math.max(0, ...testimonials.map(t => t.id)) + 1;
            newList = [...testimonials, { ...formData, id: newId }];
        }

        setTestimonials(newList);
        setFormData({ name: '', country: '', quote: '', rating: 5 });
        await handleSaveList(newList);
    };

    const handleEdit = (t: Testimonial) => {
        setFormData({
            name: t.name,
            country: t.country,
            quote: t.quote,
            rating: t.rating
        });
        setEditingId(t.id);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            const newList = testimonials.filter(t => t.id !== id);
            setTestimonials(newList);
            await handleSaveList(newList);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ name: '', country: '', quote: '', rating: 5 });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
            <h2 className="text-2xl font-serif text-stone-900 mb-6">Testimonials Editor</h2>
            {message && <div className={`p-4 mb-6 rounded-lg ${message.includes('success') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>{message}</div>}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1 bg-stone-50 p-6 rounded-xl h-fit border border-stone-100">
                    <h3 className="font-bold text-stone-900 mb-4">{editingId !== null ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Country</label>
                            <input
                                type="text"
                                value={formData.country}
                                onChange={e => setFormData({ ...formData, country: e.target.value })}
                                className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        className={`text-2xl transition-transform hover:scale-110 ${star <= formData.rating ? 'text-amber-500' : 'text-stone-300'}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Quote</label>
                            <textarea
                                value={formData.quote}
                                onChange={e => setFormData({ ...formData, quote: e.target.value })}
                                className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                rows={4}
                                required
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 bg-stone-900 text-white py-2 rounded-lg font-bold hover:bg-black transition disabled:opacity-50"
                            >
                                {editingId !== null ? 'Update' : 'Add'}
                            </button>
                            {editingId !== null && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 bg-stone-200 text-stone-600 rounded-lg font-bold hover:bg-stone-300 transition"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map(t => (
                        <div key={t.id} className="relative group bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(t)}
                                    className="p-2 bg-stone-100 text-stone-600 rounded-full hover:bg-amber-100 hover:text-amber-600 transition"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="p-2 bg-stone-100 text-stone-600 rounded-full hover:bg-red-100 hover:text-red-600 transition"
                                >
                                    🗑️
                                </button>
                            </div>

                            <div className="mb-2 flex text-amber-500 text-lg">
                                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                            </div>
                            <p className="text-stone-600 italic mb-4 line-clamp-3">"{t.quote}"</p>
                            <div>
                                <h4 className="font-bold text-stone-900">{t.name}</h4>
                                <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">{t.country}</p>
                            </div>
                        </div>
                    ))}

                    {testimonials.length === 0 && (
                        <div className="col-span-full py-12 text-center text-stone-400 border-2 border-dashed border-stone-200 rounded-xl">
                            No testimonials yet. Add one to get started.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestimonialsEditor;
