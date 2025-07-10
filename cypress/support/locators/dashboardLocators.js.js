export const avatarIcon = "//span[contains(@class, 'ant-avatar-icon')]";
export const logoutButton = '.log-out-button';


export const regionDropdown = "(//div[@class='ant-select-selector'])[1]";
export const regionOption = (region) => `//div[@class='ant-select-item-option-content'][normalize-space()='${region}']`;

export const countryDropdown = "(//div[@class='ant-select-selector'])[2]";
export const countryOption = (country) => `//div[@class='ant-select-item-option-content'][normalize-space()='${country}']`;

export const overallQualityHeading = "div.mb-4";
export const percentageValue = "//p[normalize-space()='99.485%']";

export const applyFilterButton = "//div[@class='flex gap-1']//button[1]";