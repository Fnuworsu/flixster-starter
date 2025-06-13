import "./MovieCard.css"
import { useState } from "react";
export const MovieCard = (props) => {
    const [like, setLike] = useState("🤍")
    const [watch, setWatch] = useState("👁️‍🗨")
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    const changeLike = (e) => {
        e.stopPropagation()
        setLike(like === "🤍" ? "❤️" : "🤍")
    }

    const changeWatch = (e) => {
        e.stopPropagation()
        setWatch(watch === "👁️‍🗨" ? "👁️" : "👁️‍🗨")
    }

    return (
        <div onClick={handleClick} className="movie-card">
            <div className="container">

                <img src={props.imageUrl} alt={props.title} className="movie-card-image"/>
                <div className="movie-card-content">
                    <h3>{props.title}</h3>
                    <p>Rating: {props.rating}</p>
                    <div onClick={changeLike}><p className="like">{like}</p></div>
                    <div onClick={changeWatch}><p className="watch">{watch}</p></div>
                </div>
            </div>
        </div>
    )
}
