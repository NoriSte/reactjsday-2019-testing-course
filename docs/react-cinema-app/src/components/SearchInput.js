import React, { useEffect, useCallback } from 'react'
import { searchFilms } from '../api'

export default function SearchInput({ onSearchStart = () => {}, onSearchResult }) {
  const [query, setQuery] = React.useState('')

  const search = React.useCallback(
    function search(q) {
      onSearchStart()
      searchFilms(q)
        .then(res => {
          onSearchResult({
            query: q,
            result: res,
          })
        })
        .catch(console.error)
    },
    [onSearchResult, onSearchStart],
  )

  useEffect(() => {
    if (query !== '') {
      const timeout = setTimeout(() => {
        search(query)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [query, search])

  return (
    <label>
      search
      <input type="text" onChange={e => setQuery(e.target.value)} />
    </label>
  )
}
