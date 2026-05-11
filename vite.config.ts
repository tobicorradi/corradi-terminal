import { readFileSync } from 'node:fs';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

interface SiteConfig {
  company: string;
  description: string;
  education: string;
  githubUrl: string;
  iconPath: string;
  jobTitle: string;
  keywords: string[];
  linkedinUrl: string;
  locale: string;
  location: string;
  ogImageAlt: string;
  ogImagePath: string;
  siteName: string;
  siteUrl: string;
  themeColor: string;
  title: string;
}

const siteConfig = JSON.parse(
  readFileSync(new URL('./site.config.json', import.meta.url), 'utf8'),
) as SiteConfig;

const canonicalUrl = `${siteConfig.siteUrl.replace(/\/$/, '')}/`;
const ogImageUrl = new URL(siteConfig.ogImagePath, canonicalUrl).toString();
const iconUrl = new URL(siteConfig.iconPath, canonicalUrl).toString();
const structuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.siteName,
  url: canonicalUrl,
  image: ogImageUrl,
  jobTitle: siteConfig.jobTitle,
  description: siteConfig.description,
  worksFor: {
    '@type': 'Organization',
    name: siteConfig.company,
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: siteConfig.education,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Buenos Aires',
    addressCountry: 'AR',
  },
  homeLocation: {
    '@type': 'Place',
    name: siteConfig.location,
  },
  sameAs: [siteConfig.githubUrl, siteConfig.linkedinUrl],
  knowsAbout: siteConfig.keywords.slice(3),
});

const htmlReplacements = new Map<string, string>([
  ['__SITE_TITLE__', siteConfig.title],
  ['__SITE_DESCRIPTION__', siteConfig.description],
  ['__SITE_KEYWORDS__', siteConfig.keywords.join(', ')],
  ['__SITE_THEME_COLOR__', siteConfig.themeColor],
  ['__SITE_CANONICAL__', canonicalUrl],
  ['__SITE_LOCALE__', siteConfig.locale],
  ['__SITE_NAME__', siteConfig.siteName],
  ['__SITE_OG_IMAGE__', ogImageUrl],
  ['__SITE_OG_IMAGE_ALT__', siteConfig.ogImageAlt],
  ['__SITE_STRUCTURED_DATA__', structuredData],
  ['__SITE_ICON__', iconUrl],
]);

const replaceHtmlTokens = (html: string) =>
  Array.from(htmlReplacements.entries()).reduce(
    (currentHtml, [token, value]) => currentHtml.split(token).join(value),
    html,
  );

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-site-metadata',
      transformIndexHtml(html) {
        return replaceHtmlTokens(html);
      },
    },
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
});
