import fs from 'node:fs';
import path from 'node:path';
import {
  GLASS_THEMES,
  SECURITY_THEMES,
  esc,
  glassDefs,
  renderGlassSurface,
} from './glass-tokens.mjs';

const OUT_DIR = path.resolve('assets/v6');
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

function renderIconBadge(x, y, iconName, t, { size = 32, accent = true } = {}) {
  const strokeColor = accent ? t.accentText : t.text;
  const offset = (size - 18) / 2;
  return `
  <g transform="translate(${x}, ${y})">
    <rect x="0.5" y="0.5" width="${size - 1}" height="${size - 1}" rx="9" fill="${t.iconWellFill}" stroke="${t.iconWellStroke}" stroke-width="1"/>
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
  const pitchFill = isDark ? '#DCE7FF' : '#334155';
  const sheenOpacity = isDark ? '0.07' : '0.45';
  const frameStroke = isDark ? 'rgba(191, 219, 254, 0.18)' : 'rgba(29, 78, 216, 0.14)';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="258" viewBox="0 0 1200 258" fill="none" role="img" aria-label="Andrés Felipe Guerra — Fullstack Software Engineer">
  <defs>
    ${glassDefs(t, 'hero')}
    <linearGradient id="heroRoyalStage" x1="0" y1="0" x2="1200" y2="258" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${baseStart}"/>
      <stop offset="50%" stop-color="${baseMid}"/>
      <stop offset="100%" stop-color="${baseEnd}"/>
    </linearGradient>
    <linearGradient id="heroOpticalSheen" x1="160" y1="0" x2="980" y2="258" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="48%" stop-color="#FFFFFF" stop-opacity="${sheenOpacity}"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="heroOuterClip">
      <rect x="0.5" y="0.5" width="1199" height="257" rx="26"/>
    </clipPath>
  </defs>

  <g clip-path="url(#heroOuterClip)">
    <rect x="0" y="0" width="1200" height="258" fill="url(#heroRoyalStage)"/>

    <g filter="url(#heroSoftBlur)" opacity="${isDark ? '0.38' : '0.20'}">
      <ellipse cx="600" cy="48" rx="340" ry="86" fill="${t.ambientSecondary}"/>
      <ellipse cx="320" cy="198" rx="240" ry="90" fill="${t.ambientPrimary}"/>
      <ellipse cx="890" cy="192" rx="240" ry="90" fill="${t.ambientPrimary}"/>
    </g>

    <rect x="26.5" y="20.5" width="1147" height="217" rx="20" fill="${t.panelBase}" fill-opacity="${isDark ? '0.46' : '0.68'}" filter="url(#heroCardShadow)"/>
    <rect x="26.5" y="20.5" width="1147" height="217" rx="20" fill="url(#heroShellBg)"/>
    <rect x="26.5" y="20.5" width="1147" height="217" rx="20" fill="url(#heroOpticalSheen)"/>
    <rect x="26.5" y="20.5" width="1147" height="217" rx="20" stroke="${frameStroke}" stroke-width="1"/>
    <line x1="68" y1="21.5" x2="1132" y2="21.5" stroke="url(#heroTopBevel)" stroke-width="1"/>

    <!-- Zero icons: Name, Role, and concrete Problem-Solving Statement -->
    <text x="600" y="96" text-anchor="middle" class="display" font-size="50" font-weight="600" letter-spacing="-1.75" fill="${nameFill}">Andrés Felipe Guerra</text>
    <text x="600" y="135" text-anchor="middle" class="display" font-size="19.5" font-weight="500" letter-spacing="-0.25" fill="${rolePrimaryFill}">Fullstack Software Engineer  <tspan fill="${roleSecondaryFill}">·  AI Systems &amp; AppSec</tspan></text>
    <text x="600" y="177" text-anchor="middle" class="sans" font-size="15.2" font-weight="400" fill="${pitchFill}">Construyo motores RAG con citas verificables, análisis forense Zero-Retention y backends multi-tenant.</text>
  </g>

  <rect x="0.5" y="0.5" width="1199" height="257" rx="26" stroke="url(#heroRimStroke)" stroke-width="1"/>
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

function renderOmegaArchitecture(sec) {
  const isDark = sec.mode === 'dark';
  const nodeFill = isDark ? '#0A233A' : '#FFFFFF';
  const nodeStroke = isDark ? 'rgba(110, 231, 183, 0.24)' : 'rgba(5, 150, 105, 0.22)';
  const gatewayFill = isDark ? '#0D2C47' : '#FFFFFF';
  const gatewayStroke = isDark ? 'rgba(52, 211, 153, 0.44)' : 'rgba(5, 150, 105, 0.36)';
  const chipBg = isDark ? 'rgba(16, 185, 129, 0.14)' : 'rgba(5, 150, 105, 0.09)';
  const arrowStroke = isDark ? '#34D399' : '#059669';
  const innerRowBg = isDark ? 'rgba(4, 18, 33, 0.46)' : 'rgba(236, 253, 245, 0.65)';
  const kpiBg = isDark ? 'rgba(6, 22, 38, 0.72)' : '#FFFFFF';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="406" viewBox="0 0 1200 406" fill="none" role="img" aria-label="Arquitectura Zero-Retention y Benchmarks de OMEGA">
  <defs>
    ${glassDefs(sec, 'omg')}
    <clipPath id="omgClip">
      <rect x="0.5" y="2.5" width="1199" height="401" rx="22"/>
    </clipPath>
    <marker id="secArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 1 1 L 9 5 L 1 9 z" fill="${arrowStroke}"/>
    </marker>
  </defs>

  ${renderGlassSurface({
    x: 0,
    y: 2,
    w: 1200,
    h: 402,
    rx: 22,
    prefix: 'omg',
    t: sec,
    filterShadow: !isDark,
    inner: `
      <g clip-path="url(#omgClip)">
        <g filter="url(#omgSoftBlur)" opacity="${sec.ambientOpacity}">
          <circle cx="210" cy="70" r="140" fill="${sec.ambientPrimary}"/>
          <circle cx="960" cy="300" r="160" fill="${sec.ambientSecondary}"/>
        </g>
      </g>

      <!-- Header -->
      <circle cx="34" cy="34" r="5" fill="${sec.accent}"/>
      <circle cx="34" cy="34" r="9" fill="${sec.accent}" fill-opacity="0.18"/>
      <text x="54" y="39" class="display" font-size="16" font-weight="600" letter-spacing="-0.25" fill="${sec.text}">Arquitectura Zero-Retention &amp; Pipeline Forense</text>
      <text x="54" y="57" class="sans" font-size="12.2" fill="${sec.textMuted}">Segregación de redes Docker (omega-public / omega-private) · evitación de persistencia en disco</text>

      <rect x="974" y="24" width="198" height="26" rx="13" fill="${sec.pillAccentFill}" stroke="${sec.pillAccentStroke}" stroke-width="1"/>
      <text x="1073" y="40.5" text-anchor="middle" class="mono" font-size="11" font-weight="600" fill="${sec.accentText}">v1.3.1 · Security Focus</text>

      <line x1="28" y1="74" x2="1172" y2="74" stroke="${sec.divider}" stroke-width="1"/>

      <!-- Zone 1: Client Web / Desktop -->
      <g transform="translate(28, 90)">
        <rect x="0.5" y="0.5" width="268" height="202" rx="16" fill="${nodeFill}" stroke="${nodeStroke}" stroke-width="1"/>
        <rect x="0.5" y="0.5" width="268" height="202" rx="16" fill="url(#omgTileBg)"/>
        <line x1="20" y1="1.5" x2="248" y2="1.5" stroke="url(#omgTopBevel)" stroke-width="1"/>

        <rect x="18" y="18" width="114" height="21" rx="10.5" fill="${chipBg}"/>
        <text x="75" y="32" text-anchor="middle" class="mono" font-size="10.2" font-weight="600" fill="${sec.accentText}">CLIENTE HÍBRIDO</text>

        <text x="18" y="64" class="display" font-size="16.5" font-weight="600" letter-spacing="-0.25" fill="${sec.text}">React 19 + Electron 45</text>
        <text x="18" y="88" class="sans" font-size="12.5" fill="${sec.textSecondary}">Cabina de postura en vivo</text>
        <text x="18" y="106" class="sans" font-size="12.5" fill="${sec.textSecondary}">y copiloto CTI con citas.</text>

        <rect x="18" y="124" width="232" height="58" rx="10" fill="${innerRowBg}" stroke="${sec.divider}" stroke-width="1"/>
        <text x="30" y="145" class="sans" font-size="11.8" font-weight="600" fill="${sec.text}">Canal IPC local</text>
        <text x="30" y="164" class="mono" font-size="10.8" fill="${sec.textMuted}">Windows · ADB · iOS (RAM)</text>
      </g>

      <!-- Connector 1: Client -> Gateway -->
      <line x1="300" y1="191" x2="348" y2="191" stroke="${arrowStroke}" stroke-width="1.8" marker-end="url(#secArrow)"/>
      <text x="324" y="179" text-anchor="middle" class="mono" font-size="10" font-weight="600" fill="${sec.accentText}">JWT</text>

      <!-- Zone 2: Java Zero-Retention Gateway -->
      <g transform="translate(356, 90)">
        <rect x="0.5" y="0.5" width="434" height="202" rx="16" fill="${gatewayFill}" stroke="${gatewayStroke}" stroke-width="1.2"/>
        <rect x="0.5" y="0.5" width="434" height="202" rx="16" fill="url(#omgTileBg)"/>
        <line x1="22" y1="1.5" x2="412" y2="1.5" stroke="url(#omgTopBevel)" stroke-width="1"/>

        <rect x="18" y="18" width="160" height="21" rx="10.5" fill="${sec.pillAccentFill}" stroke="${sec.pillAccentStroke}" stroke-width="1"/>
        <text x="98" y="32" text-anchor="middle" class="mono" font-size="10.2" font-weight="600" fill="${sec.accentText}">OMEGA-PUBLIC · :8080</text>
        <text x="416" y="32" text-anchor="end" class="mono" font-size="10.8" font-weight="600" fill="${sec.textMuted}">Spring Boot 3.3 · Java 21</text>

        <!-- Submodule A -->
        <rect x="18" y="52" width="398" height="42" rx="10" fill="${innerRowBg}" stroke="${sec.divider}" stroke-width="1"/>
        <text x="30" y="69" class="sans" font-size="12.2" font-weight="600" fill="${sec.text}">Ingesta Zero-Retention (tmpfs)</text>
        <text x="30" y="85" class="sans" font-size="11.2" fill="${sec.textMuted}">PDFBox AST, OCR Tess4J y borrado físico en finally</text>

        <!-- Submodule B -->
        <rect x="18" y="100" width="398" height="42" rx="10" fill="${innerRowBg}" stroke="${sec.divider}" stroke-width="1"/>
        <text x="30" y="117" class="sans" font-size="12.2" font-weight="600" fill="${sec.text}">Motor RAG Híbrido + STIX 2.1</text>
        <text x="30" y="133" class="sans" font-size="11.2" fill="${sec.textMuted}">RRF (pgvector + tsvector) con citas por tenant y página</text>

        <!-- Submodule C -->
        <rect x="18" y="148" width="398" height="42" rx="10" fill="${innerRowBg}" stroke="${sec.divider}" stroke-width="1"/>
        <text x="30" y="165" class="sans" font-size="12.2" font-weight="600" fill="${sec.text}">Guardrails &amp; Auditoría SHA-256</text>
        <text x="30" y="181" class="sans" font-size="11.2" fill="${sec.textMuted}">RBAC, anti-IDOR, anti-Zip-Slip y cadena probatoria</text>
      </g>

      <!-- Dual Connectors: Gateway -> Private Network -->
      <path d="M 792 145 L 842 145" stroke="${arrowStroke}" stroke-width="1.8" marker-end="url(#secArrow)"/>
      <text x="817" y="133" text-anchor="middle" class="mono" font-size="9.5" font-weight="600" fill="${sec.accentText}">Token</text>

      <path d="M 792 239 L 842 239" stroke="${arrowStroke}" stroke-width="1.8" marker-end="url(#secArrow)"/>
      <text x="817" y="227" text-anchor="middle" class="mono" font-size="9.5" font-weight="600" fill="${sec.accentText}">HNSW</text>

      <!-- Zone 3: Isolated Private Network (Forensic Worker + Postgres) -->
      <g transform="translate(850, 90)">
        <!-- Worker -->
        <rect x="0.5" y="0.5" width="322" height="94" rx="15" fill="${nodeFill}" stroke="${nodeStroke}" stroke-width="1"/>
        <rect x="0.5" y="0.5" width="322" height="94" rx="15" fill="url(#omgTileBg)"/>
        <text x="16" y="24" class="mono" font-size="10" font-weight="600" fill="${sec.accentText}">OMEGA-PRIVATE · SIN PUERTOS</text>
        <text x="16" y="46" class="display" font-size="14.8" font-weight="600" fill="${sec.text}">Worker Forense FastAPI</text>
        <text x="16" y="65" class="sans" font-size="11.8" fill="${sec.textSecondary}">MVT, YARA e iOS (:memory:) 100% en RAM</text>
        <text x="16" y="82" class="mono" font-size="10.5" fill="${sec.textMuted}">Fail-closed 401/503 · 0B retenidos</text>

        <!-- Postgres -->
        <rect x="0.5" y="108.5" width="322" height="94" rx="15" fill="${nodeFill}" stroke="${nodeStroke}" stroke-width="1"/>
        <rect x="0.5" y="108.5" width="322" height="94" rx="15" fill="url(#omgTileBg)"/>
        <text x="16" y="132" class="mono" font-size="10" font-weight="600" fill="${sec.accentText}">PERSISTENCIA AISLADA · FLYWAY V1–V3</text>
        <text x="16" y="154" class="display" font-size="14.8" font-weight="600" fill="${sec.text}">PostgreSQL 16 + pgvector</text>
        <text x="16" y="173" class="sans" font-size="11.8" fill="${sec.textSecondary}">Índices HNSW + GIN y catálogo STIX 2.1</text>
        <text x="16" y="190" class="mono" font-size="10.5" fill="${sec.textMuted}">audit_logs inmutable (trigger anti-UPDATE)</text>
      </g>

      <!-- Bottom Verified Benchmarks Strip -->
      <g transform="translate(28, 310)">
        <rect x="0.5" y="0.5" width="1144" height="72" rx="15" fill="${kpiBg}" stroke="${nodeStroke}" stroke-width="1"/>

        <text x="24" y="24" class="sans" font-size="11.2" font-weight="500" fill="${sec.textMuted}">Recuperación RAG (Hit@5)</text>
        <text x="24" y="48" class="display" font-size="21" font-weight="600" letter-spacing="-0.4" fill="${sec.accentText}">85.7% <tspan font-size="12" font-weight="500" fill="${sec.textMuted}">(vs. 28.6% base)</tspan></text>

        <line x1="286" y1="14" x2="286" y2="58" stroke="${sec.divider}" stroke-width="1"/>

        <text x="310" y="24" class="sans" font-size="11.2" font-weight="500" fill="${sec.textMuted}">Control Anti-Alucinación</text>
        <text x="310" y="48" class="display" font-size="21" font-weight="600" letter-spacing="-0.4" fill="${sec.text}">100% <tspan font-size="12" font-weight="500" fill="${sec.textMuted}">abstención RNF1</tspan></text>

        <line x1="572" y1="14" x2="572" y2="58" stroke="${sec.divider}" stroke-width="1"/>

        <text x="596" y="24" class="sans" font-size="11.2" font-weight="500" fill="${sec.textMuted}">Inteligencia STIX 2.1</text>
        <text x="596" y="48" class="display" font-size="21" font-weight="600" letter-spacing="-0.4" fill="${sec.text}">6,404 IOCs <tspan font-size="12" font-weight="500" fill="${sec.textMuted}">en 6 campañas</tspan></text>

        <line x1="858" y1="14" x2="858" y2="58" stroke="${sec.divider}" stroke-width="1"/>

        <text x="882" y="24" class="sans" font-size="11.2" font-weight="500" fill="${sec.textMuted}">Latencia Media &amp; Disco</text>
        <text x="882" y="48" class="display" font-size="21" font-weight="600" letter-spacing="-0.4" fill="${sec.accentText}">1.22s <tspan font-size="12" font-weight="500" fill="${sec.textMuted}">· 0B retenidos</tspan></text>
      </g>
    `,
  })}
</svg>`;
}

