import React from 'react'
import SelectSeats from './select-seats'
import { renderWithProviders } from '../test-utils'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent } from '@testing-library/react'
import ErrorMessageViewer from '../components/ErrorMessageViewer'

test('display number of selected seats and default select limit', () => {
  const defaultSeatLimit = 5
  const { getByText } = renderWithProviders(<SelectSeats />)
  expect(getByText(/selected seats/i)).toHaveTextContent(`0/${defaultSeatLimit}`)
})

test('display number of selected seats and select limit', () => {
  const selectLimit = 12
  const { getByText } = renderWithProviders(<SelectSeats selectLimit={selectLimit} />)
  expect(getByText(/selected seats/i)).toHaveTextContent(`0/${selectLimit}`)
})

describe('show current selected seats', () => {
  test('increase by clicking seats', () => {
    const { getByText, container } = renderWithProviders(<SelectSeats />)

    const buttons = container.querySelectorAll('button:not([disabled])')

    fireEvent.click(buttons[0])
    expect(getByText(/selected seats/i)).toHaveTextContent(`1/`)
    fireEvent.click(buttons[1])
    expect(getByText(/selected seats/i)).toHaveTextContent(`2/`)
    fireEvent.click(buttons[2])
    expect(getByText(/selected seats/i)).toHaveTextContent(`3/`)
  })

  test('does not exceed selectLimit', () => {
    const selectLimit = 3
    const { getByText, container } = renderWithProviders(<SelectSeats selectLimit={selectLimit} />)

    const buttons = container.querySelectorAll('button:not([disabled])')

    fireEvent.click(buttons[0])
    expect(getByText(/selected seats/i)).toHaveTextContent(`1/`)
    fireEvent.click(buttons[1])
    expect(getByText(/selected seats/i)).toHaveTextContent(`2/`)
    fireEvent.click(buttons[2])
    expect(getByText(/selected seats/i)).toHaveTextContent(`3/`)
    fireEvent.click(buttons[3])
    expect(getByText(/selected seats/i)).not.toHaveTextContent(`4/`)
  })

  test('show error message when limit is reached and try to add another seat', () => {
    const { container, queryByTestId } = renderWithProviders(
      <div>
        <ErrorMessageViewer />
        <SelectSeats selectLimit={2} />
      </div>,
    )

    const buttons = container.querySelectorAll('button:not([disabled])')

    fireEvent.click(buttons[0])
    fireEvent.click(buttons[1])
    expect(queryByTestId('error-message')).not.toBeInTheDocument()
    fireEvent.click(buttons[2])
    expect(queryByTestId('error-message')).toBeInTheDocument()
    expect(queryByTestId('error-message')).toHaveTextContent('error: limit reached, cannot add another seat')

    // deselect
    fireEvent.click(buttons[0])
    expect(queryByTestId('error-message')).not.toBeInTheDocument()
  })
})
