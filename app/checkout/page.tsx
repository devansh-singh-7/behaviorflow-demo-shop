"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { findProduct } from "../../lib/products";
import { useCartStore } from "../../lib/cart-store";
import { track } from "../../lib/analytics";

export default function Checkout() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const [loading, setLoading] = useState(false);
  const cartValue = items.reduce((sum, item) => sum + (findProduct(item.productId)?.price || 0) * item.quantity, 0);
  useEffect(() => { track("checkout_started", { cart_value: cartValue, item_count: items.reduce((sum, item) => sum + item.quantity, 0) }); }, []);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/orders", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: form.get("name"), email: form.get("email"), address: form.get("address"), items, value: cartValue }) });
    if (!response.ok) { setLoading(false); return; }
    const result = await response.json();
    clear();
    track("purchase_completed", { order_id: result.order.id, order_value: cartValue, item_count: items.reduce((sum, item) => sum + item.quantity, 0) });
    router.push(`/order/${result.order.id}`);
  };
  return <section className="shell section"><div className="pagehead"><div className="eyebrow">Almost there</div><h1>Checkout</h1></div><div className="notice">Demo store: no real payment happens here. We never request card details.</div><form className="form" onSubmit={submit}><div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required /></div><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required /></div><div className="field"><label htmlFor="address">Address</label><textarea id="address" name="address" required rows={3} /></div><button className="btn" disabled={loading}>{loading ? "Placing your order…" : "Place demo order"}</button></form></section>;
}
