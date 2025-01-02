const options = { viewportWidth: 1700, viewportHeight: 1024 }

describe("Cypress Simulator", options, () => {
  beforeEach(() => {
    cy.clock()
    cy.login()
    cy.visit("./src/index.html")
  })

  it("shows error for valid Cypress code without parentheses", () => {
    cy.get("textarea").type("cy.get")
    cy.contains("button", "Run").click()
    cy.tick(6000)

    cy.get("#outputArea")
      .should("contain", "Error:")
      .and("contain", "Missing parentheses on `cy.get` command")
  })

  it("checks the run button disabled and enabled states", () => {
    cy.contains("button", "Run").should("be.disabled")

    cy.get("textarea").type("cy.log('Yo!')")

    cy.contains("button", "Run").should("be.enabled")

    cy.get("textarea").clear()

    cy.contains("button", "Run").should("be.disabled")
  })

  it("clears the code input when logging off then logging in again", () => {
    cy.get("textarea").type("cy.log('Yo!')")

    cy.get("#sandwich-menu").click()
    cy.contains("button", "Logout").click()
    cy.contains("button", "Login").click()

    cy.get("textarea").should("have.value", "")
  })

  it("disabled the run button when logging off then logging in again", () => {
    cy.get("textarea").type("cy.log('Yo!')")
    cy.contains("button", "Run").click()
    cy.tick(6000)

    cy.get("#sandwich-menu").click()
    cy.contains("button", "Logout").click()
    cy.contains("button", "Login").click()

    cy.contains("button", "Run").should("be.disabled")
  })

  it("clears the code output when logging off then logging in again", () => {
    cy.get("textarea").type("cy.log('Yo!')")
    cy.contains("button", "Run").click()
    cy.tick(6000)

    cy.get("#sandwich-menu").click()
    cy.contains("button", "Logout").click()
    cy.contains("button", "Login").click()

    cy.get("textarea").should("have.value", "")
  })
})
