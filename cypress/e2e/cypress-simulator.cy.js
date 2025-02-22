describe("Cypress Simulator", () => {
  beforeEach(() => {
    cy.clock()
    cy.login()
    cy.visit("./src/index.html?skipCaptcha=true&chancesOfError=0", {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    })
  })

  it("shows error for valid Cypress code without parentheses", () => {
    cy.get("textarea").type("cy.get")
    cy.contains("button", "Run").click()
    cy.tick(6000)

    cy.get("#outputArea")
      .should("contain", "Error:")
      .and("contain", "Missing parentheses on `cy.get` command")
      .and("be.visible")
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

    cy.get("#outputArea").should("not.contain", "cy.log('Yo!')")
  })
})

describe("Cypress Simulator - Glitch in the Matrix", () => {
  beforeEach(() => {
    cy.clock()
    cy.login()
    cy.visit("./src/index.html?chancesOfError=1&skipCaptcha=true", {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    })
  })

  it("errors out with a glitch in the Matrix", () => {
    cy.get("textarea").type("cy.get('.btn-green')")
    cy.contains("button", "Run").click()
    cy.tick(6000)

    cy.contains("#outputArea", "There's a glitch in the Matrix")
      .should("be.visible")
  })
})

describe("Cypress Simulator - Cookies Consent", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("./src/index.html?skipCaptcha=true")
  })

  it("consents on the cookies usage", () => {
    cy.get("#cookieConsent")
      .as("cookieConsentBanner")
      .find("button:contains('Accept')")
      .click()

    cy.get("@cookieConsentBanner").should("not.be.visible")
    cy.window()
      .its("localStorage.cookieConsent")
      .should("be.equal", "accepted")
  })

  it("declines on the cookies usage", () => {
    cy.get("#cookieConsent")
      .as("cookieConsentBanner")
      .find("button:contains('Decline')")
      .click()

    cy.get("@cookieConsentBanner").should("not.be.visible")
    cy.window()
      .its("localStorage.cookieConsent")
      .should("be.equal", "declined")
  })
})

describe("Cypress Simulator - Login and Captcha", () => {
  beforeEach(() => {
    cy.visit("./src/index.html")
  })

  it("doesn't show the cookie consent banner on the login page", () => {
    cy.get("#cookieConsent").should("not.be.visible")
  })

  it("disabled the captcha verify button when no answer is provided or it's cleared", () => {
    cy.contains("button", "Login").click()

    cy.contains("button", "Verify").should("be.disabled")

    cy.get("input[placeholder='Enter your answer']").type("1")

    cy.contains("button", "Verify").should("be.enabled")

    cy.get("input[placeholder='Enter your answer']").clear()

    cy.contains("button", "Verify").should("be.disabled")
  })
})
