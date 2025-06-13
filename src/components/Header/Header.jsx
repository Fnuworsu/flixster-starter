import SideBar from "../Sidebar/Sidebar"
import "./Header.css"
import { useState } from "react"


export const Header = ({ setSearchQuery, setSortOption, setClear }) => {
    const [sortBy, setSortBy] = useState("Sort by")
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        if (setSearchQuery) {
            setSearchQuery(searchTerm)
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
        <header className="header">
            <div>
                <h1 className="title">Flixster </h1>
            </div>
            <div className="nav-bar">

                <form onSubmit={handleSearchSubmit}>
                    <div className="search">
                        <input
                            className="search-bar"
                            type="text"
                            name="searchTerm"
                            placeholder="Look up a movie..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button className="search-button" type="submit">Search</button>
                    </div>

                    <button className="clear-button"onClick={handleClear} name="clear">Clear</button>
                </form>
            </div>
            <div className="sort">
                <select className="dropdown"value="selectOption" onChange={handleSortChange}>
                    <option value="">{sortBy}</option>
                    <option value="Title(A-Z)">Title(A-Z)</option>
                    <option value="Release date">Release date</option>
                    <option value="Rating">Rating</option>
                </select>

            </div>

        </header>
    )
}
