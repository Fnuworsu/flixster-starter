import "./Modal.css"

export const Modal = (props) => {
    console.log("Modal component rendered with props:", props);

    const handleClose = () => {
        console.log("Close button clicked");
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
                        <h3>{props.title}</h3>
                        <div className="modal-info">
                            <p className="rating">{props.rating}</p>
                            <p className="year">2023</p>
                        </div>
                        <div className="modal-overview">
                            <p>This movie is part of the now playing collection. Click to watch this exciting film with stunning visuals and an engaging storyline that will keep you entertained from start to finish.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
