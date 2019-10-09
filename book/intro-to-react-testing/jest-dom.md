# `jest-dom`

[`jest-dom`](https://github.com/testing-library/jest-dom) is a library that extends Jest using custom matchers in order to make assertions on DOM elements easier.

## Utilities

All the utilities offered by `jest-dom` as matchers

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

### Setup

- First, you need to install it with `npm install --save-dev @testing-library/jest-dom`
- then, add `import '@testing-library/jest-dom/extend-expect'` at the top of every file to register the matchers (or in a setup file loaded by Jest if you prefer to only import it once. When using `create-react-app` the file is [`src/setupTests.js`](https://create-react-app.dev/docs/running-tests#src-setuptestsjs))

> note: if you create the srtup file, remember to stop and restart Jest to load it

## Some examples

### [`toBeDisabled`](https://github.com/testing-library/jest-dom#tobedisabled)

This allows you to check whether an element is disabled from the user's perspective. It only matches elements that can be actually be disabled by HTML specification, they are

- button
- input
- select
- textarea
- optgroup
- option
- fieldse

Below you can find some examples using the [`toBeDisabled`](https://github.com/testing-library/jest-dom#tobedisabled) matcher:

```diff
- expect(button.hasAttribute('disabled')).toBe(true)
+ expect(button).toBeDisabled()
```

```diff
- expect(button.hasAttribute('disabled')).toBe(false)
+ expect(button).not.toBeDisabled()
```

```jsx
<button disabled>submit</button>
<fieldset disabled>
    <input type="text" />
</fieldset>
<a href="https://google.com" disabled>link</a>
```

```js
expect(document.querySelector('button')).toBeDisabled()
expect(document.querySelector('input')).toBeDisabled()
expect(document.querySelector('a')).not.toBeDisabled()
```

### [`toBeEnabled`](https://github.com/testing-library/jest-dom#tobeenabled)

Checks that an element in NOT disabled, same as `not.toBeDisabled()`

### [`toBeEmpty`](https://github.com/testing-library/jest-dom#tobeempty)

Checks that an element has no content

```jsx
<div id="my-div"></div>
```

```js
expect(document.querySelector('#my-div')).toBeEmpty()
```

### [`toBeInTheDocument`](https://github.com/testing-library/jest-dom#tobeinthedocument)

Checks that and element is in the document or not

```jsx
<div id="my-div"></div>
```

```js
expect(document.querySelector('#my-div')).toBeInTheDocument()
expect(document.querySelector('input')).not.toBeInTheDocument()
```

### [`toBeVisible`](https://github.com/testing-library/jest-dom#tobevisible)

Checks that and element is currently visible to the user. An element is visible if **all** the following conditions are met:

- it does not have its `display`css property set to `none`
- it does not have its `visibility`css property set to either `hidden` or `collapse`
- it does not have its `opacity`css property set to `0`
- its parent element is also visible (and so on up to the top of the DOM tree)
- it does not have the `hidden` attribute

Some examples:

```html
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

```js
expect(document.querySelector('[data-testid="zero-opacity"]')).not.toBeVisible()
expect(document.querySelector('[data-testid="visibility-hidden"]')).not.toBeVisible()
expect(document.querySelector('[data-testid="display-none"]')).not.toBeVisible()
expect(document.querySelector('[data-testid="hidden-parent"]')).not.toBeVisible()
expect(document.querySelector('[data-testid="visible"]')).toBeVisible()
expect(document.querySelector('[data-testid="hidden-attribute"]')).not.toBeVisible()
```

The complete descriptions of all utilities is available at [`jest-dom` github page](https://github.com/testing-library/jest-dom).

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
