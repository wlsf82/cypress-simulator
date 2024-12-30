Cypress.Commands.add("login", () => {
  cy.session("sessionId", () => {
    cy.visit("./src/index.html")
    cy.contains("button", "Login").click()
  })
})
