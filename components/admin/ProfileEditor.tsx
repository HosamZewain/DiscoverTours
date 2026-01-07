import React, { useState } from 'react';
import { authService } from '../../services/api';

const ProfileEditor: React.FC = () => {
    // In a real app, we'd pull the current user from a context
    // For now, we'll ask for the current details or just assume 'admin' if stored
    const [username, setUsername] = useState('admin');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // We need the user ID. In the current simple setup, we might have stored it in localStorage on login
    // Or we can try to fetch it. Ideally, the auth context has it.
    // Let's assume we retrieve it from localStorage for this fix
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userId = parsedUser?.id;

    const [message, setMessage] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        if (newPassword && newPassword !== confirmPassword) {
            setMessage('New passwords do not match.');
            return;
        }

        if (!userId) {
            setMessage('User ID not found. Please log in again.');
            return;
        }

        setSaving(true);
        try {
            await authService.updateProfile({
                id: userId,
                username,
                currentPassword,
                newPassword: newPassword || undefined
            });
            setMessage('Profile updated successfully! Please log in again with new credentials.');
            // Optionally clear fields or logout
        } catch (error) {
            setMessage('Failed to update profile. Check current password.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 max-w-xl">
            <h2 className="text-2xl font-serif text-stone-900 mb-6">Admin Profile</h2>

            {message && <div className={`p-4 mb-6 rounded-lg ${message.includes('success') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>{message}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-stone-600 mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="w-full p-3 border border-stone-200 rounded-lg"
                        required
                    />
                </div>

                <div className="pt-4 border-t border-stone-100">
                    <h3 className="font-bold text-stone-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-stone-600 mb-2">Current Password (Required)</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                                className="w-full p-3 border border-stone-200 rounded-lg"
                                required
                                placeholder="Enter current password to confirm changes"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-600 mb-2">New Password (Leave blank to keep current)</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                className="w-full p-3 border border-stone-200 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-600 mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="w-full p-3 border border-stone-200 rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition w-full disabled:opacity-50"
                    >
                        {saving ? 'Updating...' : 'Update Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEditor;
