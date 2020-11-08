/// <reference types="Cypress" />

import { paths } from "../../../realworld/frontend/src/components/App";
import { noArticles } from "../../../realworld/frontend/src/components/ArticleList";
import { strings } from "../../../realworld/frontend/src/components/Register";

Cypress.Commands.add("signupV1", ({ email, username, password } = {}) => {
  const random = Math.floor(Math.random() * 100000);
  const user = {
    username: username || `Tester${random}`,
    email: email || `user+${random}@realworld.io`,
    password: password || "mysupersecretpassword"
  };

  // set up AJAX call interception
  cy.server();
  cy.route("POST", "**/api/users").as("signup-request");

  cy.visit(paths.register);

  // form filling
  cy.findByPlaceholderText(strings.username).type(user.username);
  cy.findByPlaceholderText(strings.email).type(user.email);
  cy.findByPlaceholderText(strings.password).type(user.password);

  // form submit...
  cy.get("form")
    .within(() => cy.findByText(strings.signUp).click())

  // ... and AJAX call waiting
  cy.wait("@signup-request").should(xhr => {
    expect(xhr.request.body).deep.equal({
      user: {
        username: user.username,
        email: user.email,
        password: user.password
      }
    });

    expect(xhr.status).to.equal(200);

    cy.wrap(xhr.response.body)
      .should("have.property", "user")
      .and(
        user =>
          expect(user)
            .to.have.property("token")
            .and.to.be.a("string").and.not.to.be.empty
      )
      .and("deep.include", {
        username: user.username.toLowerCase(),
        email: user.email
      });
  });

  // end of the flow
  cy.findByText(noArticles).should("be.visible");

  // restore the original cy.server behavior
  cy.server({ enable: false });

  cy.then(() => user);
});
