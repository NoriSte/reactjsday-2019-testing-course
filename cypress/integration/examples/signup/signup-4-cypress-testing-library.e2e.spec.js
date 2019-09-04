/// <reference types="Cypress" />

context("Signup flow", () => {
  it("The happy path should work", () => {
    cy.visit("/register");
    const random = Math.floor(Math.random() * 100000);
    cy.getByPlaceholderText("Username").type(`Tester${random}`);
    cy.getByPlaceholderText("Email").type(`user+${random}@realworld.io`);
    cy.getByPlaceholderText("Password").type("mysupersecretpassword");
    cy.get("form")
      .within(() => cy.getByText("Sign up"))
      .click();
    cy.getByText("No articles are here... yet.", { timeout: 10000 }).should("be.visible");
  });
});
