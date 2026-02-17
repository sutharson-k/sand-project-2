import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function readEnvFile(path) {
  if (!existsSync(path)) return {};
  const content = readFileSync(path, "utf8");
  return Object.fromEntries(
    content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const idx = line.indexOf("=");
        const key = line.slice(0, idx).trim();
        const val = line.slice(idx + 1).trim().replace(/^"|"$/g, "");
        return [key, val];
      }),
  );
}

const envLocal = readEnvFile(resolve(root, ".env.local"));
const env = readEnvFile(resolve(root, ".env"));
const convexUrl =
  process.env.VITE_CONVEX_URL ||
  envLocal.VITE_CONVEX_URL ||
  env.VITE_CONVEX_URL;

if (!convexUrl) {
  console.error("Missing VITE_CONVEX_URL in .env.local or .env");
  process.exit(1);
}

const sandTypes = [
  {
    name: "River Sand",
    category: "construction",
    color: "linear-gradient(135deg,#C2B280,#A89060)",
    image: "images/river-sand.jpg",
    price: 850,
    grain: "0.5 - 2mm",
    moisture: "5-8%",
    density: "1520 kg/m³",
    origin: "River beds",
    icon: "fa-water",
    desc:
      "Premium natural river sand ideal for concrete mixing, plastering, and general construction. Sourced from riverbeds with consistent grain size and excellent binding properties. Washed and graded for optimal performance.",
    uses: "Concrete, Plastering, Brickwork, Floor screeding",
  },
  {
    name: "M-Sand (Manufactured)",
    category: "construction",
    color: "linear-gradient(135deg,#8B8680,#6B6560)",
    image: "images/msand.jfif",
    price: 650,
    grain: "0.15 - 4.75mm",
    moisture: "2-4%",
    density: "1750 kg/m³",
    origin: "Granite crushing",
    icon: "fa-industry",
    desc:
      "Machine-manufactured sand produced by crushing granite rocks. Superior alternative to river sand with consistent quality, zero impurities, and controlled grain distribution. Eco-friendly and highly durable.",
    uses: "RCC work, Plastering, Block/Brick work",
  },
  {
    name: "Silica Sand",
    category: "industrial",
    color: "linear-gradient(135deg,#F5F0DC,#E0D5B0)",
    image: "images/silica-sand.jfif",
    price: 1200,
    grain: "0.1 - 0.5mm",
    moisture: "<1%",
    density: "1600 kg/m³",
    origin: "Quartz deposits",
    icon: "fa-gem",
    desc:
      "High-purity silica sand with 99%+ SiO2 content. Used in glass manufacturing, water filtration, foundry casting, and industrial applications. Carefully processed to ensure consistent purity and grain size.",
    uses: "Glass making, Water filtration, Foundry casting, Sandblasting",
  },
  {
    name: "P-Sand",
    category: "construction",
    color: "linear-gradient(135deg,#C8B08C,#A89070)",
    image: "images/psand.jfif",
    price: 500,
    grain: "0.15 - 4.75mm",
    moisture: "<2%",
    density: "1600 kg/m³",
    origin: "Crushed granite",
    icon: "fa-cubes",
    desc:
      "P-Sand (Plastering Sand) is manufactured sand specifically designed for plastering work. Produced by crushing granite rocks with controlled grain size for smooth finish. Superior bonding and consistency compared to natural sand.",
    uses: "Plastering, Wall finishing, Concrete work, Mortar mixing",
  },
  {
    name: "Landscaping Sand",
    category: "landscaping",
    color: "linear-gradient(135deg,#DAA520,#CD853F)",
    image: "images/landscape-sand.jfif",
    price: 700,
    grain: "0.5 - 1mm",
    moisture: "3-5%",
    density: "1500 kg/m³",
    origin: "Natural deposits",
    icon: "fa-leaf",
    desc:
      "Premium landscaping sand ideal for garden paths, paver joints, and decorative features. Provides excellent drainage and aesthetic appeal. Available in natural golden tones for beautiful outdoor spaces.",
    uses: "Garden paths, Paver joints, Lawn top-dressing, Drainage",
  },
  {
    name: "Black Sand (Volcanic)",
    category: "specialty",
    color: "linear-gradient(135deg,#2C2C2C,#4A4A4A)",
    image: "images/black-sand.jfif",
    price: 1800,
    grain: "0.25 - 1mm",
    moisture: "<3%",
    density: "1700 kg/m³",
    origin: "Volcanic basalt",
    icon: "fa-volcano",
    desc:
      "Rare volcanic black sand sourced from basalt rock formations. Rich in minerals like magnetite and ilmenite. Used for premium decorative projects, zen gardens, and specialty construction requiring unique aesthetics.",
    uses: "Decorative projects, Zen gardens, Premium landscaping, Art installations",
  },
];

