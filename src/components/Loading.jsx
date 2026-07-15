const Loading = () => {
    const skeletons = Array.from(
        { length: 12 },
        (_, index) => index
    );

    return (
        <div className="container">
            <div className="skeleton-grid">
                {skeletons.map((item) => (
                    <div
                        key={item}
                        className="skeleton-card"
                    >
                        <div className="skeleton-image"></div>
                        <div className="skeleton-line title"></div>
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line small"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Loading;