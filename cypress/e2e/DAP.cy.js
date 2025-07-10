
describe('DAP Dashboard', () => {

  it('Login with custom command', () => {
    cy.login('user1@lenovo.com', 'l4Qoz;5Rr1Y]1}q+');
    cy.url().should('contain','/dashboard');
    cy.xpath("//span[@class='ant-avatar ant-avatar-circle ant-avatar-icon ant-dropdown-trigger cursor-pointer css-1engpkn']")
    .trigger('mouseover');
    cy.get('.log-out-button').should('be.visible');
  });
});
