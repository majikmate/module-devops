import { expect, test } from "@playwright/test";

test.describe("Article feed", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("renders 6 article cards after API response", async ({ page }) => {
        const cards = page.locator(".rounded-2xl");
        await expect(cards).toHaveCount(6);
    });

    test("each card displays a title", async ({ page }) => {
        const titles = page.locator(".rounded-2xl h2");
        await expect(titles).toHaveCount(6);
        for (let i = 0; i < 6; i++) {
            await expect(titles.nth(i)).not.toBeEmpty();
        }
    });

    test("each card displays body text", async ({ page }) => {
        const paragraphs = page.locator(".rounded-2xl p");
        await expect(paragraphs).toHaveCount(6);
        for (let i = 0; i < 6; i++) {
            await expect(paragraphs.nth(i)).not.toBeEmpty();
        }
    });

    test("each card displays an image", async ({ page }) => {
        const images = page.locator(".rounded-2xl img");
        await expect(images).toHaveCount(6);
        for (let i = 0; i < 6; i++) {
            await expect(images.nth(i)).toHaveAttribute("src", /https?:\/\/.+/);
        }
    });

    test("article titles match mock data", async ({ page }) => {
        const titles = page.locator(".rounded-2xl h2");
        for (let i = 1; i <= 6; i++) {
            await expect(titles.nth(i - 1)).toHaveText(`Story ${i}`);
        }
    });

    test("article images have alt text matching their title", async ({ page }) => {
        const cards = page.locator(".rounded-2xl");
        for (let i = 0; i < 6; i++) {
            const card = cards.nth(i);
            const title = await card.locator("h2").textContent();
            const img = card.locator("img");
            await expect(img).toHaveAttribute("alt", title ?? "");
        }
    });

    test("page has a grid layout", async ({ page }) => {
        const grid = page.locator(".grid");
        await expect(grid).toBeVisible();
    });
});
