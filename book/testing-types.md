# Testing types

- Unit tests: check single units, whatever you mean by "unit"

- Component tests: the unit tests of modern JavaScript frameworks

- Integration tests: check the more units work well while integrated together

- UI Integration tests: check the whole application works without a real back-end

- E2E tests: check the the whole app, back-end and database included, works as expected

- Visual Regression tests: check that the app looks always the same

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
