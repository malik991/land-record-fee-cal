import type { Metadata } from "next";
import Head from "next/head";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import HeaderPage from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/lib/authProvider";
import NewsBanner from "@/components/layout/NewsBanner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://landtaxshare.com"),
  title: {
    default: "Land Transfer Tax and Inheritance Share",
    template: "%s - Land Transfer Tax and Inheritance Share",
  },
  description:
    "Land or property Transfer Fees calculator and inheritance share for Punjab Pakistan. Easily calculate the government tax fee for land mutations and register deeds.",
  keywords:
    "land transfer tax calculator,property transfer fee calculator,land transfer tax,land transfer fees calculator,land transfer fee,warasti calculator, intiqal fees,inheritence tax, plra,land registry fee calculator,وراثتی انتقال کی فیس,property transfer tax calculator,property transfer fee,property share calculator,land transfer tax rate, registry deed fees, mutation tax, zammeen intiqal fees, varasat, hiba, tamleek, inheritance share",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    title: "Land Transfer Tax and Inheritance Share",
    description:
      "Land Transfer Fees calculator and inheritance share for Punjab. Easily calculate the government tax fee for land mutations and register deeds.",
    url: "https://landtaxshare.com/",
    siteName: "land tranfer fees and inheritance share",
    images: [
      {
        url: "https://landtaxshare.com/opengraph-image.png", // Must be an absolute URL
        alt: "Land transfer fee",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Include the custom meta tag using the "other" property
  // other: {
  //   "next-size-adjust": "auto", // Correctly adding the meta tag
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Add structured data for videos */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "VideoObject",
                  name: "intiqal ya registry fees ka online calculator.land mutation transfer fee 2024-2025",
                  description:
                    "want to know how to calculate the land mutation or registry fee in Punjab Pakistan according to update land revenue act. intiqal ki fees ya registry k waqat kitni fees lagti hy ab khud calculate karain. online land fee calculator.",
                  thumbnailUrl:
                    "https://i9.ytimg.com/vi/AnAzmsmx9tE/mqdefault.jpg?v=66d7415a&sqp=CMCTpbcG&rs=AOn4CLBRqv3msvZgAcuNSZ8Evo1eb53bgQ",
                  uploadDate: "2024-09-03T00:00:00Z",
                  contentUrl: "https://www.youtube.com/watch?v=AnAzmsmx9tE",
                  embedUrl:
                    "https://www.youtube.com/embed/AnAzmsmx9tE?si=50UcwPKGrefDBeq_",
                }),
              }}
            />
            <HeaderPage />
            <NewsBanner />
            <main className="max-w-full mx-auto p-5">
              {children}

              <Analytics />
            </main>
            <Toaster />
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
