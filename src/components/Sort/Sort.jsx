import { useState, useEffect } from "react";
import { MovieCard } from "../Movie/MovieCard";

export const Sort = ({sortOption}) => {
  /**
   * sort by release_date, title, rating
   */
  const [sortResults, setSortResults] = useState([])
  const [movies, setMovies] = useState([])
  const apiKey = import.meta.env.VITE_API_KEY
  const URL = `https://api.themoviedb.org/3/movie/now_playing?&api_key=${apiKey}&page=1`
  const imageBaseUrl = "http://image.tmdb.org/t/p/w185"

  const getMovies = async(url) => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            setMovies(data.results)
        } catch (error) {
            throw new Error(error)
        }
    }

    const loadMovie = () => {
        return (
            <div className="movie-list">
            {movies.map(movie => (
                <MovieCard key={movie.id} imageUrl={`${imageBaseUrl}${movie.poster_path}`} title={movie.title} rating={movie.vote_average}>

                </MovieCard>
            ))}
        </div>
        )
    }

    useEffect(() => {
        getMovies(URL)
    }, [sortOption])

    const sortByReleaseDate = () => {
        movies.sort((a,b) => new Date(a.release_date) - new Date(b.release_date))
    }
    const sortByRating = () => {
        movies.sort((a,b) => b.vote_average - a.vote_average)
    }

    const sortByTitle = () => {
        movies.sort((a,b) => a.title.localeCompare(b.title))
    }

    switch (sortOption) {
        case "Release date":
            sortByReleaseDate()
            break;
        case "Rating":
            sortByRating()
            break;
        case "Title(A-Z)":
            sortByTitle()
            break;
        default:
            break;
    }

    console.log(movies)

    return (
        <>
            {loadMovie()}
        </>
    )
}
