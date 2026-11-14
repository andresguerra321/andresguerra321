import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve('assets/v3');
fs.mkdirSync(OUT_DIR, { recursive: true });

const sculpturePath = path.resolve('scripts/centerpiece-3d.jpg');
const sculptureB64 = fs.readFileSync(sculpturePath).toString('base64');

const THEMES = {
  dark: {
    surface: '#060709',
    card: '#111115',
    chipBg: '#121218',
    border: '#222229',
    chipBorder: '#2C2C36',
    divider: '#1D1D24',
    text: '#F5F5F7',
    textMuted: '#A1A1AA',
    textDim: '#71717A',
    accent: '#2563EB',
    accentText: '#60A5FA',
    pillBg: '#111116',
    pillBorder: '#25252E',
  },
  light: {
    surface: '#FFFFFF',
    card: '#F5F5F7',
    chipBg: '#121218',
    border: '#E5E5EA',
    chipBorder: '#2C2C36',
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

function renderHero(mode) {
  // Showcase canvas remains studio #060709 so the 3D obsidian & titanium sculpture integrates seamlessly,
  // using crisp Apple Pro framing in both dark and light GitHub themes.
  const outerBorder = mode === 'dark' ? '#23232B' : '#D2D2D7';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="336" viewBox="0 0 1200 336" fill="none" role="img" aria-label="Andrés Felipe Guerra — Fullstack Engineer &amp; AI Systems">
  <defs>
    <radialGradient id="sculptMaskGrad" cx="50%" cy="50%" r="50%">
      <stop offset="56%" stop-color="#FFFFFF" stop-opacity="1"/>
      <stop offset="86%" stop-color="#FFFFFF" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <mask id="sculptMask">
      <rect x="665" y="-12" width="490" height="366" fill="url(#sculptMaskGrad)"/>
    </mask>
    <clipPath id="heroFrame">
      <rect x="0.5" y="0.5" width="1199" height="335" rx="24"/>
    </clipPath>
    <style>
      .display { font-family: ${FONT_DISPLAY}; }
      .sans { font-family: ${FONT_TEXT}; }
      .mono { font-family: ${FONT_MONO}; }
      @keyframes breathe {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.42; }
      }
      @keyframes levitate {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-7px); }
      }
      @keyframes floatA {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      @keyframes floatB {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(5px); }
      }
      .liveDot { animation: breathe 3.2s ease-in-out infinite; }
      .sculptFloat { animation: levitate 7s ease-in-out infinite; }
      .chipFloatA { animation: floatA 5.8s ease-in-out infinite; }
      .chipFloatB { animation: floatB 6.4s ease-in-out infinite; }
    </style>
  </defs>

  <g clip-path="url(#heroFrame)">
    <!-- Match corner #060709 of studio 3D render cleanly -->
    <rect x="0" y="0" width="1200" height="336" fill="#060709"/>

    <!-- Subtle orbital guide arc behind 3D prism -->
    <g transform="translate(918, 168)">
      <ellipse cx="0" cy="0" rx="210" ry="96" transform="rotate(-18)" stroke="#1C2230" stroke-width="1" stroke-dasharray="5 9" opacity="0.7"/>
      <circle cx="0" cy="0" r="148" stroke="#2563EB" stroke-opacity="0.22" stroke-width="1" stroke-dasharray="70 190">
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="40s" repeatCount="indefinite"/>
      </circle>
    </g>

    <!-- Studio 3D Apple Titanium & Royal-Blue Centerpiece -->
    <g class="sculptFloat">
      <image href="data:image/jpeg;base64,${sculptureB64}" x="665" y="-12" width="490" height="366" preserveAspectRatio="xMidYMid meet" mask="url(#sculptMask)"/>
    </g>

    <!-- Floating Apple Callout Chip A -->
    <g transform="translate(652, 46)">
      <g class="chipFloatA">
        <rect x="0" y="0" width="174" height="48" rx="14" fill="#111116" fill-opacity="0.94" stroke="#282832" stroke-width="1"/>
        <circle cx="17" cy="18" r="3.5" fill="#60A5FA" class="liveDot"/>
        <text x="29" y="21.5" class="sans" font-size="12" font-weight="600" fill="#F5F5F7">AI &amp; Hybrid RAG</text>
        <text x="17" y="38" class="mono" font-size="10" font-weight="500" fill="#8E8E98">pgvector · FastAPI</text>
      </g>
    </g>

    <!-- Floating Apple Callout Chip B -->
    <g transform="translate(996, 240)">
      <g class="chipFloatB">
        <rect x="0" y="0" width="170" height="54" rx="14" fill="#111116" fill-opacity="0.94" stroke="#282832" stroke-width="1"/>
        <text x="16" y="25" class="display" font-size="17" font-weight="700" fill="#F5F5F7">793</text>
        <text x="53" y="24" class="sans" font-size="11" font-weight="500" fill="#A1A1AA">Contribs</text>
        <text x="16" y="42" class="mono" font-size="10" font-weight="500" fill="#60A5FA">37 Public Repos</text>
        <!-- Crisp 4-bar Apple activity micro sparkline -->
        <rect x="128" y="21" width="4" height="10" rx="2" fill="#1E3A8A"/>
        <rect x="135" y="16" width="4" height="15" rx="2" fill="#2563EB"/>
        <rect x="142" y="19" width="4" height="12" rx="2" fill="#3B82F6"/>
        <rect x="149" y="12" width="4" height="19" rx="2" fill="#60A5FA"/>
      </g>
    </g>

    <!-- Left Editorial Column -->
    <g transform="translate(54, 44)">
      <!-- Availability Pill -->
      <rect x="0" y="0" width="224" height="28" rx="14" fill="#111116" stroke="#262630" stroke-width="1"/>
      <circle cx="15" cy="14" r="3.5" fill="#60A5FA" class="liveDot"/>
      <text x="27" y="18" class="sans" font-size="12" font-weight="500" fill="#A1A1AA">AG Engineering  ·  Colombia</text>

      <!-- Display Name -->
      <text x="0" y="88" class="display" font-size="50" font-weight="600" letter-spacing="-1.6" fill="#F5F5F7">Andrés Felipe Guerra</text>

      <!-- Keynote Statement -->
      <text x="0" y="126" class="display" font-size="21" font-weight="500" letter-spacing="-0.3" fill="#E4E4E7">Fullstack Engineer.  <tspan fill="#60A5FA">AI Systems &amp; Security.</tspan></text>

      <!-- Supporting Subcopy -->
      <text x="0" y="160" class="sans" font-size="14.5" font-weight="400" fill="#8E8E98">Architecting RAG intelligence, Hexagonal backends &amp; forensic tooling.</text>

      <!-- Bottom Apple Spec Dock -->
      <g transform="translate(0, 194)">
        <rect x="0" y="0" width="600" height="52" rx="15" fill="#101014" stroke="#22222A" stroke-width="1"/>

        <text x="18" y="21" class="sans" font-size="10.5" font-weight="500" fill="#71717A">Core Stack</text>
        <text x="18" y="39" class="sans" font-size="13" font-weight="600" fill="#F5F5F7">Python · Java · React</text>

        <line x1="184" y1="11" x2="184" y2="41" stroke="#22222A" stroke-width="1"/>

        <text x="202" y="21" class="sans" font-size="10.5" font-weight="500" fill="#71717A">Architecture</text>
        <text x="202" y="39" class="sans" font-size="13" font-weight="600" fill="#F5F5F7">DDD · RAG · Docker</text>

        <line x1="354" y1="11" x2="354" y2="41" stroke="#22222A" stroke-width="1"/>

        <text x="372" y="21" class="sans" font-size="10.5" font-weight="500" fill="#71717A">Portfolio</text>
        <text x="372" y="39" class="sans" font-size="12.5" font-weight="600" fill="#60A5FA">portfolio.agengineering.workers.dev</text>
      </g>
    </g>
  </g>

  <rect x="0.5" y="0.5" width="1199" height="335" rx="24" stroke="${outerBorder}" stroke-width="1"/>
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
  fs.writeFileSync(path.join(OUT_DIR, `hero-${name}.svg`), renderHero(name), 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, `pillars-${name}.svg`), renderPillars(tokens), 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, `footer-${name}.svg`), renderFooter(tokens), 'utf8');
}

console.log('Generated 3D Apple-minimal SVGs in ./assets/v3/');
