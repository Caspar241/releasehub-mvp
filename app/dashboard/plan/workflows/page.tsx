"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import * as LucideIcons from "lucide-react";

type TemplateType = "single" | "ep" | "album" | "campaign" | "content" | "custom";

interface WorkflowTemplate {
  id: string;
  name: string;
  type: TemplateType;
  steps: number;
  tags: string[];
  description: string;
}

const mockTemplates: WorkflowTemplate[] = [
  {
    id: "1",
    name: "Single Release Checklist",
    type: "single",
    steps: 12,
    tags: ["release", "distribution", "marketing"],
    description: "Complete workflow for releasing a single track",
  },
  {
    id: "2",
    name: "EP Release Plan",
    type: "ep",
    steps: 18,
    tags: ["release", "playlisting"],
    description: "Multi-track EP release with pitch schedule",
  },
  {
    id: "3",
    name: "Album Launch Campaign",
    type: "album",
    steps: 25,
    tags: ["release", "marketing", "press"],
    description: "Full album rollout with press kit and campaigns",
  },
  {
    id: "4",
    name: "TikTok Campaign",
    type: "campaign",
    steps: 8,
    tags: ["marketing", "social"],
    description: "TikTok promotion campaign workflow",
  },
  {
    id: "5",
    name: "Content Calendar",
    type: "content",
    steps: 10,
    tags: ["content", "social"],
    description: "Monthly content planning and scheduling",
  },
];

export default function WorkflowsPage() {
  const [templates] = useState<WorkflowTemplate[]>(mockTemplates);
  const [filterType, setFilterType] = useState<TemplateType | "all">("all");

  const filteredTemplates = templates.filter(
    (t) => filterType === "all" || t.type === filterType
  );

  const getTypeColor = (type: TemplateType) => {
    switch (type) {
      case "single":
      case "ep":
      case "album":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "campaign":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "content":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "custom":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  };

  const getTypeIcon = (type: TemplateType) => {
    switch (type) {
      case "single":
      case "ep":
      case "album":
        return <LucideIcons.Music size={20} />;
      case "campaign":
        return <LucideIcons.Megaphone size={20} />;
      case "content":
        return <LucideIcons.FileText size={20} />;
      case "custom":
        return <LucideIcons.Star size={20} />;
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Vorlagen & Workflows"
        description="Wiederverwendbare Prozess-Templates für Releases und Kampagnen"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Planung" },
          { label: "Workflows" },
        ]}
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all duration-200 shadow-soft">
            <LucideIcons.PlusCircle size={18} strokeWidth={2} />
            New Template
          </button>
        }
      />

      {/* Filter */}
      <div className="glass-card rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-text-secondary">Type:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as TemplateType | "all")}
            className="px-3 py-2 bg-surface-overlay border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">All Types</option>
            <option value="single">Single</option>
            <option value="ep">EP</option>
            <option value="album">Album</option>
            <option value="campaign">Campaign</option>
            <option value="content">Content</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="glass-card rounded-xl p-6 hover:bg-surface-overlay/40 transition-all cursor-pointer group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-xl border ${getTypeColor(template.type)}`}
              >
                {getTypeIcon(template.type)}
              </div>
              <button className="p-2 text-text-muted hover:text-accent opacity-0 group-hover:opacity-100 transition-all">
                <LucideIcons.MoreVertical size={18} />
              </button>
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {template.name}
            </h3>
            <p className="text-sm text-text-secondary mb-4">{template.description}</p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
              <span className="flex items-center gap-1">
                <LucideIcons.CheckSquare size={14} />
                {template.steps} Steps
              </span>
              <span className="flex items-center gap-1">
                <LucideIcons.Tag size={14} />
                {template.tags.length} Tags
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {template.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-surface-overlay rounded-md text-xs text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <button className="flex-1 px-3 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-all">
                Apply to Tasks
              </button>
              <button className="p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all">
                <LucideIcons.Edit size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="glass-card rounded-xl p-12 text-center">
          <LucideIcons.Workflow className="mx-auto mb-4 text-text-muted" size={48} />
          <p className="text-text-secondary">No templates found for this filter</p>
        </div>
      )}
    </DashboardLayout>
  );
}
