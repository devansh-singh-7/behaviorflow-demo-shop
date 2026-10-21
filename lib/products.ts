export type Product = { id: string; name: string; description: string; price: number; category: string; color: string; emoji: string; badge?: string };
export const products: Product[] = [
  { id: "cloud-nine", name: "Cloud Nine Hoodie", description: "The softest, floatiest layer for slow mornings.", price: 68, category: "wearables", color: "#c7d2fe", emoji: "☁️", badge: "Best seller" },
  { id: "sunny-mug", name: "Sunny Side Mug", description: "A cheerful little cup for big little rituals.", price: 24, category: "home", color: "#fde68a", emoji: "☀️" },
  { id: "bubble-notes", name: "Bubble Notes", description: "A pocket-sized place for your brightest ideas.", price: 12, category: "paper", color: "#fbcfe8", emoji: "🫧" },
  { id: "good-vibes", name: "Good Vibes Candle", description: "Citrus, cedar and a tiny bit of magic.", price: 32, category: "home", color: "#bbf7d0", emoji: "🕯️" },
  { id: "orbit-tote", name: "Orbit Tote", description: "Roomy enough for adventures, cute enough for everywhere.", price: 38, category: "wearables", color: "#ddd6fe", emoji: "🪐", badge: "New" },
  { id: "sticker-party", name: "Sticker Party Pack", description: "Twenty waterproof stickers for your daily sparkle.", price: 9, category: "paper", color: "#fed7aa", emoji: "⭐" }
];
export const findProduct = (id: string) => products.find((p) => p.id === id);
