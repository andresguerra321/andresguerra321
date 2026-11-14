import fs from 'node:fs';
import path from 'node:path';

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

const THEMES = {
  dark: {
    card: '#121216',
    tile: '#18181D',
    border: '#232329',
    divider: '#1D1D22',
    text: '#F5F5F7',
    textMuted: '#A1A1AA',
    textDim: '#71717A',
    accentText: '#60A5FA',
    track: '#1D1D24',
    swatches: ['#2563EB', '#60A5FA', '#93C5FD', '#D4D4D8', '#71717A', '#3F3F46'],
  },
  light: {
    card: '#F5F5F7',
    tile: '#FFFFFF',
    border: '#E5E5EA',
    divider: '#E5E5EA',
    text: '#1D1D1F',
    textMuted: '#515154',
    textDim: '#86868B',
    accentText: '#1D4ED8',
    track: '#E5E5EA',
    swatches: ['#1D4ED8', '#3B82F6', '#60A5FA', '#3F3F46', '#71717A', '#A1A1AA'],
  },
};

const FONT_DISPLAY = `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif`;
const FONT_TEXT = `-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif`;
const FONT_MONO = `'SF Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace`;

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

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
  const languages = restBytes > 0
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
      const y = 64 + row * 68;
      return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="204" height="58" rx="12" fill="${t.tile}" stroke="${t.border}" stroke-width="1"/>
      <text x="14" y="21" class="sans" font-size="11" font-weight="500" fill="${t.textDim}">${esc(k.label)}</text>
      <text x="14" y="46" class="display" font-size="22" font-weight="600" letter-spacing="-0.5" fill="${t.text}">${esc(k.value)}</text>
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
      const x = 26 + col * 322;
      const y = 92 + row * 38;
      const color = t.swatches[i % t.swatches.length];
      return `
    <g transform="translate(${x}, ${y})">
      <circle cx="5" cy="9.5" r="4" fill="${color}"/>
      <text x="18" y="13.5" class="sans" font-size="13.5" font-weight="500" fill="${t.text}">${esc(lang.name)}</text>
      <text x="235" y="13.5" text-anchor="end" class="mono" font-size="12" font-weight="600" fill="${t.accentText}">${lang.pct.toFixed(1)}%</text>
      <text x="304" y="13.5" text-anchor="end" class="mono" font-size="11" fill="${t.textDim}">${esc(formatBytes(lang.bytes))}</text>
      <line x1="0" y1="26" x2="304" y2="26" stroke="${t.divider}" stroke-width="1"/>
    </g>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="248" viewBox="0 0 1200 248" fill="none" role="img" aria-label="Telemetría de Ingeniería en GitHub de ${esc(USERNAME)}">
  <defs>
    <clipPath id="barClip">
      <rect x="0" y="0" width="636" height="8" rx="4"/>
    </clipPath>
    <style>
      .display { font-family: ${FONT_DISPLAY}; }
      .sans { font-family: ${FONT_TEXT}; }
      .mono { font-family: ${FONT_MONO}; }
    </style>
  </defs>

  <!-- Left Panel: GitHub Activity -->
  <g transform="translate(0, 2)">
    <rect x="0.5" y="0.5" width="481" height="243" rx="18" fill="${t.card}" stroke="${t.border}" stroke-width="1"/>
    <text x="26" y="36" class="display" font-size="15" font-weight="600" letter-spacing="-0.2" fill="${t.text}">GitHub Activity</text>
    <text x="455" y="36" text-anchor="end" class="sans" font-size="12" font-weight="500" fill="${t.textDim}">Since ${data.sinceYear}</text>

    ${kpiCells}

    <text x="26" y="224" class="sans" font-size="11.5" fill="${t.textDim}">Live GraphQL snapshot  ·  Updated ${esc(data.updatedDate)}</text>
  </g>

  <!-- Right Panel: Language Distribution -->
  <g transform="translate(504, 2)">
    <rect x="0.5" y="0.5" width="695" height="243" rx="18" fill="${t.card}" stroke="${t.border}" stroke-width="1"/>
    <text x="26" y="36" class="display" font-size="15" font-weight="600" letter-spacing="-0.2" fill="${t.text}">Codebase Distribution</text>
    <text x="668" y="36" text-anchor="end" class="sans" font-size="12" font-weight="500" fill="${t.textDim}">${data.publicRepos} public repositories</text>

    <!-- Segmented Bar -->
    <g transform="translate(26, 56)">
      <rect x="0" y="0" width="636" height="8" rx="4" fill="${t.track}"/>
      <g clip-path="url(#barClip)">
        ${barSegments}
      </g>
    </g>

    ${legendRows}

    <text x="26" y="224" class="sans" font-size="11.5" fill="${t.textDim}">Public non-fork repositories  ·  Native vector telemetry</text>
  </g>
</svg>`;
}

const data = await fetchTelemetry();
const outDir = path.resolve('assets');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'telemetry-dark.svg'), renderTelemetry(data, THEMES.dark), 'utf8');
fs.writeFileSync(path.join(outDir, 'telemetry-light.svg'), renderTelemetry(data, THEMES.light), 'utf8');
console.log('Generated Apple-minimal telemetry SVGs:', JSON.stringify({
  totalContributions: data.totalContributions,
  totalCommits: data.totalCommits,
  publicRepos: data.publicRepos,
  activeRepos: data.activeRepos,
}));
