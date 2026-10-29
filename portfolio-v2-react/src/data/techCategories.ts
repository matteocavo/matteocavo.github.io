import type { NotionProjectData } from './portfolioData';

export type TechCategoryId =
  | 'python-analytics'
  | 'data-engineering-lakehouse'
  | 'kpi-eda'
  | 'bi-powerbi'
  | 'sql-modeling'
  | 'ai-ml'
  | 'low-code-automation';

export interface TechCategoryDefinition {
  id: TechCategoryId;
  nameIt: string;
  nameEn: string;
  shortLabelIt: string;
  shortLabelEn: string;
  contextNoteIt: string;
  contextNoteEn: string;
  /** Canonical Notion tool names and supported synonyms (matched case-insensitively). */
  tools: readonly string[];
}

export interface TechCategoryProjectEntry {
  id: string;
  titleIt: string;
  titleEn: string;
  matchedTools: string[];
}

export interface TechCategoryStat {
  id: TechCategoryId;
  nameIt: string;
  nameEn: string;
  shortLabelIt: string;
  shortLabelEn: string;
  count: number;
  total: number;
  percentage: number;
  labelIt: string;
  labelEn: string;
  contextNoteIt: string;
  contextNoteEn: string;
  projects: TechCategoryProjectEntry[];
}

/**
 * Cross-cutting repository/version-control tags present across Notion records
 * that are intentionally recognized as non-analytical meta tags (never shown
 * as a standalone Tech Mix bar and never flagged as unknown tools).
 */
export const NON_CATEGORY_META_TOOLS: readonly string[] = [
  'GitHub',
  'Git',
  'Git / GitHub',
  'Render',
  'Render Free',
  'GitHub Pages'
];

/**
 * Lakehouse & distributed compute technologies (subset of `data-engineering-lakehouse`).
 * Separated from general ETL/pipeline tools so non-Databricks pipeline projects are
 * never mislabeled as Lakehouse architectures on project cards.
 */
export const LAKEHOUSE_ARCHITECTURE_TOOLS: readonly string[] = [
  'Databricks',
  'PySpark',
  'Delta Lake',
  'Apache Spark',
  'Spark',
  'Lakehouse',
  'Lakehouse Architecture',
  'Unity Catalog'
];

/**
 * Reproducible ETL/ELT pipelines, analytical marts, data APIs, and service infrastructure
 * (subset of `data-engineering-lakehouse`).
 */
export const DATA_PIPELINE_ENGINEERING_TOOLS: readonly string[] = [
  'ETL / Automation',
  'Pipeline',
  'Engineering',
  'FastAPI',
  'Docker',
  'Caddy',
  'GitHub Actions',
  'Parquet',
  'Data Engineering',
  'ETL',
  'ELT',
  'Data Pipeline',
  'Streamlit'
];

/**
 * Classical supervised/unsupervised machine learning & predictive modeling tools
 * (subset of `ai-ml`). Distinguished from LLM/RAG application engineering.
 */
export const TRADITIONAL_ML_TOOLS: readonly string[] = [
  'Applied ML',
  'scikit-learn',
  'Machine Learning',
  'ML',
  'MLflow',
  'Spark ML',
  'Random Forest',
  'Gradient Boosting',
  'XGBoost',
  'HistGradientBoosting',
  'Classification',
  'Regression',
  'Feature Engineering'
];

/**
 * LLM, Retrieval-Augmented Generation (RAG), speech-to-text, and vector search
 * application engineering tools (subset of `ai-ml`). Distinguished from classical ML.
 */
export const LLM_RAG_AI_ENGINEERING_TOOLS: readonly string[] = [
  'AI Engineering',
  'RAG',
  'LLM',
  'FAISS',
  'sentence-transformers',
  'faster-whisper',
  'Whisper',
  'Claude',
  'Claude API',
  'Anthropic',
  'Anthropic API',
  'OpenAI',
  'Embeddings',
  'Vector Search',
  'GenAI'
];

