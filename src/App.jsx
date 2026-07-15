import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import ScrollTop from "./components/ScrollTop";
import About from "./pages/About";


const THEME_KEY = "theme";

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem(THEME_KEY) === "dark";
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
            localStorage.setItem(THEME_KEY, "dark");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem(THEME_KEY, "light");
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode((previous) => !previous);
    };

    return (
        <Router basename={import.meta.env.BASE_URL}>
            <Navbar
                darkMode={darkMode}
                toggleTheme={toggleTheme}
            />

            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/detail/:id"
                    element={<Detail />}
                />

                <Route
                    path="/favorites"
                    element={<Favorites />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />
                <Route path="/about" element={<About />} />
            </Routes>

            <ScrollTop />
        </Router>
    );
}

export default App;