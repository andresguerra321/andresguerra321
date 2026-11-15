import fs from 'node:fs';
import path from 'node:path';
import {
  GOTHAM_THEMES,
  FONT_SANS,
  FONT_MONO,
  escapeXml,
  chamferPath,
} from './gotham-tokens.mjs';

const OUT_DIR = path.resolve('assets/v9');

function ensureCleanDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeSvg(name, content) {
  fs.writeFileSync(path.join(OUT_DIR, name), `${content.trim()}\n`, 'utf8');
}

/**
 * Quiet Art-Deco Gotham monolith flanking silhouettes (strictly architectural, zero icons).
 */
function renderGothamSkyline(t) {
  return `
  <g>
    <!-- Faint atmospheric diagonal shafts -->
    <polygon points="110,160 220,0 265,0 165,160" fill="${t.textPrimary}" opacity="0.025" />
    <polygon points="1035,160 950,0 990,0 1085,160" fill="${t.textPrimary}" opacity="0.022" />

    <!-- Left flank Deco monoliths -->
    <rect x="18" y="64" width="54" height="96" fill="${t.skyTowerA}" />
    <rect x="30" y="44" width="30" height="20" fill="${t.skyTowerA}" />
    <rect x="44" y="26" width="2" height="18" fill="${t.skyRib}" />

    <rect x="80" y="76" width="76" height="84" fill="${t.skyTowerB}" />
    <rect x="96" y="48" width="44" height="28" fill="${t.skyTowerB}" />
    <rect x="110" y="34" width="16" height="14" fill="${t.skyTowerC}" />
    <line x1="104" y1="56" x2="104" y2="160" stroke="${t.skyRib}" stroke-width="1" />
    <line x1="118" y1="40" x2="118" y2="160" stroke="${t.skyRib}" stroke-width="1" />
    <line x1="132" y1="56" x2="132" y2="160" stroke="${t.skyRib}" stroke-width="1" />

    <rect x="164" y="96" width="52" height="64" fill="${t.skyTowerC}" />
    <rect x="176" y="82" width="28" height="14" fill="${t.skyTowerC}" />
    <line x1="190" y1="88" x2="190" y2="160" stroke="${t.skyRib}" stroke-width="1" />

    <rect x="224" y="118" width="46" height="42" fill="${t.skyTowerA}" />
    <rect x="278" y="136" width="38" height="24" fill="${t.skyTowerB}" />

    <!-- Right flank Deco monoliths (asymmetric balance) -->
    <rect x="884" y="136" width="38" height="24" fill="${t.skyTowerB}" />
    <rect x="930" y="112" width="48" height="48" fill="${t.skyTowerA}" />
    <rect x="942" y="98" width="24" height="14" fill="${t.skyTowerB}" />

    <rect x="986" y="60" width="78" height="100" fill="${t.skyTowerC}" />
    <rect x="1000" y="38" width="50" height="22" fill="${t.skyTowerB}" />
    <rect x="1014" y="22" width="22" height="16" fill="${t.skyTowerC}" />
    <rect x="1024" y="10" width="2" height="12" fill="${t.skyRib}" />
    <line x1="1010" y1="48" x2="1010" y2="160" stroke="${t.skyRib}" stroke-width="1" />
    <line x1="1025" y1="30" x2="1025" y2="160" stroke="${t.skyRib}" stroke-width="1" />
    <line x1="1040" y1="48" x2="1040" y2="160" stroke="${t.skyRib}" stroke-width="1" />

    <rect x="1072" y="88" width="54" height="72" fill="${t.skyTowerB}" />
    <rect x="1086" y="74" width="26" height="14" fill="${t.skyTowerC}" />

    <rect x="1134" y="68" width="48" height="92" fill="${t.skyTowerA}" />
    <rect x="1146" y="50" width="24" height="18" fill="${t.skyTowerB}" />
  </g>`;
}

/**
 * Hero Banner (1200x160) — Gotham Noir chamfered slab, zero icons, Name + Position only.
 */
