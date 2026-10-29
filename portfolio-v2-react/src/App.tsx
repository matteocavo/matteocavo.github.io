import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  normalizeRepoTitle,
  NotionProjectData,
  SecondaryRepoData,
  BUSINESS_OBJECTIVES,
  BusinessObjectiveId,
  PROJECT_BUSINESS_OBJECTIVES_MAP,
  VERIFIED_PROJECT_METRICS
} from './data/portfolioData';
import { fetchLiveData, LiveData } from './data/liveData';
import { copyText } from './data/clipboard';
import { scrollProjectWhenReady } from './data/projectNavigation';
import {
  computeTechCategoryStats,
  getConciseProjectBadges,
  projectMatchesTechFilter
} from './data/techCategories';
import {
  SERVICES_CATALOG,
  CHATBOT_KNOWLEDGE_BASE,
  DESIGN_TOKENS,
  ServiceOffering,
  ChatbotQAItem,
  WORK_PROCESS_STEPS,
  WorkProcessStep
} from './data/blueprintData';
import { resolveChatbotAnswer } from './data/chatbotEngine';
import {
  ExternalLink,
  MessageSquare,
  Bot,
  X,
  Send,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Layers,
  BarChart3,
  Code2,
  Database,
  ShieldCheck,
  RefreshCw,
  Compass,
  FileText,
  Briefcase,
  Award,
  Info,
  Github,
  Linkedin,
  MapPin,
  Check,
  Activity,
  Maximize2,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Copy,
  Link,
  ZoomIn,
  ZoomOut,
  ArrowRight,
  Filter,
  CheckCircle,
  Download
} from 'lucide-react';

// =============================================================================
// VERBATIM LOCKED TEXT SOURCES (Read directly from data/profile.js & data/projects.json)
// =============================================================================
const LOCKED_PROFILE_TEXT = {
  it: {
    heroTag: 'DATA & BI ANALYST · BUSINESS INTELLIGENCE · AI & GENAI · ETL & AUTOMAZIONE · ADVANCED ANALYTICS',
    heroTitle: 'Trasformo i dati in insight chiari e decisioni efficaci.',
    heroP1: 'Professionista multidisciplinare con oltre 15 anni di esperienza internazionale tra digitale, creatività, content operations e dati, inclusi oltre cinque anni in Nielsen/Gracenote, con un percorso di specializzazione in Data Analytics, Business Intelligence e Data Engineering.',
    heroP2: 'Oggi sviluppo pipeline ETL/ELT, modelli dati e dashboard Power BI con Python, SQL, DuckDB e Databricks, integrando analisi statistica e machine learning applicato. Utilizzo inoltre strumenti AI e Generative AI come ChatGPT, Claude e Codex per sviluppo assistito, automazione dei workflow e supporto alle decisioni basate sui dati.',
    heroP3: 'Il mio percorso unisce web e multimedia design, direzione creativa, gestione di progetti internazionali e ottimizzazione di metadata e workflow editoriali su larga scala. Questo mi permette di collegare struttura, processo, comunicazione visiva e business insight in modo concreto.',
    aboutTitle: 'Un profilo multidisciplinare costruito per l’analytics moderna.',
    aboutP1: 'Ho iniziato come Web & Multimedia Designer, sviluppando competenze in UX, design digitale e produzione di contenuti, con una forte capacità di trasformare idee e informazioni in risultati chiari, concreti e fruibili.',
    aboutP2: 'Successivamente, come CEO e Creative Director del mio progetto musicale, ho guidato iniziative complesse e internazionali, coordinato team multidisciplinari, ottimizzato processi creativi e utilizzato i dati per migliorare performance ed engagement.',
    aboutP3: 'Negli ultimi anni ho lavorato in un contesto enterprise presso Gracenote (Nielsen), occupandomi di content operations e qualità dei metadata su cataloghi multimediali di grandi dimensioni per piattaforme internazionali come Netflix, Amazon Prime Video, Disney+ e Sky. L’esperienza in un ambiente fortemente data-driven, tra qualità del dato, data visualization, metriche di performance e processi su larga scala, ha rafforzato il mio interesse per il modo in cui i dati possono guidare sviluppo e decisioni. Da qui il passaggio naturale verso ETL, automazione e Business Intelligence.',
    valueTitle: 'Perché questo portfolio è diverso',
    valueP1: 'Unisco competenze tecniche in Business Intelligence (Power BI, DAX), data engineering (SQL, Python, Databricks, ETL) e analisi statistica con una solida base di comunicazione visiva e storytelling strutturato.',
    valueP2: 'Non tratto le dashboard come semplice grafica. Le costruisco come strumenti analitici: domande chiare, logica pulita, layout leggibile e insight che supportano decisioni efficaci.',
    valueP3: 'La mia esperienza internazionale e multidisciplinare mi permette di collegare analisi, processi e strategia, traducendo dati complessi in insight concreti e azioni utili.',
    skillsTitle: 'Toolkit principale',
    certificationsTitle: 'Certificazioni e badge',
    contactTitle: 'Restiamo in contatto',
    contactText: 'Qui trovi i link principali per esplorare portfolio, progetti e profilo professionale.',
    btnGithub: 'Vedi GitHub',
    btnProjects: 'Esplora i progetti',
    currentFocus: 'Ruolo attuale',
    currentFocusTitle: 'Data & Business Intelligence Analyst',
    currentFocusText: 'Business Intelligence, ETL e data modeling con Power BI, SQL, Python e Databricks per dashboard chiare, insight concreti e decisioni misurabili.',
    edge: 'Punto di forza',
    edgeText: 'Un profilo ibrido che unisce Business Intelligence, ETL e data modeling a una base solida di analisi statistica e machine learning applicato, oltre a visual design, ottimizzazione dei processi e comunicazione efficace per reporting orientato alle decisioni.',
    dashboardTitle: 'Profilo in sintesi',
    toolMixLabel: 'Tecnologie nei progetti',
    snapshotYearsLabel: 'Anni esperienza',
    snapshotProjectsLabel: 'Progetti chiave',
    snapshotDashboardsLabel: 'Dashboard live'
  },
  en: {
    heroTag: 'DATA & BI ANALYST · BUSINESS INTELLIGENCE · AI & GENAI · ETL & AUTOMATION · ADVANCED ANALYTICS',
    heroTitle: 'Turning data into clear insights and effective decisions.',
    heroP1: 'Multidisciplinary professional with over 15 years of international experience across digital media, creative projects, content operations and data, including more than five years at Nielsen/Gracenote, followed by a focused transition into Data Analytics, Business Intelligence and Data Engineering.',
    heroP2: 'Today I build ETL/ELT pipelines, data models and Power BI dashboards using Python, SQL, DuckDB and Databricks, combining statistical analysis with applied machine learning. I also use AI and Generative AI tools such as ChatGPT, Claude and Codex for AI-assisted development, workflow automation and data-driven decision support.',
    heroP3: 'My path spans web and multimedia design, creative direction, international project leadership, and large-scale metadata and editorial workflow optimization giving me a strong ability to connect process, structure, communication, and business insight.',
    aboutTitle: 'A multidisciplinary profile built for modern analytics.',
    aboutP1: 'I started as a Web & Multimedia Designer, developing skills in UX, digital design, and content production, with a strong ability to turn ideas and information into clear, usable outcomes.',
    aboutP2: 'Later, as CEO and Creative Director of my music project, I led complex international initiatives, coordinated multidisciplinary teams, optimized creative processes, and used data to improve performance and engagement.',
    aboutP3: 'In recent years, I worked in an enterprise environment at Gracenote (Nielsen), focusing on content operations and metadata quality across large-scale media catalogs for international platforms including Netflix, Amazon Prime Video, Disney+, and Sky. Working in a strongly data-driven environment, where data quality, data visualization, performance metrics, and large-scale processes support ongoing development and operational decisions, strengthened my interest in how data can guide better decisions. This naturally led me toward ETL, workflow automation, and Business Intelligence.',
    valueTitle: 'Why this portfolio is different',
    valueP1: 'I combine technical work across Business Intelligence (Power BI, DAX), data engineering (SQL, Python, Databricks, ETL), and statistical analysis with a strong foundation in visual communication and structured storytelling.',
    valueP2: 'I do not treat dashboards as decoration. I build them as analytical tools: clear questions, clean logic, readable layout, and insight that supports effective decision-making.',
    valueP3: 'My international and multidisciplinary experience helps me connect analysis, processes, and strategy, translating complex data into concrete insight and useful action.',
    skillsTitle: 'Core toolkit',
    certificationsTitle: 'Certifications & badges',
    contactTitle: 'Let’s connect',
    contactText: 'Explore my projects, portfolio, and professional background through the links below.',
    btnGithub: 'View GitHub',
    btnProjects: 'Explore Projects',
    currentFocus: 'Current Role',
    currentFocusTitle: 'Data & Business Intelligence Analyst',
    currentFocusText: 'Business Intelligence, ETL, and data modeling with Power BI, SQL, Python, and Databricks — building clear dashboards, concrete insight, and measurable decisions.',
    edge: 'Professional Edge',
    edgeText: 'A hybrid profile combining Business Intelligence, ETL, and data modeling with a solid foundation in statistical analysis and applied machine learning, alongside visual design, process optimization, and clear communication for decision-ready reporting.',
    dashboardTitle: 'Profile snapshot',
    toolMixLabel: 'Technologies in projects',
    snapshotYearsLabel: 'Years experience',
    snapshotProjectsLabel: 'Key projects',
    snapshotDashboardsLabel: 'Live dashboards'
  }
};

/**
 * RevealCard: Rock-solid, perceptible scroll entrance animation component.
 * - opacity: 0 → 1
 * - translateY: 20px → 0
 * - duration: ~650ms
 * - cubic-bezier(0.16, 1, 0.3, 1)
 * - subtle stagger between sibling cards via `delay` prop
 * - triggers when entering viewport via IntersectionObserver
 * - once revealed, remains visible permanently (never disappears when scrolling back up)
 * - respects prefers-reduced-motion
 */
interface RevealCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
  id?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onInView?: () => void;
  [key: string]: any;
}

