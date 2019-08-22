# About this book

We built this book with [GitBook](https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md) and some plugins:

- `-sharing`: allows to manage (ore remove at all) the sharing buttons
- `include-codeblock`: allows to import a block of code directly from a file
- `include`: allows to import and reuse a MD file

The book can be configured with the `book.json` file, some of the options can be found [here](https://janicezhw.github.io/gitbook/startusegitbook/configInfo/bookjson.html).

### How to use it

- `npx gitbook install`: automatically managed with the `postintall` script
- `npm run book:serve`: alias for `npx storybook serve`
- `npm run book:build`: alias for `npx storybook build`, the artifact is placed into the `docs` directory to be used with [GitHub pages](https://pages.github.com)
- `npm run book:publish`: pushes the latest changes to the [GitHub page](https://noriste.github.io/reactjsday-2019-testing-course/)

### Slides

We managed the slides through [GitPitch](https://gitpitch.com) and are in the `slides/` directory.

### Code

We leveraged both the React frontend and the Node.js backend of the [RealWorld](http://realworld.io) project. We cloned both the repositories and adapted them for the purpose of this course:

- we shared some constants between the source code and the tests code
- we delayed every backend operation to simulate E2E testing bottlenecks

The RealWorld projects are stored into the `realworld` directory. To run them you need to have installed

Some notes:

- you need to have [Docker](https://docs.docker.com/install/) and [MongoDB](https://docs.mongodb.com/manual/installation/#tutorials) to run the projects and the tests locally (not for the book itself)
- if you stop the RealWorld backend while the frontend was logged in, you need to [manually delete](https://developers.google.com/web/tools/chrome-devtools/storage/localstorage) the stored JWT. Otherwise, the frontend will not work anymore. The Cypress tests already managed it by clearing every local state before every test
