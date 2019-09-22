import React from 'react'
import Seat from './Seat'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { seatState } from '../constants'

test('available seat is clickable', () => {
  const onSelectMock = jest.fn()
  const seatId = `1:20`

  const { getByText } = render(<Seat state={seatState.AVAILABLE} seatId={seatId} onSelect={onSelectMock} />)

  const button = getByText(seatId)
  expect(button).not.toBeDisabled()

  fireEvent.click(button)
  expect(onSelectMock).toHaveBeenCalledTimes(1)
  expect(onSelectMock).toHaveBeenCalledWith(seatId)
})

test('non available seat is not clickable', () => {
  const onSelectMock = jest.fn()
  const seatId = `1:20`

  const { getByText } = render(
    <Seat state={seatState.NOT_AVAILABLE} onSelect={onSelectMock} seatId={seatId} />,
  )

  const button = getByText(seatId)
  expect(button).toBeDisabled()

  fireEvent.click(button)
  expect(onSelectMock).not.toHaveBeenCalled()
})

test('selected seat is clickable', () => {
  const onSelectMock = jest.fn()
  const seatId = `1:20`

  const { getByText } = render(<Seat state={seatState.SELECTED} onSelect={onSelectMock} seatId={seatId} />)

  const button = getByText(seatId)
  expect(button).not.toBeDisabled()

  fireEvent.click(button)
  expect(onSelectMock).toHaveBeenCalledTimes(1)
  expect(onSelectMock).toHaveBeenCalledWith(seatId)
})

// describe('Seat renders correct color based on state', () => {
//   test('available', () => {
//     const seatId = `1:20`
//     const { getByText } = render(<Seat state={seatState.AVAILABLE} seatId={seatId} />)

//     const button = getByText(seatId)
//     expect(button).toHaveStyle(`backgound: red`)
//   })

// test('selecter', () => {
//   const seatId = `1:20`
//   const { getByText } = render(<Seat available={true} selected={true} seatId={seatId} />)

//   const button = getByText(seatId)

//   expect().toHaveStyle('height', '20px')
// })
// test('not available', () => {
//   const seatId = `1:20`
//   const { getByText } = render(<Seat available={false} selected={false} seatId={seatId} />)

//   const button = getByText(seatId)
//   expect(button).toBeDisabled()

//   expect(button).toHaveStyle('height', '20px')
// })
// })
