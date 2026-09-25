window.CURRENT_LANG = localStorage.getItem("portfolio-lang") || "it";
let revealObserver = null;
let rafId = 0;
let hasMotionSetup = false;

function setupMotionEffects() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(
    ".section-head, .section-block > .section-label, .auto-projects-head, .hero .hero-copy, .hero .btn, .hero .soft-card, .hero .hero-dashboard, .about-intro > *, .about-copy p, #skills-section > *, #value-section > *, #contact > *, .featured-card, .repo-card, .link-card, .panel-card, .pill, .cert-item"
  );

  if (reduceMotion) {
    targets.forEach(function(el) {
      el.classList.add("in-view");
    });
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
    );
  }

  targets.forEach(function(el, index) {
    if (!el.classList.contains("reveal")) {
      el.classList.add("reveal");
      el.style.setProperty("--reveal-delay", (index % 6) * 45 + "ms");
    }

    if (!el.classList.contains("in-view")) {
      revealObserver.observe(el);
    }
  });
}

function setupScrollMotion() {
  if (hasMotionSetup) {
    return;
  }

  hasMotionSetup = true;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const progressBar = document.querySelector(".scroll-progress__bar");
  const heroTitle = document.querySelector(".hero-title");

  if (reduceMotion) {
    if (progressBar) {
      progressBar.style.transform = "scaleX(0)";
    }
    return;
  }

  function update() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    if (progressBar) {
      progressBar.style.transform = "scaleX(" + progress + ")";
    }

    if (heroTitle) {
      const drift = Math.min(scrollY * 0.08, 36);
      heroTitle.style.transform = "translate3d(0," + drift + "px,0)";
    }

    rafId = 0;
  }

  function onScroll() {
    if (rafId) {
      return;
    }
    rafId = window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
}

function updateText(lang) {
  const t = window.PORTFOLIO_PROFILE.translations[lang];
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(function(el) {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach(function(el) {
    const key = el.dataset.i18nAriaLabel;
    if (t[key] !== undefined) {
      el.setAttribute("aria-label", t[key]);
    }
  });

  const mobileNavToggle = document.getElementById("mobile-nav-toggle");
  if (mobileNavToggle) {
    const menuLabelKey = mobileNavToggle.getAttribute("aria-expanded") === "true"
      ? "navMenuClose"
      : "navMenuOpen";
    mobileNavToggle.setAttribute("aria-label", t[menuLabelKey]);
  }

  document.getElementById("site-title").textContent = t.siteTitle;
  document.getElementById("lang-it").classList.toggle("active", lang === "it");
  document.getElementById("lang-en").classList.toggle("active", lang === "en");
}

function setupMobileNavigation() {
  const toggle = document.getElementById("mobile-nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  function updateToggleLabel(isOpen) {
    const lang = document.documentElement.lang || "it";
    const translations = window.PORTFOLIO_PROFILE.translations[lang];
    toggle.setAttribute("aria-label", translations[isOpen ? "navMenuClose" : "navMenuOpen"]);
  }

  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    updateToggleLabel(false);
  }

  toggle.addEventListener("click", function() {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }
    nav.classList.add("is-open");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    updateToggleLabel(true);
  });

  nav.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener("resize", function() {
    if (window.innerWidth > 640) {
      closeMenu();
    }
  });
}

function renderContactCv(lang) {
  const t = window.PORTFOLIO_PROFILE.translations[lang];
  const note = document.getElementById("contact-cv-note");
  const link = document.getElementById("contact-cv-link");

  if (!note || !link) {
    return;
  }

  const isItalian = lang === "it";
  note.textContent = t.contactCvValue;
  link.textContent = t.contactCvLabel;
  link.href = isItalian
    ? "assets/cv/Matteo_Cavo_CV_IT.pdf"
    : "assets/cv/Matteo_Cavo_CV_EN.pdf";
  link.download = isItalian
    ? "Matteo_Cavo_CV_IT.pdf"
    : "Matteo_Cavo_CV_EN.pdf";
}

function normalizeGithubUrl(url) {
  return String(url || "").replace(/\/$/, "").toLowerCase();
}

