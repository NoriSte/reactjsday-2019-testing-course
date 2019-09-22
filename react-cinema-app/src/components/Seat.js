import React from 'react'
import { seatState } from '../constants'
/**
 *
 * TO TEST
 * cannot select unavailable seat
 * accessible with arrows
 */

export const colors = {
  available: 'lightblue',
  selected: 'lightgreen',
  notAvaiable: 'lightgrey',
}

export default function Seat({ state, onSelect, seatId }) {
  let bgColor = colors.available
  if (state === seatState.SELECTED) {
    bgColor = colors.selected
  } else if (state === seatState.NOT_AVAILABLE) {
    bgColor = colors.notAvaiable
  }

  const cursor = state === seatState.NOT_AVAILABLE ? 'not-allowed' : 'pointer'
  const disabled = state === seatState.NOT_AVAILABLE

  return (
    <button
      onClick={() => onSelect(seatId)}
      disabled={disabled}
      style={{
        color: 'white',
        fontSize: '1rem',
        margin: 3,
        borderRadius: '50%',
        background: bgColor,
        border: state === seatState.SELECTED ? '3px solid green' : 'none',
        width: 45,
        height: 45,
        cursor,
      }}
    >
      {seatId}
    </button>
  )
}
