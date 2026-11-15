import fs from 'node:fs';
import path from 'node:path';
import { GLASS_THEMES, esc, glassDefs, renderGlassSurface } from './glass-tokens.mjs';

const USERNAME = process.env.GITHUB_USERNAME || 'andresguerra321';
const TOKEN = process.env.GITHUB_TOKEN;

if (!TOKEN) {
  console.error('GITHUB_TOKEN environment variable is required');
  process.exit(1);
}

const QUERY = `
query($login: String!) {
  user(login: $login) {
    createdAt
    contributionsCollection {
      totalCommitContributions
      totalRepositoriesWithContributedCommits
      contributionCalendar {
        totalContributions
      }
    }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
      totalCount
      nodes {
        name
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node {
              name
            }
          }
        }
      }
    }
  }
}
`;

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

async function fetchTelemetry() {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'andresguerra321-profile-telemetry',
    },
    body: JSON.stringify({ query: QUERY, variables: { login: USERNAME } }),
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL error ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  const user = json.data.user;
  const langTotals = new Map();
  for (const repo of user.repositories.nodes) {
    for (const edge of repo.languages.edges) {
      const name = edge.node.name;
      langTotals.set(name, (langTotals.get(name) || 0) + edge.size);
    }
  }

  const totalBytes = Array.from(langTotals.values()).reduce((a, b) => a + b, 0) || 1;
  const sorted = Array.from(langTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({
      name,
      bytes,
      pct: (bytes / totalBytes) * 100,
    }));

  const topFive = sorted.slice(0, 5);
  const restBytes = sorted.slice(5).reduce((sum, item) => sum + item.bytes, 0);
  const languages =
    restBytes > 0
      ? [...topFive, { name: 'SQL · Shell · Docker', bytes: restBytes, pct: (restBytes / totalBytes) * 100 }]
      : topFive;

  return {
    sinceYear: new Date(user.createdAt).getUTCFullYear(),
    totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
    totalCommits: user.contributionsCollection.totalCommitContributions,
    activeRepos: user.contributionsCollection.totalRepositoriesWithContributedCommits,
    publicRepos: user.repositories.totalCount,
    languages,
    updatedDate: new Date().toISOString().slice(0, 10),
  };
}

