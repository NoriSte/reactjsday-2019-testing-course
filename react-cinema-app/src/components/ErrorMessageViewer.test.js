import React from 'react'
import ErrorMessageViewer from './ErrorMessageViewer'
import { ErrorMessageProvider } from '../context/error-message-context'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('has no error mesagge by default', () => {
  const { queryByTestId } = render(
    <ErrorMessageProvider>
      <ErrorMessageViewer />
    </ErrorMessageProvider>,
  )
  expect(queryByTestId('error-message')).not.toBeInTheDocument()
})
