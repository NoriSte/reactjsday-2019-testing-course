import React from 'react'
import errorMessageContenext from '../context/error-message-context'

export default function useErrorMessage() {
  return React.useContext(errorMessageContenext)
}
