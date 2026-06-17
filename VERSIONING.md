# Versioning

**material-dynamic-table** follows [Semantic Versioning 2.0.0](https://semver.org/). The
published package version is the single source of truth and lives in
**`projects/material-dynamic-table/package.json`** (`version`); the root workspace
`package.json` is not the released artifact. The [CHANGELOG.md](CHANGELOG.md) follows
[Keep a Changelog](https://keepachangelog.com/).

## Scheme

- **MAJOR** — incompatible changes to the library's public API (component inputs/outputs,
  exported types, supported Angular Material major). The major version tracks the supported
  Angular/Angular-Material major line (e.g. `21.x` targets Angular Material `^21`).
- **MINOR** — new functionality, backward-compatible.
- **PATCH** — backward-compatible fixes.
- **Pre-release** — `-rc.N` for release candidates (e.g. `21.1.0-rc.1`).

## How versions are computed — Conventional Commits

Versions are derived from [Conventional Commits](https://www.conventionalcommits.org/) (the
project's commit convention, see [CONTRIBUTING.md](CONTRIBUTING.md)):

| Commit type | Bump |
|---|---|
| `fix:` | PATCH |
| `feat:` | MINOR |
| `feat!:` / `BREAKING CHANGE:` footer | MAJOR |
| `docs:`/`chore:`/`refactor:`/`test:`/`build:`/`ci:`/`perf:` | none |

The automation is **[release-please](https://github.com/googleapis/release-please)** (PR-based,
wired in `.github/workflows/release-please.yml` with `release-please-config.json` +
`.release-please-manifest.json`, `release-type: node` targeting `projects/material-dynamic-table`):
it maintains a "release PR" that accumulates the next version + CHANGELOG entry from merged
commits; merging that PR bumps `projects/material-dynamic-table/package.json`, cuts the `vX.Y.Z`
tag and the GitHub Release, and publishes the package to GitHub Packages. See
[RELEASE.md](RELEASE.md) (incl. the one-time bootstrap tag). The manual procedure remains a
fallback and yields the same result.

## Artifact versions

- **Git tag:** `vX.Y.Z` on `master`.
- **npm package:** `@forschungsgruppe-digital-health/material-dynamic-table@X.Y.Z`, published to
  GitHub Packages (`https://npm.pkg.github.com`). The package version always matches the git tag.

Container image tags are **N/A** — this repository publishes an npm package, not a deployable
image (the GitLab Pages demo deploy is a legacy CI artifact, not a versioned release).
