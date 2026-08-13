import { test as base, expect } from '@playwright/test';
import { Web3FormsMock, setupWeb3FormsMock } from './web3forms.mock';
import { ScrollHelper, createScrollHelper } from './scroll.helper';

export interface CustomFixtures {
  web3formsMock: Web3FormsMock;
  scrollHelper: ScrollHelper;
}

export const test = base.extend<CustomFixtures>({
  web3formsMock: async ({ page }, use) => {
    const mock = await setupWeb3FormsMock(page);
    await use(mock);
  },
  scrollHelper: async ({ page }, use) => {
    const helper = createScrollHelper(page);
    await use(helper);
  },
});

export { expect };
