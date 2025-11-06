# Cashboard / Earnings Modul – Spezifikation

**Version:** 1.0
**Datum:** 06.11.2025
**Stil:** Apple-like, clean, minimalistisch, deutsch

---

## 1. Übersicht

Das Earnings-Modul gibt Artists einen klaren Überblick über:
- Aktuelle Einnahmen (verfügbar, ausstehend, ausgezahlt)
- Breakdown nach Track, Release, Store, Land
- Payout-Historie und Statement-Downloads
- Optionale Splits & Recoupment-Tracking

**Ziel:** Artist versteht in <5 Sek. seinen aktuellen Stand.

---

## 2. UI-Sektionen

### 2.1 Header-Summary (4 KPI-Tiles)

**Layout:** 4 Cards nebeneinander (responsive: 2×2 auf Mobile)

**Tiles:**

1. **Verfügbar**
   - Wert: `€2,450.00`
   - Label: `Verfügbar`
   - Tooltip: `Betrag, der zur Auszahlung bereit ist`
   - Trend: `+12% vs. letzter Monat`

2. **Ausstehend**
   - Wert: `€1,820.00`
   - Label: `Ausstehend`
   - Tooltip: `In Verarbeitung bei Stores`
   - Trend: `+8% vs. letzter Monat`

3. **Prognose (30 Tage)**
   - Wert: `€3,200.00`
   - Label: `Prognose (30 Tage)`
   - Tooltip: `Geschätzte Einnahmen basierend auf aktuellem Trend`
   - Trend: `Basierend auf letzten 90 Tagen`

4. **Ausgezahlt (YTD)**
   - Wert: `€18,500.00`
   - Label: `Ausgezahlt (YTD)`
   - Tooltip: `Summe aller Auszahlungen dieses Jahr`
   - Trend: `Jan–Nov 2025`

**Wireframe (Desktop):**
```
┌─────────────────────────────────────────────────────────────┐
│ [Verfügbar]    [Ausstehend]    [Prognose]    [Ausgezahlt]  │
│  €2,450.00      €1,820.00       €3,200.00      €18,500.00   │
│  +12% ↗         +8% ↗           30d Trend      YTD          │
└─────────────────────────────────────────────────────────────┘
```

**Wireframe (Mobile):**
```
┌───────────────────────┐
│ [Verfügbar]           │
│  €2,450.00            │
│  +12% ↗               │
├───────────────────────┤
│ [Ausstehend]          │
│  €1,820.00            │
│  +8% ↗                │
└───────────────────────┘
```

---

### 2.2 Earnings Over Time (Chart)

**Chart-Typ:** Linienchart mit Zeitachse

**Controls:**
- Toggle: `Tag` | `Woche` | `Monat`
- Filter: `Alle` | `Track` | `Release` | `Store`

**Wireframe:**
```
┌─────────────────────────────────────────────────────────────┐
│ Einnahmen-Verlauf                    [Tag|Woche|Monat]     │
│                                      [Filter: Alle ▼]       │
│                                                              │
│  €                                                           │
│  5K ┤                                    ●                   │
│  4K ┤                          ●───●───●                     │
│  3K ┤              ●───●───●                                 │
│  2K ┤      ●───●                                             │
│  1K ┤●───●                                                   │
│  0  └────────────────────────────────────────────────       │
│      01.10  08.10  15.10  22.10  29.10  05.11               │
│                                                              │
│  Gesamt: €24,500  |  Ø Tag: €820  |  Peak: €5,200 (05.11) │
└─────────────────────────────────────────────────────────────┘
```

---

### 2.3 Breakdown Tabs

**Tab-Navigation:** `Tracks` | `Releases` | `Stores` | `Länder`

#### Tab 1: Tracks

**Tabelle:**

