import type { Metadata, Viewport } from "next";
import { Spectral } from "next/font/google";
import "./globals.css";

const spectral = Spectral({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-spectral",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shogo Kamino — Portfolio",
  description: "AI Orchestrator — Shogo Kamino のポートフォリオ。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={spectral.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
