import { useState, useEffect } from 'react'
import { MovieCard } from '../Movie/MovieCard.jsx'
import './Search.css'

export const Search = ({searchQuery, sortOption}) => {
    const [searchResult, setSearchResult] = useState([])

    const apiKey = import.meta.env.VITE_API_KEY
    const query = encodeURIComponent(searchQuery)
    const URL = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&api_key=${apiKey}&page=1`
    const imageBaseUrl = "http://image.tmdb.org/t/p/w185"

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
        return [...results].sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    }

    const sortByRating = (results) => {
        return [...results].sort((a, b) => b.vote_average - a.vote_average);
    }

    const sortByTitle = (results) => {
        return [...results].sort((a, b) => a.title.localeCompare(b.title));
    }

    const applySorting = (results) => {
        if (!sortOption) return results;

        switch (sortOption) {
            case "Release date":
                return sortByReleaseDate(results);
            case "Rating":
                return sortByRating(results);
            case "Title(A-Z)":
                return sortByTitle(results);
            default:
                return results;
        }
    }

    const loadSearchResults = () => {
        if (searchQuery && searchResult.length === 0) {
            return <div className="no-results">No movies found for "{searchQuery}"</div>
        }

        const filteredResults = searchResult.filter(res => res.vote_average > 0);
        if (searchQuery && filteredResults.length === 0) {
            return <div className="no-results">No movies with ratings found for "{searchQuery}"</div>
        }

        const sortedResults = applySorting(filteredResults);

        return (
            <div className="search-result">
                {searchQuery && sortedResults.map(res => (
                    <MovieCard
                        key={res.id}
                        imageUrl={`${imageBaseUrl}${res.poster_path}`}
                        title={res.title}
                        rating={res.vote_average}
                    />
                ))}
            </div>
        )
    }
    return (<>
        {loadSearchResults()}
    </>)
}