| Track | Release | Store | Zeitraum | Umsatz | Anteil | Status |
|-------|---------|-------|----------|--------|--------|--------|
| City Lights | Urban Dreams | Spotify | Okt 2025 | €1,250.00 | 35% | ✓ Gezahlt |
| Ocean Waves | Chill Vibes | Apple Music | Okt 2025 | €820.00 | 23% | ⏳ Ausstehend |
| Midnight Dreams | Singles 2025 | YouTube Music | Okt 2025 | €450.00 | 12% | ✓ Gezahlt |

**Features:**
- Sortierbar (Klick auf Header)
- Filter: Store, Zeitraum, Status
- Export: CSV
- Klick auf Track → Detail-View

**Wireframe:**
```
┌─────────────────────────────────────────────────────────────┐
│ [Tracks] Releases Stores Länder                             │
│                                                              │
│ ┌──────────┬─────────────────────────────┬──────────────┐  │
│ │ Filter:  │ [Alle Stores ▼]  [Okt 2025] │  [Export CSV]│  │
│ └──────────┴─────────────────────────────┴──────────────┘  │
│                                                              │
│ Track ↕         Release     Store      Umsatz    Status     │
│ ───────────────────────────────────────────────────────────│
│ City Lights     Urban ...   Spotify    €1,250    ✓ Gezahlt │
│ Ocean Waves     Chill ...   Apple      €820      ⏳ Offen  │
│ Midnight ...    Singles     YouTube    €450      ✓ Gezahlt │
│                                                              │
│ [Mehr laden]                                                 │
└─────────────────────────────────────────────────────────────┘
```

#### Tab 2: Releases

**Aggregiert auf Release-Ebene:**

| Release | Tracks | Stores | Zeitraum | Umsatz | Anteil |
|---------|--------|--------|----------|--------|--------|
| Urban Dreams | 3 | 5 | Okt 2025 | €2,450.00 | 42% |
| Chill Vibes | 4 | 4 | Okt 2025 | €1,820.00 | 31% |

#### Tab 3: Stores

**Netto-Einnahmen pro Store:**

| Store | Tracks | Umsatz | Anteil | Status |
|-------|--------|--------|--------|--------|
| Spotify | 12 | €2,450.00 | 42% | ✓ Aktiv |
| Apple Music | 12 | €1,820.00 | 31% | ✓ Aktiv |
| YouTube Music | 8 | €980.00 | 17% | ✓ Aktiv |
| TikTok | 5 | €350.00 | 6% | ✓ Aktiv |
| Instagram | 4 | €250.00 | 4% | ⚠️ Daten verzögert |

#### Tab 4: Länder

**Top 10 Länder:**

| Land | Umsatz | Anteil | Trend |
|------|--------|--------|-------|
| 🇩🇪 Deutschland | €2,100.00 | 36% | ↗ +15% |
| 🇺🇸 USA | €1,500.00 | 26% | ↗ +8% |
| 🇬🇧 UK | €900.00 | 15% | → ±0% |

---

### 2.4 Payouts & Statements

**Sektion 1: Payout-Status**

**Card-Design:**

```
┌─────────────────────────────────────────────────────────────┐
│ Nächste Auszahlung                                          │
│                                                              │
│ Verfügbar: €2,450.00                                        │
│ Schwelle:  €100.00                                          │
│                                                              │
│ ✓ Schwelle erreicht                                         │
│                                                              │
│ [Auszahlung anfordern →]                                    │
│                                                              │
│ Auszahlungsmethode: PayPal (***@email.com)                 │
│ Geschätzte Bearbeitungszeit: 5-7 Werktage                  │
└─────────────────────────────────────────────────────────────┘
```

**Falls Schwelle nicht erreicht:**

```
┌─────────────────────────────────────────────────────────────┐
│ Nächste Auszahlung                                          │
│                                                              │
│ Verfügbar: €45.00                                           │
│ Schwelle:  €100.00                                          │
│                                                              │
│ ⏳ Noch €55.00 bis zur Auszahlung                           │
│                                                              │
│ Progress: [████████░░░░░░░] 45%                            │
│                                                              │
│ [Auszahlung anfordern] (disabled)                           │
└─────────────────────────────────────────────────────────────┘
```

