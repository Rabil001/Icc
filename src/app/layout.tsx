import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

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
    <html lang="fr" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-sans">
        <Header />
        <main className="min-h-screen bg-white overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
