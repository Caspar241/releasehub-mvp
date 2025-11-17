'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageHeader from '@/components/common/PageHeader';
import TemplatePhaseCard from '@/components/dashboard/TemplatePhaseCard';
import ApplyTemplateModal from '@/components/dashboard/ApplyTemplateModal';
import { getTemplateById, getTotalTaskCount } from '@/lib/templates/mockTemplates';
import { getTemplateTypeColor } from '@/lib/templates/types';
import * as LucideIcons from 'lucide-react';

export default function TemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params?.templateId as string;

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const template = getTemplateById(templateId);

  if (!template) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-surface-overlay/40 flex items-center justify-center mx-auto mb-4">
              <LucideIcons.FileX size={32} className="text-text-muted" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Template nicht gefunden
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              Das angeforderte Template existiert nicht.
            </p>
            <button
              onClick={() => router.push('/dashboard/templates')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all shadow-soft"
            >
              <LucideIcons.ArrowLeft size={18} />
              <span>Zurück zur Übersicht</span>
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const totalTasks = getTotalTaskCount(template);
  const typeColor = getTemplateTypeColor(template.type);

  return (
    <DashboardLayout>
      <PageHeader
        title={template.name}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Templates', href: '/dashboard/templates' },
          { label: template.name },
        ]}
        actions={
          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all shadow-soft"
          >
            <LucideIcons.Play size={18} />
            <span>Template anwenden</span>
          </button>
        }
      />

      {/* Template Meta Info */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="flex items-start justify-between gap-6 mb-4">
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${typeColor}`}>
                {template.type === 'release' ? 'Release Template' : 'Artist Template'}
              </span>
              {template.durationWeeks && (
                <span className="px-3 py-1.5 rounded-full text-sm font-medium border bg-surface-overlay/20 text-text-secondary border-border">
                  {template.durationWeeks} Wochen
                </span>
              )}
            </div>
            <p className="text-text-secondary mb-4">{template.description}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-surface-overlay/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                <LucideIcons.Layers size={18} className="text-accent" />
              </div>
              <span className="text-2xl font-bold text-text-primary">
                {template.phases.length}
              </span>
            </div>
            <p className="text-sm text-text-muted">
              Phase{template.phases.length !== 1 ? 'n' : ''}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-overlay/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <LucideIcons.CheckSquare size={18} className="text-green-400" />
              </div>
              <span className="text-2xl font-bold text-text-primary">
                {totalTasks}
              </span>
            </div>
            <p className="text-sm text-text-muted">
              Task{totalTasks !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-overlay/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <LucideIcons.Clock size={18} className="text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-text-primary">
                {template.durationWeeks || '∞'}
              </span>
            </div>
            <p className="text-sm text-text-muted">
              {template.durationWeeks ? 'Wochen' : 'Wiederkehrend'}
            </p>
          </div>
        </div>
      </div>

      {/* Phases Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <LucideIcons.List size={20} className="text-accent" />
          <h2 className="text-xl font-bold text-text-primary">Phasen & Tasks</h2>
        </div>

        <div className="space-y-6">
          {template.phases
            .sort((a, b) => a.order - b.order)
            .map((phase) => (
              <TemplatePhaseCard
                key={phase.id}
                phase={phase}
                phaseNumber={phase.order}
              />
            ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="glass-card rounded-xl p-8 text-center">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Bereit loszulegen?
        </h3>
        <p className="text-sm text-text-secondary mb-6 max-w-2xl mx-auto">
          Wende dieses Template an, um automatisch Tasks für deinen Release oder
          deine Artist-Routine zu generieren.
        </p>
        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all shadow-soft"
        >
          <LucideIcons.Play size={20} />
          <span>Template jetzt anwenden</span>
        </button>
      </div>

      {/* Apply Modal */}
      <ApplyTemplateModal
        template={template}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </DashboardLayout>
  );
}
