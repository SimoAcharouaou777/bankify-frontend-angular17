describe('Transactions Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
    cy.get('input[name="username"]').type('simo');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', '/login');
    cy.visit('http://localhost:4200/user/transactions');
  });

  it('should display the page title', () => {
    cy.contains('My Transaction History').should('exist');
  });

  it('should show the account dropdown', () => {
    cy.get('#accountSelect').should('be.visible');
  });
});
