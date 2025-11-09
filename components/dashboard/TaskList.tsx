'use client';

import { useState } from 'react';
import { Task, TaskGroup } from '@/lib/types/dashboard';
import TaskCard from './TaskCard';

interface TaskListProps {
  taskGroups: TaskGroup[];
  completedTasks: Task[];
  onTaskComplete?: (id: string) => void;
  onTaskSnooze?: (id: string, hours: number) => void;
  onTaskDismiss?: (id: string) => void;
}

/**
 * TaskList Component
 *
 * Organizes tasks by release with:
 * - Accordion grouping by release
 * - Mini progress indicator (e.g., "3/7 Steps")
 * - Sorted by priority (critical first, then by due date)
 * - Collapsible "Erledigt (N)" section for completed tasks
 */
export default function TaskList({
  taskGroups,
  completedTasks,
  onTaskComplete,
  onTaskSnooze,
  onTaskDismiss,
}: TaskListProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(taskGroups.map((g) => g.releaseId))
  );
  const [showCompleted, setShowCompleted] = useState(false);

  // Toggle release group
  const toggleGroup = (releaseId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(releaseId)) {
      newExpanded.delete(releaseId);
    } else {
      newExpanded.add(releaseId);
    }
    setExpandedGroups(newExpanded);
  };

  // Sort tasks: Critical first, then by due date
  const sortTasks = (tasks: Task[]): Task[] => {
    return [...tasks].sort((a, b) => {
      // Critical tasks first
      if (a.priority === 'critical' && b.priority !== 'critical') return -1;
      if (a.priority !== 'critical' && b.priority === 'critical') return 1;

      // Then by due date (earlier first)
      if (a.dueDate && b.dueDate) {
        const dateA = typeof a.dueDate === 'string' ? new Date(a.dueDate) : a.dueDate;
        const dateB = typeof b.dueDate === 'string' ? new Date(b.dueDate) : b.dueDate;
        return dateA.getTime() - dateB.getTime();
      }

      return 0;
    });
  };

  return (
    <div className="space-y-3">
      {/* Task Groups by Release */}
      {taskGroups.map((group) => {
        const isExpanded = expandedGroups.has(group.releaseId);
        const sortedTasks = sortTasks(group.tasks);
        const progressPercent = Math.round((group.progress.completed / group.progress.total) * 100);

        return (
          <div key={group.releaseId} className="border border-border rounded-lg overflow-hidden">
            {/* Release Header */}
            <button
              onClick={() => toggleGroup(group.releaseId)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-surface-overlay/20 transition-colors group"
            >
              <div className="flex items-center gap-3">
                {/* Cover Art (if available) */}
                {group.coverArt && (
                  <img
                    src={group.coverArt}
                    alt={group.releaseName}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                )}

                <div className="text-left">
                  <h4 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {group.releaseName}
                  </h4>
                  <p className="text-xs text-text-muted">
                    {group.progress.completed}/{group.progress.total} Steps
                  </p>
                </div>
              </div>

              {/* Progress + Chevron */}
              <div className="flex items-center gap-3">
                {/* Mini Progress Bar */}
                <div className="w-20 h-1.5 bg-surface-overlay rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Chevron */}
                <svg
                  className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Tasks */}
            {isExpanded && (
              <div className="px-4 pb-3 space-y-2">
                {sortedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={onTaskComplete}
                    onSnooze={onTaskSnooze}
                    onDismiss={onTaskDismiss}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Completed Tasks Section */}
      {completedTasks.length > 0 && (
        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-surface-overlay/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-text-primary">
                Erledigt
              </h4>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-500/10 text-green-500">
                {completedTasks.length}
              </span>
            </div>

            <svg
              className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
                showCompleted ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showCompleted && (
            <div className="px-4 pb-3 space-y-2">
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
