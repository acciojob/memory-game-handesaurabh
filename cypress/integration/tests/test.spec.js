describe('Memory game', () => {
  it('Renders the game', () => {
    cy.visit('http://localhost:8080');
    cy.contains('Welcome!').should('be.visible');
  });

  it('Validating different modes', () => {
    cy.visit('http://localhost:8080');
    
    // Click radio buttons DIRECTLY using .check() - triggers your onChange
    cy.get('input#easy').check();
    cy.contains('Easy Mode').should('be.visible');
    cy.get('.cells_container.easy .tile').should('have.length', 8);
    
    // Reset
    cy.contains('Reset Game').click();
    
    // Normal mode
    cy.get('input#normal').check();
    cy.contains('Normal Mode').should('be.visible');
    cy.get('.cells_container.normal .tile').should('have.length', 16);
    
    // Reset  
    cy.contains('Reset Game').click();
    
    // Hard mode
    cy.get('input#hard').check();
    cy.contains('Hard Mode').should('be.visible');
    cy.get('.cells_container.hard .tile').should('have.length', 32);
  });
});