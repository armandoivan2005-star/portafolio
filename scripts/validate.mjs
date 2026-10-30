import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
const notFound = await readFile(new URL("../dist/404.html", import.meta.url), "utf8");
const htaccess = await readFile(new URL("../dist/.htaccess", import.meta.url), "utf8");
const css = await readFile(new URL("../dist/assets/css/styles.css", import.meta.url), "utf8");
const cv = await readFile(new URL("../dist/assets/documents/CV.pdf", import.meta.url));
const robots = await readFile(new URL("../dist/robots.txt", import.meta.url), "utf8");
const sitemap = await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
const projectImageNames = ["fiscalix.png", "pliegoluz.png", "matego.png", "divisas.png"];
const projectImages = await Promise.all(projectImageNames.map((name) => readFile(new URL(`../dist/assets/images/${name}`, import.meta.url))));
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);

for (const script of scripts) {
  Function(script);
}

const requiredFragments = [
  "<title>Armando Castillo",
  '<link rel="canonical" href="https://portafolio.novasoftsl.com/">',
  '<meta property="og:url" content="https://portafolio.novasoftsl.com/">',
  '<meta property="og:image" content="https://portafolio.novasoftsl.com/assets/images/fiscalix.png">',
  'id="proyectos"',
  'id="certificados"',
  'id="perfil"',
  'Sobre mí',
  'id="contacto"',
  'id="project-dialog"',
  'id="primary-navigation"',
  'class="menu-toggle"',
  'id="dialog-challenge"',
  'id="dialog-approach"',
  'id="dialog-outcome"',
  'id="dialog-contribution"',
  'href="https://fiscalix.novasoftsl.com"',
  'href="https://matego.novasoftsl.com"',
  'href="https://pliegoluz.novasoftsl.com"',
  'href="https://divisas.novasoftsl.com"',
  'href="https://drive.google.com/drive/folders/1azojpdZdnN3o206k-4JZj6JJXH4ramaa?usp=drive_link"',
  'href="https://github.com/armandoivan2005-star"',
  'href="https://github.com/armandoivan2005-star/portafolio"',
  'juan@lasc.com',
  '12345678',
  'Los datos se actualizan a diario.',
  'Consulta de divisas y panel de acciones (México y EUA)',
  'DEMO-DIVISAS',
  'DEMODIV210705',
  'El panel de acciones está disponible únicamente para administradores y supervisores.',
  'href="mailto:armandoivan2005@gmail.com"',
  'href="assets/documents/CV.pdf"',
  'CV actualizado: octubre de 2026',
  'class="project-result"',
  'Proyecto propio · Demo disponible · 93% del desarrollo',
  'Proyecto propio · Demo disponible · Desarrollo completo',
  '93% de participación:',
  'Desarrollo completo (100%):',
  'https://github.com/armandoivan2005-star/Fiscalix',
  'https://github.com/armandoivan2005-star/Pliegoluz',
  'https://github.com/armandoivan2005-star/matematicas',
  'https://github.com/armandoivan2005-star/Divisas',
  'aria-describedby="dialog-summary"',
  'href="assets/css/styles.css"',
  'Reto',
  'Enfoque',
  'Resultado',
  'Mi aporte',
  ...projectImageNames.map((name) => `src="assets/images/${name}"`),
];

const missing = requiredFragments.filter((fragment) => !html.includes(fragment));
if (missing.length > 0) {
  throw new Error(`Faltan elementos requeridos: ${missing.join(", ")}`);
}

if (/<style(?:\s|>)/i.test(html)) {
  throw new Error("El HTML todavía contiene estilos internos.");
}

const projectCount = (html.match(/<article class="project"/g) || []).length;
if (projectCount !== 4) {
  throw new Error(`Se esperaban 4 proyectos visibles y se encontraron ${projectCount}.`);
}

if (cv.subarray(0, 5).toString() !== "%PDF-") {
  throw new Error("dist/assets/documents/CV.pdf no parece ser un PDF válido.");
}

if (projectImages.some((image) => image.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a")) {
  throw new Error("Una o más capturas de proyectos no parecen ser PNG válidos.");
}

if (!robots.includes("User-agent: *") || !robots.includes("Allow: /")) {
  throw new Error("robots.txt no contiene una política pública válida.");
}

if (!robots.includes("Sitemap: https://portafolio.novasoftsl.com/sitemap.xml")) {
  throw new Error("robots.txt no apunta al sitemap público.");
}

if (!sitemap.includes("<loc>https://portafolio.novasoftsl.com/</loc>")) {
  throw new Error("sitemap.xml no contiene la URL pública del portafolio.");
}

if (!css.includes(":root") || !css.includes(".project-grid")) {
  throw new Error("La hoja de estilos externa no contiene las reglas principales.");
}

if (!notFound.includes("<title>404 | Armando Castillo</title>") || !notFound.includes('href="/"') || !notFound.includes('href="/assets/css/styles.css"')) {
  throw new Error("La página 404 personalizada no contiene su título, regreso al inicio o estilos externos.");
}

if (!htaccess.includes("ErrorDocument 404 /404.html")) {
  throw new Error(".htaccess no está configurado para mostrar la página 404 personalizada.");
}

console.log(`Portafolio validado: CSS externo, ${projectCount} proyectos, ${scripts.length} bloque de JavaScript y ${requiredFragments.length} elementos clave.`);
