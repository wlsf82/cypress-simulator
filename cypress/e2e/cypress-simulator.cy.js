const options = { viewportWidth: 1700, viewportHeight: 1024 }

describe('Cypress Simulator', options, () => {
  beforeEach(() => {
    cy.clock()
    cy.session('sessionId', () => {
      cy.visit('./src/index.html')
      cy.contains('button', 'Login').click()
    })
    cy.visit('./src/index.html')
  })

  it('successfully runs the code', () => {
    cy.get('textarea').type("cy.log('Yo!')")
    cy.contains('button', 'Run').click()
    cy.tick(2000)

    cy.get('#outputArea')
      .should('contain', 'Success:')
      .and('contain', "cy.log('Yo!') // Logged message 'Yo!'")
  })

  it('shows warning for not implemented Cypress code', () => {
    cy.get('textarea').type("cy.contains('Hello, World!')")
    cy.contains('button', 'Run').click()
    cy.tick(2000)

    cy.get('#outputArea')
      .should('contain', 'Warning:')
      .and('contain', 'The command `cy.contains` has not been implemented yet.')
  })

  it('shows error for invalid Cypress code', () => {
    cy.get('textarea').type("console.log('Hello, World!')")
    cy.contains('button', 'Run').click()
    cy.tick(2000)

    cy.get('#outputArea')
      .should('contain', 'Error:')
      .and('contain', "Invalid Cypress command: console.log('Hello, World!')")
  })

  it('shows error for valid Cypress code without parenthesis', () => {
    cy.get('textarea').type("cy.get")
    cy.contains('button', 'Run').click()
    cy.tick(2000)

    cy.get('#outputArea')
      .should('contain', 'Error:')
      .and('contain', 'Missing parentheses on cy.get command')
  })

  it('answers for help', () => {
    cy.get('textarea').type("help")
    cy.contains('button', 'Run').click()
    cy.tick(2000)

    cy.get('#outputArea')
      .should('contain','For more details, visit the official Cypress API documentation.')
    cy.contains('#outputArea a', 'official Cypress API documentation')
      .should('have.attr', 'href', 'https://docs.cypress.io/api/table-of-contents')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
  })

  it("checks the run button disabled and enabled states", () => {
    cy.contains('button', 'Run').should('be.disabled')

    cy.get('textarea').type("cy.log('Yo!')")

    cy.contains('button', 'Run').should('be.enabled')

    cy.get('textarea').clear()

    cy.contains('button', 'Run').should('be.disabled')
  })

  it("checks the run button running state", () => {
    cy.get('textarea').type("cy.log('Yo!')")

    cy.contains('button', 'Run').click()

    cy.contains('button', 'Running...').should('be.visible')

    cy.tick(2000)

    cy.contains('button', 'Running...').should('not.exist')
    cy.contains('button', 'Run').should('be.visible')
  })

  it('shows and hides the logout button', () => {
    cy.get('#sandwich-menu').click()
    cy.contains('button', 'Logout').should('be.visible')

    cy.get('#sandwich-menu').click()
    cy.contains('button', 'Logout').should('not.be.visible')
  })

  it('successfully logs out', () => {
    cy.get('#sandwich-menu').click()
    cy.contains('button', 'Logout').click()

    cy.contains('button', 'Login').should('be.visible')
    cy.get('#sandwich-menu').should('not.be.visible')
  })

  it('clears the code input when logging off then logging in again', () => {
    cy.get('textarea').type("cy.log('Yo!')")

    cy.get('#sandwich-menu').click()
    cy.contains('button', 'Logout').click()
    cy.contains('button', 'Login').click()

    cy.get('textarea').should('have.value', '')
  })

  it('disabled the run button when logging off then logging in again', () => {
    cy.get('textarea').type("cy.log('Yo!')")
    cy.contains('button', 'Run').click()
    cy.tick(2000)

    cy.get('#sandwich-menu').click()
    cy.contains('button', 'Logout').click()
    cy.contains('button', 'Login').click()

    cy.contains('button', 'Run').should('be.disabled')
  })

  it('clears the code output when logging off then logging in again', () => {
    cy.get('textarea').type("cy.log('Yo!')")
    cy.contains('button', 'Run').click()
    cy.tick(2000)

    cy.get('#sandwich-menu').click()
    cy.contains('button', 'Logout').click()
    cy.contains('button', 'Login').click()

    cy.get('textarea').should('have.value', '')
  })

  it('maximizes and minimizes the code output', () => {
    cy.get('textarea').type("help")
    cy.contains('button', 'Run').click()
    cy.tick(2000)

    cy.get('.expand-collapse').click()

    cy.get('#collapseIcon').should('be.visible')

    cy.get('.expand-collapse').click()

    cy.get('#expandIcon').should('be.visible')
  })
})
