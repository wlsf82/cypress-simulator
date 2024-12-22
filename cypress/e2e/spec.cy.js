describe('Cypress Test Playground', () => {
  Cypress._.times(100, () => {
    it('successfully runs 99% of the times', () => {
      cy.clock()
      cy.visit('./src/index.html')

      cy.get('textarea').type("cy.log('Yo!')")
      cy.contains('button', 'Run').click()
      cy.tick(2000)

      cy.get('#outputArea')
        .should('contain', 'Code executed successfully:')
        .and('contain', "cy.log('Yo!')")
    })
  })
})
