import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve('assets');
fs.mkdirSync(OUT_DIR, { recursive: true });

const THEMES = {
  dark: {
    bgStart: '#07090F',
    bgEnd: '#0C1220',
    panelBg: '#0B101B',
    panelAlt: '#0E1525',
    border: '#1E293B',
    borderStrong: '#2A3950',
    grid: '#131C2E',
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    textDim: '#64748B',
    accent: '#2563EB',
    accentBright: '#60A5FA',
    accentSoft: 'rgba(37, 99, 235, 0.14)',
    accentBorder: 'rgba(59, 130, 246, 0.35)',
    pillBg: '#0F172A',
    crestFill: '#080C15',
    crestStroke: '#E2E8F0',
    glowOpacity: '0.24',
  },
  light: {
    bgStart: '#FFFFFF',
    bgEnd: '#F8FAFC',
    panelBg: '#FFFFFF',
    panelAlt: '#F8FAFC',
    border: '#E2E8F0',
    borderStrong: '#CBD5E1',
    grid: '#EFF4FB',
    text: '#0F172A',
    textMuted: '#475569',
    textDim: '#64748B',
    accent: '#1D4ED8',
    accentBright: '#2563EB',
    accentSoft: 'rgba(29, 78, 216, 0.08)',
    accentBorder: 'rgba(29, 78, 216, 0.28)',
    pillBg: '#EFF6FF',
    crestFill: '#F8FAFC',
    crestStroke: '#0F172A',
    glowOpacity: '0.12',
  },
};

const FONT_SANS = `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`;
const FONT_MONO = `'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace`;

