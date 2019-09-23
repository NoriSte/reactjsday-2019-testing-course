import React from 'react'
import { ErrorMessageProvider } from './error-message-context'

export default function AppProviders({ children }) {
  return <ErrorMessageProvider>{children}</ErrorMessageProvider>
}
