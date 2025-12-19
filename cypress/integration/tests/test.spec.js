describe('Memory Game Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the landing page with difficulty options', () => {
    cy.get('.levels_container').should('be.visible');
    cy.get('h1').should('contain.text', 'Welcome!');
    cy.get('#easy').should('exist');
    cy.get('label[for="easy"]').should('exist');
    cy.get('#normal').should('exist');
    cy.get('label[for="normal"]').should('exist');
    cy.get('#hard').should('exist');
    cy.get('label[for="hard"]').should('exist');
    cy.get('#start-game-btn').should('exist');
  });

  it('should start the game when a difficulty level is selected', () => {
    cy.get('label[for="easy"]').click();
    cy.get('.cells_container').should('be.visible');
    cy.get('.game-info').should('be.visible');
    cy.get('.game-info h2').should('contain.text', 'Easy Mode');
  });

  it('should start the game when Start Game button is clicked', () => {
    cy.get('button#start-game-btn').click();
    cy.get('.cells_container').should('be.visible');
    cy.get('.game-info').should('be.visible');
    cy.get('.game-info h2').should('contain.text', 'Easy Mode');
  });

  it('should display the correct number of tiles for easy mode', () => {
    cy.get('label[for="easy"]').click();
    cy.get('.tile').should('have.length', 8);
  });

  it('should display the correct number of tiles for normal mode', () => {
    cy.get('label[for="normal"]').click();
    cy.get('.tile').should('have.length', 16);
  });

  it('should display the correct number of tiles for hard mode', () => {
    cy.get('label[for="hard"]').click();
    cy.get('.tile').should('have.length', 32);
  });

  it('should flip tiles when clicked', () => {
    cy.get('label[for="easy"]').click();
    cy.get('.tile').first().click();
    cy.get('.tile').first().should('have.class', 'flipped');
    cy.get('.tile').first().find('span').should('not.contain.text', '?');
  });

  it('should increment attempts when two tiles are flipped', () => {
    cy.get('label[for="easy"]').click();
    cy.get('.game-info p').eq(0).should('contain.text', 'Attempts: 0');
    
    // Click first two tiles
    cy.get('.tile').eq(0).click();
    cy.get('.tile').eq(1).click();
    
    // Wait for flip timeout
    cy.wait(1100);
    
    cy.get('.game-info p').eq(0).should('contain.text', 'Attempts: 1');
  });

  it('should reset the game when Reset Game button is clicked', () => {
    cy.get('label[for="easy"]').click();
    cy.get('.tile').first().click();
    // Use eq(0) to select the first (and correct) Reset Game button
    cy.get('button').contains('Reset Game').eq(0).click();
    cy.get('.levels_container').should('be.visible');
  });
});