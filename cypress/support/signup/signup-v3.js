/// <reference types="Cypress" />

import { paths } from "../../../realworld/frontend/src/components/App";
import { noArticles } from "../../../realworld/frontend/src/components/ArticleList";
import { newPost } from "../../../realworld/frontend/src/components/Header";

let previousUserData = {};

Cypress.Commands.add(
  "signupV3",
  ({ email, username, password, ignoreLocalStorage = false } = {}) => {
    let user;
    // if the user data match the previous one
    if (!ignoreLocalStorage && previousUserData.jwt && previousUserData.email === email) {
      cy.log("signupV3: Authentication check ⚠️");

      // set the stored token
      localStorage.setItem("jwt", previousUserData.jwt);

      cy.visit("/")
        // use the "New Post" string to detect if the user is authenticated or not
        .findByText(newPost)
        .then($el => $el.length !== 0)
        .then(userIsAuthenticated => {
          if (userIsAuthenticated) {
            cy.log("signupV3: Authentication check passed ✅");
            user = previousUserData.user;
          } else {
            // removed the stored token
            localStorage.removeItem("jwt");
          }
        });
    }

    cy.then(() => {
      if (user) {
        return user;
      }
      cy.log("signupV3: Authentication check failed ❌ a new user is going to be registered");

      const random = Math.floor(Math.random() * 100000);
      user = {
        username: username || `Tester${random}`,
        email: email || `user+${random}@realworld.io`,
        password: password || "mysupersecretpassword"
      };

      // set up AJAX call interception
      cy.server();
      cy.route("POST", "**/api/users").as("signup-request");

      cy.visit(paths.register);

      cy.window()
        .its("appActions")
        .invoke("signup", user);

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

      // wait until the localStorage token is saved
      cy.wrap(localStorage)
        .its("jwt")
        .should(jwt => expect(jwt).to.be.a("string").and.not.to.be.empty)
        .then(jwt => {
          previousUserData = {
            jwt,
            username,
            email,
            password,
            user
          };
        })
        .then(() => user);
    });
  }
);
