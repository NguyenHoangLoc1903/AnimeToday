import { Link } from "react-router-dom";

const AnimeCard = ({
    anime,
    isFavorite,
    onToggleFavorite
}) => {
    const image =
        anime.images?.jpg?.large_image_url ||
        anime.images?.jpg?.image_url ||
        "https://via.placeholder.com/225x320?text=No+Image";
    return (
        <Link
            to={`/detail/${anime.mal_id}`}
            className="anime-card"
        >
            <div className="image-wrapper">
                <img
                    src={image}
                    alt={anime.title}
                    loading="lazy"
                />

                <button
                    className="favorite-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        onToggleFavorite(anime);
                    }}
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>

                <span className="score">
                    ⭐ {anime.score ?? "N/A"}
                </span>
            </div>

            <div className="card-content">
                <h3 title={anime.title}>
                    {anime.title}
                </h3>

                <p>
                    <strong>Type:</strong>{" "}
                    {anime.type ?? "Unknown"}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    {anime.status ?? "Unknown"}
                </p>

                <p>
                    <strong>Episodes:</strong>{" "}
                    {anime.episodes ?? "?"}
                </p>

                <p>
                    <strong>Year:</strong>{" "}
                    {anime.year ?? "Unknown"}
                </p>
            </div>
        </Link>
    );
};

export default AnimeCard;