import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container">
            <div className="not-found">
                <h1>404</h1>

                <h2>Page Not Found</h2>

                <p>
                    The page you are looking for does not exist.
                </p>

                <Link
                    to="/"
                    className="home-btn"
                >
                    ← Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;