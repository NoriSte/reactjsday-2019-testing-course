# Running Jest

run `npm test` (alias for `npm run test`, also `npm t` works)
this will start Jest, which will scan the project directories to find test files

in our case it will find no files (there are none)

```yaml
➜  jest-101 npm test
No tests found, exiting with code 1
```

> note: files are searched by specific regexes
> note: _node_modules_ is skipped by default

---

create an empty file named _test.js_ in the project root

run again `npm test`

```yaml
> jest-101@0.0.1 test /Users/jaga/coding/jest-101
> jest

 FAIL  ./test.js
  ● Test suite failed to run

    Your test suite must contain at least one test.

      at node_modules/@jest/core/build/TestScheduler.js:242:24

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        1.354s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```

this time Jest finds the file _test.js_ but the command fails with the error `Your test suite must contain at least one test.`

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
