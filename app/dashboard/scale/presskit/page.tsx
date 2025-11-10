"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import * as LucideIcons from "lucide-react";

interface PressKit {
  id: string;
  name: string;
  artist: string;
  style: "minimal" | "magazine" | "dark" | "festival";
  lastEdited: string;
  published: boolean;
}

const mockPressKits: PressKit[] = [
  {
    id: "1",
    name: "Mando47 Official EPK",
    artist: "Mando47",
    style: "dark",
    lastEdited: "2025-11-08",
    published: true,
  },
  {
    id: "2",
    name: "4L Release Kit",
    artist: "Mando47",
    style: "minimal",
    lastEdited: "2025-11-05",
    published: false,
  },
];

export default function PressKitPage() {
  const [pressKits] = useState<PressKit[]>(mockPressKits);

  const getStyleColor = (style: string) => {
    const colors: Record<string, string> = {
      minimal: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      magazine: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      dark: "bg-gray-500/10 text-gray-400 border-gray-500/20",
      festival: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    };
    return colors[style] || colors.minimal;
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Press Kit Builder"
        description="Erstelle professionelle Electronic Press Kits (EPK) für deine Musik"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Scale" },
          { label: "Press Kit" },
        ]}
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all duration-200 shadow-soft">
            <LucideIcons.PlusCircle size={18} strokeWidth={2} />
            New Press Kit
          </button>
        }
      />

      {/* Press Kits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {pressKits.map((kit) => (
          <div
            key={kit.id}
            className="glass-card rounded-xl p-6 hover:bg-surface-overlay/40 transition-all cursor-pointer group"
          >
            {/* Preview Mockup */}
            <div className="aspect-video bg-surface-overlay/60 rounded-lg mb-4 flex items-center justify-center border border-border group-hover:border-accent/30 transition-all">
              <LucideIcons.FileText size={48} className="text-text-muted" />
            </div>

            {/* Content */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-accent transition-colors">
                  {kit.name}
                </h3>
                <p className="text-sm text-text-secondary">{kit.artist}</p>
              </div>
              {kit.published && (
                <span className="flex-shrink-0 px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md text-xs font-medium">
                  Published
                </span>
              )}
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
              <span className={`px-2 py-1 rounded-md border ${getStyleColor(kit.style)}`}>
                {kit.style}
              </span>
              <span className="flex items-center gap-1">
                <LucideIcons.Clock size={12} />
                Edited {new Date(kit.lastEdited).toLocaleDateString("de-DE", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <button className="flex-1 px-3 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-all">
                <LucideIcons.Edit size={14} className="inline mr-1" />
                Edit
              </button>
              <button className="p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all">
                <LucideIcons.ExternalLink size={18} />
              </button>
              <button className="p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all">
                <LucideIcons.Download size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Features Overview */}
      <div className="glass-card rounded-xl p-8">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Was ist in einem Press Kit enthalten?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 rounded-xl">
              <LucideIcons.User size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">Artist Bio</h3>
              <p className="text-sm text-text-secondary">
                Professional biography and story
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 rounded-xl">
              <LucideIcons.Image size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">Press Photos</h3>
              <p className="text-sm text-text-secondary">
                High-res images and artwork
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 rounded-xl">
              <LucideIcons.Music size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">Music</h3>
              <p className="text-sm text-text-secondary">
                Embedded players and downloads
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 rounded-xl">
              <LucideIcons.Quote size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">Press Quotes</h3>
              <p className="text-sm text-text-secondary">
                Reviews and testimonials
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 rounded-xl">
              <LucideIcons.Share2 size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">Social Links</h3>
              <p className="text-sm text-text-secondary">
                All platforms and contacts
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 rounded-xl">
              <LucideIcons.Download size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">PDF Export</h3>
              <p className="text-sm text-text-secondary">
                Downloadable press kit
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
