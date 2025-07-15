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
