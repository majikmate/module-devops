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
            <div className="grid grid-cols-1 gap-4 bg-gray-200 p-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        title={article.title}
                        text={article.text}
                        image={article.image}
                    />
                ))}
            </div>
        </>
    );
}

export default App;
