export const avatarIcon = "//span[contains(@class, 'ant-avatar-icon')]";
export const logoutButton = '.log-out-button';

export const regionDropdown = "(//div[@class='ant-select-selector'])[1]";
export const regionOption = (region) => `//div[@class='ant-select-item-option-content'][normalize-space()='${region}']`;

export const countryDropdown = "(//div[@class='ant-select-selector'])[2]";
export const countryOption = (country) => `//div[@class='ant-select-item-option-content'][normalize-space()='${country}']`;

export const applyFilterButton = "//div[@class='flex gap-1']//button[1]";
export const overallValue = "//div[@class='flex gap-5 justify-between w-full']";

export const Last7Run = "//span[normalize-space()='Last 7 Runs']";
export const Explore = "(//span[contains(text(),'Explore')])[1]";
export const percentage = ".p-4 > .flex > p";
export const graphHeading = ".p-4 > .cursor-pointer";

export const switchToggle = ".ant-switch";
export const count = ".p-4 > .flex > p";

export const datePicker = "//input[@placeholder='Start date']";
export const datePickerStartLabel = "//input[@placeholder='Start date']";
export const datePickerStartDate = "//td[@title='2025-07-01']//div[@class='ant-picker-cell-inner'][normalize-space()='1']";
export const datePickerEndLabel = "//input[@placeholder='End date']";
export const datePickerEndDate = "//td[@title='2025-07-07']//div[@class='ant-picker-cell-inner'][normalize-space()='7']"; 
export const dateStartLabel = "input[placeholder='Start date']";
export const dateEndLabel = "input[placeholder='End date']";

export const datePickerEndDate1 = "//td[@title='2025-07-01']//div[@class='ant-picker-cell-inner'][normalize-space()='1']";

export const Categoryheading = (Category)=> `//div[normalize-space()='${Category}']`;
export const CategoryValue= (value)=> `//p[normalize-space()='${value}']`;

export const OverallQuality = "//div[@class='mb-4']";
export const OverallQualitysubheads = (overall)=> `//p[normalize-space()='${overall}']`;

export const dropdown1 ="(//div[@class='ant-select-selection-overflow'])[3]";

export const categorydropmonitor ="//div[normalize-space()='monitors']//input[@type='checkbox']";
export const categorydropdesktops ="//div[normalize-space()='desktops']//label[@class='ant-checkbox-wrapper css-1engpkn']";
export const type ="//div[@class='ant-select ant-select-outlined css-1engpkn ant-select-single ant-select-allow-clear ant-select-show-arrow']//div[@class='ant-select-selector']";
export const facets ="//div[@class='ant-select-item-option-content'][normalize-space()='facets']";
export const Incorrect ="//input[@value='yellow']";

export const CategoryDownload = "//img[@class='w-[30px] h-[30px] bg-[#335985] cursor-pointer p-[5px] rounded-md']";
export const CategoryRemoveFilter = "//div[@class='flex gap-5 justify-end items-center pr-4']//button[@type='button']//*[name()='svg']";
export const CategoryDownloadHistory ='[data-row-key="313"] > :nth-child(1)';

export const moreButton = "//span[normalize-space()='More']";
export const Perpage10 = "//span[@title='10 / page']";
export const Perpage50 ="//div[contains(text(),'50 / page')]";
export const Perpage100 = "//span[@title='100 / page']";
export const Perpage100click ="//div[contains(text(),'100 / page')]";
export const totalCount ="(//div[@class='font-bold text-[14px]'])[1]";
export const tableRowCount = "//tbody/tr";