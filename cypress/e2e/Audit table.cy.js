
import {
    auditTab,
    SearchButton,
    SearchCloseButton,
    SearchCode,
    SearchCodeList,
    SearchResult
}
    from '../support/locators/auditTableLocators.js';
describe('DAP - Audit table', function () {
    beforeEach(() => {
        cy.login("user1@lenovo.com", 'l4Qoz;5Rr1Y]1}q+');
        cy.xpath(auditTab).click();
    })
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
    it('Verify behavior when search code input is empty', function () {
        cy.get(SearchCode).type(" ");
        cy.get(SearchButton).click();
        cy.xpath(SearchCodeList).should('be.visible');
    })
    it('Verify error handling for special characters', function () {
        cy.get(SearchCode).type("(*&^%$#@#");
        cy.get(SearchButton).click();
        cy.xpath(SearchResult).should('have.text', 'No data found.');
        cy.xpath(SearchResult)
            .invoke('text')
            .then((text) => {
                cy.log('Result : ', text);
            })
    })
    it('Verify backspace/clear button functionality', function () {
        // Using Clear button
        cy.get(SearchCode).type("83E10000US");
        cy.get(SearchButton).click();
        cy.xpath(SearchCodeList).should('contain', '83E100');
        cy.xpath(SearchCloseButton).click();
        cy.xpath(SearchCodeList).should('contain', '83E10000US');
        cy.get(SearchCode)
            .should('be.empty')
            .and('have.attr', 'placeholder', 'Search by product code');
        //Using backpace 
        cy.get(SearchCode).type("83E10000US").type('{backspace}'.repeat(10), { force: true });
        cy.get(SearchCode)
            .should('be.empty')
            .and('have.attr', 'placeholder', 'Search by product code');
    })
    it('Pressing Enter triggers search instead of clicking search button', function () {
        cy.get(SearchCode).type("83E10000US{enter}");
        cy.xpath(SearchCodeList).should('contain','83E10000US');
})
})