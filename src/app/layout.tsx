import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import Motion from "@/components/Motion";
import Interactions from "@/components/Interactions";
import PageTransition from "@/components/PageTransition";
import { ConsultationProvider } from "@/components/Consultation";
import { site } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const display = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: `${site.name} | Digital Marketing Agency in Bangladesh`, template: `%s | ${site.name}` },
  description: site.tagline,
};

export const viewport: Viewport = { themeColor: "#0f2a1b" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} antialiased`}>
      <head>
        <noscript>
          <style>{`[data-reveal],[data-reveal] > *{opacity:1 !important}.word-in{transform:none !important}.hero-slide [data-in]{opacity:1 !important}`}</style>
        </noscript>
      </head>
      <body id="top" className="min-h-screen flex flex-col">
        <ConsultationProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContact />
          <Motion />
          <Interactions />
          <PageTransition />
        </ConsultationProvider>
      </body>
    </html>
  );
}
