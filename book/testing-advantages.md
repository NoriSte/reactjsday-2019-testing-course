# Testing advantages

TODO: transform this file into some slides

- protects us by "direct" regressions: we change our code to add a new feature but you change the behaviour of the code. Breaking everything is way too much easy (example: adding a second parameter to a function, a destructured object without a default value, it will break if the second parameter is not passed)

- protects us by "indirect" regressions: JS versions, libraries versions, browser updates etc. (example: UNSAFE_componentWillMount or performance API time to interaction)

- allows refactoring! If a codebase is tested the right way, it's possible to rewrite the whole code if it doesn not break the external behaviour. A well-tested and bad codebase could be refctored, a bad-tested (or not tested at all) and good codebase is untouchable

- allows to improve the code quality: if it's hard to be tested, it could be a code smell (example: ???)

- gives precise feedback when a test fails: a "speaking" test tells clearly what does not work and where you need to fix the code

- get us working with a lower cognitive load (three ninepins example), we do not need to remember/know everything about the codebase, the tests tell how a module must behave