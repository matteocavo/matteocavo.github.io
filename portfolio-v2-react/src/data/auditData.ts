export type PriorityLevel = 'MUST FIX' | 'HIGH IMPACT' | 'NICE TO HAVE';
export type EpistemicStatus = 'Verified Problem' | 'Recommendation' | 'Untested Hypothesis';
export type AuditCategory =
  | 'Architecture & Sync'
  | 'UI/UX & Responsive'
  | 'Accessibility & Perf'
  | 'Bilingual (IT/EN)'
  | 'Positioning & Content';

export interface AuditFinding {
  id: string;
  title: string;
  priority: PriorityLevel;
  status: EpistemicStatus;
  category: AuditCategory;
  location: string;
  evidence: string;
  impact: string;
  remediation: string;
}

export interface FileInventoryItem {
  path: string;
  sizeBytes: number;
  maintenanceMode: 'Manually Maintained' | 'Dynamically Generated (Hourly Action)' | 'Static Asset';
  role: string;
  auditNotes: string;
}

export interface BilingualAuditRow {
  area: string;
  sourceFile: string;
  itState: string;
  enState: string;
  status: EpistemicStatus;
  issueDetail: string;
}

export interface SectionRecommendation {
  sectionId: string;
  sectionName: string;
  currentImplementation: string;
  verifiedProblems: string[];
  recommendedChanges: string[];
  preserveUnchanged: string[];
}

export const REPO_FILE_INVENTORY: FileInventoryItem[] = [
  {
    path: 'index.html',
    sizeBytes: 19864,
    maintenanceMode: 'Manually Maintained',
    role: 'Primary single-page portfolio entry point (410 lines)',
    auditNotes: 'Defaults to lang="it". Contains inline styles in .topbar (lines 19–35), hardcoded initial metrics (5 projects, 2 certs) that flash on hydration, and static Italian SEO/OG tags.'
  },
  {
    path: 'quaero.html',
    sizeBytes: 41263,
    maintenanceMode: 'Manually Maintained',
    role: 'Legacy product deep-dive page for Quaero (project updated to confirmed v0.4)',
    auditNotes: 'Self-contained HTML + inline CSS + inline T={en,it} script. Defaults to "en" if localStorage is unset (desynchronized from index.html default "it") and lacks a visible language switcher.'
  },
  {
    path: 'styles.css',
    sizeBytes: 21183,
    maintenanceMode: 'Manually Maintained',
    role: 'Global stylesheet (1,266 lines) with dark palette (#1e1f2a / #343543)',
    auditNotes: 'Declares Inter font without loading it; groups .section-note into uppercase 0.22em tracking; uses translateY(16px) optical hack on hero stats and padding-top: 64px on .about-copy.'
  },
  {
    path: 'script.js',
    sizeBytes: 19027,
    maintenanceMode: 'Manually Maintained',
    role: 'Client runtime (544 lines): i18n, Notion/GitHub fetch, Hero KPI calculation, Web3Forms contact, scroll reveal',
    auditNotes: 'Discards keyKPIs, dataset, notes, and date from data/projects.json; slices tools to first 3 tags; classifies .pdf URL as a live dashboard; removes .in-view on scroll-out causing repeated re-fade.'
  },
  {
    path: 'data/profile.js',
    sizeBytes: 14891,
    maintenanceMode: 'Manually Maintained',
    role: 'Global window.PORTFOLIO_PROFILE: experienceStartYear (2011), pinnedRepos, skillGroups, certifications, links, IT/EN dictionary',
    auditNotes: 'Contains 8 orphaned translation keys never rendered in index.html (heroP3, projectsText, analysisLabel, analysisTitle, analysisText, aboutLocationPill, footer1, footer2). Pinned repo dataciviclab/openbdap-saldi-storico-stato redirects to bilancio-pubblico.'
  },
  {
    path: 'data/featured.js',
    sizeBytes: 3294,
    maintenanceMode: 'Manually Maintained',
    role: 'Offline fallback window.FEATURED_PROJECTS (4 projects in IT/EN)',
    auditNotes: 'Used only if fetch("data/projects.json") fails. Lacks Rome Public Transport and OpenBDAP projects.'
  },
  {
    path: 'data/projects.json',
    sizeBytes: 12974,
    maintenanceMode: 'Dynamically Generated (Hourly Action)',
    role: 'Notion database snapshot (6 "Portfolio Ready" projects)',
    auditNotes: 'Contains rich structured fields (keyKPIs, dataset, notes, date, businessGoalIt, businessGoalEn), but title is single-language and keyKPIs/dataset/notes are never rendered in the UI.'
  },
  {
    path: 'data/github-repos.json',
    sizeBytes: 4874,
    maintenanceMode: 'Dynamically Generated (Hourly Action)',
    role: 'Merged GitHub API snapshot (7 repositories)',
    auditNotes: 'Merges matteocavo repos tagged "portfolio" with pinnedRepos. Descriptions are single-language (4 Italian-only, 3 English-only), breaking bilingual consistency in #repo-grid.'
  },
  {
    path: 'components/repoCard.js',
    sizeBytes: 5158,
    maintenanceMode: 'Manually Maintained',
    role: 'DOM card factories createRepoCard() and createFeaturedCard()',
    auditNotes: 'imageDimensions() map (lines 31–41) omits "rome-transport.png", leaving the #1 featured card without width/height attributes.'
  },
  {
    path: 'components/repoLoader.js',
    sizeBytes: 1443,
    maintenanceMode: 'Manually Maintained',
    role: 'Fetches data/github-repos.json and populates #repo-grid',
    auditNotes: 'Does not deduplicate repositories already shown in #featured-projects, resulting in 5 duplicate project cards on the same page.'
  },
  {
    path: 'components/languageToggle.js',
    sizeBytes: 629,
    maintenanceMode: 'Manually Maintained',
    role: 'Language state handler for #lang-it and #lang-en buttons',
    auditNotes: 'Updates localStorage("portfolio-lang") and re-runs window.renderPortfolio(), which re-fetches projects.json and github-repos.json on every language toggle.'
  },
  {
    path: 'scripts/fetch-notion.js',
    sizeBytes: 2149,
    maintenanceMode: 'Manually Maintained',
    role: 'Node.js script querying Notion API dataSources.query (Status = "Portfolio Ready")',
    auditNotes: 'Note trailing space in Notion property p["Dashboard / Output "]. Writes data/projects.json.'
  },
  {
    path: 'scripts/fetch-github-repos.js',
    sizeBytes: 2531,
    maintenanceMode: 'Manually Maintained',
    role: 'Node.js script querying GitHub REST API for user repos + pinnedRepos via node:vm',
    auditNotes: 'Executes data/profile.js in a VM sandbox to read pinnedRepos, fetches repo metadata, and writes data/github-repos.json.'
  },
  {
    path: '.github/workflows/sync-notion.yml',
    sizeBytes: 1215,
    maintenanceMode: 'Manually Maintained',
    role: 'GitHub Actions hourly cron (0 * * * *) syncing Notion & GitHub to main',
    auditNotes: 'Runs 24 times/day on Node 22. Commits as github-actions[bot] when data/projects.json or data/github-repos.json changes.'
  },
  {
    path: 'images/quaero_info.png',
    sizeBytes: 1424708,
    maintenanceMode: 'Static Asset',
    role: 'Infographic image embedded on quaero.html (2752×1536 PNG)',
    auditNotes: '1.42 MB uncompressed PNG; accounts for >52% of total repository image payload (2.69 MB total).'
  }
];

