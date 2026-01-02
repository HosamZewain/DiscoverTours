import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface SettingsContextType {
    settings: Record<string, string>;
    updateSettings: (newSettings: Record<string, string>) => Promise<void>;
    loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await api.get('/settings');
            setSettings(response.data);
        } catch (error) {
            console.error('Failed to fetch settings');
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (newSettings: Record<string, string>) => {
        try {
            const response = await api.post('/settings', newSettings);
            setSettings(response.data);
        } catch (error) {
            console.error('Failed to update settings');
            throw error;
        }
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
            {children}
        </SettingsContext.Provider>
    );
};
