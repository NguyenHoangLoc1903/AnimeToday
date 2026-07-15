import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import AnimeGrid from "../components/AnimeGrid";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";

import useFavorites from "../hooks/useFavorites";

import {
    getTrendingAnime,
    searchAnime
} from "../services/api";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("search");
    const currentPage =
        Number(searchParams.get("page")) || 1;

    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [hasNextPage, setHasNextPage] = useState(false);

    const {
        favorites,
        toggleFavorite
    } = useFavorites();

    useEffect(() => {
        async function fetchAnime() {
            setLoading(true);
            setError("");

            try {
                const response = keyword
                    ? await searchAnime(keyword, currentPage)
                    : await getTrendingAnime(currentPage);

                setAnimes(response.data.data || []);

                setHasNextPage(
                    response.data.pagination?.has_next_page || false
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

        fetchAnime();
    }, [keyword, currentPage]);

    if (loading) {
        return <Loading />;
    }

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

    return (
        <div className="container">
            <h1>
                {keyword
                    ? `Search : ${keyword}`
                    : "🔥 Trending Anime"}
            </h1>

            {animes.length === 0 ? (
                <EmptyState
                    icon="🔍"
                    title="No Anime Found"
                    message="Try another keyword."
                />
            ) : (
                <>
                    <AnimeGrid
                        animes={animes}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                    />

                    <Pagination
                        currentPage={currentPage}
                        hasNextPage={hasNextPage}
                        onPageChange={(page) => {
                            const params = {};
                            if (keyword) {
                                params.search = keyword;
                            }
                            params.page = page;
                            setSearchParams(params);
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default Home;