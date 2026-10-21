import { describe,expect,it } from "vitest"; import { products,findProduct } from "../lib/products";
describe("catalog",()=>{it("contains unique product ids",()=>expect(new Set(products.map(p=>p.id)).size).toBe(products.length));it("finds a known product",()=>expect(findProduct("cloud-nine")?.price).toBe(68));});
