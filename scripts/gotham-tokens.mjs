export const GOTHAM_THEMES = {
  dark: {
    mode: 'dark',
    bgBase: '#07080B',
    bgSurface: '#0B0D12',
    bgElevated: '#10131B',
    skyTowerA: '#0B0D12',
    skyTowerB: '#0E1118',
    skyTowerC: '#131722',
    skyRib: '#1A202D',
    borderHairline: '#1F2530',
    borderSteel: '#2B3342',
    accent: '#D4A72C',
    accentMuted: 'rgba(212, 167, 44, 0.45)',
    accentSoft: '#12100B',
    textPrimary: '#F0F2F5',
    textStrong: '#DCE2EC',
    textSecondary: '#9099A8',
    textMuted: '#687182',
    btnPrimaryBg: '#0C0E13',
    btnSecondaryBg: '#090B0F',
    btnSecondaryBorder: '#262D3B',
  },
  light: {
    mode: 'light',
    bgBase: '#F6F7F9',
    bgSurface: '#FFFFFF',
    bgElevated: '#EEF1F6',
    skyTowerA: '#ECEFF4',
    skyTowerB: '#E4E8F0',
    skyTowerC: '#DCE1EB',
    skyRib: '#CFD6E3',
    borderHairline: '#D4DAE4',
    borderSteel: '#BAC3D1',
    accent: '#9A6F09',
    accentMuted: 'rgba(154, 111, 9, 0.50)',
    accentSoft: '#FDFBF5',
    textPrimary: '#0E1117',
    textStrong: '#1C222D',
    textSecondary: '#4A5260',
    textMuted: '#6A7383',
    btnPrimaryBg: '#FFFFFF',
    btnSecondaryBg: '#FFFFFF',
    btnSecondaryBorder: '#C7CFD9',
  },
};

export const FONT_SANS =
  "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
export const FONT_MONO =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export function escapeXml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

/**
 * Diagonal chamfered path (top-left and bottom-right cut) per corner-diagonals geometry.
 */
export function chamferPath(x, y, w, h, cut = 10) {
  const c = Math.max(0, Math.min(cut, w / 4, h / 4));
  const x2 = x + w;
  const y2 = y + h;
  return `M ${x + c} ${y} L ${x2} ${y} L ${x2} ${y2 - c} L ${x2 - c} ${y2} L ${x} ${y2} L ${x} ${y + c} Z`;
}
