export type Category = "single-origin" | "blend" | "decaf";
export type RoastLabel = "Light" | "Medium" | "Dark";

export interface Product {
  id: string;
  name: string;
  origin: string;
  category: Category;
  roastLabel: RoastLabel;
  roastLevel: number; // 1–5
  price: number; // per 250 g
  weight: string;
  notes: string[];
  process: string;
  altitude: string;
  varietal: string;
  score: number; // SCA-style cup score
  accent: string;
  badge?: string;
  description: string;
  image: string;
}

export const CATEGORY_LABELS: Record<Category | "all", string> = {
  all: "All beans",
  "single-origin": "Single origin",
  blend: "Blends",
  decaf: "Decaf",
};

export const GRINDS = ["Whole bean", "Filter", "Espresso", "Cold brew"] as const;
export type Grind = (typeof GRINDS)[number];

export const PRODUCTS: Product[] = [
  {
    id: "yirgacheffe-dawn",
    name: "Yirgacheffe Dawn",
    origin: "Gedeb, Ethiopia",
    category: "single-origin",
    roastLabel: "Light",
    roastLevel: 2,
    price: 21,
    weight: "250 g",
    notes: ["Bergamot", "Apricot jam", "Jasmine"],
    process: "Washed",
    altitude: "1,900 – 2,200 m",
    varietal: "Ethiopian heirloom",
    score: 88.5,
    accent: "#e5b26a",
    badge: "New crop",
    description:
      "A luminous washed heirloom from the Gedeb highlands. We pull this roast early to keep the florals intact — think Earl Grey steeped in apricot, with a jasmine finish that lingers like good news.",
    image:
      "https://image.qwenlm.ai/generated-images/9f6052c7-d3c9-4909-abd6-21b27eae7e38/_result.png",
  },
  {
    id: "huila-homestead",
    name: "Huila Homestead",
    origin: "San Agustín, Colombia",
    category: "single-origin",
    roastLabel: "Medium",
    roastLevel: 3,
    price: 19,
    weight: "250 g",
    notes: ["Caramel", "Red apple", "Cacao nib"],
    process: "Washed",
    altitude: "1,750 m",
    varietal: "Caturra & Pink Bourbon",
    score: 87,
    accent: "#d98a52",
    description:
      "From the Trujillo family's fourth-generation finca above San Agustín. A round, comforting cup — buttery caramel up front, crisp red-apple acidity, and a clean cacao-nib close.",
    image:
      "https://image.qwenlm.ai/generated-images/674bba62-b1d0-4406-8964-4301533c3589/_result.png",
  },
  {
    id: "mandheling-ember",
    name: "Mandheling Ember",
    origin: "Lake Toba, Sumatra",
    category: "single-origin",
    roastLabel: "Dark",
    roastLevel: 5,
    price: 18.5,
    weight: "250 g",
    notes: ["Cedar", "Dark chocolate", "Molasses"],
    process: "Wet-hulled (Giling Basah)",
    altitude: "1,500 m",
    varietal: "Ateng & Jember",
    score: 85.5,
    accent: "#8fae8b",
    description:
      "A brooding, syrupy Sumatra pushed to the edge of second crack. Cedar and damp earth over 85% dark chocolate — the cup that made our roaster quit his espresso-purist ways.",
    image:
      "https://image.qwenlm.ai/generated-images/dcb36ea7-8fbb-4d11-9a5d-ae7d6f83855f/_result.png",
  },
  {
    id: "midnight-ledger",
    name: "Midnight Ledger",
    origin: "Brazil & Sumatra blend",
    category: "blend",
    roastLabel: "Dark",
    roastLevel: 5,
    price: 17.5,
    weight: "250 g",
    notes: ["Bittersweet cacao", "Toasted walnut", "Demerara"],
    process: "Natural + wet-hulled",
    altitude: "1,100 – 1,500 m",
    varietal: "Mundo Novo & Ateng",
    score: 86,
    accent: "#e0862f",
    badge: "Barista's pick",
    description:
      "Our espresso workhorse. A dense, chocolate-forward blend built to cut through milk — bittersweet cacao and toasted walnut with a demerara sweetness that survives any grinder.",
    image:
      "https://image.qwenlm.ai/generated-images/204b0779-656d-439a-a859-cc6e2ffba6d8/_result.png",
  },
  {
    id: "hearthside",
    name: "Hearthside",
    origin: "Colombia & Guatemala blend",
    category: "blend",
    roastLabel: "Medium",
    roastLevel: 3,
    price: 17,
    weight: "250 g",
    notes: ["Wildflower honey", "Hazelnut", "Orange marmalade"],
    process: "Washed + honey",
    altitude: "1,600 – 1,900 m",
    varietal: "Caturra & Bourbon",
    score: 86.5,
    accent: "#a5b389",
    badge: "Best seller",
    description:
      "The morning coffee of the house — easy, warm, endlessly repeatable. Honeyed sweetness and toasted hazelnut with a flicker of marmalade brightness. Brews well in anything.",
    image:
      "https://image.qwenlm.ai/generated-images/c29cfac8-e5cf-4f72-8cd9-758014901fca/_result.png",
  },
  {
    id: "quiet-hours",
    name: "Quiet Hours",
    origin: "Cauca, Colombia",
    category: "decaf",
    roastLabel: "Medium",
    roastLevel: 3,
    price: 20,
    weight: "250 g",
    notes: ["Milk chocolate", "Orange zest", "Marzipan"],
    process: "Swiss Water® decaffeinated",
    altitude: "1,800 m",
    varietal: "Castillo",
    score: 85,
    accent: "#9db4c9",
    badge: "Swiss Water®",
    description:
      "Decaf that doesn't apologize. A chemical-free Swiss Water lot we roast like we mean it — milk chocolate body, a lift of orange zest, and zero of that papery decaf aftertaste.",
    image:
      "https://image.qwenlm.ai/generated-images/a8afc180-d0b0-4803-955e-a87a0db0597c/_result.png",
  },
];

export const HERO_IMAGE =
  "https://image.qwenlm.ai/generated-images/4d2b05f8-b250-4aab-99a8-2504da696856/_result.png";

export const FREE_SHIPPING_THRESHOLD = 45;
export const FLAT_SHIPPING = 6;

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
