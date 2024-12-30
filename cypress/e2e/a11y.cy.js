const options = { viewportWidth: 1700, viewportHeight: 1024 }

describe("Cypress Simulator - a11y checks", options, () => {
  beforeEach(() => {
    cy.login()
    cy.visit("./src/index.html")
    cy.injectAxe()
  })

  it("finds no a11y issues on success", () => {
    cy.get("textarea").type("cy.log('Yo!')")
    cy.contains("button", "Run").click()

    cy.get("#outputArea")
      .should("contain", "Success:")
      .and("contain", "cy.log('Yo!') // Logged message 'Yo!'")

    cy.checkA11y(".success")
  })

  it("finds no a11y issues on warning", () => {
    cy.get("textarea").type("cy.contains('Hello, World!')")
    cy.contains("button", "Run").click()

    cy.get("#outputArea")
      .should("contain", "Warning:")
      .and("contain", "The `cy.contains` command has not been implemented yet.")

    cy.checkA11y(".warning")
  })

  it("finds no a11y issues on error", () => {
    cy.get("textarea").type("console.log('Hello, World!')")
    cy.contains("button", "Run").click()

    cy.get("#outputArea")
      .should("contain", "Error:")
      .and("contain", "Invalid Cypress command: console.log('Hello, World!')")

    cy.checkA11y(".error")
  })

  it("finds no a11y issues on help", () => {
    cy.get("textarea").type("help")
    cy.contains("button", "Run").click()

    cy.get("#outputArea")
      .should("contain", "Common Cypress commands and examples:")
      .and("contain","For more commands and details, visit the official Cypress API documentation.")
    cy.contains("#outputArea a", "official Cypress API documentation")
      .should("have.attr", "href", "https://docs.cypress.io/api/table-of-contents")
      .and("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noopener noreferrer")

    cy.checkA11y("pre")
  })

  it("finds no a11y issues while in the running state", () => {
    cy.get("textarea").type("cy.log('Yo!')")

    cy.contains("button", "Run").click()

    cy.contains("button", "Running...").should("be.visible")

    cy.checkA11y()

    cy.contains("button", "Running...").should("not.exist")
    cy.contains("button", "Run").should("be.visible")
  })

  it("finds no a11y issues when showing the logout button", () => {
    cy.get("#sandwich-menu").click()
    cy.contains("button", "Logout").should("be.visible")
    cy.checkA11y()

    cy.get("#sandwich-menu").click()
    cy.contains("button", "Logout").should("not.be.visible")
  })

  it("finds no a11y issues on successful log out", () => {
    cy.get("#sandwich-menu").click()
    cy.contains("button", "Logout").click()

    cy.contains("button", "Login").should("be.visible")
    cy.get("#sandwich-menu").should("not.be.visible")

    cy.checkA11y()
  })

  it("finds no a11y issues on maximized code output", () => {
    cy.get("textarea").type("help")
    cy.contains("button", "Run").click()

    cy.get(".expand-collapse").click()

    cy.get("#outputArea")
      .should("contain", "Common Cypress commands and examples:")
      .and("contain","For more commands and details, visit the official Cypress API documentation.")

    cy.get("#collapseIcon").should("be.visible")

    cy.checkA11y()

    cy.get(".expand-collapse").click()

    cy.get("#expandIcon").should("be.visible")
  })
})
