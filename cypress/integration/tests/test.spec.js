describe('Memory game', () => {
  it('Renders the game', () => {
    cy.visit('http://localhost:8080');
    cy.contains('Welcome!').should('be.visible');
  });

  it('Validating different modes', () => {
    // Test Easy mode
    cy.visit('http://localhost:8080');
    cy.get('#easy').should('exist').click();
    cy.contains('Easy Mode').should('be.visible');
    cy.get('.tile').should('have.length', 8);

    // Test Normal mode
    cy.visit('http://localhost:8080');
    cy.get('#normal').should('exist').click();
    cy.contains('Normal Mode').should('be.visible');
    cy.get('.tile').should('have.length', 16);

    // Test Hard mode
    cy.visit('http://localhost:8080');
    cy.get('#hard').should('exist').click();
    cy.contains('Hard Mode').should('be.visible');
    cy.get('.tile').should('have.length', 32);
  });
});
