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
- `npm run book:publish`: pushes the latest changes to the [GitHub page](https://noriste.github.io/educative-cypress-course/)

### Slides

We managed the slides through [slides.com](https://slides.com) and [are publicly available](https://slides.com/noriste/educative-cypress-course#/).

### Code

We leveraged both the React frontend and the Node.js backend of the [RealWorld](http://realworld.io) project. Read more about it in the [dedicated chapter](the-realworld-project.md).

### Cypress tests

To watch them running on your local machine:

- you should have the [RealWorld](the-realworld-project.md#some-notes) project dependencies installed
- you must launch the RealWorld project with `npm run realworld:start`
- run `npm run cy:open` and launch your tests of choice

### Jest example tests

To watch them running on your local machine:

- install the project dependencies with `npm install`
- launch `npm run test:unit`
- if you want to keep Jest opened you can launch `npm run test:unit:watch` and navigate the various tests leveraging the [jest-watch-typeahead](https://github.com/jest-community/jest-watch-typeahead) plugin

<!-- TODO: add the part of the demo-app -->

### File system

```
|-- __tests__ # example tests
|-- book # all the chapters of the  book
|-- cypress/integration # all the Cypress tests
|-- demo-app # the React application used for the integration/unit tests part
|-- docs # auto-generated directory, GitHub pages points here
|-- realworld # both the frontend/backend RealWorld apps
|-- slides # the GitPitch files (if used)
|-- utils # little repository utilities
```

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