/**
 * Centralized, bilingual Tech Mix category definitions.
 *
 * Design principles:
 * - Category membership is derived strictly from a project's Notion `Tools` tags
 *   (never from project names, slugs, or hardcoded project ID lists).
 * - Overlapping categories (`Databricks & Lakehouse` and `Data Engineering & ETL`)
 *   are consolidated into `Data Engineering & Lakehouse`, combining
 *   `DATA_PIPELINE_ENGINEERING_TOOLS` and `LAKEHOUSE_ARCHITECTURE_TOOLS` without
 *   implying that every pipeline project uses Databricks.
 * - `AI Engineering & Applied ML` combines `TRADITIONAL_ML_TOOLS` and
 *   `LLM_RAG_AI_ENGINEERING_TOOLS` while preserving their semantic distinction.
 * - `Automation & Low-Code / No-Code Platforms` strictly matches genuine
 *   low-code/no-code workflow tools (`n8n`, `Power Automate`, `Make`, `Zapier`, etc.)
 *   rather than general code-based ETL pipelines (`ETL / Automation`, `Pipeline`)
 *   or custom-engineered AI applications (`Interview Copilot`).
 * - Empty categories (`count === 0` among eligible `Portfolio Ready` projects)
 *   are automatically omitted by `computeTechCategoryStats` and automatically
 *   appear as soon as a matching project becomes `Portfolio Ready`.
 */
