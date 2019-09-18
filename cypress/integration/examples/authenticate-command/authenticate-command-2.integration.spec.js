/// <reference types="Cypress" />

context("The custom command could be run before the test code", () => {
  it("Should leverage the custom authentication command to navigate the home page", () => {
    cy.server();
    cy.route("GET", "**/api/tags", "fixture:tags/empty-tags").as("get-tags");
    cy.route("GET", "**/api/articles/feed**", "fixture:articles/empty-articles").as("get-feed");

    cy.authenticateAndVisitIntegration("/");

    cy.wait(["@get-tags", "@get-feed"]);
  });

  it("Should leverage the custom authentication command to navigate the editor page", () => {
    cy.authenticateAndVisitIntegration("/editor");
    // the rest of the code
  });
});
