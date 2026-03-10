window.loadGithubRepos = async function loadGithubRepos(lang, labels) {
  const repoGrid = document.getElementById("repo-grid");
  const loadingMsg = lang === "it" ? "Caricamento repository..." : "Loading repositories...";
  repoGrid.innerHTML = `<p class="loading">${loadingMsg}</p>`;

  try {
    // 1. Fetch repos dell'utente con topic portfolio
    const response = await fetch(
      "https://api.github.com/users/matteocavo/repos?per_page=100&sort=updated",
      { headers: { Accept: "application/vnd.github+json" } }
    );

    if (!response.ok) {
      throw new Error("GitHub API error: " + response.status);
    }

    const allRepos = await response.json();

    const topicFiltered = allRepos
      .filter((repo) => !repo.fork)
      .filter((repo) => repo.full_name !== "matteocavo/matteocavo.github.io")
      .filter((repo) => Array.isArray(repo.topics) && repo.topics.includes("portfolio"));

    // 2. Fetch repo pinned (da org esterne dove non si puo aggiungere topic)
    const pinnedList =
      window.PORTFOLIO_PROFILE && Array.isArray(window.PORTFOLIO_PROFILE.pinnedRepos)
        ? window.PORTFOLIO_PROFILE.pinnedRepos
        : [];

    const pinnedResults = await Promise.all(
      pinnedList.map((fullName) =>
        fetch(`https://api.github.com/repos/${fullName}`, {
          headers: { Accept: "application/vnd.github+json" }
        })
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    );

    // 3. Merge e deduplica per full_name
    const seen = new Set(topicFiltered.map((r) => r.full_name));
    for (const repo of pinnedResults) {
      if (repo && !seen.has(repo.full_name)) {
        seen.add(repo.full_name);
        topicFiltered.push(repo);
      }
    }

    // 4. Ordina per data aggiornamento
    const filtered = topicFiltered.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );

    repoGrid.innerHTML = "";

    if (!filtered.length) {
      const noRepoMsg =
        lang === "it"
          ? "Nessun repository trovato."
          : "No repositories found.";
      repoGrid.innerHTML = `<p class="error">${noRepoMsg}</p>`;
      return;
    }

    filtered.forEach((repo) => {
      repoGrid.appendChild(window.createRepoCard(repo, lang, labels));
    });
  } catch (error) {
    const errMsg =
      lang === "it"
        ? "Impossibile caricare i repository GitHub."
        : "Unable to load GitHub repositories.";
    repoGrid.innerHTML = `<p class="error">${errMsg}</p>`;
    console.error("[repoLoader]", error);
  }
};
