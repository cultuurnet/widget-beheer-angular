/**
 * Configuration for development.
 */
export const environment = {
  production: false,
  apiUrl: 'http://projectaanvraag-api.dev/',
  widgetApi: {
    currentVersion: 3,
    embedUrl: {
      current: 'http://projectaanvraag-api.dev/widgets/layout/:page_id.js',
      force_current: 'http://projectaanvraag-api.dev/widgets/layout/v3/:page_id.js',
    }
  },
  projectaanvraagDashboardUrl: 'https://projectaanvraag.uitdatabank.be/',
  zendeskUrl: 'http://www.zendesk.com'
};
