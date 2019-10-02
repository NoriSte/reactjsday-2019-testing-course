# `jest-dom`

`jest-dom` is a library that extends Jest using custom matchers in order to make assertion on DOM elements easier

## Utilities

all the utilities offered by `jest-dom` as matchers

- toBeDisabled
- toBeEnabled
- toBeEmpty
- toBeInTheDocument
- toBeInvalid
- toBeRequired
- toBeValid
- toBeVisible
- toContainElement
- toContainHTML
- toHaveAttribute
- toHaveClass
- toHaveFocus
- toHaveFormValues
- toHaveStyle
- toHaveTextContent
- toHaveValue

## setup

`npm install --save-dev @testing-library/jest-dom`

add at the top of every file using the matcher to register them

`import '@testing-library/jest-dom/extend-expect'`

or in a setup file loaded by Jest to only import it once

when using `create-react-app` the file is `src/setupTests.js`

> note: after creating `src/setupTests.js` stop and restart Jest to load it

## some examples

### `toBeDisabled`

This allows you to check whether an element is disabled from the user's perspective.

it only matches elements that can be actually be disabled by HTML specification

- button,
- input
- select
- textarea
- optgroup
- option
- fieldse

#### examples

```diff
- expect(button.hasAttribute('disabled')).toBe(true)
+ expect(button).toBeDisabled()
```

```diff
- expect(button.hasAttribute('disabled')).toBe(false)
+ expect(button).not.toBeDisabled()
```

```
<button disabled>submit</button>
<fieldset disabled>
    <input type="text" />
</fieldset>
<a href="https://google.com" disabled>link</a>
```

```
expect(document.querySelector('button')).toBeDisabled()
expect(document.querySelector('input')).toBeDisabled()
expect(document.querySelector('a')).not.toBeDisabled()
```

### `toBeEnabled`

checks that an element in NOT disabled, same as `not.toBeDisabled()`

### `toBeEmpty`

checks that an element has no content

#### examples

```
<div id="my-div"></div>
```

```
expect(document.querySelector('#my-div')).toBeEmpty()
```

### `toBeInTheDocument`

checks that and element is in the document or not

#### examples

```
<div id="my-div"></div>
```

```
expect(document.querySelector('#my-div')).toBeInTheDocument()
expect(document.querySelector('input')).not.toBeInTheDocument()
```

### `toBeVisible`

checks that and element is currently visible to the user

An element is visible if **all** the following conditions are met:

- it does not have its css property display set to none
- it does not have its css property visibility set to either hidden or collapse
- it does not have its css property opacity set to 0
- its parent element is also visible (and so on up to the top of the DOM tree)
- it does not have the hidden attribute

#### examples

```
<div data-testid="zero-opacity" style="opacity: 0">Zero Opacity Example</div>
<div data-testid="visibility-hidden" style="visibility: hidden">
  Visibility Hidden Example
</div>
<div data-testid="display-none" style="display: none">Display None Example</div>
<div style="opacity: 0">
  <span data-testid="hidden-parent">Hidden Parent Example</span>
</div>
<div data-testid="visible">Visible Example</div>
<div data-testid="hidden-attribute" hidden>Hidden Attribute Example</div>
```

```
expect(document.querySelector('[data-testid="zero-opacity"]')).not.toBeVisible()
expect(
  document.querySelector('[data-testid="visibility-hidden"]'),
).not.toBeVisible()
expect(document.querySelector('[data-testid="display-none"]')).not.toBeVisible()
expect(
  document.querySelector('[data-testid="hidden-parent"]'),
).not.toBeVisible()
expect(document.querySelector('[data-testid="visible"]')).toBeVisible()
expect(
  document.querySelector('[data-testid="hidden-attribute"]'),
).not.toBeVisible()
```

## more examples

the complete descriptions of all utilities is available at `jest-dom` [github page](https://github.com/testing-library/jest-dom)
