export interface NotionProjectData {
  id: string;
  titleIt: string;
  titleEn: string;
  businessGoalIt: string;
  businessGoalEn: string;
  tools: string[];
  keyKPIs: string[];
  datasetIt: string;
  datasetEn: string;
  date: string;
  notesIt: string;
  notesEn: string;
  githubUrl: string;
  dashboardUrl: string | null;
  dashboardType: 'pdf' | 'live_powerbi' | 'internal' | null;
  stars?: number;
  lastUpdated?: string;
  image: string;
  highlightCategory: string;
  /** Notion "Portfolio Flagship" checkbox (Phase 3 Priority 2). Not yet in the
   *  production Notion schema, so real records will have this undefined until
   *  that schema change is separately authorized. */
  isFlagship?: boolean;
}

export interface SecondaryRepoData {
  name: string;
  fullName: string;
  descriptionIt: string;
  descriptionEn: string;
  htmlUrl: string;
  topics: string[];
  stars: number;
  updatedAt: string;
  ownerType: 'Organization' | 'Personal';
}

export type BusinessObjectiveId =
  | 'decision-support-bi'
  | 'data-quality-metadata'
  | 'data-engineering-automation'
  | 'predictive-analytics-ml'
  | 'public-policy-open-data';

export interface BusinessObjectiveOption {
  id: BusinessObjectiveId | 'ALL';
  labelIt: string;
  labelEn: string;
  shortLabelIt: string;
  shortLabelEn: string;
  descriptionIt: string;
  descriptionEn: string;
}

export const BUSINESS_OBJECTIVES: BusinessObjectiveOption[] = [
  {
    id: 'ALL',
    labelIt: 'Tutti gli Obiettivi',
    labelEn: 'All Objectives',
    shortLabelIt: 'Tutti gli Obiettivi (6)',
    shortLabelEn: 'All Objectives (6)',
    descriptionIt: 'Tutti i casi studio verificati nel portfolio',
    descriptionEn: 'All verified case studies across the portfolio'
  },
  {
    id: 'decision-support-bi',
    labelIt: 'Decision Support & BI',
    labelEn: 'Decision Support & BI',
    shortLabelIt: 'Decision Support & BI',
    shortLabelEn: 'Decision Support & BI',
    descriptionIt: 'Dashboard interattive, calcoli DAX complessi e scorecards per il top management',
    descriptionEn: 'Interactive dashboards, complex DAX measures, and management scorecards'
  },
  {
    id: 'data-quality-metadata',
    labelIt: 'Data Quality & Metadata',
    labelEn: 'Data Quality & Metadata',
    shortLabelIt: 'Data Quality & Metadata',
    shortLabelEn: 'Data Quality & Metadata',
    descriptionIt: 'Audit di integrità, profiling, deduplicazione e normalizzazione di cataloghi complessi',
    descriptionEn: 'Integrity audits, profiling, deduplication, and complex catalog normalization'
  },
  {
    id: 'data-engineering-automation',
    labelIt: 'Data Engineering & Automation',
    labelEn: 'Data Engineering & Automation',
    shortLabelIt: 'Data Engineering & Automation',
    shortLabelEn: 'Data Engineering & Automation',
    descriptionIt: 'Pipeline Medallion (Bronze/Silver/Gold) su Databricks, ETL/ELT e data mart Parquet',
    descriptionEn: 'Medallion pipelines (Bronze/Silver/Gold) on Databricks, ETL/ELT, and Parquet marts'
  },
  {
    id: 'predictive-analytics-ml',
    labelIt: 'Predictive Analytics & ML',
    labelEn: 'Predictive Analytics & ML',
    shortLabelIt: 'Predictive Analytics & ML',
    shortLabelEn: 'Predictive Analytics & ML',
    descriptionIt: 'Modelli di classificazione (Random Forest), feature engineering e baseline di trasparenza',
    descriptionEn: 'Classification modeling (Random Forest), feature engineering, and baseline rigor'
  },
  {
    id: 'public-policy-open-data',
    labelIt: 'Public Policy & Open Data',
    labelEn: 'Public Policy & Open Data',
    shortLabelIt: 'Public Policy & Open Data',
    shortLabelEn: 'Public Policy & Open Data',
    descriptionIt: 'Analisi civica su serie storiche e dati aperti ufficiali (ISPRA, OpenBDAP)',
    descriptionEn: 'Civic analytics on official public open data (ISPRA, OpenBDAP historical series)'
  }
];

