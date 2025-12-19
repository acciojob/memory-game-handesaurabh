describe('Memory game', () => {
  it('Renders the game', () => {
    cy.visit('http://localhost:8080');
    cy.contains('Welcome!').should('be.visible');
    cy.contains('Select Difficulty Level').should('be.visible');
  });

  it('Validating different modes', () => {
    cy.visit('http://localhost:8080');
    
    // Click Easy - using specific selector to avoid multiple elements issue
    cy.get('label[for="easy"]').click(); 
    cy.get('#start-game-btn').click();
    cy.contains('Easy Mode').should('be.visible');
    cy.get('.cells_container.easy .tile').should('have.length', 8);
    
    // Reset and test Normal
    cy.contains('Reset Game').click();
    cy.get('label[for="normal"]').click();
    cy.get('#start-game-btn').click();
    cy.contains('Normal Mode').should('be.visible');
    cy.get('.cells_container.normal .tile').should('have.length', 16);
    
    // Reset and test Hard
    cy.contains('Reset Game').click();
    cy.get('label[for="hard"]').click();
    cy.get('#start-game-btn').click();
    cy.contains('Hard Mode').should('be.visible');
    cy.get('.cells_container.hard .tile').should('have.length', 32);
  });
});