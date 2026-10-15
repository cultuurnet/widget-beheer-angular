# CLAUDE.md

Widgetbeheer frontend: the Angular admin app where publiq/UiTdatabank customers build and configure embeddable widget pages (search form, search results, facets, html, tips) for their projects. Backend is the **projectaanvraag API**.

## Stack

- Angular 13, TypeScript 4.5, RxJS 6, Node `^16.13`, yarn
- Bootstrap 4.6 (SCSS) + ng-bootstrap 11 + FontAwesome 5
- ngx-translate (Dutch only: `src/assets/i18n/nl.json`)
- Legacy libs: ng2-dragula 1.x (drag & drop), ng2-ckeditor + vendored CKEditor 4 (`src/assets/libraries/ckeditor`), ng2-toasty, lodash, deepmerge, urijs

## Commands

```bash
yarn start          # dev server on http://localhost:4200
yarn build          # production build to dist/
yarn lint:check     # ESLint (CI)
yarn format:check   # Prettier (CI)
yarn types:check    # tsc --noEmit
```

There are **no tests** (no spec files, no test runner). The `angular-e2e` target in `angular.json` is dead config. CI (GitHub Actions) only runs Prettier and ESLint; Jenkins builds with `--configuration=jenkins` and packages a `.deb`.

## Architecture

- `src/app/app.module.ts` — root module. Its constructor **registers all widget types, layouts and page templates**, then loads widget default settings from the API.
- `src/app/core/` — singletons: registries, factories, services (`WidgetService`, `UserService`, `ProjectService`), `MemoryCache`, `ApiRequestInterceptor` (adds `withCredentials` for cookie auth), `AuthGuard`, resolvers, topbar and shared components. There is no separate shared module.
- `src/app/widget-builder/` — the single feature module: builder, edit, layout and modal components, plus `WidgetBuilderService`.
- No lazy loading, no NgRx. Cross-component state uses RxJS `Subject`s in `WidgetBuilderService` and `TopbarService`.

### Routes

All under `project/:project_id` (guarded by `AuthGuard`): the builder, `page/add`, `page/:page_id/edit`, `page/:page_id/revert`.

### Registries

- **Widget types**: `core/widget/services/widget-type-registry.service.ts` → `register(id, label, WidgetClass, EditComponent)`.
  - Models: `core/widget/widgets/*/*.widget.ts`, extending `abstract-widget.ts`.
  - Edit components: `widget-builder/components/widgets/*/*-edit.component.ts`, extending `BaseWidgetEditDirective`. Their reactive form writes to `widget.settings` on `valueChanges`.
  - Edit components are created dynamically via `ComponentFactoryResolver`.
- **Layouts**: `core/layout/services/layout-type-registry.service.ts` (models in `core/layout/layouts`, components in `widget-builder/components/layouts`).
- **Page templates**: `core/template/services/page-template-registry.service.ts`.

**Adding a widget type:** create the model class and edit component, declare the component in `WidgetBuilderModule`, and register it in `AppModule`.

### Configuration

Runtime config, not build-time. `src/main.ts` fetches `/assets/config.json` (via `setEnvironmentToConfig()` in `src/environments/environment.ts`) before bootstrapping; each environment overrides that file. API URLs are built as `environment.apiUrl + '...'`. `@ngx-env/builder` and `src/process.d.ts` (`NG_APP_*`) are leftovers — nothing reads `process.env`.

### Styling

All styles are global, in `src/styles/style.scss` and its partials (`00_base`, `01_layout`, `02_components`, `05_helpers`). Components have no `styleUrls`; don't add component styles unless there's a reason.

## Conventions

- Selector prefix `app` (kebab-case elements, camelCase attribute directives), enforced by ESLint.
- Prettier with single quotes; run `yarn format` before committing.
- File naming: `*.widget.ts`, `*.layout.ts`, `*-edit.component.ts`, `*-modal.component.ts`. Abstract base classes are `@Directive()` classes named `*Directive`.
- Services return Observables using pipeable operators from `rxjs/operators`. Prefer Observables over `.toPromise()` in new code.
- `baseUrl` is `src`, so `app/...` absolute imports are allowed alongside relative imports.
- `strictTemplates` is on.
- User-facing strings go through ngx-translate (`nl.json`), not hard-coded Dutch.
- Some class names contain typos (`OneCollLayout`, `TwoColSidebarRightayout`, `ThreeColTrippleLayout`). Don't rename them as a drive-by change.
