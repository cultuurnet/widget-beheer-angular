# Removing @angular/platform-browser-dynamic

This document is an action plan for dropping `@angular/platform-browser-dynamic` from the project. It is the result of a read-only investigation of the code as it stands on `master` (Angular 13.2.0, yarn, Node 16.13). The work is a two-line source change plus a dependency removal, and it can be done **before** the Angular upgrade ladder starts — it does not require a newer Angular version.

The reason this matters: `@angular/platform-browser-dynamic` is not a companion to `@angular/platform-browser`, and it was never superseded by it. It is a separate opt-in package whose only job is to bootstrap the application through the **JIT** compiler. This app has been AOT-compiled since the CLI made AOT the default, so the package is doing nothing except adding a tenth `@angular/*` entry to the set of packages that must move in lockstep on every `ng update` hop.

## Summary

- `platformBrowserDynamic` is used in exactly one place: `src/main.ts:2` and `src/main.ts:17`.
- Nothing in the app needs runtime template compilation, so the JIT bootstrap can be swapped for the AOT one.
- The replacement, `platformBrowser()`, is already exported by the **v13** `@angular/platform-browser` that is installed — no version bump needed to make this change.
- `platformBrowserDynamic` is **deprecated as of Angular v20**, so this edit becomes mandatory partway up the ladder regardless. Doing it now is cheaper than doing it mid-upgrade.
- There is a **sequencing constraint**: `@angular/platform-server` declares `@angular/platform-browser-dynamic` as a peer dependency. See [Sequencing](#sequencing).
- This is **not** a bundle-size win, and it is **not** the standalone `bootstrapApplication` migration. See [What this does not change](#what-this-does-not-change).

## Why the package is here

It came from the scaffold and was never revisited. `git log -S` puts its introduction in `f647f83 chore: initial commit from @angular/cli`, and the only commits to touch `src/main.ts` since then are formatting, linting and the runtime-config work — none of which changed the bootstrap.

That is the expected history. In the View Engine era the CLI scaffolded `platformBrowserDynamic()` into every new app whether or not JIT was wanted, because AOT was opt-in via `ng build --aot`. Since CLI v12 AOT is the default for every configuration, including `ng serve`, and `angular.json` here sets no `aot` flag anywhere — so every build this project produces is already AOT.

The two packages do different things and always have:

| Package                             | Provides                                                                                                    | Needed here                                                                           |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `@angular/platform-browser`         | The browser platform: `BrowserModule`, `DomSanitizer`, `Title`, `Meta`, and the `platformBrowser()` factory | Yes — used at `app.module.ts:1`, `core/core.module.ts:12`, `core/safe-html.pipe.ts:2` |
| `@angular/platform-browser-dynamic` | The JIT bootstrap path only: `platformBrowserDynamic()`, which wires in the runtime template compiler       | No                                                                                    |

## Evidence that JIT is not in use

Checked against `src/` on `master`:

- **No runtime compilation APIs.** No `Compiler`, `COMPILER_OPTIONS`, `JitCompilerFactory`, `compileModuleAsync` or `createNgModule` anywhere in the codebase.
- **No runtime-string templates.** Components are all `templateUrl`-based. The one place HTML is injected at runtime is the widget preview, and it goes through `[innerHTML]` with the `safeHTML` pipe (`widget-builder/components/widgets/widget-preview.component.html:41-48`) — that is DOM insertion, not Angular compilation, and never touches the compiler.
- **No tests to migrate.** `src/` contains no `.spec.ts` files, so there is no `platformBrowserDynamicTesting` or `BrowserDynamicTestingModule` usage to convert. (The `angular-e2e` protractor project in `angular.json` points at an `e2e/` directory that does not exist on disk — a separate piece of dead config, out of scope here.)
- **The JIT compiler is already absent from the shipped bundle.** Grepping the production build in `dist/main.de3b05fadb40ab84.js` finds zero occurrences of `JitCompiler`, `R3TargetBinder`, `ResourceLoader` or `platformBrowserDynamic`. The CLI already strips it.

## The change

### Step 1 — swap the bootstrap in `src/main.ts`

Current:

```typescript
// src/main.ts:1-21
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {
  environment,
  setEnvironmentToConfig,
} from './environments/environment';

const main = async () => {
  await setEnvironmentToConfig();

  if (environment.production) {
    enableProdMode();
  }

  await platformBrowserDynamic().bootstrapModule(AppModule);
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
```

Two lines change — the import on line 2 and the call on line 17:

```typescript
import { platformBrowser } from '@angular/platform-browser';
...
  await platformBrowser().bootstrapModule(AppModule);
```

Nothing else in the file moves. The `setEnvironmentToConfig()` await, the `enableProdMode()` guard and the floating-promise suppression all stay exactly as they are.

`platformBrowser` is exported by the installed version — `node_modules/@angular/platform-browser/platform-browser.d.ts:522`:

```typescript
export declare const platformBrowser: (
  extraProviders?: StaticProvider[]
) => PlatformRef;
```

Under Ivy, `bootstrapModule()` on the static platform works directly with the AOT-compiled `AppModule`; there is no module factory to resolve and no `bootstrapModuleFactory()` variant to reach for.

### Step 2 — remove the dependency

Delete line 27 of `package.json`:

```json
"@angular/platform-browser-dynamic": "^13.2.0",
```

Then regenerate the lockfile and reinstall:

```
yarn install
```

Leave `@angular/compiler` (`package.json:22`) in place. It is still required by `@angular/compiler-cli`, which performs the AOT compilation at build time, and it remains a standard entry in `dependencies` in current Angular scaffolds.

### Step 3 — commit as its own change

Keep this separate from any other upgrade work so it can be reverted independently if the bootstrap misbehaves in an environment that was not tested locally.

## Sequencing

`@angular/platform-server` declares `@angular/platform-browser-dynamic` as a **peer dependency** (`node_modules/@angular/platform-server/package.json`, `peerDependencies`, pinned at `13.2.0`, not marked optional). Removing `platform-browser-dynamic` while `platform-server` is still listed will produce an unmet-peer warning on install.

`@angular/platform-server` is itself dead in this project — there is no server build target, no server entry point and no SSR anywhere; see the separate analysis of that package. Two ways to avoid the warning:

1. **Preferred** — remove `@angular/platform-server` first (or in the same commit). It has no usages, so nothing depends on the ordering beyond the peer warning itself.
2. Remove `platform-browser-dynamic` second, after `platform-server` is gone.

If for any reason `platform-server` has to stay, the warning is cosmetic — nothing imports the dynamic platform at runtime — but it is noise in CI logs and better avoided.

## Verification

There are no automated tests in this repository, so verification is manual. In order:

1. `yarn lint:check` and `yarn types:check` — catches a mistyped import immediately.
2. `yarn build` — an AOT production build. If anything in the app secretly depended on runtime compilation, this is where it surfaces; AOT was already the default, so a green build here is a strong signal.
3. `yarn start` and load the app — confirm it bootstraps at all. A JIT-only dependency would fail loudly at bootstrap with a "runtime compiler is not loaded" style error rather than degrading quietly.
4. Exercise the widget builder specifically: open a project, open a widget page, add a row, add a widget, edit a widget, save. The CKEditor integration (`ng2-ckeditor`, plus the global `ckeditor.js` script loaded from `src/index.html`) and the dynamically created layout components (`viewContainerRef.createComponent` in `row-preview.component.ts:76-87`) are the two places most worth a look — dynamic _component creation_ does not need the compiler under Ivy, but they are the parts of the app furthest from a plain template, so they are cheap insurance.
5. Confirm the Jenkins `jenkins` build configuration still produces an artifact. The pipeline runs `bundle exec rake build` then `rake build_artifact`; the output is static files packaged into an Aptly snapshot, so nothing about the bootstrap change touches packaging or deployment.

## What this does not change

- **Bundle size.** The JIT compiler is already excluded from the AOT production build (verified against `dist/`, see [Evidence](#evidence-that-jit-is-not-in-use)). Do not expect a measurable win, and do not sell this change on that basis. The payoff is one fewer package in the version-lockstep set and one fewer deprecated API to trip over on the way to v20.
- **NgModules.** `AppModule` and every other module stay exactly as they are. This is deliberately the cheap intermediate step.
- **The standalone migration.** The modern endpoint is `bootstrapApplication()` from `@angular/platform-browser`, which removes `AppModule` entirely and turns its `imports` into application-level providers. Given how much `app.module.ts` currently carries — five layout components, every widget edit component, the registries, `TranslateModule.forRoot`, `NgbModule`, `ToastyModule.forRoot` and the registry-populating constructor — that is a real refactor and a separate decision. Do not bundle it into this change.

## Rollback

Revert the commit. The change touches two lines of `src/main.ts` and one line of `package.json`, with no data migration, no config change and no build-pipeline change, so a revert restores the previous behaviour completely.

## Notes for the upgrade ladder

- Once this lands, the `@angular/*` lockstep set drops from ten packages to nine — or to eight alongside the `@angular/platform-server` removal, and to seven if `@angular/animations` goes too (also unused; see the separate analysis).
- When the ladder later reaches v20, `platformBrowserDynamic` is deprecated there. Having already moved to `platformBrowser` means `ng update` has nothing to migrate at that hop and no deprecation warnings to triage.
- The parallel testing APIs (`platformBrowserDynamicTesting` → `platformBrowserTesting`, `BrowserDynamicTestingModule` → `BrowserTestingModule`) are deprecated on the same schedule. They are irrelevant today because there are no tests, but if characterisation tests are added before the ladder starts — as the drag-and-drop migration document recommends — write them against the `@angular/platform-browser/testing` APIs from the outset rather than the dynamic ones.
