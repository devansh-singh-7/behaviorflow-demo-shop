"use client";

import Link from "next/link";
import { findProduct } from "../../lib/products";
import { useCartStore } from "../../lib/cart-store";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const update = useCartStore((state) => state.update);
  const total = items.reduce((sum, item) => sum + (findProduct(item.productId)?.price || 0) * item.quantity, 0);
  return <section className="shell section"><div className="pagehead"><div className="eyebrow">Your little pile</div><h1>Your bag</h1></div>{!items.length ? <div className="summary"><h2>It&apos;s looking a little airy.</h2><p className="muted">Add something lovely and it will appear here.</p><Link href="/shop" className="btn">Browse the shop</Link></div> : <div className="split"><div>{items.map((item) => { const product = findProduct(item.productId); if (!product) return null; return <div className="cartrow" key={item.productId}><div className="product-art" style={{ background: product.color }}>{product.emoji}</div><div style={{ flex: 1 }}><h3>{product.name}</h3><span className="muted">₹{product.price}</span></div><div className="qty"><button onClick={() => update(item.productId, item.quantity - 1)} aria-label="decrease">−</button>{item.quantity}<button onClick={() => update(item.productId, item.quantity + 1)} aria-label="increase">+</button></div></div>; })}</div><aside className="summary"><h2>Summary</h2><p>Subtotal <b style={{ float: "right" }}>₹{total.toFixed(2)}</b></p><p className="muted">Shipping calculated at checkout</p><Link href="/checkout" className="btn" style={{ width: "100%", textAlign: "center" }}>Checkout →</Link></aside></div>}</section>;
}
