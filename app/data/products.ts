export interface Product {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  rating: number;
  reviews: number;
  img: string;
  images?: string[];
  badge: string;
  badgeColor?: string;
  category: string;
  description: string;
  shippingNote?: string;
  types?: string[];
  colors?: string[];
}

export const allProducts: Product[] = [
  {
    id: "organic-cotton-tee",
    name: "Organic Cotton Tee",
    price: "Rs300",
    priceValue: 300,
    rating: 4.9,
    reviews: 124,
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    badge: "ORGANIC",
    badgeColor: "#4a7c59",
    category: "Clothing",
    description:
      "Soft, breathable everyday tee made from 100% GOTS-certified organic cotton. Grown without synthetic pesticides and finished with low-impact dyes.",
    shippingNote: "Arrives soon!",
    types: ["Regular Fit", "Relaxed Fit"],
    colors: ["#2d4a2d", "#6b6b5e", "#c9b79c"],
  },
  {
    id: "linen-bedding-set",
    name: "Linen Bedding Set",
    price: "Rs350",
    priceValue: 350,
    rating: 5.0,
    reviews: 88,
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    badge: "",
    category: "Bedding",
    description:
      "Stonewashed European flax linen, woven for breathability and softening with every wash. Includes one duvet cover and two pillowcases.",
    shippingNote: "Ships in 2-3 days",
    types: ["Single", "Double", "Queen"],
    colors: ["#4a7c59", "#3e3e3e", "#cfc7b8"],
  },
  {
    id: "bamboo-brush",
    name: "Bamboo Brush",
    price: "Rs300",
    priceValue: 300,
    rating: 4.7,
    reviews: 42,
    img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80",
    badge: "",
    category: "Accessories",
    description:
      "Charcoal-infused bristles set in a sustainably harvested bamboo handle. Gentle on skin, tough on grime, and fully compostable at end of life.",
    shippingNote: "Arrives soon!",
    types: ["Soft Bristle", "Firm Bristle"],
    colors: ["#5c4a36"],
  },
  {
    id: "modern-ceramic-vase",
    name: "Modern Ceramic Vase",
    price: "Rs250",
    priceValue: 250,
    rating: 4.8,
    reviews: 210,
    img: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
    badge: "BESTSELLER",
    badgeColor: "#888",
    category: "Home Goods",
    description:
      "Hand-thrown stoneware vase with a matte glaze, fired in small batches by independent ceramicists. Each piece carries subtle variations in tone.",
    shippingNote: "Ships in 2-3 days",
    types: ["Small", "Medium", "Large"],
    colors: ["#e7e2d8", "#4a4a44", "#8a7a63"],
  },
  {
    id: "recycled-wool-slippers",
    name: "Recycled Wool Slippers",
    price: "Rs450",
    priceValue: 450,
    rating: 4.9,
    reviews: 56,
    img: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80",
    badge: "",
    category: "Clothing",
    description:
      "Cozy slippers felted from reclaimed wool fibers, with a natural rubber sole for indoor-outdoor wear. Machine washable on a gentle cycle.",
    shippingNote: "Arrives soon!",
    types: ["S", "M", "L"],
    colors: ["#8a7a63", "#3e3e3e"],
  },
  {
    id: "teak-serving-board",
    name: "Teak Serving Board",
    price: "Rs220",
    priceValue: 220,
    rating: 4.6,
    reviews: 34,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    badge: "",
    category: "Home Goods",
    description:
      "Solid reclaimed teak, hand-oiled and finished with a juice groove. Sourced from salvaged plantation wood rather than newly felled timber.",
    shippingNote: "Ships in 2-3 days",
    types: ["Round", "Rectangular"],
    colors: ["#6b4a2d"],
  },
  {
    id: "hemp-throw-blanket",
    name: "Hemp Throw Blanket",
    price: "Rs380",
    priceValue: 380,
    rating: 4.8,
    reviews: 67,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    badge: "ORGANIC",
    badgeColor: "#4a7c59",
    category: "Bedding",
    description:
      "Woven from hemp and organic cotton for a textured, breathable throw that softens beautifully over time. Naturally hypoallergenic.",
    shippingNote: "Arrives soon!",
    types: ["Throw", "Queen Size"],
    colors: ["#4a7c59", "#cfc7b8", "#3e3e3e"],
  },
  {
    id: "rattan-side-table",
    name: "Rattan Side Table",
    price: "Rs620",
    priceValue: 620,
    rating: 4.7,
    reviews: 29,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    badge: "",
    category: "Furniture",
    description:
      "Hand-woven rattan over a solid mango wood frame. Lightweight enough to move room to room, sturdy enough for daily use.",
    shippingNote: "Ships in 5-7 days",
    types: ["Natural", "Dark Stain"],
    colors: ["#a9824e", "#5c4a36"],
  },
  {
    id: "beeswax-candle-set",
    name: "Beeswax Candle Set",
    price: "Rs160",
    priceValue: 160,
    rating: 5.0,
    reviews: 91,
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    badge: "",
    category: "Home Goods",
    description:
      "Pure beeswax candles that burn cleaner and longer than paraffin, with a subtle natural honey scent. Set of three in varying heights.",
    shippingNote: "Arrives soon!",
    types: ["Unscented", "Honey Scent"],
    colors: ["#d9b97a"],
  },
  {
    id: "reusable-glass-bottle",
    name: "Reusable Glass Bottle",
    price: "Rs500",
    priceValue: 500,
    rating: 5.0,
    reviews: 128,
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    badge: "",
    category: "Accessories",
    description:
      "Borosilicate glass bottle with a removable bamboo lid and a protective silicone sleeve. Dishwasher safe and free of plastic aftertaste.",
    shippingNote: "Arrives soon!",
    types: ["Bamboo Lid", "Steel Lid"],
    colors: ["#2d4a2d", "#5a5a3a", "#7a6a5a"],
  },
];

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}