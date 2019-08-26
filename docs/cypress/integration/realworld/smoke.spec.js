/// <reference types="Cypress" />

context("Smoke test", () => {
  it("The frontend should work", () => {
    cy.visit("/").contains("conduit");
  });
  it("The backend should work", () => {
    cy.request("http://localhost:3100/api/tags")
      .its("status")
      .should("be", 200);
  });
});
