/// <reference types="Cypress" />

import { paths } from "../../../../realworld/frontend/src/components/App";

context("Signup flow", () => {
  const testBody = response => {
    const user = {
      username: "Tester",
      email: "user@realworld.io",
      password: "mysupersecretpassword"
    };

    cy.server();
    cy.route({
      url: "**/api/users",
      method: "POST",
      status: 422,
      response
    }).as("signup-request");

    cy.visit(paths.register);

    cy.window()
      .its("appActions")
      .invoke("signup", user);

    cy.wait("@signup-request");

    Object.entries(response.errors).map(([subject, error]) => {
      cy.findByText(`${subject} ${error}`).should("be.visible");
    });
  };

  it("Should show an error if the back-end report that the email has already been used", () => {
    testBody({ errors: { email: "is already taken." } });
  });

  it("Should show some errors if the back-end reports that some data has already been used", () => {
    testBody({ errors: { email: "is already taken." } });
  });

  it("Should show all the errors reported by the back-end as they are", () => {
    testBody({ errors: { foo: "bar", other: "problems" } });
  });
});
