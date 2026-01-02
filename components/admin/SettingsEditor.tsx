import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';

const SettingsEditor: React.FC = () => {
    const { settings, updateSettings, loading } = useSettings();
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setFormData(settings);
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateSettings(formData);
            setMessage('Settings saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">Loading settings...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 max-w-2xl">
            <h2 className="text-2xl font-serif text-stone-900 mb-6">Site Settings</h2>

            {message && (
                <div className={`p-4 mb-6 rounded-lg ${message.includes('success') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <h3 className="font-bold text-stone-900 border-b pb-2">Contact Information</h3>
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            placeholder="info@discovertours.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            placeholder="+20 123 456 7890"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            placeholder="123 Sphinx Ave, Cairo, Egypt"
                        />
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <h3 className="font-bold text-stone-900 border-b pb-2">Social Media Links</h3>
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Facebook URL</label>
                        <input
                            type="url"
                            name="facebook"
                            value={formData.facebook || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            placeholder="https://facebook.com/..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">Instagram URL</label>
                        <input
                            type="url"
                            name="instagram"
                            value={formData.instagram || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            placeholder="https://instagram.com/..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-600 mb-2">WhatsApp URL</label>
                        <input
                            type="url"
                            name="whatsapp"
                            value={formData.whatsapp || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            placeholder="https://wa.me/..."
                        />
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition w-full md:w-auto disabled:opacity-50"
                    >
                        {saving ? 'Saving Changes...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SettingsEditor;
