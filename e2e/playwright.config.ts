import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

// Configurable so multiple worktrees can run the suite side by side.
const port = Number(process.env.E2E_PORT || 4200);
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: './specs',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [
        ['github'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
      ]
    : [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
      ],
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `yarn start --port ${port}`,
    cwd: path.resolve(__dirname, '..'),
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
