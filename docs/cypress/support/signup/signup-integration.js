/// <reference types="Cypress" />

import { newPost } from "../../../realworld/frontend/src/components/Header";

Cypress.Commands.add("signupIntegration", () => {
  cy.fixture("users/signup.json")
    .its("user")
    .should(
      user =>
        expect(user)
          .to.have.property("token")
          .and.to.be.a("string").and.not.to.be.empty
    )
    .then(user => localStorage.setItem("jwt", user.token));
});

Cypress.Commands.add("signupAndVisitIntegration", path => {
  cy.server();
  cy.route("GET", "**/api/user", "fixture:users/signup").as("get-user");
  cy.fixture("users/signup.json")
    .its("user")
    .should(
      user =>
        expect(user)
          .to.have.property("token")
          .and.to.be.a("string").and.not.to.be.empty
    )
    .then(user => localStorage.setItem("jwt", user.token));
  cy.visit(path);
  cy.wait("@get-user");
  cy.findByText(newPost).should("be.visible");
});
