# Types of Test

- Unit tests: check units in isolation, what is considered to be a _unit_ can change from the context

- Component tests: test of Components of modern JavaScript frameworks

- Integration tests: check that multiple units behave as expected when used together

- UI Integration tests: check the whole application works without a real back-end

- E2E tests: check the the whole app, back-end and database included, works as expected

- Visual Regression tests: check that the app look doesn't change when not intended

!INCLUDE "test-types-comparison.md"

### Testing Pyramid

The testing pyramid aims to resume the cost of every kind of test. The classic one is the following

<div>
    <img src="../assets/images/test-pyramid.png" alt="Testing pyramid" style="width: 100%; max-width: 400px; margin-left: auto; margin-right: auto;"/>
</div>
<br /><br />

while Kent C. Dodds created a new version of the pyramid, the "the Testing Trophy". Kent created the trophy based not only on the cost of the tests but on the **return of investment**. Then, he highlighted the "Integration test" area as the most important one

<div>
    <img src="../assets/images/test-trophy.jpg" alt="Testing trophy" style="width: 100%; max-width: 400px; margin-left: auto; margin-right: auto;"/>
</div>
<br /><br />
