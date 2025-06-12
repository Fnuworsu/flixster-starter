import "./Header.css"
import { useState } from "react"

export const Header = ({ setSearchQuery, setSortOption }) => {
    const [sortBy, setSortBy] = useState("Sort by")

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        const query = event.target.searchTerm.value
        if (setSearchQuery) {
            setSearchQuery(query)
            // Clear sort option when searching
            setSortOption("")
            setSortBy("Sort by")
        }
    }

    const handleSortChange = (event) => {
        event.preventDefault()
        const option = event.target.value
        console.log(option)
        if (setSortOption) {
            setSortBy(option)
            setSortOption(option)
            // Clear search query when sorting
            setSearchQuery("")
        }
    }

    return (
        <header>
            <h1>📺 Flixster 📽️</h1>
            <br />
            <nav className="nav-bar">
                <ul>
                    <li>
                        <form onSubmit={handleSearchSubmit}>
                            <input type="text" name="searchTerm" placeholder="Look up a movie..."/>
                            <button type="submit">Search</button>
                        </form>
                    </li>
                    <li>
                        <select value="selectOption" onChange={handleSortChange}>
                            <option value="">{sortBy}</option>
                            <option value="Title(A-Z)">Title(A-Z)</option>
                            <option value="Release date">Release date</option>
                            <option value="Rating">Rating</option>
                        </select>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
