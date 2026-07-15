import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import logoimg from "../../public/icon.svg";

import {
    getRandomAnime,
    getTrendingAnime
} from "../services/api";

const Navbar = ({
    darkMode,
    toggleTheme
}) => {
    const [search, setSearch] = useState("");
    const [loadingRandom, setLoadingRandom] = useState(false);

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        const keyword = search.trim();

        if (!keyword) return;

        navigate(
            `/?search=${encodeURIComponent(keyword)}&page=1`
        );
        setSearch("");
    };

    const handleRandom = async () => {
        if (loadingRandom) return;

        setLoadingRandom(true);

        try {
            const { data } = await getRandomAnime();

            navigate(`/detail/${data.data.mal_id}`);
        } catch {
            try {
                const { data } = await getTrendingAnime();

                const list = data.data;

                const randomAnime =
                    list[Math.floor(Math.random() * list.length)];

                navigate(`/detail/${randomAnime.mal_id}`);
            } catch {
                alert("Cannot load random anime.");
            }
        } finally {
            setLoadingRandom(false);
        }
    };

    return (
        <nav className="navbar">
            <div
                className="logo"
                onClick={() => navigate("/")}
            >
              <img src={logoimg} alt="Logo" className="logo-icon" />
                Anime Explorer
            </div>

            <form
                className="search-form"
                onSubmit={handleSearch}
            >
                <input
                    type="text"
                    placeholder="Search anime..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>

            <div className="nav-links">
                <NavLink
                    to="/about"
                    className={({isActive}) =>
                        isActive ? "active-link" : ""
                    }
                >
                    About
                </NavLink>
                
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/favorites"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    Favorites
                </NavLink>

                <button
                    onClick={handleRandom}
                    disabled={loadingRandom}
                >
                    {loadingRandom
                        ? "Loading..."
                        : "🎲 Random"}
                </button>

                <button
                    className="theme-btn"
                    onClick={toggleTheme}
                >
                    {darkMode
                        ? "Dark"
                        : "Light"}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;