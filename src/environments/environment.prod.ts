export const environment = {
  production: true,
  apiUrl: 'http://widgetbeheer-api-test.uitdatabank.be/',
  widgetApi: {
    currentVersion: 3,
    embedUrl: {
      current: 'http://widgetbeheer-api-test.uitdatabank.be/widgets/layout/:page_id.js',
      legacy: 'http://widgetbeheer-api-test.uitdatabank.be/widgets/layout/v2/:page_id.js',
    }
  },
  projectaanvraagDashboardUrl: 'https://projectaanvraag.uitdatabank.be/'
};
