# Watch mode

instead of manually running `npm test` all the time we can pass the `--watchAll` flag to jest so that it can run on file changes

run `npm run test -- --watchAll`

> note: to pass flags need to use -- two times the first is consumed by npm

From now on Jest will run test cases again on file changes

Jest is smart enough to only re-run test cases that could be affected by the changes to the files (the changed files, all the files that import a changed files ecc)

> note `--watch` is also available, controls changed files from latest git commit and have a broader list of features, `--watch` only works insite a git repository

## Watch mode menu

By pressing `w` in the terminal running Jest's in Watch mode we can access a set of new features

```
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

## Using Watch by default

Is common practive to set `npm test` script to run Jest in watch mode

```
{
...
"scripts": {
    "test": "jest --watch"
  },
...
}
```
