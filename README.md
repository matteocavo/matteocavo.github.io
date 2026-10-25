# Matteo Cavo — Data & Business Intelligence Analyst Portfolio

**Live:** https://matteocavo.github.io

---

## Chi sono / About

Professionista multidisciplinare con oltre 15 anni di esperienza internazionale tra progetti digitali, content operations, processi data-driven, analytics e sviluppo web.

Oggi opero come **Data & Business Intelligence Analyst**, con focus su Business Intelligence, Data Engineering, ETL/ELT, automazione dei workflow e data quality, estendendo il mio percorso verso Advanced Analytics, Applied Machine Learning e l'uso professionale di strumenti AI & GenAI a supporto dello sviluppo e delle decisioni analitiche.

Ho oltre 5 anni di esperienza in un contesto enterprise presso **Nielsen/Gracenote** (Amsterdam), occupandomi di content operations e qualità dei metadata su cataloghi multimediali di grandi dimensioni per piattaforme internazionali come Netflix, Amazon Prime Video, Disney+, Sky, Mediaset Infinity e RAI. Questa esperienza in un ambiente fortemente data-driven ha rafforzato il mio interesse per come i dati possano guidare sviluppo e decisioni, portandomi naturalmente verso ETL, automazione e Business Intelligence.

---

*Multidisciplinary professional with 15+ years of international experience across digital projects, content operations, data-driven workflows, analytics, and web development.*

*Today I work as a **Data & Business Intelligence Analyst**, focusing on Business Intelligence, Data Engineering, ETL/ELT, workflow automation, and data quality, while extending my analytical capabilities into Advanced Analytics, Applied Machine Learning, and the professional use of AI & GenAI tools to support development and analytical decision-making.*

*I have 5+ years of experience in an enterprise environment at **Nielsen/Gracenote** (Amsterdam), focusing on content operations and metadata quality across large-scale media catalogs for international platforms including Netflix, Amazon Prime Video, Disney+, Sky, Mediaset Infinity, and RAI. Working in a strongly data-driven environment strengthened my interest in how data can guide better decisions, naturally leading me toward ETL, workflow automation, and Business Intelligence.*

---

## Competenze / Core Competencies

### Business Intelligence

`Power BI` · `DAX` · `Power Query` · `Data Modeling` · `KPI Design` · `Data Visualization` · `Data Storytelling`

### Data Engineering & Automation

`Python` · `SQL` · `Databricks` · `PySpark` · `Delta Lake (Bronze→Silver→Gold)` · `MLflow` · `ETL/ELT pipeline design` · `RAW → CLEAN → MART` · `Data Quality & Governance` · `DuckDB` · `YAML-driven configuration` · `Git / GitHub` · `Workflow Automation`

### Advanced Analytics & Applied Machine Learning

`scikit-learn` · `XGBoost` · `Regression` · `Classification` · `Decision Trees` · `Random Forest` · `Gradient Boosting` · `K-means` · `Feature Engineering` · `Statistical Inference & Hypothesis Testing` · `Cross-Validation` · `Model Evaluation (Precision, Recall, F1, ROC-AUC)`

### AI & GenAI Workflows

Structured prompting · Prompt refinement · LLM-assisted analytics · AI-assisted development · Workflow orchestration · Decision-support automation, applied hands-on with ChatGPT, Claude, Codex, Gemini, Google AI Studio, GitHub Copilot, Databricks Genie and Antigravity.

---

## Certificazioni e badge / Certifications & Badges

### Completed

