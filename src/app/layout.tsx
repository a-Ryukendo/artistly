import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShortlistProvider } from "@/contexts/ShortlistContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { PageTransition } from "@/components/PageTransition";

// Load custom fonts using next/font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define default metadata for the application (SEO)
export const metadata: Metadata = {
  title: {
    default: "Artistly | Find and Book Performing Artists", // Default title for the site
    template: "%s | Artistly", // Template for titles on other pages
  },
  description: "The platform for Event Planners and Artist Managers to connect, book, and manage performing artists for any event.",
};

/**
 * RootLayout is the main layout component that wraps every page.
 * It sets up global providers (Theme, Shortlist) and a consistent UI (Header).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ThemeProvider handles light/dark mode switching */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* ShortlistProvider manages the global state for shortlisted artists */}
          <ShortlistProvider>
            {/* Header is the consistent navigation bar on top of every page */}
            <Header />
            {/* PageTransition wraps page content to provide animations */}
            <PageTransition>
              {children}
            </PageTransition>
          </ShortlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
