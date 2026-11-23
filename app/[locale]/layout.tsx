import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "../fonts.css";
import "../globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { ScrollReveals } from "@/components/motion/scroll-reveals";
import { isLocale, Locale, locales } from "@/lib/localization/config";
import { siteSettings } from "@/content/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    title: "Flowers Boutique | Lake Como",
    description: "Flowers Boutique: premium floral design, delivery, weddings and events on Lake Como.",
    metadataBase: new URL(base),
    icons: {
      icon: siteSettings.logo,
      shortcut: siteSettings.logo,
      apple: siteSettings.logo
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: "/ru",
        en: "/en",
        it: "/it"
      }
    },
    openGraph: {
      title: "Flowers Boutique | Lake Como",
      description: "Flowers Boutique: artful floristry on Lake Como.",
      images: [siteSettings.logo]
    },
    twitter: {
      card: "summary_large_image",
      title: "Flowers Boutique | Lake Como",
      description: "Flowers Boutique: artful floristry on Lake Como."
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const messages = (await import(`../../content/messages/${locale}.json`)).default;

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          <main className="site-main">{children}</main>
          <Footer locale={locale} />
          <CartDrawer locale={locale} />
          <CookieConsent locale={locale} />
          <FloatingWhatsApp locale={locale} />
          <SmoothScroll />
          <ScrollReveals />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
