window.createRepoCard = function createRepoCard(repo, currentLang, labels) {
  const article = document.createElement("article");
  article.className = "repo-card";

  const topics = Array.isArray(repo.topics) ? repo.topics : [];
  const locale = currentLang === "it" ? "it-IT" : "en-US";
  const updatedAt = new Date(repo.updated_at).toLocaleDateString(locale);
  const updatedLabel = labels.updatedLabel || "Updated";
  const displayName = repo.name.replace(/_/g, " ");

  // GitHub genera automaticamente un'OG preview per ogni repo pubblico
  const owner = repo.owner ? repo.owner.login : repo.full_name.split("/")[0];
  const thumbUrl = `https://opengraph.githubassets.com/1/${owner}/${repo.name}`;

  article.innerHTML = `
    <img
      class="featured-thumb repo-thumb"
      src="${thumbUrl}"
      alt="${repo.name} preview"
      loading="lazy"
      onerror="this.style.display='none'"
    />
    <h4 class="featured-title repo-title">${displayName}</h4>
    <p class="featured-desc repo-desc">${repo.description || (currentLang === "it" ? "Nessuna descrizione disponibile." : "No description available.")}</p>
    <div class="repo-meta repo-meta--compact">
      ${topics.slice(0, 3).map((t) => `<span class="repo-pill">${t}</span>`).join("")}
    </div>
    <div class="repo-meta repo-meta--github">
      <span class="repo-pill">&#9733; ${repo.stargazers_count}</span>
      <span class="repo-pill">${updatedLabel} ${updatedAt}</span>
    </div>
    <div class="featured-actions repo-actions">
      <a class="mini-btn" href="${repo.html_url}" target="_blank" rel="noreferrer">${labels.repoCta}</a>
    </div>
  `;

  return article;
};

window.createFeaturedCard = function createFeaturedCard(project) {
  const article = document.createElement("article");
  article.className = "featured-card";

  const imgHtml = project.image
    ? `<img class="featured-thumb" src="${project.image}" alt="${project.title}">`
    : "";

  const linkHref = project.link && project.link !== "#" ? project.link : null;
  const ctaHtml = linkHref
    ? `<a class="mini-btn" href="${linkHref}" target="_blank" rel="noreferrer">${project.cta}</a>`
    : `<span class="mini-btn" style="opacity:0.45; cursor:default;">${project.cta}</span>`;

  const dashboardHtml = project.dashboard
    ? `<a class="mini-btn mini-btn--accent" href="${project.dashboard}" target="_blank" rel="noreferrer">${project.dashboardCta}</a>`
    : "";

  const tools = Array.isArray(project.tools) && project.tools.length
    ? `<div class="repo-meta repo-meta--compact">${project.tools.map(t => `<span class="repo-pill">${t}</span>`).join("")}</div>`
    : "";

  const githubBadges = (project.stars !== null && project.stars !== undefined) || project.lastCommit
    || project.repoStateLabel
    ? `<div class="repo-meta repo-meta--github">
        ${project.repoStateLabel ? `<span class="repo-pill ${project.repoStateClass || ""}">${project.repoStateLabel}</span>` : ""}
        ${project.stars !== null && project.stars !== undefined ? `<span class="repo-pill">&#9733; ${project.stars}</span>` : ""}
        ${project.lastCommit ? `<span class="repo-pill">${project.lastCommit}</span>` : ""}
      </div>`
    : "";

  article.innerHTML = `
    ${imgHtml}
    <h4 class="featured-title">${project.title}</h4>
    <p class="featured-desc">${project.description}</p>
    ${tools}
    ${githubBadges}
    <div class="featured-actions">${ctaHtml}${dashboardHtml}</div>
  `;

  return article;
};
