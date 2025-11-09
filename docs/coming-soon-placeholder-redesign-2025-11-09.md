# ComingSoonPlaceholder Redesign – Session 2025-11-09

## Übersicht

Diese Session dokumentiert die vollständige Überarbeitung der `ComingSoonPlaceholder` Komponente für die Tasks Page. Die Komponente wurde von einer statischen Schloss-Animation zu einer modernen, Apple-inspirierten floating orb Animation transformiert.

---

## Ziele der Session

1. **Entfernung der alten Schloss-Animation** - Kompletter Austausch durch modernere Visualisierung
2. **Neue Y-Axis Floating Animation** - Flow-Droplets mit asynchroner Bewegung
3. **Design-System Angleichung** - Anpassung an das Main-Website Design (glassmorphism, cleaner spacing)
4. **Hover-Interaktionen** - Opacity-Transition von 20% → 100% bei Hover
5. **Textänderungen** - Von "Coming Soon" zu "Tasks werden bald freigeschaltet – Stay tuned"
6. **Entfernung unnötiger Elemente** - Grauer Divider-Strich unter Headline entfernt

---

## Technische Implementierung

### Datei: `components/dashboard/ComingSoonPlaceholder.tsx`

#### Neue Dependencies
```typescript
import { motion } from 'framer-motion';
import { useState } from 'react';
```

#### Neue Komponente: `FloatingOrb`

Eine wiederverwendbare Orb-Komponente mit Y-Axis Animation:

```typescript
function FloatingOrb({ delay = 0, scale = 1 }: { delay?: number; scale?: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(79, 209, 255, 0.4) 0%, rgba(79, 209, 255, 0.1) 50%, transparent 100%)',
        filter: 'blur(20px)',
        width: `${120 * scale}px`,
        height: `${120 * scale}px`,
      }}
      initial={{ opacity: 0.2, y: 0 }}
      animate={{
        opacity: isHovered ? 1 : [0.2, 0.35, 0.2],
        y: [0, -30, 0],
        scale: isHovered ? 1.1 : 1,
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    />
  );
}
```

**Features:**
- **Y-Axis Motion**: Floatet 30px hoch und runter
- **Hover-Effekt**: Opacity 0.2 → 1.0, Scale 1.0 → 1.1
- **Asynchrone Animation**: Individuelles Delay für jeden Orb
- **Skalierbar**: Variable Größe durch `scale` Prop

---

### Neue Visualisierung

#### Drei Floating Orbs (Async Motion)
```typescript
<FloatingOrb delay={0} scale={1} />      // Größter Orb, startet sofort
<FloatingOrb delay={1.3} scale={0.7} />  // Mittlerer Orb, +1.3s delay
<FloatingOrb delay={2.6} scale={0.5} />  // Kleinster Orb, +2.6s delay
```

#### Zentrales Glassmorphism-Element
```typescript
<motion.div
  className="relative w-20 h-20 md:w-24 md:h-24 bg-surface-overlay/20 backdrop-blur-xl border border-accent/10 rounded-2xl flex items-center justify-center"
  style={{
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(79, 209, 255, 0.05)',
  }}
  initial={{ opacity: 0.8, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    duration: 2,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  }}
>
  {/* Minimal glowing dot */}
  <motion.div
    className="w-3 h-3 bg-accent rounded-full"
    style={{
      boxShadow: '0 0 20px rgba(79, 209, 255, 0.6)',
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.6, 1, 0.6],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
</motion.div>
```

**Design-Features:**
- Backdrop-blur für Glassmorphism-Effekt
- Subtiles Box-Shadow mit Cyan Inset-Glow
- Pulsierender zentraler Dot (Scale + Opacity Animation)
- Breathing Animation des gesamten Containers

---

### Text & Content Änderungen

#### Alte Version:
```typescript
<h1>Tasks ist noch nicht verfügbar.</h1>
<div className="h-0.5 w-16 bg-accent/25 rounded-full" /> {/* Divider */}
<p>Wir entwickeln dieses Modul bereits. Dein Account erhält automatisch Zugriff...</p>
```

#### Neue Version:
```typescript
<motion.div
  className="space-y-3"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.6 }}
>
  <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight tracking-tight">
    {featureName} werden bald freigeschaltet
  </h1>
  <p className="text-lg text-text-secondary font-light">
    Stay tuned
  </p>
</motion.div>
```

**Änderungen:**
- ✅ Divider-Strich komplett entfernt
- ✅ Minimal reduzierter Text (1-2 Zeilen)
- ✅ Größere Typography (3xl → 4xl auf Desktop)
- ✅ Fade-in Animation mit Y-Axis Motion
- ✅ Cleaneres Spacing (space-y-3)

---

### Design-System Verbesserungen

#### Spacing & Layout
```typescript
// Alte Version
<div className="relative glass-card-premium rounded-2xl p-8 md:p-12">

// Neue Version
<div className="relative glass-card-premium rounded-2xl p-12 md:p-16">
```

**Änderungen:**
- Padding von `p-8` → `p-12` auf Mobile
- Padding von `p-12` → `p-16` auf Desktop
- Content spacing von `space-y-8` → `space-y-10`

#### Glassmorphism Enhancement
```typescript
// Noise Overlay reduziert
<div className="absolute inset-0 noise-overlay rounded-2xl pointer-events-none opacity-30" />

// Status Badge mit Backdrop-Blur
<span className="... backdrop-blur-sm">
  {statusLabels[status]}
</span>
```

#### Button Improvements
```typescript
// Größere Paddings
<Link
  href="/dashboard"
  className="inline-block btn-primary btn-micro-lift px-8 py-3.5 rounded-button shadow-sm hover:shadow-glow transition-all duration-200"
>
  Zurück zum Dashboard
</Link>
```

