import fs from 'node:fs';
import path from 'node:path';
import {
  GLASS_THEMES,
  SECURITY_THEMES,
  esc,
  glassDefs,
  renderGlassSurface,
} from './glass-tokens.mjs';

const OUT_DIR = path.resolve('assets/v7');
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
  layers: (c) =>
    `<path d="M9 2.8L15.4 6.1L9 9.4L2.6 6.1L9 2.8Z" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/><path d="M2.6 9.3L9 12.6L15.4 9.3M2.6 12.4L9 15.7L15.4 12.4" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  doc: (c) =>
    `<path d="M5 2.6H10.5L13.8 5.9V14.4C13.8 15 13.3 15.4 12.7 15.4H5C4.4 15.4 4 15 4 14.4V3.6C4 3 4.4 2.6 5 2.6Z" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/><path d="M10.2 2.8V6H13.5M6.3 9.4H11.5M6.3 12H9.8" stroke="${c}" stroke-width="1.4" stroke-linecap="round"/>`,
  eye: (c) =>
    `<path d="M2.4 9C3.9 5.9 6.3 4.4 9 4.4C11.7 4.4 14.1 5.9 15.6 9C14.1 12.1 11.7 13.6 9 13.6C6.3 13.6 3.9 12.1 2.4 9Z" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/><circle cx="9" cy="9" r="2.2" stroke="${c}" stroke-width="1.5"/>`,
};

function renderIconBadge(x, y, iconName, t, { size = 34, accentStroke, wellFill, wellStroke } = {}) {
  const strokeColor = accentStroke || t.accentText;
  const fill = wellFill || t.iconWellFill;
  const stroke = wellStroke || t.iconWellStroke;
  const offset = (size - 18) / 2;
  return `
  <g transform="translate(${x}, ${y})">
    <rect x="0.5" y="0.5" width="${size - 1}" height="${size - 1}" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="1"/>
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
  const roleSecondaryFill = isDark ? '#6EE7B7' : '#047857';
  const sheenOpacity = isDark ? '0.07' : '0.45';
  const frameStroke = isDark ? 'rgba(191, 219, 254, 0.18)' : 'rgba(29, 78, 216, 0.14)';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="196" viewBox="0 0 1200 196" fill="none" role="img" aria-label="Andrés Felipe Guerra — Fullstack Software Engineer">
  <defs>
    ${glassDefs(t, 'hero')}
    <linearGradient id="heroRoyalStage" x1="0" y1="0" x2="1200" y2="196" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${baseStart}"/>
      <stop offset="50%" stop-color="${baseMid}"/>
      <stop offset="100%" stop-color="${baseEnd}"/>
    </linearGradient>
    <linearGradient id="heroOpticalSheen" x1="160" y1="0" x2="980" y2="196" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="48%" stop-color="#FFFFFF" stop-opacity="${sheenOpacity}"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="heroOuterClip">
      <rect x="0.5" y="0.5" width="1199" height="195" rx="24"/>
    </clipPath>
  </defs>

  <g clip-path="url(#heroOuterClip)">
    <rect x="0" y="0" width="1200" height="196" fill="url(#heroRoyalStage)"/>

    <g filter="url(#heroSoftBlur)" opacity="${isDark ? '0.34' : '0.18'}">
      <ellipse cx="600" cy="40" rx="340" ry="76" fill="${t.ambientSecondary}"/>
      <ellipse cx="320" cy="160" rx="240" ry="80" fill="${t.ambientPrimary}"/>
      <ellipse cx="890" cy="154" rx="240" ry="80" fill="${t.ambientPrimary}"/>
    </g>

    <rect x="26.5" y="18.5" width="1147" height="159" rx="18" fill="${t.panelBase}" fill-opacity="${isDark ? '0.46' : '0.68'}" filter="url(#heroCardShadow)"/>
    <rect x="26.5" y="18.5" width="1147" height="159" rx="18" fill="url(#heroShellBg)"/>
    <rect x="26.5" y="18.5" width="1147" height="159" rx="18" fill="url(#heroOpticalSheen)"/>
    <rect x="26.5" y="18.5" width="1147" height="159" rx="18" stroke="${frameStroke}" stroke-width="1"/>
    <line x1="68" y1="19.5" x2="1132" y2="19.5" stroke="url(#heroTopBevel)" stroke-width="1"/>

    <text x="600" y="92" text-anchor="middle" class="display" font-size="48" font-weight="600" letter-spacing="-1.65" fill="${nameFill}">Andrés Felipe Guerra</text>
    <text x="600" y="131" text-anchor="middle" class="display" font-size="19.5" font-weight="500" letter-spacing="-0.25" fill="${rolePrimaryFill}">Fullstack Software Engineer  <tspan fill="${roleSecondaryFill}">·  AI Systems &amp; AppSec</tspan></text>
  </g>

  <rect x="0.5" y="0.5" width="1199" height="195" rx="24" stroke="url(#heroRimStroke)" stroke-width="1"/>
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

