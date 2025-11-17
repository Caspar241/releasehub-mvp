'use client';

import Link from 'next/link';
import { Template, getTemplateTypeColor } from '@/lib/templates/types';
import { getTotalTaskCount } from '@/lib/templates/mockTemplates';
import * as LucideIcons from 'lucide-react';

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const totalTasks = getTotalTaskCount(template);
  const typeColor = getTemplateTypeColor(template.type);

  const Icon = template.type === 'release'
    ? LucideIcons.Music
    : LucideIcons.User;

  return (
    <Link href={`/dashboard/templates/${template.id}`}>
      <div className="glass-card rounded-xl p-6 hover:bg-surface-overlay/40 transition-all cursor-pointer group h-full flex flex-col">
        {/* Header with Icon Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl border ${typeColor}`}>
            <Icon size={20} />
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${typeColor}`}>
            {template.type === 'release' ? 'Release' : 'Artist'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
          {template.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 flex-grow line-clamp-2">
          {template.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-text-muted pt-4 border-t border-border">
          <div className="flex items-center gap-1.5">
            <LucideIcons.Layers size={14} />
            <span>{template.phases.length} Phase{template.phases.length > 1 ? 'n' : ''}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <LucideIcons.CheckSquare size={14} />
            <span>{totalTasks} Task{totalTasks > 1 ? 's' : ''}</span>
          </div>
          {template.durationWeeks && (
            <div className="flex items-center gap-1.5">
              <LucideIcons.Calendar size={14} />
              <span>{template.durationWeeks} Wochen</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
