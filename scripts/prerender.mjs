import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const distDir = path.join(rootDir, 'dist');
const ssrDir = path.join(rootDir, '.ssr');
const indexHtmlPath = path.join(distDir, 'index.html');
const serverEntryPath = path.join(ssrDir, 'entry-server.js');

const template = await readFile(indexHtmlPath, 'utf8');
const { render } = await import(pathToFileURL(serverEntryPath).href);

const appHtml = render();

if (!template.includes('<!--ssr-outlet-->')) {
  throw new Error('The prerender template is missing the <!--ssr-outlet--> placeholder.');
}

await writeFile(indexHtmlPath, template.replace('<!--ssr-outlet-->', appHtml), 'utf8');
await rm(ssrDir, { recursive: true, force: true });
