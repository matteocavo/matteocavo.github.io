// Chatbot matching engine (Task 2.F: "modular, maintainable intent/FAQ
// knowledge base rather than an unstructured collection of conditionals in
// App.tsx"). This module owns ALL free-text intent resolution; App.tsx only
// calls resolveChatbotAnswer() and renders the result.
//
// Resolution order for a free-text message:
//   1. Small talk (greetings, identity, thanks, goodbye, confusion, ...)
//   2. Keyword-ranked knowledge-base rules (KEYWORD_RULES, in priority order)
//   3. Generic "projects" question -> dynamic overview built live from
//      data/projects.json (via the already-fetched NotionProjectData[]),
//      so new Notion-sourced projects are covered without a code change.
//   4. Lightweight follow-up context: a short, topic-less message right
//      after a matched answer (e.g. "quali tecnologie usa?" after "Parlami
//      di Quaero") resolves against the previous topic.
//   5. Token-overlap scoring fallback across the whole knowledge base.
//   6. Graceful "I don't know, but here's what I can tell you" fallback.

import { ChatbotQAItem, CHATBOT_KNOWLEDGE_BASE } from './blueprintData';
import { SMALL_TALK_RULES } from './chatbotSmallTalk';
import type { NotionProjectData } from './portfolioData';

export type ChatLink = { label: string; href: string; isExternal?: boolean };

export type ChatbotEngineResult =
  | { kind: 'smalltalk'; text: string }
  | { kind: 'kb'; item: ChatbotQAItem }
  | { kind: 'dynamicProjects'; text: string; links: ChatLink[] }
  | { kind: 'fallback' };

export interface ChatbotEngineContext {
  /** id of the last matched ChatbotQAItem (or 'projects_overview_dynamic'), for follow-up resolution. */
  lastTopicId?: string | null;
  /** Live, runtime-fetched projects (data/projects.json), used for the dynamic overview. */
  liveProjects: NotionProjectData[];
}

/** Lowercase + strip diacritics, matching the normalization the rest of the app already used. */
export function normalizeChatText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

interface KeywordRule {
  id: string;
  keywords: string[];
}

// Ported 1:1 from the prior inline if/else chain in App.tsx, reordered only
// to make room for the three new intents (pricing, collaboration,
// DataCivicLab) ahead of the rules they would otherwise be shadowed by.
const KEYWORD_RULES: KeywordRule[] = [
  { id: 'services_pricing', keywords: ['costo', 'costi', 'prezzo', 'preventivo', 'price', 'pricing', 'quote', 'tariff', 'quanto costa'] },
  { id: 'services_collaboration', keywords: ['collabor'] },
  { id: 'cv_download', keywords: ['cv', 'curriculum', 'resume', 'scarica cv', 'download cv', 'anteprima cv'] },
  {
    id: 'availability_overview',
    keywords: [
      'disponib', 'availab', 'assunzion', 'lavoro', 'full time', 'full-time',
      'part-time', 'remoto', 'remote', 'in-house', 'hire', 'opportunit'
    ]
  },
  { id: 'education_overview', keywords: ['laurea', 'universit', 'stud', 'dams', 'bologna', 'educat', 'accademi', 'formazion'] },
  {
    id: 'projects_quaero',
    keywords: [
      'quaero', 'lineage', 'mermaid', 'profiling', 'dbt', 'streamlit', 'parquet',
      'anomal', 'question-driven', 'question driven'
    ]
  },
  { id: 'projects_dataciviclab', keywords: ['dataciviclab', 'data civic lab'] },
  {
    id: 'projects_rome',
    keywords: ['roma', 'rome', 'trasporto', 'transport', 'gtfs', 'ritard', 'delay', 'autobus', 'bus', 'atac', 'random forest']
  },
  { id: 'projects_ispra', keywords: ['ispra', 'rifiut', 'waste', 'differenziat', 'ricicl', 'virtuos', 'catasto'] },
  { id: 'projects_openbdap', keywords: ['openbdap', 'bilancio', 'deficit', 'debito', 'finanza', 'spesa pubblica', 'ragioneria', 'saldi'] },
  {
    id: 'projects_streaming_benchmark',
    keywords: ['benchmark', 'netflix', 'disney', 'apple tv', 'prime video', 'jaccard', 'catalogo', 'catalog']
  },
  { id: 'projects_streaming_metadata', keywords: ['metadata', 'metadati', 'rewatch', 'completion', 'telemetr', 'sessioni'] },
  { id: 'services_power_bi', keywords: ['power bi', 'dax', 'star schema', 'power query', 'dashboard'] },
  { id: 'services_data_quality', keywords: ['qualita', 'quality', 'pulizia', 'bonifica', 'deduplic', 'cleansing'] },
  {
    id: 'services_data_engineering',
    keywords: ['databricks', 'pyspark', 'spark', 'etl', 'elt', 'lakehouse', 'medallion', 'delta lake']
  },
  { id: 'services_automation', keywords: ['automat', 'ricorrent', 'flussi', 'script'] },
  { id: 'services_strategy_kpi', keywords: ['kpi', 'strategia', 'misuraz', 'metric'] },
  { id: 'services_overview', keywords: ['serviz', 'service', 'consulenz', 'analizzare i dati', 'analisi dei dati', 'analyze data', 'analyze your data', 'help me analyze'] },
  { id: 'certifications_overview', keywords: ['certifica', 'google', 'coursera', 'pl-300', 'accreditation', 'esami'] },
  {
    id: 'skills_overview',
    keywords: [
      'competenz', 'skill', 'tecnolog', 'strument', 'tool', 'stack', 'python', 'sql',
      'pandas', 'polars', 'machine learning', 'eda'
    ]
  },
  {
    id: 'profile_overview',
    keywords: ['chi e', 'chi sei', 'who is', 'matteo', 'gracenote', 'nielsen', 'esperienz', 'background', 'bio', 'presentat']
  },
  {
    id: 'contact_options',
    keywords: ['contatt', 'contact', 'scrivi', 'email', 'messagg', 'linkedin', 'github', 'parlare']
  },
  // Generic "projects/portfolio" question with no specific project/service
  // keyword above already matched: resolved dynamically from live data
  // rather than a fixed KB item (Task 2.D).
  { id: 'projects_overview_dynamic', keywords: ['progett', 'project', 'casi studio', 'case stud', 'portfolio', 'lavori'] }
];