function renderHero(themeName, t) {
  const isDark = themeName === 'dark';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="284" viewBox="0 0 1200 284" fill="none" role="img" aria-label="Andrés Felipe Guerra — Fullstack Software Engineer">
  <defs>
    <linearGradient id="heroBg" x1="0" y1="0" x2="1200" y2="284" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${t.bgStart}"/>
      <stop offset="100%" stop-color="${t.bgEnd}"/>
    </linearGradient>
    <linearGradient id="topEdge" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${t.border}" stop-opacity="0.2"/>
      <stop offset="50%" stop-color="${t.accentBright}" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="${t.border}" stop-opacity="0.2"/>
    </linearGradient>
    <radialGradient id="ambientGlow" cx="0.82" cy="0.46" r="0.38">
      <stop offset="0%" stop-color="${t.accent}" stop-opacity="${t.glowOpacity}"/>
      <stop offset="65%" stop-color="${t.accent}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="${t.accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="scanSweep" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${t.accentBright}" stop-opacity="0"/>
      <stop offset="50%" stop-color="${t.accentBright}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${t.accentBright}" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid60" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="${t.grid}" stroke-width="1"/>
    </pattern>
    <clipPath id="cardClip">
      <rect x="1" y="1" width="1198" height="282" rx="16"/>
    </clipPath>
    <style>
      .sans { font-family: ${FONT_SANS}; }
      .mono { font-family: ${FONT_MONO}; }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.45; transform: scale(0.88); }
      }
      @keyframes ring {
        0% { opacity: 0.65; transform: scale(1); }
        100% { opacity: 0; transform: scale(2.35); }
      }
      @keyframes sweep {
        0% { transform: translateX(-160px); }
        100% { transform: translateX(580px); }
      }
      .dotPulse { transform-box: fill-box; transform-origin: center; animation: pulse 2.6s ease-in-out infinite; }
      .ringPulse { transform-box: fill-box; transform-origin: center; animation: ring 2.6s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
      .beam { animation: sweep 5.2s ease-in-out infinite; }
    </style>
  </defs>

  <g clip-path="url(#cardClip)">
    <rect x="1" y="1" width="1198" height="282" rx="16" fill="url(#heroBg)"/>
    <rect x="1" y="1" width="1198" height="282" fill="url(#grid60)"/>
    <rect x="1" y="1" width="1198" height="282" fill="url(#ambientGlow)"/>

    <!-- Corner registration marks -->
    <path d="M 18 34 L 18 18 L 34 18" stroke="${t.accentBright}" stroke-width="1.5" stroke-opacity="0.55" fill="none"/>
    <path d="M 1166 18 L 1182 18 L 1182 34" stroke="${t.accentBright}" stroke-width="1.5" stroke-opacity="0.55" fill="none"/>
    <path d="M 18 250 L 18 266 L 34 266" stroke="${t.borderStrong}" stroke-width="1.5" fill="none"/>
    <path d="M 1166 266 L 1182 266 L 1182 250" stroke="${t.borderStrong}" stroke-width="1.5" fill="none"/>

    <!-- Top royal-blue specular hairline -->
    <line x1="80" y1="1.5" x2="1120" y2="1.5" stroke="url(#topEdge)" stroke-width="1.5"/>

    <!-- Left Editorial Column -->
    <g transform="translate(52, 46)">
      <!-- Eyebrow pill -->
      <rect x="0" y="0" width="328" height="28" rx="14" fill="${t.pillBg}" stroke="${t.accentBorder}" stroke-width="1"/>
      <circle cx="16" cy="14" r="4" fill="${t.accentBright}" class="ringPulse"/>
      <circle cx="16" cy="14" r="3.6" fill="${t.accentBright}" class="dotPulse"/>
      <text x="30" y="18.5" class="mono" font-size="11.5" font-weight="600" letter-spacing="1.2" fill="${t.accentBright}">AG ENGINEERING  ·  AVAILABLE 2026</text>

      <!-- Display Name -->
      <text x="0" y="84" class="sans" font-size="46" font-weight="700" letter-spacing="-1.3" fill="${t.text}">Andrés Felipe Guerra</text>

      <!-- Subtitle -->
      <text x="0" y="120" class="sans" font-size="18.5" font-weight="500" letter-spacing="-0.15" fill="${t.textMuted}">Fullstack Software Engineer  ·  AI Systems &amp; Security Automation</text>

      <!-- Structural laser hairline -->
      <g transform="translate(0, 148)">
        <rect x="0" y="0" width="540" height="2" rx="1" fill="${t.border}"/>
        <clipPath id="beamClip">
          <rect x="0" y="0" width="540" height="2" rx="1"/>
        </clipPath>
        <g clip-path="url(#beamClip)">
          <rect x="0" y="0" width="140" height="2" fill="url(#scanSweep)" class="beam"/>
        </g>
      </g>

      <!-- Metadata footer coordinates -->
      <text x="0" y="186" class="mono" font-size="11.5" font-weight="500" letter-spacing="0.5" fill="${t.textDim}">
        <tspan fill="${t.accentBright}" font-weight="600">LOC</tspan>  Bucaramanga, CO    <tspan fill="${t.borderStrong}">|</tspan>    <tspan fill="${t.accentBright}" font-weight="600">FOCUS</tspan>  RAG · DDD · CTI    <tspan fill="${t.borderStrong}">|</tspan>    <tspan fill="${t.accentBright}" font-weight="600">WEB</tspan>  portfolio.agengineering.workers.dev
      </text>
    </g>

    <!-- Right AG Architectural Monogram & System Node -->
    <g transform="translate(970, 142)">
      <!-- Subtle outer dashed orbit ring -->
      <circle cx="0" cy="0" r="88" stroke="${t.borderStrong}" stroke-width="1" stroke-dasharray="4 7" opacity="0.85">
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="42s" repeatCount="indefinite"/>
      </circle>
      <circle cx="0" cy="0" r="70" stroke="${t.accentBorder}" stroke-width="1.2" stroke-dasharray="38 14 10 14" opacity="0.9">
        <animateTransform attributeName="transform" type="rotate" from="360 0 0" to="0 0 0" dur="28s" repeatCount="indefinite"/>
      </circle>

      <!-- Octagonal Shield Core -->
      <polygon points="0,-54 46,-28 46,24 0,54 -46,24 -46,-28" fill="${t.crestFill}" stroke="${t.borderStrong}" stroke-width="1.5"/>
      <polygon points="0,-46 39,-23 39,20 0,46 -39,20 -39,-23" fill="none" stroke="${t.accent}" stroke-width="1.2" stroke-opacity="${isDark ? '0.65' : '0.45'}"/>

      <!-- Geometric AG Monogram inside Shield -->
      <!-- Stylised A -->
      <path d="M -22 16 L -8 -18 L 4 16 M -17 5 L -1 5" stroke="${t.crestStroke}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Stylised G -->
      <path d="M 24 -11 C 19 -17 10 -16 7 -8 L 7 7 C 7 15 17 18 24 12 L 24 2 L 15 2" stroke="${t.accentBright}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

      <!-- Precision crosshairs -->
      <line x1="-106" y1="0" x2="-92" y2="0" stroke="${t.borderStrong}" stroke-width="1"/>
      <line x1="92" y1="0" x2="106" y2="0" stroke="${t.borderStrong}" stroke-width="1"/>
      <circle cx="0" cy="-88" r="2.6" fill="${t.accentBright}"/>
      <circle cx="0" cy="88" r="2.2" fill="${t.borderStrong}"/>

      <text x="0" y="114" text-anchor="middle" class="mono" font-size="10.5" font-weight="600" letter-spacing="1.8" fill="${t.textDim}">SYSTEM ARCHITECTURE · 01</text>
    </g>
  </g>

  <rect x="1" y="1" width="1198" height="282" rx="16" stroke="${t.border}" stroke-width="1.2"/>
</svg>`;
}

function renderPillars(t) {
  const cards = [
    {
      idx: '01',
      title: 'AI Systems &amp; RAG',
      lines: [
        'Hybrid RRF search with pgvector',
        'Structured LLM flows (LCEL &amp; Pydantic)',
        'Multi-agent Computer Vision pipelines',
      ],
      tags: 'Python · LangChain · OpenAI · Gemini · Groq',
    },
    {
      idx: '02',
      title: 'Backend &amp; Architecture',
      lines: [
        'Hexagonal &amp; Domain-Driven Design',
        'Stateless JWT, RBAC &amp; OpenAPI contracts',
        'Multi-tenant SQL modeling &amp; triggers',
      ],
      tags: 'Java 17 · Spring Boot · FastAPI · PostgreSQL',
    },
    {
      idx: '03',
      title: 'Security &amp; Automation',
      lines: [
        'CTI correlation &amp; endpoint forensics',
        'Self-hosted WhatsApp &amp; n8n agents',
        'Production Docker &amp; Edge delivery',
      ],
      tags: 'OMEGA · MVT · Node.js · Baileys · Docker',
    },
  ];

  const panels = cards
    .map((c, i) => {
      const x = i * 408;
      return `
  <g transform="translate(${x}, 2)">
    <rect x="0.5" y="0.5" width="383" height="206" rx="14" fill="${t.panelBg}" stroke="${t.border}" stroke-width="1"/>
    <!-- Top accent bracket -->
    <path d="M 18 28 L 18 16 L 30 16" stroke="${t.accentBright}" stroke-width="1.4" stroke-opacity="0.7" fill="none"/>
    <rect x="278" y="16" width="84" height="22" rx="11" fill="${t.accentSoft}" stroke="${t.accentBorder}" stroke-width="1"/>
    <text x="320" y="30.5" text-anchor="middle" class="mono" font-size="10.5" font-weight="600" letter-spacing="1" fill="${t.accentBright}">INDEX ${c.idx}</text>

    <text x="24" y="64" class="sans" font-size="20" font-weight="700" letter-spacing="-0.4" fill="${t.text}">${c.title}</text>

    <circle cx="28" cy="92" r="2.2" fill="${t.accentBright}"/>
    <text x="40" y="96" class="sans" font-size="13.8" fill="${t.textMuted}">${c.lines[0]}</text>

    <circle cx="28" cy="117" r="2.2" fill="${t.accentBright}"/>
    <text x="40" y="121" class="sans" font-size="13.8" fill="${t.textMuted}">${c.lines[1]}</text>

    <circle cx="28" cy="142" r="2.2" fill="${t.accentBright}"/>
    <text x="40" y="146" class="sans" font-size="13.8" fill="${t.textMuted}">${c.lines[2]}</text>

    <line x1="24" y1="168" x2="359" y2="168" stroke="${t.border}" stroke-width="1"/>
    <text x="24" y="190" class="mono" font-size="11.5" font-weight="500" fill="${t.textDim}">${c.tags}</text>
  </g>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="212" viewBox="0 0 1200 212" fill="none" role="img" aria-label="Áreas de Especialización Técnica">
  <defs>
    <style>
      .sans { font-family: ${FONT_SANS}; }
      .mono { font-family: ${FONT_MONO}; }
    </style>
  </defs>
  ${panels}
</svg>`;
}

function renderFooter(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="64" viewBox="0 0 1200 64" fill="none" role="img" aria-label="AG Engineering Footer">
  <defs>
    <style>
      .mono { font-family: ${FONT_MONO}; }
    </style>
  </defs>
  <rect x="0.5" y="0.5" width="1199" height="63" rx="12" fill="${t.panelBg}" stroke="${t.border}" stroke-width="1"/>
  <circle cx="28" cy="32" r="3.5" fill="${t.accentBright}"/>
  <text x="42" y="36" class="mono" font-size="12" font-weight="600" letter-spacing="1.1" fill="${t.text}">ANDRÉS FELIPE GUERRA  <tspan fill="${t.textDim}">·  AG ENGINEERING</tspan></text>
  <text x="1172" y="36" text-anchor="end" class="mono" font-size="11.5" font-weight="500" letter-spacing="0.9" fill="${t.textDim}">BUCARAMANGA, COLOMBIA  ·  <tspan fill="${t.accentBright}">PORTFOLIO.AGENGINEERING.WORKERS.DEV</tspan></text>
</svg>`;
}

for (const [name, tokens] of Object.entries(THEMES)) {
  fs.writeFileSync(path.join(OUT_DIR, `hero-${name}.svg`), renderHero(name, tokens), 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, `pillars-${name}.svg`), renderPillars(tokens), 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, `footer-${name}.svg`), renderFooter(tokens), 'utf8');
}

console.log('Generated hero, pillars, and footer SVGs (dark + light) in ./assets/');

