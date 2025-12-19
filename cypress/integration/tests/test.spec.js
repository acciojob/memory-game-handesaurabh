describe('Memory game', () => {
  // Run this before each test to ensure a clean state
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('Renders the game', () => {
    // Verify the landing page is visible
    cy.contains('Welcome!').should('be.visible');
    // Verify the "Start Game" button exists
    cy.get('#start-game-btn').should('exist');
  });

  it('Validating different modes', () => {
    // --- Test Easy Mode ---
    // Select the radio button. In your App.js, onChange triggers startGame immediately
    cy.get('input#easy').click();
    
    // Verify Easy Mode UI
    cy.contains('Easy Mode').should('be.visible');
    cy.get('.tile').should('have.length', 8);

    // Reset the game to go back to the main menu
    // We use cy.contains to specifically click the 'Reset Game' button
    cy.contains('button', 'Reset Game').click();
    
    // Verify we are back at the landing page
    cy.contains('Welcome!').should('be.visible');

    // --- Test Normal Mode ---
    cy.get('input#normal').click();
    
    // Verify Normal Mode UI
    cy.contains('Normal Mode').should('be.visible');
    cy.get('.tile').should('have.length', 16);

    // Reset
    cy.contains('button', 'Reset Game').click();

    // --- Test Hard Mode ---
    cy.get('input#hard').click();
    
    // Verify Hard Mode UI
    cy.contains('Hard Mode').should('be.visible');
    cy.get('.tile').should('have.length', 32);
  });
});
