import {
  avatarIcon,
  logoutButton,
  regionDropdown,
  regionOption,
  countryDropdown,
  countryOption,
  overallQualityHeading,
  percentageValue,
  applyFilterButton,
  overallValue
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


  it.only('Filter by Region and Country', () => {
    cy.xpath(regionDropdown).click();
    cy.xpath(regionOption('AP')).click();
    cy.xpath(regionOption('JP')).click();
    cy.xpath(regionOption('EMEA')).click();

    // Country selections
    cy.xpath(countryDropdown).click();
    cy.xpath(countryOption('AT')).click();
    cy.xpath(countryOption('DE')).click();
    cy.xpath(countryOption('DK')).click();
    // Step 1: Capture and assert BEFORE filter value
    cy.xpath(overallValue)
      .invoke('text')
      .then((beforeText) => {
        const beforeValue = beforeText.trim();
        cy.log(`Before Filter Value: ${beforeValue}`);

        // Assertion 1: Before value should not be empty
        expect(beforeValue).to.not.be.empty;
        expect(beforeValue).to.include('Correct'); // Optional extra check
        expect(beforeValue).to.include('Incorrect'); // Optional extra check
        expect(beforeValue).to.include('Missing'); // Optional extra check

        // Step 2: Click Apply Filter
        cy.xpath(applyFilterButton).click();

        // Optional wait to allow UI update
        cy.wait(1000);

        // Step 3: Capture and assert AFTER filter value
        cy.xpath(overallValue)
          .invoke('text')
          .then((afterText) => {
            const afterValue = afterText.trim();
            cy.log(`After Filter Value: ${afterValue}`);

            //  Assertion 2: After value should not be empty
            expect(afterValue).to.not.be.empty;
            expect(afterValue).to.include('Correct'); // Optional extra check
            expect(afterValue).to.include('Incorrect'); // Optional extra check
            expect(afterValue).to.include('Missing'); // Optional extra check

            //  Assertion 3: After ≠ Before
            expect(afterValue).to.not.equal(beforeValue, ' After value should differ from Before value');
          });
      });
    })
    
})