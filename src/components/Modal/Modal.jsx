import "./Modal.css"

export const Modal = (props) => {
    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    return (
        <>
            <div className="modal" onClick={handleClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        {props.imageUrl && <img src={props.imageUrl} alt={props.title}></img>}
                        <span className="close" onClick={handleClose}>&times;</span>
                    </div>
                    <div className="modal-text">
                        <div className="modal-overview">
                            <p>{props.genre}</p>
                            <b/>
                            <p>Overview</p>
                            <br/>
                            <p>{props.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
