import React from 'react'
import SeatsRow from './SeatsRow'
import useErrorMessage from '../hooks/useErrorMessage'
import { errors } from '../constants'

export default function SeatSelector({ onChange, seats, selectLimit }) {
  const [selected, setSelected] = React.useState([])
  const { setErrorMessage, resetErrorMessage } = useErrorMessage()

  React.useEffect(() => {
    onChange(selected)
  }, [onChange, selected])

  function selectSeat(seatId) {
    resetErrorMessage()

    if (selected.includes(seatId)) {
      setSelected(selected.filter(id => id !== seatId))
    } else if (selected.length === selectLimit) {
      setErrorMessage(errors.seatsLimitReached)
    } else {
      setSelected([...selected, seatId])
    }
  }

  function isSeatSelected(seatId) {
    return selected.includes(seatId)
  }

  return (
    <div>
      {seats.map((row, i /* don't do this at home */) => {
        return (
          <SeatsRow
            key={i}
            rowNumber={i}
            seatsRow={row}
            selectSeat={selectSeat}
            isSeatSelected={isSeatSelected}
          />
        )
      })}
    </div>
  )
}
