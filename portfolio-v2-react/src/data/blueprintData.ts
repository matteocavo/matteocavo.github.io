export interface ServiceOffering {
  id: string;
  iconName: string;
  titleIt: string;
  titleEn: string;
  summaryIt: string;
  summaryEn: string;
  targetAudience: string;
  deliverablesIt: string[];
  deliverablesEn: string[];
  technologies: string[];
}

export interface ChatbotQAItem {
  id: string;
  triggerIt: string;
  triggerEn: string;
  category: 'background' | 'skills' | 'services' | 'projects' | 'certifications' | 'contact';
  responseIt: string;
  responseEn: string;
  actionLinks?: {
    labelIt: string;
    labelEn: string;
    href: string;
    isExternal?: boolean;
  }[];
  followUps?: string[];
}

export interface WorkProcessStep {
  step: string;
  titleIt: string;
  titleEn: string;
  summaryIt: string;
  summaryEn: string;
  detailIt: string;
  detailEn: string;
  deliverablesIt: string[];
  deliverablesEn: string[];
}

export const WORK_PROCESS_STEPS: WorkProcessStep[] = [
  {
    step: '01',
    titleIt: 'Comprensione & Audit',
    titleEn: 'Understanding & Audit',
    summaryIt: 'Dalla domanda di business ai vincoli del dato',
    summaryEn: 'From business inquiry to data constraints',
    detailIt: 'Analisi approfondita degli obiettivi decisionali, mappatura delle fonti dati disponibili, audit dell\'integrità strutturale e identificazione dei vincoli di qualità prima di procedere con l\'elaborazione.',
    detailEn: 'In-depth analysis of decision goals, source data mapping, structural integrity audits, and identification of quality and schema constraints before starting any data processing.',
    deliverablesIt: ['Data Dictionary preliminare', 'Audit di integrità & anomaly check'],
    deliverablesEn: ['Initial Data Dictionary', 'Integrity audit & anomaly check']
  },
  {
    step: '02',
    titleIt: 'Preparazione & Modellazione',
    titleEn: 'Data Preparation & Modeling',
    summaryIt: 'Pulizia, trasformazione e architettura dati',
    summaryEn: 'Cleansing, transformation & data architecture',
    detailIt: 'Pipeline di ingestion e pulizia (ETL/ELT). Modellazione dimensionale (Star Schema con fact e dimension table) o architettura Medallion (Bronze/Silver/Gold) su Databricks.',
    detailEn: 'Ingestion and cleansing pipelines (ETL/ELT). Dimensional Star Schema data modeling (facts/dimensions) or Medallion architecture (Bronze/Silver/Gold) on Databricks.',
    deliverablesIt: ['Data Mart normalizzati', 'Pipeline ETL / Medallion riproducibili'],
    deliverablesEn: ['Normalized analytical marts', 'Reproducible ETL / Medallion pipelines']
  },
  {
    step: '03',
    titleIt: 'Validazione & KPI',
    titleEn: 'Validation & KPI Framework',
    summaryIt: 'Misure univoche e verifica dei risultati',
    summaryEn: 'Unambiguous metrics & outcome validation',
    detailIt: 'Definizione formale di metriche semantiche, misure DAX complesse, inferenza statistica o modelli predittivi con baseline di controllo e metriche trasparenti.',
    detailEn: 'Formal semantic metric design, complex DAX calculations, statistical inference, or predictive models with transparent baseline controls and metrics.',
    deliverablesIt: ['Misure DAX / KPI documentati', 'Benchmark & baseline di accuratezza'],
    deliverablesEn: ['Documented DAX measures & KPIs', 'Accuracy benchmarks & baselines']
  },
  {
    step: '04',
    titleIt: 'Dashboard & Documentazione',
    titleEn: 'Delivery & Documentation',
    summaryIt: 'Visual analytics orientata alle decisioni',
    summaryEn: 'Decision-driven visual analytics & handoff',
    detailIt: 'Costruzione di report interattivi Power BI / Databricks, scorecards per il top management, documentazione tecnica chiara e handoff operativo manutenibile.',
    detailEn: 'Interactive Power BI / Databricks dashboards, executive scorecards, clear technical documentation, and maintainable analytical asset handoff.',
    deliverablesIt: ['Dashboard interattiva live', 'Documentazione & note metodologiche'],
    deliverablesEn: ['Live interactive dashboard', 'Documentation & methodology notes']
  }
];

export interface FindingMapping {
  id: string;
  auditTitle: string;
  priority: 'MUST FIX' | 'HIGH IMPACT' | 'NICE TO HAVE';
  phase: string;
  targetFiles: string[];
  concreteFix: string;
  acceptanceCheck: string;
}

export const DESIGN_TOKENS = {
  colors: {
    primary: '#2563EB',
    primaryDark: '#1D4ED8',
    brandLightBlue: '#7AA7FF',
    primarySubtle: '#EFF6FF',
    textPrimary: '#111111',
    textSecondary: '#475569',
    textLightPrimary: '#F8FAFC',
    textLightSecondary: '#94A3B8',
    bgPrimary: '#FFFFFF',
    bgSubtle: '#F8FAFC',
    bgBlack: '#111111',
    bgDarkPanel: '#1C1C1C',
    border: '#E2E8F0',
    borderStrong: '#CBD5E1',
    borderDark: '#2E2E2E',
    success: '#16A34A',
    warning: '#D97706',
    error: '#DC2626'
  },
  typography: {
    fontDisplay: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    fontBody: "'Public Sans', system-ui, -apple-system, sans-serif",
    fontMono: "'JetBrains Mono', ui-monospace, monospace",
    scale: {
      h1: { desktop: '42px / 1.15', mobile: '32px / 1.2', weight: '700' },
      h2: { desktop: '30px / 1.2', mobile: '24px / 1.25', weight: '700' },
      h3: { desktop: '20px / 1.3', mobile: '18px / 1.3', weight: '600' },
      bodyLead: { size: '17px / 1.6', weight: '400' },
      body: { size: '15px / 1.6', weight: '400' },
      caption: { size: '13px / 1.5', weight: '500' },
      kicker: { size: '12px / 1.4', weight: '600', tracking: '0.04em' }
    }
  },
  spacing: {
    sectionPaddingDesktop: '80px 0',
    sectionPaddingMobile: '48px 0',
    containerMax: '1240px',
    gridGap: '24px',
    cardPadding: '24px'
  },
  elevation: {
    card: '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
    cardHover: '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
    drawer: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)'
  }
};

