import { useState, useEffect } from "react"
import { MovieCard } from "../Movie/MovieCard"

export const Sort = ({ sortOption }) => {
  const [movies, setMovies] = useState([])
  const apiKey = import.meta.env.VITE_API_KEY
  const URL = `https://api.themoviedb.org/3/movie/now_playing?&api_key=${apiKey}&page=1`
  const imageBaseUrl = "http://image.tmdb.org/t/p/w185"

  const getMovies = async (url) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setMovies(data.results)
    } catch (error) {
      throw new Error(error)
    }
  };

  const loadMovie = () => {
    return (
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            imageUrl={`${imageBaseUrl}${movie.poster_path}`}
            title={movie.title}
            rating={movie.vote_average}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    getMovies(URL);
  }, []);

  useEffect(() => {
    const sortMovies = () => {
      let sortedMovies = [...movies]
      switch (sortOption) {
        case "Release date":
          sortedMovies.sort(
            (a, b) => new Date(a.release_date) - new Date(b.release_date)
          );
          break;
        case "Rating":
          sortedMovies.sort((a, b) => b.vote_average - a.vote_average)
          break;
        case "Title(A-Z)":
          sortedMovies.sort((a, b) => a.title.localeCompare(b.title))
          break
        default:
          break
      }
      setMovies(sortedMovies)
    }

    if (movies.length > 0) {
      sortMovies()
    }
  }, [sortOption])

  return <>{loadMovie()}</>
};
