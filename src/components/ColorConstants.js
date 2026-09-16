// These are consumed as inline `style` values, never interpolated into Tailwind
// class names — Tailwind's JIT scanner reads source text, so an arbitrary value
// like `bg-[${COLOR_DARK_BG}]` can never be generated.

export const COLOR_DARK_BG = '#141414';
export const COLOR_DARK_TEXT = '#ffffff';

export const COLOR_LIGHT_BG = '#ffffff';
export const COLOR_LIGHT_TEXT = '#141414';

export const COLOR_LIGHT_GRAY = '#ededed';
export const COLOR_MEDIUM_GRAY = '#bcbbbb';
export const COLOR_LIGHT_GRAY_TEXT = '#dadada';

export const COLOR_NEON_GREEN = '#00ff22';
export const COLOR_HOVER_GRAY = '#4e4d4d';

// Tailwind's gray-600, needed as a literal where the paired colour is applied
// inline (mixing an inline colour with a `gray-600` class would be inconsistent).
export const COLOR_GRAY_600 = '#4b5563';

export const COLOR_CHAT_MODAL_OVERLAY = 'bg-[#141414]/50';
export const COLOR_CHAT_GREEN = '#00ff22';

export const TERMINAL_COLORS = {
  bg: '#161618',
  panel: '#1c1c1f',
  border: '#2e2e33',
  accent: '#5DD957',
  text: '#e8e6e3',
  muted: '#8a8580',
  dim: '#5c5955',
  success: '#3fb950',
  error: '#f0776c',
  info: '#7aa2f7',
  selectBg: '#2a2a2e',
};

export const COLOR_SCHEMES = {
  mainBg: (darkMode) => darkMode ? COLOR_DARK_BG : COLOR_LIGHT_BG,
  mainText: (darkMode) => darkMode ? COLOR_DARK_TEXT : COLOR_LIGHT_TEXT,

  secondaryBg: (darkMode) => darkMode ? COLOR_LIGHT_GRAY : COLOR_LIGHT_GRAY,
  secondaryText: (darkMode) => darkMode ? 'gray-600' : 'gray-600',

  inverseBg: (darkMode) => darkMode ? COLOR_LIGHT_GRAY : COLOR_DARK_BG,
  inverseText: (darkMode) => darkMode ? COLOR_LIGHT_TEXT : COLOR_DARK_TEXT,
  
  projectCardBg: (darkMode) => darkMode ? COLOR_LIGHT_GRAY : COLOR_DARK_BG,
  projectCardText: (darkMode) => darkMode ? COLOR_LIGHT_TEXT : COLOR_LIGHT_GRAY,

  iconBg: (darkMode) => darkMode ? 'gray-600' : COLOR_LIGHT_GRAY,
  iconText: (darkMode) => darkMode ? COLOR_LIGHT_GRAY : 'gray-600',

  chatButtonBg: (darkMode) => darkMode ? COLOR_LIGHT_GRAY : COLOR_DARK_BG,
  chatButtonText: (darkMode) => darkMode ? COLOR_LIGHT_TEXT : COLOR_DARK_TEXT,

  scrollButtonBg: (darkMode) => darkMode ? COLOR_LIGHT_GRAY : COLOR_DARK_BG,
  scrollButtonHoverBg: (darkMode) => darkMode ? COLOR_DARK_TEXT : COLOR_HOVER_GRAY,
  scrollButtonText: (darkMode) => darkMode ? COLOR_LIGHT_TEXT : COLOR_DARK_TEXT,
};

export const COLORS = {
  dark: {
    bg: COLOR_DARK_BG,
    text: COLOR_DARK_TEXT,
  },
  light: {
    bg: COLOR_LIGHT_BG,
    text: COLOR_LIGHT_TEXT,
  },
  neutral: {
    lightGray: COLOR_LIGHT_GRAY,
    mediumGray: COLOR_MEDIUM_GRAY,
    lightGrayText: COLOR_LIGHT_GRAY_TEXT,
  },
  accent: {
    neonGreen: COLOR_NEON_GREEN,
    hoverGray: COLOR_HOVER_GRAY,
  },
};