**Sektion 2: Payout-Historie**

**Tabelle:**

| Status | Datum | Betrag | Methode | Aktion |
|--------|-------|--------|---------|--------|
| ✓ Ausgezahlt | 01.11.2025 | €1,200.00 | PayPal | Details |
| ✓ Ausgezahlt | 01.10.2025 | €1,450.00 | PayPal | Details |
| ⏳ In Bearbeitung | 25.10.2025 | €980.00 | PayPal | Tracking |
| ❌ Fehlgeschlagen | 15.09.2025 | €550.00 | Bank | Neu versuchen |

**Wireframe:**
```
┌─────────────────────────────────────────────────────────────┐
│ Auszahlungs-Historie                                        │
│                                                              │
│ Status ↕    Datum        Betrag       Methode   Aktion      │
│ ────────────────────────────────────────────────────────────│
│ ✓ Gezahlt   01.11.2025   €1,200.00   PayPal   [Details]    │
│ ✓ Gezahlt   01.10.2025   €1,450.00   PayPal   [Details]    │
│ ⏳ Offen    25.10.2025   €980.00     PayPal   [Tracking]   │
└─────────────────────────────────────────────────────────────┘
```

**Sektion 3: Statements**

**Card mit Download-Liste:**

```
┌─────────────────────────────────────────────────────────────┐
│ Statements                                                   │
│                                                              │
│ Oktober 2025         €3,500 brutto    €3,150 netto  [↓ PDF]│
│ September 2025       €2,980 brutto    €2,682 netto  [↓ PDF]│
│ August 2025          €4,200 brutto    €3,780 netto  [↓ PDF]│
│                                                              │
│ [Alle Statements (CSV) herunterladen]                       │
└─────────────────────────────────────────────────────────────┘
```

---

### 2.5 Splits & Recoupment (Optional)

**Für Tracks mit mehreren Beteiligten:**

```
┌─────────────────────────────────────────────────────────────┐
│ Splits – "City Lights"                                      │
│                                                              │
│ Main Artist (Du)          60%    €750.00                    │
│ Featured Artist           25%    €312.50                    │
│ Producer                  15%    €187.50                    │
│                                                              │
│ [Splits bearbeiten]                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Recoupment – "Urban Dreams Album"                           │
│                                                              │
│ Vorschuss:           €5,000.00                              │
│ Ausgaben:            €3,200.00                              │
│ Gesamt-Einnahmen:    €6,500.00                              │
│                                                              │
│ Status: ✓ Recouped                                          │
│ Überschuss: €1,500.00                                       │
│                                                              │
│ Progress: [████████████████████] 130%                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Empty States

### Keine Daten

```
┌─────────────────────────────────────────────────────────────┐
│                         💰                                   │
│                                                              │
│           Noch keine Einnahmen in diesem Zeitraum           │
│                                                              │
│  Deine Tracks sind live? Store-Reports treffen mit          │
│  Verzögerung ein. Erste Daten in 30-60 Tagen.              │
│                                                              │
│               [Datenquellen verbinden →]                     │
└─────────────────────────────────────────────────────────────┘
```

### Keine Auszahlungsmethode

```
┌─────────────────────────────────────────────────────────────┐
│                         🏦                                   │
│                                                              │
│           Auszahlungsmethode hinzufügen                     │
│                                                              │
│  Füge PayPal oder Bankverbindung hinzu, um                 │
│  Auszahlungen zu erhalten.                                  │
│                                                              │
│               [Zahlungsmethode einrichten →]                │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Komponenten-Liste

### `<KpiTile>`

**Props:**
- `value: string` – Hauptwert (z.B. "€2,450.00")
- `label: string` – Beschriftung (z.B. "Verfügbar")
- `helpText?: string` – Tooltip-Text
- `trend?: { value: string; direction: 'up' | 'down' | 'neutral' }` – Trend-Anzeige
- `icon?: string` – Emoji oder Icon

