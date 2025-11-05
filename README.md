# ReleaseHub MVP – Artist Operating System

**ReleaseHub** ist das Operating System für Independent Artists. Struktur statt Chaos. Fairness statt Gatekeeper. 0% Rights Taken. 100% deine Musik.

---

## 🚀 Tech-Stack

- **Frontend:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Apple-Clean Design)
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Payments:** Stripe (Checkout + Webhooks)
- **Auth:** Supabase Auth
- **Deployment:** Vercel
- **Version Control:** GitHub

---

## 📁 Projekt-Struktur

```
releasehub-mvp/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root Layout
│   ├── page.tsx              # Homepage
│   ├── pricing/              # Pricing-Page
│   ├── resources/            # Lead-Magnets
│   └── welcome/              # Post-Checkout Onboarding
├── components/               # Wiederverwendbare Komponenten
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── FeatureCard.tsx
│   ├── PricingCard.tsx
│   ├── FAQAccordion.tsx
│   ├── Footer.tsx
│   └── ThreePillars.tsx
├── lib/                      # Utility-Libs
│   ├── prisma.ts             # Prisma Client
│   ├── stripe.ts             # Stripe Client
│   └── supabase.ts           # Supabase Client
├── pages/api/                # API Routes (Pages Router für API)
│   ├── checkout.ts           # Stripe Checkout Session
│   └── webhooks/
│       └── stripe.ts         # Stripe Webhook Handler
├── prisma/
│   └── schema.prisma         # Prisma Schema (Users, Subscriptions, Releases)
├── public/                   # Static Assets
├── .env.example              # Environment Variables Template
├── tailwind.config.ts        # Tailwind Config (Custom Design-System)
└── README.md
```

---

## 🛠️ Setup & Installation

### 1. Repository klonen

```bash
git clone https://github.com/your-username/releasehub-mvp.git
cd releasehub-mvp
```

### 2. Dependencies installieren

```bash
npm install
```

### 3. Environment Variables einrichten

Erstelle eine `.env` Datei basierend auf `.env.example`:

```bash
cp .env.example .env
```

**Fülle die folgenden Variablen aus:**

```env
# Supabase
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Stripe Price IDs (diese müssen in Stripe Dashboard erstellt werden)
STRIPE_PRICE_ID_BASIC="price_..."
STRIPE_PRICE_ID_PREMIUM="price_..."
STRIPE_PRICE_ID_LABEL="price_..."

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Supabase Setup

1. **Supabase-Projekt erstellen:** https://supabase.com
2. **Database Connection String** aus Supabase kopieren → `DATABASE_URL`
3. **Supabase URL & Anon Key** aus Supabase kopieren → `.env`

### 5. Prisma Migrations ausführen

```bash
npx prisma generate
npx prisma db push
```

### 6. Stripe Setup

#### Produkte & Preise in Stripe Dashboard erstellen:

1. **Stripe Dashboard:** https://dashboard.stripe.com/test/products
2. Erstelle 3 Produkte:
   - **Basic** – 29,99 €/Monat (recurring)
   - **Premium** – 79,99 €/Monat (recurring)
   - **Label** – 129,99 €/Monat (recurring)
3. **Price IDs kopieren** und in `.env` eintragen:
   - `STRIPE_PRICE_ID_BASIC`
   - `STRIPE_PRICE_ID_PREMIUM`
   - `STRIPE_PRICE_ID_LABEL`

#### Webhook Setup:

1. **Stripe CLI installieren:** https://stripe.com/docs/stripe-cli
2. **Webhook testen (lokal):**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
3. **Webhook Secret kopieren** → `STRIPE_WEBHOOK_SECRET` in `.env`

**In Production (Vercel):**
1. Webhook-Endpunkt in Stripe Dashboard registrieren: `https://yourdomain.com/api/webhooks/stripe`
2. Events auswählen:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### 7. Dev-Server starten

```bash
npm run dev
```

**→ App läuft auf:** http://localhost:3000

---

## 🚢 Deployment auf Vercel

### 1. GitHub Repo erstellen

```bash
git init
git add .
git commit -m "Initial commit: ReleaseHub MVP"
git remote add origin https://github.com/your-username/releasehub-mvp.git
git push -u origin main
```

### 2. Vercel-Projekt erstellen

1. **Vercel Dashboard:** https://vercel.com
2. **New Project** → GitHub Repo importieren
3. **Framework Preset:** Next.js (automatisch erkannt)
4. **Environment Variables** hinzufügen:
   - Alle aus `.env` → Vercel Dashboard → Settings → Environment Variables

### 3. Deploy

```bash
vercel --prod
```

**→ App ist live auf:** `https://releasehub.vercel.app`

### 4. Custom Domain einrichten (optional)

