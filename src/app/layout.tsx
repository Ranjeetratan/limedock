import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import {
  BOOK_DEMO_URL,
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";
import "./globals.css";

const monaSans = localFont({
  src: "../fonts/Mona-Sans.woff2",
  variable: "--font-mona-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: ["/favicon.png"],
    apple: [{ url: "/favicon.png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    title: SITE_NAME,
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/favicon.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/limedock-logo.svg"),
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  sameAs: [
    "https://x.com/limedock",
    "https://www.linkedin.com/company/limedock/",
    "https://www.instagram.com/limedock_agency/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: CONTACT_EMAIL,
    url: BOOK_DEMO_URL,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
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
        className={`${monaSans.variable} antialiased bg-canvas text-body`}
        suppressHydrationWarning
      >
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-09SCWBGQLT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-09SCWBGQLT');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
