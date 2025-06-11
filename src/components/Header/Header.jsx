import "./Header.css"

export const Header = ({ setSearchQuery }) => {
    const handleSearchSubmit = (event) => {
        event.preventDefault()
        const query = event.target.searchTerm.value;
        if (setSearchQuery) {
            setSearchQuery(query);
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
                        <select>
                            <option>Sort by</option>
                            <option>Title(A-Z)</option>
                            <option>Release date</option>
                            <option>Rating</option>
                        </select>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