export const TECH_CATEGORIES: readonly TechCategoryDefinition[] = [
  {
    id: 'python-analytics',
    nameIt: 'Python e Data Analytics',
    nameEn: 'Python & Data Analytics',
    shortLabelIt: 'Python e Data Analytics',
    shortLabelEn: 'Python & Data Analytics',
    contextNoteIt:
      'Analisi dei dati, manipolazione tabellare e statistica applicata con Python, Pandas e NumPy nei casi studio.',
    contextNoteEn:
      'Data analysis, tabular manipulation, and statistical analysis with Python, Pandas, and NumPy across case studies.',
    tools: [
      'Python',
      'Python (Pandas)',
      'Pandas',
      'Numpy',
      'NumPy',
      'Plotly',
      'Statistical Analysis',
      'SciPy',
      'Matplotlib',
      'Seaborn',
      'Jupyter',
      'Data Analytics',
      'Descriptive Statistics',
      'Hypothesis Testing'
    ]
  },
  {
    id: 'data-engineering-lakehouse',
    nameIt: 'Ingegneria dei dati e architetture Lakehouse',
    nameEn: 'Data Engineering & Lakehouse',
    shortLabelIt: 'Ingegneria Dati & Lakehouse',
    shortLabelEn: 'Data Engineering & Lakehouse',
    contextNoteIt:
      'Pipeline ETL/ELT riproducibili, data mart analitici e API dati nei casi studio; include architetture Medallion su Databricks Lakehouse nei progetti dedicati.',
    contextNoteEn:
      'Reproducible ETL/ELT pipelines, analytical data marts, and data APIs across case studies; includes Medallion architectures on Databricks Lakehouse where applicable.',
    tools: [...LAKEHOUSE_ARCHITECTURE_TOOLS, ...DATA_PIPELINE_ENGINEERING_TOOLS]
  },
  {
    id: 'kpi-eda',
    nameIt: 'Ingegneria dei KPI e analisi esplorativa (EDA)',
    nameEn: 'KPI Engineering & EDA',
    shortLabelIt: 'KPI & Analisi Esplorativa',
    shortLabelEn: 'KPI Engineering & EDA',
    contextNoteIt:
      'Progettazione di indicatori sintetici di performance (KPI), profilazione della qualità dei dati e analisi esplorativa (EDA).',
    contextNoteEn:
      'Design of composite performance indicators (KPIs), data quality profiling, and exploratory data analysis (EDA).',
    tools: [
      'KPI',
      'KPI engineering',
      'KPI Engineering',
      'EDA',
      'Exploratory Data Analysis',
      'KPI Design',
      'Time Series',
      'Competitive Intelligence',
      'Data Quality',
      'Mermaid.js'
    ]
  },
  {
    id: 'bi-powerbi',
    nameIt: 'Business Intelligence, Power BI e DAX',
    nameEn: 'Business Intelligence & Power BI',
    shortLabelIt: 'BI, Power BI e DAX',
    shortLabelEn: 'Power BI & DAX',
    contextNoteIt:
      'Dashboard esecutive interattive, modellazione semantica, misure DAX avanzate e reporting decisionale in Power BI ed Excel.',
    contextNoteEn:
      'Interactive executive dashboards, semantic modeling, advanced DAX measures, and decision reporting in Power BI and Excel.',
    tools: [
      'Power BI',
      'DAX',
      'Excel',
      'Power Query',
      'Business Intelligence',
      'BI',
      'Tableau',
      'Looker Studio',
      'Data Visualization'
    ]
  },
  {
    id: 'sql-modeling',
    nameIt: 'SQL e modellazione dei dati',
    nameEn: 'SQL & Data Modeling',
    shortLabelIt: 'SQL & Modellazione Dati',
    shortLabelEn: 'SQL & Data Modeling',
    contextNoteIt:
      'Query analitiche SQL, persistenza relazionale (PostgreSQL, SQLAlchemy, Alembic) e modellazione dimensionale per data mart.',
    contextNoteEn:
      'Analytical SQL queries, relational persistence (PostgreSQL, SQLAlchemy, Alembic), and dimensional data mart modeling.',
    tools: [
      'SQL',
      'PostgreSQL',
      'Neon',
      'PostgreSQL / Neon',
      'SQLAlchemy',
      'Alembic',
      'Data Modeling',
      'Dimensional Modeling',
      'Star Schema',
      'DuckDB',
      'SQLite',
      'Databricks SQL',
      'dbt',
      'DDL'
    ]
  },
  {
    id: 'ai-ml',
    nameIt: 'AI Engineering e Machine Learning applicato',
    nameEn: 'AI Engineering & Applied ML',
    shortLabelIt: 'AI & ML Applicato',
    shortLabelEn: 'AI & Applied ML',
    contextNoteIt:
      'Distinto tra Machine Learning supervisionato (classificazione/regressione con scikit-learn, Random Forest e validazione temporale) e ingegneria di applicazioni LLM/RAG (FAISS, Whisper e API LLM).',
    contextNoteEn:
      'Distinguishes classical supervised Machine Learning (scikit-learn classification/regression and temporal validation) from LLM/RAG application engineering (FAISS, Whisper, and LLM APIs).',
    tools: [...TRADITIONAL_ML_TOOLS, ...LLM_RAG_AI_ENGINEERING_TOOLS]
  },
  {
    id: 'low-code-automation',
    nameIt: 'Automazione e piattaforme Low-Code / No-Code',
    nameEn: 'Automation & Low-Code / No-Code Platforms',
    shortLabelIt: 'Low-Code & Automazione',
    shortLabelEn: 'Low-Code & Automation',
    contextNoteIt:
      'Orchestrazione visuale di workflow, integrazione webhook e automazione operativa tramite piattaforme Low-Code / No-Code (n8n).',
    contextNoteEn:
      'Visual workflow orchestration, webhook integration, and operational automation via Low-Code / No-Code platforms (n8n).',
    tools: [
      'n8n',
      'n8n Community',
      'n8n Cloud',
      'Low-Code',
      'No-Code',
      'Low-Code / No-Code',
      'Power Automate',
      'Make',
      'Zapier',
      'Power Apps',
      'Airtable',
      'Retool'
    ]
  }
];

/** Normalizes a tool string for case-insensitive, whitespace-tolerant matching. */
export function normalizeToolName(tool: string): string {
  return tool.trim().replace(/\s+/g, ' ').toLowerCase();
}

const META_TOOL_SET: ReadonlySet<string> = new Set(
  NON_CATEGORY_META_TOOLS.map(normalizeToolName)
);

const CATEGORY_BY_ID: ReadonlyMap<TechCategoryId, TechCategoryDefinition> = new Map(
  TECH_CATEGORIES.map((cat) => [cat.id, cat])
);

