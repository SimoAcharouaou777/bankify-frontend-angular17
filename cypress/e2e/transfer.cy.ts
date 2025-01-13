describe('Transfer Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
    cy.get('input[name="username"]').type('simo');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', '/login');
    cy.visit('http://localhost:4200/user/transfer');
  });

  it('should display the page title', () => {
    cy.contains('Banking Operations').should('exist');
  });

  it('should display deposit, withdraw, and transfer sections', () => {
    cy.contains('Deposit Money').should('exist');
    cy.contains('Withdraw Money').should('exist');
    cy.contains('Transfer Funds').should('exist');
  }) ;

  it('should display the deposit form and perform a deposit', () => {
    cy.get('form[formGroup="depositForm"]').should('exist');
    cy.get('form[formGroup="depositForm"] select[formControlName="accountId"]')
      .should('be.visible')
      .select('1');

    cy.get('form[formGroup="depositForm"] input[formControlName="amount"]').type('100');
    cy.get('form[formGroup="depositForm"] button[type="submit"]').click();
    cy.contains('Deposit successful.').should('exist');
  });



})
