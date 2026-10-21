import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = ["/", "/shop", "/design", "/cart", "/checkout", "/about", "/analytics"];
for (const palette of ["sunrise", "lagoon"]) {
  for (const path of pages) {
    test(`axe ${palette} ${path}`, async ({ page }) => {
      await page.goto(`${path}?palette=${palette}`);
      await page.evaluate((value) => { document.documentElement.dataset.palette = value; }, palette);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
