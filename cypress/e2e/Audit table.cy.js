
import {
    auditTab,
    SearchButton,
    SearchCode,
    SearchCodeList,
    SearchResult
}
    from '../support/locators/auditTableLocators.js';
describe('DAP - Audit table', function () {
    beforeEach(() => {
        cy.login("user1@lenovo.com", 'l4Qoz;5Rr1Y]1}q+');
        cy.xpath(auditTab).click();
    });
    it('Verify search filter functionality using search code', function () {
        cy.get(SearchCode).type("83E10000US");
        cy.get(SearchButton).click();
        cy.xpath(SearchCodeList).should('contain', '83E10000US');
        cy.get(SearchCode).clear();
    })
    it('Verify search filter with invalid code', function () {
        cy.get(SearchCode).type("ASDFGHK098");
        cy.get(SearchButton).click();
        cy.xpath(SearchResult).should('have.text', 'No data found.');
    })
    it('Verify search with partial code', function () {
        cy.get(SearchCode).type("83E100");
        cy.get(SearchButton).click();
        cy.xpath(SearchCodeList).should('contain', '83E100');
    })
    it('Verify search with leading/trailing spaces', function () {
        cy.get(SearchCode).type("  83E100");
        cy.get(SearchButton).click();
        cy.xpath(SearchCodeList).should('contain', '83E100');
    })
    it.only('Verify behavior when search code input is empty', function () {
        cy.get(SearchCode).type(" ");
        cy.get(SearchButton).click();
        cy.xpath(SearchCodeList).should('be.visible');
    }) 
})