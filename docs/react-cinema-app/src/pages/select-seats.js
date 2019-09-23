import React from 'react'
import { Link } from 'react-router-dom'
import { getSeats } from '../api'
import SeatsSelector from '../components/SeatsSelector'
import { seats } from '../fixtures'

export default function SelectSeats({ selectLimit = 5 }) {
  const [selectedSeats, setSelectedSeats] = React.useState([])
  // const [seats, setSeats] = React.useState([])

  // React.useEffect(() => {
  //   getSeats().then(seats => setSeats(seats))
  // }, [])

  return (
    <div data-testid="select-seats-page">
      <h2>
        selected seats: {selectedSeats.length}/{selectLimit}
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
        <SeatsSelector selectLimit={selectLimit} onChange={setSelectedSeats} seats={seats} />
      </div>

      <div>
        <Link to="/select-film">select film</Link>
      </div>
      <div>
        <Link to="/checkout">Checkout</Link>
      </div>
    </div>
  )
}
