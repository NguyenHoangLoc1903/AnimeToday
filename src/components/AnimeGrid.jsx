import AnimeCard from "./AnimeCard";

const AnimeGrid = ({
    animes,
    favorites,
    onToggleFavorite
}) => {
    return (
        <div className="card_grid">
            {animes.map((anime) => (
                <AnimeCard
                    key={anime.mal_id}
                    anime={anime}
                    isFavorite={favorites.some(
                        (item) => item.mal_id === anime.mal_id
                    )}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
};

export default AnimeGrid;