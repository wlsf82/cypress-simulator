const options = { viewportWidth: 1700, viewportHeight: 1024 }

describe('Cypress Test Playground', options, () => {
  beforeEach(() => {
    cy.clock()
    cy.visit('./src/index.html')
    cy.contains('button', 'Login').click()
  })

  it('successfully runs the code', () => {
    cy.get('textarea').type("cy.log('Yo!')")
    cy.contains('button', 'Run').click()
    cy.tick(2000)

    cy.get('#outputArea')
      .should('contain', 'Code executed successfully:')
      .and('contain', "cy.log('Yo!')")
  })

  it('answers for help', () => {
    cy.get('textarea').type("help")
    cy.contains('button', 'Run').click()
    cy.tick(2000)

    cy.get('#outputArea')
      .should(
        'contain',
        'Visit the below URL, then access the Commands link on the left menu item to get a list of all available Cypress commands:'
      )
    cy.contains('#outputArea a', 'https://docs.cypress.io/api/table-of-contents')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
  })

  it("checks the run button disabled and enabled states", () => {
    cy.contains('button', 'Run').should('be.disabled')

    cy.get('textarea').type("cy.log('Yo!')")

    cy.contains('button', 'Run').should('be.enabled')

    cy.get('textarea').clear()

    cy.contains('button', 'Run').should('be.disabled')
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
})
