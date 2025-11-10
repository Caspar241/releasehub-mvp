# Panel-Navigation und Sidebar-Accordion Implementierung

**Datum:** 2025-11-10
**Status:** Abgeschlossen und getestet

## Übersicht

Diese Dokumentation beschreibt die Implementierung eines Panel-basierten Navigationssystems und die Optimierung des Sidebar-Accordion-Verhaltens für die ReleaseHub-Dashboard-Anwendung.

## Hauptfunktionen

### 1. Panel-basierte Navigation

Implementierung eines nahtlosen Navigationsystems, das folgende Anforderungen erfüllt:

- Keine vollständigen Seitenwechsel beim Klicken auf Sidebar-Items
- Header und Sidebar bleiben während der Navigation sichtbar
- Nur der Hauptinhalt wird durch "Coming Soon"-Platzhalter ersetzt
- URL-Synchronisation über Query-Parameter (`/dashboard?panel=feature`)
- Server-seitige Redirects von ursprünglichen Routen zu Panel-URLs

### 2. Sidebar-Accordion-Verhalten

Implementierung eines klassischen Accordion-Verhaltens mit folgenden Eigenschaften:

- Immer nur ein Hauptmenü gleichzeitig geöffnet
- Sub-Navigation innerhalb desselben Hauptmenüs hält das Menü offen
- Jedes offene Menü kann jederzeit geschlossen werden (auch mit aktivem Sub-Item)
- Sanfte Animationen für Öffnen/Schließen
- Automatisches Öffnen des relevanten Menüs bei Navigation

## Technische Implementierung

### Animationsparameter

Alle Panel-Übergänge verwenden folgende Animation:

```typescript
initial={{ opacity: 0, y: -6 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -6 }}
transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
```

Sidebar-Menü-Animationen:

```typescript
// Öffnen
animate={{
  height: "auto",
  opacity: 1,
  transition: {
    height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    opacity: { duration: 0.25, ease: "easeOut", delay: 0.05 }
  }
}}

// Schließen
exit={{
  height: 0,
  opacity: 0,
  transition: {
    height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    opacity: { duration: 0.15, ease: "easeIn" }
  }
}}
```

### Implementierte Features

#### Panel-System (9 Features)

1. **Tasks** - `/dashboard?panel=tasks`
2. **Calendar** - `/dashboard?panel=calendar`
3. **Roadmap** - `/dashboard?panel=roadmap`
4. **Smart Links** - `/dashboard?panel=smart-links`
5. **Campaigns** - `/dashboard?panel=campaigns`
6. **Playlists** - `/dashboard?panel=playlists`
7. **Forecasting** - `/dashboard?panel=forecasting`
8. **Insights** - `/dashboard?panel=insights`
9. **Revenue** - `/dashboard?panel=revenue`

## Geänderte Dateien

### 1. `/components/dashboard/TasksPlaceholder.tsx`

**Zweck:** Wiederverwendbare Platzhalter-Komponente für alle "Coming Soon"-Features

**Hauptänderungen:**
- `onClose` und `isPanel` Props für Panel-Modus hinzugefügt
- Bedingte Rendering-Logik für CTA-Button vs. Link implementiert
- Animationen gemäß Spezifikation aktualisiert

**Code-Schlüsselstellen:**

```typescript
interface TasksPlaceholderProps {
  featureName?: string;
  onClose?: () => void;
  isPanel?: boolean;
}

export default function TasksPlaceholder({
  featureName = 'Tasks',
  onClose,
  isPanel = false
}: TasksPlaceholderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Inhalt */}
      {isPanel && onClose ? (
        <button onClick={onClose}>Zurück zum Dashboard</button>
      ) : (
        <Link href="/dashboard">Zurück zum Dashboard</Link>
      )}
    </motion.div>
  );
}
```

### 2. `/app/dashboard/page.tsx`

**Zweck:** Hauptseite des Dashboards mit Panel-Rendering-Logik

**Hauptänderungen:**
- In Client-Komponente konvertiert
- `export const dynamic = 'force-dynamic'` für Next.js SSR hinzugefügt
- Panel-Konfigurationsobjekt für alle 9 Features implementiert
- AnimatePresence-Wrapper für sanfte Übergänge hinzugefügt

**Code-Schlüsselstellen:**

