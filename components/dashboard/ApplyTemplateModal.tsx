'use client';

import { useState } from 'react';
import { Template } from '@/lib/templates/types';
import * as LucideIcons from 'lucide-react';

interface ApplyTemplateModalProps {
  template: Template;
  isOpen: boolean;
  onClose: () => void;
}

type ApplyOption = 'new-release' | 'existing-release' | 'artist-routine' | null;

export default function ApplyTemplateModal({
  template,
  isOpen,
  onClose,
}: ApplyTemplateModalProps) {
  const [selectedOption, setSelectedOption] = useState<ApplyOption>(null);

  if (!isOpen) return null;

  const handleApply = () => {
    // Stub: Wird später implementiert
    console.log('Template apply:', template.id, 'Option:', selectedOption);
    // Placeholder für zukünftige Implementierung
    alert('Feature in Entwicklung: Tasks werden später automatisch generiert.');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg">
        <div className="glass-card rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Template anwenden
              </h2>
              <p className="text-sm text-text-secondary">
                {template.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-overlay/40 rounded-lg transition-all"
            >
              <LucideIcons.X size={20} className="text-text-muted" />
            </button>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {/* Option 1: New Release */}
            {template.type === 'release' && (
              <label
                className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedOption === 'new-release'
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50 hover:bg-surface-overlay/20'
                }`}
              >
                <input
                  type="radio"
                  name="apply-option"
                  value="new-release"
                  checked={selectedOption === 'new-release'}
                  onChange={() => setSelectedOption('new-release')}
                  className="mt-1 accent-accent"
                />
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <LucideIcons.Plus size={18} className="text-accent" />
                    <span className="font-semibold text-text-primary">
                      Neuen Release erstellen
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Template wird zu einem neuen Release hinzugefügt.
                  </p>
                </div>
              </label>
            )}

            {/* Option 2: Existing Release */}
            {template.type === 'release' && (
              <label
                className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedOption === 'existing-release'
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50 hover:bg-surface-overlay/20'
                }`}
              >
                <input
                  type="radio"
                  name="apply-option"
                  value="existing-release"
                  checked={selectedOption === 'existing-release'}
                  onChange={() => setSelectedOption('existing-release')}
                  className="mt-1 accent-accent"
                />
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <LucideIcons.FolderPlus size={18} className="text-accent" />
                    <span className="font-semibold text-text-primary">
                      Zu bestehendem Release hinzufügen
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Template wird zu einem vorhandenen Release hinzugefügt.
                  </p>
                </div>
              </label>
            )}

            {/* Option 3: Artist Routine */}
            {template.type === 'artist' && (
              <label
                className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedOption === 'artist-routine'
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50 hover:bg-surface-overlay/20'
                }`}
              >
                <input
                  type="radio"
                  name="apply-option"
                  value="artist-routine"
                  checked={selectedOption === 'artist-routine'}
                  onChange={() => setSelectedOption('artist-routine')}
                  className="mt-1 accent-accent"
                />
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <LucideIcons.Repeat size={18} className="text-accent" />
                    <span className="font-semibold text-text-primary">
                      Als wiederkehrende Routine speichern
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Template wird als wöchentliche Routine aktiviert.
                  </p>
                </div>
              </label>
            )}
          </div>

          {/* Info Notice */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6">
            <div className="flex gap-3">
              <LucideIcons.Info
                size={18}
                className="text-blue-400 flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="text-sm text-blue-400 font-medium mb-1">
                  Feature in Entwicklung
                </p>
                <p className="text-xs text-blue-300/80">
                  Die Template-Anwendung ist aktuell noch in Entwicklung. Tasks
                  werden später automatisch basierend auf dem gewählten Template
                  generiert.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-border text-text-primary font-medium hover:bg-surface-overlay/40 transition-all"
            >
              Abbrechen
            </button>
            <button
              onClick={handleApply}
              disabled={!selectedOption}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
                selectedOption
                  ? 'bg-accent hover:bg-accent-hover text-white shadow-soft'
                  : 'bg-surface-overlay/20 text-text-muted cursor-not-allowed'
              }`}
            >
              Anwenden
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
