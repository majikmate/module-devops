type Props = {
    title: string;
    text: string;
    image?: string;
};

export default function ArticleCard({ title, text, image }: Props) {
    return (
        <div className="p-4 rounded-2xl shadow-lg bg-white">
            <h2 className="text-xl font-bold">{title}</h2>
            <p>{text}</p>
            {image && <img src={image} alt={title} />}
        </div>
    );
}
