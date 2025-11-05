# ReleaseHub MVP – Documentation

Willkommen zur ReleaseHub-Dokumentation! Hier findest du alle Session-Changelogs, technische Details und Implementierungs-Dokumentationen.

---

## 📚 Verfügbare Dokumente

### Session-Changelogs
- **[SESSION_01_CHANGELOG.md](./SESSION_01_CHANGELOG.md)** – Initial MVP Implementation (05.11.2025)
  - Projekt-Setup & Tech-Stack
  - Design-System (Apple-Clean)
  - Komponenten-Bibliothek (8 Komponenten)
  - Pages (Homepage, Pricing, Resources, Welcome)
  - Stripe & Supabase Integration
  - Auth-Modals (Login & Sign Up)
  - Scroll-Animation Navigation
  - Git & GitHub Setup

---

## 🎯 Projekt-Übersicht

**ReleaseHub** ist ein Artist Operating System für Independent Artists.

**Kern-USPs:**
- 0% Rights Taken (keine Master- oder Publisher-Abgabe)
- Europäische Lösung (DE/EN, EU-Steuern)
- Strukturiertes Release-System
- Kein Free-Plan (nur Premium: 29–129€/Monat)

---

## 🚀 Tech-Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend:** Prisma + Supabase (PostgreSQL)
- **Payments:** Stripe (Checkout + Webhooks)
- **Deployment:** Vercel (geplant)
- **Version Control:** GitHub

---

## 📁 Dokumentations-Struktur

```
/docs
├── README.md                   # Diese Datei
├── SESSION_01_CHANGELOG.md     # Session 01 (Initial MVP)
└── (weitere Sessions folgen)
```

---

## 🔗 Wichtige Links

- **GitHub Repository:** https://github.com/Caspar241/releasehub-mvp
- **Vercel Deployment:** (noch nicht live)
- **Lokal:** http://localhost:3000

---

## 📊 Status

**Aktueller Stand:**
- ✅ MVP komplett implementiert
- ✅ Auf GitHub gepusht
- ⏸️ Vercel-Deployment (wartet auf Go)

**Nächste Schritte:**
1. Design/Content finalisieren
2. Beta-User onboarden
3. Vercel-Deployment
4. Phase 2 Features (Dashboard, Auth, etc.)

---

## 📝 Änderungen dokumentieren

**Für jede Session:**
1. Neue Datei: `SESSION_XX_CHANGELOG.md`
2. Dokumentiere:
   - Implementierte Features
   - Technische Änderungen
   - Fixes & Adjustments
   - Nächste Schritte
3. Update diese README mit Link zur neuen Session

---

**Letzte Aktualisierung:** 05.11.2025