export const SERVICES_CATALOG: ServiceOffering[] = [
  {
    id: 'power-bi',
    iconName: 'BarChart3',
    titleIt: 'Dashboard Power BI & Business Intelligence',
    titleEn: 'Power BI Dashboards & Business Intelligence',
    summaryIt: 'Costruzione di report e dashboard decisionali su Power BI con modellazione a stella, formule DAX performanti e visual design mirato a rispondere a domande di business chiare.',
    summaryEn: 'Building decision-ready Power BI reports and executive dashboards using star-schema modeling, optimized DAX measures, and cognitive visual layouts designed for clarity.',
    targetAudience: 'PMI, team operativi e leadership che necessitano di metriche affidabili e monitoraggio KPI unificato.',
    deliverablesIt: [
      'Modello semantico con architettura Star Schema e relazioni 1:N pulite',
      'Libreria misure DAX documentate (Time Intelligence, YoY, KPI compositi)',
      'Dashboard multipagina interattive con layout ergonomico e filtri coerenti',
      'Guida operativa per utenti aziendali e handover tecnico'
    ],
    deliverablesEn: [
      'Semantic model with Star Schema architecture and 1:many relationships',
      'Documented DAX measure library (Time Intelligence, YoY comparisons, composite KPIs)',
      'Multi-page interactive dashboards with cognitive layout and robust filtering',
      'Operational user guide and technical handover documentation'
    ],
    technologies: ['Power BI', 'DAX', 'Power Query (M)', 'Data Modeling', 'Star Schema']
  },
  {
    id: 'analytics-python-sql',
    iconName: 'Code2',
    titleIt: 'Analisi Dati con Python & SQL',
    titleEn: 'Data Analysis with SQL & Python',
    summaryIt: 'Analisi esplorative e statistiche su dataset complessi per identificare trend, anomalie, relazioni strutturali e driver decisionali con codice riproducibile.',
    summaryEn: 'Exploratory and inferential data analyses on complex datasets to isolate trends, structural anomalies, and operational drivers using fully reproducible code.',
    targetAudience: 'Aziende e organizzazioni con dati distribuiti che richiedono risposte analitiche rigorose a problemi specifici.',
    deliverablesIt: [
      'Script Python (Pandas/Polars) e query SQL modulari e documentate',
      'Analisi statistica descrittiva e inferenziale con visualizzazioni mirate',
      'Segmentazione coorti, correlazioni e identificazione anomalie',
      'Report esecutivo sintetico orientato a decisioni strategiche'
    ],
    deliverablesEn: [
      'Documented, modular Python scripts (Pandas/Polars) and robust SQL queries',
      'Descriptive and inferential statistical analysis with targeted charts',
      'Cohort segmentation, correlation analysis, and anomaly detection',
      'Concise executive synthesis tailored to strategic decision-making'
    ],
    technologies: ['Python', 'SQL', 'Pandas', 'EDA', 'Statistical Analysis', 'Jupyter']
  },
  {
    id: 'data-engineering',
    iconName: 'Database',
    titleIt: 'Data Engineering & Pipeline Analytics (Databricks / Cloud)',
    titleEn: 'Data Engineering & Analytics Pipelines (Databricks / Cloud)',
    summaryIt: 'Architetture di dati a livelli (Medallion: Bronze → Silver → Gold) per elaborare e strutturare flussi batch e semi-strutturati in dataset analitici pronti per la BI.',
    summaryEn: 'Layered data architectures (Medallion: Bronze → Silver → Gold) to ingest, normalize, and transform raw batch and semi-structured feeds into clean BI marts.',
    targetAudience: 'Organizzazioni che necessitano di scalare l’accesso ai dati superando fogli di calcolo frammentati.',
    deliverablesIt: [
      'Pipeline ETL/ELT con PySpark / SQL su Delta Lake e Databricks',
      'Integrazione dati da API REST, stream GTFS/orari o export database',
      'Modellazione Bronze (grezzi) → Silver (puliti) → Gold (mart di business)',
      'Automazione e logging delle esecuzioni per la massima tracciabilità'
    ],
    deliverablesEn: [
      'ETL/ELT pipelines with PySpark / SQL on Delta Lake and Databricks',
      'Data ingestion from REST APIs, GTFS transit feeds, or transactional exports',
      'Bronze (raw) → Silver (cleansed) → Gold (business marts) staging',
      'Automated execution workflows with audit trails and quality validation'
    ],
    technologies: ['Databricks', 'Delta Lake', 'PySpark', 'Databricks SQL', 'ETL', 'APIs']
  },
  {
    id: 'data-quality-cleaning',
    iconName: 'ShieldCheck',
    titleIt: 'Data Quality, Cleaning & Standardizzazione',
    titleEn: 'Data Quality, Cleaning & Standardization',
    summaryIt: 'Bonifica di cataloghi, metadati disordinati e dataset eterogenei con regole di validazione automatizzate, deduplicazione e metriche di conformità del dato.',
    summaryEn: 'Cleansing messy catalogs, inconsistent metadata, and disparate data sources through automated schema validation, deduplication, and accuracy scoring.',
    targetAudience: 'Piattaforme di contenuti, editori e reparti operations che gestiscono cataloghi ad alta frequenza di modifica.',
    deliverablesIt: [
      'Audit completo dello schema, valori nulli, anomalie e cardinalità',
      'Script di normalizzazione tipi, deduplicazione fuzzy e validazione regole',
      'Scorecard di Data Quality con KPI percentuali di copertura e affidabilità',
      'Dataset bonificato pronto per l’integrazione nei sistemi a valle'
    ],
    deliverablesEn: [
      'Comprehensive audit of schema consistency, null rates, and cardinality',
      'Standardization scripts for type casting, deduplication, and rule validation',
      'Data Quality scorecard with coverage, completeness, and validity KPIs',
      'Production-cleansed dataset ready for downstream analytical consumption'
    ],
    technologies: ['Python', 'SQL', 'Data Quality', 'Schema Validation', 'Catalog Ops']
  },
  {
    id: 'reporting-automation',
    iconName: 'RefreshCw',
    titleIt: 'Automazione del Reporting & Workflow',
    titleEn: 'Reporting Automation & Workflows',
    summaryIt: 'Eliminazione dei compiti manuali ripetitivi di estrazione dati, consolidamento fogli Excel e generazione periodica di report tramite pipeline automatizzate.',
    summaryEn: 'Elimination of repetitive manual copy-pasting, multi-sheet consolidation, and scheduled status reporting via unattended automated pipelines.',
    targetAudience: 'Team operativi e finance che spendono ore settimanali assemblando reportistica manuale.',
    deliverablesIt: [
      'Script di estrazione automatica da sorgenti multiple e formattazione output',
      'Aggiornamento automatico programmato (GitHub Actions, cron, script batch)',
      'Generazione programmata di file Parquet, Excel o PDF per la distribuzione',
      'Documentazione chiara per la gestione autonoma da parte del team'
    ],
    deliverablesEn: [
      'Automated multi-source data extraction and structured output formatting',
      'Scheduled unattended triggers (GitHub Actions, cron jobs, background runners)',
      'Automated generation of BI-ready Parquet files, Excel models, or PDF summaries',
      'Operational runbooks for long-term self-sufficiency'
    ],
    technologies: ['Python', 'GitHub Actions', 'Parquet', 'Automation', 'Cron']
  },
  {
    id: 'analytics-strategy',
    iconName: 'Compass',
    titleIt: 'Strategia Dati & Consulenza KPI Decision-Ready',
    titleEn: 'Data Strategy & Decision-Ready KPI Design',
    summaryIt: 'Inquadramento del fabbisogno informativo aziendale: definizione dei KPI critici, progettazione della metrica e allineamento tra esigenze decisionali e sorgenti dati disponibili.',
    summaryEn: 'Translating strategic business questions into defined KPIs, metric hierarchies, and data pipelines connecting operational realities to executive decisions.',
    targetAudience: 'Founder, responsabili di funzione e team leader in fase di strutturazione del proprio sistema di monitoraggio.',
    deliverablesIt: [
      'Mappa di allineamento tra obiettivi di business, domande chiave e sorgenti dati',
      'Catalogo KPI con definizioni matematiche formali e frequenza di calcolo',
      'Architettura logica del reporting raccomandata (BI vs ad-hoc)',
      'Roadmap pragmatica per l’implementazione incrementale'
    ],
    deliverablesEn: [
      'Alignment matrix connecting strategic goals, key questions, and data sources',
      'Formal KPI catalog with mathematical formulas, grains, and refresh cycles',
      'Recommended logical reporting architecture (self-service BI vs ad-hoc)',
      'Pragmatic step-by-step roadmap for phased implementation'
    ],
    technologies: ['KPI Design', 'Data Storytelling', 'Data Strategy', 'Governance']
  }
];

