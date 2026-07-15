const Pagination = ({
    currentPage,
    totalPages,
    hasNextPage,
    onPageChange
}) => {
    const lastPage = totalPages ?? (
        hasNextPage
            ? currentPage + 2
            : currentPage
    );

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < lastPage) {
            onPageChange(currentPage + 1);
        }
    };

    const pages = [];

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(lastPage, start + 4);

    start = Math.max(1, end - 4);

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
                disabled={currentPage >= lastPage}
            >
                Next →
            </button>

        </div>
    );
};

export default Pagination;