const SECONDARY_PROJECTS = [
  {
    slug: 'guardian',
    icon: 'eye',
    title: 'GUARDIAN',
    subtitle: 'Seguridad Vial Multi-Agente',
    line1: 'Predice riesgos en transporte terrestre',
    line2: 'con 3 agentes (Copiloto, Centinela,',
    line3: 'Oráculo) sobre Voxel51 FiftyOne.',
    meta: 'Python · FiftyOne · Gemini AI',
  },
  {
    slug: 'toolrent',
    icon: 'layers',
    title: 'ToolRent',
    subtitle: 'SaaS Industrial (DDD)',
    line1: 'Renta de maquinaria organizada en 8',
    line2: 'módulos Maven, esquema PostgreSQL 4FN',
    line3: 'con Flyway, JWT RBAC y SPA.',
    meta: 'Java 17 · Spring Boot 3 · PostgreSQL',
  },
  {
    slug: 'cv',
    icon: 'doc',
    title: 'CV Intelligence',
    subtitle: 'Evaluador de Hojas de Vida',
    line1: 'Contrasta currículums PDF frente a',
    line2: 'vacantes con extracción estructurada',
    line3: 'y scoring reproducible tipado.',
    meta: 'Python 3.12 · LangChain · Pydantic',
  },
];

