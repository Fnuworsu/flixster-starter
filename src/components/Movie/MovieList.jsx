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
    const [movieOverview, setMovieOverview] = useState("")
    const [movieGenre, setMovieGenre] = useState([])
    const [movieReleaseDate, setMovieReleaseDate] = useState("")
    const [movieRating, setMovieRating] = useState(null)
    const [movieVoteCount, setMovieVoteCount] = useState(null)
    const [movieTrailerUrl, setMovieTrailerUrl] = useState("")
    const [movieRuntime, setMovieRuntime] = useState("0 minutes")

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

    const fetchMovieTrailer = async (movieId) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)
            const data = await response.json()

            const trailer = data.results.find(video =>
                video.type === "Trailer" && video.site === "YouTube") || data.results[0]

            if (trailer) {
                setMovieTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`)
            } else {
                setMovieTrailerUrl("")
            }
        } catch (error) {
            setMovieTrailerUrl("")
            throw new Error(error)
        }
    };

    const fetchMovieRuntime = async (movieId) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
            const data = await response.json()
            const runtime = data.runtime

            if (runtime) {
                setMovieRuntime(`${runtime} minutes`)
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    const openModal = (movie) => {
        setMovieId(movie.id)
        setMovieImageUrl(`${modalImageBaseUrl}${movie.backdrop_path}`)
        setMovieTitle(movie.title)
        setShowModal(true)
        setMovieOverview(movie.overview)
        setMovieGenre(genre.filter(genre => movie.genre_ids.includes(genre.id)).map(genre => "🌟 " + genre.name + " "))
        setMovieReleaseDate(movie.release_date)
        setMovieRating(movie.vote_average)
        setMovieVoteCount(movie.vote_count)
        fetchMovieTrailer(movie.id)
        fetchMovieRuntime(movie.id)
    }

    const getMovies = async(url) => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            let results = data.results

            if (page === 1) {
                setMovies(results)
            } else {
                setMovies(prevMovies => [...prevMovies, ...results])
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
                {
                    movies.map(movie => (
                        <MovieCard
                            key={movie.id + new Date().getMilliseconds()}
                            id={movie.id}
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
                    onClose={() => setShowModal(false)}
                    movieId={movieId}
                    overview={movieOverview}
                    genre={movieGenre}
                    releaseDate={movieReleaseDate}
                    rating={movieRating}
                    voteCount={movieVoteCount}
                    trailerUrl={movieTrailerUrl}
                    runtime={movieRuntime}
                />
            )}

            <div>
                <button className="load-more-btn" onClick={loadMore}>Load More</button>
                <br></br>
                <br></br>

            </div>
        </>
    )
}
