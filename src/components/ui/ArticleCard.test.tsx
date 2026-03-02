import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ArticleCard from "./ArticleCard";

describe("ArticleCard", () => {
    it("renders the title", () => {
        render(<ArticleCard title="Test Title" text="Some text" />);
        expect(screen.getByRole("heading", { name: "Test Title" }))
            .toBeInTheDocument();
    });

    it("renders the body text", () => {
        render(<ArticleCard title="Title" text="Body content here" />);
        expect(screen.getByText("Body content here")).toBeInTheDocument();
    });

    it("renders an image with correct src and alt when image is provided", () => {
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

    it("does not render an image when image prop is omitted", () => {
        render(<ArticleCard title="No Image" text="Text" />);
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("does not render an image when image prop is empty string", () => {
        render(<ArticleCard title="Empty Image" text="Text" image="" />);
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });
});
