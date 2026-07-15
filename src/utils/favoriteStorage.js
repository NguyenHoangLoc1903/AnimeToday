const KEY = "favs";

export function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
        return [];
    }
}

export function isFavorite(id) {
    return getFavorites().some(
        (anime) => anime.mal_id === id
    );
}

export function saveFavorites(favorites) {
    localStorage.setItem(
        KEY,
        JSON.stringify(favorites)
    );
}

export function toggleFavorite(anime) {
    const favorites = getFavorites();

    const index = favorites.findIndex(
        (item) => item.mal_id === anime.mal_id
    );

    if (index >= 0) {
        favorites.splice(index, 1);
    } else {
        favorites.push(anime);
    }

    saveFavorites(favorites);

    return favorites;
}