export const PROJECT_BUSINESS_OBJECTIVES_MAP: Record<string, BusinessObjectiveId[]> = {
  'rome-transport': ['data-engineering-automation', 'predictive-analytics-ml', 'decision-support-bi'],
  'ispra-waste': ['decision-support-bi', 'public-policy-open-data'],
  'quaero': ['data-engineering-automation', 'data-quality-metadata'],
  'openbdap': ['public-policy-open-data', 'decision-support-bi'],
  'streaming-benchmark': ['decision-support-bi', 'data-quality-metadata'],
  'streaming-metadata': ['decision-support-bi', 'data-quality-metadata']
};

// ---------------------------------------------------------------------------
// Phase 3 Priority 2 (flagship card correctness): the flagship case study
// shows a small "Verified Dataset Metrics" grid of pre-formatted numeric
// chips (e.g. "9.97M Observ.", "F1: 0.8283"). These specific figures come
// from Rome Public Transport's verified Notion `Notes / Insights` text, not
// from a structured field real_projects.json carries for every project — so
// they cannot be read generically for whichever project happens to be
// flagged as flagship.
//
// Rather than let Rome's numbers silently bleed onto a different flagship
// project (the bug this map fixes), this is a maintainable, keyed-by-stable-
// canonical-slug lookup: a project present here shows its own verified,
// hand-transcribed metrics; a project NOT present here (every current
// project except Rome) falls back to rendering its real, bare `keyKPIs`
// labels in the flagship card instead — never an invented number.
//
// To light this up for another project, add its slug here with metrics
// transcribed verbatim from that project's own verified Notion notes/output
// (never invented), or — better long-term — add a structured "Key KPI
// Values" property in Notion and extend scripts/fetch-notion.js to export
// it, so this map can eventually be retired in favor of real structured data.
// ---------------------------------------------------------------------------
export const VERIFIED_PROJECT_METRICS: Record<string, string[]> = {
  'rome-transport': ['9.97M Observ.', '964 Snapshots', 'F1: 0.8283', 'MAE: 136.98s']
};

