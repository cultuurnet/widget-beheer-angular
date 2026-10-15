# REVIEW.md

Guidelines for reviewing pull requests in this repository. See `CLAUDE.md` for project context.

## Priorities

Focus on what matters most, in this order:

1. **Correctness**: logic errors, broken data flow between edit components and `widget.settings`, and unhandled API errors.
2. **Security**: unsanitized HTML (`[innerHTML]`, `SafeHTMLPipe`, `bypassSecurityTrust*`), especially for user-authored content from the HTML widget or CKEditor.
3. **Regressions** in existing widget types, layouts, page templates, drag & drop and saving/publishing pages.
4. **Maintainability**: consistency with existing patterns.

Don't comment on formatting or anything Prettier and ESLint already catch, because CI runs both.

## What to check

### Widgets, layouts, templates

- A new widget type has a model (extending `AbstractWidget`), an edit component (extending `BaseWidgetEditDirective`), is declared in `WidgetBuilderModule`, and is registered in `AppModule`.
- New settings have sensible defaults, and changing them doesn't break pages that were saved before the change (backwards-compatible settings shape).
- Edit component forms stay in sync with `widget.settings`.

### RxJS and lifecycle

- Subscriptions in components are cleaned up (`takeUntil`, `unsubscribe` in `ngOnDestroy`, or the `async` pipe), especially on long-lived `Subject`s in `WidgetBuilderService` and `TopbarService`.
- Use pipeable operators from `rxjs/operators`. Don't add new `rxjs-compat` style imports.
- Prefer Observables over new `.toPromise()` usage.
- Avoid nested subscribes when an operator (`switchMap`, `mergeMap`, `forkJoin`) fits.

### API and config

- API URLs are built from `environment.apiUrl`. Flag hard-coded hosts or URLs.
- Don't introduce build-time env vars (`process.env`, `NG_APP_*`). Config comes from the runtime `assets/config.json`.
- Use `MemoryCache` consistently where the service already caches. Check that the cache is invalidated after mutations.
- No stray `console.log` or debugging code.

### Templates and styling

- User-facing text goes through ngx-translate, with new keys added to `src/assets/i18n/nl.json`.
- Styles go in the global SCSS partials under `src/styles/`, following the existing structure. Reuse Bootstrap 4 utilities rather than adding custom CSS.
- Selectors use the `app` prefix.

### Dependencies

- Flag new dependencies. They must be compatible with Angular 13 and Node 16, and justified.
- Be cautious with changes around ng2-dragula 1.x and CKEditor 4. They are legacy and fragile.

## Tone and scope

- The project has no automated tests. When a change is risky, suggest concrete manual test steps instead of asking for unit tests.
- Keep comments actionable and specific. Skip nitpicks unless they hide a real problem.
- Don't request unrelated refactors or renames (e.g. existing typos in layout class names) in a feature or bug-fix PR.
- Check that the PR description follows the template (Added / Changed / Removed / Fixed, plus a ticket reference).
