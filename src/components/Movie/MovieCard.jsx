import "./MovieCard.css"

export const MovieCard = (props) => {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <div onClick={handleClick} className="movie-card">
            <div className="container">

                <img src={props.imageUrl} alt={props.title} className="movie-card-image"/>
                <div className="movie-card-content">
                    <h3>{props.title}</h3>
                    <p>Rating: {props.rating}</p>
                </div>
            </div>
        </div>
    )
}
