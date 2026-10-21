export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  bubbleColour: string;
  color: string;
  emoji: string;
  badge?: string;
};

export const products: Product[] = [
  { id: "cloud-nine", slug: "cloud-nine", name: "Cloud Nine Hoodie", category: "wearables", price: 2499, description: "The softest, floatiest layer for slow mornings.", bubbleColour: "#ff8c42", color: "#ff8c42", emoji: "☁️", badge: "Best seller" },
  { id: "sunny-mug", slug: "sunny-mug", name: "Sunny Side Mug", category: "home", price: 799, description: "A cheerful little cup for big little rituals.", bubbleColour: "#f9c74f", color: "#f9c74f", emoji: "☀️" },
  { id: "bubble-notes", slug: "bubble-notes", name: "Bubble Notes", category: "paper", price: 399, description: "A pocket-sized place for your brightest ideas.", bubbleColour: "#f15bb5", color: "#f15bb5", emoji: "🫧" },
  { id: "good-vibes", slug: "good-vibes", name: "Good Vibes Candle", category: "home", price: 1199, description: "Citrus, cedar and a tiny bit of magic.", bubbleColour: "#52b788", color: "#52b788", emoji: "🕯️" },
  { id: "orbit-tote", slug: "orbit-tote", name: "Orbit Tote", category: "wearables", price: 1499, description: "Roomy enough for adventures, cute enough for everywhere.", bubbleColour: "#9b5de5", color: "#9b5de5", emoji: "🪐", badge: "New" },
  { id: "sticker-party", slug: "sticker-party", name: "Sticker Party Pack", category: "paper", price: 299, description: "Twenty waterproof stickers for your daily sparkle.", bubbleColour: "#f3a51c", color: "#f3a51c", emoji: "⭐" },
  { id: "rainbow-socks", slug: "rainbow-socks", name: "Rainbow Socks", category: "wearables", price: 599, description: "A bright pair for even brighter steps.", bubbleColour: "#48cae4", color: "#48cae4", emoji: "🌈" },
  { id: "pocket-mirror", slug: "pocket-mirror", name: "Pocket Mirror", category: "accessories", price: 699, description: "A tiny reflective friend for your everyday bag.", bubbleColour: "#d6499a", color: "#d6499a", emoji: "🪞" },
  { id: "joy-journal", slug: "joy-journal", name: "Joy Journal", category: "paper", price: 899, description: "Pages for plans, doodles and excellent ideas.", bubbleColour: "#95d5b2", color: "#95d5b2", emoji: "📓" },
  { id: "peach-tray", slug: "peach-tray", name: "Peach Trinket Tray", category: "home", price: 1099, description: "A sunny landing spot for tiny treasures.", bubbleColour: "#ef6f6c", color: "#ef6f6c", emoji: "🍑" },
  { id: "cloud-pin", slug: "cloud-pin", name: "Cloud Enamel Pin", category: "accessories", price: 349, description: "A little piece of sky for your jacket or tote.", bubbleColour: "#90e0ef", color: "#90e0ef", emoji: "📌" },
  { id: "weekend-cup", slug: "weekend-cup", name: "Weekend Cup", category: "home", price: 999, description: "A colorful cup for slow sips and big plans.", bubbleColour: "#ffb703", color: "#ffb703", emoji: "🥤" },
];

export const findProduct = (slug: string) => products.find((product) => product.slug === slug || product.id === slug);
