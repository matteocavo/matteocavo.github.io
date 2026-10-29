import type { NotionProjectData } from '../data/portfolioData';
import { PROJECT_EVIDENCE, formatVerifiedMetric } from '../data/projectEvidence';

/** The same evidence follows a project when Notion changes the flagship. */
export function ProjectEvidence({ project, lang, projects, onNavigate, expanded = false }: {
  project: NotionProjectData; lang: 'it' | 'en'; projects: readonly NotionProjectData[];
  onNavigate: (id: string) => void; expanded?: boolean;
}) {
  const evidence = PROJECT_EVIDENCE[project.githubUrl];
  if (!evidence) return null;
  const related = projects.find(p => p.githubUrl === evidence.relatedGithubUrl);
  if (expanded) return <div className="space-y-3 text-[11px] leading-relaxed">
    {evidence.evaluation && <div>
      <strong className="block mb-1">{lang === 'it' ? 'Dataset e campione TEST' : 'Dataset and TEST sample'}</strong>
      <p>
        {lang === 'it' ? 'TEST: campione di ' : 'TEST: sample of '}
        {evidence.evaluation.testRows.toLocaleString(lang === 'it' ? 'it-IT' : 'en-US')}
        {lang === 'it' ? ' righe; distinto dal dataset completo. Holdout storico, non date future.' : ' rows; distinct from the full dataset. Historical holdout, not future dates.'}
      </p>
    </div>}
    <div>
      <strong className="block mb-1">{lang === 'it' ? 'Valutazione e provenienza' : 'Evaluation and provenance'}</strong>
      <p>{lang === 'it' ? evidence.contextIt : evidence.contextEn}</p>
    </div>
    <div>
      <strong className="block mb-1">{lang === 'it' ? 'Note e limiti' : 'Notes and limitations'}</strong>
      <p>{lang === 'it' ? evidence.caveatIt : evidence.caveatEn}</p>
    </div>
    <div>
      <strong className="block mb-1">{lang === 'it' ? 'Caso studio collegato' : 'Related case study'}</strong>
      <p>{lang === 'it' ? evidence.relationshipIt : evidence.relationshipEn}</p>
      {related && <a href={`#${related.id}`} onClick={e => { e.preventDefault(); onNavigate(related.id); }} className="block text-[#2563EB] hover:underline">
        {lang === 'it' ? 'Caso studio collegato: ' : 'Related case study: '}{lang === 'it' ? related.titleIt : related.titleEn}
      </a>}
      <a href={evidence.relatedGithubUrl} target="_blank" rel="noreferrer" className="block text-[#2563EB] hover:underline">
        {lang === 'it' ? 'Repository GitHub collegato' : 'Related GitHub repository'} ↗
      </a>
    </div>
    {evidence.stackEn && <div>
      <strong className="block mb-1">{lang === 'it' ? 'Architettura e deployment' : 'Architecture and deployment'}</strong>
      <p>{lang === 'it' ? evidence.stackIt : evidence.stackEn}</p>
      {evidence.deploymentSourceUrl && <a href={evidence.deploymentSourceUrl} target="_blank" rel="noreferrer" className="block text-[#2563EB] hover:underline">
        {lang === 'it' ? 'Fonte: architettura e deployment' : 'Source: architecture and deployment'} ↗
      </a>}
    </div>}
  </div>;
  return <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 mb-4 space-y-2 text-[11px] text-[#475569] leading-relaxed">
    <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">
      {lang === 'it' ? 'Metriche verificate · dataset e TEST' : 'Verified metrics · dataset and TEST'}
    </span>
    <dl className="grid grid-cols-2 gap-2 text-[#111111]">
      {evidence.metrics.map(metric => <div key={metric.id} className="bg-[#FFFFFF] p-1.5 rounded border border-[#CBD5E1]">
        <dt>{lang === 'it' ? metric.labelIt : metric.labelEn}</dt>
        <dd className="font-mono font-semibold tabular-nums">{formatVerifiedMetric(metric, lang)}</dd>
      </div>)}
    </dl>
    <p>
      {evidence.evaluation
        ? (lang === 'it' ? `TEST storico · ${evidence.evaluation.testRows.toLocaleString('it-IT')} righe.` : `Historical TEST · ${evidence.evaluation.testRows.toLocaleString('en-US')} rows.`)
        : (lang === 'it' ? 'TEST Spark storico · classificazione / regressione.' : 'Historical Spark TEST · classification / regression.')}
    </p>
    <a href={evidence.sourceUrl} target="_blank" rel="noreferrer" className="text-[#2563EB] hover:underline">
      {lang === 'it' ? 'Fonte della valutazione' : 'Evaluation source'} ↗
    </a>
  </div>;
}
