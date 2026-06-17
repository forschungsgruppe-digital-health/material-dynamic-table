# Contributing

Thank you for your interest in contributing to **material-dynamic-table**, the Angular library
maintained by **TU Dresden / Forschungsgruppe Digital Health (FGDH)**.

## Setup

```bash
git clone https://github.com/forschungsgruppe-digital-health/material-dynamic-table.git
cd material-dynamic-table
npm ci --legacy-peer-deps
```

Build the library and run the demo app (Node 22; see [README.md](README.md) for the full
hot-reload loop):

```bash
npm start   # ng serve — demo app on http://localhost:4200
```

## Branching

A GitHub-flow variant — `master` is the releasable branch (there is no `dev` branch):

- **`master`** — always releasable; releases are tagged here (see [RELEASE.md](RELEASE.md)).
- **Short-lived branches** off `master`: `feat/<description>`, `fix/<description>`, `docs/<description>`, `chore/<description>` (also `refactor/`, `test/`, `build/`, `ci/`, `perf/`). Keep them small and rebase/merge often.
- **Flow:** feature branch → PR into `master` → squash-merge → release-please opens/updates the release PR → merging it cuts the tag and publishes the package.
- **Protection:** PRs are mandatory; direct pushes to `master` are blocked. Merge requires green CI and review.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/): `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `build`, `ci`. A breaking change uses `!` (e.g. `feat!:`) or a `BREAKING CHANGE:` footer.

Example: `feat(table): add per-column sticky option`

The commit type drives the version bump (see [VERSIONING.md](VERSIONING.md)). **PR titles must also be Conventional-Commit-formatted** — they become the squash-merge commit and feed the changelog/version automation; the `pr-lint` workflow enforces this.

## Versioning & releases

The library is versioned with [SemVer](https://semver.org/) — see **[VERSIONING.md](VERSIONING.md)**. The published package version lives in `projects/material-dynamic-table/package.json`. Releases are cut from `master` per the runbook in **[RELEASE.md](RELEASE.md)** (engine: release-please, PR-based). The [CHANGELOG.md](CHANGELOG.md) follows Keep a Changelog.

## Pull request rules

- Tests green (CI must pass: `lint`, `build`, `test`).
- One logical change per PR; keep diffs reviewable.
- Update the relevant docs (`README.md` for usage/API, `VERSIONING.md`/`RELEASE.md` for process) in the same PR as any change they describe.
- No ADR is required in this repository (it is a self-contained library; ADRs live in the patient-portal repo that consumes it).
- Lint and format with the project tooling (`npm run lint`) before pushing.

## Security reports

Please report security issues privately to the maintainers rather than opening a public issue.