1. **Vercel Dashboard** → Project → Settings → Domains
2. **Domain hinzufügen:** `releasehub.com`
3. **DNS konfigurieren:** (A-Record / CNAME zu Vercel)

---

## 💳 Stripe Production Setup

### Testmodus → Production umstellen:

1. **Stripe Dashboard** → Toggle von "Test Mode" zu "Live Mode"
2. **Neue Produkte & Preise erstellen** (in Live-Mode)
3. **Live Price IDs** in Vercel Environment Variables eintragen:
   - `STRIPE_PRICE_ID_BASIC`
   - `STRIPE_PRICE_ID_PREMIUM`
   - `STRIPE_PRICE_ID_LABEL`
4. **Live Secret Key** eintragen:
   - `STRIPE_SECRET_KEY` (sk_live_...)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_live_...)
5. **Webhook** in Live-Mode registrieren:
   - Endpunkt: `https://releasehub.com/api/webhooks/stripe`
   - **Webhook Secret** kopieren → `STRIPE_WEBHOOK_SECRET` (whsec_...)

---

## 📊 Prisma Studio (Database GUI)

```bash
npx prisma studio
```

**→ Öffnet:** http://localhost:5555

Hier kannst du:
- Users, Subscriptions, Releases anzeigen
- Daten manuell editieren
- Test-User anlegen

---

## 🧪 Testing

### Stripe Test-Checkout:

**Test-Kreditkarten:**
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **3D Secure:** `4000 0027 6000 3184`

**Weitere Test-Cards:** https://stripe.com/docs/testing

### Webhook Testing (lokal):

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
stripe trigger checkout.session.completed
```

---

## 📖 Wichtige Seiten

- **Homepage:** `/`
- **Pricing:** `/pricing`
- **Resources:** `/resources`
- **Welcome (Post-Checkout):** `/welcome?session_id={CHECKOUT_SESSION_ID}`

---

## 🔐 Security & Best Practices

1. **Environment Variables niemals committen** (.env ist in .gitignore)
2. **Stripe Webhook Secret validieren** (bereits implementiert in `pages/api/webhooks/stripe.ts`)
3. **Supabase Row Level Security (RLS)** aktivieren (für Production)
4. **HTTPS erzwingen** (Vercel macht das automatisch)

---

## 🎨 Design-System

### Farben:

- **Primary:** `#0A0A0A` (Schwarz, Apple-Style)
- **Accent:** `#FF3B30` (Rot, für CTAs/Badges)
- **Background:** `#FFFFFF`, `#F5F5F7`, `#000000`
- **Text:** `#1D1D1F`, `#6E6E73`, `#FFFFFF`

### Typografie:

- **Font:** Inter (via Google Fonts)
- **Hero:** 64px/72px (Desktop), 36px/44px (Mobile)
- **Section:** 48px/56px (Desktop), 28px/36px (Mobile)

### Buttons:

- `.btn-primary` – Schwarz, White Text
- `.btn-secondary` – Outline, Transparent BG
- `.btn-accent` – Rot, White Text

---

## 📈 Roadmap

### Phase 1 – MVP (✅ FERTIG)
- ✅ Marketing-Website (Homepage, Pricing, Resources)
- ✅ Stripe Checkout + Webhook Integration
- ✅ Supabase + Prisma Schema
- ✅ Welcome-Screen (Post-Checkout)

### Phase 2 – Core Features (Q2 2025)
- [ ] Dashboard mit Release-Kalender
- [ ] Asset-Management (Cover, Pressefotos, Texte)
- [ ] Team-Collaboration (Producer, Manager hinzufügen)
- [ ] Release-Templates (Singles, EPs, Alben)
- [ ] Smart Links (Bio-Link, Pre-Save, Release-Link)
- [ ] Analytics-Integration (Spotify for Artists API)

### Phase 3 – API-Integrationen (Q3/Q4 2025)
- [ ] Distributor-API (DistroKid, TuneCore, Believe)
- [ ] TikTok/Instagram Analytics-API
- [ ] EPK-Builder (Custom-Design, Export als PDF)
- [ ] Mobile App (iOS/Android, Lite-Version)
- [ ] Community/Discord-Integration

---

## 🐛 Troubleshooting

### Dev-Server startet nicht:

```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Prisma-Fehler:

```bash
npx prisma generate
npx prisma db push
```

### Stripe Webhook 401 Unauthorized:

- Überprüfe `STRIPE_WEBHOOK_SECRET` in `.env`
- Teste lokal: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### Supabase Connection Error:

- Überprüfe `DATABASE_URL` in `.env`
- Teste Connection: `npx prisma db push`

---

## 📧 Support

**Email:** support@releasehub.com
**GitHub Issues:** https://github.com/your-username/releasehub-mvp/issues

---

## 📄 License

© 2025 ReleaseHub – Artist Operating System
Made in Europe. 0% Rights Taken.
