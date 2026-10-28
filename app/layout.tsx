import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

const sans = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: "Devs Recipe: software that cuts costs and automates operations",
    template: "%s | Devs Recipe",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Devs Recipe: software that cuts costs and automates operations",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "rgb(15, 17, 21)",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
