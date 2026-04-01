import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "ICC - Bienvenue dans notre communauté",
  description: "Web App moderne pour l'église ICC. Suivez nos sermons, événements et faites vos dons en ligne.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#1e3a8a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${jakarta.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen bg-white overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
