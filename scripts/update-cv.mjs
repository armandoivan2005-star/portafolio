import { copyFile, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const sourceArgument = process.argv[2];

if (!sourceArgument) {
  console.error("Uso: node scripts/update-cv.mjs <ruta-al-nuevo-cv.pdf>");
  process.exit(1);
}

const source = resolve(sourceArgument);
const contents = await readFile(source);

if (contents.subarray(0, 5).toString() !== "%PDF-") {
  throw new Error("El archivo indicado no parece ser un PDF válido.");
}

const target = new URL("../dist/assets/documents/CV.pdf", import.meta.url);
await copyFile(source, target);
const { size } = await stat(target);

console.log(`CV actualizado en dist/assets/documents/CV.pdf (${size} bytes).`);
