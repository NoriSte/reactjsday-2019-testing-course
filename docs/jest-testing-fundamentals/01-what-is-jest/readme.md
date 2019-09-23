# What is Jest

Jest is a test runner with built-in assertion matchers, mocking and spying capabilities

## nice to know

- is possible to create custom assertion matchers eg: `expect("frodo").not.isHarryPOtterCharacter()`
- offer an interactive _watch mode_ that allow to filter files with name, changed or custom criterias
- when installed it offers an executable located at `node_modules/.bin/jest`
- offers scripts to migrate form other test frameworks that code files automatically
- uses jasmine under the hook
- will use custom engine in the future [circus](https://github.com/facebook/jest/tree/master/packages/jest-circus)
- works with babel
- works with TypeScript
- has built-in support for browser-like environment
