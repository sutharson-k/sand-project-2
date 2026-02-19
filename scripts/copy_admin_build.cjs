const fs = require("node:fs");
const path = require("node:path");

const distDir = path.resolve(__dirname, "..", "app", "dist");
const targetDir = path.resolve(__dirname, "..", "public", "admin");

if (!fs.existsSync(distDir)) {
  console.error("Admin build not found:", distDir);
  process.exit(1);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

const copyRecursive = (src, dest) => {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }
  fs.copyFileSync(src, dest);
};

copyRecursive(distDir, targetDir);
console.log("Copied admin build to", targetDir);
