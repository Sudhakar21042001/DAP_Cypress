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
  graphHeading,
  count,
  switchToggle,
  percentage,
  datePicker,
  datePickerStartLabel,
  datePickerStartDate,
  datePickerEndLabel,
  datePickerEndDate,
  dateStartLabel,
  dateEndLabel,
  datePickerEndDate1,
  Categoryheading,
  CategoryValue,
  OverallQuality,
  OverallQualitysubheads,
  categorydrop,
  dropdown1,
  categorydropmonitor,
  categorydropdesktops,
  type,
  facets,
  Incorrect,
  CategoryDownload,
  CategoryDownloadHistory,
  CategoryRemoveFilter,
  moreButton,
  Perpage10,
  Perpage100,
  Perpage100click,
  totalCount,
  tableRowCount,
  Perpage50,
  paginationNum,
  previousButton,
  nextButton,
  lastRun,
  WelcomeBack
} from '../support/locators/dashboardLocators.js';
describe('DAP Dashboard', () => {
   beforeEach(() => {
      cy.login("user1@lenovo.com",'l4Qoz;5Rr1Y]1}q+');
    });
  
  it('Login with custom command', () => {
    cy.url().should('contain','/dashboard');
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
    cy.xpath(countryOption('AT')).click({force:true});
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
  });
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
    // Check Region dropdown is reset
    cy.xpath(regionDropdown)
      .invoke('text')
      .then((regionText) => {
        const trimmedRegion = regionText.trim();
        cy.log(`Region dropdown text after clear: "${trimmedRegion}"`);
        expect(
          trimmedRegion === '' || trimmedRegion === 'Select region',
          `Region dropdown should be empty or show 'Select region', but got "${trimmedRegion}"`
        ).to.be.true;
      });
    // Check Country dropdown is reset
    cy.xpath(countryDropdown)
      .invoke('text')
      .then((countryText) => {
        const trimmedCountry = countryText.trim();
        cy.log(`Country dropdown text after clear: "${trimmedCountry}"`);
        expect(
          trimmedCountry === '' || trimmedCountry === 'Select country',
          `Country dropdown should be empty or show 'Select country', but got "${trimmedCountry}"`
        ).to.be.true;
      });
  });
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
  });
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
  });
  it("Applying date range filter more than 1 day", function () {
    cy.xpath(datePicker).click();
    cy.xpath(datePickerStartLabel).click();
    cy.xpath(datePickerStartDate).click();
    cy.xpath(datePickerEndLabel).click();
    cy.xpath(datePickerEndDate).click();
    cy.get(dateStartLabel).should('have.value', 'Jul 1, 2025');
    cy.get(dateEndLabel).should('have.value', 'Jul 7, 2025');
  });
  it("Applying date range for single day", function () {
    cy.xpath(datePicker).click();
    cy.xpath(datePickerStartLabel).click();
    cy.xpath(datePickerStartDate).click();
    cy.xpath(datePickerEndLabel).click();
    cy.xpath(datePickerEndDate1).click();
    cy.get(dateStartLabel).should('have.value', 'Jul 1, 2025');
    cy.get(dateEndLabel).should('have.value', 'Jul 1, 2025');
  });
  it("should display the By Category section", function () {
    cy.xpath(Categoryheading('By Category')).should('be.visible').should('have.text', 'By Category');
    cy.xpath(Categoryheading('Monitors')).should('be.visible').should('have.text', 'Monitors');
    cy.xpath(Categoryheading('Desktops')).should('be.visible').should('have.text', 'Desktops');
    cy.xpath(Categoryheading('Handheld')).should('be.visible').should('have.text', 'Handheld');
    cy.xpath(Categoryheading('Laptops')).should('be.visible').should('have.text', 'Laptops');
    cy.xpath(Categoryheading('Phones')).should('be.visible').should('have.text', 'Phones');
    cy.xpath(Categoryheading('Storage')).should('be.visible').should('have.text', 'Storage');
    cy.xpath(Categoryheading('Servers')).should('be.visible').should('have.text', 'Servers');
    cy.xpath(Categoryheading('Tablets')).should('be.visible').should('have.text', 'Tablets');
    cy.xpath(Categoryheading('Workstations')).should('be.visible').should('have.text', 'Workstations');
    const inputValue = '0.02%'; // or any other dynamic value
    cy.xpath(CategoryValue(inputValue))
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const actualText = text.trim();
        cy.log('Extracted category value:', actualText);
      });
  });
  it("Should diaplay Overall Quality section", function () {
    cy.xpath(OverallQuality).should('be.visible').should('have.text', 'Overall Quality');
    cy.xpath(OverallQualitysubheads('Correct')).should('be.visible').should('have.text', 'Correct');
    cy.xpath(OverallQualitysubheads('Incorrect')).should('be.visible').should('have.text', 'Incorrect');
    cy.xpath(OverallQualitysubheads('Missing')).should('be.visible').should('have.text', 'Missing');
  });
  it('Explore button should be enabled when filter(7 Day or Date Range) is selected', function () {
    cy.contains('button', 'Explore').should('not.exist');
    // Click on "7 Day" filter
    cy.xpath(Last7Run).click();
    // Now Explore should be visible
    cy.contains('Explore').should('be.visible');
    cy.reload();
    cy.contains('Explore').should('not.exist');
    //Date Picker
    cy.xpath(datePicker).click();
    cy.xpath(datePickerStartDate).click();
    cy.xpath(datePickerEndDate).click();
    cy.contains('Explore').should('be.visible');
  })
  it('Filters, Download & Remove filter - Audit table', function () {
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
    cy.xpath(dropdown1).click();
    cy.xpath(categorydropmonitor).click();
    cy.xpath(categorydropdesktops).click();
    cy.xpath(type).click();
    cy.xpath(facets).click();
    cy.xpath(Incorrect).click();
    // Remove filter 
    cy.xpath(CategoryRemoveFilter).click();
  });
  it('Verify pagination set to 50/100 items per page & Total count in Audit table', function () {
    cy.xpath(moreButton).click();
    cy.xpath(Perpage10).click();
    cy.xpath(Perpage100click).click();
    cy.xpath(Perpage100).should('have.text', '100 / page');
    cy.xpath(totalCount)
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        cy.log('Element text:', text);
      });
    cy.xpath(tableRowCount).should('have.length', '100');
    cy.xpath(Perpage100).click();
    cy.xpath(Perpage50).click();
    cy.xpath(tableRowCount).should('have.length', '50');
  });
  it('Verify Previous/Next button is visible and functional in pagination - Audit table', function () {
    cy.xpath(moreButton).click();
    cy.xpath(previousButton).should('not.be.enabled');
    cy.xpath(nextButton).should('be.enabled').click();
    cy.xpath(previousButton).should('be.enabled');
    cy.xpath(tableRowCount).should('have.length', '10');
    cy.xpath(paginationNum('2')).should('have.text', '2');
    cy.xpath(previousButton).click();
    cy.xpath(paginationNum('1')).should('have.text', '1');
    cy.xpath(nextButton).click();
    cy.xpath(paginationNum('2')).should('have.text', '2');
    cy.xpath(paginationNum('51255')).click();
    cy.xpath(nextButton).should('not.enabled');
  });
  it("Verify Logout Functionality",function(){
    cy.xpath(avatarIcon).trigger('mouseover');
    cy.get(logoutButton).should('be.visible').click();
    cy.get(WelcomeBack).should('have.text','Welcome back!');
  });
  it("Verify that the graph is hidden when the Last Run tab is visible",function(){
     cy.xpath(lastRun).click();
     cy.get(graphHeading).should('not.exist');
      });
});