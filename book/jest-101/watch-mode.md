# Watch mode

instead of manually running `npm test` all the time we can pass the `--watchAll` flag to jest so that it can run on file changes

run `npm run test -- --watchAll`

this will run test cases again on file changes

jest is smart enough to only re-run test cases that could be affected by the changes to the files (the changed files, all the files that import a changed files ecc)

> note: to pass flags need to use -- two times the first is consumed by npm
> note `--watch` is also available and controls changed files from latest git commit
