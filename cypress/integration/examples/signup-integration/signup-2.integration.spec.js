/// <reference types="Cypress" />

import { paths } from "../../../../realworld/frontend/src/components/App";
import { noArticles } from "../../../../realworld/frontend/src/components/ArticleList";
import { strings } from "../../../../realworld/frontend/src/components/Register";

context("Signup flow", () => {
  it("The happy path should work", () => {
    const user = {
      username: "Tester",
      email: "user@realworld.io",
      password: "mysupersecretpassword"
    };

    // set up AJAX call interception
    cy.server();
    cy.route("POST", "**/api/users", "fixture:users/signup").as("signup-request");
    cy.route("GET", "**/api/tags", "fixture:tags/empty-tags").as("tags");
    cy.route("GET", "**/api/articles/feed**", "fixture:articles/empty-articles").as("feed");

    cy.visit(paths.register);

    // form filling
    cy.findByPlaceholderText(strings.username)
      .type(user.username)
      .findByPlaceholderText(strings.email)
      .type(user.email)
      .findByPlaceholderText(strings.password)
      .type(user.password);

    // form submit...
    cy.get("form")
      .within(() => cy.findByText(strings.signUp))
      .click();

    // ... and AJAX call waiting
    cy.wait("@signup-request")
      .should(xhr =>
        expect(xhr.request.body).deep.equal({
          user: {
            username: user.username,
            email: user.email,
            password: user.password
          }
        })
      )
      .wait(["@tags", "@feed"]);

    // end of the flow
    cy.findByText(noArticles).should("be.visible");
  });
});
