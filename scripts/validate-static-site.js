const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const requiredFiles = [
  "index.html",
  "404.html",
  "styles.css",
  "script.js",
  "assets/hero-market.png",
  "assets/favicon.svg",
  "site.webmanifest",
  "robots.txt",
  "vercel.json",
  "netlify.toml",
  ".github/workflows/pages.yml",
  ".nojekyll"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length > 0) {
  console.error(`Missing required files: ${missing.join(", ")}`);
  process.exit(1);
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const references = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
const localReferences = references.filter((reference) => !reference.startsWith("#") && !/^[a-z]+:/i.test(reference));
const broken = localReferences.filter((reference) => !fs.existsSync(path.join(root, reference)));

if (broken.length > 0) {
  console.error(`Broken local references: ${broken.join(", ")}`);
  process.exit(1);
}

console.log("Static site validation passed.");
