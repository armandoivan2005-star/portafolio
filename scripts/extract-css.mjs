import { readFile, writeFile } from "node:fs/promises";

const htmlUrl = new URL("../dist/index.html", import.meta.url);
const cssUrl = new URL("../dist/assets/css/styles.css", import.meta.url);
const html = await readFile(htmlUrl, "utf8");
const styleBlock = html.match(/\n  <style>\n([\s\S]*?)\n  <\/style>/);

if (!styleBlock) {
  await readFile(cssUrl, "utf8");
  console.log("Los estilos ya están separados.");
  process.exit(0);
}

const css = `${styleBlock[1]
  .split("\n")
  .map((line) => line.startsWith("    ") ? line.slice(4) : line)
  .join("\n")
  .trim()}\n`;

const updatedHtml = html.replace(
  styleBlock[0],
  '\n  <link rel="stylesheet" href="assets/css/styles.css">',
);

await writeFile(cssUrl, css, "utf8");
await writeFile(htmlUrl, updatedHtml, "utf8");

console.log("Estilos extraídos a dist/assets/css/styles.css.");
