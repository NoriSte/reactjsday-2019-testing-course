# Testing Context

When using [`react-testing-library`](https://github.com/testing-library/react-testing-library) testing components using React Context is no different than testing any other kind of component.

Since we are testing the generated HTML and not how is it generated, the fact that something happens thanks to using React Context is an [implementation detail](../testing-rules.md#whitebox-testing) we should not be interested in.

All we have to do is to wrap the tested component inside the [`Context.Provider`](https://reactjs.org/docs/context.html#contextprovider), exactly as you would in a normal application.

For example, a component that uses [`react-intl`](https://github.com/formatjs/react-intl) can be tested like this

```jsx
import React from "react";
import { FormattedMessage } from "react-intl";

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
  );
}
```

## Normal usage

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { UnreadMessages } from "./UnreadMessages";

// normal usage

ReactDOM.render(
  <IntlProvider locale="en">
    <UnreadMessages />
  </IntlProvider>,
  document.getElementById("container")
);
```

### While testing

```jsx
test("100 messages", () => {
  const { getByText } = render(
    <IntlProvider locale="en">
      <UnreadMessages unreadCount={100} />
    </IntlProvider>
  );
  getByText("you have 100 messages");
});

test("one message", () => {
  const { getByText } = render(
    <IntlProvider locale="en">
      <UnreadMessages unreadCount={1} />
    </IntlProvider>
  );
  getByText("you have 1 message");
});
```

### Dealing with multiple contexts

Sometimes may not be practical to use the provider directly. For example, if the provider requires a setup involving complex props or we have a high number of providers. In such cases a common approach is to create a testing utility that wraps `render` with all the providers you use in your app

```jsx
function renderWithProviders(ui, { reduxState, locale = "en" }) {
  const store = createStore(reducer, reduxState || initialState);
  return (
    <ThemeProvider>
      <ReduxProvider store={store}>
        <IntlProvider locale={locale}>{ui}</IntlProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}
```

> note: to avoid duplication, you can create a single `<AppProvider/>` with all the providers you need and ues it both in testing and React app easily.

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
