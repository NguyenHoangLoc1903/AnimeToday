import aboutImage from "../assets/about.webp";

const About = () => {
    return (
        <div className="container about-container">
            <h1 className="about-header">About Project</h1>
            <div className="about-grid">
                <div className="about-content">
                    <h2>AnimeToday</h2>
                    <p>
                        AnimeToday is a simple web application that allows users to discover anime using the Jikan API. It was built with React and Vite to practice modern frontend development.
                    </p>
                    <div className="project-info">
                        <p>
                            <strong>Author:</strong> Nguyễn Hoàng Lộc
                        </p>

                        <p>
                            <strong>Project:</strong> AnimeToday
                        </p>
                    </div>

                </div>
                <div className="about-right">
                    <img
                        className="about-image"
                        src={aboutImage}
                        alt="Anime Explorer"
                    />
                </div>
            </div>
            <div className="about-columns about-content">
                <section className="about-section">
                    <h2>Features</h2>
                    <ul>
                        <li>🔥 Browse Trending Anime</li>
                        <li>🔍 Search Anime</li>
                        <li>📖 View Anime Details</li>
                        <li>🎲 Random Anime</li>
                        <li>❤️ Favorite Anime</li>
                        <li>▶️ Watch Trailer</li>
                        <li>⭐ Anime Recommendations</li>
                        <li>🌙 Dark Mode</li>
                        <li>📱 Responsive Design</li>
                    </ul>
                </section>
                <section className="about-section">
                    <h2>Technologies</h2>
                    <ul>
                        <li>React</li>
                        <li>Vite</li>
                        <li>React Router</li>
                        <li>Axios</li>
                        <li>Jikan API</li>
                        <li>LocalStorage</li>
                        <li>CSS</li>
                    </ul>
                </section>
                <section className="about-section about-footer">
                    <h2>About This Project</h2>
                    <p>
                        This project was created to practice React fundamentals, API integration, routing, state management, responsive UI design, and modern frontend development.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default About;