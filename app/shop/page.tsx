"use client";

import { useState } from "react";
import { products } from "../../lib/products";
import ProductCard from "../../components/ProductCard";

export default function Shop() {
  const [category, setCategory] = useState("all");
  const categories = ["all", ...Array.from(new Set(products.map((product) => product.category)))];
  const shown = category === "all" ? products : products.filter((product) => product.category === category);
  return <section className="shell section"><div className="pagehead"><div className="eyebrow">The happy shelf</div><h1>Things with personality.</h1><p className="lead">Twelve colorful objects for testing real journeys.</p></div><div className="filters" aria-label="Product categories">{categories.map((item) => <button key={item} className={`filter ${category === item ? "active" : ""}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item[0].toUpperCase() + item.slice(1)}</button>)}</div><div className="grid">{shown.map((product, index) => <ProductCard key={product.id} product={product} issue={`No. ${String(index + 1).padStart(2, "0")}`} />)}</div></section>;
}
