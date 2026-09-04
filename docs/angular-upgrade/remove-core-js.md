# Removing core-js

This document is an action plan for dropping `core-js` from the project. It is the result of a read-only investigation of the code as it stands on `master` (Angular 13.2.0, yarn, Node 16.13). The work is a fourteen-line deletion in `src/polyfills.ts` plus a dependency removal, and it can be done **before** the Angular upgrade ladder starts — it does not require a newer Angular version.

The reason this matters: every `core-js` import in `src/polyfills.ts` exists to backfill ES5/ES2015 built-ins for Internet Explorer. The file says so itself on line 25 — _"IE9, IE10 and IE11 requires all of the following polyfills."_ Angular dropped IE11 support in v13, which this project is already on, and the CLI's own browser target list contains no IE. The imports are shipping roughly 85 KB of dead weight in the polyfills bundle to browsers that have had every one of those built-ins natively for a decade.

## Summary

- `core-js` is used in exactly one place: fourteen imports at `src/polyfills.ts:26-41`.
- Angular 13 dropped IE11 support, and the CLI overrides the browserslist default to an evergreen-only list. Every built-in those imports polyfill is native in all supported browsers.
- `core-js/es/reflect` is **not** the JIT `reflect-metadata` polyfill and is not needed for it. See [The reflect import is a red herring](#the-reflect-import-is-a-red-herring).
- The app **already** does not run on IE11 — see [Evidence that IE11 is not supported](#evidence-that-ie11-is-not-supported) — so this removes support that does not exist rather than support that does.
- Unlike the `@angular/platform-browser-dynamic` removal, this **is** a real bundle win: roughly 85 KB raw off a 134 KB polyfills bundle. See [Bundle impact](#bundle-impact).
- There is a **sequencing trap**: `core-js` stays in `node_modules` as a transitive dependency, so removing it from `package.json` alone will silently keep working. See [Sequencing](#sequencing).

## Why the package is here

It came from the scaffold and was never revisited. `git log -S` puts its introduction in `f647f83 chore: initial commit from @angular/cli`, and the only other commit to touch it is `0788588 WID-209 - update angular to v8 + update dependencies`, which moved the project from core-js 2 to core-js 3 and rewrote the import paths from `core-js/es6/*` to `core-js/es/*`. That was a mechanical rename, not a decision to keep the polyfills.

That is the expected history. The CLI scaffolded exactly this block into every new app for years, with the IE comments intact, because IE11 was a supported target. It stopped doing so once IE support was dropped; existing projects kept the block because nothing forces a cleanup.

`package.json:36` declares:

```json
"core-js": "^3",
```

which currently resolves to `3.20.3`.

## Evidence that the polyfills are unnecessary

### The CLI does not target IE

There is no `.browserslistrc` in the repository and no `browserslist` key in `package.json`. That does **not** mean the browserslist default applies. `@angular-devkit/build-angular` overrides the default before resolving the query — `node_modules/@angular-devkit/build-angular/src/utils/supported-browsers.js`:

```javascript
function getSupportedBrowsers(projectRoot) {
  browserslist_1.default.defaults = [
    'last 1 Chrome version',
    'last 1 Firefox version',
    'last 2 Edge major versions',
    'last 2 Safari major versions',
    'last 2 iOS major versions',
    'Firefox ESR',
  ];
  return (0, browserslist_1.default)(undefined, { path: projectRoot });
}
```

This is the list the build actually uses, and it contains no IE.

**Watch out for a misleading check here.** Running `npx browserslist` in the project prints `ie 11` in its output. That is the raw browserslist `defaults` query, not what the Angular builder resolves — the override above is applied in-process and is invisible to the CLI. Do not use `npx browserslist` as evidence either way on this question.

### Nothing in the supported browsers still needs these modules

Verified with `core-js-compat` (already present in `node_modules` as a dependency of `@babel/preset-env`), run against the fourteen module groups that `src/polyfills.ts` imports and the Angular target list above. Only four modules come back as still required:

| Module                     | Flagged for                            |
| -------------------------- | -------------------------------------- |
| `es.array.at`              | Safari 14, iOS 14                      |
| `es.string.at-alternative` | Safari 14, iOS 14                      |
| `es.object.has-own`        | Firefox 91 ESR, Safari 14, iOS 14      |
| `es.array.includes`        | Firefox 91 ESR                         |

Two things to note about that result:

1. **These are forward gaps, not IE-era gaps.** `Array.prototype.at`, `String.prototype.at` and `Object.hasOwn` are ES2022 additions. They are pulled in incidentally by `core-js/es/array`, `core-js/es/string` and `core-js/es/object` (see `node_modules/core-js/es/array/index.js:4` and `node_modules/core-js/es/object/index.js:13`). They are not what this block was added for, and none of the ES5/ES2015 built-ins it _was_ added for appear in the list at all.
2. **Nothing in `src/` uses them.** No `Object.hasOwn`, no `.at(`, no `String.prototype.at` anywhere in the codebase. The two `hasOwnProperty` calls — `core/widget/factories/widget-page.factory.ts:22` and `core/layout/factories/layout.factory.ts:30` — are ES1 and unaffected.

The `caniuse-lite` data in `node_modules` is from 2022 and emits an "outdated" warning. That skews the result **towards** keeping core-js, not away from it: with current data, "last 2 Safari major versions" and "last 2 iOS major versions" resolve to browsers that support all four modules natively, and the required list would be empty. The four-module result above is the pessimistic case.

### Evidence that IE11 is not supported

The app cannot run on IE11 today, independently of Angular's own support policy:

- **`Promise` is never polyfilled.** `src/polyfills.ts` imports no `core-js/es/promise`, yet `src/main.ts:10-19` is an `async` function that is invoked at module scope. On IE11 the bootstrap would fail before anything rendered.
- **Angular 13 dropped IE11.** The framework this project runs on does not support the browser these polyfills target.

So the block is not protecting a working IE11 configuration. There is nothing to regress.

### `target: "ES5"` is not a reason to keep it

`tsconfig.json` sets `"target": "ES5"` with `"importHelpers": true`. That combination downlevels **syntax** — classes, arrow functions, `async`/`await` — into ES5 equivalents using `tslib` helpers. It does not add missing **built-ins**, and it does not create a dependency on core-js. The two concerns are independent; the ES5 target can stay exactly as it is through this change.

### The reflect import is a red herring

`src/polyfills.ts:41` imports `core-js/es/reflect` under the comment _"Evergreen browsers require these."_ Two separate reasons it can go:

1. **It is not `reflect-metadata`.** `core-js/es/reflect` is the ES2015 `Reflect` namespace (`Reflect.get`, `Reflect.ownKeys`, and so on), which is native in every browser on the target list. The polyfill Angular's JIT compiler needs for `emitDecoratorMetadata` is `core-js/proposals/reflect-metadata`, a different entry point that this file has never imported.
2. **JIT is not in use, and would not rely on this dependency anyway.** The browser builder defaults `aot` to `true` (`node_modules/@angular-devkit/build-angular/src/builders/browser/schema.json`), and `angular.json` sets no `aot` flag in any configuration. Even if a JIT build were run, the CLI injects the metadata polyfill itself — `node_modules/@angular-devkit/build-angular/src/webpack/configs/common.js:88`:

   ```javascript
   if (!buildOptions.aot) {
     const jitPolyfills = require.resolve('core-js/proposals/reflect-metadata');
     ...
   }
   ```

   That `require.resolve` runs from inside `build-angular`, which declares its own `core-js` dependency. It never reaches for the one in this project's `package.json`.

There is also no test target in `angular.json` and no `.spec.ts` file in `src/`, so there is no karma JIT path to worry about either.

## Bundle impact

Measured against the last production build in `dist/`:

| File                                | Raw     | Gzipped |
| ----------------------------------- | ------- | ------- |
| `dist/polyfills.0c4a28eef3865329.js` | 134 KB  | 46 KB   |

That bundle contains three things: `@angular/localize/init`, `zone.js`, and core-js. `zone.js`'s own minified bundle (`node_modules/zone.js/fesm2015/zone.min.js`) is 44.5 KB and `@angular/localize/init` is small, which puts core-js at roughly **85 KB raw** — the majority of the file. Grepping the bundle for `__core-js_shared__` confirms it is in there.

Unlike the `@angular/platform-browser-dynamic` removal, this one can honestly be sold on bundle size.

## The change

### Step 1 — delete the imports from `src/polyfills.ts`

Delete lines 25 through 41, comments included:

```typescript
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
import 'core-js/es/symbol';
import 'core-js/es/object';
import 'core-js/es/function';
import 'core-js/es/parse-int';
import 'core-js/es/parse-float';
import 'core-js/es/number';
import 'core-js/es/math';
import 'core-js/es/string';
import 'core-js/es/date';
import 'core-js/es/array';
import 'core-js/es/regexp';
import 'core-js/es/map';
import 'core-js/es/set';

/** Evergreen browsers require these. **/
import 'core-js/es/reflect';
```

Everything else in the file stays:

- `import '@angular/localize/init';` (line 4) — required, `@angular/localize` is a declared dependency.
- `import 'zone.js';` (line 46) — required by Angular itself.
- `(window as any).global = window;` (line 58) — a CommonJS interop shim for dependencies that expect a Node-style `global`. Unrelated to core-js; leave it alone.

The surrounding block comment describing the file's two sections is now partly inaccurate (it still talks about browsers "sorted by browsers" and IE-era support). Tidying it is optional and cosmetic.

### Step 2 — remove the dependency

Delete line 36 of `package.json`:

```json
"core-js": "^3",
```

Then regenerate the lockfile and reinstall:

```
yarn install
```

### Step 3 — commit as its own change

Keep this separate from any other upgrade work so it can be reverted independently if something in a browser that was not tested locally turns out to have depended on a polyfill.

## Sequencing

**Do steps 1 and 2 together, in that order, in one commit.** Doing step 2 alone will appear to work and will not be caught by any check.

`@angular-devkit/build-angular@13.3.5` declares `core-js@3.20.3` as one of its own dependencies. That means `core-js` remains hoisted in `node_modules` after it is removed from `package.json`, and the fourteen imports in `src/polyfills.ts` will keep resolving against that copy. The build stays green, the bundle stays the same size, and the project ends up with an undeclared dependency on a package it imports directly — strictly worse than the state it started in.

The reverse order is safe: deleting the imports first and the dependency second never produces a broken intermediate state.

This transitive copy is expected and is not itself a problem — it is the CLI's own, used for the JIT metadata polyfill described above. There is no way to remove it and no reason to.

## Verification

There are no automated tests in this repository, so verification is manual. In order:

1. `yarn lint:check` and `yarn types:check` — confirms nothing referenced the removed imports.
2. `yarn build` — a production build. Confirm it completes.
3. **Confirm the polyfills bundle actually shrank.** This is the check that catches the sequencing trap in step 2 above:

   ```
   ls -la dist/polyfills.*.js
   grep -c "__core-js_shared__" dist/polyfills.*.js
   ```

   Expect the file to drop from roughly 134 KB to roughly 50 KB, and the grep to return `0`. If the size is unchanged, the imports are still in `src/polyfills.ts` and are resolving against the transitive copy.

4. `yarn start` and load the app — confirm it bootstraps.
5. Exercise the widget builder: open a project, open a widget page, add a row, add a widget, edit a widget, save. The CKEditor integration is worth particular attention here — `src/assets/libraries/ckeditor/ckeditor.js` is a large vendored third-party script loaded globally from `src/index.html`, it predates the rest of the stack, and it is the one piece of code in the project that was plausibly written against an IE-era baseline. It is also the code least likely to be exercised by a type check or a build.
6. Test in **Safari** specifically, not just Chrome. Safari is the browser on the supported list with the oldest still-supported majors, and it is where the four forward-gap modules would surface if anything did depend on them.
7. Confirm the Jenkins `jenkins` build configuration still produces an artifact. Note that `angular.json` sets a `"type": "any"` budget with a 6 KB warning threshold on both the `production` and `jenkins` configurations — this change moves bundle sizes downward, so it cannot introduce a new budget failure, but the set of warnings in the build log will shift.

## What this does not change

- **`zone.js`.** Still required by Angular 13 and still in the polyfills bundle. Removing it is the zoneless migration, which is a v18+ concern and a completely separate decision.
- **The `ES5` compilation target.** Independent of this change, as explained above. It becomes an upgrade-ladder issue in its own right; see below.
- **Browser support in practice.** The supported set is unchanged, because the polyfills were only ever backfilling browsers that Angular 13 already refuses to run on.
- **`@angular/localize`.** The `$localize` import at the top of the polyfills file is a separate concern with its own dependency.

## Rollback

Revert the commit. The change touches one line of `package.json` and deletes seventeen lines from `src/polyfills.ts`, with no data migration, no config change and no build-pipeline change, so a revert restores the previous behaviour completely.

## Notes for the upgrade ladder

- **Do this before the ladder starts, not during it.** `core-js` is a dependency that `ng update` will happily carry forward through every hop without comment, and each hop makes it marginally harder to attribute a rendering bug to the right change. Removing it while the project is stationary on v13 means any fallout is unambiguous.
- **The `ES5` target has to go before v15.** `@angular-devkit/build-angular` began warning on ES5 targets and later refuses them outright; the modern scaffold uses `ES2022`. That is a separate change, but it is worth knowing that once it lands, the argument for core-js weakens further still — a project targeting ES2022 syntax while polyfilling ES5 built-ins is incoherent on its face.
- **`src/polyfills.ts` disappears in v16+.** Modern scaffolds drop the file entirely in favour of a `polyfills` array in `angular.json` listing bare module specifiers (`"zone.js"` and so on). Doing this cleanup now leaves the file holding only `@angular/localize/init`, `zone.js` and the `window.global` shim — three things that map cleanly onto that later migration, with the shim being the only one needing a new home. A file still holding fourteen core-js imports would make that hop noticeably more annoying.
