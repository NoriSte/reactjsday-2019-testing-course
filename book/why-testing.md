# Why Testing?

- to control that the code does what we expect, now and when we refactor/modify it. (exmple: `string.replace` with single occurrence to replace) At the beginning it could sounds annoying but...

- but the code does not do what we expect all the times, the tests allow us to find bugs and unexpected corner cases (example: `string.replace` with multiple occurrencies but without the `g` flag)

- with the tests we fix some corner cases that, if underestimated, could lead to big headaches (example: `array.length && array[0]` in jsx that could print `0`)

- the tests do the same things you should do manully... but at a blazing speed!...

- ... And, once written, they will do that forever in your place

- it's impossible to test everything manually everytime, incrementally written tests do!

- the tests tell a story about our code, an easier to maintain story compared to documentation and comments. A good storytelling test suite could allow everyone to jump into a project easily (example: look for a good example)

- replicating some states is pretty impossible without a made on purpose environment runner. Without it you end up adding some strange conditions, returns, default states, etc. that are not reliable and that you must remember to remove (example: input field default states, simulating axios return data). With the tests, you act from the outside instead of from the inside

- with tests you prevent problems, you won't face it

- because you could have faced yourself what means to work with untested code... 😊
