import React from 'react'
import useErrorMessage from '../hooks/useErrorMessage'

export default function ErrorMessageViewer() {
  const { hasError, errorMessage } = useErrorMessage()

  if (!hasError()) {
    return null
  }

  return (
    <div
      data-testid="error-message"
      style={{
        backgroundColor: '#fff1f0',
        border: '1px solid #ffa39e',
        margin: '0',
        color: 'rgba(0,0,0,0.65)',
        fontSize: '14px',
        lineHeight: '1.5',
        listStyle: 'none',
        position: 'relative',
        padding: '8px 15px 8px 37px',
        wordWrap: 'break-word',
        borderRadius: '4px',
      }}
    >
      error: {errorMessage}
    </div>
  )
}
