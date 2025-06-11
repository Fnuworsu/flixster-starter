import { useState } from 'react'
import './App.css'
import { Header } from './components/Header/Header.jsx'
import { Footer } from './components/Footer/Footer.jsx'
import { MovieList } from './components/Movie/MovieList.jsx'
import { Search } from './components/Search/Search.jsx'
import { Sort } from './components/Sort/Sort.jsx'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState("")

  return (
    <div className="App">
      <Header setSearchQuery={setSearchQuery} setSortOption={setSortOption} />
      {searchQuery && !sortOption && <Search searchQuery={searchQuery}></Search>}
      {!searchQuery && sortOption && <Sort sortOption={sortOption}></Sort>}
      {!searchQuery && !sortOption && <MovieList></MovieList>}
      <Footer />
    </div>
  )
}

export default App
