import Link from "next/link";
import { products } from "../lib/products";
import ProductCard from "../components/ProductCard";
import { BubbleBand } from "../components/bubbles/BubbleBand";
import { BubbleField } from "../components/bubbles/BubbleField";
import { BubbleWordmark } from "../components/bubbles/BubbleWordmark";
import { MarqueeRibbons } from "../components/bubbles/MarqueeRibbons";
import { DropsCalendar } from "../components/shop/DropsCalendar";

const drops = [
  { day: 3, product: products[0] },
  { day: 10, product: products[1] },
  { day: 17, product: products[2] },
  { day: 24, product: products[3] },
];

export default function Home() {
  return <>
    <section className="poster-hero shell">
      <BubbleField count={12} />
      <div className="hero-copy">
        <div className="eyebrow">Issue No. 01 · Analytics test shop</div>
        <BubbleWordmark as="h1" className="hero-wordmark" />
        <p className="lead">A colorful little store for testing real user journeys. Pop a bubble, pick a thing, and make your analytics sing.</p>
        <div className="actions"><Link href="/shop" className="btn">Shop the drop →</Link></div>
      </div>
    </section>
    <MarqueeRibbons first="NEW DROP · FREE SHIPPING OVER ₹999 · LIMITED STOCK ·" second="NEW DROP · FREE SHIPPING OVER ₹999 · LIMITED STOCK ·" />
    <BubbleBand marks={["✦ POP YOUR WAY", "GOOD THINGS ONLY", "BUBBLE CLUB"]} />
    <section className="shell section" aria-labelledby="featured-title">
      <div className="sectionhead"><div><div className="issue">NO. 02 / THE FEATURED FOUR</div><h2 id="featured-title">The drop edit</h2></div><Link href="/shop">See everything →</Link></div>
      <div className="grid">{products.slice(0, 4).map((product, index) => <ProductCard key={product.id} product={product} issue={`No. ${String(index + 1).padStart(2, "0")}`} />)}</div>
    </section>
    <section className="shell section"><DropsCalendar drops={drops} /></section>
  </>;
}
