/** Reviewed evidence keyed by repository identity, never by flagship status or prose.
 * Add metrics only after checking a pinned upstream source. This is display metadata,
 * not a new Notion property; Notion remains authoritative for eligibility and flagship.
 */
export interface VerifiedMetric {
  id: string;
  labelIt: string;
  labelEn: string;
  value: number;
  decimals: number;
  unit?: string;
  scope: 'dataset' | 'test-classification' | 'test-regression';
}
export interface ProjectEvidence {
  sourceUrl: string;
  evaluation?: {
    datasetVersion: number; trainRows: number; validationRows: number; testRows: number;
    threshold: number; testStartUtc: string; testEndUtc: string; testSnapshots: number;
  };
  metrics: readonly VerifiedMetric[];
  contextIt: string;
  contextEn: string;
  caveatIt: string;
  caveatEn: string;
  relatedGithubUrl: string;
  relationshipIt: string;
  relationshipEn: string;
  stackIt?: string;
  stackEn?: string;
  deploymentSourceUrl?: string;
}
const RMI = 'https://github.com/matteocavo/rome-mobility-intelligence';
const CORE = 'https://github.com/matteocavo/rome-public-transport-reliability';
export const PROJECT_EVIDENCE: Readonly<Record<string, ProjectEvidence>> = {
  [RMI]: {
    sourceUrl: `${RMI}/blob/e4112a287e2f76b9396a1c8746350a045f5ff04b/docs/REAL_MODEL_EVALUATION.md`,
    evaluation: { datasetVersion: 12, trainRows: 81014, validationRows: 25000, testRows: 25000,
      threshold: 0.35, testStartUtc: '2026-10-02T00:00:00Z', testEndUtc: '2026-10-02T08:03:58Z', testSnapshots: 49 },
    metrics: [
      { id: 'observations', labelIt: 'Dataset etichettato completo', labelEn: 'Full labeled dataset', value: 9975703, decimals: 0, scope: 'dataset' },
      { id: 'accuracy', labelIt: 'TEST · Accuratezza', labelEn: 'TEST · Accuracy', value: 0.956520, decimals: 4, scope: 'test-classification' },
      { id: 'precision', labelIt: 'TEST · Precisione', labelEn: 'TEST · Precision', value: 0.784195, decimals: 4, scope: 'test-classification' },
      { id: 'recall', labelIt: 'TEST · Richiamo', labelEn: 'TEST · Recall', value: 0.799071, decimals: 4, scope: 'test-classification' },
      { id: 'f1', labelIt: 'TEST · F1 di classificazione', labelEn: 'TEST · Classification F1', value: 0.791563, decimals: 4, scope: 'test-classification' },
      { id: 'roc-auc', labelIt: 'TEST · ROC-AUC', labelEn: 'TEST · ROC-AUC', value: 0.971677, decimals: 4, scope: 'test-classification' },
      { id: 'pr-auc', labelIt: 'TEST · PR-AUC (Average Precision)', labelEn: 'TEST · PR-AUC (Average Precision)', value: 0.874161, decimals: 4, scope: 'test-classification' }
    ],
    contextIt: 'Valutazione sklearn del 26 ottobre 2026: HistGradientBoosting con pesi di inclusione, Delta v12. TRAIN 81.014 righe; validation e TEST 25.000 righe ciascuno, campioni uniformi deterministici. Split temporale UTC con purge: TRAIN 25 settembre–1 ottobre, validation 1–2 ottobre, TEST 2 ottobre 00:00–08:03:58 (estremi finali esclusi). Soglia p ≥ 0,35 scelta su validation; TEST valutato una sola volta. Evento: ritardo alla prossima fermata ≥ 300 s.',
    contextEn: 'sklearn evaluation dated 26 October 2026: inclusion-weighted HistGradientBoosting, Delta v12. TRAIN 81,014 rows; validation and TEST 25,000 rows each, deterministic uniform samples. Purged UTC temporal split: TRAIN 25 September–1 October, validation 1–2 October, TEST 2 October 00:00–08:03:58 (end-exclusive). Threshold p ≥ 0.35 selected on validation; TEST evaluated once. Event: next-stop delay ≥ 300 s.',
    caveatIt: '9.975.703 è la dimensione del dataset completo, non del TEST. Holdout storico di sole 49 snapshot TEST, non validazione su date future o corse mai viste. PR-AUC = Average Precision sklearn. Risultati non direttamente confrontabili con Spark; nessuna superiorità o SLA real-time dichiarati.',
    caveatEn: '9,975,703 is the full dataset size, not the TEST size. Historical holdout with only 49 TEST snapshots, not validation on future dates or unseen trips. PR-AUC = sklearn Average Precision. Results are not directly comparable to Spark; no superiority or real-time SLA is claimed.',
    relatedGithubUrl: CORE,
    relationshipIt: 'Applicazione pubblica costruita sulla foundation Data Engineering / ML di Rome Public Transport Reliability & Delay Prediction. Ingestion, notebook Spark e Gold restano nel repository foundation; training sklearn, inference e API appartengono a questa applicazione.',
    relationshipEn: 'Public application built on the Rome Public Transport Reliability & Delay Prediction Data Engineering / ML foundation. Ingestion, Spark notebooks and Gold remain in the foundation repository; sklearn training, inference and APIs belong to this application.',
    stackIt: 'Databricks (dati) → scikit-learn (training / inference) → FastAPI; PostgreSQL / Neon per lo storico; backend su Render Free, frontend su GitHub Pages. Render Free può avere cold start. n8n Community su OCI: integrazione preparata, opzionale per il sito pubblico, non ancora provisionata; nessuna esecuzione continua implicita.',
    stackEn: 'Databricks (data) → scikit-learn (training / inference) → FastAPI; PostgreSQL / Neon for history; backend on Render Free, frontend on GitHub Pages. Render Free may cold-start. n8n Community on OCI: prepared integration, optional for the public site, not yet provisioned; no continuous execution implied.',
    deploymentSourceUrl: `${RMI}/blob/e4112a287e2f76b9396a1c8746350a045f5ff04b/docs/PRODUCTION_DEPLOYMENT.md`
  },
  [CORE]: {
    sourceUrl: `${CORE}/blob/016d11eefceb97272f3637085e9a905d8a92d460/README.md`,
    metrics: [
      { id: 'observations', labelIt: 'Osservazioni etichettate', labelEn: 'Labeled observations', value: 9975703, decimals: 0, scope: 'dataset' },
      { id: 'snapshots', labelIt: 'Snapshot storiche', labelEn: 'Historical snapshots', value: 964, decimals: 0, scope: 'dataset' },
      { id: 'f1', labelIt: 'TEST Spark · F1 classificazione', labelEn: 'Spark TEST · Classification F1', value: 0.8283, decimals: 4, scope: 'test-classification' },
      { id: 'mae', labelIt: 'TEST Spark · MAE regressione', labelEn: 'Spark TEST · Regression MAE', value: 136.9818, decimals: 2, unit: 's', scope: 'test-regression' }
    ],
    contextIt: 'Foundation Databricks / Spark: ingestion GTFS/GTFS-RT, Bronze/Silver, feature engineering, Gold, qualità dati e dashboard. Metriche TEST Spark storiche con split temporale indicativo 70/15/15, purge delle etichette e selezione su validation.',
    contextEn: 'Databricks / Spark foundation: GTFS/GTFS-RT ingestion, Bronze/Silver, feature engineering, Gold, data quality and dashboards. Historical Spark TEST metrics with an approximately 70/15/15 temporal split, label purging and validation-based selection.',
    caveatIt: 'F1 di classificazione e MAE di regressione sono task distinti; risultati Spark storici, non metriche dell’applicazione sklearn o nuove misure live.',
    caveatEn: 'Classification F1 and regression MAE are separate tasks; historical Spark results, not sklearn application metrics or new live measurements.',
    relatedGithubUrl: RMI,
    relationshipIt: 'Foundation Data Engineering / ML collegata a Rome Mobility Intelligence, l’applicazione pubblica FastAPI / scikit-learn. I due repository mantengono responsabilità e valutazioni separate.',
    relationshipEn: 'Data Engineering / ML foundation linked to Rome Mobility Intelligence, the public FastAPI / scikit-learn application. The two repositories keep separate responsibilities and evaluations.'
  }
};

export function formatVerifiedMetric(metric: VerifiedMetric, lang: 'it' | 'en'): string {
  return new Intl.NumberFormat(lang === 'it' ? 'it-IT' : 'en-US', {
    minimumFractionDigits: metric.decimals, maximumFractionDigits: metric.decimals
  }).format(metric.value) + (metric.unit ? ` ${metric.unit}` : '');
}
