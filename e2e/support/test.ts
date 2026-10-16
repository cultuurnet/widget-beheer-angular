import { test as base, expect } from '@playwright/test';
import { FakeApi } from './fake-api';

/**
 * Use this `test` instead of the one from @playwright/test: it installs the
 * fake API before every test and fails on requests the fake doesn't handle.
 */
export const test = base.extend<{ api: FakeApi }>({
  api: [
    async ({ page }, use) => {
      const api = new FakeApi(page);
      await api.install();

      await use(api);

      expect(api.unhandled, 'API requests not handled by FakeApi').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
