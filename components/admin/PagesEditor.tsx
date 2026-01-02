import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';

const PAGES = [
    { id: 'page_about', label: 'About Us' },
    { id: 'page_faq', label: 'FAQ' },
    { id: 'page_privacy', label: 'Privacy Policy' },
    { id: 'page_terms', label: 'Terms & Conditions' },
];

const PagesEditor: React.FC = () => {
    const { settings, updateSettings, loading } = useSettings();
    const [selectedPage, setSelectedPage] = useState(PAGES[0].id);
    const [content, setContent] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setContent(settings[selectedPage] || '');
    }, [settings, selectedPage]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateSettings({
                ...settings,
                [selectedPage]: content
            });
            setMessage('Page content saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to save page content.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
            <h2 className="text-2xl font-serif text-stone-900 mb-6">Page Content Editor</h2>
            {message && <div className={`p-4 mb-6 rounded-lg ${message.includes('success') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>{message}</div>}

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-stone-600 mb-2">Select Page</label>
                    <div className="flex flex-wrap gap-2">
                        {PAGES.map(page => (
                            <button
                                key={page.id}
                                onClick={() => setSelectedPage(page.id)}
                                className={`px-4 py-2 rounded-lg font-bold transition-colors ${selectedPage === page.id
                                        ? 'bg-stone-800 text-white'
                                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                    }`}
                            >
                                {page.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-600 mb-2">Content (HTML/Text)</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={15}
                        className="w-full p-4 border border-stone-200 rounded-xl font-mono text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        placeholder="Enter page content here..."
                    />
                    <p className="text-xs text-stone-400 mt-2">Basic HTML tags are supported.</p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition w-full md:w-auto disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Content'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PagesEditor;