**Verwendung:**
```tsx
<KpiTile
  value="€2,450.00"
  label="Verfügbar"
  helpText="Betrag, der zur Auszahlung bereit ist"
  trend={{ value: "+12%", direction: "up" }}
  icon="💰"
/>
```

---

### `<EarningsChart>`

**Props:**
- `range: '7d' | '30d' | '90d' | '1y'` – Zeitbereich
- `compareBy?: 'all' | 'track' | 'release' | 'store'` – Vergleichsmodus
- `entityId?: string` – ID bei Filter (Track/Release ID)
- `data: Array<{ date: string; amount: number }>` – Chart-Daten

**Verwendung:**
```tsx
<EarningsChart
  range="30d"
  compareBy="all"
  data={earningsData}
/>
```

---

### `<BreakdownTable>`

**Props:**
- `type: 'tracks' | 'releases' | 'stores' | 'countries'` – Tabellentyp
- `columns: Array<ColumnDef>` – Spalten-Konfiguration
- `data: Array<any>` – Tabellen-Daten
- `sortable?: boolean` – Sortierbar
- `filterable?: boolean` – Filterbar
- `exportCsv?: boolean` – CSV-Export Button

**Verwendung:**
```tsx
<BreakdownTable
  type="tracks"
  columns={trackColumns}
  data={tracksData}
  sortable
  exportCsv
/>
```

---

### `<PayoutCard>`

**Props:**
- `status: 'pending' | 'processing' | 'paid' | 'failed'` – Status
- `amount: string` – Betrag
- `date: string` – Datum
- `method: string` – Zahlungsmethode
- `onAction?: () => void` – Action-Callback

**Verwendung:**
```tsx
<PayoutCard
  status="paid"
  amount="€1,200.00"
  date="01.11.2025"
  method="PayPal"
/>
```

---

### `<StatementRow>`

**Props:**
- `period: string` – Zeitraum (z.B. "Oktober 2025")
- `gross: string` – Brutto-Betrag
- `net: string` – Netto-Betrag
- `downloadUrl: string` – PDF-Download-Link
- `onDownload: () => void` – Download-Handler

**Verwendung:**
```tsx
<StatementRow
  period="Oktober 2025"
  gross="€3,500.00"
  net="€3,150.00"
  downloadUrl="/statements/2025-10.pdf"
  onDownload={handleDownload}
/>
```

---

### `<SplitBadge>`

**Props:**
- `role: string` – Rolle (z.B. "Main Artist", "Producer")
- `percent: number` – Prozentsatz (0-100)
- `amount?: string` – Betrag (optional)
- `isYou?: boolean` – Hervorhebung für eigenen Anteil

**Verwendung:**
```tsx
<SplitBadge
  role="Main Artist (Du)"
  percent={60}
  amount="€750.00"
  isYou
/>
```

---

### `<ThresholdNotice>`

**Props:**
- `current: number` – Aktueller Betrag
- `needed: number` – Benötigter Betrag (Schwelle)
- `currency?: string` – Währung (default: "EUR")
- `onLearnMore?: () => void` – Info-Link

**Verwendung:**
```tsx
<ThresholdNotice
  current={45}
  needed={100}
  currency="EUR"
/>
```

---

### `<EmptyState>`

**Props:**
- `icon?: string` – Emoji oder Icon
- `title: string` – Überschrift
- `description?: string` – Beschreibung
- `actionLabel?: string` – CTA-Text
- `onAction?: () => void` – Action-Callback

**Verwendung:**
```tsx
<EmptyState
  icon="💰"
  title="Noch keine Einnahmen in diesem Zeitraum"
  description="Store-Reports treffen mit Verzögerung ein."
  actionLabel="Datenquellen verbinden →"
  onAction={() => router.push('/dashboard/settings')}
/>
```

