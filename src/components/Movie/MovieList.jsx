import { useEffect, useState } from "react"
import { MovieCard } from "./MovieCard.jsx"
import "./MovieList.css"

export const MovieList = () => {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const apiKey = import.meta.env.VITE_API_KEY
    const url = `https://api.themoviedb.org/3/movie/now_playing?&api_key=${apiKey}&page=${page}`
    const imagBaseUrl = "http://image.tmdb.org/t/p/w185"

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

    const loadMovie = () => {
        return (
            <div className="movie-list">
            {movies.map(movie => (
                <MovieCard key={movie.id} imageUrl={`${imagBaseUrl}${movie.poster_path}`} title={movie.title} rating={movie.vote_average}>

                </MovieCard>
            ))}
        </div>
        )
    }

    const loadMore = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        getMovies(url)
    }, [url, page])

    return (
        <>
        {loadMovie()}
        <div>
        <br />
        <button className="load-more-btn" onClick={() => loadMore()}>Load More</button>
        <br /><br />
        </div>
        </>
    )
}
