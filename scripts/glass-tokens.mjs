/**
 * Shared Apple HIG & frosted-glass design tokens and SVG surface helpers
 * for both Dark Mode (Obsidian Glass) and Light Mode (Alabaster Porcelain Glass).
 */

export const FONT_DISPLAY =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif";
export const FONT_TEXT =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif";
export const FONT_MONO =
  "'SF Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace";

export const GLASS_THEMES = {
  dark: {
    mode: 'dark',
    canvas: '#0A0A0E',
    glassTop: '#FFFFFF',
    glassTopOpacity: '0.068',
    glassBottom: '#FFFFFF',
    glassBottomOpacity: '0.018',
    panelBase: '#111116',
    tileTop: '#FFFFFF',
    tileTopOpacity: '0.055',
    tileBottom: '#FFFFFF',
    tileBottomOpacity: '0.016',
    tileBase: '#16161C',
    rimStart: 'rgba(255, 255, 255, 0.24)',
    rimMid: 'rgba(255, 255, 255, 0.08)',
    rimTint: 'rgba(96, 165, 250, 0.20)',
    rimEnd: 'rgba(255, 255, 255, 0.05)',
    bevelHighlight: 'rgba(255, 255, 255, 0.26)',
    divider: 'rgba(255, 255, 255, 0.08)',
    pillFill: 'rgba(255, 255, 255, 0.05)',
    pillStroke: 'rgba(255, 255, 255, 0.11)',
    pillAccentFill: 'rgba(59, 130, 246, 0.16)',
    pillAccentStroke: 'rgba(96, 165, 250, 0.34)',
    iconWellFill: 'rgba(255, 255, 255, 0.06)',
    iconWellStroke: 'rgba(255, 255, 255, 0.12)',
    ambientPrimary: '#3B82F6',
    ambientSecondary: '#93C5FD',
    ambientOpacity: '0.11',
    shadowColor: '#000000',
    shadowOpacity: '0.45',
    text: '#F5F5F7',
    textSecondary: '#C8C8D0',
    textMuted: '#8E8E98',
    accent: '#3B82F6',
    accentText: '#60A5FA',
    statusOk: '#34D399',
    track: 'rgba(255, 255, 255, 0.07)',
    swatches: ['#2563EB', '#60A5FA', '#93C5FD', '#D4D4D8', '#8E8E98', '#52525B'],
  },
  light: {
    mode: 'light',
    canvas: '#F2F4F8',
    glassTop: '#FFFFFF',
    glassTopOpacity: '0.88',
    glassBottom: '#FFFFFF',
    glassBottomOpacity: '0.72',
    panelBase: '#F7F8FA',
    tileTop: '#FFFFFF',
    tileTopOpacity: '0.96',
    tileBottom: '#FFFFFF',
    tileBottomOpacity: '0.86',
    tileBase: '#FFFFFF',
    rimStart: 'rgba(15, 23, 42, 0.08)',
    rimMid: 'rgba(15, 23, 42, 0.11)',
    rimTint: 'rgba(29, 78, 216, 0.22)',
    rimEnd: 'rgba(15, 23, 42, 0.09)',
    bevelHighlight: 'rgba(255, 255, 255, 0.98)',
    divider: 'rgba(15, 23, 42, 0.09)',
    pillFill: 'rgba(15, 23, 42, 0.045)',
    pillStroke: 'rgba(15, 23, 42, 0.11)',
    pillAccentFill: 'rgba(37, 99, 235, 0.10)',
    pillAccentStroke: 'rgba(37, 99, 235, 0.28)',
    iconWellFill: '#FFFFFF',
    iconWellStroke: 'rgba(15, 23, 42, 0.10)',
    ambientPrimary: '#3B82F6',
    ambientSecondary: '#93C5FD',
    ambientOpacity: '0.14',
    shadowColor: '#0F172A',
    shadowOpacity: '0.075',
    text: '#1D1D1F',
    textSecondary: '#424247',
    textMuted: '#686870',
    accent: '#1D4ED8',
    accentText: '#1D4ED8',
    statusOk: '#059669',
    track: 'rgba(15, 23, 42, 0.08)',
    swatches: ['#1D4ED8', '#3B82F6', '#60A5FA', '#3F3F46', '#71717A', '#A1A1AA'],
  },
};

export function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Estimates crisp pixel width for pill text so chips fit evenly across platforms without clipping.
 */