---

## 5. Datenmodell (Supabase + Prisma)

### Tabellen

**accounts**
- `id` (uuid, pk)
- `user_id` (uuid, fk → users)
- `currency` (varchar, default: 'EUR')
- `threshold` (decimal, default: 100.00)
- `payout_method` (varchar: 'paypal', 'bank')
- `payout_email` (varchar, nullable)
- `bank_details` (jsonb, nullable)
- `created_at`, `updated_at`

**payouts**
- `id` (uuid, pk)
- `account_id` (uuid, fk → accounts)
- `amount` (decimal)
- `status` (varchar: 'pending', 'processing', 'paid', 'failed')
- `method` (varchar)
- `initiated_at` (timestamp)
- `paid_at` (timestamp, nullable)
- `failure_reason` (text, nullable)
- `external_id` (varchar, nullable) – z.B. PayPal Transaction ID

**statements**
- `id` (uuid, pk)
- `account_id` (uuid, fk → accounts)
- `period_start` (date)
- `period_end` (date)
- `gross` (decimal)
- `fees` (decimal)
- `net` (decimal)
- `file_url` (varchar) – PDF auf Storage
- `created_at`

**transactions**
- `id` (uuid, pk)
- `account_id` (uuid, fk → accounts)
- `track_id` (uuid, fk → tracks, nullable)
- `release_id` (uuid, fk → releases, nullable)
- `store` (varchar: 'spotify', 'apple', 'youtube', etc.)
- `country` (varchar: ISO 2-letter)
- `date` (date)
- `amount_net` (decimal)
- `currency` (varchar)
- `fx_rate` (decimal, nullable) – Wechselkurs
- `status` (varchar: 'pending', 'confirmed')
- `raw_data` (jsonb, nullable) – Original Store-Daten

**releases**
- `id`, `title`, `upc`, `artist_id`, `release_date`, ...

**tracks**
- `id`, `title`, `isrc`, `release_id`, `duration`, ...

**splits**
- `id` (uuid, pk)
- `track_id` (uuid, fk → tracks)
- `party` (varchar) – Name oder Email
- `role` (varchar: 'artist', 'featured', 'producer', 'writer')
- `percent` (decimal) – 0-100
- `created_at`

**recoupment** (optional)
- `id` (uuid, pk)
- `release_id` (uuid, fk → releases)
- `advance` (decimal)
- `expenses` (decimal)
- `recouped_at` (timestamp, nullable)

---

### RLS (Row Level Security)

**Alle Tabellen:**
```sql
CREATE POLICY "Users see only their own data"
  ON accounts FOR SELECT
  USING (auth.uid() = user_id);
```

**Summen & Berechnungen:**

Alle KPIs werden aus `transactions` aggregiert:
- Verfügbar = `SUM(amount_net WHERE status='confirmed' AND NOT in payouts)`
- Ausstehend = `SUM(amount_net WHERE status='pending')`
- Ausgezahlt (YTD) = `SUM(payouts.amount WHERE paid_at >= '2025-01-01')`
- Prognose = `AVG(last 90 days) * 30`

---

## 6. Textstil & Microcopy (DE + EN)

### Buttons

| DE | EN |
|----|----|
| Auszahlung anfordern | Request Payout |
| Export (CSV) | Export (CSV) |
| Download Statement | Download Statement |
| Details anzeigen | View Details |
| Zahlungsmethode einrichten | Set Up Payment Method |

### Tooltips

| Context | Text (DE) | Text (EN) |
|---------|-----------|-----------|
| Verfügbar | Betrag, der zur Auszahlung bereit ist | Amount ready for payout |
| Ausstehend | In Verarbeitung bei Stores | Processing with stores |
| Prognose | Geschätzte Einnahmen basierend auf aktuellem Trend | Estimated earnings based on current trend |
| Verzögerung | Store-Reports treffen zeitversetzt ein | Store reports arrive with delay |

### Leere Zustände

