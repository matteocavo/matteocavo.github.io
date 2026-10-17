// =============================================================================
// PHASE 3: LIVE DATA ADAPTER
// Maps the real Notion/GitHub sync output onto the shapes the approved
// Google AI Studio frontend already consumes (NotionProjectData /
// SecondaryRepoData / RawGithubRepo from portfolioData.ts).
//
// Nothing here invents KPI values, metrics or descriptions: every field
// either passes a real value through unchanged, or is mechanically derived
// from real fields already present (a slug from a GitHub URL, a category
// label from the real `tools` array). Fields the real data simply doesn't
// have (per-language title/dataset/notes, true-numeric keyKPI values) are
// NOT fabricated — the single real string is reused for both IT/EN, and
// keyKPIs render as the bare labels Notion provides (no invented ": value"
// suffix).
//
// DATA LOADING STRATEGY (Phase 3 Priority 1 finalization):
// This module performs a RUNTIME FETCH of data/projects.json and
// data/github-repos.json, never a build-time static import. That choice is
// deliberate: the production GitHub Actions workflow (sync-notion.yml) runs
// hourly and commits straight to the two JSON files, independent of any
// React/Vite build. If this module statically imported those JSON files,
// Vite would bundle a frozen snapshot into the JS at build time, and every
// Notion edit would then need a full `npm run build` + redeploy to ever
// reach the live site. With a runtime fetch, each page load re-requests the
// JSON directly, so a sync-notion.yml commit becomes visible to visitors on
// their next page load — no JS rebuild required, and the frontend can never
// get stuck permanently displaying a frozen snapshot.
//
// For local development, `public/data/projects.json` and
// `public/data/github-repos.json` in this project are dev-time fixture
// copies (Vite serves anything under `public/` verbatim at the site root,
// in both `npm run dev` and `vite build`). They are refreshed from the
// production repo's `data/*.json` for convenience, but they are NOT the
// production source of truth — the deployed site must fetch from wherever
// the production `data/*.json` files are actually published (see the
// deployment note in the Phase 3 completion report for the one remaining
// decision this still needs).
// =============================================================================

import { NotionProjectData, SecondaryRepoData, RawGithubRepo } from './portfolioData';

// ---------------------------------------------------------------------------
// Real schema shapes (as produced by scripts/fetch-notion.js and
// scripts/fetch-github-repos.js in the production repo). Kept loose/partial
// on purpose: we only read fields we actually use.
// ---------------------------------------------------------------------------
interface RealProjectRecord {
  id: string;
  title: string;
  businessGoal?: string;
  businessGoalIt: string;
  businessGoalEn: string;
  status: string;
  tools: string[];
  keyKPIs: string[];
  github: string;
  dashboard: string | null;
  dataset: string;
  date: string;
  notes: string;
  image: string;
  // Added by the Phase 3 Priority 2 fetch-notion.js patch. Optional because
  // production data/projects.json will not carry this field until that
  // patched script is committed, pushed, and the next hourly sync runs.
  isFlagship?: boolean;
}

interface RealGithubRepoRecord {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
  archived?: boolean;
  fork?: boolean;
  owner: { login: string };
}

// ---------------------------------------------------------------------------
// Canonical GitHub URL -> stable slug. The real Notion export uses opaque
// UUIDs for `id`, which are unsuitable as the stable identifier the rest of
// App.tsx already relies on (deep-link hashes, the chatbot knowledge base,
// PROJECT_BUSINESS_OBJECTIVES_MAP, dynamicTechStats). Rather than invent new
// slugs, this reuses the exact slugs the approved frontend already shipped
// with, keyed off each project's own canonical (real) GitHub URL so the
// mapping is driven by real data, not a hardcoded Notion UUID.
// ---------------------------------------------------------------------------
const CANONICAL_SLUG_BY_GITHUB_URL: Record<string, string> = {
  'https://github.com/matteocavo/rome-public-transport-reliability': 'rome-transport',
  'https://github.com/dataciviclab/progetto-pilota': 'ispra-waste',
  'https://github.com/matteocavo/Quaero': 'quaero',
  'https://github.com/dataciviclab/openbdap-saldi-storico-stato': 'openbdap',
  'https://github.com/matteocavo/Streaming_Competitive_Benchmark': 'streaming-benchmark',
  'https://github.com/matteocavo/streaming-metadata-analytics': 'streaming-metadata'
};

/** The stable fallback flagship: identified by its real, canonical GitHub
 *  repository URL (Phase 3 Priority 2 requirement), not a hardcoded Notion id. */
const FALLBACK_FLAGSHIP_GITHUB_URL = 'https://github.com/matteocavo/rome-public-transport-reliability';