- **Google Advanced Data Analytics Professional Certificate — 2026**
- **Google AI Professional Certificate — 2026**
- **[Databricks Fundamentals Accreditation — 2026](https://credentials.databricks.com/efe62f89-12ff-4802-bd0b-2eb18cb94734#acc.W6Cd2iUt)**
- **Microsoft Power BI Desktop for Business Intelligence** — Udemy Business, 2026
- **Microsoft Excel — Excel from Beginner to Advanced** — Udemy Business, 2025

### In Preparation

- **Microsoft Power BI Data Analyst Associate (PL-300)**
- **Databricks Certified Data Engineer Associate**

---

## Portfolio Features

- Progetti selezionati con business goal, strumenti, KPI e output reali, bilingue IT/EN.
- Progetto flagship dinamico, selezionato automaticamente dal database Notion.
- Snapshot "All Projects" alimentato dai repository GitHub pubblici (pinned + topic `portfolio`).
- Anteprima e download del CV in italiano e inglese, in-page.
- Assistente conversazionale (chatbot) per esplorare il portfolio.
- Layout responsive, navigazione accessibile e SEO/structured data dinamici.

*Selected projects with real business goals, tools, KPIs and outputs, bilingual IT/EN. Dynamic flagship project automatically selected from the Notion database. "All Projects" snapshot powered by public GitHub repositories (pinned + `portfolio` topic). In-page CV preview and download in Italian and English. Conversational assistant (chatbot) to explore the portfolio. Responsive layout, accessible navigation, and dynamic SEO/structured data.*

---

## Technical Stack

- **React 19** · **TypeScript** · **Vite 8** · **Tailwind CSS 4**
- GitHub Pages (static hosting)
- GitHub Actions (CI/CD, scheduled sync, manual deploy)
- Notion API (project content source of truth)
- GitHub API (repository snapshot)
- Runtime JSON fetching (no build-time data freezing)
- Dynamic EN / IT localization

---

## Architecture & Data Flow

```
Notion (projects)         GitHub (repositories)
        │                          │
        ▼                          ▼
   GitHub Actions ─── sync-notion.yml ───
        │                          │
        ▼                          ▼
data/projects.json         data/github-repos.json
        │                          │
        └───────────┬──────────────┘
                     ▼
        React app — runtime fetch (no build-time import)
                     │
                     ▼
              GitHub Pages (live site)
```

Il database Notion resta la source of truth per lo stato dei progetti (`Status = Portfolio Ready`), business goal IT/EN, tools, KPI, dataset, repository GitHub e output/dashboard. Il workflow `sync-notion.yml` esegue `scripts/fetch-notion.js` e `scripts/fetch-github-repos.js` su schedulazione oraria (più trigger manuale), scrivendo `data/projects.json` e `data/github-repos.json` direttamente nel repository.

L'applicazione React **non importa questi JSON a build time**: li recupera a runtime tramite `fetch()` a ogni caricamento di pagina. Questo significa che un aggiornamento Notion/GitHub diventa visibile ai visitatori al prossimo page load, senza richiedere un nuovo build o deploy del frontend. Un sync Notion da solo **non** attiva un deploy del frontend React: il deploy è un passo separato e manuale (vedi sotto).

*The Notion database remains the source of truth for project status (`Status = Portfolio Ready`), business goal IT/EN, tools, KPIs, dataset, GitHub repository, and output/dashboard. The `sync-notion.yml` workflow runs `scripts/fetch-notion.js` and `scripts/fetch-github-repos.js` on an hourly schedule (plus manual trigger), writing `data/projects.json` and `data/github-repos.json` directly to the repository.*

*The React app does **not** import these JSON files at build time — it fetches them at runtime on every page load. This means a Notion/GitHub update becomes visible to visitors on their next page load, with no React rebuild or redeploy required. A Notion sync alone does **not** trigger a frontend deploy: deployment is a separate, manual step (see below).*

---

## Dynamic Flagship Project

Il database Notion include il checkbox **`Portfolio Flagship`**, esportato come campo `isFlagship` in `data/projects.json`. La selezione del progetto in evidenza segue questa logica:

- esattamente un progetto idoneo (`Status = Portfolio Ready`) con `isFlagship = true` → viene usato come flagship;
- zero progetti marcati → fallback deterministico su un progetto di riferimento fisso;
- più di un progetto marcato → warning in console (visibile in sviluppo) e lo stesso fallback deterministico, finché il dato in Notion non viene corretto.

*The Notion database includes the **`Portfolio Flagship`** checkbox, exported as an `isFlagship` field in `data/projects.json`. Flagship selection follows this logic: exactly one eligible project (`Status = Portfolio Ready`) with `isFlagship = true` is used as the flagship; zero marked projects fall back to a fixed deterministic reference project; more than one marked project triggers a console warning (visible in development) and the same deterministic fallback, until the Notion data is corrected.*

---

## Local Development

```bash
cd portfolio-v2-react
npm install
npm run dev
```

Build di produzione:

```bash
cd portfolio-v2-react
npm run build
npm run preview
```

---

## Build & Deployment

Il deploy del frontend React è **manuale** (`workflow_dispatch`), gestito da `.github/workflows/deploy-react.yml`:

1. `npm ci` + `npm run build` genera `portfolio-v2-react/dist/`.
2. L'output del build viene copiato nella root del repository (servita da GitHub Pages), **escludendo esplicitamente** `data/`, `assets/cv/`, `assets/quaero/`, `images/`, i file di configurazione del repository (`package.json`, `.gitignore`, ecc.) e tutto ciò che appartiene alla pipeline di sync Notion/GitHub.
3. I bundle JS/CSS compilati da Vite vengono pubblicati in `assets/`, mantenendo intatti `assets/cv/` e `assets/quaero/`.
4. Se ci sono modifiche, il workflow esegue il commit e il push su `main` a nome di `github-actions[bot]`.

Questo approccio "non distruttivo" garantisce che un deploy del frontend non sovrascriva mai i dati live di Notion/GitHub, i CV, le immagini dei progetti o gli asset della pagina Quaero.

*The React frontend deploy is **manual** (`workflow_dispatch`), handled by `.github/workflows/deploy-react.yml`: `npm ci` + `npm run build` generates `portfolio-v2-react/dist/`; the build output is copied into the repository root (served by GitHub Pages), explicitly excluding `data/`, `assets/cv/`, `assets/quaero/`, `images/`, repository configuration files, and anything owned by the Notion/GitHub sync pipeline; the compiled Vite JS/CSS bundles are published to `assets/`, keeping `assets/cv/` and `assets/quaero/` intact; if there are changes, the workflow commits and pushes to `main` as `github-actions[bot]`. This non-destructive approach ensures a frontend deploy never overwrites live Notion/GitHub data, CVs, project images, or the Quaero page assets.*

---

## Links

- **Portfolio:** https://matteocavo.github.io
- **GitHub:** https://github.com/matteocavo
- **LinkedIn:** https://www.linkedin.com/in/matteo-cavo/
- **Notion Projects:** https://www.notion.so/Progetti-Data-Analysis-2cadbce01b3080249f63d8d47cb6e647