// id -> fallback KB id when the preferred one is somehow missing from
// CHATBOT_KNOWLEDGE_BASE (mirrors the `||` fallbacks in the original code).
const RULE_FALLBACK: Record<string, string> = {
  services_power_bi: 'skills_overview',
  services_data_engineering: 'projects_rome'
};

function findKbItem(id: string): ChatbotQAItem | undefined {
  return CHATBOT_KNOWLEDGE_BASE.find((item) => item.id === id);
}

function pickVariant(variants: string[]): string {
  return variants[Math.floor(Math.random() * variants.length)];
}

/** Returns the matching SmallTalkRule, if any, honoring each rule's maxWordCount guard. */
function findSmallTalkRule(normalized: string) {
  const wordCount = normalized.split(/\s+/).filter(Boolean).length;
  return SMALL_TALK_RULES.find(
    (rule) => (!rule.maxWordCount || wordCount <= rule.maxWordCount) && rule.keywords.some((kw) => normalized.includes(kw))
  );
}

function matchKeywordRule(normalized: string): string | undefined {
  for (const rule of KEYWORD_RULES) {
    if (rule.keywords.some((kw) => normalized.includes(kw))) {
      return rule.id;
    }
  }
  return undefined;
}

function buildDynamicProjectsOverview(projects: NotionProjectData[], lang: 'it' | 'en'): { text: string; links: ChatLink[] } {
  if (!projects || projects.length === 0) {
    return {
      text:
        lang === 'it'
          ? 'I progetti del portfolio si stanno caricando: riprova tra qualche istante, oppure visita direttamente la sezione progetti.'
          : 'Portfolio projects are still loading: try again in a moment, or visit the projects section directly.',
      links: [{ label: lang === 'it' ? 'Vai ai Progetti' : 'Go to Projects', href: '#preview-projects', isExternal: false }]
    };
  }

  const titles = projects.map((p) => (lang === 'it' ? p.titleIt : p.titleEn)).filter(Boolean);
  const listText = titles.join(lang === 'it' ? ', ' : ', ');

  const text =
    lang === 'it'
      ? `Il portfolio include attualmente ${projects.length} progetti pronti: ${listText}. Chiedimi di uno specifico (es. "Parlami di Quaero") per i dettagli tecnici, oppure esplora la sezione progetti.`
      : `The portfolio currently features ${projects.length} ready projects: ${listText}. Ask me about a specific one (e.g. "Tell me about Quaero") for technical details, or browse the projects section.`;

  const links: ChatLink[] = [{ label: lang === 'it' ? 'Esplora tutti i Progetti' : 'Explore All Projects', href: '#preview-projects', isExternal: false }];
  const firstWithGithub = projects.find((p) => p.githubUrl);
  if (firstWithGithub) {
    links.push({
      label: lang === 'it' ? 'Repository in evidenza' : 'Featured Repository',
      href: firstWithGithub.githubUrl,
      isExternal: true
    });
  }

  return { text, links };
}