function renderHero(t) {
  const outer = chamferPath(0.5, 0.5, 1199, 159, 14);
  const clip = chamferPath(1, 1, 1198, 158, 14);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="160" viewBox="0 0 1200 160" role="img" aria-label="Andrés Felipe Guerra — Fullstack Software Engineer · AI Systems &amp; AppSec">
  <defs>
    <clipPath id="hero-clip">
      <path d="${clip}" />
    </clipPath>
    <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${t.bgBase}" />
      <stop offset="100%" stop-color="${t.bgSurface}" />
    </linearGradient>
  </defs>

  <g clip-path="url(#hero-clip)">
    <rect width="1200" height="160" fill="url(#fog)" />
    ${renderGothamSkyline(t)}
    <line x1="0" y1="159" x2="1200" y2="159" stroke="${t.borderHairline}" stroke-width="1" />
  </g>

  <!-- Outer hairline architectural border -->
  <path d="${outer}" fill="none" stroke="${t.borderSteel}" stroke-width="1" />

  <!-- Corner tactical bracket ticks -->
  <path d="M 1184 8 L 1192 8 L 1192 16" fill="none" stroke="${t.accent}" stroke-width="1.5" />
  <path d="M 8 144 L 8 152 L 16 152" fill="none" stroke="${t.accent}" stroke-width="1.5" />

  <!-- Identity (strictly zero icons) -->
  <text x="600" y="66" text-anchor="middle" fill="${t.textPrimary}" font-family="${FONT_SANS}" font-size="42" font-weight="700" letter-spacing="-0.9">Andrés Felipe Guerra</text>

  <rect x="572" y="84" width="56" height="2" fill="${t.accent}" />

  <text x="600" y="116" text-anchor="middle" font-family="${FONT_SANS}" font-size="17" font-weight="500" letter-spacing="0.2">
    <tspan fill="${t.textSecondary}">Fullstack Software Engineer</tspan>
    <tspan fill="${t.accent}" font-weight="700">  ·  </tspan>
    <tspan fill="${t.textStrong}" font-weight="600">AI Systems &amp; AppSec</tspan>
  </text>
</svg>`;
}

/**
 * OMEGA Zero-Retention Topology Schematic (1200x136) — flat matte wireframe, zero prose bloat.
 */
function renderOmegaArch(t) {
  const outer = chamferPath(0.5, 0.5, 1199, 135, 10);
  const clip = chamferPath(1, 1, 1198, 134, 10);
  const n1 = chamferPath(24, 42, 326, 74, 7);
  const n2 = chamferPath(428, 42, 344, 74, 7);
  const n3 = chamferPath(850, 42, 326, 74, 7);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="136" viewBox="0 0 1200 136" role="img" aria-label="OMEGA Zero-Retention Topology: Client Electron/React, Spring Boot Gateway, FastAPI RAM Worker">
  <defs>
    <clipPath id="arch-clip">
      <path d="${clip}" />
    </clipPath>
  </defs>

  <g clip-path="url(#arch-clip)">
    <rect width="1200" height="136" fill="${t.bgBase}" />
  </g>
  <path d="${outer}" fill="none" stroke="${t.borderHairline}" stroke-width="1" />

  <!-- Schematic top rail -->
  <text x="24" y="23" fill="${t.textMuted}" font-family="${FONT_MONO}" font-size="11.5" font-weight="600" letter-spacing="1.2">OMEGA // ZERO-RETENTION TOPOLOGY</text>
  <text x="1176" y="23" text-anchor="end" fill="${t.accent}" font-family="${FONT_MONO}" font-size="11.5" font-weight="600" letter-spacing="1.1">RAM-ONLY · NO DISK PERSISTENCE</text>
  <line x1="24" y1="32" x2="1176" y2="32" stroke="${t.borderHairline}" stroke-width="1" />

  <!-- Node 1: Client -->
  <path d="${n1}" fill="${t.bgSurface}" stroke="${t.borderSteel}" stroke-width="1" />
  <text x="40" y="61" fill="${t.textMuted}" font-family="${FONT_MONO}" font-size="11" font-weight="600" letter-spacing="0.8">CLIENT · DESKTOP &amp; WEB</text>
  <text x="40" y="83" fill="${t.textPrimary}" font-family="${FONT_SANS}" font-size="17" font-weight="600">Electron 45 · React 19</text>
  <text x="40" y="102" fill="${t.textSecondary}" font-family="${FONT_MONO}" font-size="12.5">IPC local · ADB / iOS · OSINT</text>

  <!-- Connector 1 -->
  <line x1="352" y1="79" x2="418" y2="79" stroke="${t.accent}" stroke-width="1.5" />
  <polygon points="417,74.5 426,79 417,83.5" fill="${t.accent}" />
  <text x="389" y="69" text-anchor="middle" fill="${t.accent}" font-family="${FONT_MONO}" font-size="11" font-weight="700">JWT HS256</text>

  <!-- Node 2: Gateway -->
  <path d="${n2}" fill="${t.bgSurface}" stroke="${t.borderSteel}" stroke-width="1" />
  <text x="444" y="61" fill="${t.textMuted}" font-family="${FONT_MONO}" font-size="11" font-weight="600" letter-spacing="0.8">GATEWAY · PUBLIC (:8080)</text>
  <text x="444" y="83" fill="${t.textPrimary}" font-family="${FONT_SANS}" font-size="17" font-weight="600">Java 21 · Spring Boot 3.3</text>
  <text x="444" y="102" fill="${t.textSecondary}" font-family="${FONT_MONO}" font-size="12.5">tmpfs · RBAC · Auditoría SHA-256</text>

  <!-- Connector 2 -->
  <line x1="774" y1="79" x2="840" y2="79" stroke="${t.accent}" stroke-width="1.5" />
  <polygon points="839,74.5 848,79 839,83.5" fill="${t.accent}" />
  <text x="811" y="69" text-anchor="middle" fill="${t.accent}" font-family="${FONT_MONO}" font-size="11" font-weight="700">TOKEN</text>

  <!-- Node 3: Private Worker (highlighted chamfered containment zone) -->
  <path d="${n3}" fill="${t.mode === 'dark' ? t.bgElevated : t.accentSoft}" stroke="${t.accent}" stroke-opacity="0.7" stroke-width="1" />
  <line x1="850" y1="49" x2="850" y2="115" stroke="${t.accent}" stroke-width="2.5" />
  <text x="866" y="61" fill="${t.accent}" font-family="${FONT_MONO}" font-size="11" font-weight="700" letter-spacing="0.8">PRIVATE WORKER · NO PORTS</text>
  <text x="866" y="83" fill="${t.textPrimary}" font-family="${FONT_SANS}" font-size="17" font-weight="600">FastAPI (:memory:) · pgvector</text>
  <text x="866" y="102" fill="${t.textSecondary}" font-family="${FONT_MONO}" font-size="12.5">MVT · YARA · STIX 2.1 · RRF</text>
</svg>`;
}