function RevealCard({
  children,
  className = '',
  delay = 0,
  as: Component = 'div',
  id,
  style,
  onClick,
  onInView,
  ...rest
}: RevealCardProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsInView(true);
      onInView?.();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            onInView?.();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    // Safety net: IntersectionObserver can fail to ever fire for an element
    // (unsupported browser, a zero-size/hidden ancestor at mount, a section
    // whose dimensions never let it cross the 0.1 threshold, etc.). Content
    // gated behind `.reveal`'s opacity:0 must never stay permanently hidden
    // because of that, so force it visible after a short grace period if the
    // observer hasn't already done so.
    const fallbackTimer = window.setTimeout(() => {
      setIsInView((prev) => {
        if (!prev) onInView?.();
        return true;
      });
    }, 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, [onInView]);

  return (
    <Component
      ref={ref}
      id={id}
      onClick={onClick}
      data-revealed={isInView ? 'true' : undefined}
      className={`reveal ${isInView ? 'in-view' : ''} ${className}`}
      style={{
        '--reveal-delay': `${delay}ms`,
        ...style
      } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default function App() {
  const [siteLang, setSiteLang] = useState<'it' | 'en'>('it');

  // Section 3: Methodology drawer is collapsed by default
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  
  // Section 3: Uncropped dashboard lightbox modal
  const [lightboxProject, setLightboxProject] = useState<NotionProjectData | null>(null);

  const [activeFilterTag, setActiveFilterTag] = useState<string>('ALL');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInputText, setChatInputText] = useState('');
  
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  // Section 6a & Phase 3 Addendum: Compact chatbot initial message with natural professional framing
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; links?: { label: string; href: string; isExternal?: boolean }[] }>>([
    {
      sender: 'bot',
      text: siteLang === 'it'
        ? 'Assistente Portfolio: poni una domanda libera o seleziona un caso studio o servizio qui sotto per approfondire pipeline, metriche, Power BI e Databricks.'
        : 'Portfolio Assistant: ask any question or select a case study or service below to explore pipelines, metrics, Power BI, and Databricks.'
    }
  ]);
  // Lightweight session context (Task 2.E): id of the last matched
  // ChatbotQAItem (or 'projects_overview_dynamic'), used to resolve short
  // follow-up questions ("quali tecnologie usa?") against the previous topic.
  const [lastChatTopicId, setLastChatTopicId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [repoFilterMode, setRepoFilterMode] = useState<'secondary' | 'all'>('secondary');
  const [techBarsInView, setTechBarsInView] = useState(false);

  // Phase 4.3 Feature State Extensions
  const [activeObjectiveFilter, setActiveObjectiveFilter] = useState<BusinessObjectiveId | 'ALL'>('ALL');
  const [activeTechTooltip, setActiveTechTooltip] = useState<string | null>(null);
  const [pendingProjectId, setPendingProjectId] = useState<string | null>(null);
  const [copyFailedId, setCopyFailedId] = useState<string | null>(null);
  const [copiedProjectId, setCopiedProjectId] = useState<string | null>(null);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  // Phase 4 §3: In-page CV PDF preview modal (replaces "open in new tab" as the
  // primary interaction). The URL is derived from siteLang at click time, not
  // re-read live inside the modal, so the preview always matches the language
  // the visitor had selected when they opened it.
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [cvModalUrl, setCvModalUrl] = useState('');
  const openCvModal = (lang: 'it' | 'en') => {
    setCvModalUrl(lang === 'it' ? 'assets/cv/Matteo_Cavo_CV_IT.pdf' : 'assets/cv/Matteo_Cavo_CV_EN.pdf');
    setIsCvModalOpen(true);
  };

  // Viewport simulation removed (Phase 2 cleanup): the app now renders as a normal
  // full-width responsive site, driven entirely by real CSS breakpoints.
  const isMobileSim = false;
  const isTabletSim = false;
  const isConstrainedSim = false;

  // Phase 3 Priority 1 (finalized): real Notion/GitHub data is fetched at
  // runtime (not bundled at build time) so the hourly sync-notion.js commit
  // reaches the live site on next page load without a JS rebuild. See
  // src/data/liveData.ts for the full rationale. While loading, every
  // derived list below defaults to an empty array/undefined flagship rather
  // than crashing; `liveDataError` is a user-visible signal if the fetch
  // itself fails (e.g. the JSON files are unreachable).
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  const [liveDataError, setLiveDataError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchLiveData()
      .then((data) => {
        if (!cancelled) setLiveData(data);
      })
      .catch((err) => {
        console.error('[Live Data] Failed to load real project/repo data:', err);
        if (!cancelled) setLiveDataError(err instanceof Error ? err.message : String(err));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const VERIFIED_NOTION_PROJECTS = liveData?.projects ?? [];
  const SECONDARY_REPOSITORIES = liveData?.secondaryRepos ?? [];
  const RAW_GITHUB_REPOSITORIES = liveData?.rawRepos ?? [];
  const LIVE_PROJECT_GITHUB_URLS = liveData?.projectGithubUrls ?? new Set<string>();
  const isLiveDataLoading = liveData === null && liveDataError === null;
  // Mechanically derived from each project's real `dashboard` URL (see
  // inferDashboardType in liveData.ts) — counts only genuine live Power BI
  // dashboards, not PDF exports or plain repository links. Never hand-typed.
  const liveDashboardsCount = VERIFIED_NOTION_PROJECTS.filter((p) => p.dashboardType === 'live_powerbi').length;

  const handleCopyProjectDeepLink = async (projectId: string) => {
    if (!liveData?.projects.some(p => p.id === projectId) || !document.getElementById(projectId)) return;
    setCopiedProjectId(null);
    setCopyFailedId(null);
    const copied = await copyText(`https://matteocavo.github.io/#${projectId}`);
    if (!copied) {
      setCopyFailedId(projectId);
      return;
    }
    setCopiedProjectId(projectId);
    setTimeout(() => setCopiedProjectId(prev => prev === projectId ? null : prev), 2200);
  };

  const handleCopySnippet = async (snippet: string, snippetId: string) => {
    if (!(await copyText(snippet))) return;
    setCopiedSnippetId(snippetId);
    setTimeout(() => setCopiedSnippetId(prev => prev === snippetId ? null : prev), 2200);
  };

  const scrollToProject = (projectId: string) => {
    if (!liveData?.projects.some(p => p.id === projectId)) return;
    setActiveFilterTag('ALL');
    setActiveObjectiveFilter('ALL');
    setPendingProjectId(projectId);
    if (window.location.hash !== `#${projectId}`) window.location.hash = projectId;
  };

  // Resolve against live data only after the runtime fetch. Listen for direct
  // URLs, refresh and history navigation; filters are cleared only on navigation.
  useEffect(() => {
    if (!liveData) return;
    const navigate = () => {
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); }
      catch { return; }
      if (!liveData.projects.some(p => p.id === id)) return;
      setActiveFilterTag('ALL');
      setActiveObjectiveFilter('ALL');
      setPendingProjectId(id);
    };
    navigate();
    window.addEventListener('hashchange', navigate);
    window.addEventListener('popstate', navigate);
    window.addEventListener('pageshow', navigate);
    return () => {
      window.removeEventListener('hashchange', navigate);
      window.removeEventListener('popstate', navigate);
      window.removeEventListener('pageshow', navigate);
    };
  }, [liveData]);

  // Language changes can move cards above the current hash target.
  useEffect(() => {
    let id: string;
    try { id = decodeURIComponent(window.location.hash.slice(1)); }
    catch { return; }
    if (liveData?.projects.some(p => p.id === id) && document.getElementById(id)) {
      setPendingProjectId(id);
    }
  }, [siteLang, liveData]);

  // Wait for the real target and keep its position through loading/history shifts.
  useEffect(() => {
    if (!pendingProjectId || activeFilterTag !== 'ALL' || activeObjectiveFilter !== 'ALL') return;
    return scrollProjectWhenReady(pendingProjectId, () => {
      setPendingProjectId(current => current === pendingProjectId ? null : current);
    });
  }, [pendingProjectId, activeFilterTag, activeObjectiveFilter, liveData, siteLang]);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data && data.success) {
        setFormSubmitted(true);
        form.reset();
      } else {
        console.error('[Contact Form Diagnostic] Web3Forms submission rejected:', {
          status: res.status,
          success: data?.success,
          message: data?.message,
        });
        setFormError(
          siteLang === 'it'
            ? 'Impossibile completare l\'invio in questo momento. Riprova più tardi.'
            : 'Unable to send message at this time. Please try again later.'
        );
      }
    } catch (err) {
      console.error('[Contact Form Diagnostic] Network error reaching Web3Forms:', err);
      setFormError(
        siteLang === 'it'
          ? 'Errore di connessione durante l\'invio. Verifica la tua connessione e riprova.'
          : 'Connection error while sending. Please check your connection and try again.'
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  // Keyboard accessibility: Close modals/tooltips on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeTechTooltip) setActiveTechTooltip(null);
        if (lightboxProject) {
          setLightboxProject(null);
          setLightboxZoomed(false);
        }
        if (isChatOpen) setIsChatOpen(false);
        if (isCvModalOpen) setIsCvModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTechTooltip, lightboxProject, isChatOpen, isCvModalOpen]);

  // Card entrance animations are handled by RevealCard components.
  // Section titles, eyebrow labels and introductory texts remain immediately visible and visually stable.

  // Section 5: Dynamic, honest technology presence across projects (NEVER skill rank or expert %)
  // Derived dynamically from live Notion `Tools` via centralized rules in techCategories.ts.
  const dynamicTechStats = useMemo(() => {
    return liveData?.techStats ?? computeTechCategoryStats(VERIFIED_NOTION_PROJECTS);
  }, [liveData]);

  // Section 3: Dual Filter Projects by Technology AND Business Objective (Feature #6)
  const filteredProjects = useMemo(() => {
    return VERIFIED_NOTION_PROJECTS.filter((p) => {
      // 1. Technology filter (centralized matching in techCategories.ts)
      const techMatch = projectMatchesTechFilter(p.tools, activeFilterTag);

      // 2. Business Objective filter
      const objectives = PROJECT_BUSINESS_OBJECTIVES_MAP[p.id] || [];
      const objMatch =
        activeObjectiveFilter === 'ALL' || objectives.includes(activeObjectiveFilter);

      return techMatch && objMatch;
    });
  }, [liveData, activeFilterTag, activeObjectiveFilter]);

  // Flagship project (Phase 3 Priority 2): already selected by fetchLiveData()
  // via the Notion `isFlagship` checkbox when set, with a deterministic
  // fallback (Rome Public Transport, identified by canonical GitHub URL)
  // otherwise. `null` only while the initial fetch is still in flight.
  const flagshipProject = liveData?.flagship ?? null;

  const isFlagshipMatched = useMemo(() => {
    if (!flagshipProject) return false;
    return filteredProjects.some((p) => p.id === flagshipProject.id);
  }, [filteredProjects, flagshipProject]);

  // Other featured projects: all remaining matching projects, excluding
  // whichever project is currently selected as flagship.
  const otherFeaturedProjects = useMemo(() => {
    if (!flagshipProject) return filteredProjects;
    return filteredProjects.filter((p) => p.id !== flagshipProject.id);
  }, [filteredProjects, flagshipProject]);

  // Curated balanced list of project and service questions (Phase 4.2 Requirement 3)
  const suggestedQuestionsList = useMemo(() => {
    const orderedIds = [
      'projects_rome',
      'services_overview',
      'services_power_bi',
      'services_data_quality',
      'services_data_engineering',
      'services_automation',
      'services_strategy_kpi',
      'projects_quaero',
      'projects_ispra',
      'projects_openbdap',
      'projects_streaming_benchmark',
      'projects_streaming_metadata',
      'certifications_overview'
    ];
    return orderedIds
      .map((id) => CHATBOT_KNOWLEDGE_BASE.find((item) => item.id === id))
      .filter((item): item is ChatbotQAItem => !!item);
  }, []);

  const handleLanguageToggle = (lang: 'it' | 'en') => {
    setSiteLang(lang);
    setChatMessages([
      {
        sender: 'bot',
        text: lang === 'it'
          ? 'Lingua impostata su Italiano. Puoi scrivermi qualsiasi domanda sui progetti, sulle competenze o sui servizi di Matteo.'
          : 'Language switched to English. You can type any question or choose a prompt below to learn about Matteo’s projects, skills, or services.'
      }
    ]);
    setLastChatTopicId(null);
  };

  const handleChatTrigger = (item: ChatbotQAItem) => {
    const questionText = siteLang === 'it' ? item.triggerIt : item.triggerEn;
    const answerText = siteLang === 'it' ? item.responseIt : item.responseEn;
    const actionLinks = item.actionLinks?.map((link) => ({
      label: siteLang === 'it' ? link.labelIt : link.labelEn,
      href: link.href,
      isExternal: link.isExternal
    }));

    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: questionText },
      { sender: 'bot', text: answerText, links: actionLinks }
    ]);
    setLastChatTopicId(item.id);
  };

  // Section 6a: Free-text question processing covering ALL case studies, CV, availability, education + zero raw email
  const handleChatFreeTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = chatInputText.trim();
    if (!text) return;

    setChatInputText('');
    setChatMessages((prev) => [...prev, { sender: 'user', text }]);

    // All intent resolution (small talk, keyword-ranked FAQ matching, the
    // live-data project overview, follow-up context, and the scoring
    // fallback) lives in chatbotEngine.ts -- see Task 2.F in the PR
    // description for why this was pulled out of App.tsx.
    const result = resolveChatbotAnswer(text, siteLang, {
      lastTopicId: lastChatTopicId,
      liveProjects: VERIFIED_NOTION_PROJECTS
    });

    setTimeout(() => {
      if (result.kind === 'smalltalk') {
        setChatMessages((prev) => [...prev, { sender: 'bot', text: result.text }]);
        // Small talk doesn't change the active topic, so a follow-up right
        // after a greeting can still resolve against whatever came before it.
      } else if (result.kind === 'dynamicProjects') {
        setChatMessages((prev) => [...prev, { sender: 'bot', text: result.text, links: result.links }]);
        setLastChatTopicId('projects_overview_dynamic');
      } else if (result.kind === 'kb') {
        const respText = siteLang === 'it' ? result.item.responseIt : result.item.responseEn;
        const links = result.item.actionLinks?.map((l) => ({
          label: siteLang === 'it' ? l.labelIt : l.labelEn,
          href: l.href,
          isExternal: l.isExternal
        }));
        setChatMessages((prev) => [...prev, { sender: 'bot', text: respText, links }]);
        setLastChatTopicId(result.item.id);
      } else {
        const fallbackMsg =
          siteLang === 'it'
            ? 'Posso fornirti informazioni dettagliate sulle competenze tecniche di Matteo, sui suoi progetti in evidenza (incluso Quaero v0.4.0 e Databricks), sul suo percorso o sulle opzioni di contatto.'
            : 'I can provide detailed information on Matteo\u2019s technical skills, his featured projects (including Quaero v0.4.0 and Databricks), his professional background, or direct contact options.';
        setChatMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: fallbackMsg,
            links: [
              {
                label: siteLang === 'it' ? 'Esplora i Progetti' : 'Explore Featured Projects',
                href: '#preview-projects',
                isExternal: false
              },
              {
                label: siteLang === 'it' ? 'Scarica il CV (PDF)' : 'Download CV (PDF)',
                href: siteLang === 'it' ? 'assets/cv/Matteo_Cavo_CV_IT.pdf' : 'assets/cv/Matteo_Cavo_CV_EN.pdf',
                isExternal: true
              },
              {
                label: siteLang === 'it' ? 'Invia un Messaggio' : 'Direct Message',
                href: '#preview-contact',
                isExternal: false
              }
            ]
          }
        ]);
        // Deliberately do not touch lastChatTopicId here: an unmatched
        // message shouldn't erase a still-relevant previous topic.
      }
    }, 280);
  };

  const handleResetChat = () => {
    setChatMessages([
      {
        sender: 'bot',
        text:
          siteLang === 'it'
            ? 'Conversazione riavviata. Come posso aiutarti a valutare il profilo analitico e i progetti di Matteo?'
            : 'Conversation reset. How can I assist you in exploring Matteo’s analytical projects and profile?'
      }
    ]);
    setLastChatTopicId(null);
  };

  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-[#2563EB]" />;
      case 'Database':
        return <Database className="w-5 h-5 text-[#2563EB]" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-[#2563EB]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#2563EB]" />;
      case 'RefreshCw':
        return <RefreshCw className="w-5 h-5 text-[#2563EB]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#2563EB]" />;
      default:
        return <Activity className="w-5 h-5 text-[#2563EB]" />;
    }
  };

  // Section 2: Logo Graph Motif Component
  const LogoGraphMotif = ({ className = "w-6 h-5" }: { className?: string }) => (
    <svg viewBox="0 0 140 120" className={className} fill="none" aria-hidden="true">
      <line x1="12" y1="60" x2="46" y2="30" stroke="#94A3B8" strokeWidth="6" />
      <line x1="12" y1="60" x2="46" y2="90" stroke="#94A3B8" strokeWidth="6" />
      <line x1="46" y1="30" x2="80" y2="46" stroke="#94A3B8" strokeWidth="6" />
      <line x1="46" y1="90" x2="80" y2="74" stroke="#94A3B8" strokeWidth="6" />
      <line x1="80" y1="46" x2="118" y2="60" stroke="#7AA7FF" strokeWidth="6" />
      <line x1="80" y1="74" x2="118" y2="60" stroke="#7AA7FF" strokeWidth="6" />
      <circle cx="12" cy="60" r="10" fill="none" stroke="#94A3B8" strokeWidth="5" />
      <circle cx="46" cy="30" r="9" fill="none" stroke="#94A3B8" strokeWidth="5" />
      <circle cx="46" cy="90" r="9" fill="none" stroke="#94A3B8" strokeWidth="5" />
      <circle cx="80" cy="46" r="8" fill="#7AA7FF" />
      <circle cx="80" cy="74" r="8" fill="#7AA7FF" />
      <circle cx="118" cy="60" r="14" fill="#2563EB" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] flex flex-col font-sans antialiased selection:bg-[#EFF6FF] selection:text-[#2563EB]">
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-[1440px] theme-container bg-[#FFFFFF] relative">
            {/* ===================================================================
                1. HEADER & NAVIGATION
                Sticky on desktop (top-14 below persistent bar), mobile sticky intact
                =================================================================== */}
            <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E8F0]">
              <div className={`mx-auto ${isMobileSim ? 'px-4' : 'px-6 lg:px-12'} h-16 flex items-center justify-between gap-4`}>
                {/* Zone 1: Wordmark + Authentic logo motif with #7AA7FF accent */}
                <a
                  href="#preview-hero"
                  className="font-display text-base font-bold tracking-tight text-[#111111] whitespace-nowrap shrink-0 flex items-center gap-2.5"
                >
                  <LogoGraphMotif className="w-6 h-5" />
                  <span>Matteo Cavo</span>
                  {!isConstrainedSim && (
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#475569] font-normal">
                      <span className="text-[#CBD5E1]" aria-hidden="true">/</span>
                      <span>Data &amp; BI Analyst</span>
                    </span>
                  )}
                </a>

                {/* Zone 2: Navigation Links (visible on lg+ when not simulated mobile/tablet) */}
                {!isConstrainedSim && (
                  <nav
                    aria-label={siteLang === 'it' ? 'Sezioni del portfolio' : 'Portfolio sections'}
                    className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium text-[#475569]"
                  >
                    <a href="#preview-hero" className="hover:text-[#111111] transition-colors whitespace-nowrap">
                      {siteLang === 'it' ? 'Home' : 'Home'}
                    </a>
                    <a href="#preview-projects" className="hover:text-[#111111] transition-colors whitespace-nowrap">
                      {siteLang === 'it' ? 'Progetti' : 'Projects'}
                    </a>
                    <a href="#preview-services" className="hover:text-[#111111] transition-colors whitespace-nowrap">
                      {siteLang === 'it' ? 'Servizi' : 'Services'}
                    </a>
                    <a href="#preview-process" className="hover:text-[#111111] transition-colors whitespace-nowrap">
                      {siteLang === 'it' ? 'Processo' : 'Process'}
                    </a>
                    <a href="#preview-skills" className="hover:text-[#111111] transition-colors whitespace-nowrap">
                      {siteLang === 'it' ? 'Competenze' : 'Skills'}
                    </a>
                    <a href="#preview-about" className="hover:text-[#111111] transition-colors whitespace-nowrap">
                      {siteLang === 'it' ? 'Profilo' : 'About'}
                    </a>
                    <a href="#preview-contact" className="hover:text-[#111111] transition-colors whitespace-nowrap">
                      {siteLang === 'it' ? 'Contatti' : 'Contact'}
                    </a>
                  </nav>
                )}

                {/* Zone 3: Language Toggle + Theme Switcher + CTA / Hamburger Menu */}
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                  {/* Language Toggle */}
                  <div className="flex items-center border border-[#CBD5E1] rounded-lg p-0.5 bg-[#F8FAFC]">
                    <button
                      type="button"
                      onClick={() => handleLanguageToggle('it')}
                      className={`px-2 py-0.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                        siteLang === 'it' ? 'bg-[#2563EB] text-white shadow-2xs' : 'text-[#64748B] hover:text-[#111111]'
                      }`}
                    >
                      IT
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLanguageToggle('en')}
                      className={`px-2 py-0.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                        siteLang === 'en' ? 'bg-[#2563EB] text-white shadow-2xs' : 'text-[#64748B] hover:text-[#111111]'
                      }`}
                    >
                      EN
                    </button>
                  </div>

                  {!isConstrainedSim ? (
                    <a
                      href="#preview-contact"
                      className="hidden lg:inline-flex px-3.5 xl:px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl transition-all whitespace-nowrap shadow-xs hover:shadow-md"
                    >
                      {siteLang === 'it' ? 'Parliamo di un Progetto' : 'Discuss a Project'}
                    </a>
                  ) : null}

                  {/* Hamburger menu button on mobile/tablet or when constrained */}
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`p-2 text-[#111111] rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] cursor-pointer ${
                      isConstrainedSim ? 'inline-flex' : 'inline-flex lg:hidden'
                    }`}
                    aria-label={siteLang === 'it' ? 'Apri/chiudi il menu di navigazione' : 'Toggle navigation drawer'}
                  >
                    {mobileMenuOpen ? <X className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Mobile & Tablet Drawer */}
              {mobileMenuOpen && (
                <div className={`px-5 py-4 bg-[#FFFFFF] border-t border-[#E2E8F0] space-y-3 text-sm font-medium animate-in slide-in-from-top-2 duration-200 ${
                  isConstrainedSim ? 'block' : 'block lg:hidden'
                }`}>
                  <a
                    href="#preview-hero"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-[#334155] hover:text-[#2563EB] border-b border-[#F1F5F9]"
                  >
                    {siteLang === 'it' ? 'Home' : 'Home'}
                  </a>
                  <a
                    href="#preview-projects"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-[#334155] hover:text-[#2563EB] border-b border-[#F1F5F9]"
                  >
                    {siteLang === 'it' ? 'Progetti in Evidenza' : 'Featured Projects'}
                  </a>
                  <a
                    href="#preview-services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-[#334155] hover:text-[#2563EB] border-b border-[#F1F5F9]"
                  >
                    {siteLang === 'it' ? 'Servizi & Ambiti' : 'Services & Capabilities'}
                  </a>
                  <a
                    href="#preview-process"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-[#334155] hover:text-[#2563EB] border-b border-[#F1F5F9]"
                  >
                    {siteLang === 'it' ? 'Processo & Metodologia' : 'Workflow & Methodology'}
                  </a>
                  <a
                    href="#preview-skills"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-[#334155] hover:text-[#2563EB] border-b border-[#F1F5F9]"
                  >
                    {siteLang === 'it' ? 'Toolkit & Certificazioni' : 'Skills & Credentials'}
                  </a>
                  <a
                    href="#preview-about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-[#334155] hover:text-[#2563EB] border-b border-[#F1F5F9]"
                  >
                    {siteLang === 'it' ? 'Profilo Professionale' : 'About'}
                  </a>

                  <a
                    href={siteLang === 'it' ? 'assets/cv/Matteo_Cavo_CV_IT.pdf' : 'assets/cv/Matteo_Cavo_CV_EN.pdf'}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      openCvModal(siteLang);
                    }}
                    className="w-full text-left py-2 text-[#2563EB] font-semibold border-b border-[#F1F5F9] flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Curriculum Vitae (PDF)</span>
                    </span>
                    <span className="text-[10px] font-mono bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded border border-[#BFDBFE] flex items-center gap-1">
                      <span>{siteLang === 'it' ? 'Anteprima' : 'Preview'}</span>
                      <FileText className="w-2.5 h-2.5" />
                    </span>
                  </a>
                  <a
                    href="#preview-contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 font-bold text-[#2563EB]"
                  >
                    {siteLang === 'it' ? 'Contatti →' : 'Contact →'}
                  </a>
                </div>
              )}
            </header>

            {/* ===================================================================
                2. HERO & PROFESSIONAL POSITIONING SECTION
                Hero Information Architecture strictly preserved from original portfolio:
                - Small uppercase eyebrow line above headline
                - Oversized multi-line headline as dominant visual element
                - Descriptive paragraphs below headline
                - Action buttons (Vedi GitHub, Esplora i progetti, Servizi)
                - Right-side vertical stack of 3 summary cards:
                  1. "Ruolo attuale"
                  2. "Punto di forza"
                  3. "Profilo in sintesi" with animated visual technology bars (Phase 4 §1)
                =================================================================== */}
            <section
              id="preview-hero"
              className={`border-b border-[#E2E8F0] bg-[#FFFFFF] relative overflow-hidden ${
                isMobileSim ? 'px-4 py-8' : 'px-6 lg:px-12 py-12 lg:py-16'
              }`}
            >
              <div className="max-w-[1240px] mx-auto">
                {/* Asymmetric 2-Column Editorial Composition with Desktop Balance */}
                <div className={isConstrainedSim ? 'flex flex-col gap-8' : 'grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10 items-stretch'}>
                  {/* Left Column (7 cols on xl): Eyebrow, Oversized H1 Headline, Descriptive Copy, Actions, Availability */}
                  <div className={`${isConstrainedSim ? 'w-full' : 'xl:col-span-7'} flex flex-col justify-between`}>
                    <div>
                      {/* Small uppercase eyebrow line */}
                      <div style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
                        <p className="text-[11px] sm:text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-3">
                          {LOCKED_PROFILE_TEXT[siteLang].heroTag}
                        </p>
                      </div>

                      {/* Dominant oversized multi-line headline */}
                      <h1
                        className="font-display text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-[#111111] leading-[1.08] mb-6"
                        style={{ '--reveal-delay': '70ms' } as React.CSSProperties}
                      >
                        {LOCKED_PROFILE_TEXT[siteLang].heroTitle}
                      </h1>

                      {/* Paragraph 1 */}
                      <p
                        className="text-sm sm:text-base lg:text-[17px] text-[#334155] leading-relaxed mb-3.5"
                        style={{ '--reveal-delay': '130ms' } as React.CSSProperties}
                      >
                        {LOCKED_PROFILE_TEXT[siteLang].heroP1}
                      </p>

                      {/* Paragraph 2 */}
                      <p
                        className="text-sm sm:text-base text-[#475569] leading-relaxed mb-5"
                        style={{ '--reveal-delay': '190ms' } as React.CSSProperties}
                      >
                        {LOCKED_PROFILE_TEXT[siteLang].heroP2}
                      </p>

                      {/* Primary Actions (Phase 4.1: Servizi & Consulenze removed from public UI) */}
                      <div 
                        className="flex flex-wrap items-center gap-3 pt-1"
                        style={{ '--reveal-delay': '250ms' } as React.CSSProperties}
                      >
                        <a
                          href="https://github.com/matteocavo"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl transition-all shadow-2xs hover:shadow-md cursor-pointer"
                        >
                          <Github className="w-4 h-4" />
                          <span>{LOCKED_PROFILE_TEXT[siteLang].btnGithub}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                        </a>
                        <a
                          href="#preview-projects"
                          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#111111] bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#CBD5E1] hover:border-[#2563EB] rounded-xl transition-all cursor-pointer"
                        >
                          <span>{LOCKED_PROFILE_TEXT[siteLang].btnProjects}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
                        </a>
                        <a
                          href={siteLang === 'it' ? 'assets/cv/Matteo_Cavo_CV_IT.pdf' : 'assets/cv/Matteo_Cavo_CV_EN.pdf'}
                          onClick={(e) => {
                            e.preventDefault();
                            openCvModal(siteLang);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#2563EB] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] hover:border-[#2563EB] rounded-xl transition-all cursor-pointer shadow-2xs"
                        >
                          <FileText className="w-4 h-4 text-[#2563EB]" />
                          <span>{siteLang === 'it' ? 'Apri CV (PDF)' : 'Open CV (PDF)'}</span>
                          <ExternalLink className="w-3 h-3 text-[#2563EB] opacity-75" />
                        </a>
                      </div>
                    </div>

                    {/* Desktop Balanced Availability Note (Phase 4.1: Factual & Simple, No VAT references) */}
                    <div className="pt-4 mt-5 border-t border-[#F1F5F9] flex items-center gap-2 text-xs text-[#475569]" style={{ '--reveal-delay': '300ms' } as React.CSSProperties}>
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
                      <span className="font-semibold text-[#111111] shrink-0">
                        {siteLang === 'it' ? 'Disponibilità:' : 'Availability:'}
                      </span>
                      <span className="text-[#475569]">
                        {siteLang === 'it'
                          ? 'Disponibile per ruoli in-house e collaborazioni tecniche selezionate.'
                          : 'Available for in-house roles and selected technical collaborations.'}
                      </span>
                    </div>
                  </div>

                  {/* Right Column (5 cols on xl, full-width on mobile/tablet): Summary Cards with Animated Entrance */}
                  <div className={`${isConstrainedSim ? 'w-full' : 'xl:col-span-5'} flex flex-col gap-3.5`}>
                    {/* Row with Card 1 & Card 2 side-by-side on sm+ for ideal desktop balance */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Card 1: Ruolo attuale (Current Focus) */}
                      <RevealCard
                        as="article"
                        delay={80}
                        className="bg-[#FFFFFF] border border-[#CBD5E1] hover:border-[#2563EB] rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-all duration-200 soft-card flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#2563EB]">
                              {LOCKED_PROFILE_TEXT[siteLang].currentFocus}
                            </span>
                            <span className="w-2 h-2 rounded-full bg-[#2563EB] ring-4 ring-[#2563EB]/15" />
                          </div>
                          <h3 className="font-display text-xs sm:text-sm font-bold text-[#111111] mb-1">
                            {LOCKED_PROFILE_TEXT[siteLang].currentFocusTitle}
                          </h3>
                          <p className="text-[11px] text-[#475569] leading-relaxed">
                            {LOCKED_PROFILE_TEXT[siteLang].currentFocusText}
                          </p>
                        </div>
                      </RevealCard>

                      {/* Card 2: Punto di forza (Professional Edge) */}
                      <RevealCard
                        as="article"
                        delay={140}
                        className="bg-[#FFFFFF] border border-[#CBD5E1] hover:border-[#2563EB] rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-all duration-200 soft-card flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#2563EB]">
                              {LOCKED_PROFILE_TEXT[siteLang].edge}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                              Hybrid Profile
                            </span>
                          </div>
                          <p className="text-[11px] text-[#475569] leading-relaxed">
                            {LOCKED_PROFILE_TEXT[siteLang].edgeText}
                          </p>
                        </div>
                      </RevealCard>
                    </div>

                    {/* Card 3: Profilo in sintesi (Profile Snapshot with Animated Tech Visual Bars) */}
                    <RevealCard
                      as="article"
                      id="hero-tech-card"
                      delay={200}
                      onInView={() => setTechBarsInView(true)}
                      className="bg-[#FFFFFF] border border-[#CBD5E1] hover:border-[#2563EB] rounded-2xl p-4.5 shadow-2xs hover:shadow-xs transition-all duration-200 hero-dashboard"
                    >
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#E2E8F0]">
                        <div>
                          <h3 className="font-display text-sm font-bold text-[#111111]">
                            {LOCKED_PROFILE_TEXT[siteLang].dashboardTitle}
                          </h3>
                          <p className="text-[11px] text-[#64748B]">
                            {LOCKED_PROFILE_TEXT[siteLang].toolMixLabel}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                          {VERIFIED_NOTION_PROJECTS.length} {siteLang === 'it' ? 'Casi Studio' : 'Case Studies'}
                        </span>
                      </div>

                      {/* Phase 4.3 Feature #1: Interactive technology presence with verifiable tooltips */}
                      <div className="space-y-2.5 text-xs relative">
                        {dynamicTechStats.map((item, idx) => {
                          const pct = item.percentage;
                          const categoryName = siteLang === 'it' ? item.nameIt : item.nameEn;
                          const isTooltipActive = activeTechTooltip === item.id;
                          return (
                            <div
                              key={item.id}
                              className="space-y-1 relative group"
                              tabIndex={0}
                              role="button"
                              aria-haspopup="dialog"
                              aria-expanded={isTooltipActive}
                              aria-label={siteLang === 'it' ? `Dettagli progetti per ${categoryName}` : `Project details for ${categoryName}`}
                              onMouseEnter={() => setActiveTechTooltip(item.id)}
                              onMouseLeave={() => setActiveTechTooltip(null)}
                              onFocus={() => setActiveTechTooltip(item.id)}
                              onBlur={() => setActiveTechTooltip(null)}
                              onClick={() => setActiveTechTooltip(isTooltipActive ? null : item.id)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setActiveTechTooltip(isTooltipActive ? null : item.id);
                                }
                                if (e.key === 'Escape') {
                                  setActiveTechTooltip(null);
                                }
                              }}
                            >
                              <div className="flex items-center justify-between text-[11px] cursor-pointer">
                                <span className="font-medium text-[#111111] group-hover:text-[#2563EB] transition-colors flex items-center gap-1.5">
                                  <span>{categoryName}</span>
                                  <Info className="w-3 h-3 text-[#94A3B8] group-hover:text-[#2563EB] transition-colors" />
                                </span>
                                <span className="font-mono text-[11px] text-[#2563EB] font-semibold tabular-nums">
                                  {item.count}/{item.total} {siteLang === 'it' ? 'progetti' : 'projects'}
                                </span>
                              </div>

                              {/* Visible track + blue filled bar animating on entry */}
                              <div className="h-2 w-full bg-[#F1F5F9] border border-[#E2E8F0] group-hover:border-[#93C5FD] rounded-full overflow-hidden relative cursor-pointer transition-colors">
                                <div 
                                  className="h-full rounded-full bg-[#2563EB] tech-bar-fill"
                                  style={{
                                    width: techBarsInView ? `${pct}%` : '0%',
                                    transitionDelay: `${idx * 100}ms`
                                  }}
                                />
                              </div>

                              {/* Contextual Tooltip Popover (Feature #1) */}
                              {isTooltipActive && (
                                <div
                                  className="absolute z-40 top-full mt-1.5 left-0 w-full sm:w-[320px] bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl p-3 shadow-xl text-left text-xs text-[#1E293B] animate-in fade-in-50 zoom-in-95 duration-150"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-[#E2E8F0]">
                                    <div>
                                      <h4 className="font-display font-bold text-xs text-[#111111] flex items-center gap-1.5 flex-wrap">
                                        <span>{categoryName}</span>
                                        <span className="text-[10px] font-mono font-semibold text-[#2563EB] bg-[#EFF6FF] px-1.5 py-0.5 rounded border border-[#BFDBFE]">
                                          {item.count}/{item.total} {siteLang === 'it' ? 'casi studio' : 'case studies'}
                                        </span>
                                      </h4>
                                      <p className="text-[10px] text-[#64748B] mt-0.5 leading-tight">
                                        {siteLang === 'it' ? item.contextNoteIt : item.contextNoteEn}
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => setActiveTechTooltip(null)}
                                      className="text-[#94A3B8] hover:text-[#111111] p-0.5 rounded transition-colors"
                                      aria-label={siteLang === 'it' ? 'Chiudi tooltip' : 'Close tooltip'}
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  <div className="space-y-1">
                                    <p className="text-[10px] font-mono font-semibold text-[#475569] uppercase tracking-wider">
                                      {siteLang === 'it' ? 'Casi studio verificati:' : 'Verified case studies:'}
                                    </p>
                                    {item.projects.map((proj) => {
                                      const projTitle = siteLang === 'it' ? proj.titleIt : proj.titleEn;
                                      return (
                                        <a
                                          key={proj.id}
                                          href={`#${proj.id}`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveTechTooltip(null);
                                            scrollToProject(proj.id);
                                          }}
                                          className="flex items-center justify-between text-[11px] text-[#2563EB] hover:text-[#1D4ED8] p-1 rounded-md hover:bg-[#EFF6FF] transition-colors group/link"
                                        >
                                          <span className="truncate">• {projTitle}</span>
                                          <ArrowRight className="w-3 h-3 shrink-0 ml-1 text-[#93C5FD] group-hover/link:text-[#2563EB] transition-colors" />
                                        </a>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Summary Metrics Row (15+ Years, 6 Projects, 3 Live Dashboards) */}
                      <div className="mt-3.5 pt-2.5 border-t border-[#E2E8F0] grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                          <div className="font-display text-base font-bold text-[#111111]">15+</div>
                          <div className="text-[10px] text-[#64748B] font-medium leading-tight mt-0.5">
                            {LOCKED_PROFILE_TEXT[siteLang].snapshotYearsLabel}
                          </div>
                        </div>
                        <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                          <div className="font-display text-base font-bold text-[#2563EB]">{VERIFIED_NOTION_PROJECTS.length}</div>
                          <div className="text-[10px] text-[#64748B] font-medium leading-tight mt-0.5">
                            {LOCKED_PROFILE_TEXT[siteLang].snapshotProjectsLabel}
                          </div>
                        </div>
                        <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                          <div className="font-display text-base font-bold text-[#10B981]">{liveDashboardsCount}</div>
                          <div className="text-[10px] text-[#64748B] font-medium leading-tight mt-0.5">
                            {LOCKED_PROFILE_TEXT[siteLang].snapshotDashboardsLabel}
                          </div>
                        </div>
                      </div>

                      {/* Location & availability status */}
                      <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>{siteLang === 'it' ? 'Roma · Remoto / Ibrido' : 'Rome · Remote / Hybrid'}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#059669] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                          {siteLang === 'it' ? 'Disponibile' : 'Available'}
                        </span>
                      </div>
                    </RevealCard>
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                3. PROGETTI IN EVIDENZA (Featured Projects — 6 Notion "Portfolio Ready")
                Section 3: Flagship Treatment for Rome Public Transport
                All 6 Notion projects preserved in featured group
                =================================================================== */}
            <section
              id="preview-projects"
              className={`border-b border-[#E2E8F0] bg-[#F8FAFC] ${
                isMobileSim ? 'px-4 py-8' : 'px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16'
              }`}
            >
              <div className="max-w-[1240px] mx-auto w-full">
                {/* Section Header & Filter Controls: Single-column vertically stacked, full width heading & description, with filters cleanly positioned BELOW on mobile */}
                <div className="flex flex-col gap-6 mb-8 w-full">
                  <div className="w-full min-w-0 max-w-4xl">
                    <div className="text-xs font-semibold text-[#2563EB] mb-1.5 uppercase tracking-wider font-mono">
                      {siteLang === 'it' ? 'Lavori Selezionati' : 'Selected Work'}
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight">
                      {siteLang === 'it' ? 'Progetti in evidenza' : 'Featured Projects'}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed w-full">
                      {siteLang === 'it'
                        ? `Tutti i ${VERIFIED_NOTION_PROJECTS.length} progetti con classificazione "Portfolio Ready" dal database Notion, con dataset reali, metriche analitiche non ritagliate e documentazione metodologica.`
                        : `All ${VERIFIED_NOTION_PROJECTS.length} projects with "Portfolio Ready" status from Notion database, featuring real datasets, uncropped analytical views, and methodological notes.`}
                    </p>
                  </div>

                  {/* Multi-facet filtering controls: Positioned BELOW the description on ALL viewports */}
                  <div className="w-full pt-1">
                    {/* Mobile Viewports (< 640px or isMobileSim): Clean full-width single-column stacked controls */}
                    <div className={`${isMobileSim ? 'block' : 'block sm:hidden'} w-full space-y-3`}>
                      <div className="flex flex-col gap-1.5 w-full">
                        <label htmlFor="mobile-tech-filter-select" className="text-xs font-semibold text-[#334155]">
                          {siteLang === 'it' ? 'Tecnologia:' : 'Technology:'}
                        </label>
                        <div className="relative w-full min-w-0">
                          <select
                            id="mobile-tech-filter-select"
                            value={activeFilterTag}
                            onChange={(e) => setActiveFilterTag(e.target.value)}
                            className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl text-[#111111] focus:border-[#2563EB] focus:outline-none appearance-none pr-8 cursor-pointer shadow-2xs"
                          >
                            <option value="ALL">{siteLang === 'it' ? `Tutte le tecnologie (${VERIFIED_NOTION_PROJECTS.length})` : `All technologies (${VERIFIED_NOTION_PROJECTS.length})`}</option>
                            <option value="Databricks">Databricks (Lakehouse)</option>
                            <option value="Power BI">Power BI &amp; DAX</option>
                            <option value="Python">Python &amp; ML</option>
                            <option value="SQL">SQL &amp; Modeling</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#64748B]">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 w-full">
                        <label htmlFor="mobile-obj-filter-select" className="text-xs font-semibold text-[#334155]">
                          {siteLang === 'it' ? 'Obiettivo di Business:' : 'Business Objective:'}
                        </label>
                        <div className="relative w-full min-w-0">
                          <select
                            id="mobile-obj-filter-select"
                            value={activeObjectiveFilter}
                            onChange={(e) => setActiveObjectiveFilter(e.target.value as BusinessObjectiveId | 'ALL')}
                            className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl text-[#111111] focus:border-[#2563EB] focus:outline-none appearance-none pr-8 cursor-pointer shadow-2xs"
                          >
                            {BUSINESS_OBJECTIVES.map((obj) => (
                              <option key={obj.id} value={obj.id}>
                                {siteLang === 'it' ? obj.labelIt : obj.labelEn}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#64748B]">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {(activeFilterTag !== 'ALL' || activeObjectiveFilter !== 'ALL') && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveFilterTag('ALL');
                            setActiveObjectiveFilter('ALL');
                          }}
                          className="w-full py-2.5 text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] rounded-xl cursor-pointer text-center transition-colors shadow-2xs"
                        >
                          {siteLang === 'it' ? 'Mostra tutti i progetti (Reset filtri ↺)' : 'Show all projects (Reset filters ↺)'}
                        </button>
                      )}
                    </div>

                    {/* Desktop / Tablet Viewports (>= 640px and !isMobileSim): Clean horizontal pills and dropdown */}
                    <div className={`${isMobileSim ? 'hidden' : 'hidden sm:flex'} flex-wrap items-center gap-3`}>
                      {/* 1. Technology Segmented Pills */}
                      <div className="flex items-center gap-1 p-1 bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl text-xs shadow-2xs">
                        {(['ALL', 'Databricks', 'Power BI', 'Python', 'SQL'] as const).map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setActiveFilterTag(tag)}
                            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap text-xs ${
                              activeFilterTag === tag
                                ? 'bg-[#2563EB] text-white shadow-2xs'
                                : 'text-[#64748B] hover:text-[#111111] hover:bg-[#F1F5F9]'
                            }`}
                          >
                            {tag === 'ALL'
                              ? siteLang === 'it'
                                ? `Tutti (${VERIFIED_NOTION_PROJECTS.length})`
                                : `All (${VERIFIED_NOTION_PROJECTS.length})`
                              : tag}
                          </button>
                        ))}
                      </div>

                      {/* 2. Business Objective Compact Dropdown */}
                      <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs shadow-2xs">
                        <Filter className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                        <label htmlFor="objective-filter-select" className="text-[#64748B] font-medium text-xs whitespace-nowrap">
                          {siteLang === 'it' ? 'Obiettivo:' : 'Objective:'}
                        </label>
                        <select
                          id="objective-filter-select"
                          value={activeObjectiveFilter}
                          onChange={(e) => setActiveObjectiveFilter(e.target.value as BusinessObjectiveId | 'ALL')}
                          className="bg-transparent text-xs font-semibold text-[#111111] focus:outline-none cursor-pointer pr-1"
                        >
                          {BUSINESS_OBJECTIVES.map((obj) => (
                            <option key={obj.id} value={obj.id}>
                              {obj.id === 'ALL'
                                ? siteLang === 'it'
                                  ? `Tutti gli Obiettivi (${VERIFIED_NOTION_PROJECTS.length})`
                                  : `All Objectives (${VERIFIED_NOTION_PROJECTS.length})`
                                : siteLang === 'it'
                                ? obj.shortLabelIt
                                : obj.shortLabelEn}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Reset action if any filter is active */}
                      {(activeFilterTag !== 'ALL' || activeObjectiveFilter !== 'ALL') && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveFilterTag('ALL');
                            setActiveObjectiveFilter('ALL');
                          }}
                          className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] underline ml-1 cursor-pointer whitespace-nowrap"
                        >
                          {siteLang === 'it' ? 'Reset filtri ↺' : 'Reset filters ↺'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Loading State: real Notion/GitHub data is being fetched at runtime */}
                {isLiveDataLoading && (
                  <div className="p-8 my-6 bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl text-center space-y-2">
                    <RefreshCw className="w-6 h-6 text-[#94A3B8] mx-auto animate-spin" />
                    <p className="text-xs text-[#64748B]">
                      {siteLang === 'it' ? 'Caricamento dei casi studio in corso…' : 'Loading case studies…'}
                    </p>
                  </div>
                )}

                {/* Error State: the runtime fetch of data/projects.json or data/github-repos.json failed */}
                {liveDataError && (
                  <div className="p-8 my-6 bg-[#FFFFFF] border border-[#FCA5A5] rounded-2xl text-center space-y-2">
                    <AlertCircle className="w-6 h-6 text-[#DC2626] mx-auto" />
                    <p className="text-xs text-[#991B1B]">
                      {siteLang === 'it'
                        ? 'Impossibile caricare i dati dei progetti in questo momento. Riprova più tardi.'
                        : 'Unable to load project data right now. Please try again later.'}
                    </p>
                  </div>
                )}

                {/* Empty State: If no projects match active filters (only once real data has loaded) */}
                {!isLiveDataLoading && !liveDataError && filteredProjects.length === 0 && (
                  <div className="p-8 my-6 bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl text-center space-y-3">
                    <Filter className="w-8 h-8 text-[#94A3B8] mx-auto" />
                    <h3 className="font-display font-bold text-base text-[#111111]">
                      {siteLang === 'it' ? 'Nessun caso studio corrisponde ai filtri selezionati' : 'No case studies match the selected filters'}
                    </h3>
                    <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
                      {siteLang === 'it'
                        ? `La combinazione tra tecnologia e obiettivo di business non ha prodotto risultati. Prova a reimpostare i filtri per visualizzare tutti i ${VERIFIED_NOTION_PROJECTS.length} casi studio.`
                        : `The combination of technology and business objective returned no matches. Reset filters to explore all ${VERIFIED_NOTION_PROJECTS.length} case studies.`}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFilterTag('ALL');
                        setActiveObjectiveFilter('ALL');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl transition-colors cursor-pointer shadow-2xs"
                    >
                      {siteLang === 'it' ? `Reimposta tutti i filtri (${VERIFIED_NOTION_PROJECTS.length})` : `Reset all filters (${VERIFIED_NOTION_PROJECTS.length})`}
                    </button>
                  </div>
                )}

                {/* 3A. FEATURED CASE STUDY: Rome Public Transport (Largest Visual Weight, Editorial Asymmetric Layout) */}
                {flagshipProject && isFlagshipMatched && (
                  <RevealCard
                    as="article"
                    id={flagshipProject.id}
                    delay={60}
                    className="mb-10 bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow featured-card scroll-mt-24"
                  >
                    <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-b border-[#E2E8F0] bg-[#FFFFFF] flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                        <span className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono">
                          {siteLang === 'it'
                            ? flagshipProject.highlightCategoryIt ?? flagshipProject.highlightCategory
                            : flagshipProject.highlightCategoryEn ?? flagshipProject.highlightCategory}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                          {siteLang === 'it' ? 'Case Study in Evidenza' : 'Featured Case Study'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">{flagshipProject.date}</span>
                      </div>
                    </div>

                    <div className={isMobileSim ? 'flex flex-col' : 'grid grid-cols-1 lg:grid-cols-12 gap-0'}>
                      {/* Left: Uncropped Real Screenshot in Light Neutral Container */}
                      <div className={`${isMobileSim ? 'w-full' : 'lg:col-span-7'} bg-[#F8FAFC] p-4 sm:p-6 flex items-center justify-center relative group border-b lg:border-b-0 lg:border-r border-[#E2E8F0]`}>
                        <img
                          src={flagshipProject.image}
                          alt={`${flagshipProject.titleEn} uncropped dashboard preview`}
                          loading="lazy"
                          className="w-full h-auto max-h-[420px] object-contain rounded-xl border border-[#CBD5E1] cursor-pointer shadow-sm hover:shadow-md transition-shadow bg-[#FFFFFF]"
                          onClick={() => setLightboxProject(flagshipProject)}
                        />
                        <button
                          type="button"
                          onClick={() => setLightboxProject(flagshipProject)}
                          className="absolute bottom-6 right-6 px-3 py-1.5 rounded-lg bg-[#FFFFFF]/95 hover:bg-[#FFFFFF] text-[#111111] text-[11px] font-semibold border border-[#CBD5E1] hover:border-[#2563EB] flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>{siteLang === 'it' ? 'Schermo intero' : 'Zoom Fullscreen'}</span>
                        </button>
                      </div>

                      {/* Right: Narrative, Real KPIs & Direct Actions */}
                      <div className={`${isMobileSim ? 'w-full' : 'lg:col-span-5'} p-5 sm:p-6 flex flex-col justify-between bg-[#FFFFFF]`}>
                        <div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111111] leading-tight mb-3">
                            {siteLang === 'it' ? flagshipProject.titleIt : flagshipProject.titleEn}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4">
                            {siteLang === 'it' ? flagshipProject.businessGoalIt : flagshipProject.businessGoalEn}
                          </p>

                          {/* Real KPIs Grid: verified pre-formatted metrics when this project has
                              them (see VERIFIED_PROJECT_METRICS), otherwise the real bare keyKPIs
                              labels from Notion — never Rome Transport's numbers on another project. */}
                          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 mb-4 space-y-1.5">
                            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">
                              {siteLang === 'it' ? 'Metriche Verificate dal Dataset:' : 'Verified Dataset Metrics:'}
                            </span>
                            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#111111]">
                              {(VERIFIED_PROJECT_METRICS[flagshipProject.id] ?? flagshipProject.keyKPIs).map((metric, mIdx) => (
                                <span key={`${metric}-${mIdx}`} className="bg-[#FFFFFF] p-1.5 rounded border border-[#CBD5E1]">{metric}</span>
                              ))}
                            </div>
                          </div>

                          {/* Collapsible Methodology Drawer */}
                          <div className="mb-4">
                            <button
                              type="button"
                              onClick={() => setExpandedProjectId(expandedProjectId === flagshipProject.id ? null : flagshipProject.id)}
                              className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>
                                {expandedProjectId === flagshipProject.id
                                  ? siteLang === 'it' ? 'Nascondi dettagli' : 'Hide details'
                                  : siteLang === 'it' ? 'Mostra metodologia & note' : 'Show methodology & notes'}
                              </span>
                              {expandedProjectId === flagshipProject.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>

                            {expandedProjectId === flagshipProject.id && (
                              <div className="mt-2.5 p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl text-xs text-[#334155] space-y-2 leading-relaxed">
                                <p><strong>{siteLang === 'it' ? 'Dataset:' : 'Dataset:'}</strong> {siteLang === 'it' ? flagshipProject.datasetIt : flagshipProject.datasetEn}</p>
                                <p className="whitespace-pre-line text-[11px]">{siteLang === 'it' ? flagshipProject.notesIt : flagshipProject.notesEn}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Direct Links */}
                        <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1 text-[10px] font-mono text-[#64748B]">
                            {getConciseProjectBadges(flagshipProject.tools, 3).map((tool) => (
                              <span key={tool} className="bg-[#F8FAFC] border border-[#E2E8F0] px-1.5 py-0.5 rounded">
                                {tool}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            {flagshipProject.dashboardUrl && (
                              <a
                                href={flagshipProject.dashboardUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors shadow-2xs"
                              >
                                <span>
                                  {flagshipProject.dashboardType === 'pdf'
                                    ? (siteLang === 'it' ? 'Dashboard PDF' : 'PDF Dashboard')
                                    : flagshipProject.dashboardType === 'live_powerbi'
                                    ? (siteLang === 'it' ? 'Dashboard Live' : 'Live Dashboard')
                                    : (siteLang === 'it' ? 'Apri applicazione / output' : 'Open application / output')}
                                </span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            <a
                              href={flagshipProject.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#111111] bg-[#F8FAFC] border border-[#CBD5E1] hover:bg-[#EFF6FF] rounded-lg transition-colors"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>GitHub</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RevealCard>
                )}

                {/* 3B. REMAINING FEATURED PROJECTS: 2-3 Column Grid (Quaero, ISPRA, Streaming Benchmark, OpenBDAP, Streaming Metadata) */}
                <div
                  className={
                    isMobileSim
                      ? 'grid grid-cols-1 gap-6'
                      : isTabletSim
                      ? 'grid grid-cols-2 gap-6'
                      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  }
                >
                  {otherFeaturedProjects.map((project, pIdx) => {
                    const isExpanded = expandedProjectId === project.id;
                    const isImgFailed = imageErrors[project.id];

                    return (
                      <RevealCard
                        as="article"
                        id={project.id}
                        key={project.id}
                        delay={(pIdx % 3) * 90}
                        className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between w-full min-w-0 featured-card scroll-mt-24"
                      >
                        {/* Chrome bar + uncropped screenshot container */}
                        <div className="border-b border-[#E2E8F0] bg-[#FFFFFF]">
                          <div className="px-3.5 py-2 flex items-center justify-between border-b border-[#E2E8F0] text-[11px] font-mono text-[#64748B] bg-[#FFFFFF]">
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[#2563EB] text-[9px] bg-[#EFF6FF] px-1.5 py-0.5 rounded border border-[#BFDBFE] truncate">
                                {siteLang === 'it'
                                  ? project.highlightCategoryIt ?? project.highlightCategory
                                  : project.highlightCategoryEn ?? project.highlightCategory}
                              </span>
                            </div>
                          </div>

                          <div className="w-full aspect-[16/10] bg-[#F8FAFC] flex items-center justify-center p-2 relative group overflow-hidden">
                            {!isImgFailed ? (
                              <img
                                src={project.image}
                                alt={`${project.titleEn} uncropped dashboard preview`}
                                loading="lazy"
                                onError={() => setImageErrors((prev) => ({ ...prev, [project.id]: true }))}
                                className="w-full h-full object-contain cursor-pointer transition-transform duration-200 group-hover:scale-101"
                                onClick={() => setLightboxProject(project)}
                              />
                            ) : (
                              <div className="text-[#64748B] text-xs font-mono p-4 text-center">
                                {project.titleEn}
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={() => setLightboxProject(project)}
                              className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#111111] text-[10px] font-medium border border-[#CBD5E1] hover:border-[#2563EB] flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                            >
                              <Maximize2 className="w-3 h-3 text-[#2563EB]" />
                              <span>{siteLang === 'it' ? 'Ingrandisci' : 'Zoom'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 text-xs text-[#64748B] mb-2">
                              <span className="font-semibold text-[#2563EB] text-[11px] truncate">
                                {siteLang === 'it'
                                  ? project.highlightCategoryIt ?? project.highlightCategory
                                  : project.highlightCategoryEn ?? project.highlightCategory}
                              </span>
                              <span className="font-mono text-[11px] tabular-nums shrink-0">{project.date}</span>
                            </div>

                            <h3 className="font-display text-base font-bold text-[#111111] mb-2 leading-snug line-clamp-2">
                              {siteLang === 'it' ? project.titleIt : project.titleEn}
                            </h3>

                            <p className="text-xs text-[#475569] leading-relaxed mb-3 line-clamp-3">
                              {siteLang === 'it' ? project.businessGoalIt : project.businessGoalEn}
                            </p>

                            {/* Key KPIs strip */}
                            <div className="flex flex-wrap gap-1.5 mb-3 text-[10px] font-mono">
                              {project.keyKPIs.slice(0, 2).map((kpi, kIdx) => (
                                <span key={kIdx} className="bg-[#F8FAFC] border border-[#CBD5E1] text-[#111111] px-2 py-0.5 rounded-md">
                                  {kpi}
                                </span>
                              ))}
                            </div>

                            {/* Feature #14: Quaero Quick Copy Installation/Clone Snippet (v0.4 verified) */}
                            {project.id === 'quaero' && (
                              <div className="mb-3 space-y-2">
                                <div className="p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl flex items-center justify-between gap-2 text-[11px] font-mono">
                                  <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
                                    <Terminal className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                                    <span className="text-[#64748B] select-none text-[10px]">$</span>
                                    <code className="text-[#111111] text-[10px] truncate">
                                      git clone https://github.com/matteocavo/Quaero.git
                                    </code>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleCopySnippet('git clone https://github.com/matteocavo/Quaero.git', 'quaero-clone')}
                                    aria-label={siteLang === 'it' ? 'Copia comando git clone per Quaero' : 'Copy git clone command for Quaero'}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-sans font-semibold rounded bg-[#FFFFFF] hover:bg-[#EFF6FF] border border-[#CBD5E1] hover:border-[#2563EB] text-[#2563EB] transition-colors shrink-0 cursor-pointer shadow-2xs"
                                  >
                                    {copiedSnippetId === 'quaero-clone' ? (
                                      <>
                                        <Check className="w-3 h-3 text-[#10B981]" />
                                        <span className="text-[#10B981] font-bold">{siteLang === 'it' ? 'Copiato!' : 'Copied!'}</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        <span>{siteLang === 'it' ? 'Clona (v0.4)' : 'Clone (v0.4)'}</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Collapsible Methodology Drawer */}
                            <div className="mb-3">
                              <button
                                type="button"
                                onClick={() => setExpandedProjectId(isExpanded ? null : project.id)}
                                className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] inline-flex items-center gap-1 cursor-pointer"
                              >
                                <span>
                                  {isExpanded
                                    ? siteLang === 'it' ? 'Nascondi dettagli' : 'Hide details'
                                    : siteLang === 'it' ? 'Mostra metodologia & note' : 'Show methodology & notes'}
                                </span>
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>

                              {isExpanded && (
                                <div className="mt-2 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-3 text-xs text-[#111111] space-y-2 leading-relaxed animate-in fade-in duration-200">
                                  <div>
                                    <strong className="block text-[11px] text-[#1E3A8A] font-semibold mb-0.5">
                                      {siteLang === 'it' ? 'Dataset:' : 'Dataset:'}
                                    </strong>
                                    <p className="text-[11px] text-[#334155]">
                                      {siteLang === 'it' ? project.datasetIt : project.datasetEn}
                                    </p>
                                  </div>
                                  <div>
                                    <strong className="block text-[11px] text-[#1E3A8A] font-semibold mb-0.5">
                                      {siteLang === 'it' ? 'Note Metodologiche:' : 'Methodology Notes:'}
                                    </strong>
                                    <p className="whitespace-pre-line text-[11px] text-[#334155]">
                                      {siteLang === 'it' ? project.notesIt : project.notesEn}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-1 font-mono text-[10px] text-[#475569] truncate">
                              {getConciseProjectBadges(project.tools, 2).map((tool) => (
                                <span key={tool} className="bg-[#F8FAFC] border border-[#E2E8F0] px-1.5 py-0.5 rounded">
                                  {tool}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {project.id === 'quaero' ? (
                                <div className="flex items-center gap-1.5">
                                  <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors shadow-2xs whitespace-nowrap"
                                  >
                                    <Github className="w-3.5 h-3.5" />
                                    <span>{siteLang === 'it' ? 'Vedi su GitHub' : 'View on GitHub'}</span>
                                    <ExternalLink className="w-3 h-3 opacity-80" />
                                  </a>
                                </div>
                              ) : (
                                <>
                                  {project.dashboardUrl && (
                                    <a
                                      href={project.dashboardUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors shadow-2xs whitespace-nowrap"
                                    >
                                      <span>
                                        {project.dashboardType === 'pdf'
                                          ? 'PDF'
                                          : project.dashboardType === 'live_powerbi'
                                            ? (siteLang === 'it' ? 'BI Live' : 'Live BI')
                                            : (siteLang === 'it' ? 'Apri applicazione / output' : 'Open application / output')}
                                      </span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}

                                  {project.githubUrl && (
                                    <a
                                      href={project.githubUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                                        !project.dashboardUrl
                                          ? 'text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-2xs'
                                          : 'text-[#111111] bg-[#F8FAFC] border border-[#CBD5E1] hover:bg-[#EFF6FF]'
                                      }`}
                                    >
                                      <Github className="w-3.5 h-3.5" />
                                      <span>{project.dashboardUrl ? 'Repo' : (siteLang === 'it' ? 'Vedi Repo' : 'View Repo')}</span>
                                    </a>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </RevealCard>
                    );
                  })}
                </div>

                {/* ===============================================================
                    4. ALTRI PROGETTI E CONTRIBUTI GITHUB (Secondary, Compact)
                    Curated presentation of public repositories and civic open-source work
                    =============================================================== */}
                <div className={`mt-12 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl ${isMobileSim ? 'p-4 sm:p-5' : 'p-6 sm:p-7'} shadow-2xs w-full min-w-0`}>
                  <div className={`flex ${
                    isMobileSim ? 'flex-col items-start gap-4' : 'flex-col sm:flex-row sm:items-center justify-between gap-4'
                  } mb-6 pb-5 border-b border-[#E2E8F0]`}>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Github className="w-4 h-4 text-[#2563EB] shrink-0" />
                        <h3 className="font-display text-sm font-bold text-[#111111] uppercase tracking-wider">
                          {siteLang === 'it' ? 'Altri Progetti & Contributi GitHub' : 'Other Projects & GitHub Contributions'}
                        </h3>
                      </div>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {siteLang === 'it'
                          ? 'Iniziative open source, repository pubblici e contributi a progetti civici di analisi dati.'
                          : 'Open source initiatives, public repositories, and civic data analysis contributions.'}
                      </p>
                    </div>

                    {/* Filter Toggle: Curated Civic/Secondary vs All Repositories */}
                    <div className={`flex flex-wrap items-center gap-1.5 p-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl shrink-0 ${
                      isMobileSim ? 'w-full' : 'w-full sm:w-auto'
                    }`}>
                      <button
                        type="button"
                        onClick={() => setRepoFilterMode('secondary')}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex-1 sm:flex-initial text-center ${
                          repoFilterMode === 'secondary'
                            ? 'bg-[#2563EB] text-white shadow-2xs font-semibold'
                            : 'text-[#475569] hover:text-[#111111]'
                        }`}
                      >
                        {siteLang === 'it' ? `Iniziative civiche (${SECONDARY_REPOSITORIES.length})` : `Civic initiatives (${SECONDARY_REPOSITORIES.length})`}
                      </button>
                      <button
                        type="button"
                        onClick={() => setRepoFilterMode('all')}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex-1 sm:flex-initial text-center ${
                          repoFilterMode === 'all'
                            ? 'bg-[#2563EB] text-white shadow-2xs font-semibold'
                            : 'text-[#475569] hover:text-[#111111]'
                        }`}
                      >
                        {siteLang === 'it' ? `Tutti i repository (${RAW_GITHUB_REPOSITORIES.length})` : `All repositories (${RAW_GITHUB_REPOSITORIES.length})`}
                      </button>
                    </div>
                  </div>

                  {/* Curated Repository Cards Grid (1 per row on mobile, 2 on md+) */}
                  <div className={`grid ${
                    isMobileSim ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-5'
                  } w-full min-w-0`}>
                    {(repoFilterMode === 'secondary'
                      ? RAW_GITHUB_REPOSITORIES.filter(repo => !LIVE_PROJECT_GITHUB_URLS.has(repo.htmlUrl))
                      : RAW_GITHUB_REPOSITORIES
                    ).map((repo, rIdx) => {
                      const isFeatured = LIVE_PROJECT_GITHUB_URLS.has(repo.htmlUrl);

                      return (
                        <RevealCard
                          as="article"
                          key={repo.name}
                          delay={(rIdx % 2) * 100}
                          className="bg-[#FFFFFF] border border-[#CBD5E1] hover:border-[#2563EB] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all duration-200 repo-card w-full min-w-0 overflow-hidden"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-3 mb-2.5">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] shrink-0">
                                  <Github className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-display text-sm font-bold text-[#111111] truncate">
                                    {normalizeRepoTitle(repo.name)}
                                  </h4>
                                  <span className="font-mono text-[11px] text-[#2563EB] truncate block">
                                    {repo.fullName}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {isFeatured && (
                                  <span className="bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] text-[10px] font-mono px-2 py-0.5 rounded-md">
                                    {siteLang === 'it' ? 'Caso Studio' : 'Case Study'}
                                  </span>
                                )}
                                <span className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] text-[11px] font-mono font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <span className="text-[#F59E0B]">★</span> {repo.stars}
                                </span>
                              </div>
                            </div>

                            <p className="text-xs text-[#475569] leading-relaxed mb-3">
                              {siteLang === 'it' ? repo.descriptionIt : repo.descriptionEn}
                            </p>

                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {repo.topics.slice(0, 4).map((topic) => (
                                <span
                                  key={topic}
                                  className="text-[10px] font-mono bg-[#F8FAFC] text-[#334155] px-2 py-0.5 rounded border border-[#E2E8F0]"
                                >
                                  #{topic}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                            <span className="text-[11px] font-mono text-[#64748B]">
                              {siteLang === 'it' ? 'Aggiornato il ' : 'Updated '}
                              {new Date(repo.pushedAt || repo.updatedAt).toLocaleDateString(
                                siteLang === 'it' ? 'it-IT' : 'en-US'
                              )}
                            </span>
                            <a
                              href={repo.htmlUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] hover:bg-[#2563EB] hover:text-white rounded-lg transition-colors border border-[#BFDBFE] hover:border-[#2563EB] whitespace-nowrap cursor-pointer"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>{siteLang === 'it' ? 'Vedi su GitHub' : 'View on GitHub'}</span>
                              <ExternalLink className="w-3 h-3 opacity-70" />
                            </a>
                          </div>
                        </RevealCard>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                5. SERVIZI & COLLABORAZIONI TECNICHE (Restored per Phase 3 Addendum)
                Six core approved capability areas from SERVICES_CATALOG
                Accessible from Desktop & Mobile Navigation
                =================================================================== */}
            <section
              id="preview-services"
              className={`border-b border-[#E2E8F0] bg-[#FFFFFF] ${
                isMobileSim ? 'px-4 py-8' : 'px-6 lg:px-12 py-12 lg:py-16'
              }`}
            >
              <div className="max-w-[1240px] mx-auto">
                <div className="max-w-3xl mb-10">
                  <div className="text-xs font-semibold text-[#2563EB] mb-1 uppercase tracking-wider font-mono">
                    {siteLang === 'it' ? '// AMBITI DI COMPETENZA & SERVIZI' : '// CORE CAPABILITIES & SERVICES'}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                    {siteLang === 'it'
                      ? 'Soluzioni Tecniche & Modelli di Collaborazione'
                      : 'Technical Solutions & Collaboration Models'}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] mt-1.5 leading-relaxed">
                    {siteLang === 'it'
                      ? 'Competenze specializzate per supportare team, aziende e progetti data-driven dall\'ingestione e modellazione fino alla reportistica decisionale.'
                      : 'Specialized analytical capabilities to support data-driven teams and organizations from raw ingestion and data modeling to executive BI reporting.'}
                  </p>
                </div>

                {/* 6 Core Professional Service Categories Grid */}
                <div className={`grid ${
                  isMobileSim
                    ? 'grid-cols-1 gap-5'
                    : isTabletSim
                    ? 'grid-cols-1 sm:grid-cols-2 gap-5'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                } w-full min-w-0`}>
                  {SERVICES_CATALOG.map((service, sIdx) => {
                    const IconComponent = {
                      'power-bi': BarChart3,
                      'analytics-python-sql': Code2,
                      'data-engineering': Database,
                      'data-quality-cleaning': ShieldCheck,
                      'reporting-automation': RefreshCw,
                      'analytics-strategy': Compass
                    }[service.id] || BarChart3;

                    return (
                      <RevealCard
                        key={service.id}
                        as="article"
                        delay={(sIdx % 3) * 80}
                        className="bg-[#FFFFFF] border border-[#CBD5E1] hover:border-[#2563EB] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all duration-200 service-card w-full min-w-0"
                      >
                        <div>
                          {/* Header with icon */}
                          <div className="flex items-center gap-3 mb-3.5 min-w-0">
                            <div className="service-icon-container w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] shrink-0">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <h3 className="font-display text-sm font-bold text-[#111111] leading-snug break-words min-w-0">
                              {siteLang === 'it' ? service.titleIt : service.titleEn}
                            </h3>
                          </div>

                          {/* Summary text */}
                          <p className="text-xs text-[#475569] leading-relaxed mb-4 break-words min-w-0">
                            {siteLang === 'it' ? service.summaryIt : service.summaryEn}
                          </p>

                          {/* Deliverables list */}
                          <div className="space-y-1.5 mb-4 min-w-0">
                            <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
                              {siteLang === 'it' ? 'Deliverable principali:' : 'Key deliverables:'}
                            </span>
                            {(siteLang === 'it' ? service.deliverablesIt : service.deliverablesEn).map((item, dIdx) => (
                              <div key={dIdx} className="flex items-start gap-2 text-[11px] text-[#334155] leading-snug min-w-0 break-words">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                                <span className="min-w-0 break-words">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech pills & direct inquiry action */}
                        <div className="pt-3 border-t border-[#E2E8F0] min-w-0">
                          <div className="flex flex-wrap gap-1.5 mb-3 min-w-0">
                            {service.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] font-mono bg-[#F8FAFC] text-[#334155] px-2 py-0.5 rounded border border-[#E2E8F0] whitespace-nowrap"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <a
                            href="#preview-contact"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:underline"
                          >
                            <span>{siteLang === 'it' ? 'Richiedi disponibilità' : 'Inquire for availability'}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </RevealCard>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ===================================================================
                5B. METODOLOGIA DI LAVORO (Feature #9: Compact Four-Step Workflow)
                Lightweight editorial timeline with horizontal progression on md+
                and clean vertical arrangement on mobile
                =================================================================== */}
            <section
              id="preview-process"
              className={`border-b border-[#E2E8F0] bg-[#F8FAFC] ${
                isMobileSim ? 'px-4 py-8' : 'px-6 lg:px-12 py-10 lg:py-14'
              }`}
            >
              <div className="max-w-[1240px] mx-auto">
                <div className="max-w-3xl mb-8">
                  <div className="text-xs font-semibold text-[#2563EB] mb-1 uppercase tracking-wider font-mono">
                    {siteLang === 'it' ? '// METODOLOGIA ANALITICA' : '// ANALYTICAL METHODOLOGY'}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                    {siteLang === 'it' ? 'Il processo di lavoro in 4 fasi' : 'The 4-stage analytical workflow'}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] mt-1">
                    {siteLang === 'it'
                      ? 'Dalla definizione della domanda di business al rilascio di asset analitici manutenibili e interpretabili.'
                      : 'From clarifying the business question to delivering maintainable, decision-ready analytical assets.'}
                  </p>
                </div>

                {/* Editorial Timeline Progression */}
                <div className="relative">
                  {/* Subtle Connecting Line on Desktop/Tablet */}
                  {!isMobileSim && (
                    <div
                      aria-hidden="true"
                      className="hidden md:block absolute top-7 left-8 right-8 h-[2px] bg-[#E2E8F0] z-0"
                    />
                  )}

                  <div className={`grid ${
                    isMobileSim ? 'grid-cols-1 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'
                  } relative z-10`}>
                    {WORK_PROCESS_STEPS.map((stepItem, idx) => (
                      <RevealCard
                        key={stepItem.step}
                        as="div"
                        delay={idx * 75}
                        className="bg-[#FFFFFF] border border-[#CBD5E1] hover:border-[#2563EB] rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          {/* Step Badge & Number */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] font-mono font-bold text-xs flex items-center justify-center">
                              {stepItem.step}
                            </span>
                            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                              {siteLang === 'it' ? `Fase ${idx + 1}` : `Stage ${idx + 1}`}
                            </span>
                          </div>

                          <h3 className="font-display text-sm font-bold text-[#111111] mb-1">
                            {siteLang === 'it' ? stepItem.titleIt : stepItem.titleEn}
                          </h3>

                          <p className="text-[11px] font-semibold text-[#2563EB] mb-2 leading-snug">
                            {siteLang === 'it' ? stepItem.summaryIt : stepItem.summaryEn}
                          </p>

                          <p className="text-xs text-[#475569] leading-relaxed mb-4">
                            {siteLang === 'it' ? stepItem.detailIt : stepItem.detailEn}
                          </p>
                        </div>

                        {/* Concrete Deliverables Pill Strip */}
                        <div className="pt-3 border-t border-[#F1F5F9] space-y-1">
                          <span className="text-[10px] font-mono font-semibold text-[#64748B] uppercase tracking-wider block">
                            {siteLang === 'it' ? 'Deliverable tipici:' : 'Key deliverables:'}
                          </span>
                          {(siteLang === 'it' ? stepItem.deliverablesIt : stepItem.deliverablesEn).map((deliv, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-1.5 text-[11px] text-[#334155]">
                              <CheckCircle2 className="w-3 h-3 text-[#10B981] shrink-0" />
                              <span className="truncate">{deliv}</span>
                            </div>
                          ))}
                        </div>
                      </RevealCard>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                6. TOOLKIT & CERTIFICAZIONI (Skills & Credentials)
                Section 1: Verbatim from data/profile.js
                =================================================================== */}
            <section
              id="preview-skills"
              className={`scroll-mt-24 border-b border-[#E2E8F0] bg-[#F8FAFC] ${
                isMobileSim ? 'px-4 py-8' : 'px-6 lg:px-12 py-12 lg:py-16'
              }`}
            >
              <div className="max-w-[1240px] mx-auto">
                <div className="max-w-3xl mb-8">
                  <div className="text-xs font-semibold text-[#2563EB] mb-1 uppercase tracking-wider">
                    {siteLang === 'it' ? 'Competenze & Verifiche' : 'Capabilities & Credentials'}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                    {LOCKED_PROFILE_TEXT[siteLang].skillsTitle} &amp; {LOCKED_PROFILE_TEXT[siteLang].certificationsTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] mt-1">
                    {siteLang === 'it'
                      ? 'Strutturate sui 4 pilastri analitici con verifiche pubbliche dirette.'
                      : 'Organized across 4 analytical pillars with verifiable external credentials.'}
                  </p>
                </div>

                <div className={isMobileSim ? 'flex flex-col gap-6' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'}>
                  {/* Left Column: 4 Domain Skill Groups from data/profile.js */}
                  <div className={`${isMobileSim ? 'w-full' : 'lg:col-span-7'} space-y-4`}>
                    <div
                      className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs panel-card"
                      style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
                    >
                      <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                        01. Business Intelligence
                      </h3>
                      <p className="text-sm font-semibold text-[#2563EB] mb-1">
                        Power BI · DAX · Power Query · Data Modeling · KPI Design · Data Visualization · Data Storytelling
                      </p>
                      <p className="text-xs text-[#64748B]">
                        {siteLang === 'it'
                          ? 'Architettura Star Schema · Misure complesse · Ottimizzazione performance DAX · Report orientati alle decisioni'
                          : 'Star Schema architecture · Complex measures · DAX performance optimization · Decision-oriented reporting'}
                      </p>
                    </div>

                    <div
                      className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs panel-card"
                      style={{ '--reveal-delay': '45ms' } as React.CSSProperties}
                    >
                      <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                        {siteLang === 'it' ? '02. Data Engineering & Automazione' : '02. Data Engineering & Automation'}
                      </h3>
                      <p className="text-sm font-semibold text-[#2563EB] mb-1">
                        Python · SQL · Databricks · Databricks SQL · Delta Lake · Apache Spark · PySpark · Lakehouse Architecture
                      </p>
                      <p className="text-xs text-[#64748B]">
                        ETL · APIs · Raw → Clean → Mart · Data Quality · DuckDB · YAML · Git / GitHub · Workflow Automation · Reproducible Workflows
                      </p>
                    </div>

                    <div
                      className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs panel-card"
                      style={{ '--reveal-delay': '90ms' } as React.CSSProperties}
                    >
                      <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                        {siteLang === 'it' ? '03. Analisi Statistica' : '03. Statistical Analysis'}
                      </h3>
                      <p className="text-sm font-semibold text-[#2563EB] mb-1">
                        EDA · Descriptive Statistics · Statistical Analysis · Statistical Inference · Correlation Analysis · Hypothesis Testing
                      </p>
                      <p className="text-xs text-[#64748B]">
                        {siteLang === 'it'
                          ? 'Analisi esplorativa dei dati · Outlier detection · Test parametrici e non parametrici'
                          : 'Exploratory data analysis · Outlier detection · Parametric and non-parametric testing'}
                      </p>
                    </div>

                    <div
                      className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs panel-card"
                      style={{ '--reveal-delay': '135ms' } as React.CSSProperties}
                    >
                      <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                        04. Advanced Analytics &amp; Applied Machine Learning
                      </h3>
                      <p className="text-sm font-semibold text-[#2563EB] mb-1">
                        scikit-learn · Regression · Classification · Feature Engineering · Feature Selection · Cross-Validation · Model Evaluation · Decision Trees · Random Forest · Gradient Boosting / XGBoost · K-means
                      </p>
                      <p className="text-xs text-[#64748B]">
                        {siteLang === 'it'
                          ? 'Metriche ROC-AUC, PR-AUC, F1-Score · Modelli trasparenti con baseline di controllo'
                          : 'ROC-AUC, PR-AUC, F1-Score metrics · Transparent models with control baselines'}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Verified Certifications from data/profile.js (Feature #13) */}
                  <div
                    className={`${isMobileSim ? 'w-full' : 'lg:col-span-5'} bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-2xs panel-card`}
                    style={{ '--reveal-delay': '90ms' } as React.CSSProperties}
                  >
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#2563EB]" />
                        <h3 className="font-display text-sm font-bold text-[#111111]">
                          {LOCKED_PROFILE_TEXT[siteLang].certificationsTitle}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full border border-[#BBF7D0] font-semibold">
                        3 {siteLang === 'it' ? 'Verificate' : 'Verified'}
                      </span>
                    </div>

                    {/* 1. Verified Credentials List with Official Issuer Badges */}
                    <div className="space-y-3 text-xs mb-6">
                      {/* Credential 1: Google Advanced Data Analytics */}
                      <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#BFDBFE] rounded-xl transition-colors">
                        <div className="flex items-start gap-2.5">
                          {/* Official Google 'G' Icon */}
                          <div className="w-6 h-6 rounded-md bg-[#FFFFFF] border border-[#CBD5E1] flex items-center justify-center shrink-0 p-1 mt-0.5">
                            <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1.5">
                              <h4 className="font-semibold text-[#111111] text-xs leading-snug">
                                Google Advanced Data Analytics Professional Certificate
                              </h4>
                              <span className="text-[10px] font-mono text-[#16A34A] bg-[#DCFCE7] px-1.5 py-0.5 rounded border border-[#BBF7D0] shrink-0">
                                2026
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1.5">
                              <a
                                href="https://www.coursera.org/account/accomplishments/specialization/890TXH56F3JV"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#2563EB] hover:text-[#1D4ED8] hover:underline inline-flex items-center gap-1 text-[11px] font-semibold"
                              >
                                <span>{siteLang === 'it' ? 'Verifica Credenziale Coursera' : 'Verify Coursera Credential'}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              <span className="text-[10px] text-[#64748B] font-mono">ID: 890TXH56F3JV</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Credential 2: Google AI Professional Certificate */}
                      <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#BFDBFE] rounded-xl transition-colors">
                        <div className="flex items-start gap-2.5">
                          <div className="w-6 h-6 rounded-md bg-[#FFFFFF] border border-[#CBD5E1] flex items-center justify-center shrink-0 p-1 mt-0.5">
                            <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1.5">
                              <h4 className="font-semibold text-[#111111] text-xs leading-snug">
                                Google AI Professional Certificate
                              </h4>
                              <span className="text-[10px] font-mono text-[#16A34A] bg-[#DCFCE7] px-1.5 py-0.5 rounded border border-[#BBF7D0] shrink-0">
                                2026
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1.5">
                              <a
                                href="https://www.coursera.org/account/accomplishments/specialization/51MFH4Y84CU6"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#2563EB] hover:text-[#1D4ED8] hover:underline inline-flex items-center gap-1 text-[11px] font-semibold"
                              >
                                <span>{siteLang === 'it' ? 'Verifica Credenziale Coursera' : 'Verify Coursera Credential'}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              <span className="text-[10px] text-[#64748B] font-mono">ID: 51MFH4Y84CU6</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Credential 3: Databricks Fundamentals */}
                      <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#BFDBFE] rounded-xl transition-colors">
                        <div className="flex items-start gap-2.5">
                          {/* Official Databricks Logo Icon */}
                          <div className="w-6 h-6 rounded-md bg-[#FFFFFF] border border-[#CBD5E1] flex items-center justify-center shrink-0 p-1 mt-0.5">
                            <svg viewBox="0 0 24 24" className="w-full h-full text-[#FF3621]" fill="currentColor" aria-hidden="true">
                              <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.3l7.5 4.1-3.2 1.8-4.3-2.4-4.3 2.4-3.2-1.8L12 4.3zm0 4.6l3.5 1.9-3.5 1.9-3.5-1.9 3.5-1.9zm-8 2.2l2.5 1.4v4.5L4 15.6v-4.5zm9 8.6l-7.5-4.1 2.5-1.4 5 2.7 5-2.7 2.5 1.4-7.5 4.1zm8-4.1l-2.5 1.4v-4.5l2.5-1.4v4.5z"/>
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1.5">
                              <h4 className="font-semibold text-[#111111] text-xs leading-snug">
                                Databricks Fundamentals Accreditation
                              </h4>
                              <span className="text-[10px] font-mono text-[#16A34A] bg-[#DCFCE7] px-1.5 py-0.5 rounded border border-[#BBF7D0] shrink-0">
                                2026
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1.5">
                              <a
                                href="https://credentials.databricks.com/efe62f89-12ff-4802-bd0b-2eb18cb94734#acc.W6Cd2iUt"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#2563EB] hover:text-[#1D4ED8] hover:underline inline-flex items-center gap-1 text-[11px] font-semibold"
                              >
                                <span>{siteLang === 'it' ? 'Verifica Credenziale Databricks' : 'Verify Databricks Credential'}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Distinct In-Progress Qualifications (Never presented as completed) */}
                    <div className="pt-3 border-t border-[#E2E8F0]">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider font-mono">
                          {siteLang === 'it' ? 'In corso di preparazione (Attivi):' : 'Currently under preparation (Active):'}
                        </h4>
                        <span className="text-[9px] font-mono text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#FDE68A]">
                          {siteLang === 'it' ? 'Esami in preparazione' : 'Exams in progress'}
                        </span>
                      </div>
                      <div className="space-y-2 text-xs text-[#475569]">
                        <div className="p-2.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between gap-2">
                          <span className="font-medium text-[#78350F]">
                            Microsoft Certified: Power BI Data Analyst Associate (PL-300)
                          </span>
                          <span className="text-[10px] font-mono text-[#D97706] shrink-0">
                            {siteLang === 'it' ? 'In preparazione' : 'Under preparation'}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between gap-2">
                          <span className="font-medium text-[#78350F]">
                            Databricks Certified Data Engineer Associate
                          </span>
                          <span className="text-[10px] font-mono text-[#D97706] shrink-0">
                            {siteLang === 'it' ? 'In preparazione' : 'Under preparation'}
                          </span>
                        </div>
                      </div>

                      {/* Explicit Transparency Note */}
                      <p className="text-[10px] text-[#64748B] mt-2.5 leading-relaxed italic">
                        {siteLang === 'it'
                          ? 'Tutte le certificazioni contrassegnate come verificate includono un link pubblico diretto al registro dell’emittente. I titoli "in preparazione" indicano esami attivi in fase di studio e non sono considerati conseguiti.'
                          : 'All credentials marked as verified include direct public links to the issuer’s registry. Tracks marked "under preparation" represent active study goals and are never claimed as earned.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                7. PROFILO & VALORE DEL PROFILO (About & Value Proposition)
                Section 1: Verbatim from data/profile.js (aboutTitle, aboutP1-P3, valueP1-P3)
                =================================================================== */}
            <section
              id="preview-about"
              className={`border-b border-[#E2E8F0] bg-[#FFFFFF] ${
                isMobileSim ? 'px-4 py-8' : 'px-6 lg:px-12 py-12 lg:py-16'
              }`}
            >
              <div className={`max-w-[1240px] mx-auto ${isMobileSim ? 'flex flex-col gap-8' : 'grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'}`}>
                {/* Left Column: Editorial Profile Summary */}
                <div className={isMobileSim ? 'w-full' : 'lg:col-span-5'}>
                  <div className="text-xs font-semibold text-[#2563EB] mb-1 uppercase tracking-wider">
                    {siteLang === 'it' ? 'Profilo' : 'About'}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mb-4">
                    {LOCKED_PROFILE_TEXT[siteLang].aboutTitle}
                  </h2>

                  <RevealCard
                    delay={40}
                    className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 text-xs space-y-2.5 mb-6 panel-card"
                  >
                    <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                      <span className="text-[#64748B]">{siteLang === 'it' ? 'Ruolo:' : 'Role:'}</span>
                      <strong className="text-[#111111]">Data &amp; BI Analyst</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                      <span className="text-[#64748B]">{siteLang === 'it' ? 'Sede:' : 'Location:'}</span>
                      <strong className="text-[#111111]">
                        {siteLang === 'it' ? 'Roma · Italia (Disponibile Remoto / Ibrido)' : 'Rome, Italy (Available for Remote / Hybrid Work)'}
                      </strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                      <span className="text-[#64748B]">{siteLang === 'it' ? 'Lingue:' : 'Languages:'}</span>
                      <strong className="text-[#111111]">
                        {siteLang === 'it' ? 'Italiano (Madrelingua) · Inglese (Avanzato, C1)' : 'Italian (Native) · English (Advanced, C1)'}
                      </strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#64748B]">Focus:</span>
                      <strong className="text-[#111111]">Power BI · Databricks · SQL · Python</strong>
                    </div>
                  </RevealCard>

                  {/* Value Proposition Editorial Card (VERBATIM valueTitle & valueP1-P3 on light surface) */}
                  <RevealCard
                    delay={100}
                    className="bg-[#FFFFFF] border-l-4 border-l-[#2563EB] border border-[#CBD5E1] p-5 rounded-2xl shadow-xs panel-card"
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                      <h3 className="font-display text-sm font-bold text-[#111111]">
                        {LOCKED_PROFILE_TEXT[siteLang].valueTitle}
                      </h3>
                    </div>
                    <p className="text-xs text-[#334155] leading-relaxed mb-2.5">
                      {LOCKED_PROFILE_TEXT[siteLang].valueP1}
                    </p>
                    <p className="text-xs text-[#334155] leading-relaxed mb-2.5">
                      {LOCKED_PROFILE_TEXT[siteLang].valueP2}
                    </p>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {LOCKED_PROFILE_TEXT[siteLang].valueP3}
                    </p>
                  </RevealCard>
                </div>

                {/* Right Column: Verbatim aboutP1, aboutP2, aboutP3 from data/profile.js */}
                <div className={`${isMobileSim ? 'w-full' : 'lg:col-span-7'} space-y-4`}>
                  <RevealCard
                    delay={40}
                    className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-2xs panel-card"
                  >
                    <span className="text-[11px] font-mono text-[#2563EB] uppercase tracking-wider block mb-1">
                      {siteLang === 'it' ? 'Fase 1 · Design & Contenuti' : 'Stage 1 · Design & Content'}
                    </span>
                    <h3 className="font-display text-base font-bold text-[#111111] mb-2">
                      Web &amp; Multimedia Designer
                    </h3>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {LOCKED_PROFILE_TEXT[siteLang].aboutP1}
                    </p>
                  </RevealCard>

                  <RevealCard
                    delay={100}
                    className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-2xs panel-card"
                  >
                    <span className="text-[11px] font-mono text-[#2563EB] uppercase tracking-wider block mb-1">
                      {siteLang === 'it' ? 'Fase 2 · Leadership Internazionale' : 'Stage 2 · International Leadership'}
                    </span>
                    <h3 className="font-display text-base font-bold text-[#111111] mb-2">
                      CEO &amp; Creative Director
                    </h3>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {LOCKED_PROFILE_TEXT[siteLang].aboutP2}
                    </p>
                  </RevealCard>

                  <RevealCard
                    delay={160}
                    className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-2xs panel-card"
                  >
                    <span className="text-[11px] font-mono text-[#2563EB] uppercase tracking-wider block mb-1">
                      {siteLang === 'it' ? 'Fase 3 · Metadata Enterprise & Data-Driven Operations' : 'Stage 3 · Enterprise Metadata & Data-Driven Operations'}
                    </span>
                    <h3 className="font-display text-base font-bold text-[#111111] mb-2">
                      Gracenote (Nielsen) · Content Operations &amp; Metadata Quality
                    </h3>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {LOCKED_PROFILE_TEXT[siteLang].aboutP3}
                    </p>
                  </RevealCard>
                </div>
              </div>
            </section>

            {/* ===================================================================
                8. CONTATTI & COLLABORAZIONE
                Section 1 & 6a: ZERO Email Address Exposed Anywhere!
                Encrypted Web3Forms + LinkedIn + GitHub + Direct PDF CVs
                =================================================================== */}
            <section
              id="preview-contact"
              className={`bg-[#F8FAFC] border-t border-[#E2E8F0] relative overflow-hidden ${
                isMobileSim ? 'px-4 py-8' : 'px-6 lg:px-12 py-12 lg:py-16'
              }`}
            >
              <div className="max-w-[1240px] mx-auto relative z-10">
                <div className="max-w-3xl mb-8">
                  <div className="text-xs font-semibold text-[#2563EB] mb-1 uppercase tracking-wider font-mono">
                    {siteLang === 'it' ? '// CONTATTI' : '// CONTACT'}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                    {LOCKED_PROFILE_TEXT[siteLang].contactTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] mt-1">
                    {LOCKED_PROFILE_TEXT[siteLang].contactText}
                  </p>
                </div>

                <div className={isMobileSim ? 'flex flex-col gap-6' : 'grid grid-cols-1 lg:grid-cols-12 gap-8'}>
                  {/* Left Column: Direct verified channels (NO raw email address) */}
                  <div className={`${isMobileSim ? 'w-full' : 'lg:col-span-5'} space-y-4`}>
                    <RevealCard
                      delay={40}
                      className="bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl p-5 shadow-2xs link-card"
                    >
                      <h3 className="text-xs font-mono font-bold text-[#111111] uppercase tracking-wider mb-3">
                        {siteLang === 'it' ? 'Canali Diretti' : 'Direct Channels'}
                      </h3>
                      
                      <div className="space-y-3 text-xs">
                        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 text-xs text-[#334155] leading-relaxed">
                          <span className="font-semibold text-[#111111] block mb-1">
                            {siteLang === 'it' ? 'Messaggio Diretto & Riservato' : 'Direct & Encrypted Routing'}
                          </span>
                          {siteLang === 'it'
                            ? 'Usa il modulo a fianco per inviare una richiesta: il messaggio giunge direttamente a Matteo senza esporre indirizzi email a web scraping o spam.'
                            : 'Use the adjacent form to submit an inquiry: your message routes directly without exposing email addresses to scraping or spam.'}
                        </div>

                        <a
                          href="https://www.linkedin.com/in/matteo-cavo/"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between text-[#475569] hover:text-[#2563EB] transition-colors py-2 border-b border-[#F1F5F9]"
                        >
                          <span className="flex items-center gap-2">
                            <Linkedin className="w-4 h-4 text-[#2563EB]" />
                            <span>LinkedIn:</span>
                          </span>
                          <strong className="text-[#111111] flex items-center gap-1 font-mono">
                            matteo-cavo <ExternalLink className="w-3 h-3 text-[#2563EB]" />
                          </strong>
                        </a>

                        <a
                          href="https://github.com/matteocavo"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between text-[#475569] hover:text-[#2563EB] transition-colors py-2"
                        >
                          <span className="flex items-center gap-2">
                            <Github className="w-4 h-4 text-[#2563EB]" />
                            <span>GitHub:</span>
                          </span>
                          <strong className="text-[#111111] flex items-center gap-1 font-mono">
                            matteocavo <ExternalLink className="w-3 h-3 text-[#2563EB]" />
                          </strong>
                        </a>
                      </div>
                    </RevealCard>

                    {/* Bilingual CV Downloads */}
                    <RevealCard
                      delay={80}
                      className="bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl p-5 shadow-2xs link-card"
                    >
                      <h3 className="text-xs font-mono font-bold text-[#111111] uppercase tracking-wider mb-2">
                        Curriculum Vitae (PDF)
                      </h3>
                      <p className="text-[11px] text-[#64748B] mb-3">
                        {siteLang === 'it'
                          ? 'Versioni aggiornate con storico professionale e competenze analitiche.'
                          : 'Updated versions detailing professional history and analytical skills.'}
                      </p>
                      <div className="space-y-2">
                        <a
                          href={siteLang === 'it' ? 'assets/cv/Matteo_Cavo_CV_IT.pdf' : 'assets/cv/Matteo_Cavo_CV_EN.pdf'}
                          onClick={(e) => {
                            e.preventDefault();
                            openCvModal(siteLang);
                          }}
                          className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{siteLang === 'it' ? 'Anteprima CV' : 'Preview CV'}</span>
                        </a>
                        <div className="grid grid-cols-2 gap-2.5 text-xs">
                          <a
                            href="assets/cv/Matteo_Cavo_CV_IT.pdf"
                            download="Matteo_Cavo_CV_IT.pdf"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-[#DBEAFE] rounded-xl font-semibold text-[#2563EB] transition-colors shadow-2xs"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Scarica IT</span>
                          </a>
                          <a
                            href="assets/cv/Matteo_Cavo_CV_EN.pdf"
                            download="Matteo_Cavo_CV_EN.pdf"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-[#DBEAFE] rounded-xl font-semibold text-[#2563EB] transition-colors shadow-2xs"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Download EN</span>
                          </a>
                        </div>
                      </div>
                    </RevealCard>
                  </div>

                  {/* Right Column: Verified Direct Contact Form */}
                  <RevealCard
                    delay={60}
                    className={`${isMobileSim ? 'w-full' : 'lg:col-span-7'} bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl p-5 sm:p-6 shadow-sm link-card`}
                  >
                    <h3 className="text-xs font-mono font-bold text-[#111111] uppercase tracking-wider mb-4">
                      {siteLang === 'it' ? 'Invia un Messaggio Diretto' : 'Send a Direct Message'}
                    </h3>

                    {formSubmitted ? (
                      <div className="p-6 bg-[#F8FAFC] border border-[#10B981] rounded-2xl text-center space-y-2">
                        <Check className="w-8 h-8 text-[#10B981] mx-auto" />
                        <h4 className="font-display font-bold text-sm text-[#111111]">
                          {siteLang === 'it' ? 'Messaggio inviato con successo' : 'Message sent successfully'}
                        </h4>
                        <p className="text-xs text-[#64748B]">
                          {siteLang === 'it'
                            ? 'Grazie per avermi contattato. Ti risponderò al più presto.'
                            : 'Thank you for reaching out. I will respond to your message shortly.'}
                        </p>
                        <button
                          type="button"
                          onClick={() => setFormSubmitted(false)}
                          className="mt-3 text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
                        >
                          {siteLang === 'it' ? 'Invia un altro messaggio' : 'Send another message'}
                        </button>
                      </div>
                    ) : (
                      <form
                        action="https://api.web3forms.com/submit"
                        method="POST"
                        className="space-y-4"
                        onSubmit={handleContactSubmit}
                      >
                        {/* Web3Forms Access Key from original production portfolio */}
                        <input type="hidden" name="access_key" value="d78f02b7-99a8-4df3-a30c-d566ab3f7617" />
                        <input
                          type="hidden"
                          name="subject"
                          value={siteLang === 'it' ? 'Nuovo messaggio dal portfolio' : 'New message from portfolio'}
                        />
                        <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                        {formError && (
                          <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl text-xs text-[#DC2626] flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{formError}</span>
                          </div>
                        )}

                        <div className={isMobileSim ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
                          <div>
                            <label className="block text-xs font-medium text-[#334155] mb-1">
                              {siteLang === 'it' ? 'Nome' : 'Name'} *
                            </label>
                            <input
                              type="text"
                              name="name"
                              required
                              placeholder={siteLang === 'it' ? 'Il tuo nome' : 'Your Name'}
                              className="w-full text-xs px-3 py-2 rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] text-[#111111] focus:outline-2 focus:outline-[#2563EB]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[#334155] mb-1">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              placeholder="name@company.com"
                              className="w-full text-xs px-3 py-2 rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] text-[#111111] focus:outline-2 focus:outline-[#2563EB]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#334155] mb-1">
                            {siteLang === 'it' ? 'Tipo di Opportunità' : 'Inquiry Type'}
                          </label>
                          <select
                            name="inquiry_type"
                            className="w-full text-xs px-3 py-2 rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] text-[#111111] focus:outline-2 focus:outline-[#2563EB]"
                          >
                            <option>{siteLang === 'it' ? 'Ruolo In-house (Data & BI Analyst)' : 'In-house Role (Data & BI Analyst)'}</option>
                            <option>{siteLang === 'it' ? 'Sviluppo Dashboard Power BI & DAX' : 'Power BI & DAX Dashboard Project'}</option>
                            <option>{siteLang === 'it' ? 'Pipeline Databricks Lakehouse & ETL' : 'Databricks Lakehouse & ETL Pipeline'}</option>
                            <option>{siteLang === 'it' ? 'Data Quality & Bonifica Cataloghi' : 'Data Quality & Catalog Cleansing'}</option>
                            <option>{siteLang === 'it' ? 'Altro / Richiesta Informazioni' : 'Other / Technical Discussion'}</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#334155] mb-1">
                            {siteLang === 'it' ? 'Messaggio' : 'Message'} *
                          </label>
                          <textarea
                            rows={4}
                            name="message"
                            required
                            placeholder={siteLang === 'it' ? 'Descrivi brevemente il contesto o le specifiche...' : 'Briefly describe your requirements or inquiry...'}
                            className="w-full text-xs px-3 py-2 rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] text-[#111111] focus:outline-2 focus:outline-[#2563EB]"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={formSubmitting}
                          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#93C5FD] disabled:cursor-not-allowed rounded-xl transition-all cursor-pointer shadow-xs hover:shadow-md flex items-center gap-2"
                        >
                          {formSubmitting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                          <span>
                            {formSubmitting
                              ? (siteLang === 'it' ? 'Invio in corso...' : 'Sending...')
                              : (siteLang === 'it' ? 'Invia Messaggio' : 'Send Message')}
                          </span>
                        </button>
                      </form>
                    )}
                  </RevealCard>
                </div>
              </div>
            </section>

            {/* ===================================================================
                9. FOOTER
                =================================================================== */}
            <footer className={`bg-[#111111] border-t border-[#222222] text-xs text-[#94A3B8] ${isMobileSim ? 'px-4 py-5' : 'px-6 lg:px-12 py-6'}`}>
              <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-center sm:text-left">
                  © Matteo Cavo — Portfolio Data &amp; BI Analyst
                </p>
                <div className="flex items-center gap-4">
                  <a href="#preview-hero" className="hover:text-white transition-colors">Top ↑</a>
                  <a href="https://github.com/matteocavo/matteocavo.github.io" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    GitHub Repo
                  </a>
                </div>
              </div>
            </footer>

            {/* ===================================================================
                10. FLOATING BILINGUAL CHATBOT
                Section 6a: Free-text input AND specific suggested starting questions
                Answers questions about ALL case studies + zero raw email
                =================================================================== */}
            <div className="fixed bottom-6 right-6 z-40">
              <button
                type="button"
                onClick={() => setIsChatOpen(!isChatOpen)}
                aria-expanded={isChatOpen}
                aria-label={siteLang === 'it' ? 'Apri l’assistente del portfolio' : 'Open portfolio assistant chatbot'}
                className="w-12 h-12 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2563EB] focus-visible:outline-offset-2"
              >
                {isChatOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
              </button>

              {isChatOpen && (
                <div className="chatbot-window absolute bottom-16 right-0 w-[calc(100vw-32px)] sm:w-[390px] bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[580px] z-50">
                  {/* Chat Header */}
                  <div className="bg-[#111111] text-white px-4 py-3 flex items-center justify-between border-b border-[#222222]">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-[#7AA7FF]" />
                      <div>
                        <p className="text-xs font-bold leading-none">Matteo Cavo Assistant</p>
                        <p className="text-[10px] text-[#94A3B8] mt-0.5">
                          {siteLang === 'it' ? 'Guida interattiva (Domanda libera o casi studio)' : 'Interactive guide (Free-text or case studies)'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleResetChat}
                        className="text-[10px] text-[#94A3B8] hover:text-white underline cursor-pointer"
                      >
                        {siteLang === 'it' ? 'Reimposta' : 'Reset'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsChatOpen(false)}
                        className="text-[#94A3B8] hover:text-white cursor-pointer p-1"
                        aria-label={siteLang === 'it' ? 'Chiudi assistente' : 'Close assistant'}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Chat Messages Body (Independently scrollable) */}
                  <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 bg-[#F8FAFC] text-xs max-h-[220px]">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-[#2563EB] text-white rounded-br-xs'
                              : 'bg-[#FFFFFF] text-[#111111] border border-[#E2E8F0] shadow-2xs rounded-bl-xs'
                          }`}
                        >
                          {msg.text}

                          {msg.links && msg.links.length > 0 && (
                            <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] space-y-1">
                              {msg.links.map((link, lIdx) => {
                                const isCvLink = link.href.includes('assets/cv/');
                                return (
                                  <a
                                    key={lIdx}
                                    href={link.href}
                                    target={!isCvLink && link.isExternal ? '_blank' : '_self'}
                                    rel={!isCvLink && link.isExternal ? 'noreferrer' : undefined}
                                    onClick={
                                      isCvLink
                                        ? (e) => {
                                            e.preventDefault();
                                            openCvModal(siteLang);
                                          }
                                        : undefined
                                    }
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] hover:underline block"
                                  >
                                    <span>{link.label}</span>
                                    {link.isExternal ? <ExternalLink className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                  </a>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Project & Service Suggested Questions (Phase 4.2 Requirement 3) */}
                  <div className="p-3 bg-[#FFFFFF] border-t border-[#E2E8F0]">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider font-mono">
                        {siteLang === 'it' ? 'Domande su progetti & servizi:' : 'Questions on projects & services:'}
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowAllQuestions(!showAllQuestions)}
                        className="text-[10px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] underline cursor-pointer"
                      >
                        {showAllQuestions
                          ? (siteLang === 'it' ? 'Mostra meno ↑' : 'Show fewer ↑')
                          : (siteLang === 'it'
                              ? `Mostra altre domande (${suggestedQuestionsList.length - 3}) ↓`
                              : `Show more questions (${suggestedQuestionsList.length - 3}) ↓`)}
                      </button>
                    </div>

                    <div className="flex flex-col gap-1.5 max-h-[170px] overflow-y-auto pr-0.5">
                      {(showAllQuestions ? suggestedQuestionsList : suggestedQuestionsList.slice(0, 3)).map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleChatTrigger(item)}
                          className="text-left text-xs font-medium px-3 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] text-[#1E293B] hover:text-[#1D4ED8] border border-[#E2E8F0] transition-colors cursor-pointer leading-snug w-full whitespace-normal break-words shadow-2xs hover:shadow-xs"
                        >
                          <span className="text-[#2563EB] font-bold mr-1">→</span>
                          {siteLang === 'it' ? item.triggerIt : item.triggerEn}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Free-Text Input Form */}
                  <form
                    onSubmit={handleChatFreeTextSubmit}
                    className="p-3 bg-[#FFFFFF] border-t border-[#E2E8F0] flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={chatInputText}
                      onChange={(e) => setChatInputText(e.target.value)}
                      placeholder={
                        siteLang === 'it'
                          ? 'Fai una domanda su Databricks, ISPRA, Quaero...'
                          : 'Ask about Databricks, ISPRA, Quaero...'
                      }
                      className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] text-[#111111] placeholder:text-[#94A3B8] focus:outline-2 focus:outline-[#2563EB]"
                    />
                    <button
                      type="submit"
                      disabled={!chatInputText.trim()}
                      className="w-9 h-9 flex items-center justify-center bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#CBD5E1] disabled:cursor-not-allowed text-white rounded-xl transition-colors cursor-pointer shrink-0 shadow-xs"
                      aria-label={siteLang === 'it' ? 'Invia domanda' : 'Send question'}
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Lightbox Modal for Uncropped High-Resolution Dashboard Inspection (Feature #4) */}
          {lightboxProject && (
            <div
              className="fixed inset-0 z-50 bg-[#111111]/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
              onClick={() => {
                setLightboxProject(null);
                setLightboxZoomed(false);
              }}
              role="dialog"
              aria-modal="true"
              aria-label={siteLang === 'it' ? `Ispezione dashboard: ${lightboxProject.titleIt}` : `Dashboard inspect: ${lightboxProject.titleEn}`}
            >
              <div
                className="bg-[#1C1C1C] border border-[#2E2E2E] rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Lightbox Header with Title, Category, Zoom & Close */}
                <div className="px-5 py-3 border-b border-[#2E2E2E] flex items-center justify-between text-white shrink-0">
                  <div className="min-w-0 pr-3">
                    <h3 className="font-display font-bold text-sm text-white truncate">
                      {siteLang === 'it' ? lightboxProject.titleIt : lightboxProject.titleEn}
                    </h3>
                    <p className="text-[11px] text-[#7AA7FF] font-mono truncate">
                      {(siteLang === 'it'
                        ? lightboxProject.highlightCategoryIt ?? lightboxProject.highlightCategory
                        : lightboxProject.highlightCategoryEn ?? lightboxProject.highlightCategory)}{' '}
                      · {lightboxProject.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setLightboxZoomed((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#CBD5E1] hover:text-white bg-[#2E2E2E] hover:bg-[#3E3E3E] transition-colors cursor-pointer"
                      title={lightboxZoomed ? (siteLang === 'it' ? 'Adatta a schermo' : 'Fit to window') : (siteLang === 'it' ? 'Ingrandisci al 100%' : 'Zoom 100%')}
                    >
                      {lightboxZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">
                        {lightboxZoomed ? (siteLang === 'it' ? 'Adatta' : 'Fit') : (siteLang === 'it' ? 'Ingrandisci' : 'Zoom')}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLightboxProject(null);
                        setLightboxZoomed(false);
                      }}
                      className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#2E2E2E] transition-colors cursor-pointer"
                      aria-label={siteLang === 'it' ? 'Chiudi' : 'Close'}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Lightbox Image Container: Preserves 100% uncropped aspect ratio and labels */}
                <div className="flex-1 bg-[#0A0A0A] p-3 sm:p-5 flex items-center justify-center overflow-auto no-scrollbar relative min-h-[300px]">
                  <img
                    src={lightboxProject.image}
                    alt={lightboxProject.titleEn}
                    onClick={() => setLightboxZoomed((prev) => !prev)}
                    className={`rounded-lg border border-[#2E2E2E] shadow-2xl transition-all duration-200 ${
                      lightboxZoomed
                        ? 'max-w-none w-auto h-auto cursor-zoom-out'
                        : 'max-w-full max-h-[66vh] object-contain cursor-zoom-in'
                    }`}
                  />
                </div>

                {/* Contextual Verifiable Caption & KPIs Strip */}
                {((siteLang === 'it' ? lightboxProject.datasetIt : lightboxProject.datasetEn) || lightboxProject.keyKPIs.length > 0) && (
                  <div className="px-5 py-2.5 bg-[#141414] border-t border-[#252525] flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
                    {(siteLang === 'it' ? lightboxProject.datasetIt : lightboxProject.datasetEn) && (
                      <div className="text-[11px] text-[#CBD5E1] flex items-center gap-1.5">
                        <span className="font-mono text-[#7AA7FF] font-semibold">DATASET:</span>
                        <span>{siteLang === 'it' ? lightboxProject.datasetIt : lightboxProject.datasetEn}</span>
                      </div>
                    )}
                    {lightboxProject.keyKPIs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-[#A1A1AA]">
                        {lightboxProject.keyKPIs.slice(0, 3).map((kpi, kIdx) => (
                          <span key={kIdx} className="bg-[#222222] px-2 py-0.5 rounded border border-[#333333] text-[#E4E4E7]">
                            {kpi}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Lightbox Footer Bar with Tools & Resource Links */}
                <div className="px-5 py-3 bg-[#1C1C1C] border-t border-[#2E2E2E] flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
                  <div className="flex flex-wrap gap-1 font-mono text-[10px] text-[#94A3B8]">
                    {getConciseProjectBadges(lightboxProject.tools, 5).map((t) => (
                      <span key={t} className="bg-[#111111] px-2 py-0.5 rounded text-white border border-[#2E2E2E]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {lightboxProject.dashboardUrl ? (
                      <>
                        <a
                          href={lightboxProject.dashboardUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer"
                        >
                          <span>{siteLang === 'it' ? 'Apri Risorsa' : 'Open Resource'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        {lightboxProject.githubUrl && (
                          <a
                            href={lightboxProject.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#111111] hover:bg-[#222222] border border-[#2E2E2E] rounded-lg transition-colors cursor-pointer"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </>
                    ) : (
                      lightboxProject.githubUrl && (
                        <a
                          href={lightboxProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>{siteLang === 'it' ? 'Vedi repository GitHub' : 'View GitHub Repository'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CV PDF Preview Modal (Phase 4 §3): in-page preview, not a new tab,
              with Escape/close-button dismissal and an explicit download/open
              fallback for browsers that cannot render an embedded PDF. */}
          {isCvModalOpen && (
            <div
              className="fixed inset-0 z-50 bg-[#111111]/80 backdrop-blur-sm flex items-center justify-center sm:p-5 animate-in fade-in duration-200"
              onClick={() => setIsCvModalOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label={siteLang === 'it' ? 'Anteprima Curriculum Vitae (PDF)' : 'CV Preview (PDF)'}
            >
              <div
                className="bg-[#FFFFFF] w-full h-full sm:rounded-2xl sm:max-w-3xl sm:w-full sm:h-[88vh] sm:max-h-[860px] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-4 sm:px-5 py-3 border-b border-[#E2E8F0] flex items-center justify-between shrink-0 bg-[#F8FAFC]">
                  <div className="min-w-0 pr-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <h3 className="font-display font-bold text-sm text-[#111111] truncate">
                      {siteLang === 'it' ? 'Curriculum Vitae — Anteprima' : 'Curriculum Vitae — Preview'}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCvModalOpen(false)}
                    autoFocus
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-[#111111] hover:bg-[#E2E8F0] transition-colors cursor-pointer shrink-0"
                    aria-label={siteLang === 'it' ? 'Chiudi' : 'Close'}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 bg-[#F1F5F9] relative min-h-[200px]">
                  <iframe
                    key={cvModalUrl}
                    src={cvModalUrl}
                    title={siteLang === 'it' ? 'Anteprima CV PDF' : 'CV PDF preview'}
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>

                {/* Always-visible fallback: some mobile browsers cannot render an
                    embedded PDF inside an iframe, so a direct open/download
                    path is never hidden behind feature detection. */}
                <div className="px-4 sm:px-5 py-3 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-2.5 shrink-0">
                  <p className="text-[11px] text-[#64748B]">
                    {siteLang === 'it'
                      ? "Il PDF non si visualizza correttamente? Usa i link qui a lato."
                      : "PDF not displaying correctly? Use the links alongside."}
                  </p>
                  <div className="flex items-center gap-2">
                    <a
                      href={cvModalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] rounded-lg transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{siteLang === 'it' ? 'Apri in nuova scheda' : 'Open in new tab'}</span>
                    </a>
                    <a
                      href={cvModalUrl}
                      download={cvModalUrl.split('/').pop()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{siteLang === 'it' ? 'Scarica' : 'Download'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
    </div>
  );
}