export const AUDIT_FINDINGS: AuditFinding[] = [
  {
    id: 'F-01',
    title: 'Rich Analytical Fields in data/projects.json (keyKPIs, dataset, notes) Are Completely Discarded by UI',
    priority: 'MUST FIX',
    status: 'Verified Problem',
    category: 'Positioning & Content',
    location: 'script.js:322–349 · components/repoCard.js:90–137 · data/projects.json',
    evidence: 'scripts/fetch-notion.js extracts keyKPIs, dataset, date, and notes into data/projects.json (e.g., Rome Transport has 9,975,703 labeled observations, 964 realtime snapshots, RF F1 0.8283, ROC-AUC 0.9690, PR-AUC 0.9063; OpenBDAP has "Deficit strutturale (22/22)", "Spesa corrente media (64.0%)"; ISPRA has "Virtuosi strutturali (N e %)"). However, renderFeatured() in script.js lines 331–348 only passes title, description, and tools.slice(0, 3) to createFeaturedCard().',
    impact: 'Severely weakens professional positioning: hiring managers only see a 1-sentence business goal and 3 generic tags, while all quantitative outcomes, dataset scales, and methodological rigor stored in Notion remain invisible in the DOM.',
    remediation: 'Render dataset source/scale, keyKPIs, and curated analytical highlights directly on Featured Project cards (or expandable case-study drawers) without altering the Notion sync schema.'
  },
  {
    id: 'F-02',
    title: '5 of 7 Cards in "All Projects" (#repo-grid) Duplicate "Featured Projects" (#featured-projects)',
    priority: 'MUST FIX',
    status: 'Verified Problem',
    category: 'UI/UX & Responsive',
    location: 'index.html:263–281 · script.js:297–350 · components/repoLoader.js:1–41',
    evidence: '#featured-projects renders 6 Notion projects (Rome Public Transport, Quaero, OpenBDAP, Streaming Competitive Benchmark, DataCivicLab ISPRA, Streaming Metadata Analytics). Immediately below, #repo-grid renders 7 GitHub repos from data/github-repos.json—5 of which are the exact same repositories (plus bilancio-pubblico, which is the renamed repo for OpenBDAP, leaving only dataciviclab hub as non-duplicate).',
    impact: 'Creates immediate visual redundancy, doubles scroll length in #projects, and pairs custom dark dashboard screenshots with jarring white GitHub OpenGraph banners (https://opengraph.githubassets.com/1/...) for the same projects.',
    remediation: 'Unify the Projects section into a single curated showcase powered by data/projects.json enriched with GitHub metadata, and render only non-featured or complementary repositories (such as the DataCivicLab organization hub) in a compact secondary repository table/list.'
  },
  {
    id: 'F-03',
    title: 'Mixed-Language Descriptions & Titles Across IT and EN Modes',
    priority: 'MUST FIX',
    status: 'Verified Problem',
    category: 'Bilingual (IT/EN)',
    location: 'data/github-repos.json · data/projects.json · components/repoCard.js:68',
    evidence: 'In #repo-grid, repo.description comes raw from GitHub: 4 repos (bilancio-pubblico, rome-public-transport-reliability, dataciviclab, progetto-pilota) have Italian-only descriptions that stay Italian when EN is selected; 3 repos (Quaero, Streaming_Competitive_Benchmark, streaming-metadata-analytics) have English-only descriptions that stay English when IT is selected. In #featured-projects, p.title is single-language in Notion ("Rome Public Transport Reliability & Delay Prediction" is English-only; "Openbdap saldi storico stato" and "DataCivicLab: Raccolta Differenziata e Rifiuti Urbani (ISPRA)" are Italian-only even in EN mode).',
    impact: 'Breaks the promise of a fully bilingual Italian/English portfolio; English recruiters see Italian titles and descriptions on civic data projects, while Italian visitors see English titles and descriptions.',
    remediation: 'Add localized titleIt/titleEn support (via Notion properties or a lightweight client-side localization map keyed by project/repo ID) so both titles and repository descriptions switch cleanly between IT and EN.'
  },
  {
    id: 'F-04',
    title: 'Tools Array Sliced to First 3 Items (.slice(0, 3)) Hides Core Stack Tags (Power BI, ETL, Pandas)',
    priority: 'MUST FIX',
    status: 'Verified Problem',
    category: 'Positioning & Content',
    location: 'script.js:334 · data/projects.json',
    evidence: 'script.js line 334 executes tools: Array.isArray(p.tools) ? p.tools.slice(0, 3) : []. Because Notion multi-select tags are not ordered by strategic priority, OpenBDAP displays ["Python", "Python (Pandas)", "GitHub"] (redundant Python tags + GitHub, hiding EDA, Pipeline, KPI engineering, ETL / Automation), and Quaero displays ["Python", "Engineering", "KPI"] (hiding Python (Pandas) and ETL / Automation).',
    impact: 'Under-communicates core technical stack on featured cards and surfaces low-signal tags ("GitHub", "Engineering", duplicate "Python" / "Python (Pandas)").',
    remediation: 'Normalize and deduplicate Notion tool tags against a prioritized canonical taxonomy (Power BI, SQL, Python, Databricks, DAX, PySpark, Delta Lake, ETL / Automation) before rendering.'
  },
  {
    id: 'F-05',
    title: 'Rome Transport Static PDF Classified as "Live Dashboard" & Inflates Hero Metric Counter',
    priority: 'MUST FIX',
    status: 'Verified Problem',
    location: 'script.js:202–206, 220–222, 327–330 · data/projects.json:27',
    category: 'Positioning & Content',
    evidence: 'isExternalDashboardUrl(url) in script.js line 205 checks !/\\.html?$/i.test(clean). Because Rome Transport\'s dashboard URL ends in .pdf (Affidabilita_Trasporto_Pubblico_Roma.pdf on GitHub), isExternalDashboardUrl() returns true. This increments #hero-metric-dashboards to 4 (3 Power BI embeds + 1 PDF) and labels the CTA "Apri dashboard" / "Open dashboard" instead of indicating a Databricks AI/BI PDF export.',
    impact: 'Sets inaccurate user expectation when clicking "Open dashboard" (opens a GitHub PDF viewer rather than an interactive Power BI report) and conflates static exports with live dashboards in the Hero KPI.',
    remediation: 'Update URL classification in script.js to distinguish interactive Power BI reports, internal product pages (.html), and static dashboard exports (.pdf), with accurate CTA labels ("View Dashboard PDF" / "Apri PDF Dashboard").'
  },
  {
    id: 'F-06',
    title: 'Pinned Repo Rename (openbdap-saldi-storico-stato → bilancio-pubblico) Breaks GitHub Metadata Join',
    priority: 'MUST FIX',
    status: 'Verified Problem',
    category: 'Architecture & Sync',
    location: 'data/profile.js:6 · data/projects.json:69 · data/github-repos.json:2–19 · script.js:316–326',
    evidence: 'data/profile.js pins "dataciviclab/openbdap-saldi-storico-stato" and data/projects.json links to "https://github.com/dataciviclab/openbdap-saldi-storico-stato". When scripts/fetch-github-repos.js queries GitHub API, GitHub follows the rename redirect and returns full_name: "dataciviclab/bilancio-pubblico". In script.js line 323, repoIndex.get(normalizeGithubUrl(p.github)) looks up openbdap-saldi-storico-stato, returns undefined, and fails to attach stars or lastCommit to the OpenBDAP featured card.',
    impact: 'OpenBDAP is the only featured card missing GitHub star and last-updated metadata, and its title ("Openbdap saldi storico stato") is out of sync with the live repository name ("bilancio-pubblico").',
    remediation: 'Update the GitHub URL in Notion and pinnedRepos in data/profile.js to https://github.com/dataciviclab/bilancio-pubblico (or add a canonical repo alias map).'
  },
  {
    id: 'F-07',
    title: 'quaero.html Language Default Mismatch ("en" vs "it") & Missing Language Switcher',
    priority: 'MUST FIX',
    status: 'Verified Problem',
    category: 'Bilingual (IT/EN)',
    location: 'index.html:2 · script.js:1 · quaero.html:2, 326',
    evidence: 'index.html defaults to Italian (window.CURRENT_LANG = localStorage.getItem("portfolio-lang") || "it"), and localStorage is ONLY written when the user clicks #lang-it or #lang-en. However, quaero.html line 326 reads var lang = localStorage.getItem("portfolio-lang") || "en". A first-time visitor browsing index.html in Italian who clicks "Esplora progetto" lands on quaero.html in English, with no language toggle button on quaero.html to switch to Italian.',
    impact: 'Jarring language switch from Italian to English mid-journey for first-time visitors, with no UI control on quaero.html to switch languages.',
    remediation: 'Align the default fallback language across index.html and quaero.html (to "it" or browser language detection) and add the IT/EN switcher to the header of quaero.html.'
  },
  {
    id: 'F-08',
    title: '8 Defined Translation Keys in data/profile.js Are Dead/Orphaned (Including heroP3 & footer2)',
    priority: 'HIGH IMPACT',
    status: 'Verified Problem',
    category: 'Bilingual (IT/EN)',
    location: 'data/profile.js:76, 86–88, 90, 100, 114–115 · index.html',
    evidence: 'Cross-referencing all keys in window.PORTFOLIO_PROFILE.translations against [data-i18n] attributes in index.html reveals 8 unused keys in both languages: heroP3, analysisLabel, analysisTitle, analysisText, aboutLocationPill, projectsText, footer1, and footer2. Meanwhile, index.html hardcodes footer text without data-i18n.',
    impact: 'Important positioning copy (such as heroP3 and projectsText) that was carefully written and translated in data/profile.js is never rendered on the website, and the footer does not localize properly.',
    remediation: 'Wire projectsText and footer1 into index.html via data-i18n attributes, and either integrate or clean up deprecated translation keys in data/profile.js.'
  },
  {
    id: 'F-09',
    title: 'Hardcoded Initial Hero KPI Numbers (5 & 2) Cause Hydration Flash to Live Values (6 & 3)',
    priority: 'HIGH IMPACT',
    status: 'Verified Problem',
    category: 'UI/UX & Responsive',
    location: 'index.html:158–167 · script.js:215–239',
    evidence: 'index.html hardcodes <span id="hero-metric-featured">5</span>, <span data-i18n="snapshotProjectsLabel">Progetti in evidenza</span>, <span id="hero-metric-dashboards">3</span>, and <span id="hero-metric-certs">2</span>. Once script.js fetches data/projects.json, these overwrite to 6, "Progetti chiave", 4, and 3.',
    impact: 'Visible text and number jitter in the Hero section during initial page load.',
    remediation: 'Synchronize initial HTML values in index.html with the current snapshot (6 key projects, 3 live Power BI dashboards, 3 completed certifications) and use tabular-nums.'
  },
  {
    id: 'F-10',
    title: 'Missing width/height for rome-transport.png in imageDimensions() Map Causes CLS',
    priority: 'HIGH IMPACT',
    status: 'Verified Problem',
    category: 'Accessibility & Perf',
    location: 'components/repoCard.js:31–41, 93–98',
    evidence: 'imageDimensions(imageUrl) in components/repoCard.js maps dimensions for quaero.png, ispra-waste.png, openbdap.png, streaming-benchmark.png, and streaming-catalog.png, but omits "rome-transport.png" (actual file dimensions verified via file command: 1536 × 1024 PNG, 178,783 bytes).',
    impact: 'The #1 Featured Project card renders an <img> tag without width and height attributes, causing layout reflow (CLS) when the image loads.',
    remediation: 'Add "rome-transport.png": [1536, 1024] to imageDimensions() in components/repoCard.js and enforce CSS aspect-ratio: 16 / 9 on .featured-thumb.'
  },
  {
    id: 'F-11',
    title: 'Font Family "Inter" Is Declared in CSS But Never Loaded in HTML',
    priority: 'HIGH IMPACT',
    status: 'Verified Problem',
    category: 'UI/UX & Responsive',
    location: 'styles.css:26 · index.html:1–43 · quaero.html:34',
    evidence: 'styles.css line 26 sets font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif. Neither index.html nor styles.css includes a Google Fonts <link> or local @font-face for Inter.',
    impact: 'Unless a visitor has Inter installed locally in their OS font library, the site falls back to Segoe UI on Windows or Roboto on Android, altering typographic proportions and line wrapping.',
    remediation: 'Load an explicit webfont pair (such as Plus Jakarta Sans / Public Sans or Inter + JetBrains Mono for tabular numbers) with font-display: swap.'
  },
  {
    id: 'F-12',
    title: 'Uppercase 0.22em Tracking Applied to Full Sentences (.section-note & .section-kicker)',
    priority: 'HIGH IMPACT',
    status: 'Verified Problem',
    category: 'UI/UX & Responsive',
    location: 'styles.css:72–82 · index.html:92, 275, 357',
    evidence: 'styles.css lines 72–82 apply text-transform: uppercase; letter-spacing: 0.22em; font-size: 0.78rem; to .eyebrow, .section-label, .card-label, .section-kicker, .section-note. Consequently, full prose notes like #autoProjectsNote ("UNA SELEZIONE AGGIORNATA DEI PROGETTI PUBBLICATI SU GITHUB.") render in wide-tracked all-caps.',
    impact: 'Hurts scannability and readability on multi-word descriptions and creates visual shouting across section intros.',
    remediation: 'Remove .section-note and .section-kicker from the 0.22em uppercase rule; style notes as normal sentence-case secondary text (0.9rem, #475569, normal tracking) and keep kickers restrained (0.06em tracking max).'
  },
  {
    id: 'F-13',
    title: 'Inverted Semantic Heading Hierarchy (<h1> is 17.6px Subtitle; <h2> is 83px Hero Title)',
    priority: 'HIGH IMPACT',
    status: 'Verified Problem',
    category: 'Accessibility & Perf',
    location: 'index.html:33–35, 95–97 · styles.css:62–66, 123–129',
    evidence: 'In index.html line 33, <h1 class="brand-title" id="site-title" style="font-size: 1.1rem; margin: 12px 0 0;">Portfolio Data & BI Analyst</h1> is inside the topbar with inline styles, while the main page headline is an <h2> (.hero-title at clamp(2.9rem, 6vw, 5.2rem)), and top-level sections (#about, #projects, #skills, #value-section, #contact) use <h3>.',
    impact: 'Screen readers and SEO crawlers see a generic 3-word label as the page H1 and top-level sections demoted to H3. Inline styles in the topbar also break alignment.',
    remediation: 'Promote the Hero headline (or primary identity statement) to <h1>, use <h2> for main section headings (#about, #projects, #skills-section, #value-section, #contact), and <h3> for project/panel card titles.'
  },
  {
    id: 'F-14',
    title: 'Sticky Header Stacks Vertically on Tablet Viewports (641px–980px), Consuming ~180px Height',
    priority: 'HIGH IMPACT',
    status: 'Verified Problem',
    category: 'UI/UX & Responsive',
    location: 'styles.css:54–65, 1065–1087, 1143–1145',
    evidence: 'At @media (max-width: 980px), .topbar and .topbar-right switch to flex-direction: column; align-items: flex-start;, stacking the logo, brand title, nav links, and language switcher vertically. However, .topbar remains position: sticky; top: 0; until @media (max-width: 640px).',
    impact: 'On tablet and split-screen desktop viewports (641px–980px), the sticky header covers roughly 20–25% of the viewport height while scrolling.',
    remediation: 'Keep the topbar in a compact single horizontal row (56px–64px height) across all viewports: display horizontal nav links above 768px and collapse into the hamburger menu at <=768px.'
  },
  {
    id: 'F-15',
    title: 'Missing Keyboard :focus-visible Rings & Low-Contrast Form Input Focus',
    priority: 'HIGH IMPACT',
    status: 'Verified Problem',
    category: 'Accessibility & Perf',
    location: 'styles.css:881–890, 96–113, 307–340, 724–748',
    evidence: '.form-field input and textarea set outline: none; (line 881) and on :focus change border-color to rgba(255, 255, 255, 0.35) (~1.4:1 contrast against #343543). Interactive buttons (.btn, .mini-btn, .lang-btn) and .nav a lack explicit :focus-visible ring styles, and there is no skip-to-content link.',
    impact: 'Fails WCAG 2.1 AA 2.4.7 (Focus Visible) and 1.4.11 (Non-text Contrast) for keyboard users.',
    remediation: 'Add a global :focus-visible { outline: 2px solid #2563EB; outline-offset: 2px; } rule and a <a href="#main-content" class="skip-link">Skip to main content</a> link.'
  },
  {
    id: 'F-16',
    title: 'IntersectionObserver Removes .in-view on Scroll-Out & Hero Title Drifts on Scroll',
    priority: 'NICE TO HAVE',
    status: 'Verified Problem',
    category: 'UI/UX & Responsive',
    location: 'script.js:23–30, 68–70 · styles.css:371–381',
    evidence: 'In setupMotionEffects() (script.js line 28), when an observed element leaves the viewport, entry.target.classList.remove("in-view") is called, resetting opacity: 0; transform: translateY(18px). Additionally, setupScrollMotion() translates .hero-title downward by up to 36px on scroll.',
    impact: 'Causes content to repeatedly disappear and re-animate when scrolling back up the page, and moves the hero title closer to body copy during initial scroll.',
    remediation: 'Unobserve elements once they enter the viewport (revealObserver.unobserve(entry.target)) and remove the parallax translate3d drift on .hero-title.'
  },
  {
    id: 'F-17',
    title: 'Uncompressed PNG Assets (2.69 MB Total; quaero_info.png Is 1.42 MB Alone)',
    priority: 'NICE TO HAVE',
    status: 'Verified Problem',
    category: 'Accessibility & Perf',
    location: 'images/quaero_info.png · images/ispra-waste.png · images/openbdap.png · images/streaming-catalog.png',
    evidence: 'Verified file sizes in /images: quaero_info.png (1,424,708 B, 2752×1536), ispra-waste.png (318,431 B), openbdap.png (213,536 B), streaming-catalog.png (210,522 B), rome-transport.png (178,783 B), streaming-benchmark.png (166,861 B).',
    impact: 'Increases page weight and LCP/bandwidth on mobile networks, especially on quaero.html.',
    remediation: 'Convert PNG screenshots to optimized WebP (quality 82–85) while keeping PNG fallbacks only for og-preview.jpg / favicon-32.png, reducing image payload by ~70%.'
  },
  {
    id: 'F-18',
    title: 'Language Switch Re-Fetches JSON Snapshots Over Network Every Click',
    priority: 'NICE TO HAVE',
    status: 'Verified Problem',
    category: 'Architecture & Sync',
    location: 'components/languageToggle.js:1–10 · script.js:297–315, 483–498',
    evidence: 'Clicking #lang-it or #lang-en calls window.renderPortfolio(), which invokes renderFeatured(lang) and window.loadGithubRepos(lang, labels), executing fetch("data/projects.json") and fetch("data/github-repos.json") again and clearing container.innerHTML = "".',
    impact: 'Causes a brief DOM flash and redundant network/cache reads on every language switch.',
    remediation: 'Cache the parsed projects.json and github-repos.json payloads in memory on initial load and re-render synchronously on language toggle.'
  }
];