function pickBusinessGoal(p, lang) {
  const localized = lang === "it" ? p.businessGoalIt : p.businessGoalEn;
  const otherLocalized = lang === "it" ? p.businessGoalEn : p.businessGoalIt;
  return localized || otherLocalized || p.businessGoal || "";
}

function isExternalDashboardUrl(url) {
  if (!url) return false;
  const clean = String(url).split(/[?#]/)[0];
  return !/\.html?$/i.test(clean);
}

function countToolMatches(projects, matcher) {
  return projects.reduce(function(total, project) {
    const tools = Array.isArray(project.tools) ? project.tools : [];
    return total + (tools.some(matcher) ? 1 : 0);
  }, 0);
}

function renderHeroDashboard(lang, projects) {
  const profile = window.PORTFOLIO_PROFILE;
  const certList = profile.certifications && profile.certifications.completed;
  const certifications = Array.isArray(certList) ? certList.length : 0;
  const featuredCount = projects.length;
  const liveDashboards = projects.filter(function(project) {
    return isExternalDashboardUrl(project.dashboard);
  }).length;
  const currentYear = new Date().getFullYear();
  const startYear = Number(profile.experienceStartYear);
  const yearsExperience = Number.isFinite(startYear) && startYear > 0
    ? Math.max(currentYear - startYear, 1) + "+"
    : "-";

  const yearsNode = document.getElementById("hero-metric-years");
  const featuredNode = document.getElementById("hero-metric-featured");
  const dashboardsNode = document.getElementById("hero-metric-dashboards");
  const certsNode = document.getElementById("hero-metric-certs");
  const mixNode = document.getElementById("hero-tool-mix");

  if (yearsNode) yearsNode.textContent = yearsExperience;
  if (featuredNode) featuredNode.textContent = String(featuredCount);
  if (dashboardsNode) dashboardsNode.textContent = String(liveDashboards);
  if (certsNode) certsNode.textContent = String(certifications);

  if (!mixNode) {
    return;
  }

  const isIt = lang === "it";
  // Canonical, exact-match Notion Tool tags. Related platform-specific tags
  // are grouped under one high-level category, while unrelated metadata tags
  // (EDA, Pipeline, DAX, Numpy, etc.) never imply a category on their own.
  const databricksTools = new Set([
    "Databricks",
    "Databricks SQL",
    "Delta Lake",
    "Apache Spark",
    "PySpark",
    "Lakehouse Architecture",
    "Data Intelligence Platform"
  ]);
  const stackCategories = [
    { label: "Power BI", match: function(tool) { return tool === "Power BI"; } },
    { label: "SQL", match: function(tool) { return tool === "SQL"; } },
    { label: "Python", match: function(tool) { return tool === "Python" || tool === "Python (Pandas)"; } },
    { label: "Databricks", match: function(tool) { return databricksTools.has(tool); } },
    {
      label: isIt ? "ETL / Automazione" : "ETL / Automation",
      match: function(tool) { return tool === "ETL / Automation"; }
    },
    {
      label: isIt ? "Analisi statistica" : "Statistical Analysis",
      match: function(tool) { return tool === "Statistical Analysis"; }
    },
    {
      label: isIt ? "ML applicato" : "Applied ML",
      match: function(tool) { return tool === "Applied ML"; }
    }
  ];
  const toolMix = stackCategories.map(function(cat) {
    return { label: cat.label, count: countToolMatches(projects, cat.match) };
  }).filter(function(item) {
    return item.count > 0;
  });

  const maxCount = Math.max.apply(null, toolMix.map(function(item) { return item.count; }).concat([1]));

  mixNode.innerHTML = toolMix.map(function(item) {
    const width = item.count > 0 ? Math.max((item.count / maxCount) * 100, 14) : 0;
    return `
      <div class="hero-dashboard__mix-row">
        <span class="hero-dashboard__mix-label">${item.label}</span>
        <span class="hero-dashboard__mix-track">
          <span class="hero-dashboard__mix-fill" style="width:${width}%"></span>
        </span>
        <strong class="hero-dashboard__mix-value">${item.count}</strong>
      </div>
    `;
  }).join("");
}

async function renderFeatured(lang) {
  const container = document.getElementById("featured-projects");
  container.innerHTML = "";
  const cta = lang === "it" ? "Vedi progetto" : "View project";
  const dashboardCta = lang === "it" ? "Apri dashboard" : "Open dashboard";
  const updatedLabel = lang === "it" ? "Aggiornato" : "Updated";
  const archivedRepoLabel = lang === "it" ? "Archived" : "Archived";
  const locale = lang === "it" ? "it-IT" : "en-US";
  try {
    const [projectsResponse, repoSnapshot] = await Promise.all([
      fetch("data/projects.json"),
      fetch("data/github-repos.json")
        .then(function(response) { return response.ok ? response.json() : []; })
        .catch(function() { return []; })
    ]);
    if (!projectsResponse.ok) {
      throw new Error("Projects snapshot error: " + projectsResponse.status);
    }
    const notionProjects = await projectsResponse.json();
    const repoIndex = new Map(repoSnapshot.map(function(repo) {
      return [normalizeGithubUrl(repo.html_url), repo];
    }));

    renderHeroDashboard(lang, notionProjects);

    notionProjects.forEach(function(p) {
      const repoMeta = repoIndex.get(normalizeGithubUrl(p.github));
      const lastCommit = repoMeta && repoMeta.pushed_at
        ? updatedLabel + " " + new Date(repoMeta.pushed_at).toLocaleDateString(locale)
        : null;
      const isInternalPage = Boolean(p.dashboard) && !isExternalDashboardUrl(p.dashboard);
      const projectDashboardCta = isInternalPage
        ? (lang === "it" ? "Esplora progetto" : "Explore project")
        : dashboardCta;
      container.appendChild(window.createFeaturedCard({
        title: p.title,
        description: pickBusinessGoal(p, lang),
        tools: Array.isArray(p.tools) ? p.tools.slice(0, 3) : [],
        image: p.image || null,
        link: p.github || "#",
        cta: cta,
        dashboard: p.dashboard || null,
        dashboardCta: projectDashboardCta,
        stars: repoMeta ? repoMeta.stargazers_count : null,
        lastCommit: lastCommit,
        repoStateLabel: repoMeta
          ? (repoMeta.archived ? archivedRepoLabel : null)
          : null,
        repoStateClass: repoMeta
          ? (repoMeta.archived ? "repo-pill--status-archived" : "")
          : ""
      }));
    });
  } catch (e) {
    renderHeroDashboard(lang, []);
    const fallback = (window.FEATURED_PROJECTS && window.FEATURED_PROJECTS[lang]) || [];
    fallback.forEach(function(project) {
      container.appendChild(window.createFeaturedCard(project));
    });
  }
}

function renderSkills(lang) {
  const list = document.getElementById("skills-list");
  list.innerHTML = "";
  const groups = window.PORTFOLIO_PROFILE.skillGroups || [];
  const separator = " \u00b7 ";

  groups.forEach(function(group) {
    const groupEl = document.createElement("div");
    groupEl.className = "skill-group";

    const labelEl = document.createElement("p");
    labelEl.className = "skill-group__label";
    labelEl.textContent = (group.label && (group.label[lang] || group.label.en)) || group.key;
    groupEl.appendChild(labelEl);

    const itemsEl = document.createElement("p");
    itemsEl.className = "skill-group__items";
    itemsEl.textContent = (group.skills || []).join(separator);
    groupEl.appendChild(itemsEl);

    list.appendChild(groupEl);
  });
}

function renderCertifications(lang) {
  const list = document.getElementById("certifications-list");
  list.innerHTML = "";
  const labels = window.PORTFOLIO_PROFILE.translations[lang] || {};
  const certs = window.PORTFOLIO_PROFILE.certifications || {};

  function renderGroup(items, statusKey, statusLabel) {
    (items || []).forEach(function(cert) {
      const name = typeof cert === "string" ? cert : cert.name;
      const year = cert && cert.year ? " \u00b7 " + cert.year : "";
      const credentialUrl = cert && statusKey === "completed" ? cert.credentialUrl : null;
      const div = document.createElement("div");
      div.className = "cert-item cert-item--" + statusKey;

      let nameNode;
      if (credentialUrl) {
        nameNode = document.createElement("a");
        nameNode.href = credentialUrl;
        nameNode.target = "_blank";
        nameNode.rel = "noreferrer";
        nameNode.className = "cert-item__name cert-item__name--link";
        nameNode.appendChild(document.createTextNode(name + year));
        const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icon.setAttribute("width", "11");
        icon.setAttribute("height", "11");
        icon.setAttribute("viewBox", "0 0 24 24");
        icon.setAttribute("fill", "none");
        icon.setAttribute("stroke", "currentColor");
        icon.setAttribute("stroke-width", "2.5");
        icon.setAttribute("aria-hidden", "true");
        icon.classList.add("cert-item__link-icon");
        icon.innerHTML = '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>';
        nameNode.appendChild(icon);
      } else {
        nameNode = document.createElement("span");
        nameNode.className = "cert-item__name";
        nameNode.textContent = name + year;
      }

      const badgeSpan = document.createElement("span");
      badgeSpan.className = "cert-item__badge cert-item__badge--" + statusKey;
      badgeSpan.textContent = statusLabel;
      div.appendChild(nameNode);
      div.appendChild(badgeSpan);
      list.appendChild(div);
    });
  }

  renderGroup(certs.completed, "completed", labels.certStatusCompleted || "Completed");
  renderGroup(certs.inProgress, "in-progress", labels.certStatusInProgress || "In progress");
}

function updateStructuredData() {
  const scriptEl = document.querySelector('script[type="application/ld+json"]');
  if (!scriptEl) return;
  let data;
  try {
    data = JSON.parse(scriptEl.textContent);
  } catch (e) {
    return;
  }
  const profile = window.PORTFOLIO_PROFILE;
  if (Array.isArray(profile.skillGroups)) {
    data.knowsAbout = profile.skillGroups.reduce(function(acc, group) {
      return acc.concat(Array.isArray(group.skills) ? group.skills : []);
    }, []);
  }
  const completed = profile.certifications && profile.certifications.completed;
  if (Array.isArray(completed)) {
    data.hasCredential = completed.map(function(cert) {
      const credential = {
        "@type": "EducationalOccupationalCredential",
        "name": cert.name,
        "credentialCategory": "certificate"
      };
      if (cert.year) credential.dateCreated = String(cert.year);
      return credential;
    });
  }
  scriptEl.textContent = JSON.stringify(data);
}

function renderLinks(lang) {
  const list = document.getElementById("links-list");
  list.innerHTML = "";

  window.PORTFOLIO_PROFILE.links.forEach(function(item) {
    const a = document.createElement("a");
    a.className = "link-card";
    a.href = item.href;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.innerHTML = `
      <p class="section-label">${item.label} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="opacity:0.4;flex-shrink:0;vertical-align:middle;margin-left:4px" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></p>
      <p class="link-value">${item.value}</p>
    `;
    list.appendChild(a);
  });
}

window.renderPortfolio = async function renderPortfolio() {
  const lang = window.CURRENT_LANG;
  const labels = window.PORTFOLIO_PROFILE.translations[lang];

  updateText(lang);
  renderContactCv(lang);
  renderSkills(lang);
  renderCertifications(lang);
  renderLinks(lang);
  updateStructuredData();
  await Promise.all([
    renderFeatured(lang),
    window.loadGithubRepos(lang, labels)
  ]);
  setupMotionEffects();
};

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  if (!form || !feedback) return;

  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    const lang = document.documentElement.lang || "it";
    const labels = window.PORTFOLIO_PROFILE && window.PORTFOLIO_PROFILE.translations
      ? window.PORTFOLIO_PROFILE.translations[lang] || window.PORTFOLIO_PROFILE.translations["it"]
      : {};
    const btn = form.querySelector(".form-submit");
    btn.disabled = true;
    feedback.textContent = "";
    feedback.className = "form-feedback";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form)
      });
      const data = await res.json();
      if (data.success) {
        feedback.textContent = labels.formSuccess || "Messaggio inviato.";
        feedback.className = "form-feedback success";
        form.reset();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      feedback.textContent = labels.formError || "Qualcosa è andato storto. Riprova.";
      feedback.className = "form-feedback error";
    } finally {
      btn.disabled = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", async function() {
  window.setupLanguageToggle();
  setupMobileNavigation();
  setupScrollMotion();
  await window.renderPortfolio();
  setupContactForm();
});
