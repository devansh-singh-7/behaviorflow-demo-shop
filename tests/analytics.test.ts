import { beforeEach, describe, expect, it, vi } from "vitest";
import { page, track } from "../lib/analytics";

describe("analytics event contract", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 202 })));
    window.localStorage.clear();
    window.history.replaceState({}, "", "/test");
  });

  it("builds page_view events", () => expect(page("/shop").event_name).toBe("page_view"));
  it("builds product_viewed events", () => expect(track("product_viewed", { product_id: "cloud-nine", category: "wearables", price: 2499 }).event_name).toBe("product_viewed"));
  it("builds add_to_cart events", () => expect(track("add_to_cart", { product_id: "cloud-nine", category: "wearables", price: 2499, quantity: 1 }).event_name).toBe("add_to_cart"));
  it("builds checkout_started events", () => expect(track("checkout_started", { cart_value: 2499, item_count: 1 }).event_name).toBe("checkout_started"));
  it("builds purchase_completed events", () => expect(track("purchase_completed", { order_id: "PS-TEST", order_value: 2499, item_count: 1 }).event_name).toBe("purchase_completed"));
});