function slugForGithubUrl(githubUrl: string): string {
  const known = CANONICAL_SLUG_BY_GITHUB_URL[githubUrl];
  if (known) return known;
  // Unseen project (added in Notion after this adapter was written): derive a
  // readable slug from the repo path rather than exposing the raw UUID.
  const repoName = githubUrl.split('/').filter(Boolean).pop() || githubUrl;
  return repoName
    .replace(/[_\s]+/g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function inferDashboardType(dashboardUrl: string | null): 'pdf' | 'live_powerbi' | 'internal' | null {
  if (!dashboardUrl) return null;
  if (dashboardUrl.toLowerCase().endsWith('.pdf')) return 'pdf';
  if (dashboardUrl.includes('app.powerbi.com')) return 'live_powerbi';
  return 'internal';
}

/** Mechanical category label derived from the project's own real `tools`
 *  array (first two entries) — not an invented description. */
function deriveHighlightCategory(tools: string[]): string {
  if (tools.length === 0) return '';
  if (tools.length === 1) return tools[0];
  return `${tools[0]} & ${tools[1]}`;
}

function buildProjects(realProjects: RealProjectRecord[]): NotionProjectData[] {
  return realProjects
    .filter((p) => p.status === 'Portfolio Ready')
    .map((p) => {
      const dashboardUrl = p.dashboard || null;
      return {
        id: slugForGithubUrl(p.github),
        titleIt: p.title,
        titleEn: p.title,
        businessGoalIt: p.businessGoalIt,
        businessGoalEn: p.businessGoalEn,
        tools: p.tools,
        keyKPIs: p.keyKPIs,
        datasetIt: p.dataset,
        datasetEn: p.dataset,
        date: p.date,
        notesIt: p.notes,
        notesEn: p.notes,
        githubUrl: p.github,
        dashboardUrl,
        dashboardType: inferDashboardType(dashboardUrl),
        image: p.image,
        highlightCategory: deriveHighlightCategory(p.tools),
        isFlagship: p.isFlagship === true ? true : undefined
      };
    });
}

function buildSecondaryRepos(
  realGithubRepos: RealGithubRepoRecord[],
  projectGithubUrls: Set<string>
): SecondaryRepoData[] {
  return realGithubRepos
    .filter((repo) => !repo.archived && !repo.fork)
    .filter((repo) => !projectGithubUrls.has(repo.html_url))
    .map((repo) => ({
      name: repo.name,
      fullName: repo.full_name,
      descriptionIt: repo.description || '',
      descriptionEn: repo.description || '',
      htmlUrl: repo.html_url,
      topics: repo.topics,
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at,
      ownerType: repo.owner.login === 'matteocavo' ? 'Personal' : 'Organization'
    }));
}

function buildRawGithubRepos(realGithubRepos: RealGithubRepoRecord[]): RawGithubRepo[] {
  return realGithubRepos
    .filter((repo) => !repo.archived && !repo.fork)
    .map((repo) => ({
      name: repo.name,
      fullName: repo.full_name,
      descriptionIt: repo.description || '',
      descriptionEn: repo.description || '',
      htmlUrl: repo.html_url,
      topics: repo.topics,
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at,
      pushedAt: repo.updated_at,
      ownerType: repo.owner.login === 'matteocavo' ? 'Personal' : 'Organization',
      ownerLogin: repo.owner.login
    }));
}

// ---------------------------------------------------------------------------
// Phase 3 Priority 2 — dynamic flagship selection.
//
// Rules:
//  - Exactly one eligible (Portfolio Ready) project with isFlagship === true -> use it.
//  - Zero -> deterministic fallback: the project whose githubUrl matches
//    FALLBACK_FLAGSHIP_GITHUB_URL.
//  - More than one -> console.warn (dev-visible signal, never a silent pick)
//    and apply the same deterministic fallback.
// ---------------------------------------------------------------------------
export function selectFlagship(projects: NotionProjectData[]): NotionProjectData {
  const flagged = projects.filter((p) => p.isFlagship === true);
  const fallback =
    projects.find((p) => p.githubUrl === FALLBACK_FLAGSHIP_GITHUB_URL) || projects[0];

  if (flagged.length === 1) {
    return flagged[0];
  }
  if (flagged.length > 1) {
    console.warn(
      `[Flagship Selection] ${flagged.length} projects are marked isFlagship=true ` +
        `(${flagged.map((p) => p.id).join(', ')}). Exactly one is expected. ` +
        `Falling back to the deterministic default (${fallback.id}) until the Notion data is corrected.`
    );
  }
  return fallback;
}

export interface LiveData {
  projects: NotionProjectData[];
  projectGithubUrls: Set<string>;
  secondaryRepos: SecondaryRepoData[];
  rawRepos: RawGithubRepo[];
  flagship: NotionProjectData;
}

/**
 * Fetches the two live JSON files at runtime and builds every derived shape
 * App.tsx needs. `baseUrl` defaults to Vite's configured base path so this
 * resolves correctly whether the app is served from the domain root or a
 * sub-path, in both `npm run dev` and a production build.
 */
export async function fetchLiveData(baseUrl: string = import.meta.env.BASE_URL): Promise<LiveData> {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  const [projectsRes, reposRes] = await Promise.all([
    fetch(`${base}data/projects.json`, { cache: 'no-cache' }),
    fetch(`${base}data/github-repos.json`, { cache: 'no-cache' })
  ]);

  if (!projectsRes.ok) {
    throw new Error(`Failed to load data/projects.json (HTTP ${projectsRes.status})`);
  }
  if (!reposRes.ok) {
    throw new Error(`Failed to load data/github-repos.json (HTTP ${reposRes.status})`);
  }

  const realProjects = (await projectsRes.json()) as RealProjectRecord[];
  const realGithubRepos = (await reposRes.json()) as RealGithubRepoRecord[];

  const projects = buildProjects(realProjects);
  const projectGithubUrls = new Set(projects.map((p) => p.githubUrl));
  const secondaryRepos = buildSecondaryRepos(realGithubRepos, projectGithubUrls);
  const rawRepos = buildRawGithubRepos(realGithubRepos);
  const flagship = selectFlagship(projects);

  return { projects, projectGithubUrls, secondaryRepos, rawRepos, flagship };
}
