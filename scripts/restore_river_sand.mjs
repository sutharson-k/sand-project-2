import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const url = process.env.VITE_CONVEX_URL;
if (!url) {
  console.error("Missing VITE_CONVEX_URL in env");
  process.exit(1);
}

const client = new ConvexHttpClient(url);

const riverSand = {
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
  desc: "Premium natural river sand ideal for concrete mixing, plastering, and general construction. Sourced from riverbeds with consistent grain size and excellent binding properties. Washed and graded for optimal performance.",
  uses: "Concrete, Plastering, Brickwork, Floor screeding",
};

await client.mutation(api.sand.seedSandTypes, { items: [riverSand] });
console.log("River Sand restored.");
