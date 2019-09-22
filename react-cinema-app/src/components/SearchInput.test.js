import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SearchInput from './SearchInput'
import { searchFilms as mockSearchFilms } from '../api'

jest.mock('../api', () => {
  return {
    searchFilms: jest.fn(() => {
      console.log('#################')
    }),
  }
})

test('', () => {
  // const { getByLabelText, debug } = render(<SearchInput />)
  // const input = getByLabelText(/search/i)
  // fireEvent.change(input, { target: { value: 'ciaone' } })
  // debug(input)
  // expect(mockSearchFilms).toHaveBeenCalledWith(1)
})
