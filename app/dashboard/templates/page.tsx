'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageHeader from '@/components/common/PageHeader';
import TemplateCard from '@/components/dashboard/TemplateCard';
import {
  MOCK_TEMPLATES,
  getTemplatesByType,
} from '@/lib/templates/mockTemplates';
import { TemplateType } from '@/lib/templates/types';
import * as LucideIcons from 'lucide-react';

export default function TemplatesPage() {
  const [selectedType, setSelectedType] = useState<TemplateType | 'all'>('all');

  const filteredTemplates =
    selectedType === 'all'
      ? MOCK_TEMPLATES
      : getTemplatesByType(selectedType);

  return (
    <DashboardLayout>
      <PageHeader
        title="Templates"
        description="Professionelle Templates für Release-Planung, Artist-Management und mehr"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Templates' },
        ]}
      />

      {/* Filter Bar */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted mr-2">Filter:</span>
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === 'all'
                  ? 'bg-accent text-white shadow-soft'
                  : 'bg-surface-overlay/20 text-text-secondary hover:bg-surface-overlay/40'
              }`}
            >
              Alle
            </button>
            <button
              onClick={() => setSelectedType('release')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === 'release'
                  ? 'bg-blue-500 text-white shadow-soft'
                  : 'bg-surface-overlay/20 text-text-secondary hover:bg-surface-overlay/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <LucideIcons.Music size={16} />
                <span>Release</span>
              </div>
            </button>
            <button
              onClick={() => setSelectedType('artist')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === 'artist'
                  ? 'bg-purple-500 text-white shadow-soft'
                  : 'bg-surface-overlay/20 text-text-secondary hover:bg-surface-overlay/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <LucideIcons.User size={16} />
                <span>Artist</span>
              </div>
            </button>
          </div>

          {/* Results Count */}
          <div className="text-sm text-text-muted">
            {filteredTemplates.length} Template
            {filteredTemplates.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Featured Section */}
      {selectedType === 'all' && (
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <LucideIcons.Star size={20} className="text-accent" />
            <h2 className="text-xl font-bold text-text-primary">
              Featured Templates
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_TEMPLATES.slice(0, 2).map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>
      )}

      {/* All Templates Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-primary">
            {selectedType === 'all'
              ? 'Alle Templates'
              : selectedType === 'release'
              ? 'Release Templates'
              : 'Artist Templates'}
          </h2>
        </div>

        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-surface-overlay/40 flex items-center justify-center mx-auto mb-4">
              <LucideIcons.FileText size={32} className="text-text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Keine Templates gefunden
            </h3>
            <p className="text-sm text-text-secondary">
              Versuche einen anderen Filter oder erstelle dein eigenes Template.
            </p>
          </div>
        )}
      </section>

      {/* Info Section */}
      <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-accent/10 to-purple-500/10 border border-accent/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
            <LucideIcons.Lightbulb size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Wie funktionieren Templates?
            </h3>
            <p className="text-sm text-text-secondary mb-3">
              Templates helfen dir, strukturierte Workflows für deine Releases
              und Artist-Management-Aufgaben zu erstellen. Jedes Template ist in
              Phasen unterteilt und enthält vordefinierte Tasks.
            </p>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <LucideIcons.Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Release Templates:</strong> Zeitbasierte Planung für
                  Single-, EP- oder Album-Releases
                </span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcons.Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Artist Templates:</strong> Wiederkehrende Routinen
                  für dein Artist-Management
                </span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcons.Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Anpassbar:</strong> Passe Templates an deine Bedürfnisse
                  an (Feature in Entwicklung)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
