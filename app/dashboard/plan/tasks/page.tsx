"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import * as LucideIcons from "lucide-react";

type TaskStatus = "todo" | "in_progress" | "done";
type TaskPriority = "low" | "medium" | "high";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  linkedEntity?: {
    type: "release" | "campaign";
    name: string;
    id: string;
  };
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Upload final master for '4L'",
    status: "todo",
    priority: "high",
    dueDate: "2025-11-12",
    linkedEntity: { type: "release", name: "4L", id: "rel-1" },
  },
  {
    id: "2",
    title: "Create presave campaign",
    status: "in_progress",
    priority: "high",
    dueDate: "2025-11-13",
    linkedEntity: { type: "release", name: "4L", id: "rel-1" },
  },
  {
    id: "3",
    title: "Submit Spotify pitch",
    status: "todo",
    priority: "medium",
    dueDate: "2025-11-14",
    linkedEntity: { type: "release", name: "Beachclub", id: "rel-2" },
  },
  {
    id: "4",
    title: "Design album artwork",
    status: "done",
    priority: "high",
    dueDate: "2025-11-10",
    linkedEntity: { type: "release", name: "4L", id: "rel-1" },
  },
  {
    id: "5",
    title: "Set up Meta Ads campaign",
    status: "todo",
    priority: "low",
    dueDate: "2025-11-20",
    linkedEntity: { type: "campaign", name: "4L Launch", id: "camp-1" },
  },
  {
    id: "6",
    title: "Create TikTok promo video",
    status: "in_progress",
    priority: "medium",
    dueDate: "2025-11-15",
  },
];

export default function TasksPage() {
  const [tasks] = useState<Task[]>(mockTasks);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">("all");
  const [view, setView] = useState<"list" | "kanban">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "todo":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "in_progress":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "done":
        return "bg-green-500/10 text-green-400 border-green-500/20";
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "low":
        return "text-text-muted";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-red-400";
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case "todo":
        return "To Do";
      case "in_progress":
        return "In Progress";
      case "done":
        return "Done";
    }
  };

  const todoTasks = filteredTasks.filter((t) => t.status === "todo");
  const inProgressTasks = filteredTasks.filter((t) => t.status === "in_progress");
  const doneTasks = filteredTasks.filter((t) => t.status === "done");

  return (
    <DashboardLayout>
      <PageHeader
        title="Aufgaben"
        description="Verwalte deine Tasks und Todos"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Planung" },
          { label: "Aufgaben" },
        ]}
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all duration-200 shadow-soft">
            <LucideIcons.PlusCircle size={18} strokeWidth={2} />
            New Task
          </button>
        }
      />

      {/* Filters & Search */}
      <div className="glass-card rounded-xl p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Left: Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TaskStatus | "all")}
              className="px-3 py-2 bg-surface-overlay border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | "all")}
              className="px-3 py-2 bg-surface-overlay border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            {/* Search */}
            <div className="relative">
              <LucideIcons.Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                size={16}
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-surface-overlay border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent w-64"
              />
            </div>
          </div>

          {/* Right: View Toggle */}
          <div className="flex items-center gap-2 bg-surface-overlay rounded-lg p-1">
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === "list"
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <LucideIcons.List size={16} className="inline mr-1" />
              List
            </button>
            <button
              onClick={() => setView("kanban")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === "kanban"
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <LucideIcons.LayoutGrid size={16} className="inline mr-1" />
              Kanban
            </button>
          </div>
        </div>
      </div>

      {/* List View */}
      {view === "list" && (
        <div className="space-y-2">
          {filteredTasks.length === 0 ? (
            <div className="glass-card rounded-xl p-12 text-center">
              <LucideIcons.CheckSquare className="mx-auto mb-4 text-text-muted" size={48} />
              <p className="text-text-secondary">No tasks found</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="glass-card rounded-xl p-4 hover:bg-surface-overlay/40 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className="mt-1">
                    <input
                      type="checkbox"
                      checked={task.status === "done"}
                      onChange={() => {}}
                      className="w-5 h-5 rounded border-2 border-border checked:bg-accent checked:border-accent cursor-pointer"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className={`text-sm font-medium ${task.status === "done" ? "line-through text-text-muted" : "text-text-primary"}`}>
                          {task.title}
                        </h3>
                        {task.linkedEntity && (
                          <p className="text-xs text-text-muted mt-1">
                            <span className="inline-flex items-center gap-1">
                              {task.linkedEntity.type === "release" ? (
                                <LucideIcons.Music size={12} />
                              ) : (
                                <LucideIcons.Megaphone size={12} />
                              )}
                              {task.linkedEntity.name}
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Priority */}
                        <LucideIcons.Flag
                          size={16}
                          className={getPriorityColor(task.priority)}
                        />

                        {/* Due Date */}
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <LucideIcons.Calendar size={12} />
                          {new Date(task.dueDate).toLocaleDateString("de-DE", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(task.status)}`}
                        >
                          {getStatusLabel(task.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Kanban View */}
      {view === "kanban" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* To Do Column */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">
                To Do
              </h3>
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md text-xs font-medium">
                {todoTasks.length}
              </span>
            </div>
            <div className="space-y-2">
              {todoTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-surface-overlay/40 rounded-lg p-3 hover:bg-surface-overlay/60 transition-all cursor-pointer"
                >
                  <h4 className="text-sm font-medium text-text-primary mb-2">
                    {task.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <LucideIcons.Calendar size={12} />
                      {new Date(task.dueDate).toLocaleDateString("de-DE", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <LucideIcons.Flag size={14} className={getPriorityColor(task.priority)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">
                In Progress
              </h3>
              <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded-md text-xs font-medium">
                {inProgressTasks.length}
              </span>
            </div>
            <div className="space-y-2">
              {inProgressTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-surface-overlay/40 rounded-lg p-3 hover:bg-surface-overlay/60 transition-all cursor-pointer"
                >
                  <h4 className="text-sm font-medium text-text-primary mb-2">
                    {task.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <LucideIcons.Calendar size={12} />
                      {new Date(task.dueDate).toLocaleDateString("de-DE", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <LucideIcons.Flag size={14} className={getPriorityColor(task.priority)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">
                Done
              </h3>
              <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-md text-xs font-medium">
                {doneTasks.length}
              </span>
            </div>
            <div className="space-y-2">
              {doneTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-surface-overlay/40 rounded-lg p-3 hover:bg-surface-overlay/60 transition-all cursor-pointer opacity-60"
                >
                  <h4 className="text-sm font-medium text-text-primary line-through mb-2">
                    {task.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <LucideIcons.Calendar size={12} />
                      {new Date(task.dueDate).toLocaleDateString("de-DE", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <LucideIcons.Flag size={14} className={getPriorityColor(task.priority)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
