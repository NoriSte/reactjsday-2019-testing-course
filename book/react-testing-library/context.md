# Testing Context

When using `react-testing-library` testing Components using React Context is no different that testing any other kind of component.

Since we are testing the generated HTML and not how is it generated, the fact that something happens thanks to using of React Context is an implementation detail we should not be interested in

All we have to do is to wrap the tested component inside the `Context.Provider` it need to function property, exactly as you would in a normal application

for example a component that usese `react-intl` can be tested like this

```
import React from 'react'
import { FormattedMessage } from 'react-intl'

export function UnreadMessages({ unreadCount }) {
  return (
    <p>
      <FormattedMessage
        id="welcome"
        defaultMessage={`you have {unreadCount, number} {unreadCount, plural,
                      one {message}
                      other {messages}
                    }`}
        values={{ unreadCount }}
      />
    </p>
  )
}
```

## Normal usage

```
import React from 'react'
import ReactDOM from 'react-dom'
import { UnreadMessages } from './UnreadMessages'

// normal usage

ReactDOM.render(
  <IntlProvider locale="en">
    <UnreadMessages />
  </IntlProvider>,
  document.getElementById('container'),
)
```

## while testing

```
test('100 messages', () => {
  const { getByText } = render(
    <IntlProvider locale="en">
      <UnreadMessages unreadCount={100} />
    </IntlProvider>,
  )
  getByText('you have 100 messages')
})

test('one message', () => {
  const { getByText } = render(
    <IntlProvider locale="en">
      <UnreadMessages unreadCount={1} />
    </IntlProvider>,
  )
  getByText('you have 1 message')
})
```

## Dealing with multiple contexts

Sometimes may not be practical to use the provier directly, for example if the provider required a setup involving complex props or we have a high number of provider

is such cases a common approach it to create a testing utility that wrap `render` with all the provider you use in your app

```
function renderWithProviders(ui, { reduxState, locale = 'en' }) {
  const store = createStore(reducer, reduxState || initialState)
  return (
    <ThemeProvider>
      <ReduxProvider store={store}>
        <IntlProvider locale={locale}>{ui}</IntlProvider>
      </ReduxProvider>
    </ThemeProvider>
  )
}
```

> note: protip to avoid duplication you can create a single <AppProvider/> with all the providers you can use it both in testing and React app easily
