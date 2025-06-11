import { useState } from 'react'
import './App.css'
import { Header } from './components/Header/Header.jsx'
import { MovieList } from './components/Movie/MovieList.jsx'
import { Search } from './components/Search/Search.jsx'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="App">
      <Header setSearchQuery={setSearchQuery} />
      {searchQuery ? <Search searchQuery={searchQuery} /> : <MovieList />}
    </div>
  )
}

export default App
