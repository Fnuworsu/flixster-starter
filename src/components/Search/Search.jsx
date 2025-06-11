import { useState, useEffect } from 'react'
import { MovieCard } from '../Movie/MovieCard.jsx'
import './Search.css'

export const Search = ({searchQuery}) => {
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

    const loadSearchResults = () => {
        if (searchQuery && searchResult.length === 0) {
            return <div className="no-results">No movies found for "{searchQuery}"</div>
        }

        // Filter out movies with zero ratings
        const filteredResults = searchResult.filter(res => res.vote_average > 0)
        if (searchQuery && filteredResults.length === 0) {
            return <div className="no-results">No movies with ratings found for "{searchQuery}"</div>
        }

        return (
            <div className="search-result">
                {searchQuery && filteredResults.map(res => (
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
