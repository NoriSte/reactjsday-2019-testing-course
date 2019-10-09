# Custom Input component

In this examples we will incrementally add features to a custom `Input` component and see how [`react-testing-library`](https://testing-library.com/docs/react-testing-library) is similar to using [`ReactDOM`](https://reactjs.org/docs/react-dom.html#overview) but with new utilities at our disposal that makes the process a lot cleaner.

### Empty Start

```jsx
import React from "react";
import { render } from "@testing-library/react";

function Input() {
  return <input />;
}

test("testing input", async () => {
  render(<Input />);
});
```

### Assert about the input value

```diff
  import React from 'react'
  import { render } from '@testing-library/react'

  function Input() {
    return <input />
  }

  test('testing input', async () => {
-   render(<Input />)
+   const { getByDisplayValue } = render(<Input />)
+   getByDisplayValue('')
  })
```

### Make it controlled by React

```diff
  import React from 'react'
  import { render } from '@testing-library/react'

  function Input() {
-   return <input />
+   const [value, setValue] = React.useState('')
+   return <input value={value} onChange={e => setValue(e.target.value)} />
  }

  test('testing input', async () => {
-   render(<Input />)
+   const { getByDisplayValue } = render(<Input />)
+   getByDisplayValue('')
  })
```

### Test value change

```diff
  import React from 'react'
- import { render } from '@testing-library/react'
+ import { render, fireEvent } from '@testing-library/react'

  function Input() {
    const [value, setValue] = React.useState('')
    return <input value={value} onChange={e => setValue(e.target.value)} />
  }

  test('testing input', async () => {
    const { getByDisplayValue } = render(<Input />)
    getByDisplayValue('')
+ })
+
+ test('value change', () => {
   const { getByDisplayValue } = render(<Input />)

-   getByDisplayValue('')
+   const input = getByDisplayValue('')
+
+   fireEvent.change(input, { target: { value: 'gino' } })
+
+   getByDisplayValue('gino')
  })
```

### Default value from props

```diff
  import React from 'react'
  import { render, fireEvent } from '@testing-library/react'

- function Input() {
+ function Input({ defaultValue = '' }) {
-   const [value, setValue] = React.useState('')
+   const [value, setValue] = React.useState(defaultValue)
    return <input value={value} onChange={e => setValue(e.target.value)} />
  }

  test('testing input', async () => {
    const { getByDisplayValue } = render(<Input />)
    getByDisplayValue('')
  })

  test('value change', () => {
    const { getByDisplayValue } = render(<Input />)

    const input = getByDisplayValue('')

    fireEvent.change(input, { target: { value: 'gino' } })

    getByDisplayValue('gino')
  })

+ test('default value', async () => {
+   const { getByDisplayValue } = render(<Input defaultValue="pippo" />)
+   getByDisplayValue('pippo')
+ })
```

### Add label with default value to text

```diff
  import React from 'react'
  import { render, fireEvent } from '@testing-library/react'

- function Input({ defaultValue = '' }) {
+ function Input({ defaultValue = '', label = 'text' }) {
    const [value, setValue] = React.useState(defaultValue)
-   return <input value={value} onChange={e => setValue(e.target.value)} />
+   return (
+     <label>
+       {label}
+       <input value={value} onChange={e => setValue(e.target.value)} />
+     </label>
+   )
  }

  test('testing input', async () => {
    const { getByDisplayValue } = render(<Input />)
    getByDisplayValue('')
  })

  test('value change', () => {
    const { getByDisplayValue } = render(<Input />)

    const input = getByDisplayValue('')

    fireEvent.change(input, { target: { value: 'gino' } })

    getByDisplayValue('gino')
  })

  test('default value', async () => {
    const { getByDisplayValue } = render(<Input defaultValue="pippo" />)
    getByDisplayValue('pippo')
  })
+
+ describe('label pros', () => {
+   test('defaults to "text" if not provided', () => {
+     const { getByText } = render(<Input />)
+     getByText('text')
+   })
+   test('defaults to "text" if not provided', () => {
+     const { getByText, queryByText } = render(<Input label="username" />)
+     expect(queryByText('text')).not.toBeInTheDocument()
+     getByText('username')
+   })
+ })
```

### Test accessibility via label

```diff
 import React from 'react'
  import { render, fireEvent } from '@testing-library/react'

  function Input({ defaultValue = '', label = 'text' }) {
    const [value, setValue] = React.useState(defaultValue)
    return (
      <label>
        {label}
        <input value={value} onChange={e => setValue(e.target.value)} />
      </label>
    )
  }

  test('testing input', async () => {
    const { getByDisplayValue } = render(<Input />)
    getByDisplayValue('')
  })

  test('value change', () => {
    const { getByDisplayValue } = render(<Input />)

    const input = getByDisplayValue('')

    fireEvent.change(input, { target: { value: 'gino' } })

    getByDisplayValue('gino')
  })

  test('default value', async () => {
    const { getByDisplayValue } = render(<Input defaultValue="pippo" />)
    getByDisplayValue('pippo')
  })

  describe('label pros', () => {
    test('defaults to "text" if not provided', () => {
      const { getByText } = render(<Input />)
      getByText('text')
    })
    test('defaults to "text" if not provided', () => {
      const { getByText, queryByText } = render(<Input label="username" />)
      expect(queryByText('text')).not.toBeInTheDocument()
      getByText('username')
    })

+   test('input is accessible by label', () => {
+     const { getByLabelText } = render(<Input label="username" defaultValue="bob" />)
+     const input = getByLabelText('username')
+     expect(input).toHaveValue('bob')
+   })
  })
```

### Add Validation

#### No error on render

```diff
import React from 'react'
  import { render, fireEvent } from '@testing-library/react'

  function Input({ defaultValue = '', label = 'text' }) {
    const [value, setValue] = React.useState(defaultValue)
    return (
      <label>
        {label}
        <input value={value} onChange={e => setValue(e.target.value)} />
      </label>
    )
  }

  test('testing input', async () => {
    const { getByDisplayValue } = render(<Input />)
    getByDisplayValue('')
  })

  test('value change', () => {
    const { getByDisplayValue } = render(<Input />)

    const input = getByDisplayValue('')

    fireEvent.change(input, { target: { value: 'gino' } })

    getByDisplayValue('gino')
  })

  test('default value', async () => {
    const { getByDisplayValue } = render(<Input defaultValue="pippo" />)
    getByDisplayValue('pippo')
  })

  describe('label pros', () => {
    test('defaults to "text" if not provided', () => {
      const { getByText } = render(<Input />)
      getByText('text')
    })
    test('defaults to "text" if not provided', () => {
      const { getByText, queryByText } = render(<Input label="username" />)
      expect(queryByText('text')).not.toBeInTheDocument()
      getByText('username')
    })

    test('input is accessible by label', () => {
      const { getByLabelText } = render(<Input label="username" defaultValue="bob" />)
      const input = getByLabelText('username')
      expect(input).toHaveValue('bob')
   })
+
+   describe('validation', () => {
+     test('no error shown by default', () => {
+       const { queryByTestId } = render(<Input />)
+       expect(queryByTestId('error-message')).not.toBeInTheDocument()
+     })
+   })
  })
```

#### Min length validation

```diff
 import React from 'react'
  import { render, fireEvent } from '@testing-library/react'

- function Input({ defaultValue = '', label = 'text' }) {
+ function Input({ defaultValue = '', label = 'text', min }) {
    const [value, setValue] = React.useState(defaultValue)
+   const [error, setError] = React.useState(null)
+
+   React.useEffect(() => {
+     if (min && value.length < min) {
+       setError(`must be at least ${min} characters long`)
+     } else {
+       setError(null)
+     }
+   }, [min, value])
+
    return (
-     <label>
-       {label}
-       <input value={value} onChange={e => setValue(e.target.value)} />
-     </label>
+     <span>
+       <label>
+         {label}
+         <input value={value} onChange={e => setValue(e.target.value)} />
+       </label>
+       {error ? <span data-testid="error-message">{error}</span> : null}
+     </span>
    )
  }

  test('testing input', async () => {
    const { getByDisplayValue } = render(<Input />)
    getByDisplayValue('')
  })

  test('value change', () => {
    const { getByDisplayValue } = render(<Input />)

    const input = getByDisplayValue('')

    fireEvent.change(input, { target: { value: 'gino' } })

    getByDisplayValue('gino')
  })

  test('default value', async () => {
    const { getByDisplayValue } = render(<Input defaultValue="pippo" />)
    getByDisplayValue('pippo')
  })

  describe('label pros', () => {
    test('defaults to "text" if not provided', () => {
      const { getByText } = render(<Input />)
      getByText('text')
    })
    test('defaults to "text" if not provided', () => {
      const { getByText, queryByText } = render(<Input label="username" />)
      expect(queryByText('text')).not.toBeInTheDocument()
      getByText('username')
    })

    test('input is accessible by label', () => {
      const { getByLabelText } = render(<Input label="username" defaultValue="bob" />)
      const input = getByLabelText('username')
      expect(input).toHaveValue('bob')
    })

    describe('validation', () => {
      test('no error shown by default', () => {
        const { queryByTestId } = render(<Input />)
        expect(queryByTestId('error-message')).not.toBeInTheDocument()
     })

+     test('min char', () => {
+       const { container, queryByTestId, getByTestId } = render(<Input min={3} />)
+
+       const input = container.querySelector('input')
+       fireEvent.change(input, { target: { value: 'ci' } })
+
+       expect(getByTestId('error-message')).toHaveTextContent('must be at least 3 characters long')
+
+       fireEvent.change(input, { target: { value: 'aone' } })
+       expect(queryByTestId('error-message')).not.toBeInTheDocument()
+     })
    })
  })
```

#### Custom validation

```diff
  import React from 'react'
  import { render, fireEvent } from '@testing-library/react'

- function Input({ defaultValue = '', label = 'text', min }) {
+ function Input({ defaultValue = '', label = 'text', min, validate }) {
    const [value, setValue] = React.useState(defaultValue)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
      if (min && value.length < min) {
        setError(`must be at least ${min} characters long`)
      } else {
-       setError(null)
+       if (validate) {
+         const { valid, message } = validate(value)
+         if (!valid) {
+           setError(message)
+         } else {
+           setError(null)
+         }
+       } else {
+         setError(null)
+       }
      }
-   }, [min, value])
+   }, [min, validate, value])

    return (
      <span>
        <label>
          {label}
          <input value={value} onChange={e => setValue(e.target.value)} />
        </label>
        {error ? <span data-testid="error-message">{error}</span> : null}
      </span>
    )
  }

  test('testing input', async () => {
    const { getByDisplayValue } = render(<Input />)
    getByDisplayValue('')
  })

  test('value change', () => {
    const { getByDisplayValue } = render(<Input />)

    const input = getByDisplayValue('')

    fireEvent.change(input, { target: { value: 'gino' } })

    getByDisplayValue('gino')
  })

  test('default value', async () => {
    const { getByDisplayValue } = render(<Input defaultValue="pippo" />)
    getByDisplayValue('pippo')
  })

  describe('label pros', () => {
    test('defaults to "text" if not provided', () => {
      const { getByText } = render(<Input />)
      getByText('text')
    })
    test('defaults to "text" if not provided', () => {
      const { getByText, queryByText } = render(<Input label="username" />)
      expect(queryByText('text')).not.toBeInTheDocument()
      getByText('username')
    })

    test('input is accessible by label', () => {
      const { getByLabelText } = render(<Input label="username" defaultValue="bob" />)
      const input = getByLabelText('username')
      expect(input).toHaveValue('bob')
    })

    describe('validation', () => {
      test('no errors by default', () => {
        const { queryByTestId } = render(<Input />)
        expect(queryByTestId('error-message')).not.toBeInTheDocument()
      })

      test('min char', () => {
        const { container, queryByTestId, getByTestId } = render(<Input min={3} />)

        const input = container.querySelector('input')
        fireEvent.change(input, { target: { value: 'ci' } })

        expect(getByTestId('error-message')).toHaveTextContent('must be at least 3 characters long')

        fireEvent.change(input, { target: { value: 'aone' } })
        expect(queryByTestId('error-message')).not.toBeInTheDocument()
      })

+     test('custom validation', async () => {
+       const validate = jest.fn(text => {
+         return {
+           valid: text.includes('vino'),
+           message: 'text must include the word "vino"',
+         }
+       })
+       const { container, queryByTestId, getByTestId } = render(<Input validate={validate} />)
+
+       const input = container.querySelector('input')
+       fireEvent.change(input, { target: { value: 'ciaone' } })
+
+       expect(getByTestId('error-message')).toHaveTextContent('text must include the word "vino"')
+
+       fireEvent.change(input, { target: { value: 'buono il vino' } })
+       expect(queryByTestId('error-message')).not.toBeInTheDocument()
+    })
    })
  })
```

#### Focus on mount

```diff
  import React from 'react'
  import { render, fireEvent } from '@testing-library/react'

  function Input({ defaultValue = '', label = 'text', min, validate }) {
    const [value, setValue] = React.useState(defaultValue)
    const [error, setError] = React.useState(null)
+   const inputRef = React.useRef()

    React.useEffect(() => {
      if (min && value.length < min) {
        setError(`must be at least ${min} characters long`)
      } else {
        if (validate) {
          const { valid, message } = validate(value)
          if (!valid) {
            setError(message)
          } else {
            setError(null)
          }
        } else {
          setError(null)
        }
      }
    }, [min, validate, value])
+
+   React.useEffect(() => {
+     inputRef.current.focus()
+   }, [])

    return (
      <span>
        <label>
          {label}
-         <input value={value} onChange={e => setValue(e.target.value)} />
+         <input ref={inputRef} value={value} onChange={e => setValue(e.target.value)} />
        </label>
        {error ? <span data-testid="error-message">{error}</span> : null}
      </span>
    )
  }

  test('testing input', async () => {
    const { getByDisplayValue } = render(<Input />)
    getByDisplayValue('')
  })

  test('value change', () => {
    const { getByDisplayValue } = render(<Input />)

    const input = getByDisplayValue('')

    fireEvent.change(input, { target: { value: 'gino' } })

    getByDisplayValue('gino')
  })

  test('default value', async () => {
    const { getByDisplayValue } = render(<Input defaultValue="pippo" />)
    getByDisplayValue('pippo')
  })

  describe('label pros', () => {
    test('defaults to "text" if not provided', () => {
      const { getByText } = render(<Input />)
      getByText('text')
    })
    test('defaults to "text" if not provided', () => {
      const { getByText, queryByText } = render(<Input label="username" />)
      expect(queryByText('text')).not.toBeInTheDocument()
      getByText('username')
    })

    test('input is accessible by label', () => {
      const { getByLabelText } = render(<Input label="username" defaultValue="bob" />)
      const input = getByLabelText('username')
      expect(input).toHaveValue('bob')
    })

    describe('validation', () => {
      test('no errors by default', () => {
        const { queryByTestId } = render(<Input />)
        expect(queryByTestId('error-message')).not.toBeInTheDocument()
      })

      test('min char', () => {
        const { container, queryByTestId, getByTestId } = render(<Input min={3} />)

        const input = container.querySelector('input')
        fireEvent.change(input, { target: { value: 'ci' } })

        expect(getByTestId('error-message')).toHaveTextContent('must be at least 3 characters long')

        fireEvent.change(input, { target: { value: 'aone' } })
        expect(queryByTestId('error-message')).not.toBeInTheDocument()
      })

      test('custom validation', async () => {
        const validate = jest.fn(text => {
          return {
            valid: text.includes('vino'),
            message: 'text must include the word "vino"',
          }
        })
        const { container, queryByTestId, getByTestId } = render(<Input validate={validate} />)

        const input = container.querySelector('input')
        fireEvent.change(input, { target: { value: 'ciaone' } })

        expect(getByTestId('error-message')).toHaveTextContent('text must include the word "vino"')

        fireEvent.change(input, { target: { value: 'buono il vino' } })
        expect(queryByTestId('error-message')).not.toBeInTheDocument()
      })
+   })
+
+   test('focus on mount', () => {
+     const { container } = render(<Input />)
+     const input = container.querySelector('input')
+
+     expect(input).toHaveFocus()
    })
  })

```

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