const SECONDARY_PROJECTS = [
  {
    slug: 'guardian',
    icon: 'eye',
    security: true,
    title: 'GUARDIAN',
    subtitle: 'Seguridad Vial Multi-Agente',
    line1: 'Predice riesgos en transporte terrestre',
    line2: 'con 3 agentes (Copiloto, Centinela,',
    line3: 'Oráculo) sobre Voxel51 FiftyOne.',
    meta: 'Python · FiftyOne · Gemini AI',
  },
  {
    slug: 'cv',
    icon: 'doc',
    security: false,
    title: 'CV Intelligence',
    subtitle: 'Evaluador de Hojas de Vida',
    line1: 'Contrasta currículums PDF frente a',
    line2: 'vacantes con extracción estructurada',
    line3: 'y scoring reproducible en Pydantic.',
    meta: 'Python 3.12 · LangChain · Pydantic',
  },
  {
    slug: 'toolrent',
    icon: 'layers',
    security: false,
    title: 'ToolRent',
    subtitle: 'SaaS Industrial (DDD)',
    line1: 'Renta de maquinaria organizada en 8',
    line2: 'módulos Maven, esquema PostgreSQL 4FN',
    line3: 'con Flyway, JWT RBAC y SPA en Vite.',
    meta: 'Java 17 · Spring Boot 3 · PostgreSQL',
  },
];

