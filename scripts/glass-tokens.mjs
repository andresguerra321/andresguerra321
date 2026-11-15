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
    canvas: '#07174A',
    glassTop: '#FFFFFF',
    glassTopOpacity: '0.11',
    glassBottom: '#60A5FA',
    glassBottomOpacity: '0.035',
    panelBase: '#0C236B',
    tileTop: '#FFFFFF',
    tileTopOpacity: '0.095',
    tileBottom: '#93C5FD',
    tileBottomOpacity: '0.028',
    tileBase: '#122E85',
    rimStart: 'rgba(255, 255, 255, 0.34)',
    rimMid: 'rgba(191, 219, 254, 0.14)',
    rimTint: 'rgba(96, 165, 250, 0.32)',
    rimEnd: 'rgba(147, 197, 253, 0.09)',
    bevelHighlight: 'rgba(255, 255, 255, 0.36)',
    divider: 'rgba(191, 219, 254, 0.16)',
    pillFill: 'rgba(255, 255, 255, 0.08)',
    pillStroke: 'rgba(191, 219, 254, 0.20)',
    pillAccentFill: 'rgba(37, 99, 235, 0.34)',
    pillAccentStroke: 'rgba(191, 219, 254, 0.44)',
    iconWellFill: 'rgba(255, 255, 255, 0.09)',
    iconWellStroke: 'rgba(191, 219, 254, 0.20)',
    ambientPrimary: '#2563EB',
    ambientSecondary: '#93C5FD',
    ambientOpacity: '0.24',
    shadowColor: '#020824',
    shadowOpacity: '0.42',
    text: '#F8FAFC',
    textSecondary: '#DCE6FF',
    textMuted: '#B4C7F4',
    accent: '#3B82F6',
    accentText: '#BFDBFE',
    statusOk: '#34D399',
    track: 'rgba(191, 219, 254, 0.14)',
    swatches: ['#60A5FA', '#93C5FD', '#DBEAFE', '#38BDF8', '#A5B4FC', '#C7D2FE'],
  },
  light: {
    mode: 'light',
    canvas: '#EEF3FC',
    glassTop: '#FFFFFF',
    glassTopOpacity: '0.90',
    glassBottom: '#F5F8FF',
    glassBottomOpacity: '0.76',
    panelBase: '#F6F9FF',
    tileTop: '#FFFFFF',
    tileTopOpacity: '0.96',
    tileBottom: '#FFFFFF',
    tileBottomOpacity: '0.88',
    tileBase: '#FFFFFF',
    rimStart: 'rgba(15, 23, 42, 0.08)',
    rimMid: 'rgba(29, 78, 216, 0.12)',
    rimTint: 'rgba(29, 78, 216, 0.28)',
    rimEnd: 'rgba(15, 23, 42, 0.09)',
    bevelHighlight: 'rgba(255, 255, 255, 0.98)',
    divider: 'rgba(15, 23, 42, 0.09)',
    pillFill: 'rgba(29, 78, 216, 0.055)',
    pillStroke: 'rgba(29, 78, 216, 0.14)',
    pillAccentFill: 'rgba(29, 78, 216, 0.10)',
    pillAccentStroke: 'rgba(29, 78, 216, 0.30)',
    iconWellFill: '#FFFFFF',
    iconWellStroke: 'rgba(29, 78, 216, 0.12)',
    ambientPrimary: '#1D4ED8',
    ambientSecondary: '#60A5FA',
    ambientOpacity: '0.16',
    shadowColor: '#0F172A',
    shadowOpacity: '0.075',
    text: '#1D1D1F',
    textSecondary: '#424247',
    textMuted: '#686870',
    accent: '#1D4ED8',
    accentText: '#1E40AF',
    statusOk: '#059669',
    track: 'rgba(29, 78, 216, 0.09)',
    swatches: ['#1D4ED8', '#2563EB', '#60A5FA', '#3F3F46', '#71717A', '#A1A1AA'],
  },
};

export const SECURITY_THEMES = {
  dark: {
    mode: 'dark',
    canvas: '#041221',
    glassTop: '#FFFFFF',
    glassTopOpacity: '0.095',
    glassBottom: '#10B981',
    glassBottomOpacity: '0.032',
    panelBase: '#071B2E',
    tileTop: '#FFFFFF',
    tileTopOpacity: '0.08',
    tileBottom: '#34D399',
    tileBottomOpacity: '0.024',
    tileBase: '#0B253D',
    rimStart: 'rgba(255, 255, 255, 0.30)',
    rimMid: 'rgba(167, 243, 208, 0.14)',
    rimTint: 'rgba(16, 185, 129, 0.38)',
    rimEnd: 'rgba(34, 211, 238, 0.14)',
    bevelHighlight: 'rgba(167, 243, 208, 0.44)',
    divider: 'rgba(167, 243, 208, 0.16)',
    pillFill: 'rgba(255, 255, 255, 0.065)',
    pillStroke: 'rgba(167, 243, 208, 0.22)',
    pillAccentFill: 'rgba(16, 185, 129, 0.22)',
    pillAccentStroke: 'rgba(52, 211, 153, 0.48)',
    iconWellFill: 'rgba(16, 185, 129, 0.14)',
    iconWellStroke: 'rgba(52, 211, 153, 0.34)',
    ambientPrimary: '#10B981',
    ambientSecondary: '#06B6D4',
    ambientOpacity: '0.22',
    shadowColor: '#020914',
    shadowOpacity: '0.45',
    text: '#F8FAFC',
    textSecondary: '#D1FAE5',
    textMuted: '#94B8C4',
    accent: '#10B981',
    accentSecondary: '#22D3EE',
    accentText: '#6EE7B7',
    statusOk: '#34D399',
    track: 'rgba(167, 243, 208, 0.14)',
  },
  light: {
    mode: 'light',
    canvas: '#EDF8F4',
    glassTop: '#FFFFFF',
    glassTopOpacity: '0.92',
    glassBottom: '#F2FBF7',
    glassBottomOpacity: '0.80',
    panelBase: '#F6FCF9',
    tileTop: '#FFFFFF',
    tileTopOpacity: '0.98',
    tileBottom: '#FFFFFF',
    tileBottomOpacity: '0.90',
    tileBase: '#FFFFFF',
    rimStart: 'rgba(15, 23, 42, 0.08)',
    rimMid: 'rgba(4, 120, 87, 0.14)',
    rimTint: 'rgba(5, 150, 105, 0.30)',
    rimEnd: 'rgba(15, 23, 42, 0.08)',
    bevelHighlight: 'rgba(255, 255, 255, 0.98)',
    divider: 'rgba(6, 78, 59, 0.11)',
    pillFill: 'rgba(6, 95, 70, 0.055)',
    pillStroke: 'rgba(6, 95, 70, 0.16)',
    pillAccentFill: 'rgba(5, 150, 105, 0.11)',
    pillAccentStroke: 'rgba(5, 150, 105, 0.32)',
    iconWellFill: '#FFFFFF',
    iconWellStroke: 'rgba(5, 150, 105, 0.22)',
    ambientPrimary: '#10B981',
    ambientSecondary: '#0891B2',
    ambientOpacity: '0.13',
    shadowColor: '#064E3B',
    shadowOpacity: '0.07',
    text: '#0F172A',
    textSecondary: '#1E293B',
    textMuted: '#475569',
    accent: '#059669',
    accentSecondary: '#0891B2',
    accentText: '#047857',
    statusOk: '#059669',
    track: 'rgba(6, 78, 59, 0.10)',
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
