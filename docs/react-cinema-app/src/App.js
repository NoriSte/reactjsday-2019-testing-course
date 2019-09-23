import React from 'react'
import ErrorMessageViewer from './components/ErrorMessageViewer'
import { Route, Redirect } from 'react-router-dom'
import AppProviders from './context/AppProviders'
import SelectFilmPage from './pages/select-film'
import SelectSeatsPage from './pages/select-seats'
import CheckoutPage from './pages/checkout'
import { BrowserRouter, Switch } from 'react-router-dom'

/**
 * seatId = rowNumber + ':' + seatNumber
 */

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppProviders>
          <ErrorMessageViewer />

          <Switch>
            <Route exact path="/select-film" component={SelectFilmPage}></Route>
            <Route path="/select-seats" component={SelectSeatsPage}></Route>
            <Route path="/checkout" component={CheckoutPage}></Route>
            <Redirect exactfrom="/" to="/select-film" />
          </Switch>
        </AppProviders>
      </div>
    </BrowserRouter>
  )
}

export default App
