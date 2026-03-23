import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { siteConfig } from "@/content/site";

import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

import { CustomCursor } from "@/components/ui/custom-cursor";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const roca = localFont({
  src: [
    { path: "./fonts/Roca-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/Roca.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-roca",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1D261D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL("https://nasi-mpls.com"), // Replace with actual domain if known
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: "https://nasi-mpls.com",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/NASI_orange.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/images/NASI_orange.png"],
  },
  icons: {
    icon: "/images/tab_logo.png",
    shortcut: "/images/tab_logo.png",
    apple: "/images/tab_logo.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        className={`${roca.variable} font-sans bg-[#1D261D]`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
