/// <reference types="Cypress" />

it("The Brotli-compressed assets should be served with the correct content encoding", () => {
  cy.request({
    url: "https://react-redux.realworld.io/main.js",
    headers: { "Accept-Encoding": "br" }
  })
    .should(xhr => expect(xhr.status).to.eq(200))
    .its("headers.content-encoding")
    .should("equal", "br");
});
