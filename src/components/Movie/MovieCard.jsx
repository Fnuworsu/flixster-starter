import "./MovieCard.css"

export const MovieCard = (props) => {
    return (<>
        <div className="movie-card">
            <img src={props.imageUrl} alt={props.title} className="movie-card-image"/>
            <div className="movie-card-content">
                <h3>{props.title}</h3>
                <p>Rating: {props.rating}</p>
            </div>
        </div>
    </>)
}
