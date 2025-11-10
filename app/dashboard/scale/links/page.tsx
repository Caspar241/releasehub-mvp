"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import * as LucideIcons from "lucide-react";

interface SmartLink {
  id: string;
  name: string;
  url: string;
  release: string;
  type: "link" | "presave";
  views: number;
  clicks: number;
  created: string;
}

const mockLinks: SmartLink[] = [
  {
    id: "1",
    name: "4L - All Platforms",
    url: "releasehub.to/mando47/4l",
    release: "4L",
    type: "link",
    views: 1247,
    clicks: 342,
    created: "2025-11-05",
  },
  {
    id: "2",
    name: "Beachclub Presave",
    url: "releasehub.to/presave/beachclub",
    release: "Beachclub",
    type: "presave",
    views: 856,
    clicks: 189,
    created: "2025-11-01",
  },
];

export default function SmartLinksPage() {
  const [links] = useState<SmartLink[]>(mockLinks);
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <DashboardLayout>
      <PageHeader
        title="Smart Links & Presaves"
        description="Erstelle Landing Pages und Presave-Kampagnen für deine Releases"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Scale" },
          { label: "Links" },
        ]}
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all duration-200 shadow-soft">
            <LucideIcons.PlusCircle size={18} strokeWidth={2} />
            New Smart Link
          </button>
        }
      />

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">Total Links:</span>
          <span className="text-sm font-semibold text-text-primary">{links.length}</span>
        </div>

        <div className="flex items-center gap-2 bg-surface-overlay rounded-lg p-1">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              view === "grid"
                ? "bg-accent text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <LucideIcons.LayoutGrid size={16} className="inline mr-1" />
            Grid
          </button>
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
        </div>
      </div>

      {/* Links Grid/List */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <div
              key={link.id}
              className="glass-card rounded-xl p-6 hover:bg-surface-overlay/40 transition-all cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${link.type === "presave" ? "bg-purple-500/10 border border-purple-500/20" : "bg-blue-500/10 border border-blue-500/20"}`}>
                  {link.type === "presave" ? (
                    <LucideIcons.Heart size={20} className="text-purple-400" />
                  ) : (
                    <LucideIcons.Link2 size={20} className="text-blue-400" />
                  )}
                </div>
                <button className="p-2 text-text-muted hover:text-accent opacity-0 group-hover:opacity-100 transition-all">
                  <LucideIcons.MoreVertical size={18} />
                </button>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-text-primary mb-1">{link.name}</h3>
              <p className="text-sm text-accent mb-4 truncate">{link.url}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-surface-overlay/40 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
                    <LucideIcons.Eye size={12} />
                    Views
                  </div>
                  <div className="text-lg font-bold text-text-primary">{link.views.toLocaleString()}</div>
                </div>
                <div className="bg-surface-overlay/40 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
                    <LucideIcons.MousePointerClick size={12} />
                    Clicks
                  </div>
                  <div className="text-lg font-bold text-text-primary">{link.clicks.toLocaleString()}</div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs text-text-muted">
                  Created {new Date(link.created).toLocaleDateString("de-DE")}
                </span>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all">
                    <LucideIcons.Copy size={16} />
                  </button>
                  <button className="p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all">
                    <LucideIcons.ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {links.map((link) => (
            <div
              key={link.id}
              className="glass-card rounded-xl p-4 hover:bg-surface-overlay/40 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl flex-shrink-0 ${link.type === "presave" ? "bg-purple-500/10 border border-purple-500/20" : "bg-blue-500/10 border border-blue-500/20"}`}>
                  {link.type === "presave" ? (
                    <LucideIcons.Heart size={20} className="text-purple-400" />
                  ) : (
                    <LucideIcons.Link2 size={20} className="text-blue-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary">{link.name}</h3>
                  <p className="text-xs text-accent truncate">{link.url}</p>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <div className="text-text-muted text-xs">Views</div>
                    <div className="font-semibold text-text-primary">{link.views.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-text-muted text-xs">Clicks</div>
                    <div className="font-semibold text-text-primary">{link.clicks.toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button className="p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all">
                    <LucideIcons.Copy size={16} />
                  </button>
                  <button className="p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all">
                    <LucideIcons.ExternalLink size={16} />
                  </button>
                  <button className="p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all">
                    <LucideIcons.MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
