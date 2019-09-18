/// <reference types="Cypress" />

import { newPost } from "../../../../realworld/frontend/src/components/Header";

context("The custom command could be run before the test code", () => {
  it("Should leverage the custom authentication command", () => {
    cy.authenticateIntegration().should(user => {
      expect(user).to.have.property("username").and.not.to.be.empty;
      expect(user).to.have.property("email").and.not.to.be.empty;
    });

    cy.server();
    cy.route("GET", "**/api/user", "fixture:users/signup").as("get-user");
    cy.route("GET", "**/api/tags", "fixture:tags/empty-tags").as("get-tags");
    cy.route("GET", "**/api/articles/feed**", "fixture:articles/empty-articles").as("get-feed");

    cy.visit("/");

    cy.wait(["@get-user", "@get-tags", "@get-feed"]);

    cy.findByText(newPost).should("be.visible");
  });
});
