const Pagination = ({
    currentPage,
    hasNextPage,
    onPageChange
}) => {
    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (hasNextPage) {
            onPageChange(currentPage + 1);
        }
    };

    const pages = [];

    let start = Math.max(1, currentPage - 2);
    let end = start + 4;

    if (end < 5) {
        end = 5;
    }

    if (currentPage <= 3) {
        start = 1;
        end = 5;
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <button
                className="page-btn"
                onClick={handlePrev}
                disabled={currentPage === 1}
            >
                ← Previous
            </button>

            <div className="page-numbers">
                {pages.map((page) => (
                    <button
                        key={page}
                        className={
                            page === currentPage
                                ? "page-number active"
                                : "page-number"
                        }
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                className="page-btn"
                onClick={handleNext}
                disabled={!hasNextPage}
            >
                Next →
            </button>
        </div>
    );
};

export default Pagination;