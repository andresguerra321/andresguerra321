import fs from 'node:fs';
import path from 'node:path';
import {
  GLASS_THEMES,
  esc,
  glassDefs,
  measureLabelWidth,
  renderGlassSurface,
  renderPillRow,
} from './glass-tokens.mjs';

const OUT_DIR = path.resolve('assets/v5');
fs.mkdirSync(OUT_DIR, { recursive: true });

const ICONS = {
  globe: (c) =>
    `<circle cx="9" cy="9" r="6.8" stroke="${c}" stroke-width="1.5"/><ellipse cx="9" cy="9" rx="3" ry="6.8" stroke="${c}" stroke-width="1.3"/><line x1="2.4" y1="9" x2="15.6" y2="9" stroke="${c}" stroke-width="1.3"/>`,
  linkedin: (c) =>
    `<rect x="2.5" y="2.5" width="13" height="13" rx="3" stroke="${c}" stroke-width="1.5"/><circle cx="6.2" cy="6.2" r="0.9" fill="${c}"/><path d="M6.2 8.4V12.5M9.2 12.5V8.4M9.2 9.8C9.2 8.7 12.2 8.4 12.2 10.2V12.5" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  mail: (c) =>
    `<rect x="2.2" y="3.8" width="13.6" height="10.4" rx="2.2" stroke="${c}" stroke-width="1.5"/><path d="M3 5.2L9 9.6L15 5.2" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  briefcase: (c) =>
    `<rect x="2.4" y="5.4" width="13.2" height="9.4" rx="2.2" stroke="${c}" stroke-width="1.5"/><path d="M6.5 5.4V4C6.5 3.3 7 2.8 7.7 2.8H10.3C11 2.8 11.5 3.3 11.5 4V5.4" stroke="${c}" stroke-width="1.5"/>`,
  message: (c) =>
    `<path d="M9 2.6C5.3 2.6 2.5 5.1 2.5 8.2C2.5 9.6 3.1 10.9 4.1 11.9L3.3 14.8L6.4 13.7C7.2 14 8.1 14.2 9 14.2C12.7 14.2 15.5 11.5 15.5 8.2C15.5 5.1 12.7 2.6 9 2.6Z" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/>`,
  neural: (c) =>
    `<circle cx="9" cy="4.2" r="1.7" stroke="${c}" stroke-width="1.4"/><circle cx="4.3" cy="12.5" r="1.7" stroke="${c}" stroke-width="1.4"/><circle cx="13.7" cy="12.5" r="1.7" stroke="${c}" stroke-width="1.4"/><path d="M8.1 5.7L5.2 11M9.9 5.7L12.8 11M6 12.5H12" stroke="${c}" stroke-width="1.4" stroke-linecap="round"/>`,
  layers: (c) =>
    `<path d="M9 2.8L15.4 6.1L9 9.4L2.6 6.1L9 2.8Z" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/><path d="M2.6 9.3L9 12.6L15.4 9.3M2.6 12.4L9 15.7L15.4 12.4" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  shield: (c) =>
    `<path d="M9 2.5L14.5 4.8V8.8C14.5 12.1 12.1 14.6 9 15.6C5.9 14.6 3.5 12.1 3.5 8.8V4.8L9 2.5Z" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/><path d="M6.7 9.1L8.3 10.7L11.6 7.4" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  doc: (c) =>
    `<path d="M5 2.6H10.5L13.8 5.9V14.4C13.8 15 13.3 15.4 12.7 15.4H5C4.4 15.4 4 15 4 14.4V3.6C4 3 4.4 2.6 5 2.6Z" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/><path d="M10.2 2.8V6H13.5M6.3 9.4H11.5M6.3 12H9.8" stroke="${c}" stroke-width="1.4" stroke-linecap="round"/>`,
  eye: (c) =>
    `<path d="M2.4 9C3.9 5.9 6.3 4.4 9 4.4C11.7 4.4 14.1 5.9 15.6 9C14.1 12.1 11.7 13.6 9 13.6C6.3 13.6 3.9 12.1 2.4 9Z" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/><circle cx="9" cy="9" r="2.2" stroke="${c}" stroke-width="1.5"/>`,
  database: (c) =>
    `<ellipse cx="9" cy="4.8" rx="5.5" ry="2.1" stroke="${c}" stroke-width="1.5"/><path d="M3.5 4.8V13.2C3.5 14.4 5.9 15.3 9 15.3C12.1 15.3 14.5 14.4 14.5 13.2V4.8M3.5 9C3.5 10.2 5.9 11.1 9 11.1C12.1 11.1 14.5 10.2 14.5 9" stroke="${c}" stroke-width="1.5"/>`,
  terminal: (c) =>
    `<rect x="2.5" y="3.2" width="13" height="11.6" rx="2.5" stroke="${c}" stroke-width="1.5"/><path d="M5.6 7.2L7.8 9.1L5.6 11M9.1 11H12.2" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
};

function renderIconBadge(x, y, iconName, t, { size = 34, accent = true } = {}) {
  const strokeColor = accent ? t.accentText : t.text;
  const offset = (size - 18) / 2;
  return `
  <g transform="translate(${x}, ${y})">
    <rect x="0.5" y="0.5" width="${size - 1}" height="${size - 1}" rx="10" fill="${t.iconWellFill}" stroke="${t.iconWellStroke}" stroke-width="1"/>
    <g transform="translate(${offset}, ${offset})">
      ${ICONS[iconName](strokeColor)}
    </g>
  </g>`;
}

function renderHero(t) {
  const isDark = t.mode === 'dark';
  const baseStart = isDark ? '#061547' : '#EBF1FD';
  const baseMid = isDark ? '#0D2C8A' : '#F8FAFF';
  const baseEnd = isDark ? '#071B5B' : '#E6EEFC';
  const nameFill = isDark ? '#FFFFFF' : '#0B1F66';
  const rolePrimaryFill = isDark ? '#E0EBFF' : '#1E293B';
  const roleSecondaryFill = isDark ? '#93C5FD' : '#1D4ED8';
  const sheenOpacity = isDark ? '0.075' : '0.45';
  const frameStroke = isDark ? 'rgba(191, 219, 254, 0.18)' : 'rgba(29, 78, 216, 0.14)';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="236" viewBox="0 0 1200 236" fill="none" role="img" aria-label="Andrés Felipe Guerra — Fullstack Software Engineer">
  <defs>
    ${glassDefs(t, 'hero')}
    <linearGradient id="heroRoyalStage" x1="0" y1="0" x2="1200" y2="236" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${baseStart}"/>
      <stop offset="50%" stop-color="${baseMid}"/>
      <stop offset="100%" stop-color="${baseEnd}"/>
    </linearGradient>
    <linearGradient id="heroOpticalSheen" x1="160" y1="0" x2="980" y2="236" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="48%" stop-color="#FFFFFF" stop-opacity="${sheenOpacity}"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="heroOuterClip">
      <rect x="0.5" y="0.5" width="1199" height="235" rx="26"/>
    </clipPath>
  </defs>

  <g clip-path="url(#heroOuterClip)">
    <!-- Deep Royal Blue / Frosted Sapphire Stage -->
    <rect x="0" y="0" width="1200" height="236" fill="url(#heroRoyalStage)"/>

    <!-- Restrained internal glass refraction (Apple + Kowalski atmospheric depth) -->
    <g filter="url(#heroSoftBlur)" opacity="${isDark ? '0.38' : '0.20'}">
      <ellipse cx="600" cy="48" rx="340" ry="86" fill="${t.ambientSecondary}"/>
      <ellipse cx="320" cy="182" rx="240" ry="90" fill="${t.ambientPrimary}"/>
      <ellipse cx="890" cy="176" rx="240" ry="90" fill="${t.ambientPrimary}"/>
    </g>

    <!-- Recessed Inner Frosted Glass Lens (no icons, pure layered glass depth) -->
    <rect x="26.5" y="20.5" width="1147" height="195" rx="20" fill="${t.panelBase}" fill-opacity="${isDark ? '0.46' : '0.68'}" filter="url(#heroCardShadow)"/>
    <rect x="26.5" y="20.5" width="1147" height="195" rx="20" fill="url(#heroShellBg)"/>
    <rect x="26.5" y="20.5" width="1147" height="195" rx="20" fill="url(#heroOpticalSheen)"/>
    <rect x="26.5" y="20.5" width="1147" height="195" rx="20" stroke="${frameStroke}" stroke-width="1"/>
    <line x1="68" y1="21.5" x2="1132" y2="21.5" stroke="url(#heroTopBevel)" stroke-width="1"/>

    <!-- Pure Typographic Focal Block: Name + Position Only -->
    <text x="600" y="108" text-anchor="middle" class="display" font-size="52" font-weight="600" letter-spacing="-1.8" fill="${nameFill}">Andrés Felipe Guerra</text>
    <text x="600" y="148" text-anchor="middle" class="display" font-size="19.5" font-weight="500" letter-spacing="-0.25" fill="${rolePrimaryFill}">Fullstack Software Engineer  <tspan fill="${roleSecondaryFill}">·  AI Systems &amp; AppSec</tspan></text>
  </g>

  <!-- Crisp 1px Specular Rim + Top Light Bevel -->
  <rect x="0.5" y="0.5" width="1199" height="235" rx="26" stroke="url(#heroRimStroke)" stroke-width="1"/>
  <line x1="36" y1="1.5" x2="1164" y2="1.5" stroke="url(#heroTopBevel)" stroke-width="1"/>
</svg>`;
}