export const VERIFIED_NOTION_PROJECTS: NotionProjectData[] = [
  {
    id: 'rome-transport',
    titleIt: 'Rome Public Transport Reliability & Delay Prediction',
    titleEn: 'Rome Public Transport Reliability & Delay Prediction',
    businessGoalIt: "Analizzare l'affidabilità del trasporto pubblico romano e costruire una pipeline end-to-end capace di misurare i ritardi, individuare pattern operativi, studiare la propagazione dei ritardi e stimare il rischio di ritardo alla fermata successiva utilizzando dati GTFS e GTFS-Realtime.",
    businessGoalEn: 'Analyse Rome public transport reliability and build an end-to-end analytics and machine learning pipeline to measure delays, identify operational patterns, study delay propagation and estimate next-stop delay risk using GTFS and GTFS-Realtime data.',
    tools: ['Databricks', 'PySpark', 'Delta Lake', 'SQL', 'Python', 'Applied ML', 'Statistical Analysis', 'ETL / Automation'],
    keyKPIs: [
      'Final Labeled Obs: 9,975,703',
      'Realtime Snapshots: 964',
      'Eligible Routes: 412',
      'Eligible Stops: 5,172',
      'Classification F1: 0.8283',
      'ROC-AUC: 0.9690',
      'PR-AUC: 0.9063',
      'Regression MAE: 136.98s (Baseline)'
    ],
    datasetIt: 'GTFS Static + GTFS-Realtime ufficiali di Roma Servizi per la Mobilità. Architettura Medallion Bronze → Silver → Features → ML → Gold su Databricks. Dataset finale etichettato: 9.975.703 osservazioni, 964 snapshot realtime, 8 service date, 412 route, 82.936 trip e 2.157 vehicle.',
    datasetEn: 'Official GTFS Static + GTFS-Realtime feeds from Roma Servizi per la Mobilità. Medallion architecture (Bronze → Silver → Features → ML → Gold) on Databricks. Final labeled dataset: 9,975,703 observations, 964 realtime snapshots, 8 service dates, 412 routes, 82,936 trips, and 2,157 vehicles.',
    date: '2026-10-07',
    notesIt: "Pipeline Databricks completa dall'ingestione fino ai layer Gold e al dashboard AI/BI.\n\n• Classificazione (Ritardo Grave ≥300s): RandomForestClassifier con threshold >0.45. TEST Accuracy: 0.9401, Precision: 0.8450, Recall: 0.8123, F1: 0.8283, ROC-AUC: 0.9690, PR-AUC: 0.9063.\n\n• Regressione (Trasparenza Metodologica): La persistence baseline è risultata il miglior approccio finale, con TEST MAE 136.98s, RMSE 401.85s e R² 0.694. Documentato con rigore senza claim gonfiati.\n\n• Insight Operativi: Picco di ritardi gravi nella fascia serale (~30.3% alle 20:00); forte persistenza dei ritardi: quando fermata corrente e precedente sono entrambe in ritardo grave, la propagazione alla fermata successiva raggiunge l'88.7% (su 354 route e 5.172 stop validati).",
    notesEn: 'Complete Databricks pipeline from ingestion through Gold layers and AI/BI dashboarding.\n\n• Classification (Major Delay ≥300s): RandomForestClassifier (threshold >0.45). TEST Accuracy: 0.9401, Precision: 0.8450, Recall: 0.8123, F1: 0.8283, ROC-AUC: 0.9690, PR-AUC: 0.9063.\n\n• Regression (Methodological Honesty): The persistence baseline proved to be the best final model (TEST MAE 136.98s, RMSE 401.85s, R² 0.694). Transparently reported without exaggerated model claims.\n\n• Operational Findings: Evening peak major-delay rate reaches ~30.3% at 20:00; strong persistence: when current and previous stops are both in major delay, next-stop major-delay propagation is ~88.7% (across 354 eligible routes and 5,172 stops).',
    githubUrl: 'https://github.com/matteocavo/rome-public-transport-reliability',
    dashboardUrl: 'https://github.com/matteocavo/rome-public-transport-reliability/blob/main/dashboard/databricks/pdf/Affidabilita_Trasporto_Pubblico_Roma.pdf',
    dashboardType: 'pdf',
    stars: 1,
    lastUpdated: '2026-10-07',
    image: 'https://matteocavo.github.io/images/rome-transport.png',
    highlightCategory: 'Databricks Lakehouse & Applied ML'
  },
  {
    id: 'ispra-waste',
    titleIt: 'DataCivicLab: Raccolta Differenziata e Rifiuti Urbani (ISPRA)',
    titleEn: 'DataCivicLab: Municipal Recycling vs Urban Waste (ISPRA)',
    businessGoalIt: "Verificare se l'aumento della percentuale di raccolta differenziata nei comuni italiani si traduca davvero in meno rifiuti prodotti, o sia solo un miglioramento 'sulla carta' — per distinguere i comuni realmente virtuosi da quelli che migliorano solo l'indicatore principale.",
    businessGoalEn: 'Test whether a rising differentiated-collection rate in Italian municipalities actually translates into less total waste, or just looks better on paper — giving policymakers and citizens a way to tell "structurally virtuous" municipalities from ones improving only on the headline metric.',
    tools: ['Power BI', 'DAX', 'Python (Pandas)', 'KPI Engineering', 'EDA', 'ETL / Automation'],
    keyKPIs: [
      'Copertura: Tutti i Comuni Italiani',
      'Serie Storica: 2019–2023',
      'Segmento: Comuni RD↑ & RU↑ (N e %)',
      'Segmento: Virtuosi Strutturali (N e %)',
      'Mediana Δ RU pro capite (Virtuosi)'
    ],
    datasetIt: 'ISPRA – Catasto Rifiuti 2019–2023 (dati ufficiali comunali, provinciali e regionali su produzione rifiuti urbani e percentuali di raccolta differenziata).',
    datasetEn: 'ISPRA – Official Municipal Waste Registry 2019–2023 (granular municipal, provincial, and regional historical datasets on urban waste production and differentiated collection percentages).',
    date: '2026-02-16',
    notesIt: "L'analisi 2020–2023 dimostra empiricamente che:\n\n• La relazione tra Raccolta Differenziata (RD) e Rifiuti Urbani (RU) non è automaticamente inversa: una quota rilevante di comuni registra un aumento della RD ma contemporaneamente un aumento dei rifiuti prodotti (pro capite o totali).\n\n• Il progetto isola attraverso DAX il gruppo dei 'virtuosi strutturali', che migliorano la raccolta differenziata riducendo contemporaneamente i rifiuti pro capite, separando miglioramenti reali da risultati meramente nominali.",
    notesEn: 'The 2020–2023 analysis empirically demonstrates that:\n\n• The relationship between differentiated collection (RD) and total waste (RU) is not automatically inverse: a significant share of municipalities increases recycling rates while simultaneously increasing total or per-capita waste.\n\n• Using DAX, the model isolates "structurally virtuous" municipalities (those cutting per-capita waste while boosting recycling) from nominal improvements that look better only on the headline indicator.',
    githubUrl: 'https://github.com/dataciviclab/progetto-pilota',
    dashboardUrl: 'https://app.powerbi.com/view?r=eyJrIjoiZmE5MTNlZmItN2NkZC00ZTkyLWEwZGItMzE3ZWJkNzI0ZjZjIiwidCI6IjgwNjZmMmRlLTgxZDctNGVjNC04Y2E5LTgzNzVjOTA4NjViNSJ9',
    dashboardType: 'live_powerbi',
    stars: 4,
    lastUpdated: '2026-07-27',
    image: 'https://matteocavo.github.io/images/ispra-waste.png',
    highlightCategory: 'Public Policy BI & KPI Engineering'
  },
  {
    id: 'quaero',
    titleIt: 'Quaero — Question-Driven Analytics Pipeline',
    titleEn: 'Quaero — Question-Driven Analytics Pipeline',
    businessGoalIt: "Offrire agli analisti un framework open-source di Data Engineering e Analytics Automation che trasforma qualsiasi dataset grezzo in mart analitici pronti per la BI — guidato da domande di business — con profiling automatico, schema Power BI e lineage a livello di colonna.",
    businessGoalEn: 'Provide analysts with an open-source, question-driven Data Engineering and Analytics Automation framework transforming raw datasets into BI-ready analytical marts — with automated profiling, Power BI schema generation, and column-level data lineage.',
    tools: ['Python', 'Pandas', 'Parquet', 'SQL', 'Streamlit', 'Mermaid.js'],
    keyKPIs: [
      'Release: v0.4.0 (Confermata)',
      'Data Lineage: Mermaid.js Column-Level',
      'Output: Parquet Marts & PostgreSQL SQL',
      'BI Integrations: Power BI DAX & dbt YAML',
      'Entrypoint: CLI, Python Module, Streamlit'
    ],
    datasetIt: 'CSV, Parquet (file locali o URL diretti) — domain-agnostic. Include demo pubblica eseguibile: global_economic_indicators (World Bank: PIL, inflazione, disoccupazione).',
    datasetEn: 'CSV, Parquet (local files or direct URLs) — domain-agnostic. Includes executable public demo: global_economic_indicators (World Bank GDP, inflation, unemployment).',
    date: '2026-03-14',
    notesIt: "v0.4.0 — Framework open-source di Data Engineering e Analytics Automation in Python.\n\n• Funzionalità core: data profiling automatico con scoring di qualità e pulizia auditable, inferenza semantica di metriche/dimensioni, rilevamento anomalie con impact assessment e pipeline analitiche single/multi-dataset.\n\n• Output e integrazioni: data mart Parquet, export SQL compatibile con PostgreSQL, generazione schema Power BI con relazioni suggerite e starter DAX measures, metriche dbt-style YAML e visualizzazione della lineage a livello di colonna in HTML con Mermaid.js.\n\n• Tre modalità operative: riga di comando (CLI), modulo Python importabile (run_project_pipeline) e interfaccia locale Streamlit con architettura deterministica.",
    notesEn: "v0.4.0 — Open-source Python Data Engineering & Analytics Automation framework.\n\n• Core capabilities: automated data profiling with quality scoring and auditable cleaning, semantic inference of business metrics and dimensions, anomaly detection with impact assessment, and single/multi-dataset analytical pipelines.\n\n• Supported outputs & integrations: Parquet analytical marts, PostgreSQL-compatible SQL export, Power BI schema generation with suggested relationships and starter DAX measures, dbt-style YAML metric definitions, and column-level data lineage with Mermaid.js HTML visualization.\n\n• Three execution modes: CLI flags, importable Python wrapper (run_project_pipeline), and local Streamlit visual UI supporting multi-dataset batch ingestion.",
    githubUrl: 'https://github.com/matteocavo/Quaero',
    dashboardUrl: null, // Section 2.1: Primary CTA links directly to GitHub repo, quaero.html is preserved without deletion
    dashboardType: null,
    stars: 1,
    lastUpdated: '2026-04-29',
    image: 'https://matteocavo.github.io/images/quaero.png',
    highlightCategory: 'Data Engineering & Analytics Automation Framework'
  },
  {
    id: 'streaming-benchmark',
    titleIt: 'Streaming Competitive Benchmark',
    titleEn: 'Streaming Competitive Benchmark',
    businessGoalIt: 'Costruire un modello di competitive intelligence multi-mercato per confrontare le piattaforme streaming su ampiezza del catalogo, strategia di recency, posizionamento per genere e diversificazione internazionale — individuando dove i provider si differenziano realmente.',
    businessGoalEn: 'Build a multi-market competitive intelligence model benchmarking streaming platforms on catalog scale, recency strategy, genre positioning, and international reach — surfacing where providers actually differentiate.',
    tools: ['Power BI', 'DAX', 'Python (Pandas)', 'Numpy', 'Competitive Intelligence', 'EDA'],
    keyKPIs: [
      'Total Titles & Recency Intensity',
      'Catalog Overlap (Jaccard Index): <1%',
      'Genre Concentration Index',
      'International Exposure Index',
      'Weighted Rating (Log-Adjusted)'
    ],
    datasetIt: 'TMDB API (metadati watch provider multi-mercato su Netflix, Prime Video, Disney+, Apple TV+).',
    datasetEn: 'TMDB API (multi-market watch provider metadata across Netflix, Prime Video, Disney+, Apple TV+).',
    date: '2026-02-27',
    notesIt: "Principali risultanze analitiche:\n• Netflix guida per scala di catalogo complessiva ma non per intensità di novità recenti.\n• Apple TV+ mostra il focus più marcato sui contenuti recenti a fronte di un catalogo più concentrato.\n• L'indice di overlap tra piattaforme (Jaccard) rimane strutturalmente inferiore all'1%, evidenziando strategie di forte differenziazione editoriale.",
    notesEn: 'Key analytical findings:\n• Netflix leads in absolute library scale but not necessarily recency intensity.\n• Apple TV+ shows the strongest recency concentration with a curated, narrower library.\n• Cross-platform catalog overlap (Jaccard index) remains structurally under 1%, proving distinct editorial differentiation.',
    githubUrl: 'https://github.com/matteocavo/Streaming_Competitive_Benchmark',
    dashboardUrl: 'https://app.powerbi.com/view?r=eyJrIjoiMDVhNGNjNWQtYTc2YS00YmI0LTk2NzctMTcwNWU5OGM0MmM0IiwidCI6IjgwNjZmMmRlLTgxZDctNGVjNC04Y2E5LTgzNzVjOTA4NjViNSJ9',
    dashboardType: 'live_powerbi',
    stars: 1,
    lastUpdated: '2026-03-12',
    image: 'https://matteocavo.github.io/images/streaming-benchmark.png',
    highlightCategory: 'Market Intelligence & Power BI'
  },
  {
    id: 'openbdap',
    titleIt: 'OpenBDAP Saldi Storico Stato (Bilancio Pubblico)',
    titleEn: 'OpenBDAP Italian Public Accounts & Structural Deficit',
    businessGoalIt: 'Usare oltre 20 anni di dati ufficiali di finanza pubblica per verificare se il deficit dello Stato italiano sia strutturale, spiegando in modo comprensibile anche a un pubblico non tecnico quanto pesano spesa corrente, ricorso al mercato e interessi sul debito.',
    businessGoalEn: "Use 20+ years of official Italian public accounts data to test whether the State's deficit is structural, explaining in plain terms how much of it stems from current spending, market borrowing, and debt interest costs.",
    tools: ['Python', 'SQL', 'Pandas', 'KPI Engineering', 'EDA', 'Time Series'],
    keyKPIs: [
      'Deficit Strutturale: 22/22 Anni',
      'Spesa Corrente Media: 64.0%',
      'Spesa in Conto Capitale: 8.5%',
      'Interessi > Avanzo Primario: 22/22 Anni',
      'Ricorso al Mercato Costante'
    ],
    datasetIt: 'OpenBDAP - Rendiconto Pubblicato, Serie storica Saldi (2003-2024); OpenBDAP - Spese per Missione, Programma e Macroaggregato (2008-2024). Livello: Stato centrale.',
    datasetEn: 'OpenBDAP - Published Accounts, Historical Balances (2003–2024); OpenBDAP - Spending by Mission, Program and Macroaggregate (2008–2024). Central State level.',
    date: '2026-03-13',
    notesIt: "Analisi di serie storica su oltre 20 anni di contabilità pubblica dello Stato:\n• 22 anni su 22 presentano deficit strutturale, con spesa corrente al 64% medio e quota investimenti all'8.5%.\n• Gli interessi passivi sul debito superano costantemente l'avanzo primario in ogni singolo anno analizzato.",
    notesEn: 'Historical time series over 20+ years of official Italian central state accounts:\n• 22 out of 22 years exhibit structural deficit, with current expenditures averaging 64% and capital investments at 8.5%.\n• Debt interest service consistently exceeds the primary operating surplus in every analyzed fiscal year.',
    githubUrl: 'https://github.com/dataciviclab/bilancio-pubblico',
    dashboardUrl: null,
    dashboardType: null,
    stars: 2,
    lastUpdated: '2026-10-12',
    image: 'https://matteocavo.github.io/images/openbdap.png',
    highlightCategory: 'Public Finance & Time Series Analytics'
  },
  {
    id: 'streaming-metadata',
    titleIt: 'Streaming Metadata Analytics',
    titleEn: 'Streaming Metadata Analytics',
    businessGoalIt: 'Trasformare metadati streaming grezzi (titoli, utenti, sessioni) in una base solida guidata dai KPI, permettendo a team editoriali e di content strategy di confrontare provider e generi su engagement, completion rate e rewatch.',
    businessGoalEn: 'Turn synthetic streaming metadata (titles, users, sessions) into a clean, KPI-driven foundation letting content teams benchmark providers and genres on completion and rewatch metrics.',
    tools: ['Power BI', 'DAX', 'Python (Pandas)', 'Excel', 'KPI Engineering', 'Data Modeling'],
    keyKPIs: [
      'Total Views & Viewing Time',
      'Completion Rate & Dropoff Points',
      'Rewatch Frequency Rate',
      'Engagement Score composito',
      'IMDb Quality vs Performance Correlation'
    ],
    datasetIt: 'Catalogo streaming sintetico arricchito: titoli, account utente e sessioni di visione aggregate.',
    datasetEn: 'Enriched synthetic streaming catalog, user accounts, and aggregated viewing session telemetry.',
    date: '2025-12-31',
    notesIt: 'Progetto analytics end-to-end con forte enfasi sulla modellazione dimensionale dei dati e sul design di KPI decisionali per la segmentazione dei contenuti.',
    notesEn: 'End-to-end metadata analytics pipeline with strong emphasis on dimensional data modeling and KPI design for editorial content segmentation.',
    githubUrl: 'https://github.com/matteocavo/streaming-metadata-analytics',
    dashboardUrl: 'https://app.powerbi.com/view?r=eyJrIjoiOTQ1M2ExNmQtZWNjMi00YWQ5LWFjMDAtYzIxN2U2MDkxMTk3IiwidCI6IjgwNjZmMmRlLTgxZDctNGVjNC04Y2E5LTgzNzVjOTA4NjViNSJ9',
    dashboardType: 'live_powerbi',
    stars: 1,
    lastUpdated: '2026-03-10',
    image: 'https://matteocavo.github.io/images/streaming-catalog.png',
    highlightCategory: 'Media Analytics & Dimensional Modeling'
  }
];

