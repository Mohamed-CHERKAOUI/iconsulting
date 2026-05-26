import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageThemeControls } from "@/components/LanguageThemeControls";

export const metadata: Metadata = {
  metadataBase: new URL("https://iconsulting-group.vercel.app"),
  title: {
    default: "iConsulting | Cybersecurity, IT Audit & Digital Transformation",
    template: "%s | iConsulting"
  },
  description:
    "Cybersecurity, IT audit and digital transformation consulting for organizations that need controlled digital systems.",
  openGraph: {
    title: "iConsulting",
    description: "Secure. Audit. Transform.",
    url: "https://iconsulting-group.vercel.app",
    siteName: "iConsulting",
    images: [{ url: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=80", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        <LanguageThemeControls />
        {children}
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0D1626",
              color: "#F0F4FF",
              border: "1px solid rgba(255,255,255,.08)"
            },
            error: {
              iconTheme: { primary: "#ff4d6d", secondary: "#fff" }
            }
          }}
        />
      </body>
    </html>
  );
}
