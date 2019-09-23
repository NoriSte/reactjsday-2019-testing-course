import React from 'react'
import { loadArticles } from './api'

export default function LatestArticles({ limit }) {
  const [articles, setArticles] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!loading && articles.length === 0) {
      setLoading(true)
      loadArticles().then(articles => {
        setLoading(false)
        setArticles(articles.slice(0, limit))
      })
    }
  }, [loading, articles.length, limit])

  if (loading) {
    return <div data-testid="loading-indicator">...loading</div>
  }

  return (
    <div>
      {articles.map((a, i) => {
        return (
          <div key={a.id} data-testid="article">
            <h2>{a.title}</h2>
            {i === 0 ? <div data-testid="article-body">{a.body}</div> : null}
          </div>
        )
      })}
    </div>
  )
}
