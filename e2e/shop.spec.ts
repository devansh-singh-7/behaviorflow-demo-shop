import { test, expect } from "@playwright/test";

test("full visitor journey sends ordered unique analytics events", async ({ page }) => {
  const events: any[] = [];
  await page.route("**/api/mock-collector", async (route) => {
    const body = route.request().postDataJSON();
    events.push(...(Array.isArray(body) ? body : [body]));
    await route.fulfill({ status: 202, contentType: "application/json", body: JSON.stringify({ accepted: 1 }) });
  });
  await page.goto("/");
  await page.getByRole("link", { name: /shop the drop/i }).click();
  await page.getByRole("link", { name: /cloud nine hoodie/i }).click();
  await page.getByRole("button", { name: /increase quantity/i }).click();
  await page.getByRole("button", { name: /add to cart/i }).click();
  await page.getByRole("link", { name: /cart/i }).click();
  await page.getByRole("link", { name: /checkout/i }).click();
  await page.getByLabel("Name").fill("Test Visitor");
  await page.getByLabel("Email").fill("visitor@example.test");
  await page.getByLabel("Address").fill("123 Test Street");
  await page.getByRole("button", { name: /place demo order/i }).click();
  await expect(page).toHaveURL(/\/order\/PS-/);
  await expect.poll(() => events.length).toBeGreaterThanOrEqual(5);
  const names = events.map((event) => event.event_name);
  expect(names).toEqual(expect.arrayContaining(["page_view", "product_viewed", "add_to_cart", "checkout_started", "purchase_completed"]));
  expect(new Set(events.map((event) => event.event_id)).size).toBe(events.length);
  expect(JSON.stringify(events)).not.toContain("Test Visitor");
  expect(JSON.stringify(events)).not.toContain("visitor@example.test");
  expect(JSON.stringify(events)).not.toContain("123 Test Street");
});

test("fault controls affect sent event batches", async ({ page }) => {
  const events: any[] = [];
  await page.route("**/api/mock-collector", async (route) => {
    const body = route.request().postDataJSON();
    events.push(...(Array.isArray(body) ? body : [body]));
    await route.fulfill({ status: 202, contentType: "application/json", body: "{}" });
  });
  await page.goto("/lab");
  await page.getByLabel(/duplicate purchases/i).check();
  await page.evaluate(() => window.dispatchEvent(new CustomEvent("bf:analytics", { detail: { event_name: "purchase_completed" } })));
  await page.goto("/?f5=on");
  await page.waitForTimeout(1100);
  const purchases = events.filter((event) => event.event_name === "purchase_completed");
  expect(purchases.length % 2).toBe(0);
  expect(new Set(purchases.map((event) => event.event_id)).size).toBe(purchases.length);
});

test("reduced motion pauses marquee and bubble animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".marquee").first()).toHaveCSS("animation-play-state", "paused");
  await expect(page.locator(".pop-bubble").first()).toBeVisible();
});
