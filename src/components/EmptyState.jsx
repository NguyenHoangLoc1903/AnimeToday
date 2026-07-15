const EmptyState = ({
    icon = "📭",
    title = "Nothing Here",
    message = ""
}) => {
    return (
        <div className="empty-state">
            <div className="empty-icon">
                {icon}
            </div>

            <h2>
                {title}
            </h2>

            <p>
                {message}
            </p>
        </div>
    );
};

export default EmptyState;