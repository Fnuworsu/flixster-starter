import { useState, useEffect } from 'react'
import { MovieCard } from '../Movie/MovieCard.jsx'
import { Modal } from '../Modal/Modal.jsx'
import './Search.css'

export const Search = ({
    searchQuery,
    sortOption,
    favoritedMovies = [],
    watchedMovies = [],
    toggleFavorite,
    toggleWatched
}) => {
    const [searchResult, setSearchResult] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [movieId, setMovieId] = useState(null)
    const [movieImageUrl, setMovieImageUrl] = useState("")
    const [movieTitle, setMovieTitle] = useState("")
    const [movieOverview, setMovieOverview] = useState("")
    const [movieGenre, setMovieGenre] = useState([])
    const [movieReleaseDate, setMovieReleaseDate] = useState("")
    const [movieRating, setMovieRating] = useState(null)
    const [movieVoteCount, setMovieVoteCount] = useState(null)

    const apiKey = import.meta.env.VITE_API_KEY
    const query = encodeURIComponent(searchQuery)
    const URL = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&api_key=${apiKey}&page=1`
    const imageBaseUrl = "http://image.tmdb.org/t/p/w185"
    const modalImageBaseUrl = "https://image.tmdb.org/t/p/w500"

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

    const [movieTrailerUrl, setMovieTrailerUrl] = useState("")

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
    }

    const getSearchResults= async(url) => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            setSearchResult(data.results)
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        if (searchQuery) {
            getSearchResults(URL)
        }
    }, [searchQuery])

    const sortByReleaseDate = (results) => {
        return [...results].sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
    }

    const sortByRating = (results) => {
        return [...results].sort((a, b) => b.vote_average - a.vote_average)
    }

    const sortByTitle = (results) => {
        return [...results].sort((a, b) => a.title.localeCompare(b.title))
    }

    const applySorting = (results) => {
        if (!sortOption) return results

        switch (sortOption) {
            case "Release date":
                return sortByReleaseDate(results)
            case "Rating":
                return sortByRating(results)
            case "Title(A-Z)":
                return sortByTitle(results)
            default:
                return results
        }
    }

    const loadSearchResults = () => {
        if (searchQuery && searchResult.length === 0) {
            return <div className="no-results">No movies found for "{searchQuery}"</div>
        }

        const filteredResults = searchResult.filter(res => res.vote_average > 0)
        if (searchQuery && filteredResults.length === 0) {
            return <div className="no-results">No movies with ratings found for "{searchQuery}"</div>
        }

        const sortedResults = applySorting(filteredResults)

        return (
            <div className="search-result">
                {searchQuery && sortedResults.map(res => (
                    <MovieCard
                        key={res.id}
                        id={res.id}
                        imageUrl={`${imageBaseUrl}${res.poster_path}`}
                        title={res.title}
                        rating={res.vote_average}
                        onClick={() => openModal(res)}
                        isFavorited={favoritedMovies.includes(res.id)}
                        isWatched={watchedMovies.includes(res.id)}
                        toggleFavorite={toggleFavorite}
                        toggleWatched={toggleWatched}
                    />
                ))}
            </div>
        )
    }

    return (
        <>
            {loadSearchResults()}

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
                />
            )}
        </>
    )
}
