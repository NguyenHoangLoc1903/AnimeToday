import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getAnimeDetails,
    getRecommendations
} from "../services/api";

import Loading from "../components/Loading";
import AnimeGrid from "../components/AnimeGrid";
import useFavorites from "../hooks/useFavorites";
import EmptyState from "../components/EmptyState";

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [anime, setAnime] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const {
        favorites,
        toggleFavorite
    } = useFavorites();

    useEffect(() => {
        window.scrollTo(0, 0);

        async function fetchData() {
            try {
                const [detailRes, recRes] = await Promise.all([
                    getAnimeDetails(id),
                    getRecommendations(id)
                ]);

                setAnime(detailRes.data.data);

                setRecommendations(
                    recRes.data.data
                        .slice(0, 6)
                        .map((item) => item.entry)
                );
            } catch (error) {
                if (error.response?.status === 429) {
                    setError("429: Too Many Requests");
                } else if (error.response?.status === 504) {
                    setError("504: Gateway Time-out");
                } else {
                    setError("Cannot load anime.");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    if (loading) return <Loading />;

    if (error) {
        return (
            <div className="container">
                <EmptyState
                    icon="⚠️"
                    title={error}
                    message={
                        error === "429: Too Many Requests"
                            ? "The API rate limit has been reached. Please wait a moment and try again."
                            : error === "504: Gateway Time-out"
                            ? "The server took too long to respond. Please try again later."
                            : "Something went wrong while loading this anime."
                    }
                />
            </div>
        );
    }

    const isFavorite = favorites.some(
        (item) => item.mal_id === anime.mal_id
    );

    return (
        <div className="container">
            <button
                className="back-btn"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <div className="detail-container">
                <img
                    className="poster"
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                />

                <div className="detail-info">
                    <h1>{anime.title}</h1>

                    <div className="rating">
                        ⭐ {anime.score ?? "N/A"}
                    </div>

                    <div className="meta">
                        <span>{anime.type}</span>
                        <span>{anime.status}</span>
                        <span>{anime.episodes ?? "?"} Episodes</span>
                        <span>{anime.season ?? "Unknown"} {anime.year}</span>
                        <span>Rank #{anime.rank}</span>
                        <span>Popularity #{anime.popularity}</span>
                    </div>

                    <table className="info-table">
                        <tbody>
                            <tr>
                                <td>Studio</td>
                                <td>
                                    {anime.studios.length
                                        ? anime.studios.map((s) => s.name).join(", ")
                                        : "Unknown"}
                                </td>
                            </tr>

                            <tr>
                                <td>Source</td>
                                <td>{anime.source}</td>
                            </tr>

                            <tr>
                                <td>Rating</td>
                                <td>{anime.rating}</td>
                            </tr>

                            <tr>
                                <td>Duration</td>
                                <td>{anime.duration}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="genre-list">
                        {anime.genres.map((genre) => (
                            <span
                                key={genre.mal_id}
                                className="genre"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <button
                        className="favorite-detail"
                        onClick={() => toggleFavorite(anime)}
                    >
                        {isFavorite
                            ? "❤️ Remove Favorite"
                            : "🤍 Add Favorite"}
                    </button>
                </div>
            </div>

            <div className="synopsis">
                <h2>Synopsis</h2>
                <p>{anime.synopsis}</p>
            </div>

            {anime.trailer.embed_url && (
                <div className="trailer">
                    <h2>Trailer</h2>

                    <iframe
                        src={anime.trailer.embed_url}
                        title="Trailer"
                        allowFullScreen
                    />
                </div>
            )}

            {recommendations.length > 0 && (
                <div className="recommend-section">
                    <h2>You May Also Like</h2>

                    <AnimeGrid
                        animes={recommendations}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                    />
                </div>
            )}
        </div>
    );
};

export default Detail;