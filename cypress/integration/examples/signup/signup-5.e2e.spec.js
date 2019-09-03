/// <reference types="Cypress" />

import { paths } from "../../../../realworld/frontend/src/components/App";
import { noArticles } from "../../../../realworld/frontend/src/components/ArticleList";
import { strings } from "../../../../realworld/frontend/src/components/Register";

context("Signup flow", () => {
  it("The happy path should work", () => {
    cy.visit(paths.register);
    const random = Math.floor(Math.random() * 100000);
    cy.getByPlaceholderText(strings.username).type(`Tester${random}`);
    cy.getByPlaceholderText(strings.email).type(`user+${random}@realworld.io`);
    cy.getByPlaceholderText(strings.password).type("mysupersecretpassword");
    cy.get("form")
      .within(() => cy.getByText(strings.signUp))
      .click();
    cy.getByText(noArticles, { timeout: 10000 }).should("be.visible");
  });
});
