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

    /**
     * Register a new user or leverage the previously registered one (if possible)
     * @example
     * cy.signupv3()
     * cy.signupv3({email: "foo[AT]bar.io", username: "Foo", password: "ar"})
     * cy.signupv3().then(user => { ... })
     * @example
     * // the second call with the same (or empty) user data gets the user authenticated without
     * // registering a new one
     * cy.signupv3()
     * cy.signupv3() // the user will not be registered twice
     * cy.signupv3({ignoreLocalStorage: true}) // force the user be registered
     * cy.signupv3({email: "foo[AT]bar.io", username: "Foo", password: "ar"})
     * cy.signupv3({email: "foo[AT]bar.io", username: "Foo", password: "ar"}) // the user will not be registered twice
     * cy.signupv3({email: "foo[AT]bar.io", username: "Foo", password: "ar"}, ignoreLocalStorage: true) // force the user be registered
     */
    signupV3(user?: {
      email?: string;
      username?: string;
      password?: string;
      ignoreLocalStorage?: boolean = false;
    }): Chainable<{
      email: string;
      username: string;
      password: string;
    }>;
  }
}
