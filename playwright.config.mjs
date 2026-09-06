import { defineConfig, devices } from '@playwright/test'
export default defineConfig({
  testDir: './tests', testMatch: '**/*.spec.mjs', timeout: 30000,
  fullyParallel: true, workers: 3,
  reporter: [['list']],
  use: { baseURL: 'http://127.0.0.1:8080', trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ],
  webServer: { command: 'npm run dev', url: 'http://127.0.0.1:8080', reuseExistingServer: !process.env.CI }
})
