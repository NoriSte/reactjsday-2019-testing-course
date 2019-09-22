import React from 'react'
import Seat from './Seat'
import { seatState } from '../constants'

export default function SeatsRow({ seatsRow, rowNumber, selectSeat, isSeatSelected }) {
  return (
    <div style={{ display: 'flex' }}>
      {seatsRow.map((s, i) => {
        const seatNumber = i
        const seatId = rowNumber + ':' + seatNumber
        return (
          <Seat
            seatId={seatId}
            key={seatId}
            state={
              isSeatSelected(seatId)
                ? seatState.SELECTED
                : s === seatState.AVAILABLE
                ? seatState.AVAILABLE
                : seatState.NOT_AVAILABLE
            }
            onSelect={selectSeat}
          />
        )
      })}
    </div>
  )
}
