export function buildSeats(numOfRows, numOfSeatsPerRow) {
  const seats = []
  for (let i = 0; i < numOfRows; i++) {
    const row = []
    for (let j = 0; j < numOfSeatsPerRow; j++) {
      row[j] = 0
    }
    seats.push(row)
  }

  return seats
}

export function randomNumberInRange(min, max) {
  const result = Math.floor(Math.random() * (max - min + 1)) + min
  return result
}
