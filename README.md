# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Docker setup

Start the container
`make up`

Install dependencies
`make install`

Serve widgetbeheer
`make serve`

The app runs on http://localhost:4200, unless `.env` sets a different `PORT`.

Open a shell in the container
`make bash`

Stop the container
`make down`

## Working in parallel with worktrees

[Worktrunk](https://worktrunk.dev) (`wt`) lets you check out several branches side by side, each in its own directory with its own container and port. The project hooks live in `.config/wt.toml`.

When a worktree is created, worktrunk:

- copies `node_modules` and other gitignored files from the main checkout
- writes a `PORT` for that branch to `.env`

Before a worktree is removed, it stops that worktree's container.

Create a worktree for a new branch
`make worktree BRANCH=<branch>`

Or, to also move your shell into it
`wt switch -c <branch>`

In the new worktree, run `make up` and `make serve`. The URL uses the `PORT` from that worktree's `.env`.

List worktrees
`wt list`

Remove the current worktree
`wt remove`

The first time you create a worktree, worktrunk asks you to approve the project hooks.
