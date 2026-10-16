## Open item: `global = window` shim in polyfills.ts

### What it is

`src/polyfills.ts` ends with:

    (window as any).global = window;

This assigns Node's `global` object onto the browser's `window`. It was added
at some point to satisfy a dependency that expects to run in a Node-like
environment. The owning library is currently unknown.

### Why it needs attention

From Angular 15/16 onward, `polyfills.ts` is no longer a build entry point.
The configuration moves to a `polyfills` array in `angular.json`, which
accepts module specifiers only:

    "polyfills": ["@angular/localize/init", "zone.js"]

Module imports translate cleanly to this form. An arbitrary assignment
statement does not. When `polyfills.ts` is retired during that migration,
this line has nowhere to go unless a decision is made about it.

### Failure mode

Silent. The application will build and serve without error. The failure
appears at runtime, as `Uncaught ReferenceError: global is not defined`,
only on whichever code path uses the affected library. With no test suite
in the repo, this will only be caught by manual clickthrough — and possibly
not until after deployment.

### Resolution options

1. **Keep the file.** Point the array at the local file:
   `"polyfills": ["src/polyfills.ts"]`. Lowest effort; preserves the shim
   as-is but keeps a near-empty file in the build for one line.

2. **Move to `main.ts`.** Place the assignment above the bootstrap call.
   Works, and is arguably more honest — this is application setup, not a
   polyfill.

3. **Identify and remove.** Determine which dependency requires `global`
   and whether that dependency is still present. Preferred outcome.

### Recommended action

Attempt option 3 first, on the current Angular 13 codebase, before the
ladder begins:

1. Comment out the line.
2. Build and click through the application, watching the browser console
   for `global is not defined`.
3. If nothing breaks, delete the line — it is already dead code.
4. If something breaks, note which feature and which library, then fall
   back to option 2 during the v15/16 migration.

There is a reasonable chance the shim is already obsolete: several of the
project's oldest dependencies are slated for removal or replacement, and a
shim for a library that is no longer installed can be deleted for free.

### Do not

Allow this line to be dropped without a decision when `polyfills.ts` is
removed. This is the specific scenario where the build stays green and the
regression reaches production.
