import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "YRC Global | Industrial B2B & B2C Marketplace and Business Ecosystem",
  description:
    "India's premier industrial marketplace connecting verified manufacturers, buyers, and channel partners across water treatment, renewable energy, machinery, and flow control with precision RFQ procurement.",
  keywords: [
    "industrial marketplace",
    "b2b ecommerce india",
    "sewage treatment plants",
    "biogas purification",
    "roots blowers",
    "liquid ring vacuum pumps",
    "injection moulding machines",
    "msme schemes",
  ],
  authors: [{ name: "YRC Expo Marketing Private Limited" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-100/90 text-slate-900 antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Providers>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
