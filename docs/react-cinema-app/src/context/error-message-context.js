import React from 'react'

const errorMessageContenext = React.createContext()
export default errorMessageContenext

export function ErrorMessageProvider({ children }) {
  const [errorMessage, setErrorMessage] = React.useState('')

  function hasError() {
    return errorMessage !== ''
  }

  function resetErrorMessage() {
    setErrorMessage('')
  }

  return (
    <errorMessageContenext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        resetErrorMessage,
        hasError,
      }}
    >
      {children}
    </errorMessageContenext.Provider>
  )
}