const CATEGORY_NORMALIZED_TOOL_SETS: ReadonlyMap<TechCategoryId, ReadonlySet<string>> = new Map(
  TECH_CATEGORIES.map((cat) => [
    cat.id,
    new Set(cat.tools.map(normalizeToolName))
  ])
);

/** Returns true if the tool is a recognized non-analytical meta tag (e.g. GitHub). */
export function isMetaTool(tool: string): boolean {
  return META_TOOL_SET.has(normalizeToolName(tool));
}

/** Returns all categories matched by a single Notion tool name. */
export function getCategoriesForTool(tool: string): TechCategoryDefinition[] {
  const norm = normalizeToolName(tool);
  if (!norm || META_TOOL_SET.has(norm)) return [];
  return TECH_CATEGORIES.filter((cat) =>
    CATEGORY_NORMALIZED_TOOL_SETS.get(cat.id)?.has(norm)
  );
}

/**
 * Returns the matched tools for a project within a given category, ordered
 * deterministically by the category's canonical `tools` list so the result
 * never depends on the order of `Tools` in Notion.
 */
export function getMatchedToolsForCategory(
  projectTools: readonly string[],
  categoryOrId: TechCategoryId | TechCategoryDefinition
): string[] {
  const category =
    typeof categoryOrId === 'string' ? CATEGORY_BY_ID.get(categoryOrId) : categoryOrId;
  if (!category) return [];

  const projectNormMap = new Map<string, string>();
  for (const rawTool of projectTools) {
    const norm = normalizeToolName(rawTool);
    if (norm && !projectNormMap.has(norm)) {
      projectNormMap.set(norm, rawTool.trim());
    }
  }

  const matched: string[] = [];
  const seenNorm = new Set<string>();
  for (const canonicalTool of category.tools) {
    const norm = normalizeToolName(canonicalTool);
    if (projectNormMap.has(norm) && !seenNorm.has(norm)) {
      seenNorm.add(norm);
      matched.push(canonicalTool);
    }
  }
  return matched;
}

/**
 * Checks whether a project's `tools` match a given category.
 * Order-independent and case-insensitive.
 */
export function projectMatchesCategory(
  projectTools: readonly string[],
  categoryOrId: TechCategoryId | TechCategoryDefinition
): boolean {
  const category =
    typeof categoryOrId === 'string' ? CATEGORY_BY_ID.get(categoryOrId) : categoryOrId;
  if (!category) return false;
  const toolSet = CATEGORY_NORMALIZED_TOOL_SETS.get(category.id);
  if (!toolSet) return false;
  return projectTools.some((t) => toolSet.has(normalizeToolName(t)));
}

/**
 * Returns all Tech Mix categories that a project belongs to, in the canonical
 * `TECH_CATEGORIES` order (never dependent on the order of `Tools` in Notion).
 */
export function getCategoriesForProject(
  projectTools: readonly string[]
): TechCategoryDefinition[] {
  return TECH_CATEGORIES.filter((cat) => projectMatchesCategory(projectTools, cat));
}

/**
 * Computes dynamic Tech Mix statistics across the provided eligible
 * (`Portfolio Ready`) projects.
 *
 * - Counts distinct eligible projects per category (never raw tool occurrences).
 * - Allows each project to contribute to multiple categories.
 * - Excludes empty categories (`count === 0`).
 * - Never depends on the order of `Tools` in Notion.
 */
