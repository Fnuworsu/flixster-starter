import "./Header.css"
import { useState } from "react"

export const Header = ({ setSearchQuery, setSortOption, setClear }) => {
    const [sortBy, setSortBy] = useState("Sort by")
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        if (setSearchQuery) {
            setSearchQuery(searchTerm)
            // clear sort option when searching
            setSortOption("")
            setSortBy("Sort by")
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSortChange = (event) => {
        event.preventDefault()
        const option = event.target.value
        if (setSortOption) {
            setSortBy(option)
            setSortOption(option)
            // clear search query when sorting
            setSearchQuery("")
        }
    }

    const handleClear = (event) => {
        event.preventDefault()

        if (setClear) {
            setClear(true)
            setSearchQuery("")
            setSortOption("")
            setSortBy("Sort by")
            setSearchTerm("")
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
                            <input
                                type="text"
                                name="searchTerm"
                                placeholder="Look up a movie..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button type="submit">Search</button>
                            <button onClick={handleClear} name="clear">Clear</button>
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
