describe('Cypress Test Playground', () => {
  beforeEach(() => {
    cy.clock()
    cy.visit('./src/index.html')
  })

  Cypress._.times(100, () => {
    it('successfully runs 99% of the times', () => {
      cy.get('textarea').type("cy.log('Yo!')")
      cy.contains('button', 'Run').click()
      cy.tick(2000)

      cy.get('#outputArea')
        .should('contain', 'Code executed successfully:')
        .and('contain', "cy.log('Yo!')")
    })
  })

  it("checks the run button is disabled and enabled states", () => {
    cy.contains('button', 'Run').should('be.disabled')

    cy.get('textarea').type("cy.log('Yo!')")

    cy.contains('button', 'Run').should('be.enabled')

    cy.get('textarea').clear()

    cy.contains('button', 'Run').should('be.disabled')
  })
})