export function computeTechCategoryStats(
  projects: readonly NotionProjectData[]
): TechCategoryStat[] {
  const total = projects.length;
  if (total === 0) return [];

  const stats: TechCategoryStat[] = [];

  for (const category of TECH_CATEGORIES) {
    const matchingProjects: TechCategoryProjectEntry[] = [];

    for (const project of projects) {
      const matchedTools = getMatchedToolsForCategory(project.tools, category);
      if (matchedTools.length > 0) {
        matchingProjects.push({
          id: project.id,
          titleIt: project.titleIt,
          titleEn: project.titleEn,
          matchedTools
        });
      }
    }

    const count = matchingProjects.length;
    if (count === 0) {
      continue;
    }

    const percentage = Math.round((count / total) * 100);
    stats.push({
      id: category.id,
      nameIt: category.nameIt,
      nameEn: category.nameEn,
      shortLabelIt: category.shortLabelIt,
      shortLabelEn: category.shortLabelEn,
      count,
      total,
      percentage,
      labelIt: `${count} su ${total} progetti`,
      labelEn: `${count} of ${total} projects`,
      contextNoteIt: category.contextNoteIt,
      contextNoteEn: category.contextNoteEn,
      projects: matchingProjects
    });
  }

  return stats;
}

const LAKEHOUSE_ARCHITECTURE_SET: ReadonlySet<string> = new Set(
  LAKEHOUSE_ARCHITECTURE_TOOLS.map(normalizeToolName)
);

const TRADITIONAL_ML_SET: ReadonlySet<string> = new Set(
  TRADITIONAL_ML_TOOLS.map(normalizeToolName)
);

const LLM_RAG_SET: ReadonlySet<string> = new Set(
  LLM_RAG_AI_ENGINEERING_TOOLS.map(normalizeToolName)
);

function resolveProjectCategoryShortLabel(
  cat: TechCategoryDefinition,
  tools: readonly string[],
  lang: 'it' | 'en',
  hasLakehouseArchitecture: boolean
): string {
  if (cat.id === 'data-engineering-lakehouse') {
    if (hasLakehouseArchitecture) {
      return lang === 'it' ? 'Ingegneria Dati & Lakehouse' : 'Data Engineering & Lakehouse';
    }
    return lang === 'it' ? 'Ingegneria Dati & Pipeline' : 'Data Engineering & Pipelines';
  }

  if (cat.id === 'ai-ml') {
    const hasTraditionalMl = tools.some((t) => TRADITIONAL_ML_SET.has(normalizeToolName(t)));
    const hasLlmRag = tools.some((t) => LLM_RAG_SET.has(normalizeToolName(t)));
    if (hasTraditionalMl && !hasLlmRag) {
      return lang === 'it' ? 'Machine Learning Applicato' : 'Applied Machine Learning';
    }
    if (hasLlmRag && !hasTraditionalMl) {
      return lang === 'it' ? 'Ingegneria AI & RAG' : 'AI Engineering & RAG';
    }
  }

  return lang === 'it' ? cat.shortLabelIt : cat.shortLabelEn;
}

/**
 * Derives a concise, bilingual highlight category label for a project card
 * strictly from its `tools` array, independent of Notion's tool order.
 * Distinguishes Lakehouse vs. pipeline-only data engineering and classical ML
 * vs. LLM/RAG application engineering. Includes a deterministic alphabetical
 * fallback for unknown tools.
 */
export function deriveHighlightCategory(
  tools: readonly string[],
  lang: 'it' | 'en' = 'en'
): string {
  const hasLakehouseArchitecture = tools.some((t) =>
    LAKEHOUSE_ARCHITECTURE_SET.has(normalizeToolName(t))
  );

  const priorityOrder: TechCategoryId[] = hasLakehouseArchitecture
    ? [
        'ai-ml',
        'low-code-automation',
        'bi-powerbi',
        'data-engineering-lakehouse',
        'sql-modeling',
        'kpi-eda',
        'python-analytics'
      ]
    : [
        'ai-ml',
        'low-code-automation',
        'bi-powerbi',
        'sql-modeling',
        'kpi-eda',
        'data-engineering-lakehouse',
        'python-analytics'
      ];

  const matched = priorityOrder
    .map((id) => CATEGORY_BY_ID.get(id)!)
    .filter((cat) => projectMatchesCategory(tools, cat));

  if (matched.length >= 2) {
    const first = resolveProjectCategoryShortLabel(
      matched[0],
      tools,
      lang,
      hasLakehouseArchitecture
    );
    const second = resolveProjectCategoryShortLabel(
      matched[1],
      tools,
      lang,
      hasLakehouseArchitecture
    );
    return `${first} · ${second}`;
  }

  if (matched.length === 1) {
    return resolveProjectCategoryShortLabel(
      matched[0],
      tools,
      lang,
      hasLakehouseArchitecture
    );
  }

  // Safe, order-independent fallback when a project has only unknown/meta tools
  const concreteFallback = Array.from(
    new Set(
      tools
        .map((t) => t.trim())
        .filter((t) => t.length > 0 && !isMetaTool(t))
    )
  ).sort((a, b) => a.localeCompare(b));

  if (concreteFallback.length >= 2) {
    return `${concreteFallback[0]} · ${concreteFallback[1]}`;
  }
  if (concreteFallback.length === 1) {
    return concreteFallback[0];
  }
  return lang === 'it' ? 'Analisi dei Dati' : 'Data Analytics';
}

