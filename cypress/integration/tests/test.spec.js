describe('Memory game', () => {
  it('Renders the game', () => {
    cy.visit('http://localhost:8080');
    cy.contains('Welcome!').should('be.visible');
  });

  it('Validating different modes', () => {
    cy.visit('http://localhost:8080');
    
    // Test Easy mode - click radio (your onChange starts game)
    cy.contains('label', 'Easy (8 tiles)').click();
    cy.contains('Easy Mode').should('be.visible');
    cy.get('.cells_container.easy .tile').should('have.length', 8);
    
    // Reset game
    cy.contains('Reset Game').click();
    cy.contains('Welcome!').should('be.visible');
    
    // Test Normal mode
    cy.contains('label', 'Normal (16 tiles)').click();
    cy.contains('Normal Mode').should('be.visible');
    cy.get('.cells_container.normal .tile').should('have.length', 16);
    
    // Reset game
    cy.contains('Reset Game').click();
    cy.contains('Welcome!').should('be.visible');
    
    // Test Hard mode
    cy.contains('label', 'Hard (32 tiles)').click();
    cy.contains('Hard Mode').should('be.visible');
    cy.get('.cells_container.hard .tile').should('have.length', 32);
  });
});