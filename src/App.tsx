import { useEffect, useState } from "react";
import ArticleCard from "./components/ui/ArticleCard.tsx";
import { type Article, fetchArticles } from "./services/articleApi.ts";

function App() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetchArticles().then(setArticles);
    }, []);

    return (
        <>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-200">
                {articles.map(
                    (article) => (
                        <ArticleCard
                            key={article.id}
                            title={article.title}
                            text={article.text}
                            image={article.image}
                        />
                    ),
                )}
            </div>
        </>
    );
}

export default App;
