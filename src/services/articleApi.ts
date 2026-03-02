export interface Article {
    title: string;
    text: string;
    image: string;
}

const articles: Article[] = [
    {
        title: "Story 1",
        text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, libero.",
        image: "https://picsum.photos/seed/1/300/300",
    },
    {
        title: "Story 2",
        text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam libero sequi enim?",
        image: "https://picsum.photos/seed/2/300/300",
    },
    {
        title: "Story 3",
        text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihilexercitationem modi natus suscipit quod.",
        image: "https://picsum.photos/seed/3/300/300",
    },
    {
        title: "Story 4",
        text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihilexercitationem modi natus suscipit quod.",
        image: "https://picsum.photos/seed/4/300/300",
    },
    {
        title: "Story 5",
        text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihilexercitationem modi natus suscipit quod.",
        image: "https://picsum.photos/seed/5/300/300",
    },
    {
        title: "Story 6",
        text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihilexercitationem modi natus suscipit quod.",
        image: "https://picsum.photos/seed/6/300/300",
    },
];

export async function fetchArticles(): Promise<Article[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(articles), 500);
    });
}
