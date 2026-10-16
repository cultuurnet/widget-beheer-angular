# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## End-to-end tests

Playwright tests live in `e2e/`. They run against `ng serve` with the whole backend faked in the browser (`e2e/support/fake-api.ts`), so no API or login is needed.

- `npx playwright install chromium` once, to download the browser
- `yarn e2e` to run the suite (starts the dev server if it isn't running)
- `yarn e2e:ui` for Playwright's interactive UI mode
- `E2E_PORT=4300 yarn e2e` to use another port, e.g. when running multiple worktrees

Write specs with the `test` from `e2e/support/test.ts`: it fails tests that make API calls the fake doesn't handle. Assert on what gets saved (`api.savedPages()`) rather than on implementation details, and keep editor interactions in page objects like `e2e/support/builder-page.ts`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
