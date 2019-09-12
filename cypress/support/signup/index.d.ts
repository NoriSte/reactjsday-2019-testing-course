/// <reference types="Cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Register a new user
     * @example
     * cy.signupv1()
     * cy.signupv1({email: "foo[AT]bar.io", username: "Foo", password: "ar"})
     * cy.signupv1().then(user => { ... })
     */
    signupV1(user?: {
      email?: string;
      username?: string;
      password?: string;
    }): Chainable<{
      email: string;
      username: string;
      password: string;
    }>;
  }
}
