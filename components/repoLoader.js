window.loadGithubRepos = async function loadGithubRepos(lang, labels) {
  const repoGrid = document.getElementById("repo-grid");
  const loadingMsg = lang === "it" ? "Caricamento repository..." : "Loading repositories...";
  repoGrid.innerHTML = `<p class="loading">${loadingMsg}</p>`;

  try {
    const response = await fetch("data/github-repos.json");

    if (!response.ok) {
      throw new Error("Repository snapshot error: " + response.status);
    }

    const repos = await response.json();
    const filtered = repos.sort(
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
    const fallbackText = lang === "it"
      ? "La selezione non è disponibile in questo momento. Vedi tutti i repository su GitHub."
      : "The selection is temporarily unavailable. View all repositories on GitHub.";
    repoGrid.innerHTML = `<p class="loading">${fallbackText} <a class="text-link" href="https://github.com/matteocavo" target="_blank" rel="noreferrer">GitHub</a></p>`;
    console.warn("[repoLoader]", error);
  }
};
