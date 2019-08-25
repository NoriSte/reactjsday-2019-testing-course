# About this book

We built this book with [GitBook](https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md) and some plugins:

- `-sharing`: allows to manage (ore remove at all) the sharing buttons
- `include-codeblock`: allows to import a block of code directly from a file
- `include`: allows to import and reuse a MD file

The book can be configured with the `book.json` file, some of the options can be found [here](https://janicezhw.github.io/gitbook/startusegitbook/configInfo/bookjson.html).

### How to use it

- `npx gitbook install`: automatically managed with the `postintall` script
- `npm run book:serve`: alias for `npx storybook serve`
- `npm run book:build`: alias for `npx storybook build`, the artifact is placed into the `docs` directory to be used with [GitHub pages](https://pages.github.com). ATTENTION: you need to run `npm test` before it to create some assets for the book
- `npm run book:publish`: pushes the latest changes to the [GitHub page](https://noriste.github.io/reactjsday-2019-testing-course/)

### Slides

We managed the slides through [GitPitch](https://gitpitch.com) and are in the `slides/` directory.

### Code

We leveraged both the React frontend and the Node.js backend of the [RealWorld](http://realworld.io) project. Read more about it in the [dedicated chapter](the-realworld-project.md).
