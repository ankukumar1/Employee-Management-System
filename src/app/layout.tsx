import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell/SiteShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PeoplePulse · Employee Management System",
  description:
    "Monitor employee health, track organisational growth, and empower HR teams with PeoplePulse.",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    title: "PeoplePulse · Employee Management System",
    description:
      "Monitor employee health, track organisational growth, and empower HR teams with PeoplePulse.",
    url: "https://peoplepulse.example.com",
    siteName: "PeoplePulse",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PeoplePulse · Employee Management System",
    description:
      "Monitor employee health, track organisational growth, and empower HR teams with PeoplePulse.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 text-slate-900 antialiased`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
