/// <reference types="Cypress" />

import { paths } from "../../../../realworld/frontend/src/components/App";
import { noArticles } from "../../../../realworld/frontend/src/components/ArticleList";
import { strings } from "../../../../realworld/frontend/src/components/Register";

context("Signup flow", () => {
  it("The happy path should work", () => {
    cy.visit(paths.register);
    const random = Math.floor(Math.random() * 100000);
    cy.findByPlaceholderText(strings.username).type(`Tester${random}`);
    cy.findByPlaceholderText(strings.email).type(`user+${random}@realworld.io`);
    cy.findByPlaceholderText(strings.password).type("mysupersecretpassword");
    cy.get("form")
      .within(() => cy.findByText(strings.signUp))
      .click();
    cy.findByText(noArticles, { timeout: 10000 }).should("be.visible");
  });
});
