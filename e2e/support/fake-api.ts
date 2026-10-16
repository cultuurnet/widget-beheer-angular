import { Page, Route } from '@playwright/test';
import {
  API_URL,
  DASHBOARD_URL,
  WidgetPageJson,
  appConfig,
  buildProject,
  buildUser,
} from '../fixtures/data';

export interface RecordedRequest {
  method: string;
  path: string;
  query: URLSearchParams;
  body: any;
}

/**
 * In-memory fake of the widget API, installed through page.route().
 *
 * Tests arrange state (user, project, widget pages) before navigating, and
 * assert on the recorded requests afterwards. Any request that isn't handled
 * is collected in `unhandled`, which fails the test (see support/test.ts).
 */
export class FakeApi {
  /** The logged-in user, or null to respond with 401. */
  user: Record<string, any> | null = buildUser();

  project: Record<string, any> = buildProject();

  /** HTTP status for the project request (e.g. 403 for no access). */
  projectStatus = 200;

  widgetPages: WidgetPageJson[] = [];

  widgetTypeDefaults: Record<string, any> = {};

  readonly requests: RecordedRequest[] = [];

  readonly unhandled: string[] = [];

  private nextPageId = 1;

  constructor(private page: Page) {}

  async install() {
    await this.page.route('**/assets/config.json', (route) =>
      route.fulfill({ json: appConfig })
    );
    await this.page.route(`${DASHBOARD_URL}**`, (route) =>
      route.fulfill({ contentType: 'text/html', body: '<h1>Dashboard</h1>' })
    );
    await this.page.route(`${API_URL}**`, (route) => this.handle(route));
  }

  /** Bodies of all widget page saves (PUT), oldest first. */
  savedPages(): WidgetPageJson[] {
    return this.requests
      .filter((r) => r.method === 'PUT' && r.path.endsWith('/widget-page'))
      .map((r) => r.body);
  }

  lastSavedPage(): WidgetPageJson | undefined {
    const saves = this.savedPages();
    return saves[saves.length - 1];
  }

  private async handle(route: Route) {
    const request = route.request();
    const url = new URL(request.url());
    const path = url.pathname.replace(/^\//, '');
    const method = request.method();
    const body = request.postData() ? request.postDataJSON() : undefined;

    this.requests.push({ method, path, query: url.searchParams, body });

    const response = this.respond(method, path, body);
    if (!response) {
      this.unhandled.push(`${method} ${path}`);
      return route.fulfill({ status: 404, json: { error: 'Not mocked' } });
    }

    return route.fulfill(response);
  }

  private respond(
    method: string,
    path: string,
    body: any
  ): Parameters<Route['fulfill']>[0] | undefined {
    let match: RegExpMatchArray | null;

    if (method === 'GET' && path === 'assets/css/cn_widget_styling.css') {
      return { contentType: 'text/css', body: '' };
    }

    if (method === 'GET' && path === 'uitid/user') {
      return this.user ? { json: this.user } : { status: 401, json: {} };
    }

    if (method === 'GET' && path === 'uitid/logout') {
      return { json: {} };
    }

    if (method === 'GET' && (match = /^project\/([^/]+)$/.exec(path))) {
      return this.projectStatus === 200
        ? { json: { ...this.project, id: match[1] } }
        : { status: this.projectStatus, json: {} };
    }

    if (method === 'GET' && path === 'widgets/api/widget-types') {
      return { json: this.widgetTypeDefaults };
    }

    if (
      method === 'GET' &&
      (match = /^widgets\/api\/project\/([^/]+)\/widget-page$/.exec(path))
    ) {
      const projectId = match[1];
      return {
        json: this.widgetPages.filter((p) => p.project_id === projectId),
      };
    }

    if (
      method === 'GET' &&
      (match = /^widgets\/api\/project\/[^/]+\/widget-page\/([^/]+)$/.exec(
        path
      ))
    ) {
      const page = this.findPage(match[1]);
      return page ? { json: page } : { status: 404, json: {} };
    }

    if (
      method === 'PUT' &&
      /^widgets\/api\/project\/[^/]+\/widget-page$/.test(path)
    ) {
      return { json: { widgetPage: this.savePage(body) } };
    }

    if (
      method === 'DELETE' &&
      (match = /^widgets\/api\/project\/[^/]+\/widget-page\/([^/]+)$/.exec(
        path
      ))
    ) {
      const id = match[1];
      this.widgetPages = this.widgetPages.filter((p) => p.id !== id);
      return { json: {} };
    }

    if (
      method === 'POST' &&
      /^widgets\/api\/project\/[^/]+\/widget-page\/[^/]+\/(publish|revert|upgrade)$/.test(
        path
      )
    ) {
      return { json: {} };
    }

    if (
      method === 'GET' &&
      (match = /^widgets\/api\/render\/[^/]+\/([^/]+)\/draft$/.exec(path))
    ) {
      return {
        json: {
          data: `<div data-testid="widget-render">Rendered widget ${match[1]}</div>`,
        },
      };
    }

    return undefined;
  }

  private findPage(id: string) {
    return this.widgetPages.find((p) => p.id === id);
  }

  private savePage(page: WidgetPageJson): WidgetPageJson {
    const saved = {
      ...page,
      id: page.id || `new-page-${this.nextPageId++}`,
      draft: true,
    };
    this.widgetPages = [
      ...this.widgetPages.filter((p) => p.id !== saved.id),
      saved,
    ];
    return saved;
  }
}
