# Release management

How a release of **material-dynamic-table** is prepared and cut. Versioning rules are in
[VERSIONING.md](VERSIONING.md); branching is in [CONTRIBUTING.md](CONTRIBUTING.md).

> **Status:** the delivery pipeline is **wired** (engine: [release-please](https://github.com/googleapis/release-please),
> PR-based). `.github/workflows/release-please.yml` maintains the release PR and, on merge,
> tags + publishes the package to GitHub Packages; `publish.yml` covers the manual path. Config:
> `release-please-config.json` + `.release-please-manifest.json` (`release-type: node`, targeting
> `projects/material-dynamic-table`). The **automated procedure** is the normal path; the
> **manual procedure** below is the fallback and produces the same result.
>
> **Bootstrap (one-time):** release-please needs a starting point. Tag the currently published
> version once — `git tag v21.0.0 <master-sha> && git push origin v21.0.0` (matching
> `.release-please-manifest.json`) — and create its GitHub Release, so the first automated
> release PR computes the next version from commits after it. Until that tag exists, use the
> manual procedure.

## Roles

- **Release manager** — a maintainer with write access to `master`, permission to create tags,
  and `packages: write` on the repository.
- All releases are cut from **`master`** (always-releasable; see branching).

## Pre-release checklist

- [ ] `master` is green on all CI workflows (`ci`) and the security workflows (`codeql`, `dependency-review`).
- [ ] All PRs intended for the release are merged into `master`.
- [ ] The version in `projects/material-dynamic-table/package.json` is correct for the intended bump (release-please sets this automatically).
- [ ] Decide the version per [VERSIONING.md](VERSIONING.md) from the Conventional-Commit history since the last tag.

## Automated procedure (release-please — the normal path)

Once the one-time bootstrap tag exists (see Status):

1. Pushing to `master` (merging a PR) makes release-please open/update a **"release PR"** that
   bumps `projects/material-dynamic-table/package.json` and writes the CHANGELOG from the
   Conventional Commits.
2. Reviewing and **merging that release PR** creates the `vX.Y.Z` tag and the GitHub Release
   automatically (notes generated from commits) — handled by `release-please.yml`.
3. In the **same workflow run**, the `publish` job (gated on `release_created`) checks out, sets
   up Node 22 with `registry-url: https://npm.pkg.github.com`, runs `npm ci --legacy-peer-deps`,
   builds the library with `ng build material-dynamic-table --configuration production`, and runs
   `npm publish` in `dist/material-dynamic-table` with `NODE_AUTH_TOKEN=${{ secrets.GITHUB_TOKEN }}`
   (permissions: `packages: write`). The package lands in GitHub Packages as
   `@forschungsgruppe-digital-health/material-dynamic-table@X.Y.Z`.

The release manager's job reduces to **merging the release PR**.

## Manual procedure (fallback)

The existing `publish.yml` workflow remains the manual / human-release path. It runs on a
published GitHub Release **or** via **workflow_dispatch**:

1. Set the version in `projects/material-dynamic-table/package.json` and update
   [CHANGELOG.md](CHANGELOG.md). Commit on `master`.
2. Tag and push: `git tag -a vX.Y.Z -m "vX.Y.Z" && git push origin vX.Y.Z`.
3. Create the GitHub Release: `gh release create vX.Y.Z --title "vX.Y.Z" --notes-file <notes>`
   (marks `-rc.N` as pre-release). The `release: published` trigger runs `publish.yml`, **or**
   trigger it manually from the Actions tab (`workflow_dispatch`).
4. `publish.yml` runs `npm ci --legacy-peer-deps`, `ng build material-dynamic-table
   --configuration production`, then `npm publish` from `dist/material-dynamic-table`.

Both paths publish the same artifact to GitHub Packages.
