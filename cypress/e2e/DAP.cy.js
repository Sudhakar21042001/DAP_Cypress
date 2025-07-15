import {
  avatarIcon,
  logoutButton,
  regionDropdown,
  regionOption,
  countryDropdown,
  countryOption,
  applyFilterButton,
  overallValue,
  Last7Run,
  Explore,
  graph,
  graphHeading,
  count,
  switchToggle,
  percentage,
  datePicker,
  datePickerStartLabel,
  datePickerStartDate,
  datePickerEndLabel,
  datePickerEndDate,
  dateLabel,
  dateStartLabel,
  dateEndLabel
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
  it('Remove filter - Region and Country', () => {
    cy.xpath(regionDropdown).click();
    cy.xpath(regionOption('AP')).click();
    cy.xpath(regionOption('JP')).click();
    cy.xpath(regionOption('EMEA')).click();

    // Country selections
    cy.xpath(countryDropdown).click();
    cy.xpath(countryOption('AT')).click();
    cy.xpath(countryOption('DE')).click();
    cy.xpath(countryOption('DK')).click();

    //Clear filters using clear button 
    cy.get('.gap-1 > .clear-button').click();
    cy.xpath(regionDropdown)
      .invoke('text')
      .then((text) => {
        const trimmed = text.trim();
        cy.log(`Region dropdown text after clear: "${trimmed}"`);

        // Final assertion
        expect(
          trimmed === '' || trimmed === 'Select region',
          `Dropdown should be empty or show 'Select region', but got "${trimmed}"`
        ).to.be.true;
      });

  })
  it('should display 7-day graph when Explore 7 Days is clicked', () => {
    cy.xpath(regionDropdown).click();
    cy.xpath(regionOption('AP')).click();
    cy.xpath(regionOption('JP')).click();
    cy.xpath(regionOption('EMEA')).click();

    // Country selections
    cy.xpath(countryDropdown).click();
    cy.xpath(countryOption('AT')).click();
    cy.xpath(countryOption('DE')).click();
    cy.xpath(countryOption('DK')).click();

    // Apply filter
    cy.xpath(applyFilterButton).click();

    //Last 7 runs
    cy.xpath(Last7Run).click();
    cy.xpath(Explore).click();
    cy.get(percentage).should('have.text', 'Percentage');
    cy.get(graphHeading).should('be.visible');
  })
  it('Display 7-day graph and show only count on switch toggle', () => {
    //Region selections 
    cy.xpath(regionDropdown).click();
    cy.xpath(regionOption('AP')).click();
    cy.xpath(regionOption('JP')).click();
    cy.xpath(regionOption('EMEA')).click();

    // Country selections
    cy.xpath(countryDropdown).click();
    cy.xpath(countryOption('AT')).click();
    cy.xpath(countryOption('DE')).click();
    cy.xpath(countryOption('DK')).click();

    // Apply filter
    cy.xpath(applyFilterButton).click();

    //Last 7 runs
    cy.xpath(Last7Run).click();
    cy.xpath(Explore).click();
    cy.get(switchToggle).click();  // switch toggle 
    cy.get(count).should('have.text', 'Count');

  })
  it("Applying date range filter", function () {
    cy.xpath(datePicker).click();
    cy.xpath(datePickerStartLabel).click();
    cy.xpath(datePickerStartDate).click();
    cy.xpath(datePickerEndLabel).click();
    cy.xpath(datePickerEndDate).click();
    cy.get(dateStartLabel).should('have.value', 'Jul 1, 2025');
    cy.get(dateEndLabel).should('have.value', 'Jul 7, 2025');

  })
});
