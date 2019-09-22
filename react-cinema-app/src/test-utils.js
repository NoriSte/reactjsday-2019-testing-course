import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { render } from '@testing-library/react'
import AppProviders from './context/AppProviders'

export function renderWithProviders(ui) {
  const history = createMemoryHistory()
  return render(
    <Router history={history}>
      <AppProviders>{ui}</AppProviders>
    </Router>,
  )
}
