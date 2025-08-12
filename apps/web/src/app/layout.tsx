import { fontClassNames } from '@/lib/fonts';

import '@/styles/globals.css';

import Footer from '@/components/footer';

import type { Metadata } from 'next';
import { viewport, generateMetadata as generateMetadataHelper } from '@/lib/metadata';
import { generateOrganizationSchema } from '@/lib/schema/organization';
import { SITE_TITLE, BASE_URL, ORG_LOGO_URL, ORG_SOCIAL_PROFILES } from '@/lib/constants';
import { GoogleTagManager } from '@next/third-parties/google';

export { viewport };

// Site-wide metadata that all pages inherit
export const metadata: Metadata = await generateMetadataHelper({
  // No pageTitle here - just use the default SITE_TITLE
  // No path here - this is site-wide
  path: '/',
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate organization schema for all pages
  const organizationSchema = generateOrganizationSchema({
    name: SITE_TITLE,
    url: BASE_URL,
    logoUrl: ORG_LOGO_URL,
    sameAs: ORG_SOCIAL_PROFILES,
  });

  return (
    <html lang="en" className={`${fontClassNames} antialiased`} suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for optimal performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Organization schema present on all pages */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <GoogleTagManager gtmId={GTM_ID || ''} />
      <body className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
