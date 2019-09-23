import React from 'react'
import SeatsRow from './SeatsRow'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { seatState } from '../constants'

test('renders seats passed as prop with seatId contructed using rowNumber and seat index', () => {
  const seatsRow = [seatState.AVAILABLE, seatState.AVAILABLE, seatState.AVAILABLE]
  const isSeatSelected = jest.fn(() => false)
  const rowNumber = 10

  const { getByText } = render(
    <SeatsRow seatsRow={seatsRow} rowNumber={rowNumber} isSeatSelected={isSeatSelected} />,
  )

  seatsRow.forEach((seat, index) => {
    getByText(`${rowNumber}:${index}`)
  })
})

test('check if every seat is selected using the constructed ID', () => {
  const seatsRow = [seatState.AVAILABLE, seatState.NOT_AVAILABLE, seatState.SELECTED]
  const isSeatSelected = jest.fn(() => false)
  const rowNumber = 10

  render(<SeatsRow seatsRow={seatsRow} rowNumber={rowNumber} isSeatSelected={isSeatSelected} />)

  expect(isSeatSelected).toHaveBeenCalledTimes(3)

  seatsRow.forEach((s, index) => {
    expect(isSeatSelected).toHaveBeenCalledWith(`${rowNumber}:${index}`)
  })
})
