import { useSearchParams } from "react-router-dom";

import AnimeGrid from "../components/AnimeGrid";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";

import useFavorites from "../hooks/useFavorites";

const ITEMS_PER_PAGE = 12;

const Favorites = () => {
    const {
        favorites,
        toggleFavorite
    } = useFavorites();

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;

    const totalPages = Math.max(
        1,
        Math.ceil(favorites.length / ITEMS_PER_PAGE)
    );

    const currentPage = Math.min(page, totalPages);



    const startIndex =
        (currentPage - 1) * ITEMS_PER_PAGE;

    const currentFavorites =
        favorites.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );

    return (
        <div className="container">

            <h1>❤️ My Favorites</h1>

            {favorites.length === 0 ? (

                <EmptyState
                    icon="❤️"
                    title="No Favorite Anime"
                    message="Start exploring anime and add your favorites."
                />

            ) : (

                <>

                    <AnimeGrid
                        animes={currentFavorites}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                    />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => {
                            setSearchParams({
                                page
                            });
                        }}
                    />

                </>

            )}

        </div>
    );
};

export default Favorites;