export const BILINGUAL_AUDIT_MATRIX: BilingualAuditRow[] = [
  {
    area: 'Featured Project Titles',
    sourceFile: 'data/projects.json (title)',
    itState: '"Rome Public Transport Reliability & Delay Prediction" (EN in IT mode)',
    enState: '"Openbdap saldi storico stato" & "DataCivicLab: Raccolta Differenziata..." (IT in EN mode)',
    status: 'Verified Problem',
    issueDetail: 'Notion only exports a single "Nome progetto" title field; 1 project title is English-only and 2 are Italian-only.'
  },
  {
    area: 'Featured Business Goals',
    sourceFile: 'data/projects.json (businessGoalIt / En)',
    itState: '100% translated (6/6 projects have businessGoalIt)',
    enState: '100% translated (6/6 projects have businessGoalEn)',
    status: 'Verified Problem',
    issueDetail: 'Well-implemented in Notion sync! However, keyKPIs, dataset, and notes in data/projects.json are single-language (mostly Italian for Rome Transport, OpenBDAP, ISPRA; English for Quaero & Streaming).'
  },
  {
    area: 'All Projects (#repo-grid) Descriptions',
    sourceFile: 'data/github-repos.json (description)',
    itState: '3 of 7 repos show English descriptions in IT mode (Quaero, Streaming Benchmark, Streaming Metadata)',
    enState: '4 of 7 repos show Italian descriptions in EN mode (bilancio-pubblico, rome-transport, dataciviclab, progetto-pilota)',
    status: 'Verified Problem',
    issueDetail: 'GitHub repository descriptions are single-language strings; rendering them raw breaks bilingual integrity in both languages.'
  },
  {
    area: 'Quaero Product Page (quaero.html)',
    sourceFile: 'quaero.html (lines 225–327)',
    itState: 'Full IT translation dictionary exists in quaero.html (T.it)',
    enState: 'Full EN translation dictionary exists in quaero.html (T.en)',
    status: 'Verified Problem',
    issueDetail: 'Desynchronized default: index.html defaults to "it" without writing localStorage, while quaero.html defaults to "en" if localStorage is empty. Also lacks an on-page IT/EN toggle.'
  },
  {
    area: 'About Section Meta Tags & Profile Role',
    sourceFile: 'index.html (lines 206–216, 225)',
    itState: 'Static English tags ("ETL & Automation", "Data Modeling", "Advanced Analytics")',
    enState: 'Matches EN',
    status: 'Verified Problem',
    issueDetail: '.about-meta spans lack data-i18n attributes, though standard industry terms in English are acceptable if intentional.'
  },
  {
    area: 'Skills Toolkit Items',
    sourceFile: 'data/profile.js (skillGroups)',
    itState: 'Group labels localize, but skill items remain EN ("Raw → Clean → Mart", "Descriptive Statistics", "Hypothesis Testing")',
    enState: 'Matches EN',
    status: 'Recommendation',
    issueDetail: 'Consider localizing methodological phrases ("Statistica descrittiva", "Test di ipotesi", "Qualità del dato") in IT while keeping tool names (Power BI, SQL, Databricks) canonical.'
  },
  {
    area: 'Accessibility & Form Hidden Fields',
    sourceFile: 'index.html (lines 287, 375, 399) · script.js:303',
    itState: '#skills-section has hardcoded aria-label="Skills and Certifications" in EN',
    enState: 'Web3Forms hidden subject is hardcoded "Nuovo messaggio dal portfolio" in IT; archived badge is hardcoded "Archived"',
    status: 'Verified Problem',
    issueDetail: 'Add data-i18n-aria-label to #skills-section, localize archivedRepoLabel ("Archiviato" / "Archived"), and wire footer1.'
  },
  {
    area: 'Document <title> & Meta Description',
    sourceFile: 'index.html (lines 5–9) · script.js (updateText)',
    itState: 'Italian meta description in <head>',
    enState: 'Remains Italian when switched to EN',
    status: 'Recommendation',
    issueDetail: 'Update document.title and meta[name="description"] dynamically inside updateText(lang) and support ?lang=en URL parameter for shareable English links.'
  }
];

