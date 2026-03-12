window.CURRENT_LANG = localStorage.getItem("portfolio-lang") || "it";
let revealObserver = null;
let rafId = 0;
let hasMotionSetup = false;

function setupMotionEffects() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(
    ".section-head, .section-block, .hero .hero-copy, .hero .btn, .hero .soft-card, .about-intro > *, .about-copy p, #skills-section > *, #value-section > *, #contact > *, .featured-card, .repo-card, .link-card, .panel-card, .pill, .cert-item"
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

  document.getElementById("site-title").textContent = t.siteTitle;
  document.getElementById("lang-it").classList.toggle("active", lang === "it");
  document.getElementById("lang-en").classList.toggle("active", lang === "en");
}

async function fetchGithubRepoMeta(githubUrl) {
  if (!githubUrl) return null;
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/?#]+)/);
  if (!match) return null;
  try {
    const res = await fetch("https://api.github.com/repos/" + match[1] + "/" + match[2]);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      stars: data.stargazers_count,
      pushedAt: data.pushed_at,
      isArchived: Boolean(data.archived)
    };
  } catch (e) { return null; }
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
    const res = await fetch("data/projects.json");
    const notionProjects = await res.json();
    const statsResults = await Promise.allSettled(
      notionProjects.map(function(p) { return fetchGithubRepoMeta(p.github); })
    );
    notionProjects.forEach(function(p, i) {
      const repoMeta = statsResults[i].status === "fulfilled" ? statsResults[i].value : null;
      const lastCommit = repoMeta && repoMeta.pushedAt
        ? updatedLabel + " " + new Date(repoMeta.pushedAt).toLocaleDateString(locale)
        : null;
      container.appendChild(window.createFeaturedCard({
        title: p.title,
        description: p.businessGoal,
        tools: Array.isArray(p.tools) ? p.tools.slice(0, 3) : [],
        image: p.image || null,
        link: p.github || "#",
        cta: cta,
        dashboard: p.dashboard || null,
        dashboardCta: dashboardCta,
        stars: repoMeta ? repoMeta.stars : null,
        lastCommit: lastCommit,
        repoStateLabel: repoMeta
          ? (repoMeta.isArchived ? archivedRepoLabel : null)
          : null,
        repoStateClass: repoMeta
          ? (repoMeta.isArchived ? "repo-pill--status-archived" : "")
          : ""
      }));
    });
  } catch (e) {
    const fallback = (window.FEATURED_PROJECTS && window.FEATURED_PROJECTS[lang]) || [];
    fallback.forEach(function(project) {
      container.appendChild(window.createFeaturedCard(project));
    });
  }
}

function renderSkills() {
  const list = document.getElementById("skills-list");
  list.innerHTML = "";
  window.PORTFOLIO_PROFILE.skills.forEach(function(skill) {
    const span = document.createElement("span");
    span.className = "pill";
    span.textContent = skill;
    list.appendChild(span);
  });
}

function renderCertifications() {
  const list = document.getElementById("certifications-list");
  list.innerHTML = "";
  window.PORTFOLIO_PROFILE.certifications.forEach(function(cert) {
    const div = document.createElement("div");
    div.className = "cert-item";
    div.textContent = cert;
    list.appendChild(div);
  });
}

function renderLinks() {
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
  renderSkills();
  renderCertifications();
  renderLinks();
  await Promise.all([
    renderFeatured(lang),
    window.loadGithubRepos(lang, labels)
  ]);
  setupMotionEffects();
};

document.addEventListener("DOMContentLoaded", async function() {
  window.setupLanguageToggle();
  setupScrollMotion();
  await window.renderPortfolio();
});
