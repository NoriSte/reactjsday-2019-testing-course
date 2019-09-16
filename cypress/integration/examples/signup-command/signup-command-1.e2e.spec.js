/// <reference types="Cypress" />

context("The custom command could be run before the test code", () => {
  it("Should leverage the custom registration command", () => {
    cy.signupV1().should(user => {
      expect(user).to.have.property("username").and.not.to.be.empty;
      expect(user).to.have.property("email").and.not.to.be.empty;
      expect(user).to.have.property("password").and.not.to.be.empty;
    });

    cy.log("The user is now registered and authenticated");
    cy.findByText("New Post").should("be.visible");
  });
});

context("The custom command could be run before the test code with a test hook", () => {
  beforeEach(() => {
    cy.signupV1().should(user => {
      expect(user).to.have.property("username").and.not.to.be.empty;
      expect(user).to.have.property("email").and.not.to.be.empty;
      expect(user).to.have.property("password").and.not.to.be.empty;
    });
  });
  it("Should leverage the custom registration command with a test hook", () => {
    cy.log("The user is now registered and authenticated");
    cy.findByText("New Post").should("be.visible");
  });
});

context("The custom command could be customized", () => {
  it("Should leverage the custom registration command", () => {
    const user = {
      username: "CustomTester",
      email: "specialtester@realworld.io",
      password: "mysupersecretpassword"
    };
    cy.signupV1(user).should("deep.equal", user);
    cy.log("The user is now registered and authenticated");
    cy.findByText("New Post").should("be.visible");
  });
});
