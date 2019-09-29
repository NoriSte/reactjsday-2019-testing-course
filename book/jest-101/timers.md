# timers

Jest offers some utilities for the manipulation of time

<iframe src='https://gfycat.com/ifr/AlertCalmHerring' frameborder='0' scrolling='no' allowfullscreen width='640' height='412'></iframe><p> <a href="https://gfycat.com/alertcalmherring">via Gfycat</a></p>

usefull to test `setTimeout` and `setInterval` without having to actually wait

```
const TIMEOUT = 1000000
function runAfterOneSec(cb) {
  setTimeout(() => {
    cb()
  }, TIMEOUT)
}

test('test timeout', () => {
  jest.useFakeTimers()

  const callback = jest.fn()
  const spy = jest.spyOn(window, 'setTimeout')

  runAfterOneSec(callback)
  expect(setTimeout).toBeCalled() // true
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), TIMEOUT) // true

  expect(callback).not.toBeCalled() // true
  jest.runOnlyPendingTimers()

  expect(callback).toBeCalled() // true
})
```

more advanced functions are avaiable to only run specific timers or advance time by a certain amount