function renderSecondaryCard(proj, t) {
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
      ${renderIconBadge(20, 18, proj.icon, t, { size: 34, accent: true })}
      <text x="64" y="34" class="display" font-size="18" font-weight="600" letter-spacing="-0.3" fill="${t.text}">${esc(proj.title)}</text>
      <text x="64" y="51" class="sans" font-size="12.5" font-weight="500" fill="${t.textMuted}">${esc(proj.subtitle)}</text>

      <line x1="20" y1="68" x2="366" y2="68" stroke="${t.divider}" stroke-width="1"/>

      <text x="20" y="92" class="sans" font-size="14" font-weight="400" fill="${t.textSecondary}">${esc(proj.line1)}</text>
      <text x="20" y="112" class="sans" font-size="14" font-weight="400" fill="${t.textSecondary}">${esc(proj.line2)}</text>
      <text x="20" y="132" class="sans" font-size="14" font-weight="400" fill="${t.textSecondary}">${esc(proj.line3)}</text>

      <text x="20" y="164" class="mono" font-size="11.8" font-weight="500" fill="${t.accentText}">${esc(proj.meta)}</text>
      <text x="366" y="164" text-anchor="end" class="sans" font-size="13.5" font-weight="600" fill="${t.accentText}">&#8599;</text>
    `,
  })}
</svg>`;
}

