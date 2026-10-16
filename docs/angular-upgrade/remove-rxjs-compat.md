# Removing rxjs-compat

This document is an action plan for dropping `rxjs-compat` from the project. It is the result of a read-only investigation of the code as it stands on `master` (Angular 13.2.0, `rxjs@6.6.7`, `rxjs-compat@6.6.7`, yarn, Node 16.13), plus one reversible build experiment described in [Proof by removal](#proof-by-removal).

The reason this matters: unlike the other pre-ladder cleanups, **this one is not a source change at all**. Not a single file in `src/` imports anything that `rxjs-compat` provides — the rxjs 5 → 6 source migration was completed properly in 2019. The package survives to satisfy exactly one third-party dependency, `ng2-toasty`, which still imports the rxjs 5 deep paths. That makes "remove `rxjs-compat`" a rename of a different task: **replace `ng2-toasty`**.

It also means the rxjs 7 hop is **blocked**, not merely more expensive. `rxjs-compat` was never published for v7 and the forwarding stubs it hooks into do not exist in v7, so there is no version of the stack in which `ng2-toasty` and rxjs 7 coexist.

## Summary

- **Nothing in `src/` needs it.** All 25 rxjs imports across the codebase already use the rxjs 6+ idiom (`from 'rxjs'`, `from 'rxjs/operators'`). See [Evidence that the application does not need it](#evidence-that-the-application-does-not-need-it).
- **`ng2-toasty` is the only consumer.** It imports `rxjs/Subject` and `rxjs/Observable` — rxjs 5 paths that only resolve because `rxjs-compat` is installed. See [Evidence that ng2-toasty does need it](#evidence-that-ng2-toasty-does-need-it).
- **Verified by removal**, not by inference: hiding `node_modules/rxjs-compat` and building produces exactly one error, and it points straight at that chain. See [Proof by removal](#proof-by-removal).
- **There is a verification trap.** `yarn types:check` passes with `rxjs-compat` absent, because `tsconfig.json` sets `skipLibCheck: true`. Only the bundler catches this. See [Verification](#verification).
- **rxjs 7 is a hard blocker, not extra work.** `rxjs-compat`'s last release is `6.6.7`; rxjs 7 ships zero compat stubs. See [Why rxjs 7 makes this mandatory](#why-rxjs-7-makes-this-mandatory).
- **`ng2-toasty` blocks Angular 16 independently.** It is a View Engine package that only works because ngcc rewrites it, and ngcc stops running at v16. See [ng2-toasty is a v16 blocker anyway](#ng2-toasty-is-a-v16-blocker-anyway).
- **This is not a bundle win.** The compat shim that actually ships is 176 bytes. Sell it on unblocking two ladder hops, not on size. See [What this does not change](#what-this-does-not-change).
- The API surface to replace is tiny — two methods, 14 call sites — but the **styling** is the real work: 168 lines of vendored toasty CSS. See [The change](#the-change).

## What rxjs-compat actually does

rxjs 6 moved every export to two entry points, `rxjs` and `rxjs/operators`, and deleted the rxjs 5 layout in which each class had its own top-level module. To let large codebases upgrade incrementally, the rxjs team kept the old paths alive as **forwarding stubs inside the `rxjs` package itself**, each one re-exporting from a separately installed `rxjs-compat`.

The chain is two hops. `node_modules/rxjs/Subject.js`:

```javascript
'use strict';
function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
__export(require('rxjs-compat/Subject'));
```

and `node_modules/rxjs-compat/Subject.js`, which lands back in rxjs 6 proper:

```javascript
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var rxjs_1 = require('rxjs');
exports.Subject = rxjs_1.Subject;
```

The typings mirror it — `node_modules/rxjs/Subject.d.ts` is a single line, `export * from 'rxjs-compat/Subject';`.

Two consequences follow from this shape, and both matter later:

1. **The stubs live in `rxjs`, not in `rxjs-compat`.** So `import { Subject } from 'rxjs/Subject'` looks like a plain rxjs import to a reader and to most tooling. Nothing about the import site reveals that a second package is load-bearing.
2. **`rxjs-compat` declares no peer dependency on `rxjs`** (`node_modules/rxjs-compat/package.json` has no `peerDependencies` and no `dependencies` at all). There is nothing for a package manager to warn about in either direction. The coupling is invisible to `yarn install`.

`rxjs-compat` also patches the rxjs 5 prototype operators (`Observable.prototype.map` and friends) and the static creation methods (`Observable.of`, `Observable.throw`) when its `Rx.js` entry point is loaded. None of that is reached here — see below.

## Why the package is here

It was added as scaffolding for a migration that then completed, and was never removed afterwards.

`git log -S` gives a single commit, `ab90e7f WID-209 - upgrade rxjs to v6, + fix typescript compile errors` (18 July 2019), which changed `package.json` like this:

```diff
-    "rxjs": "^5.5.12",
+    "rxjs": "^6.0.0",
+    "rxjs-compat": "^6.5.2",
```

The same commit touched **18 files under `src/`** — every rxjs consumer in the app at the time — converting chained operators to `.pipe()` and rewriting the imports. In other words, the compat package was installed as a safety net and the migration it was meant to cover was finished in the same change. Its only remaining job from day one was the third-party code the commit could not rewrite.

The corroborating fingerprint is already in the build config. `angular.json:22-27`:

```json
"allowedCommonJsDependencies": [
  "lodash",
  "urijs",
  "rxjs/Subject",
  "ng2-dragula"
],
```

`rxjs/Subject` is on that list because the CommonJS stub above trips the CLI's ESM warning. Nothing in `src/` imports it, so this entry has only ever been about `ng2-toasty`.

## Evidence that the application does not need it

Checked against `src/` on `master`.

**Every rxjs import is already rxjs 6+ idiomatic.** All 25 of them resolve to one of the two modern entry points:

| Import specifier                                               | Sites |
| -------------------------------------------------------------- | ----- |
| `from 'rxjs'` (`Observable`, `Subject`, `Subscription`, `of`)  | 17    |
| `from 'rxjs/operators'` (`map`, `tap`, `catchError`, `filter`) | 8     |

There are no imports of `rxjs/Observable`, `rxjs/Subject`, `rxjs/Rx`, `rxjs/add/*`, `rxjs/operator/*` or any other rxjs 5 path anywhere in `src/`.

**No prototype-patched operators.** Grepping for chained operator calls on observables — `.map(`, `.filter(`, `.switchMap(`, `.mergeMap(`, `.flatMap(`, `.catch(`, `.do(`, `.finally(`, `.first(`, `.debounceTime(`, `.distinctUntilChanged(`, `.takeUntil(`, `.withLatestFrom(`, `.combineLatest(`, `.share(`, `.startWith(` — returns nothing. Every operator in the codebase goes through `.pipe()`.

**No rxjs 5 static creation methods.** No `Observable.of`, `Observable.throw`, `Observable.fromPromise`, `Observable.forkJoin`, `Observable.combineLatest`, `Observable.merge`, `Observable.empty`, `Observable.create`, `Observable.interval`, `Observable.timer` or `Observable.from`. The one creation helper in use is imported as a function and aliased, e.g. `src/app/core/user/services/user.service.ts:2`:

```typescript
import { of as observableOf, Observable } from 'rxjs';
```

**Nothing loads the compat entry point.** `src/polyfills.ts` contains no `import 'rxjs/Rx'` or `import 'rxjs-compat'`, so the prototype patching never even runs. The only file reached inside the package is `Subject.js`.

## Evidence that ng2-toasty does need it

Scanned every package in `node_modules` for rxjs 5 deep imports, in both CommonJS (`require('rxjs/…')`) and ESM (`from 'rxjs/…'`) form, excluding `rxjs` and `rxjs-compat` themselves. One package matches:

| File                                              | Import                                         |
| ------------------------------------------------- | ---------------------------------------------- |
| `ng2-toasty/src/toasty.service.js:6`              | `import { Subject } from 'rxjs/Subject'`       |
| `ng2-toasty/__ivy_ngcc__/src/toasty.service.js:6` | `import { Subject } from 'rxjs/Subject'`       |
| `ng2-toasty/src/toasty.service.d.ts:1`            | `import { Observable } from 'rxjs/Observable'` |
| `ng2-toasty/config/…`                             | `require('rxjs/Subject')`                      |

Worth noting what did **not** match, since these are the other elderly dependencies and the obvious suspects:

- `ng2-dragula@1.5.0` — no rxjs imports at all. Its replacement is tracked separately in [dragula-to-cdk-drag-drop.md](./dragula-to-cdk-drag-drop.md), and that migration neither helps nor hinders this one.
- `ng2-ckeditor@1.3.6` — no rxjs imports.
- `ngx-clipboard@14.0.2` — no rxjs imports.
- `@ngx-translate/core@14.0.0` — imports `rxjs/operators`, which is a valid rxjs 6 **and** rxjs 7 entry point. Not a compat path.

So the dependency graph on `rxjs-compat` has exactly one edge, and `npm ls` confirms it is a direct dependency with no other parent:

```
angular@0.0.0 /Users/…/widget-beheer-angular
└── rxjs-compat@6.6.7
```

## Proof by removal

Inference from grepping is not quite proof, because the forwarding stubs make the coupling invisible at the import site. So it was tested directly: `node_modules/rxjs-compat` was moved aside, `npx ng build` was run, and the directory was restored in the same command. The build produced **one** error:

```
./node_modules/rxjs/Subject.js:13:9-39 - Error: Module not found:
Error: Can't resolve 'rxjs-compat/Subject' in '…/node_modules/rxjs'
```

That is the whole failure surface. One module, one resolution failure, on the `ng2-toasty` chain. No error anywhere in `src/`, and no second consumer hiding in the dependency tree.

**Do not use `yarn types:check` to check this.** With `rxjs-compat` hidden, `npx tsc --noEmit` exits `0`. The reason is `tsconfig.json:16`:

```json
"skipLibCheck": true,
```

The only place the missing module is referenced in a type position is inside `rxjs/Subject.d.ts` and `ng2-toasty`'s `.d.ts` files — declaration files, which `skipLibCheck` tells TypeScript not to check. A green type check is therefore no evidence at all here. This is the single most likely way to get this change wrong: remove the dependency, watch `types:check` and `lint:check` both pass, commit, and discover it in CI at build time.

## Why rxjs 7 makes this mandatory

Two facts, both verified against the registry rather than from memory.

**`rxjs-compat` stopped at 6.6.7.** `npm view rxjs-compat dist-tags` returns:

```
{ beta: '6.0.0-beta.4', latest: '6.6.7', rc: '6.0.0-uncanny-rc.7' }
```

There is no 7.x, and there never will be. The compat layer was a migration aid for one specific version boundary and was retired with it.

**rxjs 7 ships no forwarding stubs.** Unpacking `rxjs@7.8.1` and listing its top-level modules returns **zero** files matching `package/<Capitalised>.js` — no `Subject.js`, no `Observable.js`, no `Rx.js`. The first hop of the chain described in [What rxjs-compat actually does](#what-rxjs-compat-actually-does) simply does not exist in v7.

Put together: on rxjs 7, `import { Subject } from 'rxjs/Subject'` fails to resolve and there is no package that can make it resolve. `ng2-toasty` has to be gone **before** the rxjs 7 bump, not alongside it.

The rest of the stack is already ready. Every dependency that declares an rxjs peer range accepts v7:

| Package                                      | Version | Declared rxjs peer                             |
| -------------------------------------------- | ------- | ---------------------------------------------- |
| `@angular/core`, `common`, `forms`, `router` | 13.2.0  | `^6.5.3 \|\| ^7.4.0`                           |
| `@ng-bootstrap/ng-bootstrap`                 | 11.0.0  | `^6.5.3 \|\| ^7.4.0`                           |
| `@ngx-translate/core`                        | 14.0.0  | `^6.5.3 \|\| ^7.4.0`                           |
| `@ngx-translate/http-loader`                 | 7.0.0   | `^6.5.3 \|\| ^7.4.0`                           |
| `ng2-toasty`                                 | 4.0.3   | none declared — but hard-requires rxjs 5 paths |

Angular 13 supports rxjs 7 natively; `ng2-toasty` is the only thing standing in the way.

## ng2-toasty is a v16 blocker anyway

This is the argument that should decide the sequencing, because it means the work has to happen regardless of what is decided about rxjs 7.

`ng2-toasty@4.0.3` is a **View Engine** package. `node_modules/ng2-toasty/package.json` declares:

```json
"peerDependencies": {
  "@angular/core": "^2.4.7 || ^4.0.0"
}
```

It has not been republished since — `npm view ng2-toasty version` returns `4.0.3`. It works in this project only because ngcc rewrote it in place at install time, which the same file records:

```json
"__processed_by_ivy_ngcc__": {
  "module": "13.2.0",
  "typings": "13.2.0"
}
```

That rewriting stops at Angular 16. `@angular/compiler-cli@16` still ships an `ngcc` binary, but it is a stub that prints a notice and exits:

```
ALERT: As of Angular 16, "ngcc" is no longer required and not invoked during
CLI builds. You are seeing this message because the current operation invoked
the "ngcc" command directly. This "ngcc" invocation can be safely removed.

In Angular 17, this command will be removed.
```

(from `@angular/compiler-cli@16.2.12`, `bundles/ngcc/index.js`.)

With no ngcc, a View Engine library is not consumable by an Ivy build at all. So `ng2-toasty` has to be replaced somewhere between here and v16 whatever happens with rxjs — and replacing it is what removes `rxjs-compat`. The two blockers collapse into one task.

There is a scheduling consequence worth stating plainly: this is a **v16 blocker being resolved early**, not an optional pre-ladder tidy-up like the `core-js` or `@angular/platform-browser-dynamic` removals. If it is deferred, it will have to be done mid-ladder, at the same hop that also retires `polyfills.ts` (see [version16/global-window-shim.md](./version16/global-window-shim.md)) and drops the `ES5` target. Doing it now, on a stationary v13, is considerably cheaper.

## What has to be replaced

The `ToastyService` API is broad — `default`, `info`, `success`, `wait`, `error`, `warning`, `clear`, `clearAll`, an `events` observable, per-toast `ToastOptions` with `onAdd`/`onRemove`/`onClick` callbacks, and three themes. Almost none of it is used.

Actual usage on `master`:

| What                                                | Where                                                                                                            |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `ToastyModule.forRoot()`                            | `src/app/app.module.ts:66`                                                                                       |
| `ToastyConfig` injected, `timeout` + `position` set | `src/app/app.module.ts:85`, `:173-174`                                                                           |
| `<ng2-toasty></ng2-toasty>` container               | `src/app/app.component.html:2`                                                                                   |
| `toastyService.success(string)`                     | 9 call sites                                                                                                     |
| `toastyService.error(string)`                       | 5 call sites                                                                                                     |
| Vendored toasty CSS                                 | `src/styles/02_components/_messages.scss` (168 lines), imported via `src/styles/02_components/components.scss:2` |

The 14 call sites are spread over five files:

- `src/app/core/topbar/components/topbar.component.ts:151`
- `src/app/widget-builder/components/toolbar/toolbar.component.ts:221`, `:281`, `:306`, `:333`
- `src/app/widget-builder/components/revert-widgetpage/revert-widget-page.component.ts:72`, `:86`
- `src/app/widget-builder/components/json-edit/json-edit.component.ts:64`
- `src/app/widget-builder/components/page-list/page-list.component.ts:118`, `:155`, `:162`, `:192`, `:219`, `:248`, `:255`

Every one of them passes a **single plain string**, and twelve of the fourteen get it straight from `translateService.instant(...)`. The exceptions are two interpolated strings, `toolbar.component.ts:333-335`:

```typescript
this.toastyService.success(
  `Thema: ${this.widgetPage.selectedTheme as string} ingesteld`
);
```

and `page-list.component.ts:219-223`, which prefixes a translation with `widgetPage.language`. Both are still plain strings.

Three things are worth checking off explicitly, because they are what usually makes a toast migration awkward and none of them apply:

- **No `ToastOptions` objects.** No titles, no per-toast timeouts, no `onClick` handlers, no custom themes. `ToastyConfig.theme` is never set, so every toast renders with the default theme.
- **No HTML in messages.** All fourteen strings resolve to plain text — checked against `src/assets/i18n/nl.json`, which is the only translation file. `ng2-toasty` pipes `msg` through its own `SafeHtmlPipe`, so HTML _would_ have rendered; nothing relies on that. A replacement can keep HTML escaping on (which is the safer default) without any visual change.
- **Nothing subscribes to `ToastyService.events`.** The observable that requires `rxjs/Observable` in the typings is not used by the app at all.

So the code migration is mechanical. The 168 lines of CSS are the part that needs actual attention.

## Choosing a replacement

Three options, in the order they are worth considering.

### Option A — `ngx-toastr` (recommended)

The de facto successor, actively maintained, and a near one-to-one API match.

For Angular 13, pin **`ngx-toastr@14.3.0`** (peer: `@angular/core >=12.0.0-0`). Do **not** take `latest` — that is currently 20.x and targets a much newer Angular.

The mapping:

| `ng2-toasty`                          | `ngx-toastr`                                                                |
| ------------------------------------- | --------------------------------------------------------------------------- |
| `ToastyModule.forRoot()`              | `ToastrModule.forRoot({ timeOut: 5000, positionClass: 'toast-top-right' })` |
| `ToastyConfig.timeout = 5000`         | `timeOut: 5000` in `forRoot`                                                |
| `ToastyConfig.position = 'top-right'` | `positionClass: 'toast-top-right'` in `forRoot`                             |
| `<ng2-toasty></ng2-toasty>`           | nothing — the container is injected into `<body>`                           |
| `ToastyService`                       | `ToastrService`                                                             |
| `.success(msg)` / `.error(msg)`       | `.success(msg)` / `.error(msg)`                                             |

Because the config moves into `forRoot()`, the `ToastyConfig` injection and the whole `setToastyDefaultSettings()` method in `app.module.ts:172-175` disappear, along with the `afterInit()` call to it on line 165.

**One caveat that interacts with another planned change.** `ngx-toastr`'s bundle imports `@angular/animations` at the top level (`fesm2015/ngx-toastr.mjs:3` — `trigger`, `state`, `style`, `transition`, `animate`) and its default toast component needs `BrowserAnimationsModule` or `NoopAnimationsModule` in the app. Right now `src/` imports neither, and `@angular/animations` is a declared-but-unused dependency slated for removal (noted in [remove-platform-browser-dynamic.md](./remove-platform-browser-dynamic.md)). Adopting `ngx-toastr` **keeps `@angular/animations` load-bearing** and adds one module import to `app.module.ts`. Using `ToastNoAnimationModule` avoids needing the animations _module_ wired up, but not the package itself — it is the same bundle. Worth deciding deliberately rather than discovering it as a peer warning.

### Option B — `NgbToast`, no new dependency

`@ng-bootstrap/ng-bootstrap@11` — already a dependency, already imported wholesale via `NgbModule` at `app.module.ts:65` — ships `NgbToast`, `NgbToastConfig`, `NgbToastHeader` and `NgbToastModule` (`node_modules/@ng-bootstrap/ng-bootstrap/index.d.ts:33`). Bootstrap 4.6.1 is installed and does include `.toast` styles.

The catch: `NgbToast` is a **component**, not a service. There is no ng-bootstrap equivalent of `toastyService.success(...)`. Adopting it means writing a small service holding an array of messages plus a container component that renders `<ngb-toast *ngFor>` — perhaps 50 lines including the template.

Worth it if adding no dependency matters more than writing that code, and it has the side benefit of leaving `@angular/animations` genuinely unused (`NgbToast` uses ng-bootstrap's own transition machinery, and animations can be switched off per toast via `[animation]="false"`). It also aligns the notifications with the modals, which already come from ng-bootstrap.

### Option C — a hand-rolled service

Given that the requirement is "show a plain string in a corner for five seconds, in one of two colours", a service plus a container component with no third-party dependency at all is genuinely proportionate. Mentioned for completeness; Option A or B is likely the better use of the time.

**Recommendation: Option A**, unless removing `@angular/animations` is considered valuable, in which case Option B. Either way the CSS work below is the same.

### The CSS, in all three cases

`src/styles/02_components/_messages.scss` is a vendored copy of ng2-toasty's default theme, `#toasty`-scoped, carrying the upstream copyright header. Its selectors (`#toasty .toast`, `#toasty.toasty-position-top-right`, `#toasty .toast.toasty-theme-default.toasty-type-success`, and so on) match nothing once `ng2-toasty` is gone, so the entire file is replaced rather than edited.

For Option A that means importing `ngx-toastr/toastr.css` and re-applying whatever brand overrides are wanted on top. Because the current file is the _upstream default theme with local tweaks folded in_, it is worth diffing it against pristine ng2-toasty CSS first to find out which rules are actually deliberate. Do this before writing the replacement, not after — otherwise the toasts will look subtly wrong and it will be unclear whether that was intentional.

## The change

### Step 1 — replace `ng2-toasty`

Per [Choosing a replacement](#choosing-a-replacement). Concretely, for Option A:

1. `yarn add ngx-toastr@14.3.0`
2. `app.module.ts` — swap the import on line 40, replace `ToastyModule.forRoot()` on line 66 with `ToastrModule.forRoot({ timeOut: 5000, positionClass: 'toast-top-right' })`, add `BrowserAnimationsModule` (or use `ToastNoAnimationModule`), drop the `ToastyConfig` constructor parameter on line 85, and delete `setToastyDefaultSettings()` (lines 172-175) together with its call on line 165.
3. `app.component.html` — delete `<ng2-toasty></ng2-toasty>` on line 2 and the comment above it.
4. The five component files — change `ToastyService` to `ToastrService` in the import and the constructor. The 14 `.success(...)` / `.error(...)` call bodies do not change.
5. `src/styles/02_components/_messages.scss` — replace the vendored theme.
6. `yarn remove ng2-toasty`

### Step 2 — remove `rxjs-compat`

Only once step 1 is merged and verified. Delete line 47 of `package.json`:

```json
"rxjs-compat": "^6.5.2",
```

Then `yarn install` to regenerate the lockfile.

Leave line 46 — `"rxjs": "6.6.7"` — alone for now. Note that it is pinned exactly, with no range, which is unusual in this file and is presumably deliberate given the compat coupling. The rxjs 7 bump is [step 4](#step-4--optional-but-now-unblocked--rxjs-7).

### Step 3 — drop the CommonJS allowance

Delete line 25 of `angular.json`:

```json
"rxjs/Subject",
```

Leave `lodash`, `urijs` and `ng2-dragula` in place; they are unrelated, and `ng2-dragula` is handled by its own migration.

This entry is harmless if forgotten — it allows something that no longer happens — but leaving it behind is a false clue for the next person reading the build config, and it is the one visible trace in the repo that this coupling ever existed.

### Step 4 — optional, but now unblocked — rxjs 7

With `rxjs-compat` gone, `yarn add rxjs@7` is compatible with everything installed (see the peer table in [Why rxjs 7 makes this mandatory](#why-rxjs-7-makes-this-mandatory)). Two things in `src/` are deprecated under v7 — both still work, neither is urgent, and both are removed in rxjs 8:

**`toPromise()`**, deprecated in v7, at three sites:

- `src/app/widget-builder/components/add-page/add-page.component.ts:90`
- `src/app/widget-builder/components/revert-widgetpage/revert-widget-page.component.ts:62`
- `src/app/widget-builder/components/page-list/page-list.component.ts:104`

The v7 replacements are `firstValueFrom()` / `lastValueFrom()`. Note the semantics differ on empty completion — `toPromise()` resolves with `undefined`, `firstValueFrom()` rejects with `EmptyError` — so these are not blind swaps.

**Positional `subscribe(next, error)`**, deprecated in v7 in favour of an observer object, at 14 sites:

```
core/topbar/components/topbar.component.ts:145
widget-builder/services/widget-builder.service.ts:131, :208
widget-builder/components/theme-edit/theme-edit-modal.component.ts:114
widget-builder/components/toolbar/toolbar.component.ts:213, :266
widget-builder/components/css-edit/css-edit-modal.component.ts:129, :161
widget-builder/components/page-list/page-list.component.ts:140, :244
widget-builder/components/modal/admin-page-modal.component.ts:72, :75
widget-builder/components/modal/language-page-modal.component.ts:92, :95
```

Both are their own commits and neither belongs in the `rxjs-compat` removal. Keep step 4 separate from steps 1-3 in any case, so that a toast regression and an rxjs regression can never be confused for each other.

## Sequencing

**Steps 1, 2 and 3 must happen in that order, and step 1 should be its own commit.**

The ordering is not stylistic. Removing `rxjs-compat` while `ng2-toasty` is still installed breaks the build — that is precisely the experiment in [Proof by removal](#proof-by-removal). Meanwhile the reverse ordering is completely safe: with `ng2-toasty` gone, `rxjs-compat` is dead weight that nothing reaches, so there is a stable intermediate state between step 1 and step 2 in which everything builds and runs. Take advantage of it.

Two further notes:

- **Give step 1 its own commit and its own verification pass.** It is the change with visible user-facing behaviour — every success and failure notification in the widget builder goes through it. Steps 2 and 3 are dependency and config bookkeeping with no runtime effect once step 1 is correct, and can be combined.
- **Do not bundle this with the `ng2-dragula` migration**, even though both retire an elderly `ng2-*` package. They touch disjoint parts of the app, they have different risk profiles, and combining them makes a bisect useless.

## Verification

There are no automated tests in this repository, so verification is manual. In order:

1. `yarn lint:check` and `yarn types:check` — necessary, but see the warning below about what they cannot catch.
2. **`yarn build`** — this is the only check that actually verifies the `rxjs-compat` removal. As established in [Proof by removal](#proof-by-removal), `types:check` exits `0` even with the package missing, because `skipLibCheck: true` suppresses the error in the `.d.ts` files where it appears. **Do not treat a green type check as verification of steps 2 or 3.**
3. **Confirm the compat chain is really gone**, rather than merely unreferenced:

   ```
   grep -rn "rxjs-compat" package.json yarn.lock
   grep -rn "rxjs/Subject" angular.json src/
   ls node_modules/rxjs-compat
   ```

   Expect no matches from the greps and no such directory from the `ls`. If `node_modules/rxjs-compat` still exists after `yarn install`, something re-added it — check for a stale lockfile entry.

4. `yarn start` and load the app.
5. **Trigger every one of the fourteen toasts**, split by kind. The success paths are the easy ones and the error paths are the ones that will otherwise ship broken:

   | Toast                          | How to trigger                                                                          |
   | ------------------------------ | --------------------------------------------------------------------------------------- |
   | JSON edit success              | Edit a widget page's JSON and save                                                      |
   | CSS edit success               | Open the CSS editor, save                                                               |
   | Theme set success              | Open the theme editor, pick a theme, save — this is one of the two interpolated strings |
   | Page admin settings success    | Open the admin modal, save                                                              |
   | Language set success           | Open the language modal, pick a language — the other interpolated string                |
   | Page remove success / failure  | Delete a widget page                                                                    |
   | Page duplicate failure         | Duplicate a page, with the API failing                                                  |
   | Page upgrade success / failure | Upgrade a page to the latest version                                                    |
   | Revert success / failure       | Revert a page to the last published version                                             |
   | Title edit failure             | Rename a page, with the API failing                                                     |
   | Publish failure                | Publish a page, with the API failing                                                    |
   | Logout failure                 | Trigger a failing logout                                                                |

   The failure toasts need the API to actually fail. Block or fault the relevant request in devtools rather than skipping them — five of the fourteen call sites are error paths, and they are exactly the ones no happy-path clickthrough will reach.

6. **Check position, stacking and auto-dismiss**, not just that a toast appears. The old configuration was `top-right` with a 5000 ms timeout; confirm the replacement matches on both, and fire two toasts in quick succession to confirm they stack rather than overwrite.
7. **Read the toast text for escaping.** With HTML rendering off in the replacement, any string that happened to contain markup would now display it literally. Nothing in `nl.json` does, but the two interpolated strings include user-controlled values — a widget page language and a theme name — so this is worth a glance rather than an assumption.
8. Confirm the Jenkins `jenkins` build configuration still produces an artifact. Note the `"type": "any"` budget with a 6 KB warning threshold on both `production` and `jenkins` in `angular.json`; swapping toast libraries will shift bundle sizes slightly in either direction, so expect the set of budget warnings in the log to change.

## What this does not change

- **Bundle size.** Do not sell this change on size. `rxjs-compat` is 14 MB on disk, but the only file that ever enters the bundle is the 176-byte `Subject.js` shim, which re-exports a `Subject` that rxjs 6 was already shipping. The disk footprint is an `install`-time and `node_modules`-size story, not a payload story. Whether the _toast library_ swap is a net win depends entirely on which option is chosen in [Choosing a replacement](#choosing-a-replacement).
- **Any code in `src/` that uses rxjs.** Steps 2 and 3 touch no application source at all. All the source churn is in step 1, and it is about toasts, not about observables.
- **The rxjs version.** Steps 1-3 leave `rxjs@6.6.7` exactly where it is. They make v7 _possible_; they do not adopt it.
- **The deprecated rxjs APIs listed in step 4.** `toPromise()` and positional `subscribe()` are fine on rxjs 6 and still work on rxjs 7. They become mandatory only at rxjs 8, which is well beyond the current horizon.
- **`@angular/animations`.** Under Option A this change makes it genuinely required rather than removing it. Under Option B it stays unused and removable. Either way, nothing here removes it.

## Rollback

Step by step, since they are separate commits:

- **Steps 2 and 3** revert cleanly and completely — one line of `package.json`, one line of `angular.json`, plus a lockfile regeneration. No runtime behaviour is involved.
- **Step 1** reverts cleanly as far as the repository is concerned, but reverting it reinstalls a View Engine package that needs ngcc, so it is only a viable rollback while the project is still on Angular 13-15. Once the ladder passes v16 there is no going back to `ng2-toasty` at all. This is another argument for doing step 1 early, while a rollback still exists.

## Notes for the upgrade ladder

- **This is a v16 blocker, so treat it as ladder work brought forward, not as an optional cleanup.** Unlike `core-js` and `@angular/platform-browser-dynamic`, deferring it does not merely leave cruft in place — it stops the ladder at v16.
- **`ng2-toasty` is not the only ngcc-dependent package installed.** Auditing every `package.json` in `node_modules` for the `__processed_by_ivy_ngcc__` marker that ngcc stamps on what it rewrites gives exactly four:

  | Package                  | Entry points rewritten                    |
  | ------------------------ | ----------------------------------------- |
  | `ng2-toasty@4.0.3`       | `module`, `typings`                       |
  | `ng2-dragula@1.5.0`      | `main`, `typings`                         |
  | `ngx-clipboard@14.0.2`   | `es2015`, `fesm2015`, `module`, `typings` |
  | `ngx-window-token@5.0.0` | `es2015`, `fesm2015`, `module`, `typings` |

  `ng2-dragula` already has a migration document. `ngx-window-token` is a transitive dependency of `ngx-clipboard`, so those two stand or fall together — and both being ngcc-rewritten despite `ngx-clipboard@14` nominally targeting Angular 13 is worth investigating rather than assuming away. Note that `ng2-ckeditor@1.3.6`, the other obvious suspect, carries **no** marker and is not implicated.

  Do this audit once, properly, before the ladder starts. The command above is cheap and it turns "which packages break at v16" from a discovery made one hop at a time into a known list.

- **Do the rxjs 7 bump on v13, not mid-ladder.** Angular 13 already accepts `rxjs@^7.4.0`, so once `rxjs-compat` is gone there is no reason to carry rxjs 6 up the ladder. Bumping it while the project is stationary means any observable-timing regression is unambiguously attributable; bumping it during an `ng update` hop mixes it in with framework changes.
- **Characterisation tests would pay for themselves here.** The dragula document already recommends them, and this migration makes the case stronger: fourteen toast call sites, five of them on error paths that only a deliberately faulted API request will reach, verified entirely by hand. If any tests get written before the ladder starts, the notification paths are a good candidate — and per [remove-platform-browser-dynamic.md](./remove-platform-browser-dynamic.md), write them against `@angular/platform-browser/testing` rather than the deprecated dynamic testing APIs.
- **After step 3, the `allowedCommonJsDependencies` list is down to three entries**, and one of those (`ng2-dragula`) is on its way out too. That list is a decent running indicator of how much pre-Ivy, pre-ESM dependency weight the project is still carrying.
