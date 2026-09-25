const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT_PATH = path.join(ROOT, "data", "github-repos.json");
const PROFILE_PATH = path.join(ROOT, "data", "profile.js");
const USER = "matteocavo";

function readPinnedRepos() {
  const source = fs.readFileSync(PROFILE_PATH, "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: PROFILE_PATH });
  const pinned = sandbox.window.PORTFOLIO_PROFILE?.pinnedRepos;
  return Array.isArray(pinned) ? pinned : [];
}

async function githubRequest(endpoint) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "matteocavo-portfolio-sync"
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`https://api.github.com${endpoint}`, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}: ${endpoint}`);
  }
  return response.json();
}

function selectFields(repo) {
  return {
    name: repo.name,
    full_name: repo.full_name,
    description: repo.description,
    html_url: repo.html_url,
    topics: Array.isArray(repo.topics) ? repo.topics : [],
    stargazers_count: repo.stargazers_count || 0,
    updated_at: repo.updated_at,
    pushed_at: repo.pushed_at,
    archived: Boolean(repo.archived),
    fork: Boolean(repo.fork),
    owner: { login: repo.owner?.login || repo.full_name.split("/")[0] }
  };
}

async function main() {
  const userRepos = await githubRequest(`/users/${USER}/repos?per_page=100&sort=updated`);
  const portfolioRepos = userRepos
    .filter((repo) => !repo.fork)
    .filter((repo) => repo.full_name !== `${USER}/${USER}.github.io`)
    .filter((repo) => Array.isArray(repo.topics) && repo.topics.includes("portfolio"));

  const pinnedRepos = await Promise.all(
    readPinnedRepos().map((fullName) => githubRequest(`/repos/${fullName}`))
  );

  const merged = new Map();
  [...portfolioRepos, ...pinnedRepos].forEach((repo) => {
    merged.set(repo.full_name, selectFields(repo));
  });

  const snapshot = [...merged.values()].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  console.log(`Saved ${snapshot.length} repositories to ${path.relative(ROOT, OUTPUT_PATH)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
