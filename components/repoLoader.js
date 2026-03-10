window.loadGithubRepos = async function loadGithubRepos(lang, labels) {
  const repoGrid = document.getElementById("repo-grid");
  const loadingMsg = lang === "it" ? "Caricamento repository..." : "Loading repositories...";
  repoGrid.innerHTML = `<p class="loading">${loadingMsg}</p>`;

  try {
    const response = await fetch(
      "https://api.github.com/users/matteocavo/repos?per_page=100&sort=updated",
      { headers: { Accept: "application/vnd.github+json" } }
    );

    if (!response.ok) {
      throw new Error("GitHub API error: " + response.status);
    }

    const repos = await response.json();

    const filtered = repos
      .filter((repo) => !repo.fork)
      .filter((repo) => Array.isArray(repo.topics) && repo.topics.includes("portfolio"))
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    repoGrid.innerHTML = "";

    if (!filtered.length) {
      const noRepoMsg = lang === "it"
        ? "Nessun repository con topic portfolio trovato."
        : "No repositories tagged with portfolio were found.";
      repoGrid.innerHTML = `<p class="error">${noRepoMsg}</p>`;
      return;
    }

    filtered.forEach((repo) => {
      repoGrid.appendChild(window.createRepoCard(repo, lang, labels));
    });

  } catch (error) {
    const errMsg = lang === "it"
      ? "Impossibile caricare i repository GitHub."
      : "Unable to load GitHub repositories.";
    repoGrid.innerHTML = `<p class="error">${errMsg}</p>`;
    console.error("[repoLoader]", error);
  }
};
