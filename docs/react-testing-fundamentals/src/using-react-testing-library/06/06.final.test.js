import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LatestArticles from './LatestArticles'

jest.mock('./api', () => {
  return {
    loadArticles() {
      return Promise.resolve([
        {
          userId: 7,
          id: 63,
          title: 'voluptas blanditiis repellendus animi ducimus error sapiente et suscipit',
          body:
            'enim adipisci aspernatur nemo\nnumquam omnis facere dolorem dolor ex quis temporibus incidunt\nab delectus culpa quo reprehenderit blanditiis asperiores\naccusantium ut quam in voluptatibus voluptas ipsam dicta',
        },
        {
          userId: 7,
          id: 64,
          title: 'et fugit quas eum in in aperiam quod',
          body:
            'id velit blanditiis\neum ea voluptatem\nmolestiae sint occaecati est eos perspiciatis\nincidunt a error provident eaque aut aut qui',
        },
        {
          userId: 7,
          id: 65,
          title: 'consequatur id enim sunt et et',
          body:
            'voluptatibus ex esse\nsint explicabo est aliquid cumque adipisci fuga repellat labore\nmolestiae corrupti ex saepe at asperiores et perferendis\nnatus id esse incidunt pariatur',
        },
      ])
    },
  }
})

describe('LatestArticles', () => {
  test('respect limit of shown articles', async () => {
    const limit = 2
    const { getAllByTestId } = render(<LatestArticles limit={limit} />)
    await waitForElement(() => getAllByTestId('article'))
    expect(getAllByTestId('article').length).toBeLessThanOrEqual(limit)
  })
  test(`only first article body's content is shown`, async () => {
    const { queryAllByTestId, getAllByTestId } = render(<LatestArticles />)

    await waitForElement(() => queryAllByTestId('article'))
    const allArticlesBodies = getAllByTestId('article-body')

    expect(allArticlesBodies).toHaveLength(1)
  })
  test(`show loading indicator then articles`, async () => {
    const { getByTestId, queryAllByTestId, getAllByTestId } = render(<LatestArticles />)

    expect(queryAllByTestId('article')).toHaveLength(0)

    await waitForElement(() => getByTestId('loading-indicator'))
    await waitForElement(() => getAllByTestId('article'))
    const allArticles = getAllByTestId('article')

    expect(allArticles).toHaveLength(3)
  })
})
