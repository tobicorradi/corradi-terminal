import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const distDir = path.join(rootDir, 'dist');
const siteConfigPath = path.join(rootDir, 'site.config.json');
const siteConfig = JSON.parse(await readFile(siteConfigPath, 'utf8'));

const siteUrl = siteConfig.siteUrl.endsWith('/') ? siteConfig.siteUrl.slice(0, -1) : siteConfig.siteUrl;
const lastModified = new Date().toISOString();

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteUrl}
`;

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

await writeFile(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');
await writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
