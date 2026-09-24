import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const sourceDir = path.join(ROOT, "import-data", "Sitio", "images");
const targetDir = path.join(ROOT, "public", "brand");

if (!fs.existsSync(sourceDir)) {
  console.error(`No existe: ${sourceDir}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

const files = fs.readdirSync(sourceDir);

function findPart(part: string) {
  return files.find((file) =>
    file.toLowerCase().includes(part.toLowerCase())
  );
}

const mappings = [
  {
    source: findPart("UMU_MARCA-02-1"),
    target: "header-logo.png",
    label: "logo header",
  },
  {
    source: findPart("01-BLANCO-SIN-FONDO-1-1"),
    target: "footer-logo.png",
    label: "logo footer",
  },
  {
    source: findPart("UMU_MARCA-04-CHICO-2"),
    target: "about-logo.jpg",
    label: "logo Nosotros",
  },
];

for (const item of mappings) {
  if (!item.source) {
    console.error(`✗ No encontré ${item.label}`);
    continue;
  }

  const from = path.join(sourceDir, item.source);
  const to = path.join(targetDir, item.target);

  fs.copyFileSync(from, to);
  console.log(`✓ ${item.label}: ${item.source} -> public/brand/${item.target}`);
}
