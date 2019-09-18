/// <reference types="Cypress" />

Cypress.Commands.add("authenticateIntegration", () => {
  cy.fixture("users/signup")
    .its("user")
    .should(
      user =>
        expect(user)
          .to.have.property("token")
          .and.to.be.a("string").and.not.to.be.empty
    )
    .then(user => localStorage.setItem("jwt", user.token));
});
