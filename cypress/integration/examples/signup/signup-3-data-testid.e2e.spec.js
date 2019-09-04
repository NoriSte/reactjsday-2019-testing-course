/// <reference types="Cypress" />

context("Signup flow", () => {
  it("The happy path should work", () => {
    cy.visit("/register");
    const random = Math.floor(Math.random() * 100000);
    cy.get("[data-testid=username]").type(`Tester${random}`);
    cy.get("[data-testid=email]").type(`user+${random}@realworld.io`);
    cy.get("[data-testid=password]").type("mysupersecretpassword");
    cy.get("[data-testid=signup-button]").click();
    cy.get("[data-testid=no-articles-here]", { timeout: 10000 }).should("be.visible");
  });
});
