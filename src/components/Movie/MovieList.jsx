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
    const [movieOverview, setMovieOverview] = useState("")
    const [movieGenre, setMovieGenre] = useState([])

    const genre = [
        {"id": 28, "name": "Action"},
        {"id": 12, "name": "Adventure"},
        {"id": 16, "name": "Animation"},
        {"id": 35, "name": "Comedy"},
        {"id": 80, "name": "Crime"},
        {"id": 99, "name": "Documentary"},
        {"id": 18, "name": "Drama"},
        {"id": 10751, "name": "Family"},
        {"id": 14, "name": "Fantasy"},
        {"id": 36, "name": "History"},
        {"id": 27, "name": "Horror"},
        {"id": 10402, "name": "Music"},
        {"id": 9648, "name": "Mystery"},
        {"id": 10749, "name": "Romance"},
        {"id": 878, "name": "Science Fiction"},
        {"id": 10770, "name": "TV Movie"},
        {"id": 53, "name": "Thriller"},
        {"id": 10752, "name": "War"},
        {"id": 37, "name": "Western"}
    ]

    const modalImageBaseUrl = "https://image.tmdb.org/t/p/w500"

    const openModal = (movie) => {
        setMovieId(movie.id);
        setMovieImageUrl(`${modalImageBaseUrl}${movie.backdrop_path}`);
        setShowModal(true);
        setMovieOverview(movie.overview);
        setMovieGenre(genre.filter(genre => movie.genre_ids.includes(genre.id)).map(genre => "🌟 " + genre.name + " "))
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
                    onClose={() => setShowModal(false)}
                    movieId={movieId}
                    overview={movieOverview}
                    genre={movieGenre}
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
