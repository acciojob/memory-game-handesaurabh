describe('Memory game', () => {
  it('Renders the game', () => {
    cy.visit('http://localhost:8080');
    cy.contains('Welcome!').should('be.visible');
  });

  it('Validating different modes', () => {
    cy.visit('http://localhost:8080');
    
    // Test Easy mode - directly check the radio button
    cy.get('input#easy').should('exist').check();
    cy.contains('Easy Mode').should('be.visible');
    cy.get('.tile').should('have.length', 8);
    
    // Navigate away and back for a fresh start (instead of reset)
    cy.visit('http://localhost:8080');
    
    // Test Normal mode
    cy.get('input#normal').should('exist').check();
    cy.contains('Normal Mode').should('be.visible');
    cy.get('.tile').should('have.length', 16);
    
    // Navigate away and back for a fresh start
    cy.visit('http://localhost:8080');
    
    // Test Hard mode
    cy.get('input#hard').should('exist').check();
    cy.contains('Hard Mode').should('be.visible');
    cy.get('.tile').should('have.length', 32);
  });
});