function renderSecondaryCard(proj, t, sec) {
  const accentColor = proj.security ? sec.accentText : t.accentText;
  const wellFill = proj.security ? sec.iconWellFill : t.iconWellFill;
  const wellStroke = proj.security ? sec.iconWellStroke : t.iconWellStroke;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="386" height="190" viewBox="0 0 386 190" fill="none" role="img" aria-label="${esc(proj.title)} — ${esc(proj.subtitle)}">
  <defs>
    ${glassDefs(t, 'sec')}
  </defs>
  ${renderGlassSurface({
    x: 0,
    y: 2,
    w: 386,
    h: 184,
    rx: 18,
    prefix: 'sec',
    t,
    filterShadow: t.mode === 'light',
    inner: `
      ${renderIconBadge(20, 18, proj.icon, t, { size: 34, accentStroke: accentColor, wellFill, wellStroke })}
      <text x="64" y="34" class="display" font-size="18" font-weight="600" letter-spacing="-0.3" fill="${t.text}">${esc(proj.title)}</text>
      <text x="64" y="51" class="sans" font-size="12.5" font-weight="500" fill="${proj.security ? accentColor : t.textMuted}">${esc(proj.subtitle)}</text>

      <line x1="20" y1="68" x2="366" y2="68" stroke="${t.divider}" stroke-width="1"/>

      <text x="20" y="92" class="sans" font-size="14" font-weight="400" fill="${t.textSecondary}">${esc(proj.line1)}</text>
      <text x="20" y="112" class="sans" font-size="14" font-weight="400" fill="${t.textSecondary}">${esc(proj.line2)}</text>
      <text x="20" y="132" class="sans" font-size="14" font-weight="400" fill="${t.textSecondary}">${esc(proj.line3)}</text>

      <text x="20" y="164" class="mono" font-size="11.8" font-weight="500" fill="${accentColor}">${esc(proj.meta)}</text>
      <text x="366" y="164" text-anchor="end" class="sans" font-size="13.5" font-weight="600" fill="${accentColor}">&#8599;</text>
    `,
  })}
</svg>`;
}

/**
 * Generates an honest, metric-free dark-mode architecture diagram SVG to be rasterized
 * as ./assets/omega-screenshot.png (without any invented numbers or fake UI metrics).
 */
export function renderOmegaDiagramSource() {
  const sec = SECURITY_THEMES.dark;
  const nodeFill = '#0A233A';
  const nodeStroke = 'rgba(110, 231, 183, 0.24)';
  const gatewayFill = '#0D2C47';
  const gatewayStroke = 'rgba(52, 211, 153, 0.44)';
  const chipBg = 'rgba(16, 185, 129, 0.14)';
  const arrowStroke = '#34D399';
  const innerRowBg = 'rgba(4, 18, 33, 0.50)';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="328" viewBox="0 0 1200 328" fill="none" role="img" aria-label="Diagrama de arquitectura Zero-Retention de OMEGA">
  <defs>
    ${glassDefs(sec, 'omg')}
    <clipPath id="omgClip">
      <rect x="0.5" y="2.5" width="1199" height="323" rx="22"/>
    </clipPath>
    <marker id="secArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 1 1 L 9 5 L 1 9 z" fill="${arrowStroke}"/>
    </marker>
  </defs>

  ${renderGlassSurface({
    x: 0,
    y: 2,
    w: 1200,
    h: 324,
    rx: 22,
    prefix: 'omg',
    t: sec,
    filterShadow: false,
    inner: `
      <g clip-path="url(#omgClip)">
        <g filter="url(#omgSoftBlur)" opacity="0.22">
          <circle cx="210" cy="70" r="140" fill="${sec.ambientPrimary}"/>
          <circle cx="960" cy="250" r="150" fill="${sec.ambientSecondary}"/>
        </g>
      </g>

      <circle cx="34" cy="34" r="5" fill="${sec.accent}"/>
      <circle cx="34" cy="34" r="9" fill="${sec.accent}" fill-opacity="0.18"/>
      <text x="54" y="39" class="display" font-size="16" font-weight="600" letter-spacing="-0.25" fill="${sec.text}">Arquitectura Zero-Retention · Segregación de Redes Docker</text>
      <text x="54" y="57" class="sans" font-size="12.2" fill="${sec.textMuted}">Flujo entre cliente híbrido, gateway Spring Boot y worker forense sin exposición pública</text>

      <rect x="1032" y="24" width="140" height="26" rx="13" fill="${sec.pillAccentFill}" stroke="${sec.pillAccentStroke}" stroke-width="1"/>
      <text x="1102" y="40.5" text-anchor="middle" class="mono" font-size="11" font-weight="600" fill="${sec.accentText}">v1.3.1 · Security</text>

      <line x1="28" y1="74" x2="1172" y2="74" stroke="${sec.divider}" stroke-width="1"/>

      <!-- Zone 1: Client Web / Desktop -->
      <g transform="translate(28, 92)">
        <rect x="0.5" y="0.5" width="268" height="206" rx="16" fill="${nodeFill}" stroke="${nodeStroke}" stroke-width="1"/>
        <rect x="0.5" y="0.5" width="268" height="206" rx="16" fill="url(#omgTileBg)"/>
        <line x1="20" y1="1.5" x2="248" y2="1.5" stroke="url(#omgTopBevel)" stroke-width="1"/>

        <rect x="18" y="18" width="114" height="21" rx="10.5" fill="${chipBg}"/>
        <text x="75" y="32" text-anchor="middle" class="mono" font-size="10.2" font-weight="600" fill="${sec.accentText}">CLIENTE HÍBRIDO</text>

        <text x="18" y="66" class="display" font-size="16.5" font-weight="600" letter-spacing="-0.25" fill="${sec.text}">React 19 + Electron</text>
        <text x="18" y="90" class="sans" font-size="12.5" fill="${sec.textSecondary}">Cabina de postura y consultas</text>
        <text x="18" y="108" class="sans" font-size="12.5" fill="${sec.textSecondary}">CTI con trazabilidad documental.</text>

        <rect x="18" y="128" width="232" height="58" rx="10" fill="${innerRowBg}" stroke="${sec.divider}" stroke-width="1"/>
        <text x="30" y="149" class="sans" font-size="11.8" font-weight="600" fill="${sec.text}">Canal IPC local</text>
        <text x="30" y="168" class="mono" font-size="10.8" fill="${sec.textMuted}">Windows · ADB · iOS (RAM)</text>
      </g>

      <line x1="300" y1="195" x2="348" y2="195" stroke="${arrowStroke}" stroke-width="1.8" marker-end="url(#secArrow)"/>
      <text x="324" y="183" text-anchor="middle" class="mono" font-size="10" font-weight="600" fill="${sec.accentText}">JWT</text>

      <!-- Zone 2: Java Zero-Retention Gateway -->
      <g transform="translate(356, 92)">
        <rect x="0.5" y="0.5" width="434" height="206" rx="16" fill="${gatewayFill}" stroke="${gatewayStroke}" stroke-width="1.2"/>
        <rect x="0.5" y="0.5" width="434" height="206" rx="16" fill="url(#omgTileBg)"/>
        <line x1="22" y1="1.5" x2="412" y2="1.5" stroke="url(#omgTopBevel)" stroke-width="1"/>

        <rect x="18" y="18" width="160" height="21" rx="10.5" fill="${sec.pillAccentFill}" stroke="${sec.pillAccentStroke}" stroke-width="1"/>
        <text x="98" y="32" text-anchor="middle" class="mono" font-size="10.2" font-weight="600" fill="${sec.accentText}">OMEGA-PUBLIC · :8080</text>
        <text x="416" y="32" text-anchor="end" class="mono" font-size="10.8" font-weight="600" fill="${sec.textMuted}">Spring Boot 3 · Java 21</text>

        <rect x="18" y="54" width="398" height="42" rx="10" fill="${innerRowBg}" stroke="${sec.divider}" stroke-width="1"/>
        <text x="30" y="71" class="sans" font-size="12.2" font-weight="600" fill="${sec.text}">Ingesta Zero-Retention (tmpfs)</text>
        <text x="30" y="87" class="sans" font-size="11.2" fill="${sec.textMuted}">PDFBox AST, OCR y limpieza física en finally</text>

        <rect x="18" y="102" width="398" height="42" rx="10" fill="${innerRowBg}" stroke="${sec.divider}" stroke-width="1"/>
        <text x="30" y="119" class="sans" font-size="12.2" font-weight="600" fill="${sec.text}">Motor RAG Híbrido + STIX 2.1</text>
        <text x="30" y="135" class="sans" font-size="11.2" fill="${sec.textMuted}">Búsqueda RRF (pgvector + tsvector) por tenant</text>

        <rect x="18" y="150" width="398" height="42" rx="10" fill="${innerRowBg}" stroke="${sec.divider}" stroke-width="1"/>
        <text x="30" y="167" class="sans" font-size="12.2" font-weight="600" fill="${sec.text}">Guardrails &amp; Auditoría SHA-256</text>
        <text x="30" y="183" class="sans" font-size="11.2" fill="${sec.textMuted}">RBAC, anti-IDOR, anti-Zip-Slip y audit_logs</text>
      </g>

      <path d="M 792 147 L 842 147" stroke="${arrowStroke}" stroke-width="1.8" marker-end="url(#secArrow)"/>
      <text x="817" y="135" text-anchor="middle" class="mono" font-size="9.5" font-weight="600" fill="${sec.accentText}">Token</text>

      <path d="M 792 243 L 842 243" stroke="${arrowStroke}" stroke-width="1.8" marker-end="url(#secArrow)"/>
      <text x="817" y="231" text-anchor="middle" class="mono" font-size="9.5" font-weight="600" fill="${sec.accentText}">HNSW</text>

      <!-- Zone 3: Isolated Private Network -->
      <g transform="translate(850, 92)">
        <rect x="0.5" y="0.5" width="322" height="96" rx="15" fill="${nodeFill}" stroke="${nodeStroke}" stroke-width="1"/>
        <rect x="0.5" y="0.5" width="322" height="96" rx="15" fill="url(#omgTileBg)"/>
        <text x="16" y="24" class="mono" font-size="10" font-weight="600" fill="${sec.accentText}">OMEGA-PRIVATE · SIN PUERTOS</text>
        <text x="16" y="46" class="display" font-size="14.8" font-weight="600" fill="${sec.text}">Worker Forense FastAPI</text>
        <text x="16" y="65" class="sans" font-size="11.8" fill="${sec.textSecondary}">Triaje MVT, YARA, iOS/ADB y OSINT en RAM</text>
        <text x="16" y="83" class="mono" font-size="10.5" fill="${sec.textMuted}">Middleware X-Internal-Service-Token</text>

        <rect x="0.5" y="110.5" width="322" height="96" rx="15" fill="${nodeFill}" stroke="${nodeStroke}" stroke-width="1"/>
        <rect x="0.5" y="110.5" width="322" height="96" rx="15" fill="url(#omgTileBg)"/>
        <text x="16" y="134" class="mono" font-size="10" font-weight="600" fill="${sec.accentText}">PERSISTENCIA AISLADA</text>
        <text x="16" y="156" class="display" font-size="14.8" font-weight="600" fill="${sec.text}">PostgreSQL 16 + pgvector</text>
        <text x="16" y="175" class="sans" font-size="11.8" fill="${sec.textSecondary}">Índices HNSW + GIN y catálogo STIX 2.1</text>
        <text x="16" y="193" class="mono" font-size="10.5" fill="${sec.textMuted}">Aislamiento por tenant_id (Flyway)</text>
      </g>
    `,
  })}
</svg>`;
}

for (const [mode, t] of Object.entries(GLASS_THEMES)) {
  const sec = SECURITY_THEMES[mode];
  fs.writeFileSync(path.join(OUT_DIR, `hero-${mode}.svg`), renderHero(t), 'utf8');

  const buttons = renderActionButtons(t);
  for (const [slug, svg] of Object.entries(buttons)) {
    fs.writeFileSync(path.join(OUT_DIR, `btn-${slug}-${mode}.svg`), svg, 'utf8');
  }

  for (const proj of SECONDARY_PROJECTS) {
    fs.writeFileSync(path.join(OUT_DIR, `sec-${proj.slug}-${mode}.svg`), renderSecondaryCard(proj, t, sec), 'utf8');
  }
}

console.log('Generated v7 SVGs (hero, buttons, secondary cards) in ./assets/v7/');
