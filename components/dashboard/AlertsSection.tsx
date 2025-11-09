'use client';

import { useState } from 'react';
import { Task, TaskGroup } from '@/lib/types/dashboard';
import TaskList from './TaskList';

/**
 * AlertsSection Component
 *
 * Displays prioritized tasks grouped by release:
 * - Uses TaskList component with grouping
 * - Sortiert tasks by priority and due date
 * - Shows completed tasks in collapsible section
 * - Mock data until API is available
 */

// TODO: Replace with real API data
const mockTaskGroups: TaskGroup[] = [
  {
    releaseId: 'release-1',
    releaseName: 'Midnight Dreams',
    coverArt: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=200&fit=crop',
    progress: {
      completed: 2,
      total: 4,
    },
    tasks: [
      {
        id: 'task-1',
        title: 'Cover Artwork hochladen',
        description: 'Upload läuft in 3 Tagen ab',
        priority: 'critical',
        status: 'pending',
        category: 'release',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        releaseId: 'release-1',
        releaseName: 'Midnight Dreams',
        createdAt: new Date(),
      },
      {
        id: 'task-2',
        title: 'Master-Datei Upload abschließen',
        description: 'Release gefährdet – Upload bis morgen erforderlich',
        priority: 'critical',
        status: 'pending',
        category: 'release',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        releaseId: 'release-1',
        releaseName: 'Midnight Dreams',
        createdAt: new Date(),
      },
    ],
  },
  {
    releaseId: 'release-2',
    releaseName: 'Summer Vibes',
    coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop',
    progress: {
      completed: 5,
      total: 6,
    },
    tasks: [
      {
        id: 'task-3',
        title: 'Pre-Save Kampagne finalisieren',
        description: 'Kampagne geht heute um 12:00 Uhr live',
        priority: 'high',
        status: 'pending',
        category: 'marketing',
        dueDate: new Date(), // Today
        releaseId: 'release-2',
        releaseName: 'Summer Vibes',
        createdAt: new Date(),
      },
    ],
  },
  {
    releaseId: 'release-3',
    releaseName: 'Ocean Waves',
    coverArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
    progress: {
      completed: 3,
      total: 7,
    },
    tasks: [
      {
        id: 'task-4',
        title: 'Playlist Pitch vorbereiten',
        description: 'Für Spotify Editorial Playlists',
        priority: 'medium',
        status: 'pending',
        category: 'distribution',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        releaseId: 'release-3',
        releaseName: 'Ocean Waves',
        createdAt: new Date(),
      },
    ],
  },
];

export default function AlertsSection() {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>(mockTaskGroups);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  // Count total active tasks
  const totalActiveTasks = taskGroups.reduce((sum, group) => sum + group.tasks.length, 0);

  // Handle task completion
  const handleTaskComplete = (taskId: string) => {
    // Find and remove task from groups, add to completed
    const updatedGroups = taskGroups.map((group) => ({
      ...group,
      tasks: group.tasks.filter((task) => {
        if (task.id === taskId) {
          // Add to completed
          setCompletedTasks((prev) => [
            ...prev,
            { ...task, status: 'completed', completedAt: new Date() },
          ]);
          // Update progress
          group.progress.completed += 1;
          return false;
        }
        return true;
      }),
    }));

    setTaskGroups(updatedGroups);
  };

  // Handle task snooze
  const handleTaskSnooze = (taskId: string, hours: number) => {
    const snoozeUntil = new Date(Date.now() + hours * 60 * 60 * 1000);

    const updatedGroups = taskGroups.map((group) => ({
      ...group,
      tasks: group.tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: 'snoozed' as const, snoozedUntil: snoozeUntil }
          : task
      ),
    }));

    setTaskGroups(updatedGroups);

    // TODO: In production, this would trigger an API call to update the task
    console.log(`Task ${taskId} snoozed until ${snoozeUntil.toLocaleString()}`);
  };

  // Handle task dismiss
  const handleTaskDismiss = (taskId: string) => {
    const updatedGroups = taskGroups.map((group) => ({
      ...group,
      tasks: group.tasks.filter((task) => task.id !== taskId),
    }));

    setTaskGroups(updatedGroups);

    // TODO: In production, this would trigger an API call to update the task
    console.log(`Task ${taskId} dismissed`);
  };

  if (totalActiveTasks === 0 && completedTasks.length === 0) {
    return null;
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-surface-overlay/20 transition-colors duration-150"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">
            Tasks
          </h3>
          {totalActiveTasks > 0 && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-accent/10 text-accent">
              {totalActiveTasks}
            </span>
          )}
        </div>
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
      </button>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-200 ease-in-out ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="p-4 pt-0">
          <TaskList
            taskGroups={taskGroups}
            completedTasks={completedTasks}
            onTaskComplete={handleTaskComplete}
            onTaskSnooze={handleTaskSnooze}
            onTaskDismiss={handleTaskDismiss}
          />
        </div>
      </div>
    </div>
  );
}
