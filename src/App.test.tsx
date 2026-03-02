import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./services/articleApi.ts", () => ({
    fetchArticles: vi.fn(),
}));

import { fetchArticles } from "./services/articleApi.ts";

const mockArticles = [
    {
        title: "Story 1",
        text: "Text 1",
        image: "https://picsum.photos/seed/1/300/300",
    },
    {
        title: "Story 2",
        text: "Text 2",
        image: "https://picsum.photos/seed/2/300/300",
    },
    {
        title: "Story 3",
        text: "Text 3",
        image: "https://picsum.photos/seed/3/300/300",
    },
    {
        title: "Story 4",
        text: "Text 4",
        image: "https://picsum.photos/seed/4/300/300",
    },
    {
        title: "Story 5",
        text: "Text 5",
        image: "https://picsum.photos/seed/5/300/300",
    },
    {
        title: "Story 6",
        text: "Text 6",
        image: "https://picsum.photos/seed/6/300/300",
    },
];

describe("App", () => {
    beforeEach(() => {
        vi.mocked(fetchArticles).mockResolvedValue(mockArticles);
    });

    it("renders no article cards before the API resolves", () => {
        vi.mocked(fetchArticles).mockReturnValue(new Promise(() => {}));
        render(<App />);
        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    it("renders 6 article cards after the API resolves", async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getAllByRole("heading")).toHaveLength(6);
        });
    });

    it("renders article titles from the API response", async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getAllByRole("heading")).toHaveLength(6);
        });
        for (const article of mockArticles) {
            expect(screen.getByRole("heading", { name: article.title }))
                .toBeInTheDocument();
        }
    });

    it("renders article images from the API response", async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getAllByRole("img")).toHaveLength(6);
        });
    });

    it("renders a grid container", async () => {
        const { container } = render(<App />);
        await waitFor(() => screen.getAllByRole("heading"));
        expect(container.querySelector(".grid")).toBeInTheDocument();
    });
});
