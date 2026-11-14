import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve('assets/apple');
fs.mkdirSync(OUT_DIR, { recursive: true });

const THEMES = {
  dark: {
    surface: '#09090B',
    card: '#111114',
    tile: '#16161A',
    border: '#222228',
    divider: '#1C1C22',
    text: '#F5F5F7',
    textMuted: '#A1A1AA',
    textDim: '#71717A',
    accent: '#2563EB',
    accentText: '#60A5FA',
    pillBg: '#141418',
    pillBorder: '#27272E',
  },
  light: {
    surface: '#FFFFFF',
    card: '#F5F5F7',
    tile: '#FFFFFF',
    border: '#E5E5EA',
    divider: '#E5E5EA',
    text: '#1D1D1F',
    textMuted: '#515154',
    textDim: '#86868B',
    accent: '#1D4ED8',
    accentText: '#1D4ED8',
    pillBg: '#F5F5F7',
    pillBorder: '#D2D2D7',
  },
};

const FONT_DISPLAY = `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif`;
const FONT_TEXT = `-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif`;
const FONT_MONO = `'SF Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace`;

function renderHero(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="276" viewBox="0 0 1200 276" fill="none" role="img" aria-label="Andrés Felipe Guerra — Fullstack Engineer">
  <defs>
    <style>
      .display { font-family: ${FONT_DISPLAY}; }
      .sans { font-family: ${FONT_TEXT}; }
      .mono { font-family: ${FONT_MONO}; }
      @keyframes breathe {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      .liveDot { animation: breathe 3.4s ease-in-out infinite; }
    </style>
  </defs>

  <!-- Flat Apple Surface (zero gradients, zero mesh/glow) -->
  <rect x="0.5" y="0.5" width="1199" height="275" rx="24" fill="${t.surface}" stroke="${t.border}" stroke-width="1"/>

  <!-- Left Apple Editorial Stack -->
  <g transform="translate(56, 44)">
    <!-- Minimal Status Pill -->
    <rect x="0" y="0" width="218" height="28" rx="14" fill="${t.pillBg}" stroke="${t.pillBorder}" stroke-width="1"/>
    <circle cx="15" cy="14" r="3.5" fill="${t.accentText}" class="liveDot"/>
    <text x="27" y="18" class="sans" font-size="12" font-weight="500" fill="${t.textMuted}">Available  ·  Colombia</text>

    <!-- Command Headline -->
    <text x="0" y="84" class="display" font-size="50" font-weight="600" letter-spacing="-1.6" fill="${t.text}">Andrés Felipe Guerra</text>

    <!-- Apple Two-Tone Tagline -->
    <text x="0" y="122" class="display" font-size="21" font-weight="500" letter-spacing="-0.3" fill="${t.textMuted}">Fullstack Software Engineer.  <tspan fill="${t.accentText}">AI Systems &amp; Security.</tspan></text>

    <!-- Clean Apple Spec Bar -->
    <g transform="translate(0, 150)">
      <rect x="0" y="0" width="840" height="46" rx="14" fill="${t.card}" stroke="${t.border}" stroke-width="1"/>

      <text x="20" y="19" class="sans" font-size="10.5" font-weight="500" fill="${t.textDim}">Focus</text>
      <text x="20" y="36" class="sans" font-size="13" font-weight="600" fill="${t.text}">Hybrid RAG · DDD · CTI</text>

      <line x1="250" y1="10" x2="250" y2="36" stroke="${t.divider}" stroke-width="1"/>

      <text x="272" y="19" class="sans" font-size="10.5" font-weight="500" fill="${t.textDim}">Core Stack</text>
      <text x="272" y="36" class="sans" font-size="13" font-weight="600" fill="${t.text}">Python · Java · React · SQL</text>

      <line x1="538" y1="10" x2="538" y2="36" stroke="${t.divider}" stroke-width="1"/>

      <text x="560" y="19" class="sans" font-size="10.5" font-weight="500" fill="${t.textDim}">Portfolio</text>
      <text x="560" y="36" class="sans" font-size="13" font-weight="600" fill="${t.accentText}">portfolio.agengineering.workers.dev</text>
    </g>
  </g>

  <!-- Right Minimal Apple Squircle Monogram Tile -->
  <g transform="translate(972, 62)">
    <rect x="0.5" y="0.5" width="152" height="152" rx="36" fill="${t.card}" stroke="${t.border}" stroke-width="1"/>
    <rect x="60" y="18" width="32" height="3" rx="1.5" fill="${t.accent}"/>
    <text x="76" y="94" text-anchor="middle" class="display" font-size="52" font-weight="700" letter-spacing="-2.4" fill="${t.text}">AG<tspan fill="${t.accentText}">.</tspan></text>
    <text x="76" y="124" text-anchor="middle" class="sans" font-size="11" font-weight="500" letter-spacing="0.4" fill="${t.textDim}">Engineering</text>
  </g>
</svg>`;
}

function renderPillars(t) {
  const cards = [
    {
      idx: '01',
      title: 'AI Systems &amp; RAG',
      lines: [
        'Hybrid RRF search over pgvector',
        'Structured LLM flows with Pydantic',
        'Multi-agent Computer Vision pipelines',
      ],
      tags: 'Python · LangChain · OpenAI · Gemini',
    },
    {
      idx: '02',
      title: 'Backend Architecture',
      lines: [
        'Hexagonal &amp; Domain-Driven Design',
        'Stateless JWT, RBAC &amp; OpenAPI APIs',
        'Multi-tenant SQL schemas &amp; triggers',
      ],
      tags: 'Java 17 · Spring Boot · FastAPI · PostgreSQL',
    },
    {
      idx: '03',
      title: 'Security &amp; Automation',
      lines: [
        'CTI correlation &amp; endpoint forensics',
        'Autonomous WhatsApp &amp; n8n workflows',
        'Containerized Docker &amp; Edge delivery',
      ],
      tags: 'OMEGA · MVT · Node.js · Baileys · Docker',
    },
  ];

  const panels = cards
    .map((c, i) => {
      const x = i * 408;
      return `
  <g transform="translate(${x}, 2)">
    <rect x="0.5" y="0.5" width="383" height="206" rx="18" fill="${t.card}" stroke="${t.border}" stroke-width="1"/>
    <text x="26" y="34" class="mono" font-size="11.5" font-weight="600" letter-spacing="1" fill="${t.accentText}">${c.idx}</text>
    <text x="26" y="64" class="display" font-size="20" font-weight="600" letter-spacing="-0.45" fill="${t.text}">${c.title}</text>

    <circle cx="30" cy="94" r="2.2" fill="${t.accentText}"/>
    <text x="42" y="98" class="sans" font-size="13.8" font-weight="400" fill="${t.textMuted}">${c.lines[0]}</text>

    <circle cx="30" cy="119" r="2.2" fill="${t.accentText}"/>
    <text x="42" y="123" class="sans" font-size="13.8" font-weight="400" fill="${t.textMuted}">${c.lines[1]}</text>

    <circle cx="30" cy="144" r="2.2" fill="${t.accentText}"/>
    <text x="42" y="148" class="sans" font-size="13.8" font-weight="400" fill="${t.textMuted}">${c.lines[2]}</text>

    <line x1="26" y1="169" x2="357" y2="169" stroke="${t.divider}" stroke-width="1"/>
    <text x="26" y="191" class="sans" font-size="12" font-weight="500" fill="${t.textDim}">${c.tags}</text>
  </g>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="212" viewBox="0 0 1200 212" fill="none" role="img" aria-label="Áreas de Especialización Técnica">
  <defs>
    <style>
      .display { font-family: ${FONT_DISPLAY}; }
      .sans { font-family: ${FONT_TEXT}; }
      .mono { font-family: ${FONT_MONO}; }
    </style>
  </defs>
  ${panels}
</svg>`;
}

function renderFooter(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="60" viewBox="0 0 1200 60" fill="none" role="img" aria-label="AG Engineering">
  <defs>
    <style>
      .sans { font-family: ${FONT_TEXT}; }
    </style>
  </defs>
  <rect x="0.5" y="0.5" width="1199" height="59" rx="16" fill="${t.card}" stroke="${t.border}" stroke-width="1"/>
  <text x="28" y="34.5" class="sans" font-size="13" font-weight="600" letter-spacing="-0.1" fill="${t.text}">Andrés Felipe Guerra  <tspan font-weight="400" fill="${t.textDim}">·  AG Engineering</tspan></text>
  <text x="1172" y="34.5" text-anchor="end" class="sans" font-size="12.5" font-weight="500" fill="${t.accentText}">portfolio.agengineering.workers.dev</text>
</svg>`;
}

for (const [name, tokens] of Object.entries(THEMES)) {
  fs.writeFileSync(path.join(OUT_DIR, `hero-${name}.svg`), renderHero(tokens), 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, `pillars-${name}.svg`), renderPillars(tokens), 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, `footer-${name}.svg`), renderFooter(tokens), 'utf8');
}

console.log('Generated Apple-minimal SVGs in ./assets/apple/');
