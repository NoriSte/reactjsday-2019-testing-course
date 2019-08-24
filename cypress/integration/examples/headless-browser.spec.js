context("Headless browser", () => {
  it("Must visit the site and take a screenshot", () => {
    cy.visit("https://2019.reactjsday.it");
    cy.screenshot();
  });
});
