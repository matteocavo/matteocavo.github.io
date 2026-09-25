# Matteo Cavo — Data & Business Intelligence Analyst Portfolio

**Live:** https://matteocavo.github.io

---

## Chi sono / About

Professionista multidisciplinare con oltre 15 anni di esperienza internazionale tra progetti digitali, content operations, processi data-driven, analytics e sviluppo web.

Oggi opero come **Data & Business Intelligence Analyst**, con focus su Business Intelligence, data modeling, ETL, automazione dei workflow, data quality e data visualization, estendendo il mio percorso verso Statistical Analysis, Advanced Analytics e Applied Machine Learning.

Negli ultimi anni ho lavorato in un contesto enterprise presso **Gracenote (Nielsen)**, occupandomi di content operations e qualità dei metadata su cataloghi multimediali di grandi dimensioni per piattaforme internazionali come Netflix, Amazon Prime Video, Disney+ e Sky. L'esperienza in un ambiente fortemente data-driven, tra qualità del dato, data visualization, metriche di performance e processi su larga scala, ha rafforzato il mio interesse per il modo in cui i dati possono guidare sviluppo e decisioni. Da qui il passaggio naturale verso ETL, automazione e Business Intelligence.

---

*Multidisciplinary professional with 15+ years of international experience across digital projects, content operations, data-driven workflows, analytics, and web development.*

*Today I work as a **Data & Business Intelligence Analyst**, focusing on Business Intelligence, data modeling, ETL, workflow automation, data quality, and data visualization, while extending my analytical capabilities into Statistical Analysis, Advanced Analytics, and Applied Machine Learning.*

*In recent years, I worked in an enterprise environment at **Gracenote (Nielsen)**, focusing on content operations and metadata quality across large-scale media catalogs for international platforms including Netflix, Amazon Prime Video, Disney+, and Sky. Working in a strongly data-driven environment, where data quality, data visualization, performance metrics, and large-scale processes support ongoing development and operational decisions, strengthened my interest in how data can guide better decisions. This naturally led me toward ETL, workflow automation, and Business Intelligence.*

---

## Competenze / Skills

### Business Intelligence

`Power BI` · `DAX` · `Power Query` · `Data Modeling` · `KPI Design` · `Data Visualization` · `Data Storytelling`

### Data Engineering & Automation

`Python` · `SQL` · `ETL` · `APIs` · `RAW → CLEAN → MART` · `Data Quality` · `DuckDB` · `YAML` · `Git / GitHub` · `Workflow Automation` · `Reproducible Workflows`

### Statistical Analysis

`EDA` · `Descriptive Statistics` · `Statistical Analysis` · `Statistical Inference` · `Correlation Analysis` · `Hypothesis Testing`

### Advanced Analytics & Applied Machine Learning

`scikit-learn` · `Regression` · `Classification` · `Feature Engineering` · `Feature Selection` · `Cross-Validation` · `Model Evaluation` · `Decision Trees` · `Random Forest` · `Gradient Boosting / XGBoost` · `K-means`

---

## Certificazioni / Certifications

### Completed

- **Google Advanced Data Analytics Professional Certificate — 2026**
- **Google AI Professional Certificate — 2026**

### In progress

- **Microsoft PL-300 — Power BI Data Analyst**
- **Databricks Certified Data Engineer Associate**

---

## Portfolio architecture

Il portfolio è un sito statico in HTML/CSS/JavaScript vanilla, senza framework e con deploy diretto su GitHub Pages.

I contenuti dei progetti sono gestiti attraverso una pipeline dinamica:

**Notion → GitHub Actions → `data/projects.json` → Featured Projects**

Il database Notion è la source of truth per:

- project status;
- Business Goal IT / EN;
- Tools;
- Key KPIs;
- dataset;
- GitHub repository;
- dashboard / output;
- project metadata.

I progetti con `Status = Portfolio Ready` vengono sincronizzati automaticamente nel portfolio tramite il workflow `sync-notion.yml` (esecuzione oraria + trigger manuale).

La sezione **All Projects** utilizza invece:

**GitHub API → GitHub Actions → `data/github-repos.json` → All Projects**

Lo snapshot include i repository con topic `portfolio` e i pinned repository configurati nel profilo. La pagina legge solo il JSON locale: in questo modo il rendering pubblico non dipende dal rate limit delle API GitHub.

Il **Profile Snapshot / Project Stack Mix** viene calcolato dinamicamente dai Tools assegnati ai Featured Projects in Notion.

Le categorie attuali sono:

- Power BI
- SQL
- Python
- ETL / Automation
- Statistical Analysis
- Applied ML

I conteggi non sono hard-coded: quando i Tools di un progetto vengono aggiornati in Notion, il portfolio si aggiorna automaticamente al successivo sync. Le categorie senza progetti associati non vengono mostrate.

---

## Technical stack

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages
- GitHub API
- GitHub Actions
- Notion API
- Dynamic EN / IT localization
- Responsive layout
- Accessible navigation
- Scroll progress and reveal animations
- Dynamic SEO / structured data

---

## Links

- **Portfolio:** https://matteocavo.github.io
- **GitHub:** https://github.com/matteocavo
- **LinkedIn:** https://www.linkedin.com/in/matteo-cavo/
- **Notion Projects:** https://www.notion.so/Progetti-Data-Analysis-2cadbce01b3080249f63d8d47cb6e647
