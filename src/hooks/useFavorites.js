import { useState } from "react";
import {
    getFavorites,
    toggleFavorite
} from "../utils/favoriteStorage";

export default function useFavorites() {
    const [favorites, setFavorites] = useState(getFavorites());

    function handleToggle(anime) {
        const updated = toggleFavorite(anime);
        setFavorites(updated);
    }

    return {
        favorites,
        toggleFavorite: handleToggle
    };
}