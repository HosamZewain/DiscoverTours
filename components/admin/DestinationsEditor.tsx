import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';

interface Destination {
    name: string;
    count: string;
    img: string;
}

const DestinationsEditor: React.FC = () => {
    const { settings, updateSettings, loading } = useSettings();
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (settings.popularDestinations) {
            try {
                setDestinations(JSON.parse(settings.popularDestinations));
            } catch (e) {
                console.error("Failed to parse", e);
                setDestinations([]);
            }
        } else {
            // Default starter data
            setDestinations([
                { name: 'Cairo', count: '12 Tours', img: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=600&auto=format&fit=crop' },
                { name: 'Luxor', count: '8 Tours', img: 'https://images.unsplash.com/photo-1599108600124-b6389f913d8c?q=80&w=600&auto=format&fit=crop' },
                { name: 'Red Sea', count: '15 Tours', img: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=600&auto=format&fit=crop' },
                { name: 'Aswan', count: '6 Tours', img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop' },
            ]);
        }
    }, [settings]);

    const handleChange = (index: number, field: keyof Destination, value: string) => {
        const newDestinations = [...destinations];
        newDestinations[index] = { ...newDestinations[index], [field]: value };
        setDestinations(newDestinations);
    };

    const addDestination = () => {
        setDestinations([...destinations, { name: 'New Destination', count: '0 Tours', img: '' }]);
    };

    const removeDestination = (index: number) => {
        const newDestinations = destinations.filter((_, i) => i !== index);
        setDestinations(newDestinations);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateSettings({
                ...settings,
                popularDestinations: JSON.stringify(destinations)
            });
            setMessage('Destinations saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to save destinations.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
            <h2 className="text-2xl font-serif text-stone-900 mb-6">Popular Destinations</h2>
            {message && <div className={`p-4 mb-6 rounded-lg ${message.includes('success') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>{message}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    {destinations.map((dest, index) => (
                        <div key={index} className="border border-stone-200 rounded-xl p-4 bg-stone-50 relative group">
                            <button type="button" onClick={() => removeDestination(index)} className="absolute top-2 right-2 text-stone-400 hover:text-red-500 font-bold p-2">✕</button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Name</label>
                                    <input value={dest.name} onChange={(e) => handleChange(index, 'name', e.target.value)} className="w-full p-2 border border-stone-200 rounded bg-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Count Label</label>
                                    <input value={dest.count} onChange={(e) => handleChange(index, 'count', e.target.value)} className="w-full p-2 border border-stone-200 rounded bg-white" placeholder="12 Tours" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Image URL</label>
                                    <input value={dest.img} onChange={(e) => handleChange(index, 'img', e.target.value)} className="w-full p-2 border border-stone-200 rounded bg-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4">
                    <button type="button" onClick={addDestination} className="px-6 py-3 rounded-lg font-bold border-2 border-dashed border-stone-300 text-stone-500 hover:border-amber-500 hover:text-amber-600 transition w-full">
                        + Add Destination
                    </button>
                </div>

                <div className="pt-4 border-t border-stone-100">
                    <button type="submit" disabled={saving} className="bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition w-full md:w-auto disabled:opacity-50">
                        {saving ? 'Saving...' : 'Save Destinations'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DestinationsEditor;
