# Why Testing?

- to control that the code does what we expect, now and when we refactor/modify it. Testing protects us from direct regressions when we break the existing code, and from indirect regressions, when something external from our code breaks it

- to reproduce some edge cases the easiest possible way

- to leverage the speed of an automated tool that could do the same checks that you would do manually... but at a blazing speed

- to leverage forever the checks, even when it becomes impossible to test everything manually

- to tell a story about the code, it's easier to maintain test descriptions compared to documentation. A good storytelling test suite could allow everyone to jump into the codebase easily

- to avoid adding temporary (and risky) code, conditions, default state, etc. that allows you to test something

- to prevent problems instead of facing them

- to allow ourselves to refactor the code without fear, A good-tested codebase could be refactored safely

- to improve the quality of the code: a hard-to-test code is a code smell of poor design

- to get us working with a lower cognitive load, you can concentrate on what you are working on without thinking too much about everything surrounding it

- to have an objective metric about the correctness of the behaviour of our software

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
