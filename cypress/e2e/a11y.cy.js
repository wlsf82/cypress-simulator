const options = { viewportWidth: 1700, viewportHeight: 1024 }

describe("Cypress Simulator - A11y Checks", options, () => {
  beforeEach(() => {
    cy.login()
    cy.visit("./src/index.html?skipCaptcha=true", {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    })
    cy.injectAxe()
  })

  it("finds no a11y issues on success", () => {
    cy.get("textarea").type("cy.log('Yo!')")
    cy.contains("button", "Run").click()

    cy.get("#outputArea", { timeout: 6000})
      .should("contain", "Success:")
      .and("contain", "cy.log('Yo!') // Logged message 'Yo!'")

    cy.checkA11y(".success")
  })

  it("finds no a11y issues on warning", () => {
    cy.get("textarea").type("cy.contains('Hello, World!')")
    cy.contains("button", "Run").click()

    cy.get("#outputArea", { timeout: 6000})
      .should("contain", "Warning:")
      .and("contain", "The `cy.contains` command has not been implemented yet.")

    cy.checkA11y(".warning")
  })

  it("finds no a11y issues on error", () => {
    cy.get("textarea").type("console.log('Hello, World!')")
    cy.contains("button", "Run").click()

    cy.get("#outputArea", { timeout: 6000})
      .should("contain", "Error:")
      .and("contain", "Invalid Cypress command: console.log('Hello, World!')")

    cy.checkA11y(".error")
  })

  it("finds no a11y issues on help", () => {
    cy.get("textarea").type("help")
    cy.contains("button", "Run").click()

    cy.get("#outputArea", { timeout: 6000})
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

    cy.contains(
      "button",
      "Running...",
      { timeout:  6000 }
    ).should("not.exist")
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

    cy.get("#outputArea", { timeout: 6000})
      .should("contain", "Common Cypress commands and examples:")
      .and("contain","For more commands and details, visit the official Cypress API documentation.")

    cy.get("#collapseIcon").should("be.visible")

    cy.checkA11y()

    cy.get(".expand-collapse").click()

    cy.get("#expandIcon").should("be.visible")
  })
})

describe("Cypress Simulator - A11y Checks - Cookies Consent", options, () => {
  beforeEach(() => {
    cy.login()
    cy.visit("./src/index.html?skipCaptcha=true")
    cy.injectAxe()
  })

  it("finds no a11y issues on the cookies consent banner", () => {
    cy.get("#cookieConsent").should("be.visible")
    cy.checkA11y()
  })
})

describe("Cypress Simulator - Captcha", options, () => {
  beforeEach(() => {
    cy.visit("./src/index.html")
    cy.injectAxe()
  })

  it("finds no a11y issues on all captcha view states (button enabled/disabled and error)", () => {
    cy.contains("button", "Login").click()

    cy.checkA11y()

    cy.get("input[placeholder='Enter your answer']").type("1000")

    cy.checkA11y()

    cy.contains("button", "Verify").click()

    cy.contains(".error", "Incorrect answer, please try again.")
      .should("be.visible")
    cy.get("input[placeholder='Enter your answer']")
      .should("have.value", "")
    cy.contains("button", "Verify").should("be.disabled")

    cy.checkA11y()
  })
})