/**
 * Canonical priority order for concise tool badges shown on project cards.
 * Ensures badge selection never depends on the order of `Tools` in Notion
 * and avoids dumping generic/meta tags (`GitHub`, `Engineering`, `Pipeline`)
 * or duplicate pairs (`Python` + `Python (Pandas)`).
 */
const CANONICAL_BADGE_PRIORITY: readonly string[] = [
  'Databricks',
  'PySpark',
  'Delta Lake',
  'Applied ML',
  'scikit-learn',
  'FastAPI',
  'n8n',
  'Power BI',
  'DAX',
  'PostgreSQL',
  'SQL',
  'SQLAlchemy',
  'Alembic',
  'Python (Pandas)',
  'Pandas',
  'Python',
  'Numpy',
  'Plotly',
  'Excel',
  'Statistical Analysis',
  'KPI engineering',
  'KPI Engineering',
  'KPI',
  'EDA',
  'ETL / Automation',
  'Docker',
  'Caddy',
  'GitHub Actions',
  'Streamlit',
  'Parquet',
  'Data Modeling',
  'Time Series',
  'Competitive Intelligence',
  'Mermaid.js'
];

const GENERIC_PROCESS_TOOLS: ReadonlySet<string> = new Set(
  ['Engineering', 'Pipeline'].map(normalizeToolName)
);

/**
 * Returns at most `maxBadges` concise, meaningful tool badges for a project card,
 * completely independent of the order in which tools appear in Notion.
 */
export function getConciseProjectBadges(
  tools: readonly string[],
  maxBadges: number = 3
): string[] {
  if (!tools || tools.length === 0 || maxBadges <= 0) return [];

  const normToDisplay = new Map<string, string>();
  for (const raw of tools) {
    const trimmed = raw.trim();
    const norm = normalizeToolName(trimmed);
    if (norm && !normToDisplay.has(norm)) {
      normToDisplay.set(norm, trimmed);
    }
  }

  // Deduplicate redundant tool pairs so badge slots stay concise and informative
  if (normToDisplay.has(normalizeToolName('Python (Pandas)'))) {
    normToDisplay.delete(normalizeToolName('Python'));
    normToDisplay.delete(normalizeToolName('Pandas'));
  }
  if (
    normToDisplay.has(normalizeToolName('KPI engineering')) ||
    normToDisplay.has(normalizeToolName('KPI Engineering'))
  ) {
    normToDisplay.delete(normalizeToolName('KPI'));
  }

  const selected: string[] = [];
  const usedNorms = new Set<string>();

  for (const candidate of CANONICAL_BADGE_PRIORITY) {
    const norm = normalizeToolName(candidate);
    if (normToDisplay.has(norm) && !usedNorms.has(norm)) {
      usedNorms.add(norm);
      selected.push(normToDisplay.get(norm)!);
      if (selected.length >= maxBadges) return selected;
    }
  }

  // Deterministic alphabetical fallback for any newly added unknown concrete tools
  const remainingUnknown = Array.from(normToDisplay.entries())
    .filter(
      ([norm]) =>
        !usedNorms.has(norm) && !META_TOOL_SET.has(norm) && !GENERIC_PROCESS_TOOLS.has(norm)
    )
    .map(([, display]) => display)
    .sort((a, b) => a.localeCompare(b));

  for (const item of remainingUnknown) {
    selected.push(item);
    if (selected.length >= maxBadges) return selected;
  }

  // Final safety fallback if a project only had generic/meta tags
  if (selected.length === 0) {
    return Array.from(normToDisplay.values())
      .sort((a, b) => a.localeCompare(b))
      .slice(0, maxBadges);
  }

  return selected;
}