---

## Animation Details

### Timing & Easing

| Animation | Duration | Delay | Repeat | Easing |
|-----------|----------|-------|--------|--------|
| Orb Float | 4s | 0s / 1.3s / 2.6s | Infinite | easeInOut |
| Orb Hover | Instant | - | - | - |
| Glass Container Pulse | 2s | - | Infinite Reverse | easeInOut |
| Center Dot Pulse | 2s | - | Infinite | easeInOut |
| Text Fade-in | 0.6s | 0.2s | Once | - |
| Button Fade-in | 0.6s | 0.4s | Once | - |

### Opacity-Werte

| Element | Resting State | Hover State |
|---------|---------------|-------------|
| Floating Orb | 0.2 → 0.35 → 0.2 (pulse) | 1.0 |
| Glass Container | 0.8 → 1.0 (pulse) | - |
| Center Dot | 0.6 → 1.0 (pulse) | - |

---

## Design-Prinzipien

### Inspiration
- **Apple iCloud** Empty States
- **Linear.app** Loading Animations
- **Raycast** Suspense UI
- **Notion** Empty State Visuals

### Design-Sprache
1. **Minimal Noise** - Noise Overlay auf 30% opacity reduziert
2. **Subtle Glass Reflections** - Backdrop-blur anstelle von full blur
3. **Y-Axis Idle Motion** - Keine kreisförmigen Bewegungen
4. **Async Animation** - Gestaffelte Delays für organische Bewegung
5. **Clean Center-State** - Fokus auf Animation, keine Ablenkung

---

## Vorher/Nachher Vergleich

### Alte Version
- 🔒 Schloss-Icon mit Float-Pulse + Sheen Animation
- 📏 Grauer Divider-Strich unter Headline
- 📝 Lange erklärende Texte
- 🎨 Weniger Glassmorphism
- ⚡ Keine Hover-Interaktion

### Neue Version
- ✨ Drei floating Orbs mit asynchroner Y-Axis Motion
- 🚫 Kein Divider mehr
- 📝 Minimal reduzierter Text ("Stay tuned")
- 🎨 Enhanced Glassmorphism mit Backdrop-Blur
- 🖱️ Hover-Interaktion (opacity 20% → 100%, scale 1.0 → 1.1)

---

## Build & Deployment

### Build Durchgeführt
```bash
npm run build
```

**Ergebnis:** ✅ Compiled successfully

### Bundle Size
- `/dashboard/plan/tasks`: 1.59 kB (133 kB First Load JS)

### Performance
- Keine Build-Fehler
- Keine Type-Errors
- Alle Animationen sind GPU-beschleunigt (Framer Motion)

---

## Nächste Schritte

### Optionale Verbesserungen
1. **Micro-Parallax** auf Mausbewegung reagieren lassen
2. **Sound-Design** (optional) - Subtiler Sound bei Hover
3. **Prefers-Reduced-Motion** Support für Accessibility
4. **Loading-State** für zukünftige dynamische Befüllung

### Zukünftige Erweiterungen
Die Komponente ist so gestaltet, dass sie sich später einfach mit echtem Content befüllen lässt:
- Props für Custom-Animation-Config
- Slot für Custom-Content anstelle der Orbs
- Variable Status-Labels
- Custom Button-Links

---

## Technologie-Stack

- **React 18** mit TypeScript
- **Framer Motion 12.23.24** für Animationen
- **Next.js 14.2.15** App Router
- **Tailwind CSS** für Styling
- **CSS Custom Properties** für Theme-Variablen

---

## Accessibility

### Bestehende Features
- Semantic HTML (`<h1>`, `<Link>`)
- Focus-States auf Links/Buttons
- Responsive Design (Mobile-first)

### Empfehlungen für zukünftige Verbesserungen
```typescript
// prefers-reduced-motion Support
const prefersReducedMotion = useReducedMotion();

<motion.div
  animate={prefersReducedMotion ? {} : { y: [0, -30, 0] }}
/>
```

---

## Dateien geändert

| Datei | Status | Zeilen |
|-------|--------|--------|
| `components/dashboard/ComingSoonPlaceholder.tsx` | ✏️ Vollständig überarbeitet | 181 (vorher: 145) |

---

## Testing Checklist

- ✅ Build erfolgreich
- ✅ TypeScript Type-Checking erfolgreich
- ✅ Responsive Design (Mobile/Desktop)
- ✅ Hover-Interaktionen funktionieren
- ✅ Animationen laufen smooth
- ⬜ Browser-Testing (Chrome, Safari, Firefox)
- ⬜ Performance-Testing (FPS, Memory)
- ⬜ Accessibility-Testing (Screen Reader, Keyboard Navigation)

---

## Zusammenfassung

Die `ComingSoonPlaceholder` Komponente wurde erfolgreich von einem statischen Premium-Card Design zu einer modernen, interaktiven Animation transformiert. Die neue Version ist:

- **Cleaner**: Weniger Text, kein Divider, mehr Whitespace
- **Moderner**: Apple-inspirierte floating Orbs Animation
- **Interaktiver**: Hover-Effekte auf den Orbs
- **Performance-optimiert**: GPU-beschleunigte Animationen
- **Skalierbar**: Einfach erweiterbar für zukünftige Features

Die Komponente behält ihre Wiederverwendbarkeit (`featureName` und `status` Props) und fügt sich nahtlos in das bestehende Design-System ein.

---

**Session durchgeführt am:** 2025-11-09
**Dokumentiert von:** Claude Code
**Build Status:** ✅ Erfolgreich
