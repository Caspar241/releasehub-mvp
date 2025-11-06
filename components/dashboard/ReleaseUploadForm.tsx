'use client';

import { useState } from 'react';

export default function ReleaseUploadForm() {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    releaseDate: '',
    genre: '',
    description: '',
  });

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms = [
    { id: 'spotify', name: 'Spotify', icon: '🎵' },
    { id: 'apple', name: 'Apple Music', icon: '🍎' },
    { id: 'youtube', name: 'YouTube Music', icon: '▶️' },
    { id: 'amazon', name: 'Amazon Music', icon: '🛒' },
    { id: 'deezer', name: 'Deezer', icon: '🎧' },
    { id: 'tidal', name: 'Tidal', icon: '🌊' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier würde die Upload-Logik implementiert werden
    console.log('Form submitted:', { formData, audioFile, coverImage, selectedPlatforms });
    alert('Release wird hochgeladen! (Demo)');
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Release Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Release Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Song Titel *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="z.B. Summer Vibes"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Artist Name *
            </label>
            <input
              type="text"
              required
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Dein Künstlername"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Release Datum *
            </label>
            <input
              type="date"
              required
              value={formData.releaseDate}
              onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Genre *
            </label>
            <select
              required
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Genre auswählen</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="hiphop">Hip Hop</option>
              <option value="electronic">Electronic</option>
              <option value="rnb">R&B</option>
              <option value="indie">Indie</option>
              <option value="other">Andere</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beschreibung
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Erzähle mehr über deinen Song..."
            />
          </div>
        </div>
      </div>

      {/* File Uploads */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Dateien</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Audio File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audio Datei * (.mp3, .wav, .flac)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                className="hidden"
                id="audio-upload"
                required
              />
              <label htmlFor="audio-upload" className="cursor-pointer">
                <div className="text-4xl mb-2">🎵</div>
                {audioFile ? (
                  <p className="text-sm text-gray-700 font-medium">{audioFile.name}</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-600">Klicken zum Hochladen</p>
                    <p className="text-xs text-gray-500 mt-1">oder Datei hierher ziehen</p>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Bild * (min. 3000x3000px)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                className="hidden"
                id="cover-upload"
                required
              />
              <label htmlFor="cover-upload" className="cursor-pointer">
                <div className="text-4xl mb-2">🖼️</div>
                {coverImage ? (
                  <p className="text-sm text-gray-700 font-medium">{coverImage.name}</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-600">Klicken zum Hochladen</p>
                    <p className="text-xs text-gray-500 mt-1">JPG oder PNG</p>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Vertriebsplattformen</h2>
        <p className="text-sm text-gray-600 mb-4">
          Wähle die Plattformen, auf denen dein Release veröffentlicht werden soll.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              type="button"
              onClick={() => togglePlatform(platform.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedPlatforms.includes(platform.id)
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{platform.icon}</div>
              <p className="text-sm font-medium text-gray-900">{platform.name}</p>
            </button>
          ))}
        </div>
        {selectedPlatforms.length === 0 && (
          <p className="text-sm text-red-600 mt-4">Bitte wähle mindestens eine Plattform aus.</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Entwurf speichern
        </button>
        <button
          type="submit"
          disabled={selectedPlatforms.length === 0}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Release hochladen
        </button>
      </div>
    </form>
  );
}
