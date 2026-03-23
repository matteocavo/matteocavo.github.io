function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeRepoTitle(repoName) {
  const overrides = {
    dataciviclab: "DataCivicLab",
    "openbdap-saldi-storico-stato": "OpenBDAP Saldi Storico Stato"
  };

  if (overrides[repoName]) {
    return overrides[repoName];
  }

  return repoName
    .replace(/[_-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

window.createRepoCard = function createRepoCard(repo, currentLang, labels) {
  const article = document.createElement("article");
  article.className = "repo-card";

  const topics = Array.isArray(repo.topics) ? repo.topics : [];
  const locale = currentLang === "it" ? "it-IT" : "en-US";
  const updatedAt = new Date(repo.updated_at).toLocaleDateString(locale);
  const updatedLabel = labels.updatedLabel || "Updated";
  const displayName = normalizeRepoTitle(repo.name);

  // GitHub genera automaticamente un'OG preview per ogni repo pubblico
  const owner = repo.owner ? repo.owner.login : repo.full_name.split("/")[0];
  const thumbUrl = `https://opengraph.githubassets.com/1/${owner}/${repo.name}`;

  article.innerHTML = `
    <img
      class="featured-thumb repo-thumb"
      src="${escapeHtml(thumbUrl)}"
      alt="${escapeHtml(repo.name)} preview"
      loading="lazy"
      onerror="this.style.display='none'"
    />
    <h4 class="featured-title repo-title">${escapeHtml(displayName)}</h4>
    <p class="featured-desc repo-desc">${escapeHtml(repo.description) || (currentLang === "it" ? "Nessuna descrizione disponibile." : "No description available.")}</p>
    <div class="repo-meta repo-meta--compact">
      ${topics.slice(0, 3).map((t) => `<span class="repo-pill">${escapeHtml(t)}</span>`).join("")}
    </div>
    <div class="repo-meta repo-meta--github">
      <span class="repo-pill">&#9733; ${escapeHtml(String(repo.stargazers_count))}</span>
      <span class="repo-pill">${escapeHtml(updatedLabel)} ${escapeHtml(updatedAt)}</span>
    </div>
    <div class="featured-actions repo-actions">
      <a class="mini-btn" href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer">${escapeHtml(labels.repoCta)}</a>
    </div>
  `;

  return article;
};

window.createFeaturedCard = function createFeaturedCard(project) {
  const article = document.createElement("article");
  article.className = "featured-card";

  const imgHtml = project.image
    ? `<img class="featured-thumb" src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}">`
    : "";

  const linkHref = project.link && project.link !== "#" ? project.link : null;
  const ctaHtml = linkHref
    ? `<a class="mini-btn" href="${escapeHtml(linkHref)}" target="_blank" rel="noreferrer">${escapeHtml(project.cta)}</a>`
    : `<span class="mini-btn" style="opacity:0.45; cursor:default;">${escapeHtml(project.cta)}</span>`;

  const isInternalDashboard = project.dashboard && project.dashboard.endsWith(".html");
  const dashboardHtml = project.dashboard
    ? `<a class="mini-btn mini-btn--accent" href="${escapeHtml(project.dashboard)}"${isInternalDashboard ? "" : ' target="_blank" rel="noreferrer"'}>${escapeHtml(project.dashboardCta)}</a>`
    : "";

  const tools = Array.isArray(project.tools) && project.tools.length
    ? `<div class="repo-meta repo-meta--compact">${project.tools.map(t => `<span class="repo-pill">${escapeHtml(t)}</span>`).join("")}</div>`
    : "";

  const githubBadges = (project.stars !== null && project.stars !== undefined) || project.lastCommit
    || project.repoStateLabel
    ? `<div class="repo-meta repo-meta--github">
        ${project.repoStateLabel ? `<span class="repo-pill ${escapeHtml(project.repoStateClass || "")}">${escapeHtml(project.repoStateLabel)}</span>` : ""}
        ${project.stars !== null && project.stars !== undefined ? `<span class="repo-pill">&#9733; ${escapeHtml(String(project.stars))}</span>` : ""}
        ${project.lastCommit ? `<span class="repo-pill">${escapeHtml(project.lastCommit)}</span>` : ""}
      </div>`
    : "";

  article.innerHTML = `
    ${imgHtml}
    <h4 class="featured-title">${escapeHtml(project.title)}</h4>
    <p class="featured-desc">${escapeHtml(project.description)}</p>
    ${tools}
    ${githubBadges}
    <div class="featured-actions">${ctaHtml}${dashboardHtml}</div>
  `;

  return article;
};
