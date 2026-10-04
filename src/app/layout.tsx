import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Solaris Hub — Wuthering Waves Smart Team Builder (v3.7)",
  description: "Account-specific, version-aware Wuthering Waves team builder and knowledge engine. Optimize team synergies, Outro amplification, and rotations based on Resonators you actually own.",
  keywords: ["Wuthering Waves", "WuWa", "Team Builder", "Version 3.7", "Hsin", "Suoming", "Jinhsi", "Rotations", "Echoes"],
  openGraph: {
    title: "Solaris Hub — Wuthering Waves Smart Team Builder",
    description: "Build optimal Wuthering Waves teams based on your owned Resonators and live 3.7 combat balance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-full flex flex-col bg-[#090b10] text-slate-100 antialiased selection:bg-amber-400/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
