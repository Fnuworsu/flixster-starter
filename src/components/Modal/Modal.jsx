import "./Modal.css"

export const Modal = (props) => {
    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={handleClose}>&times;</button>

                <div className="modal-backdrop" style={{ backgroundImage: `url(${props.imageUrl})` }}>
                    <div className="modal-backdrop-overlay"></div>
                </div>

                <div className="modal-details">
                    <h2 className="modal-title">{props.title}</h2>

                    <div className="modal-info">
                        <div className="modal-info-item">
                            <span className="info-label">Genre</span>
                            <span className="info-value">{props.genre}</span>
                        </div>

                        <div className="modal-info-item">
                            <span className="info-label">Release Date</span>
                            <span className="info-value">{props.releaseDate}</span>
                        </div>

                        <div className="modal-info-item">
                        <span className="info-label">Runtime</span>
                        <span className="info-value">{props.runtime}</span>
                        </div>

                        <div className="modal-info-item rating">
                            <span className="info-label">Rating</span>
                            <div className="info-value">
                                <span className="modal-vote">{props.rating}</span>
                                <span className="modal-vote-count">({props.voteCount} votes)</span>
                            </div>
                        </div>
                    </div>

                    <div className="modal-overview">
                        <h3>Overview</h3>
                        <p>{props.overview}</p>
                    </div>

                    {props.trailerUrl && (
                        <div className="modal-trailer">
                            <iframe
                                src={props.trailerUrl}
                                title={`${props.title} Trailer`}
                                style={{ border: 0 }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