/**
 * Lightweight session context (Task 2.E): when a free-text message carries
 * no strong keyword of its own but the previous turn resolved to a specific
 * topic, a short generic continuation ("quali tecnologie usa?", "e il
 * link?", "altro?") re-resolves against that topic instead of falling
 * through to the generic fallback.
 */
function resolveFollowUp(normalized: string, lastTopicId: string | null | undefined): ChatbotQAItem | undefined {
  if (!lastTopicId) return undefined;
  const wordCount = normalized.split(/\s+/).filter(Boolean).length;
  if (wordCount > 8) return undefined; // treat only short, pronoun-style follow-ups as context-dependent

  const continuationMarkers = [
    'tecnolog', 'tool', 'stack', 'tech', 'altro', 'ancora', 'dettagli', 'detail',
    'link', 'more', 'di piu', 'approfond'
  ];
  if (!continuationMarkers.some((m) => normalized.includes(m))) return undefined;

  if (lastTopicId === 'projects_overview_dynamic') return undefined; // no single KB item to re-affirm
  return findKbItem(lastTopicId);
}

function scoringFallback(normalized: string): ChatbotQAItem | undefined {
  const tokens = normalized.split(/\s+/).filter((t) => t.length >= 3);
  let bestScore = 0;
  let candidate: ChatbotQAItem | undefined;

  for (const item of CHATBOT_KNOWLEDGE_BASE) {
    const corpus = normalizeChatText(`${item.triggerIt} ${item.triggerEn} ${item.category} ${item.responseIt} ${item.responseEn}`);
    let score = 0;
    for (const token of tokens) {
      if (corpus.includes(token)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      candidate = item;
    }
  }

  return bestScore >= 2 ? candidate : undefined;
}

export function resolveChatbotAnswer(rawText: string, lang: 'it' | 'en', context: ChatbotEngineContext): ChatbotEngineResult {
  const normalized = normalizeChatText(rawText.trim());

  const smallTalk = findSmallTalkRule(normalized);
  if (smallTalk) {
    const text = pickVariant(lang === 'it' ? smallTalk.responsesIt : smallTalk.responsesEn);
    return { kind: 'smalltalk', text };
  }

  const ruleId = matchKeywordRule(normalized);

  // Context takes priority over a *broad* catch-all rule: an active,
  // specific project topic plus a short continuation message ("quali
  // tecnologie usa?") should stay on that project rather than fall into a
  // generic rule whose keyword set happens to overlap (e.g. "tecnolog" is
  // both a skills_overview keyword and a natural follow-up word).
  const BROAD_CATCH_ALL_IDS = new Set(['skills_overview', 'services_overview', 'profile_overview']);
  const isSpecificProjectTopic =
    !!context.lastTopicId && context.lastTopicId.startsWith('projects_') && context.lastTopicId !== 'projects_overview_dynamic';
  if (isSpecificProjectTopic && (!ruleId || BROAD_CATCH_ALL_IDS.has(ruleId))) {
    const followUp = resolveFollowUp(normalized, context.lastTopicId);
    if (followUp) return { kind: 'kb', item: followUp };
  }

  if (ruleId === 'projects_overview_dynamic') {
    const { text, links } = buildDynamicProjectsOverview(context.liveProjects, lang);
    return { kind: 'dynamicProjects', text, links };
  }
  if (ruleId) {
    const item = findKbItem(ruleId) || (RULE_FALLBACK[ruleId] ? findKbItem(RULE_FALLBACK[ruleId]) : undefined);
    if (item) return { kind: 'kb', item };
  }

  const followUp = resolveFollowUp(normalized, context.lastTopicId);
  if (followUp) return { kind: 'kb', item: followUp };

  const scored = scoringFallback(normalized);
  if (scored) return { kind: 'kb', item: scored };

  return { kind: 'fallback' };
}
