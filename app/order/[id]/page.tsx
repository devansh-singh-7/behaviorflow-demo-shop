"use client";

import Link from "next/link";

export default function OrderPage({ params }: { params: { id: string } }) {
  return (
    <section className="shell section order-card">
      <div className="bubble-art" aria-hidden="true">🎉</div>
      <div className="eyebrow">Order received</div>
      <h1>You picked well.</h1>
      <p className="lead">Your order <strong>{params.id}</strong> is on its way. We&apos;ll send tracking details to your inbox soon.</p>
      <div className="actions">
        <Link href="/shop" className="btn">Keep browsing</Link>
        <button className="btn secondary" type="button" onClick={() => window.print()}>Print order</button>
      </div>
    </section>
  );
}
