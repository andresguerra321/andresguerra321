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
    bg: '#0B101B',
    card: '#0F1626',
    border: '#1E293B',
    borderSoft: '#162033',
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    textDim: '#64748B',
    accent: '#2563EB',
    accentBright: '#60A5FA',
    accentSoft: 'rgba(37, 99, 235, 0.14)',
    accentBorder: 'rgba(59, 130, 246, 0.35)',
    track: '#162033',
    swatches: ['#2563EB', '#60A5FA', '#818CF8', '#CBD5E1', '#38BDF8', '#64748B'],
  },
  light: {
    bg: '#FFFFFF',
    card: '#F8FAFC',
    border: '#E2E8F0',
    borderSoft: '#EDF2F7',
    text: '#0F172A',
    textMuted: '#475569',
    textDim: '#64748B',
    accent: '#1D4ED8',
    accentBright: '#2563EB',
    accentSoft: 'rgba(29, 78, 216, 0.08)',
    accentBorder: 'rgba(29, 78, 216, 0.28)',
    track: '#E2E8F0',
    swatches: ['#1D4ED8', '#3B82F6', '#4F46E5', '#334155', '#0284C7', '#94A3B8'],
  },
};

const FONT_SANS = `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`;
const FONT_MONO = `'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace`;

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
    { label: 'CONTRIBUTIONS (12M)', value: data.totalContributions.toLocaleString('en-US') },
    { label: 'COMMITS LOGGED', value: data.totalCommits.toLocaleString('en-US') },
    { label: 'PUBLIC REPOS', value: String(data.publicRepos) },
    { label: 'REPOS CONTRIBUTED', value: String(data.activeRepos) },
  ];

  const kpiCells = kpis
    .map((k, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 24 + col * 218;
      const y = 66 + row * 68;
      return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="204" height="58" rx="10" fill="${t.card}" stroke="${t.borderSoft}" stroke-width="1"/>
      <text x="14" y="21" class="mono" font-size="9.5" font-weight="600" letter-spacing="0.9" fill="${t.textDim}">${esc(k.label)}</text>
      <text x="14" y="45" class="sans" font-size="22" font-weight="700" letter-spacing="-0.5" fill="${t.text}">${esc(k.value)}</text>
    </g>`;
    })
    .join('\n');

  // Stacked language bar (width = 636px)
  const barW = 636;
  let cursorX = 0;
  const barSegments = data.languages
    .map((lang, i) => {
      const w = Math.max(4, Math.round((lang.pct / 100) * barW));
      const actualW = i === data.languages.length - 1 ? Math.max(4, barW - cursorX) : w;
      const seg = `<rect x="${cursorX}" y="0" width="${actualW}" height="10" fill="${t.swatches[i % t.swatches.length]}"/>`;
      cursorX += actualW;
      return seg;
    })
    .join('\n        ');

  // 2-column legend rows (3 rows x 2 cols)
  const legendRows = data.languages
    .map((lang, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 24 + col * 324;
      const y = 94 + row * 38;
      const color = t.swatches[i % t.swatches.length];
      return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="5" width="9" height="9" rx="2.5" fill="${color}"/>
      <text x="18" y="14" class="sans" font-size="13.5" font-weight="600" fill="${t.text}">${esc(lang.name)}</text>
      <text x="235" y="14" text-anchor="end" class="mono" font-size="12" font-weight="600" fill="${t.accentBright}">${lang.pct.toFixed(1)}%</text>
      <text x="306" y="14" text-anchor="end" class="mono" font-size="11" fill="${t.textDim}">${esc(formatBytes(lang.bytes))}</text>
      <line x1="0" y1="26" x2="306" y2="26" stroke="${t.borderSoft}" stroke-width="1"/>
    </g>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="248" viewBox="0 0 1200 248" fill="none" role="img" aria-label="Telemetría de Ingeniería en GitHub de ${esc(USERNAME)}">
  <defs>
    <clipPath id="barClip">
      <rect x="0" y="0" width="636" height="10" rx="5"/>
    </clipPath>
    <style>
      .sans { font-family: ${FONT_SANS}; }
      .mono { font-family: ${FONT_MONO}; }
    </style>
  </defs>

  <!-- Left Panel: GitHub Activity -->
  <g transform="translate(0, 2)">
    <rect x="0.5" y="0.5" width="479" height="243" rx="14" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
    <text x="24" y="34" class="mono" font-size="11.5" font-weight="600" letter-spacing="1.2" fill="${t.accentBright}">01  ·  GITHUB ACTIVITY</text>
    <rect x="374" y="18" width="82" height="22" rx="11" fill="${t.accentSoft}" stroke="${t.accentBorder}" stroke-width="1"/>
    <text x="415" y="32.5" text-anchor="middle" class="mono" font-size="10" font-weight="600" fill="${t.accentBright}">SINCE ${data.sinceYear}</text>

    ${kpiCells}

    <text x="24" y="224" class="mono" font-size="10.5" fill="${t.textDim}">GraphQL verified  ·  @${esc(USERNAME)}  ·  Updated ${esc(data.updatedDate)}</text>
  </g>

  <!-- Right Panel: Language Distribution -->
  <g transform="translate(504, 2)">
    <rect x="0.5" y="0.5" width="695" height="243" rx="14" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
    <text x="24" y="34" class="mono" font-size="11.5" font-weight="600" letter-spacing="1.2" fill="${t.accentBright}">02  ·  CODEBASE DISTRIBUTION (PUBLIC REPOS)</text>
    <text x="670" y="34" text-anchor="end" class="mono" font-size="10.5" fill="${t.textDim}">${data.publicRepos} REPOSITORIES</text>

    <!-- Stacked Progress Bar -->
    <g transform="translate(24, 56)">
      <rect x="0" y="0" width="636" height="10" rx="5" fill="${t.track}"/>
      <g clip-path="url(#barClip)">
        ${barSegments}
      </g>
    </g>

    ${legendRows}

    <text x="24" y="224" class="mono" font-size="10.5" fill="${t.textDim}">Computed via GitHub GraphQL · Zero external proxy dependencies</text>
  </g>
</svg>`;
}

const data = await fetchTelemetry();
const outDir = path.resolve('assets');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'telemetry-dark.svg'), renderTelemetry(data, THEMES.dark), 'utf8');
fs.writeFileSync(path.join(outDir, 'telemetry-light.svg'), renderTelemetry(data, THEMES.light), 'utf8');
console.log('Generated telemetry-dark.svg and telemetry-light.svg:', JSON.stringify({
  totalContributions: data.totalContributions,
  totalCommits: data.totalCommits,
  publicRepos: data.publicRepos,
  activeRepos: data.activeRepos,
  topLanguages: data.languages.map((l) => `${l.name}:${l.pct.toFixed(1)}%`),
}));

