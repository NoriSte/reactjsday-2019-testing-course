import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LatestArticles from './LatestArticles'

describe('LatestArticles', () => {
  test('respect limit of shown articles', () => {
    render(<LatestArticles limit={5} />)
    /* implement me */
  })

  test(`first article body's content is shown`, () => {
    render(<LatestArticles />)
    /* implement me */
  })
  test(`show loading indicator while fetching articles`, () => {
    render(<LatestArticles />)
    /* implement me */
  })
})
