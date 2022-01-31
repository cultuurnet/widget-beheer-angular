// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const environment = {
  production: process.env.NG_APP_PRODUCTION,
  apiUrl: process.env.NG_APP_API_URL,
  widgetApi_currentVersion: process.env.NG_APP_WIDGET_API_CURRENT_VERSION,
  widgetApi_embedUrl_current: process.env.NG_APP_WIDGET_API_EMBED_URL_CURRENT,
  widgetApi_embedUrl_forceCurrent:
    process.env.NG_APP_WIDGET_API_EMBEDURL_FORCE_CURRENT,
  projectaanvraagDashboardUrl: process.env.NG_APP_PROJECTAANVRAAG_DASHBOARD_URL,
  zendeskUrl: process.env.NG_APP_ZENDESK_URL,
  publishers: process.env.NG_APP_PUBLISHERS,
};
