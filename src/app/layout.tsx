import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300..900&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-white overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
