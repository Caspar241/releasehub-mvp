'use client';

import { useState } from 'react';

export default function SettingsForm() {
  const [profileData, setProfileData] = useState({
    artistName: 'Artist Name',
    email: 'artist@email.com',
    bio: '',
    website: '',
    instagram: '',
    twitter: '',
    spotify: '',
  });

  const [notifications, setNotifications] = useState({
    emailReleases: true,
    emailAnalytics: true,
    emailPayments: true,
    pushReleases: false,
    pushAnalytics: false,
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
    alert('Profil gespeichert! (Demo)');
  };

  const handleNotificationsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Notifications updated:', notifications);
    alert('Benachrichtigungen gespeichert! (Demo)');
  };

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <form onSubmit={handleProfileSubmit} className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Profil Informationen</h2>

        <div className="space-y-6">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Profilbild</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                A
              </div>
              <div>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Bild ändern
                </button>
                <p className="text-xs text-gray-500 mt-1">JPG oder PNG, max. 5MB</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Künstlername *
              </label>
              <input
                type="text"
                required
                value={profileData.artistName}
                onChange={(e) => setProfileData({ ...profileData, artistName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-Mail *
              </label>
              <input
                type="email"
                required
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Erzähle etwas über dich als Künstler..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={profileData.website}
                onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="https://"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="text"
                value={profileData.instagram}
                onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="@username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter / X
              </label>
              <input
                type="text"
                value={profileData.twitter}
                onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="@username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spotify Artist URI
              </label>
              <input
                type="text"
                value={profileData.spotify}
                onChange={(e) => setProfileData({ ...profileData, spotify: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="spotify:artist:..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Profil speichern
          </button>
        </div>
      </form>

      {/* Notification Settings */}
      <form onSubmit={handleNotificationsSubmit} className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Benachrichtigungen</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">E-Mail Benachrichtigungen</h3>
            <div className="space-y-3">
              {[
                { key: 'emailReleases', label: 'Release Updates', description: 'Benachrichtigungen über neue Releases und Status-Änderungen' },
                { key: 'emailAnalytics', label: 'Analytics Reports', description: 'Wöchentliche Zusammenfassung deiner Performance' },
                { key: 'emailPayments', label: 'Zahlungen', description: 'Benachrichtigungen über Auszahlungen und Einnahmen' },
              ].map((item) => (
                <label key={item.key} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[item.key as keyof typeof notifications]}
                    onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                    className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Push Benachrichtigungen</h3>
            <div className="space-y-3">
              {[
                { key: 'pushReleases', label: 'Release Updates', description: 'Push-Benachrichtigungen für Release-Status' },
                { key: 'pushAnalytics', label: 'Analytics Milestones', description: 'Benachrichtigungen bei wichtigen Meilensteinen' },
              ].map((item) => (
                <label key={item.key} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[item.key as keyof typeof notifications]}
                    onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                    className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Einstellungen speichern
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl border border-red-200 p-6">
        <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Account löschen</p>
              <p className="text-sm text-gray-600">Permanent dein Konto und alle Daten löschen</p>
            </div>
            <button
              type="button"
              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
            >
              Account löschen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
