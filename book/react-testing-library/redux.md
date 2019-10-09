# Testing Redux

To test components that use [Redux](https://redux.js.org/) is necessary to wrap them component being tested with the store provider.

For the next examples we expect to have a working app created using `create-react-app` already in place.

### Setup

`npm install redux-starter-kit react-redux`

### Files

#### Header.js

```jsx
import React from "react";
import { useSelector } from "react-redux";

export function Header() {
  const user = useSelector(state => state.user);

  if (!user) {
    return (
      <nav>
        <div>login</div>
        <div>register</div>
      </nav>
    );
  }

  return <div>{user.name}</div>;
}
```

#### reducer.js

```js
export const initialState = {
  user: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user
      };
    default:
      return state;
  }
}
```

#### Header.test.js

```jsx
import React from "react";
import { Provider } from "react-redux";
import { Header } from "./Header";
import { createStore } from "redux";
import { initialState, reducer } from "./reducer";
import { render } from "@testing-library/react";

function renderWithProviders(ui, { reduxState } = {}) {
  const store = createStore(reducer, reduxState || initialState);
  return render(<Provider store={store}>{ui}</Provider>);
}

test("header not logged in", () => {
  const { getByText } = renderWithProviders(<Header />, {
    store: { user: null }
  });
  getByText("login");
  getByText("register");
});

test("header logged in", () => {
  const { getByText } = renderWithProviders(<Header />, {
    reduxState: {
      user: {
        name: "bob"
      }
    }
  });

  getByText("bob");
});
```

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
