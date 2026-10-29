import { Check, ExternalLink, Github, Link, Maximize2 } from 'lucide-react';
import type { NotionProjectData } from '../data/portfolioData';
import { getConciseProjectBadges } from '../data/techCategories';
import { ProjectEvidence } from './ProjectEvidence';

export function ProjectCardContent({ project, lang, featured = false, copyStatus, onCopy, onPreview }: {
  project: NotionProjectData;
  lang: 'it' | 'en';
  featured?: boolean;
  copyStatus: 'copied' | 'failed' | null;
  onCopy: () => void;
  onPreview: () => void;
}) {
  const title = lang === 'it' ? project.titleIt : project.titleEn;
  const description = lang === 'it' ? project.businessGoalIt : project.businessGoalEn;
  const copyLabel = (lang === 'it' ? 'Copia URL del caso studio nel portfolio: ' : 'Copy portfolio case-study URL: ') + title;
  const outputLabel = project.dashboardType === 'live_powerbi' ? 'Dashboard'
    : project.dashboardType === 'pdf' ? (lang === 'it' ? 'Dashboard PDF' : 'PDF Dashboard')
    : /^https:\/\/[^/]+\.github\.io\//.test(project.dashboardUrl || '') ? 'Live Demo' : 'Output';
  return <div className={featured ? 'grid lg:grid-cols-2 items-center' : 'flex flex-col h-full'}>
    <div className="relative aspect-[16/10] w-full bg-[#F8FAFC] border-b border-[#E2E8F0] group">
      <button type="button" onClick={onPreview} aria-label={lang === 'it' ? `Ingrandisci anteprima: ${title}` : `Enlarge preview: ${title}`} className="absolute inset-0 w-full h-full cursor-zoom-in p-4">
        <img src={project.image} alt={title} loading="lazy" className="w-full h-full object-contain rounded-lg" />
      </button>
      <span aria-hidden="true" className="absolute bottom-3 right-3 bg-white/95 border border-[#E2E8F0] p-1.5 rounded-lg pointer-events-none">
        <Maximize2 className="w-3.5 h-3.5 text-[#2563EB]" />
      </span>
    </div>
    <div className={`min-w-0 flex flex-col h-full ${featured ? 'p-5 sm:p-6' : 'p-5'}`}>
      {featured && <p className="text-[10px] font-semibold uppercase tracking-wider text-[#2563EB] mb-2">{lang === 'it' ? 'Progetto in evidenza' : 'Featured project'}</p>}
      <h3 className={`font-display font-bold text-[#111111] leading-tight mb-2 ${featured ? 'text-xl sm:text-2xl' : 'text-base'}`}>{title}</h3>
      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3 mb-4">{description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4 text-[10px] text-[#64748B]">
        {getConciseProjectBadges(project.tools, 3).map(tool => <span key={tool} className="px-2 py-1 rounded bg-[#F8FAFC] border border-[#E2E8F0]">{tool}</span>)}
      </div>
      <ProjectEvidence project={project} lang={lang} />
      <div className="mt-auto pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center gap-2">
        {project.dashboardUrl && <a href={project.dashboardUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg">
          {outputLabel}<ExternalLink className="w-3 h-3" />
        </a>}
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#111111] bg-[#F8FAFC] border border-[#CBD5E1] hover:bg-[#EFF6FF] rounded-lg">
          <Github className="w-3.5 h-3.5" />GitHub
        </a>
        <button type="button" onClick={onCopy} title={copyLabel} aria-label={copyLabel} className="ml-auto inline-flex items-center gap-1 p-2 text-xs text-[#64748B] hover:text-[#2563EB] rounded-lg hover:bg-[#EFF6FF] cursor-pointer">
          {copyStatus === 'copied' ? <Check className="w-4 h-4 text-[#10B981]" /> : <Link className="w-4 h-4" />}
          {copyStatus && <span role="status">{copyStatus === 'copied' ? (lang === 'it' ? 'Copiato!' : 'Copied!') : (lang === 'it' ? 'Copia non riuscita' : 'Copy failed')}</span>}
        </button>
      </div>
    </div>
  </div>;
}
