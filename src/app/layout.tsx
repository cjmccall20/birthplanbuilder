import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
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
  title: "Free Birth Plan Template | Create Your Personalized Birth Plan",
  description: "Use our free natural birth plan generator to create a beautiful, personalized birth plan in minutes. Choose from 5 professional templates. No account needed - get your PDF instantly!",
  keywords: ["free birth plan template", "natural birth plan generator", "birth plan builder", "birth plan template", "free birth plan", "pregnancy planning", "labor preferences", "birth plan pdf"],
  openGraph: {
    title: "Free Birth Plan Template | Create Your Personalized Birth Plan",
    description: "Use our free natural birth plan generator to create a beautiful, personalized birth plan in minutes. Choose from 5 professional templates - get your PDF instantly!",
    url: "https://birthplanbuilder.com",
    siteName: "Birth Plan Builder",
    type: "website",
    images: [
      {
        url: "https://birthplanbuilder.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Free Birth Plan Template - Birth Plan Builder"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Birth Plan Template | Natural Birth Plan Generator",
    description: "Create a beautiful, personalized birth plan in minutes. 5 professional templates, 100% free, instant PDF download.",
    images: ["https://birthplanbuilder.com/og-image.jpg"],
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
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
