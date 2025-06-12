import { useEffect, useState } from "react"
import { MovieCard } from "./MovieCard.jsx"
import "./MovieList.css"
import { Modal } from "../Modal/Modal.jsx"

export const MovieList = () => {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const apiKey = import.meta.env.VITE_API_KEY
    const url = `https://api.themoviedb.org/3/movie/now_playing?&api_key=${apiKey}&page=${page}`
    const imageBaseUrl = "https://image.tmdb.org/t/p/w185"

    const [showModal, setShowModal] = useState(false)
    const [movieId, setMovieId] = useState(null)
    const [movieImageUrl, setMovieImageUrl] = useState("")
    const [movieTitle, setMovieTitle] = useState("")
    const [movieRating, setMovieRating] = useState(0)

    const modalImageBaseUrl = "https://image.tmdb.org/t/p/w500"

    const openModal = (movie) => {
        console.log("Opening modal for movie:", movie);
        setMovieId(movie.id);
        setMovieImageUrl(`${modalImageBaseUrl}${movie.poster_path}`);
        setMovieTitle(movie.title);
        setMovieRating(movie.vote_average);
        setShowModal(true);
        console.log("showModal set to:", true);
    }

    const getMovies = async(url) => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            if (page === 1) {
                setMovies(data.results)
            } else {
                setMovies(prevMovies => [...prevMovies, ...data.results])
            }
        } catch (error) {
            throw new Error(error)
        }

    }

    const loadMore = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        getMovies(url)
    }, [url, page])

    return (
        <>
            <div className="movie-list">
                {movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        imageUrl={`${imageBaseUrl}${movie.poster_path}`}
                        title={movie.title}
                        rating={movie.vote_average}
                        onClick={() => openModal(movie)}
                    />
                ))}
            </div>

            {showModal && (
                <Modal
                    imageUrl={movieImageUrl}
                    title={movieTitle}
                    rating={movieRating}
                    onClose={() => setShowModal(false)}
                    movieId={movieId}
                />
            )}

            <div>
                <br />
                <button className="load-more-btn" onClick={loadMore}>Load More</button>
                <br /><br />
            </div>
        </>
    )
}
