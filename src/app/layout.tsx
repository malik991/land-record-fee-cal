import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import HeaderPage from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/lib/authProvider";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://landtaxshare.com"),
  title: {
    default: "Land Transfer Tax and Inheritance Share",
    template: "%s - Land Transfer Tax and Inheritance Share",
  },
  description:
    "Land Transfer Fee calculator and inheritance share for Punjab. Easily calculate the government tax fee for land mutations and register deeds.",
  keywords:
    "land, deeds, intiqal fees, plra, registry deed fees, mutation tax, zammeen intiqal fees, varasat, hiba, tamleek, inheritance share",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    title: "Land Transfer Tax and Inheritance Share",
    description:
      "Land Transfer Fee calculator and inheritance share for Punjab. Easily calculate the government tax fee for land mutations and register deeds.",
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
            <HeaderPage />
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
