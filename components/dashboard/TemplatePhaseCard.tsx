'use client';

import {
  TemplatePhase,
  getCategoryColor,
  formatOffsetDays,
} from '@/lib/templates/types';
import * as LucideIcons from 'lucide-react';

interface TemplatePhaseCardProps {
  phase: TemplatePhase;
  phaseNumber: number;
}

export default function TemplatePhaseCard({
  phase,
  phaseNumber,
}: TemplatePhaseCardProps) {
  return (
    <div className="glass-card rounded-xl p-6">
      {/* Phase Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
          <span className="text-accent font-semibold">{phaseNumber}</span>
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-text-primary mb-1">
            {phase.title}
          </h3>
          {phase.description && (
            <p className="text-sm text-text-secondary">{phase.description}</p>
          )}
        </div>
      </div>

      {/* Tasks List */}
      {phase.tasks.length > 0 ? (
        <div className="space-y-3">
          {phase.tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-4 rounded-lg bg-surface-overlay/20 hover:bg-surface-overlay/40 transition-all group"
            >
              {/* Task Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <LucideIcons.Circle
                  size={16}
                  className="text-text-muted group-hover:text-accent transition-colors"
                />
              </div>

              {/* Task Content */}
              <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h4 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                    {task.title}
                  </h4>
                  {task.category && (
                    <span
                      className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium border ${getCategoryColor(
                        task.category
                      )}`}
                    >
                      {task.category}
                    </span>
                  )}
                </div>

                {task.description && (
                  <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                    {task.description}
                  </p>
                )}

                {/* Timing Info */}
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <LucideIcons.Clock size={12} />
                  <span>{formatOffsetDays(task.offsetDaysFromRelease)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-text-muted italic">Keine Tasks definiert</p>
      )}

      {/* Phase Summary */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-xs text-text-muted">
        <div className="flex items-center gap-1.5">
          <LucideIcons.CheckSquare size={14} />
          <span>{phase.tasks.length} Task{phase.tasks.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
}