function renderActionButtons(t) {
  const buttons = [
    { slug: 'portfolio', label: 'Portfolio', icon: 'globe', width: 124, primary: true },
    { slug: 'linkedin', label: 'LinkedIn', icon: 'linkedin', width: 120, primary: false },
    { slug: 'email', label: 'Email', icon: 'mail', width: 100, primary: false },
    { slug: 'fiverr', label: 'Fiverr', icon: 'briefcase', width: 102, primary: false },
    { slug: 'whatsapp', label: 'WhatsApp', icon: 'message', width: 132, primary: false },
  ];

  const out = {};
  for (const btn of buttons) {
    const isPrimaryDark = btn.primary && t.mode === 'dark';
    const bgFill = isPrimaryDark ? 'rgba(29, 78, 216, 0.72)' : btn.primary ? t.pillAccentFill : t.panelBase;
    const strokeRef = isPrimaryDark ? 'rgba(191, 219, 254, 0.58)' : btn.primary ? t.pillAccentStroke : `url(#btnRimStroke)`;
    const iconColor = isPrimaryDark ? '#FFFFFF' : btn.primary ? t.accentText : t.textSecondary;
    const textColor = isPrimaryDark ? '#FFFFFF' : btn.primary ? t.accentText : t.text;
    out[btn.slug] = `<svg xmlns="http://www.w3.org/2000/svg" width="${btn.width}" height="38" viewBox="0 0 ${btn.width} 38" fill="none" role="img" aria-label="${esc(btn.label)}">
  <defs>
    ${glassDefs(t, 'btn')}
  </defs>
  <rect x="0.5" y="0.5" width="${btn.width - 1}" height="37" rx="19" fill="${t.panelBase}"/>
  ${btn.primary ? `<rect x="0.5" y="0.5" width="${btn.width - 1}" height="37" rx="19" fill="${bgFill}"/>` : `<rect x="0.5" y="0.5" width="${btn.width - 1}" height="37" rx="19" fill="url(#btnShellBg)"/>`}
  <rect x="0.5" y="0.5" width="${btn.width - 1}" height="37" rx="19" stroke="${strokeRef}" stroke-width="1"/>
  <line x1="18" y1="1.5" x2="${btn.width - 18}" y2="1.5" stroke="url(#btnTopBevel)" stroke-width="1"/>
  <g transform="translate(15, 10)">
    ${ICONS[btn.icon](iconColor)}
  </g>
  <text x="40" y="23.5" class="sans" font-size="13" font-weight="600" fill="${textColor}">${esc(btn.label)}</text>
</svg>`;
  }
  return out;
}