**Keine Daten:**
```
DE: Noch keine Einnahmen in diesem Zeitraum.
EN: No earnings in this period yet.
```

**Keine Methode:**
```
DE: Füge PayPal oder Bankverbindung hinzu, um Auszahlungen zu erhalten.
EN: Add PayPal or bank account to receive payouts.
```

---

## 7. Design-Varianten

### Variante A: Ultra-Clean (empfohlen)

**Merkmale:**
- Viel Weißraum
- 4 KPIs prominent oben
- 1 großer Chart
- Tabs mit minimaler Tabelle (Top 5, dann "Mehr laden")
- Payout-CTA hero-artig
- Fokus auf Klarheit statt Datendichte

**Layout-Skizze:**
```
[KPI KPI KPI KPI]

[     Großer Chart      ]

[Tab: Tracks | Releases | Stores]
  → Top 5 Zeilen
  [Mehr laden]

[Payout-Hero-Card]

[Statements (collapsed)]
```

**Vorteile:**
- Sehr schnell erfassbar
- Mobile-friendly
- Weniger Überforderung

---

### Variante B: Data-Dense

**Merkmale:**
- KPIs kompakter (kleinere Tiles)
- Chart side-by-side mit Filters
- Vollständige Tabellen (scrollbar)
- Mehr Daten auf einen Blick
- Split-View: Chart links, Tabelle rechts

**Layout-Skizze:**
```
[KPI] [KPI] [KPI] [KPI] [Filter-Bar]

[Chart (50%)]  |  [Tabelle (50%)]

[Payout-Card + Statements inline]
```

**Vorteile:**
- Power-User können schneller arbeiten
- Weniger Klicks für Deep-Dive
- Bessere Übersicht für Analysen

---

## 8. Coming Soon – Distribution Upload

**Platzhalter-Komponente:**

```
┌─────────────────────────────────────────────────────────────┐
│                         🚀                                   │
│                                                              │
│              Direkter DSP-Upload – Coming Soon               │
│                                                              │
│  Bald kannst du deine Releases direkt zu Spotify, Apple    │
│  Music & Co. hochladen – ohne Umweg.                        │
│                                                              │
│  [Benachrichtige mich] (Email-Input)                       │
│                                                              │
│  Bis dahin: Nutze unsere Partner-Distributoren             │
│  [Zu Partner-Links →]                                        │
└─────────────────────────────────────────────────────────────┘
```

**Komponente:**
```tsx
<ComingSoonCard
  icon="🚀"
  title="Direkter DSP-Upload – Coming Soon"
  description="Bald kannst du deine Releases direkt hochladen."
  emailCapture
  alternativeAction={{ label: "Zu Partner-Links →", href: "/partners" }}
/>
```

---

## 9. Integrations-Roadmap (Kurzbrief)

### Phase 1: Manual Statements (aktuell)
- User lädt CSV/PDF hoch
- Manuelle Zuordnung zu Releases
- Basic Parsing & Validation

### Phase 2: Semi-Auto Import
- Template-Matching für gängige Formate (Spotify, Apple, YouTube)
- Auto-Erkennung Store-Typ
- Konflikterkennung & Review-Flow

### Phase 3: Auto-Syncs (Q2 2026)
- API-Integrations: Spotify for Artists, Apple Music for Artists
- OAuth-Flow für User-Auth
- Scheduled Jobs (täglich/wöchentlich)
- Webhook-Handler für Real-Time Updates

### Phase 4: Stripe → Supabase Webhooks
- `payment_intent.succeeded` → Transaction erstellen
- `transfer.created` → Payout-Record anlegen
- `account.updated` → Threshold/Method sync

### Phase 5: Distributor White-Label
- API-Endpunkte für Partner-Distributoren
- Embedded Earnings-Widget (iFrame oder Webkomponente)
- SSO via JWT

---

## 10. Interaktionen & States

### Filterleiste

