import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Birth Plan Builder | Create Your Perfect Birth Plan",
  description: "Build a beautiful, personalized birth plan in minutes. Free PDF download, 5 gorgeous templates, research-backed options. Make informed decisions for your baby's birth.",
  keywords: ["birth plan", "birth plan builder", "birth plan template", "free birth plan", "pregnancy", "labor preferences"],
  openGraph: {
    title: "Free Birth Plan Builder | Create Your Perfect Birth Plan",
    description: "Build a beautiful, personalized birth plan in minutes. Free PDF download, 5 gorgeous templates.",
    url: "https://birthplanbuilder.com",
    siteName: "Birth Plan Builder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Birth Plan Builder",
    description: "Build a beautiful, personalized birth plan in minutes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
