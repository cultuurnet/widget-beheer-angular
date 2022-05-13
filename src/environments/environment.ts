// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import config from '../assets/config.json';

export const environment = {
  production: config.NG_APP_API_URL,
  apiUrl: config.NG_APP_API_URL,
  widgetApi_currentVersion: config.NG_APP_WIDGET_API_CURRENT_VERSION,
  widgetApi_embedUrl_current: config.NG_APP_WIDGET_API_EMBED_URL_CURRENT,
  widgetApi_embedUrl_forceCurrent:
    config.NG_APP_WIDGET_API_EMBEDURL_FORCE_CURRENT,
  projectaanvraagDashboardUrl: config.NG_APP_PROJECTAANVRAAG_DASHBOARD_URL,
  zendeskUrl: config.NG_APP_ZENDESK_URL,
  publishers: config.NG_APP_PUBLISHERS,
};