export const CHATBOT_KNOWLEDGE_BASE: ChatbotQAItem[] = [
  {
    id: 'profile_overview',
    triggerIt: 'Chi è Matteo Cavo e qual è il suo profilo?',
    triggerEn: 'Who is Matteo Cavo and what is his background?',
    category: 'background',
    responseIt:
      'Matteo Cavo è un Data & Business Intelligence Analyst con oltre 15 anni di esperienza internazionale in analisi dati, operazioni su metadati enterprise e processi data-driven. Ha lavorato in contesti enterprise come Gracenote (Nielsen) supervisionando la qualità dei metadati di cataloghi multimediali per piattaforme come Netflix, Prime Video, Disney+ e Sky, prima di specializzarsi in pipeline analitiche su Databricks, modellazione Power BI, SQL e Python.',
    responseEn:
      'Matteo Cavo is a Data & Business Intelligence Analyst with over 15 years of international experience across analytics, enterprise metadata operations, and complex data processes. His background includes work at Gracenote (Nielsen) ensuring metadata quality across large-scale media catalogs for Netflix, Amazon Prime Video, Disney+, and Sky, leading into advanced Lakehouse pipelines on Databricks, Power BI data modeling, SQL, and Python.',
    actionLinks: [
      { labelIt: 'Leggi il profilo completo', labelEn: 'Read full profile', href: '#about' },
      { labelIt: 'Scarica il CV', labelEn: 'Download CV', href: '#contact' }
    ],
    followUps: ['skills_overview', 'projects_rome', 'services_overview']
  },
  {
    id: 'skills_overview',
    triggerIt: 'Quali tecnologie e strumenti padroneggia?',
    triggerEn: 'What technologies and tools does he specialize in?',
    category: 'skills',
    responseIt:
      'Il suo toolkit principale si articola in 4 pilastri: (1) Business Intelligence: Power BI, DAX avanzato, Power Query, Star Schema modeling; (2) Data Engineering: Databricks, PySpark, Delta Lake, SQL avanzato, Python (Pandas/Polars), pipeline ETL; (3) Analisi Statistica: EDA, inferenza statistica, test di ipotesi; (4) Machine Learning Applicato: regressione, classificazione (scikit-learn, Random Forest), feature engineering.',
    responseEn:
      'His core toolkit is organized into 4 pillars: (1) Business Intelligence: Power BI, advanced DAX, Power Query, Star Schema data modeling; (2) Data Engineering: Databricks, PySpark, Delta Lake, advanced SQL, Python (Pandas/Polars), automated ETL; (3) Statistical Analysis: EDA, statistical inference, hypothesis testing; (4) Applied ML: classification, regression (scikit-learn, Random Forest), feature engineering.',
    actionLinks: [
      { labelIt: 'Esplora le competenze', labelEn: 'Explore skills', href: '#skills-section' }
    ],
    followUps: ['projects_rome', 'certifications_overview', 'services_overview']
  },
  {
    id: 'projects_rome',
    triggerIt: 'Parlami del progetto sul Trasporto Pubblico di Roma (Databricks)',
    triggerEn: 'Tell me about the Rome Public Transport project (Databricks)',
    category: 'projects',
    responseIt:
      'È una pipeline end-to-end costruita su Databricks (architettura Medallion: Bronze → Silver → Features → ML → Gold) su dati GTFS Static e GTFS-Realtime di Roma Servizi per la Mobilità. Ha elaborato 9.975.703 osservazioni etichettate su 412 linee e 964 snapshot realtime. Include un modello di classificazione Random Forest (F1 0.8283, ROC-AUC 0.9690 su ritardi gravi ≥300s) e una baseline di persistenza per la regressione (MAE 136.98s, R² 0.694).',
    responseEn:
      'It is an end-to-end pipeline built on Databricks (Medallion architecture: Bronze → Silver → Features → ML → Gold) using official GTFS Static and GTFS-Realtime data from Roma Servizi per la Mobilità. It processed 9,975,703 labeled observations across 412 routes and 964 realtime snapshots. It features a Random Forest classifier (F1 0.8283, ROC-AUC 0.9690 for major delays ≥300s) and a persistence regression baseline (MAE 136.98s, R² 0.694).',
    actionLinks: [
      {
        labelIt: 'Vedi Dashboard Databricks (PDF)',
        labelEn: 'View Databricks Dashboard (PDF)',
        href: 'https://github.com/matteocavo/rome-public-transport-reliability/blob/main/dashboard/databricks/pdf/Affidabilita_Trasporto_Pubblico_Roma.pdf',
        isExternal: true
      },
      {
        labelIt: 'Repository GitHub',
        labelEn: 'GitHub Repository',
        href: 'https://github.com/matteocavo/rome-public-transport-reliability',
        isExternal: true
      }
    ],
    followUps: ['projects_ispra', 'projects_quaero', 'skills_overview']
  },
  {
    id: 'projects_ispra',
    triggerIt: 'Cosa dimostra l’analisi DataCivicLab sui rifiuti urbani (ISPRA)?',
    triggerEn: 'What does the DataCivicLab ISPRA waste project show?',
    category: 'projects',
    responseIt:
      'Analizzando i dati ufficiali ISPRA Catasto Rifiuti (2019–2023) su tutti i comuni italiani, il progetto dimostra empiricamente che l’aumento percentuale della raccolta differenziata (RD↑) non implica automaticamente una riduzione dei rifiuti totali o pro-capite (RU↓). Attraverso DAX e Power BI, l’analisi isola i comuni "virtuosi strutturali" (che aumentano la differenziata riducendo contestualmente i rifiuti prodotti) rispetto a quelli con miglioramenti solo nominali.',
    responseEn:
      'Analyzing official ISPRA waste registry data (2019–2023) across Italian municipalities, this project empirically proves that a higher recycling rate (RD↑) does not automatically reduce total or per-capita urban waste (RU↓). Using DAX and Power BI, the analysis isolates "structurally virtuous" municipalities (those that increase recycling while simultaneously cutting per-capita waste) from nominal headline gains.',
    actionLinks: [
      {
        labelIt: 'Apri Dashboard Power BI Live',
        labelEn: 'Open Live Power BI Dashboard',
        href: 'https://app.powerbi.com/view?r=eyJrIjoiZmE5MTNlZmItN2NkZC00ZTkyLWEwZGItMzE3ZWJkNzI0ZjZjIiwidCI6IjgwNjZmMmRlLTgxZDctNGVjNC04Y2E5LTgzNzVjOTA4NjViNSJ9',
        isExternal: true
      }
    ],
    followUps: ['projects_rome', 'projects_quaero', 'services_overview']
  },
  {
    id: 'projects_quaero',
    triggerIt: 'Cos’è Quaero e come funziona (v0.4.0)?',
    triggerEn: 'What is Quaero and how does it work (v0.4.0)?',
    category: 'projects',
    responseIt:
      'Quaero è un framework open-source question-driven di Data Engineering e Analytics Automation sviluppato in Python (v0.4.0). Include: profiling automatizzato con quality scoring e pulizia auditable; inferenza semantica di metriche e dimensioni; pipeline analitiche single e multi-dataset; data mart analitici Parquet ed export SQL PostgreSQL-compatible; generazione schema Power BI con relazioni suggerite e starter DAX measures; definizioni metriche dbt-style YAML; visualizzazione della data lineage a livello di colonna in HTML con Mermaid.js; rilevamento anomalie con impact assessment; eseguibile via CLI, modulo Python importabile e interfaccia locale Streamlit.',
    responseEn:
      'Quaero is an open-source, question-driven Data Engineering and Analytics Automation framework built in Python (v0.4.0). Its capabilities include: automated data profiling with quality scoring and auditable cleaning; semantic inference of business metrics and dimensions; single-dataset and multi-dataset analytical pipelines; Parquet analytical marts and PostgreSQL-compatible SQL export; Power BI schema generation with suggested relationships and starter DAX measures; dbt-style YAML metric definitions; column-level data lineage with Mermaid.js HTML visualization; anomaly detection with impact assessment; accessible via CLI, importable Python module, and local Streamlit UI.',
    actionLinks: [
      { labelIt: 'Repository GitHub Quaero', labelEn: 'Quaero GitHub Repository', href: 'https://github.com/matteocavo/Quaero', isExternal: true },
      { labelIt: 'Vedi i Casi Studio', labelEn: 'View Case Studies', href: '#preview-projects' }
    ],
    followUps: ['projects_rome', 'services_data_engineering', 'contact_options']
  },
  {
    id: 'projects_openbdap',
    triggerIt: 'Quali sono le conclusioni sui saldi storici di OpenBDAP (Finanza Pubblica)?',
    triggerEn: 'What are the findings from the OpenBDAP public finance project?',
    category: 'projects',
    responseIt:
      'L’analisi di serie storica su oltre 20 anni di dati ufficiali della Ragioneria Generale dello Stato (OpenBDAP 2003–2024) dimostra che il deficit dello Stato italiano è strutturale: 22 anni su 22 presentano deficit, con spesa corrente al 64% medio e quota investimenti limitata all’8.5%. Inoltre, la spesa per interessi sul debito pubblico supera costantemente l’avanzo primario in ogni singolo anno analizzato.',
    responseEn:
      'The time-series analysis over 20+ years of official Italian public finance data (OpenBDAP 2003–2024) shows that the Italian State deficit is structural: all 22 analyzed years exhibit a deficit, with current spending averaging 64% and capital investments at only 8.5%. Furthermore, debt interest service consistently exceeds the primary operating surplus in every single year.',
    actionLinks: [
      {
        labelIt: 'Repository GitHub (dataciviclab/bilancio-pubblico)',
        labelEn: 'GitHub Repository (dataciviclab/bilancio-pubblico)',
        href: 'https://github.com/dataciviclab/bilancio-pubblico',
        isExternal: true
      }
    ],
    followUps: ['projects_ispra', 'projects_rome', 'services_overview']
  },
  {
    id: 'projects_streaming_benchmark',
    triggerIt: 'Quali differenze emergono nello Streaming Competitive Benchmark?',
    triggerEn: 'What findings emerge from the Streaming Competitive Benchmark?',
    category: 'projects',
    responseIt:
      'Confrontando Netflix, Prime Video, Disney+ e Apple TV+ tramite dati TMDB API e Power BI, l’analisi dimostra che la sovrapposizione dei cataloghi (indice di Jaccard) è inferiore all’1%: le piattaforme adottano strategie fortemente differenziate. Netflix guida per dimensione complessiva del catalogo ma non per intensità di novità recenti, mentre Apple TV+ concentra le uscite recenti su un catalogo più compatto.',
    responseEn:
      'Benchmarking Netflix, Prime Video, Disney+, and Apple TV+ using TMDB API data and Power BI, the analysis reveals that catalog overlap (Jaccard index) is structurally under 1%: providers follow heavily differentiated editorial strategies. Netflix leads in absolute catalog scale but not in recency intensity, whereas Apple TV+ shows the highest recency focus with a tightly curated catalog.',
    actionLinks: [
      {
        labelIt: 'Apri Dashboard Power BI Live',
        labelEn: 'Open Live Power BI Dashboard',
        href: 'https://app.powerbi.com/view?r=eyJrIjoiMDVhNGNjNWQtYTc2YS00YmI0LTk2NzctMTcwNWU5OGM0MmM0IiwidCI6IjgwNjZmMmRlLTgxZDctNGVjNC04Y2E5LTgzNzVjOTA4NjViNSJ9',
        isExternal: true
      },
      {
        labelIt: 'Repository GitHub',
        labelEn: 'GitHub Repository',
        href: 'https://github.com/matteocavo/Streaming_Competitive_Benchmark',
        isExternal: true
      }
    ],
    followUps: ['projects_streaming_metadata', 'projects_rome', 'services_overview']
  },
  {
    id: 'projects_streaming_metadata',
    triggerIt: 'Di cosa tratta il progetto Streaming Metadata Analytics?',
    triggerEn: 'What is the Streaming Metadata Analytics project about?',
    category: 'projects',
    responseIt:
      'È un progetto end-to-end di Business Intelligence e dimensional modeling che trasforma metadati di visione in metriche operative di performance: completion rate, frequenza di rewatch, engagement score composito e correlazione tra qualità percepita (IMDb) e consumo effettivo, fornendo a team editoriali insight che vanno oltre le semplici visualizzazioni grezze.',
    responseEn:
      'It is an end-to-end Business Intelligence and dimensional data modeling project that transforms streaming telemetry into operational KPIs: completion rates, rewatch frequency, composite engagement scores, and correlations between perceived quality (IMDb) and actual consumption, providing editorial teams with actionable performance metrics beyond raw views.',
    actionLinks: [
      {
        labelIt: 'Apri Dashboard Power BI Live',
        labelEn: 'Open Live Power BI Dashboard',
        href: 'https://app.powerbi.com/view?r=eyJrIjoiOTQ1M2ExNmQtZWNjMi00YWQ5LWFjMDAtYzIxN2U2MDkxMTk3IiwidCI6IjgwNjZmMmRlLTgxZDctNGVjNC04Y2E5LTgzNzVjOTA4NjViNSJ9',
        isExternal: true
      },
      {
        labelIt: 'Repository GitHub',
        labelEn: 'GitHub Repository',
        href: 'https://github.com/matteocavo/streaming-metadata-analytics',
        isExternal: true
      }
    ],
    followUps: ['projects_streaming_benchmark', 'projects_rome', 'services_overview']
  },
  {
    id: 'services_overview',
    triggerIt: 'Quali servizi Data & Business Intelligence offri?',
    triggerEn: 'What Data & Business Intelligence services do you offer?',
    category: 'services',
    responseIt:
      'Offro soluzioni specializzate articolate su 6 direttrici professionali: (1) Dashboard Executive & Visual Analytics (Power BI & DAX); (2) Analisi Dati Esplorativa & Predittiva (Python & SQL); (3) Data Modeling & Pipeline Ingestion (Databricks Lakehouse); (4) Data Quality, Cleansing & Normalizzazione Cataloghi; (5) Automazione Reporting & Flussi Ricorrenti; (6) Strategia di Misurazione & Definizione KPI Decisionali.',
    responseEn:
      'I offer specialized technical solutions across 6 professional pillars: (1) Executive Dashboards & Visual Analytics (Power BI & DAX); (2) Exploratory & Predictive Data Analysis (Python & SQL); (3) Data Modeling & Ingestion Pipelines (Databricks Lakehouse); (4) Data Quality, Cleansing & Catalog Normalization; (5) Reporting Automation & Recurring Data Workflows; (6) Measurement Strategy & Decision-Ready KPI Design.',
    actionLinks: [
      { labelIt: 'Esplora tutti i 6 Ambiti di Servizio', labelEn: 'Explore all 6 Service Capabilities', href: '#preview-services' },
      { labelIt: 'Invia una richiesta diretta', labelEn: 'Send a direct inquiry', href: '#preview-contact' }
    ],
    followUps: ['services_power_bi', 'services_data_quality', 'services_data_engineering']
  },
  {
    id: 'services_power_bi',
    triggerIt: 'Puoi creare dashboard Power BI e modelli DAX?',
    triggerEn: 'Can you create Power BI dashboards and DAX models?',
    category: 'services',
    responseIt:
      'Certamente. Sviluppo dashboard interattive ed executive scorecards su Microsoft Power BI con modellazione dimensionale (Star Schema), calcoli DAX complessi (Time Intelligence dinamica, KPI multi-livello, ranking e allocazioni), ottimizzazione delle performance del modello tabulare e progettazione dell\'esperienza utente per favorire decisioni tempestive.',
    responseEn:
      'Certainly. I build interactive executive dashboards and management scorecards in Microsoft Power BI featuring dimensional Star Schema modeling, complex DAX measures (dynamic Time Intelligence, multi-level KPIs, ranking, and allocations), tabular performance tuning, and decision-driven UX design.',
    actionLinks: [
      { labelIt: 'Vedi i Casi Studio Power BI', labelEn: 'View Power BI Case Studies', href: '#preview-projects' },
      { labelIt: 'Richiedi disponibilità per un progetto', labelEn: 'Inquire for a project', href: '#preview-contact' }
    ],
    followUps: ['services_automation', 'services_strategy_kpi', 'projects_ispra']
  },
  {
    id: 'services_data_quality',
    triggerIt: 'Come puoi aiutarmi a migliorare la qualità dei dati?',
    triggerEn: 'How can you help improve data quality and catalog hygiene?',
    category: 'services',
    responseIt:
      'Conduco audit approfonditi di integrità e coerenza dei dataset, implementando algoritmi di deduplicazione, entity resolution e riconciliazione tra sorgenti frammentate. Ho maturato una profonda esperienza sul campo supervisionando la qualità dei metadati di cataloghi multimediali enterprise a livello globale (Gracenote/Nielsen), garantendo dataset affidabili e pronti all\'uso analitico.',
    responseEn:
      'I perform thorough dataset integrity and consistency audits, deploying deduplication, entity resolution, and cross-source reconciliation routines. I built deep operational expertise managing metadata quality across large-scale global media catalogs (Gracenote/Nielsen), delivering clean, reliable datasets ready for reporting.',
    actionLinks: [
      { labelIt: 'Dettagli servizio Data Quality', labelEn: 'Data Quality Service Details', href: '#preview-services' },
      { labelIt: 'Discuti un caso di bonifica dati', labelEn: 'Discuss data cleansing', href: '#preview-contact' }
    ],
    followUps: ['services_data_engineering', 'services_power_bi', 'projects_streaming_metadata']
  },
  {
    id: 'services_data_engineering',
    triggerIt: 'Realizzi pipeline ETL con Python, SQL e Databricks?',
    triggerEn: 'Do you build ETL/ELT pipelines with Python, SQL, and Databricks?',
    category: 'services',
    responseIt:
      'Sì. Costruisco pipeline robuste di estrazione, pulizia e trasformazione (ETL/ELT) adottando l\'architettura Medallion (Bronze/Silver/Gold) su Databricks con PySpark e Delta Lake, oltre a script Python automatizzati (Pandas/Polars) e query SQL ottimizzate per popolare data mart analitici performanti.',
    responseEn:
      'Yes. I engineer resilient extraction, cleaning, and transformation pipelines (ETL/ELT) adopting the Medallion architecture (Bronze/Silver/Gold) on Databricks with PySpark and Delta Lake, complemented by automated Python scripts (Pandas/Polars) and optimized SQL queries to populate high-performance data marts.',
    actionLinks: [
      { labelIt: 'Vedi Progetto Databricks Rome Transport', labelEn: 'View Rome Transport Databricks Project', href: '#preview-projects' },
      { labelIt: 'Richiedi supporto ingegneristico', labelEn: 'Request engineering support', href: '#preview-contact' }
    ],
    followUps: ['projects_rome', 'projects_quaero', 'services_overview']
  },
  {
    id: 'services_automation',
    triggerIt: 'Puoi automatizzare report e processi di analisi?',
    triggerEn: 'Can you automate reporting and data workflows?',
    category: 'services',
    responseIt:
      'Certamente. Sostituisco processi manuali e fogli di calcolo frammentati con flussi di estrazione e consolidamento automatizzati, refresh pianificati, trigger condizionali e controlli di integrità automatici, riducendo drasticamente il tempo operativo del team e azzerando i rischi di errore umano.',
    responseEn:
      'Certainly. I replace fragmented manual spreadsheets and recurring tasks with automated extraction and aggregation pipelines, scheduled refreshes, conditional alert triggers, and validation routines, drastically cutting turnaround times and eliminating human error.',
    actionLinks: [
      { labelIt: 'Dettagli Automazione Reporting', labelEn: 'Reporting Automation Details', href: '#preview-services' },
      { labelIt: 'Invia una richiesta', labelEn: 'Send an inquiry', href: '#preview-contact' }
    ],
    followUps: ['services_power_bi', 'services_strategy_kpi', 'contact_options']
  },
  {
    id: 'services_strategy_kpi',
    triggerIt: 'Come aiuti un’azienda a definire KPI e metriche decisionali?',
    triggerEn: 'How do you help companies define KPIs and decision metrics?',
    category: 'services',
    responseIt:
      'Traduco gli obiettivi strategici aziendali in quadri di misurazione coerenti e alberi di KPI azionabili. Definisco definizioni semantiche univoche, dizionari dati condivisi tra reparti e viste di reporting sintetico orientate al top management, eliminando discrepanze interpretative tra stakeholder.',
    responseEn:
      'I translate high-level strategic business goals into coherent measurement frameworks and actionable KPI trees. I establish shared data dictionaries, unambiguous semantic definitions across departments, and executive overview scorecards that eliminate conflicting interpretations among stakeholders.',
    actionLinks: [
      { labelIt: 'Dettagli Strategia KPI', labelEn: 'KPI Strategy Details', href: '#preview-services' },
      { labelIt: 'Parla delle tue metriche aziendali', labelEn: 'Discuss your business metrics', href: '#preview-contact' }
    ],
    followUps: ['services_power_bi', 'services_overview', 'contact_options']
  },
  {
    id: 'certifications_overview',
    triggerIt: 'Quali certificazioni professionali possiedi?',
    triggerEn: 'What verified certifications does he hold?',
    category: 'certifications',
    responseIt:
      'Possiede 3 certificazioni completate e verificate con link pubblico: Google Advanced Data Analytics Professional Certificate (2026), Google AI Professional Certificate (2026), e Databricks Fundamentals Accreditation (2026). Sta attualmente preparando Microsoft PL-300 (Power BI Data Analyst) e Databricks Certified Data Engineer Associate.',
    responseEn:
      'He holds 3 completed and publicly verified credentials: Google Advanced Data Analytics Professional Certificate (2026), Google AI Professional Certificate (2026), and Databricks Fundamentals Accreditation (2026). He is currently completing Microsoft PL-300 (Power BI Data Analyst) and Databricks Certified Data Engineer Associate.',
    actionLinks: [
      { labelIt: 'Vedi certificazioni con credenziali', labelEn: 'View credentials', href: '#preview-skills' }
    ],
    followUps: ['skills_overview', 'projects_rome', 'contact_options']
  },
  {
    id: 'contact_options',
    triggerIt: 'Come posso contattarlo o inviare una richiesta?',
    triggerEn: 'How can I contact him or discuss an opportunity?',
    category: 'contact',
    responseIt:
      'Puoi inviare un messaggio diretto e riservato tramite il modulo contatti sul sito, oppure collegarti su LinkedIn (linkedin.com/in/matteo-cavo/) e GitHub (github.com/matteocavo). I CV aggiornati in italiano e in inglese sono disponibili per il download immediato in formato PDF.',
    responseEn:
      'You can send a direct, confidential message through the on-site contact form, or connect on LinkedIn (linkedin.com/in/matteo-cavo/) and GitHub (github.com/matteocavo). Both updated Italian and English PDF CVs are available for immediate download.',
    actionLinks: [
      { labelIt: 'Vai alla sezione contatti', labelEn: 'Go to contact section', href: '#preview-contact' },
      { labelIt: 'Profilo LinkedIn', labelEn: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/matteo-cavo/', isExternal: true }
    ],
    followUps: ['profile_overview', 'cv_download', 'availability_overview']
  },
  {
    id: 'cv_download',
    triggerIt: 'Dove posso trovare o scaricare il CV di Matteo?',
    triggerEn: 'Where can I view or download Matteo’s CV / resume?',
    category: 'background',
    responseIt:
      'Il curriculum vitae di Matteo è consultabile e scaricabile direttamente in formato PDF sia in lingua italiana sia in lingua inglese. Dettaglia oltre 15 anni di esperienza tra operazioni enterprise sui metadati (Gracenote/Nielsen), pipeline analitiche su Databricks e dashboard Power BI.',
    responseEn:
      'Matteo’s CV is available for direct viewing and download in PDF format in both Italian and English. It details over 15 years of experience across enterprise metadata operations (Gracenote/Nielsen), Databricks analytical pipelines, and Power BI dashboards.',
    actionLinks: [
      { labelIt: 'Apri CV Italiano (PDF)', labelEn: 'Open Italian CV (PDF)', href: 'assets/cv/Matteo_Cavo_CV_IT.pdf', isExternal: true },
      { labelIt: 'Open English CV (PDF)', labelEn: 'Open English CV (PDF)', href: 'assets/cv/Matteo_Cavo_CV_EN.pdf', isExternal: true }
    ],
    followUps: ['profile_overview', 'skills_overview', 'availability_overview']
  },
  {
    id: 'availability_overview',
    triggerIt: 'Qual è la disponibilità lavorativa attuale di Matteo?',
    triggerEn: 'What is Matteo’s current work availability?',
    category: 'contact',
    responseIt:
      'Matteo è disponibile per ruoli in-house (full-time o part-time, da remoto o con modalità ibrida) e per collaborazioni tecniche selezionate nei settori Business Intelligence (Power BI/DAX), Data Engineering (Databricks/PySpark/SQL) e data analytics.',
    responseEn:
      'Matteo is available for in-house roles (full-time or part-time, remote or hybrid) as well as selected technical collaborations across Business Intelligence (Power BI/DAX), Data Engineering (Databricks/PySpark/SQL), and data analytics.',
    actionLinks: [
      { labelIt: 'Invia una proposta o richiesta', labelEn: 'Send a proposal or inquiry', href: '#preview-contact' },
      { labelIt: 'Profilo LinkedIn', labelEn: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/matteo-cavo/', isExternal: true }
    ],
    followUps: ['contact_options', 'cv_download', 'services_overview']
  },
  {
    id: 'education_overview',
    triggerIt: 'Qual è il percorso formativo e accademico di Matteo?',
    triggerEn: 'What is Matteo’s educational and academic background?',
    category: 'background',
    responseIt:
      'La formazione di Matteo comprende il Diploma di Informatico Multimediale conseguito presso l’Accademia Pantheon Multimediale di Roma (2003) e il Diploma di Scuola Superiore a indirizzo Turismo presso l’Istituto Marco Polo di Roma (2005). Il suo profilo si arricchisce di una costante specializzazione tecnica verificata: Google Advanced Data Analytics Professional Certificate (2026), Google AI Professional Certificate (2026), Databricks Fundamentals Accreditation (2026), Microsoft Power BI Desktop for Business Intelligence, e le preparazioni in corso per Microsoft PL-300 e Databricks Certified Data Engineer Associate.',
    responseEn:
      'Matteo’s education includes a Diploma in Multimedia Computing from Accademia Pantheon Multimediale in Rome (2003) and a High School Diploma in Tourism from Istituto Marco Polo in Rome (2005). His background is reinforced by ongoing verified technical specializations: Google Advanced Data Analytics Professional Certificate (2026), Google AI Professional Certificate (2026), Databricks Fundamentals Accreditation (2026), Microsoft Power BI Desktop for Business Intelligence, and ongoing preparation for Microsoft PL-300 and Databricks Certified Data Engineer Associate.',
    actionLinks: [
      { labelIt: 'Vedi il Profilo Completo', labelEn: 'View Full Profile', href: '#preview-about' },
      { labelIt: 'Consulta le Certificazioni', labelEn: 'View Certifications', href: '#preview-skills' }
    ],
    followUps: ['certifications_overview', 'profile_overview', 'cv_download']
  }
];

export const AUDIT_FINDINGS_MAPPING: FindingMapping[] = [
  {
    id: 'F-01',
    auditTitle: 'Rich Analytical Fields in data/projects.json (keyKPIs, dataset, notes) Discarded',
    priority: 'MUST FIX',
    phase: 'Phase 2',
    targetFiles: ['components/repoCard.js', 'script.js'],
    concreteFix: 'Expand createFeaturedCard() to render dataset badge, keyKPIs strip, and an interactive "Methodology & Findings" drawer fed by p.notes.',
    acceptanceCheck: 'Rome Transport card displays 9.97M observations, RF F1 0.8283, and persistence baseline MAE 136.98s; ISPRA card displays structural virtuosity KPIs.'
  },
  {
    id: 'F-02',
    auditTitle: 'Duplicate Cards Across "Featured Projects" and "All Projects"',
    priority: 'MUST FIX',
    phase: 'Phase 2',
    targetFiles: ['components/repoLoader.js', 'script.js', 'index.html'],
    concreteFix: 'Deduplicate #repo-grid against #featured-projects by normalizing repository URLs; present non-featured repos (like dataciviclab org hub) in a secondary contributions list.',
    acceptanceCheck: 'Zero projects appear in both grids simultaneously. Total page card count is reduced by 5 duplicate instances.'
  },
  {
    id: 'F-03',
    auditTitle: 'Mixed-Language Descriptions and Titles Across IT and EN Modes',
    priority: 'MUST FIX',
    phase: 'Phase 1',
    targetFiles: ['data/profile.js', 'components/repoCard.js', 'components/repoLoader.js'],
    concreteFix: 'Add localized project title map (titleIt / titleEn) and repo description fallback map in data/profile.js so every card displays purely in the selected language.',
    acceptanceCheck: 'Toggling to EN displays 100% English titles and descriptions; toggling to IT displays 100% Italian titles and descriptions.'
  },
  {
    id: 'F-04',
    auditTitle: 'Tools Array Sliced to First 3 Items (.slice(0, 3)) Hides Core Stack',
    priority: 'MUST FIX',
    phase: 'Phase 2',
    targetFiles: ['components/repoCard.js', 'script.js'],
    concreteFix: 'Sort and deduplicate tools by a strategic priority dictionary (Power BI, Databricks, Python, SQL, DAX, PySpark, Delta Lake) before rendering, and display up to 5 prioritized tags.',
    acceptanceCheck: 'OpenBDAP displays Python · SQL · KPI engineering · ETL instead of [Python, Python (Pandas), GitHub].'
  },
  {
    id: 'F-05',
    auditTitle: 'Rome Transport Static PDF Classified as Live Dashboard in Hero Metric',
    priority: 'MUST FIX',
    phase: 'Phase 1',
    targetFiles: ['script.js', 'components/repoCard.js'],
    concreteFix: 'Refine isExternalDashboardUrl() to distinguish live Power BI embeds, internal HTML pages, and static PDF exports; set Hero live dashboards metric to verified count (3) and CTA to "View Databricks Dashboard (PDF)".',
    acceptanceCheck: 'Hero KPI counter displays 3 live dashboards; clicking Rome Transport CTA displays explicit PDF badge.'
  },
  {
    id: 'F-06',
    auditTitle: 'Pinned Repo Rename (openbdap-saldi-storico-stato → bilancio-pubblico) Breaks Star Join',
    priority: 'MUST FIX',
    phase: 'Phase 1',
    targetFiles: ['data/profile.js', 'scripts/fetch-github-repos.js'],
    concreteFix: 'Update pinnedRepos in data/profile.js to "dataciviclab/bilancio-pubblico" and add a canonical alias map in script.js for legacy URL matching.',
    acceptanceCheck: 'OpenBDAP featured card successfully displays GitHub stars and updated_at date matching bilancio-pubblico.'
  },
  {
    id: 'F-07',
    auditTitle: 'quaero.html Language Default Mismatch ("en" vs "it") & Missing Language Switcher',
    priority: 'MUST FIX',
    phase: 'Phase 1',
    targetFiles: ['quaero.html', 'script.js'],
    concreteFix: 'Align quaero.html default language fallback to match index.html ("it"), sync localStorage on first visit, and inject the IT/EN button switcher into quaero.html header.',
    acceptanceCheck: 'Navigating from index.html (IT) to quaero.html retains Italian language seamlessly; user can toggle language directly on quaero.html.'
  },
  {
    id: 'F-08',
    auditTitle: '8 Defined Translation Keys in data/profile.js Are Dead/Orphaned',
    priority: 'HIGH IMPACT',
    phase: 'Phase 1',
    targetFiles: ['index.html', 'data/profile.js'],
    concreteFix: 'Wire projectsText, footer1, and footer2 into index.html via data-i18n attributes; prune obsolete draft keys in data/profile.js.',
    acceptanceCheck: 'Footer copyright and secondary note update cleanly on language switch; zero orphaned translation keys in profile.js.'
  },
  {
    id: 'F-09',
    auditTitle: 'Hardcoded Initial Hero KPI Numbers (5 & 2) Cause Hydration Flash',
    priority: 'HIGH IMPACT',
    phase: 'Phase 1',
    targetFiles: ['index.html', 'script.js'],
    concreteFix: 'Update static HTML values in index.html to 6 projects, 3 live dashboards, and 3 certifications with tabular-nums class.',
    acceptanceCheck: 'Page load shows zero visual number jumps or layout flickering before JS execution.'
  },
  {
    id: 'F-10',
    auditTitle: 'Missing width/height for rome-transport.png Causes CLS',
    priority: 'HIGH IMPACT',
    phase: 'Phase 2',
    targetFiles: ['components/repoCard.js'],
    concreteFix: 'Add "rome-transport.png": [1536, 1024] to imageDimensions() map and add CSS aspect-ratio: 16 / 9 to .featured-thumb.',
    acceptanceCheck: 'Featured card #1 has explicit width and height attributes in rendered DOM; zero CLS during image load.'
  },
  {
    id: 'F-11',
    auditTitle: 'Font Family "Inter" Declared in CSS But Never Loaded in HTML',
    priority: 'HIGH IMPACT',
    phase: 'Phase 3',
    targetFiles: ['index.html', 'quaero.html', 'styles.css'],
    concreteFix: 'Load Plus Jakarta Sans (headings) + Public Sans (body) + JetBrains Mono (metrics/tabular numerals) from Google Fonts with font-display: swap.',
    acceptanceCheck: 'Network tab confirms Google Fonts loaded; computed styles confirm Plus Jakarta Sans on headings and tabular-nums on all metrics.'
  },
  {
    id: 'F-12',
    auditTitle: 'Uppercase 0.22em Tracking Applied to Full Prose Sentences',
    priority: 'HIGH IMPACT',
    phase: 'Phase 3',
    targetFiles: ['styles.css'],
    concreteFix: 'Decouple .section-note and .section-kicker from the uppercase 0.22em selector rule; format notes in sentence-case at 0.9rem with 0.01em normal tracking.',
    acceptanceCheck: 'Section descriptions and sub-notes are legible sentence-case prose with zero forced all-caps.'
  },
  {
    id: 'F-13',
    auditTitle: 'Inverted Semantic Heading Hierarchy (H1 is 17.6px Topbar Subtitle)',
    priority: 'HIGH IMPACT',
    phase: 'Phase 3',
    targetFiles: ['index.html', 'styles.css'],
    concreteFix: 'Demote topbar brand title to <span>/<div>; promote .hero-title to semantic <h1>; structure sections as <h2> and project card titles as <h3>.',
    acceptanceCheck: 'Document outline reveals exactly one <h1> in the hero; sections are <h2>; screen readers announce valid hierarchy.'
  },
  {
    id: 'F-14',
    auditTitle: 'Sticky Header Stacks Vertically on Tablet Viewports (641px–980px)',
    priority: 'HIGH IMPACT',
    phase: 'Phase 3',
    targetFiles: ['styles.css'],
    concreteFix: 'Enforce a single horizontal row for .topbar across all screen sizes (64px height); collapse navigation to hamburger menu at <=768px.',
    acceptanceCheck: 'On tablet viewport (768px and 820px), sticky header height is capped at 64px, preserving >90% of screen height.'
  },
  {
    id: 'F-15',
    auditTitle: 'Missing Keyboard :focus-visible Rings & Low-Contrast Form Input Focus',
    priority: 'HIGH IMPACT',
    phase: 'Phase 3',
    targetFiles: ['styles.css', 'index.html'],
    concreteFix: 'Add global :focus-visible { outline: 2px solid #2563EB; outline-offset: 2px; } and add a <a href="#main" class="skip-link">Skip to main content</a> link.',
    acceptanceCheck: 'Tabbing through all controls shows crisp blue 2px focus indicator; form inputs achieve 4.5:1 contrast against background.'
  },
  {
    id: 'F-16',
    auditTitle: 'Scroll-Out Re-Fade & Hero Title Parallax Drift',
    priority: 'NICE TO HAVE',
    phase: 'Phase 4',
    targetFiles: ['script.js'],
    concreteFix: 'Remove unobserve class removal in IntersectionObserver (call revealObserver.unobserve(entry.target) once in-view); eliminate translate3d drift on hero title.',
    acceptanceCheck: 'Scrolling up does not cause cards to fade out and re-trigger; hero title remains stationary.'
  },
  {
    id: 'F-17',
    auditTitle: 'Uncompressed PNG Assets (quaero_info.png is 1.42 MB)',
    priority: 'NICE TO HAVE',
    phase: 'Phase 4',
    targetFiles: ['images/*'],
    concreteFix: 'Convert high-resolution PNG screenshots to WebP format (quality 82–85); reduce quaero_info.png from 1.42 MB to ~180 KB.',
    acceptanceCheck: 'Total image folder weight drops from 2.69 MB to <600 KB.'
  },
  {
    id: 'F-18',
    auditTitle: 'Language Switch Re-Fetches JSON Snapshots Over Network Every Click',
    priority: 'NICE TO HAVE',
    phase: 'Phase 1',
    targetFiles: ['components/languageToggle.js', 'script.js'],
    concreteFix: 'Cache parsed projects.json and github-repos.json payloads in window.PORTFOLIO_CACHE; re-render DOM synchronously from memory on language switch.',
    acceptanceCheck: 'Clicking IT/EN triggers instant DOM translation with zero network requests in DevTools.'
  }
];

