import type { NotionProjectData } from '../data/portfolioData';
import { PROJECT_EVIDENCE, formatVerifiedMetric } from '../data/projectEvidence';

/** Showcase highlights only. Complete evidence and pinned sources remain in the registry. */
export function ProjectEvidence({ project, lang }: { project: NotionProjectData; lang: 'it' | 'en' }) {
  const evidence = PROJECT_EVIDENCE[project.githubUrl];
  if (!evidence) return null;
  const ids = evidence.evaluation ? ['observations', 'f1', 'pr-auc'] : ['observations', 'f1', 'mae'];
  const metrics = ids.map(id => evidence.metrics.find(metric => metric.id === id)).filter(metric => metric !== undefined).slice(0, 3);
  return <div className="mb-4 text-[11px] text-[#475569]">
    <dl className="grid grid-cols-3 gap-2 mb-2">
      {metrics.map(metric => <div key={metric.id} className="min-w-0 flex flex-col bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
        <dt className="order-last mt-1 leading-snug">{lang === 'it' ? metric.labelIt : metric.labelEn}</dt>
        <dd className="font-mono font-semibold text-[#111111] tabular-nums break-words">{formatVerifiedMetric(metric, lang)}</dd>
      </div>)}
    </dl>
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[10px]">
      <span>{evidence.evaluation
        ? (lang === 'it' ? `TEST storico: ${evidence.evaluation.testRows.toLocaleString('it-IT')} righe` : `Historical TEST: ${evidence.evaluation.testRows.toLocaleString('en-US')} rows`)
        : (lang === 'it' ? 'Risultati Spark storici' : 'Historical Spark results')}</span>
      <a href={evidence.sourceUrl} target="_blank" rel="noreferrer" className="text-[#2563EB] hover:underline">
        {lang === 'it' ? 'Fonte metriche' : 'Metrics source'} ↗
      </a>
    </div>
  </div>;
}
