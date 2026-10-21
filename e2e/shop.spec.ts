import { test,expect } from "@playwright/test";
test("visitor can browse and add a product",async({page})=>{await page.goto("/shop");await expect(page.getByRole("heading",{name:/things with personality/i})).toBeVisible();await page.getByRole("button",{name:/add cloud nine/i}).click();await expect(page.getByText("Added!")).toBeVisible();});
