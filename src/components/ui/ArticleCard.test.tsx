import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ArticleCard from "./ArticleCard.tsx";

describe("ArticleCard", () => {
    // tests for structural integrity
    it("has a container that has exactly these classes and no others", () => {
        render(<ArticleCard title="Test" text="Text" />);
        const container = screen.getByRole("heading").closest("div");
        expect(container).not.toBeNull();
        expect(container).toHaveAttribute(
            "class",
            "p-4 rounded-2xl shadow-lg bg-white",
        );
    });

    it("has a container that has h2 and p tag when no image is provided", () => {
        render(<ArticleCard title="Only Tags" text="Check" />);
        const container = screen.getByRole("heading").closest("div");
        expect(container).not.toBeNull();
        const children = Array.from(container!.children);
        expect(children.map((c) => c.tagName)).toEqual(["H2", "P"]);
    });

    it("has a container that has exactly h2, p, and img when image is provided", () => {
        render(
            <ArticleCard
                title="With Img"
                text="Text"
                image="https://example.com/pic.png"
            />,
        );
        const container = screen.getByRole("heading").closest("div");
        expect(container).not.toBeNull();
        const children = Array.from(container!.children);
        expect(children.map((c) => c.tagName)).toEqual(["H2", "P", "IMG"]);
    });

    // renders title, text and image correctly
    it("renders title as an h2 with the correct classes", () => {
        render(<ArticleCard title="Test Title" text="ignored" />);
        const heading = screen.getByRole("heading", { name: "Test Title" });
        expect(heading).toBeInTheDocument();
        expect(heading.tagName).toBe("H2");
        expect(heading).toHaveAttribute("class", "text-xl font-bold");
    });

    it("renders the body text inside a paragraph", () => {
        render(<ArticleCard title="ignored" text="Body text here" />);
        const paragraph = screen.getByText("Body text here");
        expect(paragraph).toBeInTheDocument();
        expect(paragraph.tagName).toBe("P");
        expect(paragraph).not.toHaveAttribute("class");
    });

    it("does not render an image when image prop is omitted", () => {
        render(<ArticleCard title="No Image" text="Text" />);
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("does not render an image when image prop is an empty string", () => {
        render(<ArticleCard title="Empty" text="Text" image="" />);
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("renders an image with correct src and alt when image prop is provided", () => {
        render(
            <ArticleCard
                title="My Article"
                text="Text"
                image="https://example.com/photo.jpg"
            />,
        );
        const img = screen.getByRole("img", { name: "My Article" });
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "https://example.com/photo.jpg");
        expect(img).toHaveAttribute("alt", "My Article");
    });
});