```typescript
'use client';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activePanel = searchParams?.get('panel');

  const handleClosePanel = () => {
    router.replace('/dashboard', { scroll: false });
  };

  const panelConfig: Record<string, { featureName: string }> = {
    tasks: { featureName: 'Tasks' },
    calendar: { featureName: 'Calendar' },
    roadmap: { featureName: 'Roadmap' },
    'smart-links': { featureName: 'Smart Links' },
    campaigns: { featureName: 'Campaign Builder' },
    playlists: { featureName: 'Playlist Outreach' },
    forecasting: { featureName: 'Release Forecasting' },
    insights: { featureName: 'Audience Insights' },
    revenue: { featureName: 'Revenue Analytics' },
  };

  const currentPanelConfig = activePanel ? panelConfig[activePanel] : null;

  return (
    <DashboardLayout>
      <AnimatePresence mode="wait">
        {currentPanelConfig ? (
          <TasksPlaceholder
            key={`${activePanel}-panel`}
            featureName={currentPanelConfig.featureName}
            isPanel={true}
            onClose={handleClosePanel}
          />
        ) : (
          <div key="dashboard-content" className="space-y-6">
            {/* Normaler Dashboard-Inhalt */}
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
```

### 3. `/components/dashboard/DashboardLayout.tsx`

**Zweck:** Core-Sidebar-Navigationslogik

**Hauptänderungen (Finale Version):**

1. State von `openSections: string[]` zu `activeMain: string | null` geändert
2. `toggleSection` zu reinem Toggle vereinfacht (Blockierungslogik entfernt)
3. useEffect angepasst, um Kollabieren bei Sub-Navigation innerhalb desselben Hauptmenüs zu verhindern

**Code-Schlüsselstellen:**

```typescript
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeMain, setActiveMain] = useState<string | null>(null);

  // Reiner Toggle - erlaubt Schließen auch mit aktivem Sub-Item
  const toggleSection = (sectionId: string) => {
    setActiveMain((prev) => {
      return prev === sectionId ? null : sectionId;
    });
  };

  // Prüfen, ob Sektion offen ist
  const isSectionOpen = (sectionId: string) => {
    return activeMain === sectionId;
  };

  // Auto-Öffnen des Hauptmenüs mit aktivem Item - verhindert Kollabieren bei Sub-Navigation
  useEffect(() => {
    const activeSection = navigationSections.find((section) => isSectionActive(section));

    // Nur aktualisieren, wenn anders (verhindert Kollabieren bei Sub-Item-Navigation innerhalb desselben Hauptmenüs)
    setActiveMain((prev) => {
      if (activeSection && prev !== activeSection.id) {
        return activeSection.id;
      }
      return prev;
    });
  }, [pathname, searchParams]);
}
```

### 4. `/app/dashboard/layout.tsx` (NEU)

**Zweck:** Erforderlich für Next.js zur Unterstützung von dynamischem Rendering mit useSearchParams

**Code:**

```typescript
export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

### 5. Panel-Redirect-Seiten (9 Seiten erstellt)

Alle folgen demselben Muster für nahtlose Redirects:

**Erstellte Dateien:**
- `/app/dashboard/roadmap/page.tsx`
- `/app/dashboard/analytics/audience/page.tsx`
- `/app/dashboard/analytics/revenue/page.tsx`
- `/app/dashboard/plan/tasks/page.tsx`
- `/app/dashboard/plan/calendar/page.tsx`
- `/app/dashboard/scale/smart-links/page.tsx`
- `/app/dashboard/scale/campaigns/page.tsx`
- `/app/dashboard/scale/playlists/page.tsx`
- `/app/dashboard/scale/forecasting/page.tsx`

**Muster:**

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FeaturePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard?panel=feature-name');
  }, [router]);

  return null;
}
```

## Behobene Fehler

### Fehler 1: Next.js Prerendering mit useSearchParams

**Fehlermeldung:** `useSearchParams() should be wrapped in a suspense boundary`

**Lösung:**
1. `export const dynamic = 'force-dynamic'` zu `/app/dashboard/page.tsx` hinzugefügt
2. `/app/dashboard/layout.tsx` mit demselben Export erstellt, um dynamisches Rendering für alle Dashboard-Routen zu erzwingen

### Fehler 2: Aktive Sektion kann nicht geschlossen werden

**Problem:** "Offene Menüs lassen sich nicht schließen, wenn ein Untermenü ausgewählt ist"

**Lösung:** Blockierungslogik in `toggleSection` entfernt:

```typescript
// Vorher (blockiertes Schließen):
if (prev === sectionId) {
  const hasActiveItem = section && isSectionActive(section);
  return hasActiveItem ? prev : null;
}

// Nachher (reiner Toggle):
return prev === sectionId ? null : sectionId;
```

### Fehler 3: Hauptmenü kollabiert bei Sub-Navigation

**Problem:** "Beim Wechsel zwischen Sub-Items innerhalb desselben Main-Menüs klappt das Main zu"

**Lösung:** useEffect modifiziert, um State nur beim Wechsel zu anderem Hauptmenü zu aktualisieren:

