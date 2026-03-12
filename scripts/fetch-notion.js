require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

function githubOgImage(githubUrl) {
  if (!githubUrl) return null;
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/?#]+)/);
  if (!match) return null;
  return `https://opengraph.githubassets.com/1/${match[1]}/${match[2]}`;
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function fetchProjects() {
  const response = await notion.dataSources.query({
    data_source_id: DATABASE_ID,
    filter: {
      property: 'Status',
      status: { equals: 'Portfolio Ready' }
    },
    sorts: [{ property: 'Date', direction: 'descending' }]
  });

  const projects = response.results.map(page => {
    const p = page.properties;
    return {
      id: page.id,
      title: p['Nome progetto']?.title?.[0]?.plain_text ?? '',
      businessGoal: p['Business Goal']?.rich_text?.[0]?.plain_text ?? '',
      tools: p['Tools']?.multi_select?.map(t => t.name) ?? [],
      keyKPIs: p['Key KPIs']?.multi_select?.map(k => k.name) ?? [],
      github: p['GitHub']?.url ?? null,
      dashboard: p['Dashboard / Output ']?.url ?? null,
      dataset: p['Dataset']?.rich_text?.[0]?.plain_text ?? '',
      date: p['Date']?.date?.start ?? null,
      notes: p['Notes / Insights']?.rich_text?.[0]?.plain_text ?? '',
      image: p['Cover URL']?.url ?? githubOgImage(p['GitHub']?.url ?? null)
    };
  });

  const outPath = path.join(__dirname, '../data/projects.json');
  fs.writeFileSync(outPath, JSON.stringify(projects, null, 2), 'utf8');
  console.log(`✓ ${projects.length} progetti scritti in data/projects.json`);
  projects.forEach(p => console.log(`  - ${p.title}`));
}

fetchProjects().catch(err => {
  console.error('Errore fetch Notion:', err.message);
  process.exit(1);
});
