# Monitoring tests

There is some kind of checks that we'd like to perform constantly that are not related to user flows. I'm speaking about back-end cache management, robots.txt, and sitemap.xml checks, assets compression, etc. Tests that check these features could be called "Monitoring Tests" because are **little and fast tests** that could be launched even once a minute. These kind of tests are usually generic or related to something that broke in the past.

For example, the next test checks that the `main.js` file of the `https://react-redux.realworld.io` website is served with the correct `content-encoding` header

<i>File: cypress/integration/examplesmonitoring-tests/brotli.monitoring.spec.js</i>
[include](../cypress/integration/examples/monitoring-tests/brotli.monitoring.spec.js)

Read more about the Monitoring tests into the [The concept of "Monitoring Tests"](https://dev.to/noriste/the-concept-of-monitoring-tests-4l5j) article.

Again: following a [naming convention](dedicated-scripts.md) allows you to launch only the monitoring tests.

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
