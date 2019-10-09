|                                                              | E2E                                           | UI Integration                                | Visual | Integration | Component/Unit |
| ------------------------------------------------------------ | --------------------------------------------- | --------------------------------------------- | ------ | ----------- | -------------- |
| check the entire app                                         | ✅                                            | ❌                                            | ❌     | ❌          | ❌             |
| give a good confidence <sup><a href="#footnote1">1</a></sup> | ✅                                            | ✅                                            | ✅     | ⚠️          | ❌             |
| have code coverage                                           | ✅&nbsp;<sup><a href="#footnote2">2</a></sup> | ✅&nbsp;<sup><a href="#footnote2">2</a></sup> | ❌     | ✅          | ✅             |
| have a good cost/speed ratio                                 | ❌                                            | ✅                                            | ❌     | ✅          | ✅             |
| are deterministic                                            | ❌                                            | ✅                                            | ❌     | ✅          | ✅             |
| are simple                                                   | ❌                                            | ⚠️                                            | ✅     | ⚠️          | ✅             |
| are short                                                    | ❌                                            | ❌                                            | ✅     | ✅          | ✅             |

<a id="footnote1">1</a>: confidence that your application works because the tests pass. It's limited for unit tests and high for E2E tests.
<br />
<a id="footnote2">2</a>: read the [Code Coverage guide](https://docs.cypress.io/guides/tooling/code-coverage.html) of Cypress.
