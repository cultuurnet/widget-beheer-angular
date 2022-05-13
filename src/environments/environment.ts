// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const getConfig = async () => await import('../assets/config.json');

type Environment = {
  production: boolean;
  apiUrl: string;
  widgetApi_currentVersion: string;
  widgetApi_embedUrl_current: string;
  widgetApi_embedUrl_forceCurrent: string;
  projectaanvraagDashboardUrl: string;
  zendeskUrl: string;
  publishers: string;
};

export let environment: Environment;

export const setEnvironmentFromConfig = async () => {
  const config = await getConfig();

  environment = {
    production: config.NG_APP_PRODUCTION,
    apiUrl: config.NG_APP_API_URL,
    widgetApi_currentVersion: config.NG_APP_WIDGET_API_CURRENT_VERSION,
    widgetApi_embedUrl_current: config.NG_APP_WIDGET_API_EMBED_URL_CURRENT,
    widgetApi_embedUrl_forceCurrent:
      config.NG_APP_WIDGET_API_EMBEDURL_FORCE_CURRENT,
    projectaanvraagDashboardUrl: config.NG_APP_PROJECTAANVRAAG_DASHBOARD_URL,
    zendeskUrl: config.NG_APP_ZENDESK_URL,
    publishers: config.NG_APP_PUBLISHERS,
  };
};
