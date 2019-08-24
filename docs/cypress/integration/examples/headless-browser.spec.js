/// <reference types="Cypress" />

context("Headless browser", () => {
  it("Must visit the site and take a screenshot", () => {
    cy.visit("http://localhost:4100/");
    cy.screenshot();
  });
});
