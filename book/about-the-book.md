# About this book

This book has been built with [GitBook](https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md) and some plugins:

- `-sharing`: allows to manage (ore remove at all) the sharing buttons
- `include-codeblock`: allows to import a block of code directly from a file

The book can be configured with the `book.json` file, some of the options can be found [here](https://janicezhw.github.io/gitbook/startusegitbook/configInfo/bookjson.html).

### How to use it

- `npx gitbook install`: automatically managed with the `postintall` script
- `npm run book:serve`: alias for `npx storybook serve`
- `npm run book:build`: alias for `npx storybook build`, the artifact is placed into the `docs` directory to be used with [GitHub pages](https://pages.github.com)
