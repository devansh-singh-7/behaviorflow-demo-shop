"use client";
import Link from "next/link";
import { Product } from "../lib/products";
import { readCart, saveCart } from "../lib/cart";
import { track } from "../lib/analytics";
import { useState } from "react";
export default function ProductCard({ product, issue }: { product: Product; issue?: string }) { const [added,setAdded]=useState(false); const add=()=>{const c=readCart();const item=c.find(i=>i.productId===product.id);if(item)item.quantity++;else c.push({productId:product.id,quantity:1});saveCart(c);setAdded(true);track("add_to_cart",{product_id:product.id});setTimeout(()=>setAdded(false),1600)}; return <article className="card"><Link href={`/products/${product.id}`}><div className="product-art" style={{background:product.color}}><span>{product.emoji}</span>{product.badge&&<span className="badge">{product.badge}</span>}</div>{issue&&<div className="issue card-issue">{issue}</div>}<h3>{product.name}</h3></Link><p className="muted">{product.description}</p><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span className="price">₹{product.price}</span><button className="btn" onClick={add} aria-label={`Add ${product.name} to bag`}>{added?"Added!":"Add +"}</button></div></article> }
