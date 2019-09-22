import React from 'react'
import { Link } from 'react-router-dom'
import SearchInput from '../components/SearchInput'

export default function SelectFilm() {
  const [films, setFilms] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  return (
    <div data-testid="select-film-page">
      <SearchInput
        onSearchStart={() => {
          setLoading(true)
        }}
        onSearchResult={({ query, result }) => {
          setLoading(false)
          setFilms(result)
        }}
      />

      {loading ? <div>loading...</div> : null}
      <Link to="/select-seats">next</Link>
    </div>
  )
}