**Controls:**
- Zeitraum: Dropdown (Letzte 7/30/90 Tage, Dieser Monat, YTD, Custom)
- Artist: Dropdown (bei Multi-Artist-Accounts)
- Store: Multi-Select (Spotify, Apple, YouTube, etc.)
- Land: Multi-Select (Top 10 + "Andere")
- Währung: Toggle (EUR, USD, GBP)

**Persistierung:**
- Filter-State in URL (`?range=30d&store=spotify`)
- LocalStorage für Default-Präferenzen

---

### Loading States

**Skeleton Loader:**
```tsx
<div className="feature-card animate-pulse">
  <div className="h-4 bg-bg-secondary rounded w-1/4 mb-2"></div>
  <div className="h-8 bg-bg-secondary rounded w-1/2"></div>
</div>
```

**Chart Loading:**
```tsx
<div className="h-64 flex items-center justify-center text-text-secondary">
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
  <span className="ml-3">Daten werden geladen...</span>
</div>
```

---

### Error States

**Network Error:**
```
┌─────────────────────────────────────────────────────────────┐
│                         ⚠️                                   │
│                                                              │
│           Daten konnten nicht geladen werden                │
│                                                              │
│  Bitte überprüfe deine Internetverbindung und               │
│  versuche es erneut.                                         │
│                                                              │
│               [Erneut versuchen]                             │
└─────────────────────────────────────────────────────────────┘
```

**Payout Failed:**
```
┌─────────────────────────────────────────────────────────────┐
│  ❌ Auszahlung fehlgeschlagen                               │
│                                                              │
│  Grund: Ungültige PayPal-Adresse                           │
│                                                              │
│  [Zahlungsmethode aktualisieren]  [Support kontaktieren]   │
└─────────────────────────────────────────────────────────────┘
```

---

## 11. Mobile-Optimierung

### KPI-Tiles
- Stack vertical (1 Spalte)
- Touch-freundliche Größe (min. 44px Höhe)

### Chart
- Horizontal-Scroll bei mehr als 30 Datenpunkten
- Toggle-Buttons größer (48px)

### Tabellen
- Horizontal-Scroll mit Sticky-Header
- Wichtigste Spalten links fixiert
- "Details"-Link öffnet Modal statt Inline-Expansion

### Payout-CTA
- Fixed Bottom Bar auf Mobile
- Immer sichtbar wenn Schwelle erreicht

---

## 12. Accessibility (A11y)

- `aria-label` auf alle Icons
- Keyboard-Navigation: Tab-Reihenfolge logisch
- Focus-Styles: Akzent-Farbe als Outline
- Screen-Reader: Labels für Buttons & Links
- Color-Contrast: Mind. WCAG AA (4.5:1)
- Tooltips: Hover + Focus + Touch (langes Press)

---

## 13. Performance

- Tabellen: Virtualized Scrolling (react-window) ab 100+ Zeilen
- Chart: Canvas statt SVG ab 1000+ Datenpunkte
- Lazy-Load: Statements & Payout-Historie
- Prefetch: Next Payout Date im Background
- Cache: KPIs 60s, Chart 5min, Tabellen on-demand

---

## Zusammenfassung: Deliverables

✅ **Sektionen mit finaler Copy** (siehe oben)
✅ **Wireframes** (Mobile + Desktop)
✅ **Komponentenliste mit Props**
✅ **Datenmodell** (Supabase-Tabellen)
✅ **Zwei Design-Varianten** (A: Ultra-clean, B: Data-dense)
✅ **Coming Soon Baustein** für Distribution
✅ **Integrations-Roadmap** (5 Phasen)

**Nächste Schritte:**
1. Design-Review mit Stakeholdern (Variante A oder B wählen)
2. Figma-Mockups erstellen (optional)
3. API-Endpunkte definieren (`GET /api/earnings/summary`, etc.)
4. Implementierung: Komponenten → Pages → API
5. Testing: Unit-Tests, E2E, Performance
