type Props = {
    title: string;
    text: string;
    image?: string;
};

export default function ArticleCard({ title, text, image }: Props) {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-lg">
            <h2 className="text-xl font-bold">{title}</h2>
            <p>{text}</p>
            {image && <img src={image} alt={title} />}
        </div>
    );
}
