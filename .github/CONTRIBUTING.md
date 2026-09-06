# Contributing to Zircle

Open pull requests against `main`. The `master` branch preserves the original Vue library.

## Local development

Use Node.js 20 or newer.

```sh
npm ci
npm run compile
npm run dev
```

Open http://127.0.0.1:8080. Run `npm run compile` after editing library source; reload the browser to see the result. The demo source and styles are served directly.

## Verification

```sh
npx playwright install chromium firefox webkit
npm test
npm pack --dry-run
```

Tests exercise the published bundles, component behavior, navigation, lifecycle cleanup and the real examples in all three browser engines. Browser test artifacts belong in the ignored `test-results/` and `output/` directories.

## Preparing a release

Zircle uses the same release commands as SnapDOM. Start with committed changes on `main` and run the tests.

```sh
npm run bump:dry
npm run bump
npm run build
```

`bump:dry` previews the version change. `bump` asks for the next version, updates the package files, creates a commit and tag, then updates `CHANGELOG.md`. `build` compiles the library and creates `zircle-<version>.tgz` for inspection or local installation. `npm pack` also compiles through `prepack`.

After reviewing the changelog and package, run `npm run release:push` to commit the changelog and push the branch with its tags. This command does not publish to npm; publish the reviewed archive separately with `npm publish ./zircle-<version>.tgz`, adding `--tag alpha` for an alpha release.

## Scope and structure

- `src/components/`: the original Zircle component vocabulary as native custom elements.
- `src/core.js`: isolated canvas instances and the Zumly adapter.
- `src/styles/zircle.css`: scoped original palettes and circular presentation.
- `src/demo/` and `public/`: the original solar-system demo and interactive component examples.
- `tests/`: package and browser checks.
- `docs/ORIGINAL.md`: original source audit and behavior reference.
- `docs/MIGRATION.md`: explicit differences from the Vue library.

Orbit owns radial positioning and drawing; Zumly owns zoom navigation and view history. Avoid adding a second implementation of either engine. Keep framework adapters in consumer view factories, using `onCleanup` to release their resources.

Describe the concrete behavior changed and relevant verification in each pull request. Do not commit generated `dist/`, browser artifacts, or installed dependencies.
