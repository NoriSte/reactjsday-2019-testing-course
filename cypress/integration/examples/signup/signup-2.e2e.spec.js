/// <reference types="Cypress" />

context("Signup flow", () => {
  it("The happy path should work", () => {
    cy.visit("/register");
    cy.get(".form-control").then($els => {
      const random = Math.floor(Math.random() * 100000);
      cy.get($els[0]).type(`Tester${random}`);
      cy.get($els[1]).type(`user+${random}@realworld.io`);
      cy.get($els[2]).type("mysupersecretpassword");
    });
    cy.get("button").click();
    cy.contains("No articles are here", { timeout: 10000 }).should("be.visible");
  });
});
