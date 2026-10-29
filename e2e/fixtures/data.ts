/**
 * Test data builders for API responses.
 *
 * NOTE: these shapes are derived from the frontend models (WidgetPage, Layout,
 * Widget, Project, User). Verify them against recorded responses of the real
 * API and update where they differ.
 */

export const API_URL = 'http://api.test/';
export const DASHBOARD_URL = 'http://dashboard.test/';
export const CURRENT_WIDGET_VERSION = 3;

/** Replaces src/assets/config.json, so the app never talks to a real API. */
export const appConfig = {
  production: false,
  apiUrl: API_URL,
  widgetApi_currentVersion: String(CURRENT_WIDGET_VERSION),
  widgetApi_embedUrl_current: `${API_URL}widgets/layout/:page_id.js`,
  widgetApi_embedUrl_forceCurrent: `${API_URL}widgets/layout/v3/:page_id.js`,
  projectaanvraagDashboardUrl: DASHBOARD_URL,
  zendeskUrl: 'http://zendesk.test/',
  publishers: 'UiT,UiTMetVlieg',
  platformUrl: 'http://platform.test/',
  platformIsLive: false,
};

export interface WidgetJson {
  id: string;
  type: string;
  name: string;
  settings: Record<string, any>;
}

export interface RowJson {
  type: string;
  regions: Record<string, { widgets: WidgetJson[] }>;
}

export interface WidgetPageJson {
  id: string;
  project_id: string;
  title: string;
  version: number;
  draft: boolean;
  language: string;
  css: string;
  rows: RowJson[];
  [key: string]: any;
}

export const buildUser = (overrides: Record<string, any> = {}) => ({
  id: 'user-1',
  nick: 'testuser',
  givenName: 'Test User',
  mbox: 'test@example.com',
  roles: [],
  ...overrides,
});

export const buildProject = (overrides: Record<string, any> = {}) => ({
  id: 'project-1',
  name: 'Test project',
  ...overrides,
});

export const buildWidget = (
  overrides: Partial<WidgetJson> & Pick<WidgetJson, 'id' | 'type'>
): WidgetJson => ({
  name: `${overrides.type}-widget`,
  settings: {},
  ...overrides,
});

export const buildRow = (
  type: string,
  regions: Record<string, WidgetJson[]> = {}
): RowJson => ({
  type,
  regions: Object.fromEntries(
    Object.entries(regions).map(([region, widgets]) => [region, { widgets }])
  ),
});

export const buildWidgetPage = (
  overrides: Partial<WidgetPageJson> = {}
): WidgetPageJson => ({
  id: 'page-1',
  project_id: 'project-1',
  title: 'Test page',
  version: CURRENT_WIDGET_VERSION,
  draft: false,
  language: 'nl',
  css: '',
  rows: [],
  ...overrides,
});
