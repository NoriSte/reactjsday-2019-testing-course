# Setup `create-react-app`

[create-react-app](https://create-react-app.dev/docs/getting-started) offers an out-of-the-box experience when using Jest and React, it's already configured to allow tests to be written in ES6 and use JSX.

## Create the application

```yaml
npx create-react-app react-testing
cd react-testing
```

## Run the tests

`npm test`

> note: projects created using `create-react-app` run Jest in watch mode by default when running `npm test`

when the Jest cli starts press `a` to run all tests

in this case, `create-react-app` provides a single smoke test that checks that the application renders into the DOM without crashing

> note: this is called a 'smoke test', a test where nothing, in particular, is being tested and we make sure that something is not noticeable broken (eg. if there are not smoke odds are it is not burning 🔥)

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
