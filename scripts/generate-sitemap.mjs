import { writeFile } from "node:fs/promises";

const baseUrl = process.argv[2]?.replace(/\/+$/, "");

if (!baseUrl || !/^https?:\/\/[^\s]+$/i.test(baseUrl)) {
  console.error("Uso: node scripts/generate-sitemap.mjs https://tu-subdominio.tudominio.com");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`;

await writeFile(new URL("../dist/sitemap.xml", import.meta.url), sitemap, "utf8");
console.log(`Sitemap generado para ${baseUrl}/`);
