import { chromium, devices, Page } from "@playwright/test";

const visitors = Number(process.env.VISITORS || process.argv[2] || 5);
const mobileShare = Number(process.env.MOBILE_SHARE || "0.4");
const probabilities = {
  product: Number(process.env.PRODUCT_PROBABILITY || "0.8"),
  cart: Number(process.env.CART_PROBABILITY || "0.7"),
  checkout: Number(process.env.CHECKOUT_PROBABILITY || "0.35"),
};

async function runVisitor(index: number) {
  const browser = await chromium.launch();
  const context = await browser.newContext(Math.random() < mobileShare ? devices["Pixel 7"] : devices["Desktop Chrome"]);
  const page: Page = await context.newPage();
  await page.goto(process.env.BASE_URL || "http://localhost:3000/");
  if (Math.random() < probabilities.product) {
    await page.getByRole("link", { name: /shop the drop/i }).click();
    await page.getByRole("link", { name: /cloud nine hoodie/i }).click();
  }
  if (Math.random() < probabilities.cart) {
    await page.getByRole("button", { name: /add to cart/i }).click().catch(() => undefined);
    await page.getByRole("link", { name: /cart/i }).click();
  }
  if (Math.random() < probabilities.checkout && await page.getByRole("link", { name: /checkout/i }).count()) {
    await page.getByRole("link", { name: /checkout/i }).click();
    await page.getByLabel("Name").fill(`Bot visitor ${index}`);
    await page.getByLabel("Email").fill(`bot-${index}@example.test`);
    await page.getByLabel("Address").fill(`${index} Bot Street`);
    await page.getByRole("button", { name: /place demo order/i }).click();
  }
  await browser.close();
}

await Promise.all(Array.from({ length: visitors }, (_, index) => runVisitor(index)));
