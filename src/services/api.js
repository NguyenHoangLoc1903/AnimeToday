import axios from "axios";

const BASE_URL = "https://api.jikan.moe/v4";

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
});

export const getTrendingAnime = (page = 1) =>
    api.get("/top/anime", {
        params: {
            page,
            limit: 12
        }
    });

export const searchAnime = (query, page = 1) =>
    api.get("/anime", {
        params: {
            q: query,
            page,
            limit: 12
        }
    });

export const getAnimeDetails = (id) =>
    api.get(`/anime/${id}/full`);

export const getRecommendations = (id) =>
    api.get(`/anime/${id}/recommendations`);

export const getRandomAnime = () =>
    api.get("/random/anime");