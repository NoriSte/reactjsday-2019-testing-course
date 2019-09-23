import React from 'react'
import SeatsRow from './SeatsRow'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { seatState } from '../App'
import SeatSelector from './SeatsSelector'

test('renders seats passed as prop with seatId contructed using rowNumber and seat index', () => {
  // const { getByText } = render(<SeatSelector seats={}/>)
})
