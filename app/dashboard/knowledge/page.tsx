"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import * as LucideIcons from "lucide-react";

interface Category {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof LucideIcons;
  articleCount: number;
  color: string;
}

const categories: Category[] = [
  {
    id: "guides",
    title: "Release Guides",
    description: "Step-by-step Anleitungen für erfolgreiche Releases",
    icon: "BookOpen",
    articleCount: 12,
    color: "blue",
  },
  {
    id: "templates",
    title: "Templates & Downloads",
    description: "Vorlagen für Artwork, Press Kits und Marketing Materials",
    icon: "Download",
    articleCount: 8,
    color: "purple",
  },
  {
    id: "best-practices",
    title: "Best Practices",
    description: "Bewährte Strategien für Marketing und Distribution",
    icon: "Lightbulb",
    articleCount: 15,
    color: "yellow",
  },
  {
    id: "glossary",
    title: "Glossar",
    description: "Begriffe und Definitionen aus der Musikindustrie",
    icon: "BookText",
    articleCount: 45,
    color: "green",
  },
  {
    id: "platform-guides",
    title: "Platform Guides",
    description: "Spezifische Anleitungen für Spotify, Apple Music, etc.",
    icon: "Globe",
    articleCount: 10,
    color: "cyan",
  },
  {
    id: "updates",
    title: "Updates & News",
    description: "Neuigkeiten und Feature-Updates von ReleaseHub",
    icon: "Newspaper",
    articleCount: 20,
    color: "orange",
  },
];

const featuredArticles = [
  {
    id: "1",
    title: "Der perfekte Spotify Pitch",
    category: "guides",
    readTime: "8 min",
    icon: "FileText",
  },
  {
    id: "2",
    title: "TikTok Marketing Strategie 2025",
    category: "best-practices",
    readTime: "12 min",
    icon: "TrendingUp",
  },
  {
    id: "3",
    title: "Artwork Spezifikationen",
    category: "templates",
    readTime: "5 min",
    icon: "Image",
  },
];

export default function KnowledgeHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const popularTags = [
    "Spotify",
    "Marketing",
    "Distribution",
    "TikTok",
    "Playlisting",
    "Metadata",
    "Royalties",
    "Press Kit",
  ];

  const getCategoryColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      green: "bg-green-500/10 text-green-400 border-green-500/20",
      cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    };
    return colors[color] || colors.blue;
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Knowledge Hub"
        description="Guides, Templates und Best Practices für Independent Artists"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Knowledge Hub" },
        ]}
      />

      {/* Search & Tags */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <div className="relative mb-4">
          <LucideIcons.Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
            size={20}
          />
          <input
            type="text"
            placeholder="Suche nach Guides, Templates, Best Practices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-overlay border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-text-secondary">Popular:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedTag === tag
                  ? "bg-accent text-white"
                  : "bg-surface-overlay text-text-secondary hover:text-accent hover:bg-surface-overlay/80"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-text-primary mb-4">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredArticles.map((article) => {
            const Icon = LucideIcons[article.icon as keyof typeof LucideIcons] as React.ComponentType<{
              size?: number;
              className?: string;
            }>;

            return (
              <div
                key={article.id}
                className="glass-card rounded-xl p-5 hover:bg-surface-overlay/40 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    {Icon && <Icon size={20} className="text-accent" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <LucideIcons.Clock size={12} />
                  {article.readTime}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Categories Grid */}
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const Icon = LucideIcons[category.icon] as React.ComponentType<{
              size?: number;
              className?: string;
            }>;

            return (
              <div
                key={category.id}
                className="glass-card rounded-xl p-6 hover:bg-surface-overlay/40 transition-all cursor-pointer group"
              >
                <div className={`inline-flex p-3 rounded-xl border mb-4 ${getCategoryColor(category.color)}`}>
                  {Icon && <Icon size={24} />}
                </div>

                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4">{category.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">
                    {category.articleCount} {category.articleCount === 1 ? "Article" : "Articles"}
                  </span>
                  <LucideIcons.ArrowRight
                    size={18}
                    className="text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Help CTA */}
      <div className="glass-card rounded-xl p-8 mt-8 text-center border border-accent/20 bg-accent/5">
        <LucideIcons.HelpCircle className="mx-auto mb-4 text-accent" size={48} />
        <h3 className="text-xl font-bold text-text-primary mb-2">
          Findest du nicht was du suchst?
        </h3>
        <p className="text-text-secondary mb-6">
          Unser Support-Team hilft dir gerne weiter
        </p>
        <a
          href="/dashboard/support"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all shadow-soft"
        >
          <LucideIcons.MessageCircle size={18} />
          Kontaktiere Support
        </a>
      </div>
    </DashboardLayout>
  );
}