/**
 * Matches a project's `tools` against a UI filter tag (`ALL`, a `TechCategoryId`,
 * or legacy filter pill values such as `'Databricks'`, `'Power BI'`, `'Python'`, `'SQL'`).
 */
export function projectMatchesTechFilter(
  projectTools: readonly string[],
  filterTag: string
): boolean {
  if (!filterTag || filterTag === 'ALL') return true;

  if (CATEGORY_BY_ID.has(filterTag as TechCategoryId)) {
    return projectMatchesCategory(projectTools, filterTag as TechCategoryId);
  }

  const normFilter = normalizeToolName(filterTag);
  if (normFilter === 'power bi') {
    return projectMatchesCategory(projectTools, 'bi-powerbi');
  }
  if (normFilter === 'sql') {
    return projectMatchesCategory(projectTools, 'sql-modeling');
  }
  if (normFilter === 'python') {
    return (
      projectMatchesCategory(projectTools, 'python-analytics') ||
      projectMatchesCategory(projectTools, 'ai-ml')
    );
  }
  if (normFilter === 'databricks') {
    const dbSet = new Set(
      ['Databricks', 'PySpark', 'Delta Lake', 'Apache Spark', 'Spark', 'Lakehouse'].map(
        normalizeToolName
      )
    );
    return projectTools.some((t) => dbSet.has(normalizeToolName(t)));
  }

  return projectTools.some((t) => normalizeToolName(t).includes(normFilter));
}

/**
 * Inspects a list of projects or raw tool strings and returns any tool names
 * that are not mapped to any category in `TECH_CATEGORIES` (excluding
 * known `NON_CATEGORY_META_TOOLS` by default).
 */
export function findUnmappedTools(
  input: ReadonlyArray<{ tools: readonly string[] } | string>,
  options?: { includeMetaTools?: boolean }
): string[] {
  const includeMeta = options?.includeMetaTools === true;
  const unmappedByNorm = new Map<string, string>();

  const checkTool = (raw: string) => {
    const trimmed = raw.trim();
    const norm = normalizeToolName(trimmed);
    if (!norm) return;
    if (!includeMeta && META_TOOL_SET.has(norm)) return;
    const matchedCats = TECH_CATEGORIES.filter((cat) =>
      CATEGORY_NORMALIZED_TOOL_SETS.get(cat.id)?.has(norm)
    );
    if (matchedCats.length === 0 && !unmappedByNorm.has(norm)) {
      unmappedByNorm.set(norm, trimmed);
    }
  };

  for (const entry of input) {
    if (typeof entry === 'string') {
      checkTool(entry);
    } else if (entry && Array.isArray(entry.tools)) {
      for (const t of entry.tools) {
        checkTool(t);
      }
    }
  }

  return Array.from(unmappedByNorm.values()).sort((a, b) => a.localeCompare(b));
}

/**
 * Reports any unmapped tools found in live Notion project data via `console.warn`
 * so newly added Notion tags are immediately surfaced if category rules need extending.
 */
export function reportUnmappedTools(
  projects: ReadonlyArray<{ id?: string; title?: string; tools: readonly string[] }>
): string[] {
  const unmapped = findUnmappedTools(projects);
  if (unmapped.length > 0) {
    console.warn(
      `[Tech Categories] Unmapped Notion tools detected (${unmapped.join(', ')}). ` +
        `Safe fallbacks are active; extend TECH_CATEGORIES in src/data/techCategories.ts if these should map to a Tech Mix category.`
    );
  }
  return unmapped;
}