export function measureLabelWidth(text, fontSize = 11.5, mono = false) {
  let width = 0;
  for (const ch of String(text)) {
    if (mono) {
      width += fontSize * 0.62;
    } else if ('ijlI.,:;|! '.includes(ch)) {
      width += fontSize * 0.34;
    } else if ('mwMW@%&'.includes(ch)) {
      width += fontSize * 0.84;
    } else if (ch >= 'A' && ch <= 'Z') {
      width += fontSize * 0.68;
    } else {
      width += fontSize * 0.56;
    }
  }
  return Math.ceil(width);
}

/**
 * Emits shared SVG <defs> for glass fills, diagonal 1px specular rim strokes, top edge highlight, and ambient blur.
 */
export function glassDefs(t, prefix = 'g') {
  return `
    <linearGradient id="${prefix}ShellBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${t.glassTop}" stop-opacity="${t.glassTopOpacity}"/>
      <stop offset="100%" stop-color="${t.glassBottom}" stop-opacity="${t.glassBottomOpacity}"/>
    </linearGradient>
    <linearGradient id="${prefix}TileBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${t.tileTop}" stop-opacity="${t.tileTopOpacity}"/>
      <stop offset="100%" stop-color="${t.tileBottom}" stop-opacity="${t.tileBottomOpacity}"/>
    </linearGradient>
    <linearGradient id="${prefix}RimStroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.rimStart}"/>
      <stop offset="38%" stop-color="${t.rimMid}"/>
      <stop offset="72%" stop-color="${t.rimTint}"/>
      <stop offset="100%" stop-color="${t.rimEnd}"/>
    </linearGradient>
    <linearGradient id="${prefix}TopBevel" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="22%" stop-color="${t.bevelHighlight}"/>
      <stop offset="78%" stop-color="${t.bevelHighlight}"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <filter id="${prefix}SoftBlur" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="52"/>
    </filter>
    <filter id="${prefix}CardShadow" x="-8%" y="-12%" width="116%" height="132%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="${t.shadowColor}" flood-opacity="${t.shadowOpacity}"/>
    </filter>
    <style>
      .display { font-family: ${FONT_DISPLAY}; }
      .sans { font-family: ${FONT_TEXT}; }
      .mono { font-family: ${FONT_MONO}; }
    </style>`;
}

/**
 * Renders a layered translucent glass panel (base tone + glass sheen + specular rim + top bevel highlight).
 */
export function renderGlassSurface({ x = 0, y = 0, w, h, rx = 20, prefix = 'g', t, filterShadow = false, inner = '' }) {
  const shadowAttr = filterShadow ? ` filter="url(#${prefix}CardShadow)"` : '';
  const bevelInset = Math.min(28, Math.round(rx + 6));
  return `
  <g transform="translate(${x}, ${y})"${shadowAttr}>
    <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="${rx}" fill="${t.panelBase}"/>
    <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="${rx}" fill="url(#${prefix}ShellBg)" stroke="url(#${prefix}RimStroke)" stroke-width="1"/>
    <line x1="${bevelInset}" y1="1.5" x2="${w - bevelInset}" y2="1.5" stroke="url(#${prefix}TopBevel)" stroke-width="1"/>
    ${inner}
  </g>`;
}

/**
 * Renders a horizontal row of uniformly padded rounded micro-pills inside a card.
 */
export function renderPillRow(items, t, { startX = 24, y = 166, height = 26, fontSize = 11.2, gap = 8, accentFirst = false } = {}) {
  let cursor = startX;
  return items
    .map((label, idx) => {
      const textW = measureLabelWidth(label, fontSize, false);
      const w = textW + 20;
      const isAccent = accentFirst && idx === 0;
      const fill = isAccent ? t.pillAccentFill : t.pillFill;
      const stroke = isAccent ? t.pillAccentStroke : t.pillStroke;
      const color = isAccent ? t.accentText : t.textSecondary;
      const out = `
    <g transform="translate(${cursor}, ${y})">
      <rect x="0" y="0" width="${w}" height="${height}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1"/>
      <text x="${w / 2}" y="${height / 2 + 4}" text-anchor="middle" class="sans" font-size="${fontSize}" font-weight="500" fill="${color}">${esc(label)}</text>
    </g>`;
      cursor += w + gap;
      return out;
    })
    .join('');
}
