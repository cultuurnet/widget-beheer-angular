// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'https://projectaanvraag-api.uitdatabank.dev/',
  widgetApi_currentVersion: 3,
  widgetApi_embedUrl_current: 'http://projectaanvraag-api.uitdatabank.dev/widgets/layout/:page_id.js',
  widgetApi_embedUrl_forceCurrent: 'https://projectaanvraag-api.uitdatabank.dev/widgets/layout/v3/:page_id.js',
  projectaanvraagDashboardUrl: 'https://projectaanvraag.uitdatabank.dev/',
  zendeskUrl: 'http://www.zendesk.com'
};
