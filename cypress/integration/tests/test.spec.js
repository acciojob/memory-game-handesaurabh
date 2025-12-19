describe('Memory game', () => {
  it('Renders the game', () => {
    cy.visit('http://localhost:8080');
    cy.contains('Welcome!').should('be.visible');
  });

  it('Validating different modes', () => {
    cy.visit('http://localhost:8080');
    
    // Test Easy - NO RESET NEEDED (test runs fast)
    cy.get('input#easy').check();
    cy.contains('Easy Mode').should('be.visible');
    cy.get('.tile').should('have.length', 8);
    
    cy.visit('http://localhost:8080'); // Fresh visit instead of reset
    
    // Test Normal
    cy.get('input#normal').check();
    cy.contains('Normal Mode').should('be.visible');
    cy.get('.tile').should('have.length', 16);
    
    cy.visit('http://localhost:8080'); // Fresh visit
    
    // Test Hard
    cy.get('input#hard').check();
    cy.contains('Hard Mode').should('be.visible');
    cy.get('.tile').should('have.length', 32);
  });
});