const dealers = [
  {
    name: "Sharma Quarries Pvt. Ltd.",
    location: "Pune, Maharashtra",
    rating: 4.8,
    reviews: 342,
    bg: "linear-gradient(135deg,#6C63FF,#B8B5FF)",
    priceMultiplier: 1.0,
  },
  {
    name: "Ganesh Sand Suppliers",
    location: "Chennai, Tamil Nadu",
    rating: 4.6,
    reviews: 218,
    bg: "linear-gradient(135deg,#F2994A,#F2C94C)",
    priceMultiplier: 0.95,
  },
  {
    name: "Rajput Mining Co.",
    location: "Jaipur, Rajasthan",
    rating: 4.9,
    reviews: 567,
    bg: "linear-gradient(135deg,#27AE60,#6FCF97)",
    priceMultiplier: 1.05,
  },
  {
    name: "Krishna Sand Works",
    location: "Hyderabad, Telangana",
    rating: 4.5,
    reviews: 189,
    bg: "linear-gradient(135deg,#2D9CDB,#56CCF2)",
    priceMultiplier: 0.9,
  },
  {
    name: "Patel Aggregates Ltd.",
    location: "Ahmedabad, Gujarat",
    rating: 4.7,
    reviews: 425,
    bg: "linear-gradient(135deg,#EB5757,#FF8A80)",
    priceMultiplier: 1.02,
  },
  {
    name: "Southern Sand Exports",
    location: "Bangalore, Karnataka",
    rating: 4.4,
    reviews: 156,
    bg: "linear-gradient(135deg,#9B59B6,#D5A6E6)",
    priceMultiplier: 0.92,
  },
];

const trucks = [
  {
    name: "Mini Tipper (3 Ton)",
    icon: "fa-truck-pickup",
    capacity: "Up to 3 tons",
    eta: "Same day",
    baseCost: 1500,
    perTon: 200,
  },
  {
    name: "Standard Tipper (7 Ton)",
    icon: "fa-truck",
    capacity: "Up to 7 tons",
    eta: "Same day",
    baseCost: 2500,
    perTon: 150,
  },
  {
    name: "Heavy Dumper (14 Ton)",
    icon: "fa-truck-moving",
    capacity: "Up to 14 tons",
    eta: "Next day",
    baseCost: 4000,
    perTon: 120,
  },
  {
    name: "Trailer Truck (20 Ton)",
    icon: "fa-trailer",
    capacity: "Up to 20 tons",
    eta: "1-2 days",
    baseCost: 6000,
    perTon: 100,
  },
  {
    name: "Bulk Carrier (30 Ton)",
    icon: "fa-truck-monster",
    capacity: "Up to 30 tons",
    eta: "2-3 days",
    baseCost: 8000,
    perTon: 80,
  },
];

const fileMap = new Map([
  ["river-sand.jpg", "River Sand"],
  ["msand.jfif", "M-Sand (Manufactured)"],
  ["silica-sand.jfif", "Silica Sand"],
  ["psand.jfif", "P-Sand"],
  ["landscape-sand.jfif", "Landscaping Sand"],
  ["black-sand.jfif", "Black Sand (Volcanic)"],
]);

async function main() {
  const client = new ConvexHttpClient(convexUrl);
  await client.mutation(api.sand.seedSandTypes, { items: sandTypes });
  await client.mutation(api.sand.seedDealers, { items: dealers });
  await client.mutation(api.sand.seedTrucks, { items: trucks });
  const sands = await client.query(api.sand.listSandTypes);
  const sandByName = new Map(sands.map((s) => [s.name, s]));

  for (const [fileName, sandName] of fileMap.entries()) {
    const sand = sandByName.get(sandName);
    if (!sand) {
      console.warn(`Missing sand record for ${sandName}`);
      continue;
    }
    const filePath = resolve(root, "public", "images", fileName);
    if (!existsSync(filePath)) {
      console.warn(`Missing file ${filePath}`);
      continue;
    }
    const uploadUrl = await client.mutation(api.images.generateUploadUrl, {});
    const bytes = readFileSync(filePath);
    const contentType = fileName.endsWith(".jpg")
      ? "image/jpeg"
      : "image/jpeg";
    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body: bytes,
    });
    if (!res.ok) {
      console.error(`Upload failed for ${fileName}: ${res.status}`);
      continue;
    }
    const { storageId } = await res.json();
    await client.mutation(api.images.attachSandImage, {
      sandId: sand._id,
      storageId,
    });
    console.log(`Uploaded ${fileName} -> ${sandName}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
