const getConfig = async () => {
  try {
    const data = await fetch('/assets/config.json');
    return await data.json();
  } catch (err) {
    console.error('Failed to load config', err);
    return {};
  }
};

type Environment = {
  production: boolean;
  apiUrl: string;
  widgetApi_currentVersion: string;
  widgetApi_embedUrl_current: string;
  widgetApi_embedUrl_forceCurrent: string;
  projectaanvraagDashboardUrl: string;
  platformLogoutUrl: string,
  platformUrl: string,
  zendeskUrl: string;
  publishers: string;
};

export let environment: Environment;

export const setEnvironmentToConfig = async () => {
  const config = await getConfig();

  environment = {
    production: config.production,
    apiUrl: config.apiUrl,
    widgetApi_currentVersion: config.widgetApi_currentVersion,
    widgetApi_embedUrl_current: config.widgetApi_embedUrl_current,
    widgetApi_embedUrl_forceCurrent: config.widgetApi_embedUrl_forceCurrent,
    projectaanvraagDashboardUrl: config.projectaanvraagDashboardUrl,
    platformLogoutUrl: config.platformLogoutUrl,
    platformUrl: config.platformUrl,
    zendeskUrl: config.zendeskUrl,
    publishers: config.publishers,
  };
};
