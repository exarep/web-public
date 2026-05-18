# web-public

Public marketing site for **Exarep** — a deliberately fake Texas REP: **Fixed** (12/24/36) pretend plans, ZIP → TDSP cosplay, and a service form that logs to the console. Angular 20 + ng-bootstrap.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.26.

## Prerequisites

- **Node.js** (current LTS recommended) and **npm** installed on the host
- A Chromium-based browser for **`npm test`** (Karma uses Chrome by default)

## First-time setup

```bash
cd /path/to/web-public
npm install
```

## Development server

```bash
npm start
```

This runs `ng serve` with the app’s configured port **4200**. Open [http://localhost:4200/](http://localhost:4200/). The app reloads when you change source files.

You can also run `npx ng serve` if you prefer invoking the CLI directly.

## Building

```bash
npm run build
```

Output is written under `dist/web-public` (production configuration by default).

## Running unit tests

```bash
npm test
```

If Karma reports no Chrome binary, install Google Chrome / Chromium or set **`CHROME_BIN`** to your browser executable.

## Code scaffolding

```bash
npx ng generate component component-name
```

For all schematics:

```bash
npx ng generate --help
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
npx ng e2e
```

Angular CLI does not ship an e2e framework by default. You can add one that suits your needs.

## Additional resources

- [Angular CLI overview](https://angular.dev/tools/cli)
