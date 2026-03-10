# Matteo Cavo — GitHub Pages Portfolio

Portfolio website for Matteo Cavo, Data & Business Intelligence Analyst.

Live at: **https://matteocavo.github.io**

## Features

- Dark minimal design
- Italian / English language toggle
- Featured projects section (manual)
- Automatic GitHub repository loading via GitHub API
- Recruiter-friendly structure, no build step required

## Automatic project loading

The site automatically loads public repositories tagged with the topic:

```
portfolio
```

## Recommended repository topics

Add these topics to your project repos so they appear in the portfolio:

```
portfolio  power-bi  sql  python  data-analysis  dashboard  open-data  music-data
```

## Updating featured projects

Edit `data/featured.js`:
- Set `link` to the real GitHub repo or dashboard URL
- Set `image` to the screenshot path (e.g. `"images/dataciviclab.png"`)

## Deploy

1. Create a GitHub repo named `matteocavo.github.io`
2. Push all files to the `main` branch
3. Go to Settings → Pages → Deploy from branch → `main` / `/ (root)`
4. Site will be live at `https://matteocavo.github.io`

## Project repo structure template

```
project-name/
├── README.md
├── images/
│   ├── cover.png
│   └── dashboard.png
├── data/
├── notebooks/
├── sql/
└── dashboard/
```