function renderTelemetry(data, t) {
  const kpis = [
    { label: 'Contributions (12m)', value: data.totalContributions.toLocaleString('en-US') },
    { label: 'Commits Logged', value: data.totalCommits.toLocaleString('en-US') },
    { label: 'Public Repos', value: String(data.publicRepos) },
    { label: 'Active Repos', value: String(data.activeRepos) },
  ];

  const kpiCells = kpis
    .map((k, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 26 + col * 218;
      const y = 62 + row * 68;
      return `
    <g transform="translate(${x}, ${y})">
      <rect x="0.5" y="0.5" width="204" height="58" rx="14" fill="${t.tileBase}"/>
      <rect x="0.5" y="0.5" width="204" height="58" rx="14" fill="url(#telTileBg)" stroke="${t.pillStroke}" stroke-width="1"/>
      <line x1="16" y1="1.5" x2="188" y2="1.5" stroke="url(#telTopBevel)" stroke-width="1"/>
      <text x="15" y="21" class="sans" font-size="11" font-weight="500" fill="${t.textMuted}">${esc(k.label)}</text>
      <text x="15" y="46" class="display" font-size="22" font-weight="600" letter-spacing="-0.5" fill="${t.text}">${esc(k.value)}</text>
    </g>`;
    })
    .join('\n');

  const barW = 636;
  let cursorX = 0;
  const barSegments = data.languages
    .map((lang, i) => {
      const w = Math.max(4, Math.round((lang.pct / 100) * barW));
      const actualW = i === data.languages.length - 1 ? Math.max(4, barW - cursorX) : w;
      const seg = `<rect x="${cursorX}" y="0" width="${actualW}" height="8" fill="${t.swatches[i % t.swatches.length]}"/>`;
      cursorX += actualW;
      return seg;
    })
    .join('\n        ');

  const legendRows = data.languages
    .map((lang, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 26 + col * 324;
      const y = 92 + row * 39;
      const color = t.swatches[i % t.swatches.length];
      return `
    <g transform="translate(${x}, ${y})">
      <circle cx="5" cy="9.5" r="4" fill="${color}"/>
      <text x="18" y="13.5" class="sans" font-size="13.2" font-weight="500" fill="${t.text}">${esc(lang.name)}</text>
      <text x="235" y="13.5" text-anchor="end" class="mono" font-size="11.8" font-weight="600" fill="${t.accentText}">${lang.pct.toFixed(1)}%</text>
      <text x="304" y="13.5" text-anchor="end" class="mono" font-size="11" fill="${t.textMuted}">${esc(formatBytes(lang.bytes))}</text>
      <line x1="0" y1="26" x2="304" y2="26" stroke="${t.divider}" stroke-width="1"/>
    </g>`;
    })
    .join('\n');

  const leftCard = renderGlassSurface({
    x: 0,
    y: 2,
    w: 482,
    h: 244,
    rx: 20,
    prefix: 'tel',
    t,
    filterShadow: t.mode === 'light',
    inner: `
      <text x="26" y="36" class="display" font-size="15.5" font-weight="600" letter-spacing="-0.2" fill="${t.text}">GitHub Activity</text>
      <text x="456" y="36" text-anchor="end" class="mono" font-size="11.5" font-weight="500" fill="${t.textMuted}">Since ${data.sinceYear}</text>
      ${kpiCells}
      <text x="26" y="224" class="sans" font-size="11.5" fill="${t.textMuted}">Live GraphQL snapshot  ·  Updated ${esc(data.updatedDate)}</text>
    `,
  });

  const rightCard = renderGlassSurface({
    x: 504,
    y: 2,
    w: 696,
    h: 244,
    rx: 20,
    prefix: 'tel',
    t,
    filterShadow: t.mode === 'light',
    inner: `
      <text x="26" y="36" class="display" font-size="15.5" font-weight="600" letter-spacing="-0.2" fill="${t.text}">Codebase Distribution</text>
      <text x="670" y="36" text-anchor="end" class="mono" font-size="11.5" font-weight="500" fill="${t.textMuted}">${data.publicRepos} public repos</text>

      <g transform="translate(26, 58)">
        <rect x="0" y="0" width="636" height="8" rx="4" fill="${t.track}"/>
        <g clip-path="url(#barClip)">
          ${barSegments}
        </g>
      </g>

      ${legendRows}

      <text x="26" y="224" class="sans" font-size="11.5" fill="${t.textMuted}">Public non-fork repositories  ·  Restrained vector telemetry</text>
    `,
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="256" viewBox="0 0 1200 256" fill="none" role="img" aria-label="Telemetría de Ingeniería en GitHub de ${esc(USERNAME)}">
  <defs>
    ${glassDefs(t, 'tel')}
    <clipPath id="barClip">
      <rect x="0" y="0" width="636" height="8" rx="4"/>
    </clipPath>
  </defs>
  ${leftCard}
  ${rightCard}
</svg>`;
}

const data = await fetchTelemetry();
const outDir = path.resolve('assets/v5');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'telemetry-dark.svg'), renderTelemetry(data, GLASS_THEMES.dark), 'utf8');
fs.writeFileSync(path.join(outDir, 'telemetry-light.svg'), renderTelemetry(data, GLASS_THEMES.light), 'utf8');
console.log(
  'Generated Apple-Glass telemetry SVGs in ./assets/v5/:',
  JSON.stringify({
    totalContributions: data.totalContributions,
    totalCommits: data.totalCommits,
    publicRepos: data.publicRepos,
    activeRepos: data.activeRepos,
  })
);
