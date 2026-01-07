import React, { useState, useEffect } from 'react';
import { destinationService } from '../../services/api';

interface Destination {
    id?: string;
    slug: string;
    name: string;
    description: string;
    image: string;
    headerImage?: string;
    content?: string;
    _count?: {
        tours: number;
    }
}

const DestinationsEditor: React.FC = () => {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingDest, setEditingDest] = useState<Destination | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const data = await destinationService.getAll();
            setDestinations(data);
        } catch (error) {
            console.error('Failed to fetch destinations', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (dest: Destination) => {
        setEditingDest(dest);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingDest({
            slug: '',
            name: '',
            description: '',
            image: '',
            headerImage: '',
            content: ''
        });
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingDest(null);
    };

    const handleDelete = async (id: string | undefined) => {
        if (!id) return;
        if (!window.confirm('Are you sure you want to delete this destination?')) return;

        try {
            await destinationService.delete(id);
            setDestinations(destinations.filter(d => d.id !== id));
            setMessage('Destination deleted successfully.');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Failed to delete', error);
            setMessage('Failed to delete destination.');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingDest) return;

        try {
            if (editingDest.id) {
                // Update
                const updated = await destinationService.update(editingDest.id, editingDest);
                setDestinations(destinations.map(d => d.id === updated.id ? { ...updated, _count: d._count } : d));
                setMessage('Destination updated successfully!');
            } else {
                // Create
                const created = await destinationService.create(editingDest);
                setDestinations([...destinations, { ...created, _count: { tours: 0 } }]);
                setMessage('Destination created successfully!');
            }
            setIsFormOpen(false);
            setEditingDest(null);
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Failed to save', error);
            setMessage('Failed to save destination.');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-stone-900">Destinations</h2>
                <button
                    onClick={handleAddNew}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-amber-700 transition"
                >
                    + Add New
                </button>
            </div>

            {message && <div className={`p-4 mb-6 rounded-lg ${message.includes('success') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>{message}</div>}

            {isFormOpen && editingDest ? (
                <form onSubmit={handleSave} className="mb-8 border border-stone-200 p-6 rounded-xl bg-stone-50">
                    <h3 className="font-bold text-lg mb-4">{editingDest.id ? 'Edit Destination' : 'New Destination'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Name</label>
                            <input
                                required
                                value={editingDest.name}
                                onChange={e => setEditingDest({ ...editingDest, name: e.target.value })}
                                className="w-full p-2 border border-stone-200 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Slug (URL)</label>
                            <input
                                required
                                value={editingDest.slug}
                                onChange={e => setEditingDest({ ...editingDest, slug: e.target.value })}
                                className="w-full p-2 border border-stone-200 rounded"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Card Image URL</label>
                            <input
                                required
                                value={editingDest.image}
                                onChange={e => setEditingDest({ ...editingDest, image: e.target.value })}
                                className="w-full p-2 border border-stone-200 rounded"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Header Image URL (Optional)</label>
                            <input
                                value={editingDest.headerImage || ''}
                                onChange={e => setEditingDest({ ...editingDest, headerImage: e.target.value })}
                                className="w-full p-2 border border-stone-200 rounded"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Short Description</label>
                            <textarea
                                required
                                rows={2}
                                value={editingDest.description}
                                onChange={e => setEditingDest({ ...editingDest, description: e.target.value })}
                                className="w-full p-2 border border-stone-200 rounded"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Full Page Content (HTML/Markdown)</label>
                            <textarea
                                rows={6}
                                value={editingDest.content || ''}
                                onChange={e => setEditingDest({ ...editingDest, content: e.target.value })}
                                className="w-full p-2 border border-stone-200 rounded font-mono text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-amber-700 transition">
                            Save
                        </button>
                        <button type="button" onClick={handleCloseForm} className="bg-stone-200 text-stone-700 px-6 py-2 rounded-lg font-bold hover:bg-stone-300 transition">
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {destinations.map((dest) => (
                        <div key={dest.id} className="border border-stone-200 rounded-xl overflow-hidden group hover:shadow-md transition">
                            <div className="h-40 bg-stone-200 relative">
                                {dest.image && <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <button
                                        onClick={() => handleEdit(dest)}
                                        className="bg-white p-2 rounded-full shadow hover:bg-amber-50 text-amber-600"
                                        title="Edit"
                                    >
                                        ✎
                                    </button>
                                    <button
                                        onClick={() => handleDelete(dest.id)}
                                        className="bg-white p-2 rounded-full shadow hover:bg-red-50 text-red-600"
                                        title="Delete"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg">{dest.name}</h3>
                                    <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded">
                                        {dest._count?.tours || 0} Tours
                                    </span>
                                </div>
                                <p className="text-sm text-stone-500 line-clamp-2">{dest.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DestinationsEditor;
