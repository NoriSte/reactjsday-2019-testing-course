/// <reference types="Cypress" />

context("Signup flow", () => {
  it("The happy path should work", () => {
    cy.visit("/register");
    const random = Math.floor(Math.random() * 100000);
    cy.findByPlaceholderText("Username").type(`Tester${random}`);
    cy.findByPlaceholderText("Email").type(`user+${random}@realworld.io`);
    cy.findByPlaceholderText("Password").type("mysupersecretpassword");
    cy.get("form")
      .within(() => cy.findByText("Sign up").click())
    cy.findByText("No articles are here... yet.", { timeout: 10000 }).should("be.visible");
  });
});
