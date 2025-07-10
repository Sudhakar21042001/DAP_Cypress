import {
  avatarIcon,
  logoutButton,
  regionDropdown,
  regionOption,
  countryDropdown,
  countryOption,
  overallQualityHeading,
  percentageValue,
  applyFilterButton
} from '../support/locators/dashboardLocators.js';

describe('DAP Dashboard', () => {
  beforeEach(() => {
    cy.login('user1@lenovo.com', 'l4Qoz;5Rr1Y]1}q+');
  });

  it('Login with custom command', () => {
    cy.url().should('contain', '/dashboard');
    cy.xpath(avatarIcon).trigger('mouseover');
    cy.get(logoutButton).should('be.visible');
  });


  it('Filter by Region and Country', () => {
    cy.xpath(regionDropdown).click();
    cy.xpath(regionOption('AP')).click();
    cy.xpath(regionOption('JP')).click();
    cy.xpath(regionOption('EMEA')).click();

    // Country selections
    cy.xpath(countryDropdown).click();
    cy.xpath(countryOption('AT')).click();
    cy.xpath(countryOption('AU')).click();
    cy.xpath(countryOption('DE')).click();

    // Before applying filter: Verify text exists and capture it
    cy.contains(overallQualityHeading, 'Overall Quality').should('exist');
    cy.xpath(percentageValue)
      .invoke('text')
      .then((beforeValue) => {
        expect(beforeValue.trim()).to.equal('99.485%');

        // Apply Filter
        cy.xpath(applyFilterButton).click();

        // Verify 'Overall Quality' still exists
        cy.contains(overallQualityHeading, 'Overall Quality').should('exist');

        // Confirm the percentage has changed after filter
        cy.xpath("//p")
          .invoke('text')
          .should((afterValue) => {
            expect(afterValue.trim()).to.not.equal(beforeValue.trim());
          });
      });
  });
  
});
