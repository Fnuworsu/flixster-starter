import { useState } from 'react'
import './App.css'
import { Header } from './components/Header/Header.jsx'
import { Footer } from './components/Footer/Footer.jsx'
import { MovieList } from './components/Movie/MovieList.jsx'
import { Search } from './components/Search/Search.jsx'
import { Sort } from './components/Sort/Sort.jsx'
import { Clear } from './components/Clear/Clear.jsx'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState("")
  const [clear, setClear] = useState(false)

  return (
    <div className="App">
      <Header setSearchQuery={setSearchQuery} setSortOption={setSortOption} />
      {searchQuery ? (
        <Search searchQuery={searchQuery} sortOption={sortOption} />
      ) : sortOption ? (
        <Sort sortOption={sortOption} />
      ) : (
        <MovieList />
      )}
      <Footer />
    </div>
  )
}

export default App
