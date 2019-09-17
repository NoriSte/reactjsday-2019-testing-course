/// <reference types="Cypress" />

context("The custom command could be run before the test code", () => {
  it("Should leverage the all-in-one signupAndVisitIntegration command", () => {
    cy.server();
    cy.route("GET", "**/api/tags", "fixture:tags/empty-tags").as("get-tags");
    cy.route("GET", "**/api/articles/feed**", "fixture:articles/empty-articles").as("get-feed");

    cy.signupAndVisitIntegration("/");

    cy.wait(["@get-tags", "@get-feed"]);
  });

  it("Should leverage the all-in-one signupAndVisitIntegration command 2", () => {
    cy.signupAndVisitIntegration("/editor");
    // the rest of the code
  });
});
