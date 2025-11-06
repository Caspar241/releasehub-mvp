import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "ReleaseHub - Dein Release-System. Keine Labels. Keine Prozente.",
  description: "Das Operating System für Independent Artists. Struktur statt Chaos. Fairness statt Gatekeeper. 0% Rights Taken. 100% deine Musik.",
  keywords: ["music release", "independent artists", "release management", "music distribution", "artist tools", "diy music"],
  authors: [{ name: "ReleaseHub" }],
  openGraph: {
    title: "ReleaseHub - Artist Operating System",
    description: "Struktur statt Chaos. 0% Rights Taken.",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReleaseHub - Artist Operating System",
    description: "Struktur statt Chaos. 0% Rights Taken.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={inter.variable}>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
