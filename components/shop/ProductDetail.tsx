"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { findProduct } from "../../lib/products";
import { useCartStore } from "../../lib/cart-store";
import { track } from "../../lib/analytics";

function BubbleIllustration({ colour, emoji }: { colour: string; emoji: string }) {
  return <svg viewBox="0 0 500 500" role="img" aria-label="Bubble product illustration" className="product-svg"><defs><radialGradient id="bubble-gradient" cx="30%" cy="25%"><stop offset="0%" stopColor="#fff" stopOpacity=".9"/><stop offset="16%" stopColor={colour}/><stop offset="100%" stopColor={colour} stopOpacity=".7"/></radialGradient></defs><circle cx="250" cy="250" r="205" fill="url(#bubble-gradient)" stroke="var(--ink)" strokeWidth="8"/><circle cx="175" cy="145" r="25" fill="#fff" opacity=".7"/><text x="250" y="290" textAnchor="middle" fontSize="110">{emoji}</text></svg>;
}

export default function ProductDetail({ slug }: { slug: string }) {
  const product = findProduct(slug);
  const add = useCartStore((state) => state.add);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => { if (product) track("product_viewed", { product_id: product.id, category: product.category, price: product.price }); }, [product]);
  if (!product) return <div className="shell section"><h1>That one floated away.</h1><Link href="/shop">Back to shop</Link></div>;
  const addProduct = () => { add(product.id, quantity); track("add_to_cart", { product_id: product.id, category: product.category, price: product.price, quantity }); };
  return <section className="shell section"><Link href="/shop">← Back to shop</Link><div className="product-detail"><div className="product-visual"><BubbleIllustration colour={product.bubbleColour} emoji={product.emoji} /></div><div><div className="eyebrow">{product.category}</div><h1 className="pagehead product-title">{product.name}</h1><p className="lead">{product.description}</p><h2>₹{product.price}</h2><div className="quantity-control"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button><span>{quantity}</span><button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button></div><button type="button" className="btn" onClick={addProduct}>Add to cart</button></div></div></section>;
}
