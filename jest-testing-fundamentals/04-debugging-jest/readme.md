# Debugging jest

add script to _package.json_

```
"scripts": {
    "test": "jest",
    "debug": "node --inspect-brk node_modules/.bin/jest --runInBand"
  }
```

run `npm run debug`

this will stop on any `debugger` call
