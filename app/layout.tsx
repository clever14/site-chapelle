import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-cormorant", display: "swap",
});
const mulish = Mulish({
  subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-mulish", display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap",
});

export const metadata: Metadata = {
  title: "Chapelle Sainte Jeanne d'Arc · Djibi Village, Abidjan",
  description:
    "Site de la Chapelle Sainte Jeanne d'Arc à Djibi Village (Abidjan) : horaires des messes, actualités, événements, galerie et contact.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${mulish.variable} ${plexMono.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
