/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Signup a user
     * @example
     * cy.signupv1()
     * cy.signupv1({email: "foo@bar.io", username: "Foo", password: "ar"})
     */
    signupv1(user: { email?: string; username?: string; password?: string }): Chainable<any>;
  }
}
