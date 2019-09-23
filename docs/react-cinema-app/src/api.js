import { randomNumberInRange, buildSeats } from './util'
import { jurassicParkFilms } from './fixtures'

export function getSeats() {
  const numOfRows = randomNumberInRange(4, 10)
  const numOfSeatsPerRow = randomNumberInRange(6, 10)
  return Promise.resolve(buildSeats(numOfRows, numOfSeatsPerRow))
}

export function searchFilms(query) {
  const apiKey = '7c6b8bf2'
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`

  return fetch(url).then(res => res.json())

  // return Promise.resolve(jurassicParkFilms)
}
