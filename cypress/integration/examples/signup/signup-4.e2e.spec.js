/// <reference types="Cypress" />

context("Signup flow", () => {
  it("The happy path should work", () => {
    cy.visit("/register");
    const random = Math.floor(Math.random() * 100000);
    cy.getByPlaceholderText("Username").type(`Tester${random}`);
    cy.getByPlaceholderText("Email").type(`user+${random}@realworld.io`);
    cy.getByPlaceholderText("Password").type("mysupersecretpassword");
    cy.get("button").click();
    cy.contains("No articles are here", { timeout: 10000 }).should("be.visible");
  });
});
