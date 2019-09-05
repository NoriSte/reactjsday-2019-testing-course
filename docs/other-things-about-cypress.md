TODO:

the next ones are the same

```javascript
cy.wait("@signup-request")
  .its("request.body")
  .should("have.property", "user")
  .and("be.a", "object")
  .should("have.property", "username", user.username);
```

```javascript
cy.wait("@signup-request").should(xhr => {
  expect(xhr.request.body)
    .to.have.property("user")
    .and.to.be.a("object");
  expect(xhr.request.body.user).to.have.property("username", user.username);
});
```

```javascript
cy.wait("@signup-request").should(xhr => {
  cy.wrap(xhr)
    .its("request.body")
    .should("have.property", "user")
    .and("be.a", "object")
    .should("have.property", "username", user.username)
    .should("have.property", "email", user.email)
    .should("have.property", "password", user.password);
});
```