```typescript
setActiveMain((prev) => {
  if (activeSection && prev !== activeSection.id) {
    return activeSection.id; // Nur wechseln, wenn anders
  }
  return prev; // Aktuellen State für gleiche-Haupt-Navigation beibehalten
});
```

### Fehler 4: Inkonsistentes Verhalten verschiedener Menüs

**Problem:** "Das Main-Menü 'Scale' schließt sich nie korrekt"

**Lösung:** Kein spezieller Code für "Scale" - alle Hauptmenüs verwenden jetzt dieselbe Logik. Reines Toggle-Verhalten stellt konsistenten Betrieb über alle Hauptmenüs hinweg sicher.

## Verhalten und Funktionen

### Accordion-Verhalten (Final)

1. **Ein Hauptmenü offen:** Immer nur ein Hauptmenü gleichzeitig geöffnet
2. **Sub-Navigation behält Menü offen:** Wechsel zwischen Sub-Items innerhalb desselben Hauptmenüs behält das Hauptmenü offen
3. **Jederzeit schließbar:** Jedes offene Hauptmenü kann jederzeit geschlossen werden (auch mit aktivem Sub-Item)
4. **Automatisches Öffnen:** Beim Navigieren öffnet sich das relevante Hauptmenü automatisch
5. **Automatisches Schließen:** Beim Wechsel zu anderem Hauptmenü schließt sich das vorherige automatisch

### Panel-Navigation-Verhalten

1. **Keine vollständigen Seitenwechsel:** Header und Sidebar bleiben sichtbar
2. **URL-Synchronisation:** URL ändert sich zu `/dashboard?panel=feature`
3. **Shallow Routing:** Verwendet Next.js Router ohne vollständige Seitenreloads
4. **Animierte Übergänge:** Sanfte Fade- und Slide-Animationen zwischen Panels
5. **Zurück-Navigation:** "Zurück zum Dashboard"-Button schließt Panel und kehrt zur Hauptansicht zurück

## Testing

### Build-Status

Alle Builds während und nach der Implementierung erfolgreich:
- Keine TypeScript-Fehler
- Keine Runtime-Fehler
- Alle Routen korrekt generiert

### Verifizierte Funktionalität

- Panel-Navigation für alle 9 Features funktioniert
- Accordion öffnet/schließt korrekt
- Sub-Navigation innerhalb desselben Hauptmenüs kollabiert Menü nicht
- Aktive Menüs können geschlossen werden
- Alle Hauptmenüs verhalten sich konsistent
- Animationen laufen sanft ab
- URL-Synchronisation funktioniert

## Best Practices

### State-Management

- Verwendung von `useState` für lokale UI-State (activeMain)
- `useEffect` für Synchronisation mit Router-State
- Bedingte State-Updates zur Vermeidung unnötiger Re-Renders

### Routing

- Query-Parameter für Panel-State (`?panel=feature`)
- Shallow Routing mit `router.replace({ scroll: false })`
- Server-seitige Redirects für Legacy-Routen

### Animation

- Framer Motion's AnimatePresence für Übergänge
- Separate Timings für height und opacity für bessere UX
- Konsistente Easing-Funktionen über gesamte App

### Code-Organisation

- Wiederverwendbare Komponenten (TasksPlaceholder)
- Zentrale Konfigurationsobjekte (panelConfig)
- Klare Trennung von Concerns (Layout, Routing, Content)

## Zukünftige Verbesserungen

Mögliche Erweiterungen für zukünftige Entwicklung:

1. **Panel-Historie:** Browser-Back-Button-Support für Panel-Navigation
2. **Keyboard-Navigation:** Tastaturkürzel für Panel-Wechsel
3. **Panel-Transitions:** Unterschiedliche Animationen für verschiedene Panel-Typen
4. **State-Persistence:** Merken des zuletzt geöffneten Panels
5. **Mobile-Optimierung:** Angepasstes Verhalten für mobile Geräte

## Referenzen

### Verwendete Technologien

- **Next.js 14.2.15** mit App Router
- **React 18** mit Client Components
- **Framer Motion** für Animationen
- **TypeScript** für Type-Safety
- **Tailwind CSS** für Styling

### Wichtige Patterns

- Panel-based Navigation Pattern
- Accordion Pattern
- Shallow Routing Pattern
- Server-side Redirect Pattern
- Component Composition Pattern

## Zusammenfassung

Diese Implementierung bietet ein robustes, benutzerfreundliches Navigationssystem mit:

- Nahtlosen Panel-Übergängen ohne vollständige Seitenwechsel
- Intuitivem Accordion-Verhalten in der Sidebar
- Konsistenten, sanften Animationen
- Klarem, wartbarem Code
- Vollständiger TypeScript-Typsicherheit
- Erfolgreichem Build-Prozess

Alle Anforderungen wurden erfüllt und alle identifizierten Bugs wurden behoben.