const ICONS = {
  portfolio: `<circle cx="8" cy="8" r="6" fill="none" stroke="STROKE" stroke-width="1.4" /><ellipse cx="8" cy="8" rx="2.6" ry="6" fill="none" stroke="STROKE" stroke-width="1.2" /><line x1="2" y1="8" x2="14" y2="8" stroke="STROKE" stroke-width="1.2" />`,
  linkedin: `<rect x="2" y="2" width="12" height="12" rx="2" fill="none" stroke="STROKE" stroke-width="1.4" /><circle cx="5.2" cy="5.3" r="0.8" fill="STROKE" /><line x1="5.2" y1="7.3" x2="5.2" y2="11.5" stroke="STROKE" stroke-width="1.4" stroke-linecap="round" /><path d="M 8 11.5 L 8 7.3 M 8 8.6 C 8 7.1 11 7.0 11 8.8 L 11 11.5" fill="none" stroke="STROKE" stroke-width="1.4" stroke-linecap="round" />`,
  email: `<rect x="2" y="3.5" width="12" height="9" rx="1.5" fill="none" stroke="STROKE" stroke-width="1.4" /><path d="M 2.5 4.5 L 8 8.5 L 13.5 4.5" fill="none" stroke="STROKE" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />`,
  fiverr: `<path d="M 4 6 L 12 6 L 12.8 13 L 3.2 13 Z" fill="none" stroke="STROKE" stroke-width="1.4" stroke-linejoin="round" /><path d="M 5.8 6 L 5.8 4.6 C 5.8 3.2 10.2 3.2 10.2 4.6 L 10.2 6" fill="none" stroke="STROKE" stroke-width="1.4" />`,
  whatsapp: `<path d="M 8 2.2 A 5.6 5.6 0 1 1 3.7 11.4 L 2 13.5 L 4.4 12.6 A 5.6 5.6 0 0 1 8 2.2 Z" fill="none" stroke="STROKE" stroke-width="1.4" stroke-linejoin="round" />`,
};

function renderButtons(t) {
  const items = [
    { key: 'portfolio', label: 'Portfolio', w: 122, primary: true },
    { key: 'linkedin', label: 'LinkedIn', w: 118, primary: false },
    { key: 'email', label: 'Email', w: 98, primary: false },
    { key: 'fiverr', label: 'Fiverr', w: 100, primary: false },
    { key: 'whatsapp', label: 'WhatsApp', w: 124, primary: false },
  ];

  for (const item of items) {
    const bg = item.primary ? t.btnPrimaryBg : t.btnSecondaryBg;
    const border = item.primary ? t.accent : t.btnSecondaryBorder;
    const textFill = item.primary ? t.textPrimary : t.textStrong;
    const iconStroke = item.primary ? t.accent : t.textSecondary;
    const outer = chamferPath(0.5, 0.5, item.w - 1, 31, 6);
    const iconSvg = ICONS[item.key].replaceAll('STROKE', iconStroke);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${item.w}" height="32" viewBox="0 0 ${item.w} 32" role="img" aria-label="${escapeXml(item.label)}">
  <path d="${outer}" fill="${bg}" stroke="${border}" stroke-width="1" />
  <g transform="translate(13, 8)">${iconSvg}</g>
  <text x="36" y="20.5" fill="${textFill}" font-family="${FONT_SANS}" font-size="13" font-weight="${item.primary ? '600' : '500'}" letter-spacing="-0.1">${escapeXml(item.label)}</text>
</svg>`;
    writeSvg(`btn-${item.key}-${t.mode}.svg`, svg);
  }
}

function main() {
  ensureCleanDir(OUT_DIR);
  for (const t of Object.values(GOTHAM_THEMES)) {
    writeSvg(`hero-${t.mode}.svg`, renderHero(t));
    writeSvg(`omega-arch-${t.mode}.svg`, renderOmegaArch(t));
    renderButtons(t);
  }
  console.log('Generated v9 Gotham Noir SVGs in ./assets/v9/');
}

main();
