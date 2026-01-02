import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import Image from '../common/Image';

const HomeEditor: React.FC = () => {
    const { settings, updateSettings, loading } = useSettings();
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setFormData(settings);
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateSettings(formData);
            setMessage('Home content saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to save content.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
            <h2 className="text-2xl font-serif text-stone-900 mb-6">Home Page Content</h2>
            {message && <div className={`p-4 mb-6 rounded-lg ${message.includes('success') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>{message}</div>}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Hero Section */}
                <div className="space-y-4">
                    <h3 className="font-bold text-stone-900 border-b pb-2">Hero Section</h3>
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Hero Title</label>
                        <input name="heroTitle" value={formData.heroTitle || ''} onChange={handleChange} className="w-full p-3 border border-stone-200 rounded-lg" placeholder="Discover the Ancient World" />
                    </div>
                    <div className="relative h-40 bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                        {formData.heroImage ? (
                            <Image src={formData.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-stone-400 text-sm font-bold uppercase tracking-wider">No Image Preview</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Hero Subtitle</label>
                        <input name="heroSubtitle" value={formData.heroSubtitle || ''} onChange={handleChange} className="w-full p-3 border border-stone-200 rounded-lg" placeholder="Luxury Private Tours of Egypt" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Hero Image URL</label>
                        <input name="heroImage" value={formData.heroImage || ''} onChange={handleChange} className="w-full p-3 border border-stone-200 rounded-lg" placeholder="https://..." />
                    </div>
                </div>

                {/* Nile Cruise Spotlight - Simplified for now */}
                <div className="space-y-4">
                    <h3 className="font-bold text-stone-900 border-b pb-2">Nile Cruise Spotlight</h3>
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Spotlight Title</label>
                        <input name="cruiseTitle" value={formData.cruiseTitle || ''} onChange={handleChange} className="w-full p-3 border border-stone-200 rounded-lg" placeholder="The Ultimate Nile Cruise Experience" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Spotlight Description</label>
                        <textarea name="cruiseDesc" value={formData.cruiseDesc || ''} onChange={handleChange} rows={3} className="w-full p-3 border border-stone-200 rounded-lg" placeholder="Wander through time..." />
                    </div>
                </div>

                <div className="pt-4">
                    <button type="submit" disabled={saving} className="bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition w-full md:w-auto disabled:opacity-50">
                        {saving ? 'Saving...' : 'Save Home Content'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HomeEditor;
