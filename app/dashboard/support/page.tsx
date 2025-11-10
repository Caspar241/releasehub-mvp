"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import * as LucideIcons from "lucide-react";

const faqData = [
  {
    question: "Wie lange dauert die Distribution zu Spotify?",
    answer:
      "Die Distribution dauert in der Regel 3-5 Werktage. Für Spotify Playlist Pitching empfehlen wir mindestens 7 Tage vor Release-Datum.",
  },
  {
    question: "Welche Dateiformate werden unterstützt?",
    answer:
      "Wir akzeptieren WAV und FLAC Dateien in höchster Qualität. Mindestanforderung: 16-bit, 44.1kHz. Artwork muss 3000x3000px JPG/PNG sein.",
  },
  {
    question: "Wie funktioniert die Auszahlung?",
    answer:
      "Auszahlungen erfolgen monatlich ab einem Mindestsaldo von €50. Die Zahlung wird per Banküberweisung oder PayPal durchgeführt.",
  },
  {
    question: "Kann ich meine Releases später bearbeiten?",
    answer:
      "Ja, Metadaten können jederzeit aktualisiert werden. Änderungen an Audio oder Artwork nach Go-Live benötigen eine neue Version.",
  },
];

export default function SupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [ticketForm, setTicketForm] = useState({
    category: "",
    subject: "",
    description: "",
  });

  return (
    <DashboardLayout>
      <PageHeader
        title="Support & Hilfe"
        description="Finde Antworten oder kontaktiere unser Support-Team"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Support" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - FAQ */}
        <div className="lg:col-span-2 space-y-6">
          {/* FAQ Section */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <LucideIcons.HelpCircle size={24} className="text-accent" />
              Häufig gestellte Fragen
            </h2>

            <div className="space-y-3">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-surface-overlay/30 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-surface-overlay/50 transition-all"
                  >
                    <span className="text-sm font-medium text-text-primary pr-4">
                      {faq.question}
                    </span>
                    <LucideIcons.ChevronDown
                      size={20}
                      className={`text-text-secondary transition-transform flex-shrink-0 ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <LucideIcons.MessageSquare size={24} className="text-accent" />
              Ticket erstellen
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Kategorie
                </label>
                <select
                  value={ticketForm.category}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, category: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface-overlay border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Bitte wählen...</option>
                  <option value="technical">Technisches Problem</option>
                  <option value="billing">Abrechnung & Auszahlung</option>
                  <option value="distribution">Distribution</option>
                  <option value="account">Account & Einstellungen</option>
                  <option value="other">Sonstiges</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Betreff
                </label>
                <input
                  type="text"
                  value={ticketForm.subject}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, subject: e.target.value })
                  }
                  placeholder="Kurze Beschreibung deines Anliegens"
                  className="w-full px-4 py-3 bg-surface-overlay border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Beschreibung
                </label>
                <textarea
                  value={ticketForm.description}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, description: e.target.value })
                  }
                  placeholder="Bitte beschreibe dein Anliegen so detailliert wie möglich..."
                  rows={6}
                  className="w-full px-4 py-3 bg-surface-overlay border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Anhänge (optional)
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-all cursor-pointer">
                  <LucideIcons.Upload className="mx-auto mb-2 text-text-muted" size={32} />
                  <p className="text-sm text-text-secondary">
                    Klicken um Dateien hochzuladen
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    Max. 10MB (PNG, JPG, PDF)
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all shadow-soft hover:shadow-card"
              >
                Ticket absenden
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Status & Quick Links */}
        <div className="space-y-6">
          {/* System Status */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-4">
              Systemstatus
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">API</span>
                <span className="flex items-center gap-2 text-sm text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Distribution</span>
                <span className="flex items-center gap-2 text-sm text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Analytics</span>
                <span className="flex items-center gap-2 text-sm text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Operational
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-4">
              Hilfreiche Links
            </h3>
            <div className="space-y-2">
              <a
                href="/dashboard/knowledge"
                className="block px-3 py-2 text-sm text-text-secondary hover:text-accent hover:bg-surface-overlay/40 rounded-lg transition-all"
              >
                <LucideIcons.BookOpen size={16} className="inline mr-2" />
                Knowledge Hub
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-sm text-text-secondary hover:text-accent hover:bg-surface-overlay/40 rounded-lg transition-all"
              >
                <LucideIcons.Video size={16} className="inline mr-2" />
                Video Tutorials
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-sm text-text-secondary hover:text-accent hover:bg-surface-overlay/40 rounded-lg transition-all"
              >
                <LucideIcons.FileText size={16} className="inline mr-2" />
                Documentation
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-sm text-text-secondary hover:text-accent hover:bg-surface-overlay/40 rounded-lg transition-all"
              >
                <LucideIcons.MessageCircle size={16} className="inline mr-2" />
                Community Forum
              </a>
            </div>
          </div>

          {/* Feedback */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-3">
              Feedback geben
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Hilf uns ReleaseHub zu verbessern
            </p>
            <button className="w-full px-4 py-2 bg-surface-overlay hover:bg-surface-overlay/80 text-text-primary border border-border hover:border-accent rounded-lg transition-all text-sm font-medium">
              <LucideIcons.Heart size={16} className="inline mr-2" />
              Feedback senden
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
