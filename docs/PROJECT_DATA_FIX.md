# Runtime project data and RMI evidence fix

Implementation baseline: `0b39405a227d9f99ff8c01c1e1101f41eb99ef33`.
Evidence and validation reviewed on 2026-10-29.

## Data ownership and contract

`data/projects.json` remains the Notion-generated runtime source of truth.
Eligibility, tools, project URLs and the Portfolio Flagship checkbox still come
from that export. The development fixture under `portfolio-v2-react/public/data/`
is refreshed from the current eight-project export; the production export itself
is untouched. No build-time JSON import has been introduced.

`src/data/projectEvidence.ts` holds explicitly reviewed display metadata keyed
by GitHub repository identity. Each metric has an ID, bilingual labels, numeric
value, display precision, optional unit and scope (dataset, TEST classification,
or TEST regression). Each evidence record has a pinned evaluation source,
protocol/limitations and a related repository. RMI also has structured evaluation
metadata: source version, partition row counts, TEST boundaries/snapshot count
and threshold. Unstructured Notion labels are never parsed into numbers.
Evidence follows its project regardless of which project Notion makes flagship.
An unverified flagship shows tracked indicator labels without claiming verified
numeric values. The old string-only metric registry is removed.

## Verified sources

- RMI evaluation, reviewed at commit `e4112a287e2f76b9396a1c8746350a045f5ff04b`:
  https://github.com/matteocavo/rome-mobility-intelligence/blob/e4112a287e2f76b9396a1c8746350a045f5ff04b/docs/REAL_MODEL_EVALUATION.md
- RMI deployment and provider responsibilities, same revision:
  https://github.com/matteocavo/rome-mobility-intelligence/blob/e4112a287e2f76b9396a1c8746350a045f5ff04b/docs/PRODUCTION_DEPLOYMENT.md
- RMI current architecture and n8n provisioning status, same revision:
  https://github.com/matteocavo/rome-mobility-intelligence/blob/e4112a287e2f76b9396a1c8746350a045f5ff04b/README.md
- Foundation results and responsibilities, reviewed at commit
  `016d11eefceb97272f3637085e9a905d8a92d460`:
  https://github.com/matteocavo/rome-public-transport-reliability/blob/016d11eefceb97272f3637085e9a905d8a92d460/README.md
- Public RMI app: https://matteocavo.github.io/rome-mobility-intelligence/
  HTTP HEAD returned 200 during local review. No backend workload was triggered.

RMI source values, displayed to four decimal places:
accuracy 0.956520 -> 0.9565; precision 0.784195 -> 0.7842;
recall 0.799071 -> 0.7991; classification F1 0.791563 -> 0.7916;
ROC-AUC 0.971677 -> 0.9717; PR-AUC/AP 0.874161 -> 0.8742.
Full labeled Delta v12 has 9,975,703 rows. TRAIN export has 81,014 rows;
validation and TEST are deterministic uniform samples of 25,000 rows each.
TEST uses 49 snapshots from 2 October 2026, UTC [00:00:00, 08:03:58).
Threshold p >= 0.35 was selected on validation; TEST was evaluated once.
PR-AUC is sklearn Average Precision. This historical holdout is not an unseen
future-date/trip generalization test; Spark results are not directly comparable.
These offline evaluation facts do not imply a real-time SLA or model superiority.

The foundation retains its historical Spark F1 0.8283 and regression MAE
136.9818 seconds (displayed 136.98), dataset coverage and notebook responsibilities.
It is linked separately to RMI's sklearn/FastAPI application; no achievements or
metrics are transferred between the repositories.

## Notion adjustments (proposal only; no writes)

No new Notion metric property is required for this reviewed code-side registry.
Do not place numeric metrics in arbitrary Notes prose or KPI tag names for parsing.
If a future migration moves metric ownership to Notion, approve one structured
rich-text property (for example `Verified Metrics JSON`) with the same validated
numeric/scope/source contract before changing the exporter or production data.

The existing Tools export is a direct multi-select passthrough in
`scripts/fetch-notion.js`; it has no vocabulary mapping to update. To include
hosting in Notion's own vocabulary, approve adding `Render` and `GitHub Pages`
to RMI's Tools tags, and optionally `Neon` to distinguish its managed PostgreSQL
provider. These tags have NOT been added to live Notion or its generated JSON.
Render/Render Free and GitHub Pages are recognized as non-analytical hosting
metadata, with no Data Engineering or low-code category membership. Neon belongs
to SQL & Data Modeling. Reviewed RMI text already exposes Render Free, GitHub Pages
and PostgreSQL/Neon without pretending those are Notion tags. n8n's existing tag
is preserved; bilingual text states that integration is prepared and not yet
provisioned. It is not a continuously running prerequisite of the public site.

## Navigation and actions

All published slugs are stable, including the FTS repository subdirectory URL.
Unknown repositories derive owner/path-qualified slugs, independent of ordering.
DOM targets are the actual flagship/secondary cards. Navigation waits for runtime
data and the unfiltered React render, then scrolls smoothly with the existing
`scroll-mt-24` offset. Hash/history listeners handle direct loads, reload and
back/forward. Navigating to a filtered-out project resets both filters; choosing
filters normally does not cause a stale hash to undo the user's selection.
Copy uses the canonical portfolio case-study URL, separate from repository and
application/output actions. Success appears only after a resolved Clipboard API
write or a true legacy copy result; failures are localized and never claim success.

Published targets checked:
`#fts-eu-grants`, `#rome-mobility-intelligence`, `#rome-transport`, `#quaero`,
`#openbdap`, `#streaming-benchmark`, `#ispra-waste`, `#streaming-metadata`.

## Reproducing focused validation

From `portfolio-v2-react`:

```sh
node scripts/test-project-data.mjs
npm run lint
npm run build
npm run preview -- --host 127.0.0.1 --port 3012
```

In another shell run `node scripts/test-project-navigation.cjs` with:

- `PORTFOLIO_TEST_URL=http://127.0.0.1:3012/`
- `PLAYWRIGHT_MODULE`: optional path to an installed Playwright module; otherwise
  the runner resolves `playwright` normally. No new project dependency is required.
- `BROWSER_EXECUTABLE`: optional installed Chromium executable; otherwise use
  Playwright's default browser installation.
- `TEST_SCREENSHOTS`: optional existing output directory.

The browser suite covers all eight direct URLs and refreshes on desktop 1440x1000
and mobile 390x844; IT/EN, unique targets, clipboard contents, filtering, history,
related case-study navigation, localized values, separate output/repo URLs,
chatbot skills navigation, CV language/preview and clipboard rejection/deferred
success. It intercepts runtime project fetches with the actual generated export
and latency, then tests zero/multiple flags and a different single flagship to
verify runtime synchronization without rebuilding. The data suite checks ordering,
canonical identity, fallback behavior, metric scopes/values, provenance and categories.
No external API submissions, Notion writes, pushes or deployment are part of tests.

## Completed validation

PASS: focused data suite, TypeScript (`npm run lint`), production build and
`git diff --check`. Chromium browser suite passed on the production preview:
all eight project URLs in fresh tabs, reloads, IT/EN, both viewport sizes,
clipboard contents/failure/deferred completion, history, filters, related cases,
chatbot and CV previews. Runtime zero/multiple/alternative flagship cases passed.
Screenshots were inspected on desktop and mobile. UTF-8 labels, accents and
symbols were checked; the data suite includes explicit Unicode assertions. Existing site CSS and published root
bundles were not changed. No live Notion data, deployment workflows or Pages
settings were changed.
