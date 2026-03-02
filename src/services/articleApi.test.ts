import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { type Article, fetchArticles } from "./articleApi";

describe("fetchArticles", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("returns a Promise", () => {
        const result = fetchArticles();
        expect(result).toBeInstanceOf(Promise);
        vi.runAllTimers();
    });

    it("resolves with an array of 6 articles", async () => {
        const promise = fetchArticles();
        vi.runAllTimers();
        const articles = await promise;
        expect(articles).toHaveLength(6);
    });

    it("each article has title, text, and image fields", async () => {
        const promise = fetchArticles();
        vi.runAllTimers();
        const articles = await promise;
        for (const article of articles) {
            expect(article).toHaveProperty("title");
            expect(article).toHaveProperty("text");
            expect(article).toHaveProperty("image");
        }
    });

    it("each field is a non-empty string", async () => {
        const promise = fetchArticles();
        vi.runAllTimers();
        const articles = await promise;
        for (const article of articles) {
            expect(typeof article.title).toBe("string");
            expect(article.title.length).toBeGreaterThan(0);
            expect(typeof article.text).toBe("string");
            expect(article.text.length).toBeGreaterThan(0);
            expect(typeof article.image).toBe("string");
            expect(article.image.length).toBeGreaterThan(0);
        }
    });

    it("image fields are valid URLs", async () => {
        const promise = fetchArticles();
        vi.runAllTimers();
        const articles = await promise;
        for (const article of articles) {
            expect(() => new URL(article.image)).not.toThrow();
        }
    });

    it("resolves after 500ms simulated delay", async () => {
        let resolved = false;
        const promise = fetchArticles().then((data: Article[]) => {
            resolved = true;
            return data;
        });

        expect(resolved).toBe(false);
        vi.advanceTimersByTime(499);
        expect(resolved).toBe(false);
        vi.advanceTimersByTime(1);
        await promise;
        expect(resolved).toBe(true);
    });

    it("articles have unique titles", async () => {
        const promise = fetchArticles();
        vi.runAllTimers();
        const articles = await promise;
        const titles = articles.map((a) => a.title);
        const uniqueTitles = new Set(titles);
        expect(uniqueTitles.size).toBe(titles.length);
    });
});