export const SECTION_BY_SECTION_RECOMMENDATIONS: SectionRecommendation[] = [
  {
    sectionId: 'header',
    sectionName: '1. Header & Navigation (.topbar)',
    currentImplementation: 'Sticky flex container with inline styles on brand container (margin-top: 16px), SVG network icon + "MATTEO CAVO" eyebrow + <h1> "Portfolio Data & BI Analyst", 4 nav links, mobile toggle, and pill language switcher.',
    verifiedProblems: [
      'Inline styles in index.html (lines 19–35) create uneven vertical alignment.',
      'Uses <h1> for a 17.6px subtitle in the topbar instead of the hero headline.',
      'Stacks vertically between 641px and 980px while remaining sticky, occupying ~180px of viewport height.'
    ],
    recommendedChanges: [
      'Adopt a single-row 64px enterprise header on white/translucent background (#FFFFFF/90 with 1px #E2E8F0 border).',
      'Replace the two-line inline-styled brand lockup with a clean single-line brand identity: SVG node mark + "Matteo Cavo" + subtle separator "Data & BI Analyst" (using a <div>/<span> instead of <h1>).',
      'Keep horizontal navigation on desktop/tablet (>768px) and collapse cleanly to the mobile drawer at <=768px.'
    ],
    preserveUnchanged: [
      'Existing section anchor IDs (#about, #projects, #skills-section, #contact).',
      'Network graph SVG mark geometry (adapted to #2563EB / #0F172A).'
    ]
  },
  {
    sectionId: 'hero',
    sectionName: '2. Hero Section, Messaging & Profile Snapshot (.hero)',
    currentImplementation: '2-column grid (1.45fr / 0.85fr). Left: kicker, <h2> heroTitle, 2 paragraphs (heroP1, heroP2), 2 CTAs (GitHub primary, Explore Projects secondary). Right: 2 soft-cards ("Ruolo attuale", "Punto di forza") + 1 .hero-dashboard card with dynamic tool-mix bars and 2x2 KPI counters.',
    verifiedProblems: [
      'Primary CTA points externally to GitHub ("Vedi GitHub") while "Esplora i progetti" (#projects) is styled as secondary—sending recruiters off-site before they see the featured case studies.',
      'Right column stacks 3 separate cards vertically, creating competing visual boxes and requiring a transform: translateY(16px) CSS hack on the 2x2 stats grid.',
      'Initial HTML numbers (5 projects, 2 certs) jump to (6 projects, 3 certs) on fetch completion, and "Dashboard live" counts a static PDF as a live dashboard.'
    ],
    recommendedChanges: [
      'Promote "Explore Projects" (#projects) to the Primary CTA (#2563EB solid button) and make "View GitHub" + "Download CV" secondary actions.',
      'Promote .hero-title from <h2> to <h1> with balanced enterprise typography (clamp(2.25rem, 3.8vw, 3.25rem)) and remove the scroll parallax drift.',
      'Consolidate the 3 right-hand cards into one cohesive, Databricks/Superset-inspired "Analytics Profile Spec Sheet" panel: top row with the 4 verified KPIs (15+ Years Exp, 6 Featured Projects, 3 Live BI Dashboards, 3 Certifications) in tabular numerals, middle row with the dynamic Notion Tool Mix bar chart, and bottom row with core stack focus (Power BI · SQL · Python · Databricks).'
    ],
    preserveUnchanged: [
      'Dynamic computation of tool mix counts from data/projects.json in renderHeroDashboard().',
      'Core positioning copy emphasizing 15+ years international experience and hybrid BI + Data Engineering profile.'
    ]
  },
  {
    sectionId: 'about',
    sectionName: '3. About / Professional Profile (#about)',
    currentImplementation: '2-column split (1fr / 1fr). Left: label, <h3> title, 9 .meta-pill tags, circular 72px photo + name/role/location/badge. Right: 3 narrative paragraphs (Web & Multimedia → CEO/Creative Director → Gracenote/Nielsen enterprise metadata ops) with padding-top: 64px.',
    verifiedProblems: [
      'Desktop .about-copy uses a hardcoded padding-top: 64px magic number to align with the left column.',
      '9 .meta-pill tags duplicate the Hero kicker and the Skills section directly below.',
      'The high-value enterprise credential—Gracenote (Nielsen) working on Netflix, Prime Video, Disney+, and Sky catalogs—is buried at the bottom of the third paragraph.'
    ],
    recommendedChanges: [
      'Remove the hardcoded padding-top: 64px and align columns cleanly via CSS Grid.',
      'Structure the 3 paragraphs as a clear 3-stage career progression timeline or structured narrative cards: (1) Enterprise Data & Metadata Operations at Gracenote (Nielsen) for Netflix, Prime Video, Disney+, Sky; (2) International Leadership & Process Optimization; (3) UX, Visual Design & Analytical Storytelling.',
      'Replace the 9 repetitive pill chips with concise, unboxed profile metadata (Location: Rome, Italy · Experience: 15+ Years · Focus: BI, ETL & Lakehouse).'
    ],
    preserveUnchanged: [
      'Authentic career narrative (no invented titles or metrics).',
      'Profile photo asset (images/matteo-profile.jpg).'
    ]
  },
  {
    sectionId: 'projects',
    sectionName: '4. Featured Projects & GitHub Repositories (#projects)',
    currentImplementation: 'Two stacked 3-column grids: #featured-projects (6 cards from data/projects.json) followed by #repo-grid (7 cards from data/github-repos.json).',
    verifiedProblems: [
      '5 of 7 repositories in #repo-grid duplicate the exact projects shown in #featured-projects.',
      'Rich Notion data in data/projects.json (keyKPIs, dataset, notes, date) is completely ignored by script.js.',
      'tools.slice(0, 3) hides key technologies (Power BI, ETL, Pandas) behind generic tags ("GitHub", "Engineering").',
      'Flagship projects (Rome Public Transport on Databricks and DataCivicLab ISPRA Waste) are given the exact same compact card footprint as smaller projects, hiding Rome Transport\'s 9.97M observations / Medallion architecture and ISPRA\'s municipal decoupling insights.',
      'OpenBDAP card fails to match its renamed GitHub repo (bilancio-pubblico), losing star/date metadata.'
    ],
    recommendedChanges: [
      'Eliminate duplicate rendering: use a single primary projects grid driven by data/projects.json (merged with github-repos.json metadata), and display remaining non-duplicate repos (e.g., DataCivicLab hub) in a compact "Open Source & Civic Tech Contributions" row.',
      'Upgrade project cards to an enterprise case-study card layout displaying: (1) Category & Date kicker, (2) Localized Title, (3) Localized Business Goal, (4) Dataset & Architecture strip (from p.dataset), (5) Key KPIs / Verified Outcomes strip (from p.keyKPIs), (6) Prioritized Tech Stack tags, and (7) Accurate CTAs ("Open Power BI Dashboard", "View Databricks Dashboard PDF", "Explore Architecture Page", "GitHub Repo").',
      'Feature Rome Public Transport (Databricks Medallion + ML) and DataCivicLab ISPRA / Quaero prominently at the top of the grid with an interactive "Methodology & Findings" drawer powered by p.notes.'
    ],
    preserveUnchanged: [
      'Hourly Notion -> data/projects.json and GitHub -> data/github-repos.json automated sync pipeline.',
      'All real links to GitHub repositories, Power BI embeds, Databricks PDF, and quaero.html.'
    ]
  },
  {
    sectionId: 'skills-certs',
    sectionName: '5. Skills, Certifications & Value Proposition (#skills-section & #value-section)',
    currentImplementation: 'Stacked full-width cards for Skills (4 groups with middot-separated strings) and Certifications (3 completed with external verification links, 2 in progress), followed by a 2-column Value Proposition section.',
    verifiedProblems: [
      '#skills-section stacks Skills and Certifications in single-column full-width blocks instead of utilizing a balanced 2-column desktop grid.',
      'Skill items are rendered as long middot-separated prose paragraphs where core anchors (Power BI, SQL, Python, Databricks) have the same visual weight as secondary utilities (YAML, DuckDB).',
      'Value Proposition (#value-section) repeats points already stated in the Hero sidecards ("Punto di forza").'
    ],
    recommendedChanges: [
      'Place Core Toolkit (4 structured domain groups: Business Intelligence, Data Engineering & Lakehouse, Statistical Analysis, Applied ML) and Verified Certifications side-by-side in a 12-column desktop grid.',
      'Highlight primary pillars (Power BI, SQL, Python, Databricks) distinctly within their domain groups while keeping secondary tools scannable.',
      'Merge the strongest differentiating statements from #value-section ("I do not treat dashboards as decoration—I build them as analytical tools") into the About / Methodology section to tighten page flow.'
    ],
    preserveUnchanged: [
      'Exact certification list (3 completed: Google Advanced Data Analytics 2026, Google AI 2026, Databricks Fundamentals 2026; 2 in progress: Microsoft PL-300, Databricks Certified Data Engineer Associate) and their verification URLs.',
      'Dynamic JSON-LD Schema.org update (updateStructuredData) for knowsAbout and hasCredential.'
    ]
  },
  {
    sectionId: 'contact-footer',
    sectionName: '6. Contact, CV Download & Footer (#contact & .footer)',
    currentImplementation: 'CV download button (switches between Matteo_Cavo_CV_IT.pdf and Matteo_Cavo_CV_EN.pdf), 3 external link cards (GitHub, LinkedIn, Notion Projects), Web3Forms contact form, and centered footer.',
    verifiedProblems: [
      'CV download is only placed at the very bottom of the page in #contact (recruiters often look for it in the Hero or Header).',
      'Form inputs remove focus outline (outline: none) with low-contrast focus borders.',
      'Hidden Web3Forms subject is hardcoded in Italian, and footer ignores footer1/footer2 translation keys.'
    ],
    recommendedChanges: [
      'Arrange #contact into a clean 2-column enterprise layout: Left column with direct channels (LinkedIn, GitHub, Notion Portfolio DB) and bilingual CV download card; Right column with the Web3Forms message panel and high-contrast #2563EB focus rings.',
      'Wire footer translation keys and include quick navigation + language links.'
    ],
    preserveUnchanged: [
      'Web3Forms access_key and submission logic in setupContactForm().',
      'Language-aware CV download switching between Matteo_Cavo_CV_IT.pdf and Matteo_Cavo_CV_EN.pdf.'
    ]
  }
];