function renderFooter(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="64" viewBox="0 0 1200 64" fill="none" role="img" aria-label="Andrés Felipe Guerra · AG Engineering">
  <defs>
    ${glassDefs(t, 'ftr')}
  </defs>
  ${renderGlassSurface({
    x: 0,
    y: 4,
    w: 1200,
    h: 54,
    rx: 16,
    prefix: 'ftr',
    t,
    filterShadow: t.mode === 'light',
    inner: `
      <text x="24" y="31" class="sans" font-size="13" font-weight="600" letter-spacing="-0.1" fill="${t.text}">Andrés Felipe Guerra  <tspan font-weight="400" fill="${t.textMuted}">·  AG Engineering  ·  Bucaramanga, Colombia</tspan></text>
      <text x="1176" y="31" text-anchor="end" class="sans" font-size="12.5" font-weight="600" fill="${t.accentText}">portfolio.agengineering.workers.dev  &#8599;</text>
    `,
  })}
</svg>`;
}

for (const [mode, t] of Object.entries(GLASS_THEMES)) {
  fs.writeFileSync(path.join(OUT_DIR, `hero-${mode}.svg`), renderHero(t), 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, `footer-${mode}.svg`), renderFooter(t), 'utf8');

  const buttons = renderActionButtons(t);
  for (const [slug, svg] of Object.entries(buttons)) {
    fs.writeFileSync(path.join(OUT_DIR, `btn-${slug}-${mode}.svg`), svg, 'utf8');
  }

  for (const proj of SECONDARY_PROJECTS) {
    fs.writeFileSync(path.join(OUT_DIR, `sec-${proj.slug}-${mode}.svg`), renderSecondaryCard(proj, t), 'utf8');
  }
}

for (const [mode, sec] of Object.entries(SECURITY_THEMES)) {
  fs.writeFileSync(path.join(OUT_DIR, `omega-arch-${mode}.svg`), renderOmegaArchitecture(sec), 'utf8');
}

console.log('Generated v6 hierarchical Apple + Kowalski SVGs in ./assets/v6/');
