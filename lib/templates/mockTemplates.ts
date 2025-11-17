import { Template } from "./types";

export const MOCK_TEMPLATES: Template[] = [
  {
    id: "8-week-single-release",
    name: "8-Wochen Single Release Plan",
    type: "release",
    description:
      "Strukturierter 8-Wochen-Plan für einen Single-Release – von Strategie über Distribution bis Post-Release.",
    durationWeeks: 8,
    phases: [
      {
        id: "phase-1-strategy",
        title: "Phase 1 – Strategy & Planning",
        description: "Grundlage für einen erfolgreichen Release definieren.",
        order: 1,
        tasks: [
          {
            id: "p1-t1",
            title: "Release-Ziel definieren",
            description:
              "Streams, Follower-Growth und Fokusplattformen festlegen.",
            category: "strategy",
            offsetDaysFromRelease: -56,
          },
          {
            id: "p1-t2",
            title: "Song final beurteilen",
            description: "Check, ob Mix/Master industry-ready ist.",
            category: "audio",
            offsetDaysFromRelease: -56,
          },
          {
            id: "p1-t3",
            title: "Credits & Beteiligte sammeln",
            description:
              "Produzenten, Writer, Feats, Split-Infos festhalten.",
            category: "admin",
            offsetDaysFromRelease: -49,
          },
          {
            id: "p1-t4",
            title: "Cover-Konzept definieren",
            description:
              "Moodboard, Referenzen, grobe Stilrichtung festlegen.",
            category: "visuals",
            offsetDaysFromRelease: -49,
          },
        ],
      },
      {
        id: "phase-2-production",
        title: "Phase 2 – Audio & Visual Finalization",
        description: "Song und Key-Visuals finalisieren.",
        order: 2,
        tasks: [
          {
            id: "p2-t1",
            title: "Final Mix & Master abnehmen",
            description: "Letzte Revision freigeben, Referenz-Check.",
            category: "audio",
            offsetDaysFromRelease: -42,
          },
          {
            id: "p2-t2",
            title: "Cover finalisieren",
            description: "Endgültiges Artwork für DSPs (3000x3000px etc.).",
            category: "visuals",
            offsetDaysFromRelease: -42,
          },
          {
            id: "p2-t3",
            title: "Visual Assets planen",
            description:
              "Ideen für Snippets, Reels, ggf. Musikvideo definieren.",
            category: "content",
            offsetDaysFromRelease: -35,
          },
        ],
      },
      {
        id: "phase-3-distribution",
        title: "Phase 3 – Distribution Prep",
        description: "Release beim Distributor anlegen und Pitch vorbereiten.",
        order: 3,
        tasks: [
          {
            id: "p3-t1",
            title: "Release beim Distributor einreichen",
            description: "WAV, Cover, Metadaten, Splits im System anlegen.",
            category: "distribution",
            offsetDaysFromRelease: -28,
          },
          {
            id: "p3-t2",
            title: "ISRC / UPC prüfen",
            description:
              "Codes generieren oder übernehmen, auf Richtigkeit prüfen.",
            category: "admin",
            offsetDaysFromRelease: -28,
          },
          {
            id: "p3-t3",
            title: "DSP-Pitch vorbereiten",
            description:
              "Pitch-Text für Spotify/Apple etc. ausformulieren.",
            category: "marketing",
            offsetDaysFromRelease: -21,
          },
        ],
      },
      {
        id: "phase-4-pre-release",
        title: "Phase 4 – Pre-Release Build-Up",
        description: "Awareness & erste Snippet-Phase.",
        order: 4,
        tasks: [
          {
            id: "p4-t1",
            title: "Snippets auswählen",
            description: "2–3 starke Stellen aus dem Song definieren.",
            category: "content",
            offsetDaysFromRelease: -21,
          },
          {
            id: "p4-t2",
            title: "Content-Plan finalisieren",
            description:
              "Welche Snippets an welchen Tagen auf welchen Plattformen.",
            category: "content",
            offsetDaysFromRelease: -14,
          },
          {
            id: "p4-t3",
            title: "PreSave-Link vorbereiten (Platzhalter)",
            description:
              "Platzhalter für spätere automatische Generierung via API.",
            category: "marketing",
            offsetDaysFromRelease: -14,
          },
        ],
      },
      {
        id: "phase-5-marketing-setup",
        title: "Phase 5 – Marketing Setup",
        description: "Release-Week-Inhalte und Kampagnen vorbereiten.",
        order: 5,
        tasks: [
          {
            id: "p5-t1",
            title: "Release-Day Assets erstellen",
            description: "Feed-Posts, Story-Grafiken, Captions vorbereiten.",
            category: "marketing",
            offsetDaysFromRelease: -7,
          },
          {
            id: "p5-t2",
            title: "Paid-Kampagne planen (optional)",
            description: "Budget, Zielgruppe, Creatives definieren.",
            category: "marketing",
            offsetDaysFromRelease: -7,
          },
        ],
      },
      {
        id: "phase-6-release-week",
        title: "Phase 6 – Release Week Execution",
        description: "Release-Tag und erste Tage nach Veröffentlichung.",
        order: 6,
        tasks: [
          {
            id: "p6-t1",
            title: "Release posten (alle Plattformen)",
            description: "Spotify-Link, Smart-Link, Cover posten.",
            category: "content",
            offsetDaysFromRelease: 0,
          },
          {
            id: "p6-t2",
            title: "Stories & Snippets am Release-Tag posten",
            description: "IG/TikTok/Twitter Push.",
            category: "content",
            offsetDaysFromRelease: 0,
          },
          {
            id: "p6-t3",
            title: "Playlist-Adds & erste Zahlen checken",
            description: "Erste Stats dokumentieren.",
            category: "analytics",
            offsetDaysFromRelease: 1,
          },
        ],
      },
      {
        id: "phase-7-post-release",
        title: "Phase 7 – Post-Release Growth & Review",
        description: "Song-Lebensdauer verlängern und Learnings sichern.",
        order: 7,
        tasks: [
          {
            id: "p7-t1",
            title: "Afterglow-Content planen",
            description: "Weitere Snippets, Reactions, UGC-Ideen.",
            category: "content",
            offsetDaysFromRelease: 7,
          },
          {
            id: "p7-t2",
            title: "Week-1 Analytics auswerten",
            description:
              "Streams, Saves, Playlists, Follower-Growth analysieren.",
            category: "analytics",
            offsetDaysFromRelease: 7,
          },
          {
            id: "p7-t3",
            title: "Release-Review dokumentieren",
            description:
              "Was hat funktioniert, was nicht, was nehmen wir mit.",
            category: "strategy",
            offsetDaysFromRelease: 28,
          },
        ],
      },
    ],
  },
  {
    id: "weekly-artist-management",
    name: "Weekly Artist Management",
    type: "artist",
    description:
      "Wöchentlicher Management-Check für einen Artist (Stats, Content, Pipeline, Admin).",
    durationWeeks: null,
    phases: [
      {
        id: "phase-weekly-core",
        title: "Weekly Core Check",
        description: "Standard-Check für jede Woche.",
        order: 1,
        tasks: [
          {
            id: "w1-t1",
            title: "Stats checken & notieren",
            description:
              "Spotify ML, Streams 7/28d, IG/TikTok Follower & Views grob erfassen.",
            category: "analytics",
          },
          {
            id: "w1-t2",
            title: "Content-Woche planen",
            description: "3–5 grobe Content-Ideen (TikTok/IG) definieren.",
            category: "content",
          },
          {
            id: "w1-t3",
            title: "Release-/Song-Pipeline prüfen",
            description:
              "Welche Songs sind ready, was sind die nächsten Schritte?",
            category: "strategy",
          },
          {
            id: "w1-t4",
            title: "Admin & Kommunikation",
            description:
              "Wichtige E-Mails/DMs beantworten (Booker, Producer, Kollabo-Anfragen).",
            category: "admin",
          },
          {
            id: "w1-t5",
            title: "Highlight der Woche festlegen",
            description:
              'Eine Hauptpriorität definieren (z.B. „Hook aufnehmen", „Video drehen").',
            category: "strategy",
          },
        ],
      },
    ],
  },
];

// Helper function to get template by ID
export function getTemplateById(id: string): Template | undefined {
  return MOCK_TEMPLATES.find((template) => template.id === id);
}

// Helper function to filter templates by type
export function getTemplatesByType(
  type?: "release" | "artist"
): Template[] {
  if (!type) return MOCK_TEMPLATES;
  return MOCK_TEMPLATES.filter((template) => template.type === type);
}

// Helper function to count total tasks in a template
export function getTotalTaskCount(template: Template): number {
  return template.phases.reduce(
    (total, phase) => total + phase.tasks.length,
    0
  );
}
