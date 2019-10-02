# Redux

To Test component that uses Redux is necessary to wrap the component being tested by the the store provider

## create and test a component using redux

for this examples we expect to have a working app creted using `create-react-app` already in place

### setup

`npm install redux-starter-kit react-redux`

### files

#### Header.js

```
import React from 'react'
import { useSelector } from 'react-redux'

export function Header() {
  const user = useSelector(state => state.user)

  if (!user) {
    return (
      <nav>
        <div>login</div>
        <div>register</div>
      </nav>
    )
  }

  return <div>{user.name}</div>
}
```

#### reducer.js

```
export const initialState = {
  user: null,
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
      }
    default:
      return state
  }
}
```

#### Header.test.js

```
import React from 'react'
import { Provider } from 'react-redux'
import { Header } from './Header'
import { createStore } from 'redux'
import { initialState, reducer } from './reducer'
import { render } from '@testing-library/react'

function renderWithProviders(ui, { reduxState } = {}) {
  const store = createStore(reducer, reduxState || initialState)
  return render(<Provider store={store}>{ui}</Provider>)
}

test('header not logged in', () => {
  const { getByText } = renderWithProviders(<Header />, {
    store: { user: null },
  })
  getByText('login')
  getByText('register')
})

test('header logged in', () => {
  const { getByText } = renderWithProviders(<Header />, {
    reduxState: {
      user: {
        name: 'bob',
      },
    },
  })

  getByText('bob')
})
```