function renderPillars(t) {
  const pillars = [
    {
      icon: 'neural',
      title: 'AI Systems & RAG',
      lines: [
        'Búsqueda híbrida RRF sobre pgvector',
        'Flujos LLM tipados con Pydantic',
        'Pipelines multi-agente con visión',
      ],
      tags: ['Python', 'LangChain', 'OpenAI', 'Gemini'],
    },
    {
      icon: 'layers',
      title: 'Backend Architecture',
      lines: [
        'Arquitectura Hexagonal y DDD modular',
        'APIs stateless con JWT, RBAC y OpenAPI',
        'Esquemas multi-tenant en PostgreSQL',
      ],
      tags: ['Java 21', 'Spring Boot 3', 'FastAPI'],
    },
    {
      icon: 'shield',
      title: 'Security & Automation',
      lines: [
        'Correlación CTI y triaje forense MVT',
        'Agentes en WhatsApp y flujos n8n',
        'Entrega en Docker, Electron y Edge',
      ],
      tags: ['OMEGA', 'Node.js', 'Baileys', 'Docker'],
    },
  ];

  const panels = pillars
    .map((p, i) => {
      const x = i * 408;
      const linesSvg = p.lines
        .map(
          (line, idx) => `
      <circle cx="28" cy="${88 + idx * 24}" r="2.2" fill="${t.accentText}"/>
      <text x="40" y="${92 + idx * 24}" class="sans" font-size="13.2" font-weight="400" fill="${t.textSecondary}">${esc(line)}</text>`
        )
        .join('');

      return renderGlassSurface({
        x,
        y: 2,
        w: 384,
        h: 210,
        rx: 20,
        prefix: 'pil',
        t,
        filterShadow: t.mode === 'light',
        inner: `
          ${renderIconBadge(24, 22, p.icon, t, { size: 34, accent: true })}
          <text x="70" y="45" class="display" font-size="17.5" font-weight="600" letter-spacing="-0.3" fill="${t.text}">${esc(p.title)}</text>
          ${linesSvg}
          <line x1="24" y1="158" x2="360" y2="158" stroke="${t.divider}" stroke-width="1"/>
          ${renderPillRow(p.tags, t, { startX: 24, y: 170, height: 24, fontSize: 10.8, gap: 7 })}
        `,
      });
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="222" viewBox="0 0 1200 222" fill="none" role="img" aria-label="Especialidades de Ingeniería">
  <defs>
    ${glassDefs(t, 'pil')}
  </defs>
  ${panels}
</svg>`;
}

const FEATURED_PROJECTS = [
  {
    slug: 'omega',
    icon: 'shield',
    title: 'OMEGA',
    subtitle: 'Threat Intelligence & Forense',
    badge: 'v1.3.1 · Security',
    line1: 'Plataforma Zero-Retention con RAG híbrido (pgvector + RRF) para',
    line2: 'correlación CTI, triaje forense (MVT/iOS/ADB) y auditoría OSINT.',
    tags: ['Java 21', 'Spring Boot 3', 'FastAPI', 'pgvector', 'React 19', 'Electron'],
  },
  {
    slug: 'toolrent',
    icon: 'layers',
    title: 'ToolRent',
    subtitle: 'SaaS Industrial (DDD)',
    badge: 'Hexagonal · 8 Módulos',
    line1: 'Sistema empresarial de renta de maquinaria con Domain-Driven Design,',
    line2: 'PostgreSQL 16 en Cuarta Forma Normal (4FN), Flyway, JWT RBAC y SPA.',
    tags: ['Java 17', 'Spring Boot 3', 'PostgreSQL 16', 'Flyway', 'JWT', 'Vite'],
  },
  {
    slug: 'cv',
    icon: 'doc',
    title: 'CV Intelligence',
    subtitle: 'Analizador de Hojas de Vida IA',
    badge: 'LLM · Pydantic',
    line1: 'Motor de evaluación automatizada que contrasta currículos PDF frente',
    line2: 'a vacantes con extracción tipada en Pydantic y pipelines LangChain LCEL.',
    tags: ['Python 3.12', 'LangChain', 'Pydantic', 'OpenAI', 'Gemini', 'Streamlit'],
  },
  {
    slug: 'guardian',
    icon: 'eye',
    title: 'GUARDIAN',
    subtitle: 'Seguridad Vial Multi-Agente',
    badge: 'Computer Vision',
    line1: 'Sistema predictivo para transporte terrestre con visión computacional',
    line2: 'y tres agentes (Copiloto · Centinela · Oráculo) sobre Voxel51 FiftyOne.',
    tags: ['Python', 'Voxel51 FiftyOne', 'Gemini AI', 'Multi-Agent'],
  },
  {
    slug: 'wabot',
    icon: 'message',
    title: 'WA-Bot',
    subtitle: 'Agente Conversacional WhatsApp',
    badge: 'Self-Hosted 24/7',
    line1: 'Asistente IA para agendamiento y soporte continuo con memoria de',
    line2: 'sesión, botones interactivos y Groq/LLaMA sin tarifa por mensaje.',
    tags: ['Node.js', 'Baileys', 'Groq', 'LLaMA', 'Docker'],
  },
  {
    slug: 'postgres',
    icon: 'database',
    title: 'SST & PESV Multi-Tenant DB',
    subtitle: 'Arquitectura Relacional & Auditoría',
    badge: 'PostgreSQL · PHVA',
    line1: 'Base de datos aislada por tenant en PostgreSQL para gestión normativa',
    line2: 'SG-SST y PESV con concurrencia segura, triggers y vistas materializadas.',
    tags: ['PostgreSQL', 'PL/pgSQL', 'Multi-Tenant', 'Docker'],
  },
];

function renderProjectCard(proj, t) {
  const badgeW = measureLabelWidth(proj.badge, 10.8, true) + 22;
  const badgeX = 590 - 24 - badgeW;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="590" height="218" viewBox="0 0 590 218" fill="none" role="img" aria-label="${esc(proj.title)} — ${esc(proj.subtitle)}">
  <defs>
    ${glassDefs(t, 'proj')}
  </defs>
  ${renderGlassSurface({
    x: 0,
    y: 2,
    w: 590,
    h: 210,
    rx: 20,
    prefix: 'proj',
    t,
    filterShadow: t.mode === 'light',
    inner: `
      ${renderIconBadge(24, 22, proj.icon, t, { size: 38, accent: true })}
      <text x="74" y="39" class="display" font-size="18.5" font-weight="600" letter-spacing="-0.35" fill="${t.text}">${esc(proj.title)}</text>
      <text x="74" y="56" class="sans" font-size="12.2" font-weight="500" fill="${t.textMuted}">${esc(proj.subtitle)}</text>

      <!-- Top-Right Frosted Status Badge -->
      <rect x="${badgeX}" y="23" width="${badgeW}" height="24" rx="12" fill="${t.pillAccentFill}" stroke="${t.pillAccentStroke}" stroke-width="1"/>
      <text x="${badgeX + badgeW / 2}" y="38.5" text-anchor="middle" class="mono" font-size="10.5" font-weight="600" fill="${t.accentText}">${esc(proj.badge)}</text>

      <!-- Description -->
      <text x="24" y="96" class="sans" font-size="13.5" font-weight="400" fill="${t.textSecondary}">${esc(proj.line1)}</text>
      <text x="24" y="117" class="sans" font-size="13.5" font-weight="400" fill="${t.textSecondary}">${esc(proj.line2)}</text>

      <!-- Divider & Stack Pills -->
      <line x1="24" y1="144" x2="566" y2="144" stroke="${t.divider}" stroke-width="1"/>
      ${renderPillRow(proj.tags, t, { startX: 24, y: 159, height: 26, fontSize: 11, gap: 7 })}
    `,
  })}
</svg>`;
}

const MINI_PROJECTS = [
  {
    slug: 'tribuna',
    icon: 'terminal',
    title: 'Tribuna Global',
    summary: 'Análisis estructurado de sentimiento y suite anti Prompt Injection.',
    stack: 'Python · LangChain · Streamlit · Groq',
  },
  {
    slug: 'deliverybot',
    icon: 'message',
    title: 'DeliveryBot',
    summary: 'Orquestación automatizada de pedidos institucionales en tiempo real.',
    stack: 'n8n · Telegram Bot API · Python · Google Sheets',
  },
  {
    slug: 'hexagonal',
    icon: 'layers',
    title: 'Hexagonal Demo App',
    summary: 'Puertos, adaptadores, Abstract Factory y principios SOLID en Java.',
    stack: 'Java · JDBC · PostgreSQL · MySQL',
  },
  {
    slug: 'portfolio',
    icon: 'globe',
    title: 'AG Engineering Portfolio',
    summary: 'Sitio web oficial optimizado sobre infraestructura edge global.',
    stack: 'Cloudflare Workers · HTML · CSS · JavaScript',
  },
];

function renderMiniCard(item, t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="590" height="118" viewBox="0 0 590 118" fill="none" role="img" aria-label="${esc(item.title)}">
  <defs>
    ${glassDefs(t, 'mini')}
  </defs>
  ${renderGlassSurface({
    x: 0,
    y: 2,
    w: 590,
    h: 110,
    rx: 18,
    prefix: 'mini',
    t,
    filterShadow: t.mode === 'light',
    inner: `
      ${renderIconBadge(22, 20, item.icon, t, { size: 32, accent: false })}
      <text x="66" y="41" class="display" font-size="16" font-weight="600" letter-spacing="-0.25" fill="${t.text}">${esc(item.title)}</text>
      <text x="566" y="40" text-anchor="end" class="sans" font-size="14" font-weight="500" fill="${t.accentText}">&#8599;</text>
      <text x="22" y="72" class="sans" font-size="13" fill="${t.textSecondary}">${esc(item.summary)}</text>
      <text x="22" y="93" class="mono" font-size="11" font-weight="500" fill="${t.textMuted}">${esc(item.stack)}</text>
    `,
  })}
</svg>`;
}

const STACK_CATEGORIES = [
  {
    icon: 'database',
    title: 'Backend & Datos',
    chips: ['Python', 'Java 21', 'Spring Boot 3', 'FastAPI', 'Node.js', 'PostgreSQL 16', 'MySQL'],
  },
  {
    icon: 'layers',
    title: 'Frontend & Desktop',
    chips: ['React 19', 'JavaScript', 'Tailwind v4', 'Electron', 'Streamlit', 'HTML / CSS'],
  },
  {
    icon: 'neural',
    title: 'IA, RAG & Automatización',
    chips: ['LangChain', 'pgvector', 'OpenAI', 'Gemini', 'Pydantic', 'n8n', 'Baileys'],
  },
  {
    icon: 'terminal',
    title: 'Infraestructura & Calidad',
    chips: ['Docker', 'Nginx', 'Cloudflare Workers', 'Flyway', 'Git', 'Pytest'],
  },
];

function renderWrappedChips(chips, t, { startX = 24, startY = 66, maxInnerW = 540, chipH = 27, gapX = 8, gapY = 9 } = {}) {
  let cx = startX;
  let cy = startY;
  const elements = [];

  for (const label of chips) {
    const labelW = measureLabelWidth(label, 11.5, false);
    const chipW = labelW + 30; // dot + padding
    if (cx + chipW > startX + maxInnerW) {
      cx = startX;
      cy += chipH + gapY;
    }
    elements.push(`
    <g transform="translate(${cx}, ${cy})">
      <rect x="0" y="0" width="${chipW}" height="${chipH}" rx="8.5" fill="${t.pillFill}" stroke="${t.pillStroke}" stroke-width="1"/>
      <circle cx="11" cy="${chipH / 2}" r="2.3" fill="${t.accentText}"/>
      <text x="20" y="${chipH / 2 + 4}" class="sans" font-size="11.5" font-weight="500" fill="${t.text}">${esc(label)}</text>
    </g>`);
    cx += chipW + gapX;
  }

  return elements.join('');
}

function renderStackBento(t) {
  const quads = STACK_CATEGORIES.map((cat, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = col * 612;
    const y = 2 + row * 154;
    return renderGlassSurface({
      x,
      y,
      w: 588,
      h: 140,
      rx: 20,
      prefix: 'stk',
      t,
      filterShadow: t.mode === 'light',
      inner: `
        ${renderIconBadge(22, 18, cat.icon, t, { size: 30, accent: true })}
        <text x="62" y="38" class="display" font-size="15.5" font-weight="600" letter-spacing="-0.2" fill="${t.text}">${esc(cat.title)}</text>
        ${renderWrappedChips(cat.chips, t, { startX: 22, startY: 59, maxInnerW: 544 })}
      `,
    });
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="304" viewBox="0 0 1200 304" fill="none" role="img" aria-label="Stack Tecnológico">
  <defs>
    ${glassDefs(t, 'stk')}
  </defs>
  ${quads}
</svg>`;
}

function renderFooter(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="68" viewBox="0 0 1200 68" fill="none" role="img" aria-label="Andrés Felipe Guerra · AG Engineering">
  <defs>
    ${glassDefs(t, 'ftr')}
  </defs>
  ${renderGlassSurface({
    x: 0,
    y: 4,
    w: 1200,
    h: 58,
    rx: 18,
    prefix: 'ftr',
    t,
    filterShadow: t.mode === 'light',
    inner: `
      <text x="26" y="33" class="sans" font-size="13" font-weight="600" letter-spacing="-0.1" fill="${t.text}">Andrés Felipe Guerra  <tspan font-weight="400" fill="${t.textMuted}">·  AG Engineering  ·  Bucaramanga, Colombia</tspan></text>
      <text x="1174" y="33" text-anchor="end" class="sans" font-size="12.5" font-weight="600" fill="${t.accentText}">portfolio.agengineering.workers.dev  &#8599;</text>
    `,
  })}
</svg>`;
}

for (const [mode, t] of Object.entries(GLASS_THEMES)) {
  fs.writeFileSync(path.join(OUT_DIR, `hero-${mode}.svg`), renderHero(t), 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, `pillars-${mode}.svg`), renderPillars(t), 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, `stack-${mode}.svg`), renderStackBento(t), 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, `footer-${mode}.svg`), renderFooter(t), 'utf8');

  const buttons = renderActionButtons(t);
  for (const [slug, svg] of Object.entries(buttons)) {
    fs.writeFileSync(path.join(OUT_DIR, `btn-${slug}-${mode}.svg`), svg, 'utf8');
  }

  for (const proj of FEATURED_PROJECTS) {
    fs.writeFileSync(path.join(OUT_DIR, `proj-${proj.slug}-${mode}.svg`), renderProjectCard(proj, t), 'utf8');
  }

  for (const item of MINI_PROJECTS) {
    fs.writeFileSync(path.join(OUT_DIR, `mini-${item.slug}-${mode}.svg`), renderMiniCard(item, t), 'utf8');
  }
}

console.log('Generated Apple + Glassmorphism SVGs in ./assets/v5/');
