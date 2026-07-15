import AnimeGrid from "../components/AnimeGrid";
import EmptyState from "../components/EmptyState";

import useFavorites from "../hooks/useFavorites";

const Favorites = () => {
    const {
        favorites,
        toggleFavorite
    } = useFavorites();

    return (
        <div className="container">
            <h1>❤️ My Favorites</h1>

            {favorites.length > 0 ? (
                <AnimeGrid
                    animes={favorites}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                />
            ) : (
                <EmptyState
                    icon="❤️"
                    title="No Favorite Anime"
                    message="Start exploring anime and add your favorites."
                />
            )}
        </div>
    );
};

export default Favorites;