// Raw GitHub Repositories as synchronized by GitHub Actions cron (.github/workflows/sync-repos.yml -> data/github-repos.json)
export interface RawGithubRepo {
  name: string;
  fullName: string;
  descriptionIt: string;
  descriptionEn: string;
  htmlUrl: string;
  topics: string[];
  stars: number;
  updatedAt: string;
  pushedAt: string;
  ownerType: 'Organization' | 'Personal';
  ownerLogin: string;
}

export function normalizeRepoTitle(repoName: string): string {
  const overrides: Record<string, string> = {
    dataciviclab: 'DataCivicLab Hub',
    'openbdap-saldi-storico-stato': 'OpenBDAP Saldi Storico Stato',
    'bilancio-pubblico': 'Bilancio Pubblico (OpenBDAP)'
  };

  if (overrides[repoName]) {
    return overrides[repoName];
  }

  return repoName
    .replace(/[_-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

// Canonical full snapshot from data/github-repos.json (7 repos total)
export const RAW_GITHUB_REPOSITORIES: RawGithubRepo[] = [
  {
    name: 'bilancio-pubblico',
    fullName: 'dataciviclab/bilancio-pubblico',
    descriptionIt: 'I conti dello Stato italiano in serie storica — spesa corrente, investimenti e saldi di bilancio.',
    descriptionEn: 'Italian central state historical public accounts — current spending, investment and fiscal balances.',
    htmlUrl: 'https://github.com/dataciviclab/bilancio-pubblico',
    topics: ['civic-tech', 'italy', 'open-data', 'public-finance', 'public-spending'],
    stars: 2,
    updatedAt: '2026-10-12',
    pushedAt: '2026-10-12T11:02:28Z',
    ownerType: 'Organization',
    ownerLogin: 'dataciviclab'
  },
  {
    name: 'rome-public-transport-reliability',
    fullName: 'matteocavo/rome-public-transport-reliability',
    descriptionIt: "Analisi end-to-end su Databricks dell'affidabilità del trasporto pubblico di Roma e previsione del ritardo alla fermata successiva con dati GTFS e GTFS-Realtime.",
    descriptionEn: 'End-to-end Databricks lakehouse and applied ML pipeline predicting next-stop delay risk with GTFS and GTFS-Realtime feeds.',
    htmlUrl: 'https://github.com/matteocavo/rome-public-transport-reliability',
    topics: ['databricks', 'delta-lake', 'gtfs-realtime', 'machine-learning', 'pyspark'],
    stars: 1,
    updatedAt: '2026-10-07',
    pushedAt: '2026-10-07T15:16:49Z',
    ownerType: 'Personal',
    ownerLogin: 'matteocavo'
  },
  {
    name: 'dataciviclab',
    fullName: 'dataciviclab/dataciviclab',
    descriptionIt: 'Hub pubblico del DataCivicLab. Spieghiamo chi siamo, cosa facciamo e come partecipare.',
    descriptionEn: 'Public organization hub for DataCivicLab. Documentation, analytical manifesto, and open collaboration guidelines.',
    htmlUrl: 'https://github.com/dataciviclab/dataciviclab',
    topics: ['civic-tech', 'data-journalism', 'italy', 'open-data'],
    stars: 9,
    updatedAt: '2026-10-06',
    pushedAt: '2026-10-08T21:55:59Z',
    ownerType: 'Organization',
    ownerLogin: 'dataciviclab'
  },
  {
    name: 'progetto-pilota',
    fullName: 'dataciviclab/progetto-pilota',
    descriptionIt: 'Prima analisi del Lab — rifiuti urbani, raccolta differenziata e performance ambientale nei comuni italiani.',
    descriptionEn: 'Municipal waste and differentiated collection analytics across all Italian municipalities on ISPRA official data.',
    htmlUrl: 'https://github.com/dataciviclab/progetto-pilota',
    topics: ['civic-tech', 'environment', 'italy', 'open-data', 'waste'],
    stars: 4,
    updatedAt: '2026-07-27',
    pushedAt: '2026-03-02T09:15:27Z',
    ownerType: 'Organization',
    ownerLogin: 'dataciviclab'
  },
  {
    name: 'Quaero',
    fullName: 'matteocavo/Quaero',
    descriptionIt: 'Question-driven analytics pipeline: raw datasets → analytical marts, semantic metrics, and dashboard-ready outputs.',
    descriptionEn: 'Question-driven analytics pipeline: raw datasets → analytical marts, semantic metrics, and dashboard-ready outputs.',
    htmlUrl: 'https://github.com/matteocavo/Quaero',
    topics: ['analytics', 'data-engineering', 'data-pipeline', 'kpi', 'pandas', 'parquet', 'python'],
    stars: 1,
    updatedAt: '2026-04-29',
    pushedAt: '2026-04-29T12:06:10Z',
    ownerType: 'Personal',
    ownerLogin: 'matteocavo'
  },
  {
    name: 'Streaming_Competitive_Benchmark',
    fullName: 'matteocavo/Streaming_Competitive_Benchmark',
    descriptionIt: "Analisi strategica dei cataloghi streaming: scala, recency, reach internazionale, genere, qualità e sovrapposizione competitiva.",
    descriptionEn: "Strategic benchmarking of streaming providers' catalogs across scale, recency, reach, genre strategy, quality, and overlap.",
    htmlUrl: 'https://github.com/matteocavo/Streaming_Competitive_Benchmark',
    topics: ['power-bi', 'dax', 'python', 'competitive-intelligence', 'streaming'],
    stars: 1,
    updatedAt: '2026-03-12',
    pushedAt: '2026-02-27T14:44:19Z',
    ownerType: 'Personal',
    ownerLogin: 'matteocavo'
  },
  {
    name: 'streaming-metadata-analytics',
    fullName: 'matteocavo/streaming-metadata-analytics',
    descriptionIt: 'Progetto analytics streaming end-to-end con Python, Plotly e Power BI per content strategy e dimensional modeling.',
    descriptionEn: 'End-to-end streaming analytics project with Python, Plotly and Power BI for content strategy and dimensional modeling.',
    htmlUrl: 'https://github.com/matteocavo/streaming-metadata-analytics',
    topics: ['data-visualization', 'metadata', 'pandas', 'power-bi', 'python'],
    stars: 1,
    updatedAt: '2026-03-10',
    pushedAt: '2026-02-27T14:27:39Z',
    ownerType: 'Personal',
    ownerLogin: 'matteocavo'
  }
];

// Deduplication Logic (Section 3):
// Evaluates all repositories against the 6 primary Notion featured projects.
// Repositories not matched as primary project cards become the secondary repositories.
export const SECONDARY_REPOSITORIES: SecondaryRepoData[] = RAW_GITHUB_REPOSITORIES
  .filter((repo) => {
    // Normalization check: Flagship, ISPRA, Quaero, Streaming Benchmark, OpenBDAP, Streaming Metadata
    const isFeaturedInNotion = [
      'https://github.com/matteocavo/rome-public-transport-reliability',
      'https://github.com/dataciviclab/progetto-pilota',
      'https://github.com/matteocavo/Quaero',
      'https://github.com/matteocavo/Streaming_Competitive_Benchmark',
      'https://github.com/dataciviclab/bilancio-pubblico',
      'https://github.com/matteocavo/streaming-metadata-analytics'
    ].includes(repo.htmlUrl);
    return !isFeaturedInNotion;
  })
  .map((repo) => ({
    name: repo.name,
    fullName: repo.fullName,
    descriptionIt: repo.descriptionIt,
    descriptionEn: repo.descriptionEn,
    htmlUrl: repo.htmlUrl,
    topics: repo.topics,
    stars: repo.stars,
    updatedAt: repo.updatedAt,
    ownerType: repo.ownerType
  }));
