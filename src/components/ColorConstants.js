// Color Constants for consistent color usage throughout the project.
// These are consumed as inline `style` values, never interpolated into Tailwind
// class names — Tailwind's JIT scanner reads source text, so an arbitrary value
// like `bg-[${COLOR_DARK_BG}]` can never be generated.

// Primary Dark Mode Color
export const COLOR_DARK_BG = '#141414';
export const COLOR_DARK_TEXT = '#ffffff';

// Primary Light Mode Color
export const COLOR_LIGHT_BG = '#ffffff';
export const COLOR_LIGHT_TEXT = '#141414';

// Secondary Neutral Colors
export const COLOR_LIGHT_GRAY = '#ededed';
export const COLOR_MEDIUM_GRAY = '#bcbbbb';
export const COLOR_LIGHT_GRAY_TEXT = '#dadada';

// Accent Colors
export const COLOR_NEON_GREEN = '#00ff22';
export const COLOR_HOVER_GRAY = '#4e4d4d';

// Tailwind's gray-600, needed as a literal where the paired colour is applied
// inline (mixing an inline colour with a `gray-600` class would be inconsistent).
export const COLOR_GRAY_600 = '#4b5563';

// Chat Component Specific Colors
export const COLOR_CHAT_MODAL_OVERLAY = 'bg-[#141414]/50'; // Overlay with opacity
export const COLOR_CHAT_GREEN = '#00ff22';   // Chat send button

// Terminal View palette
export const TERMINAL_COLORS = {
  bg: '#161618',        // terminal canvas
  panel: '#1c1c1f',     // input box / result panels
  border: '#2e2e33',    // panel borders
  accent: '#5DD957',    // green — prompts, banner, selection
  text: '#e8e6e3',      // primary output
  muted: '#8a8580',     // hints, descriptions
  dim: '#5c5955',       // tree glyphs, placeholders
  success: '#3fb950',
  error: '#f0776c',
  info: '#7aa2f7',
  selectBg: '#2a2a2e',  // highlighted row background
};

// Color Objects for Dark/Light Mode Switching
export const COLOR_SCHEMES = {
  // Main Background and Text
  mainBg: (darkMode) => darkMode ? COLOR_DARK_BG : COLOR_LIGHT_BG,
  mainText: (darkMode) => darkMode ? COLOR_DARK_TEXT : COLOR_LIGHT_TEXT,

  // Neutral/Secondary Buttons and Cards
  secondaryBg: (darkMode) => darkMode ? COLOR_LIGHT_GRAY : COLOR_LIGHT_GRAY,
  secondaryText: (darkMode) => darkMode ? 'gray-600' : 'gray-600',

  // Inverse (for scrollToTop button and similar)
  inverseBg: (darkMode) => darkMode ? COLOR_LIGHT_GRAY : COLOR_DARK_BG,
  inverseText: (darkMode) => darkMode ? COLOR_LIGHT_TEXT : COLOR_DARK_TEXT,
  
  // Work/Project Cards
  projectCardBg: (darkMode) => darkMode ? COLOR_LIGHT_GRAY : COLOR_DARK_BG,
  projectCardText: (darkMode) => darkMode ? COLOR_LIGHT_TEXT : COLOR_LIGHT_GRAY,

  // Contact Icons
  iconBg: (darkMode) => darkMode ? 'gray-600' : COLOR_LIGHT_GRAY,
  iconText: (darkMode) => darkMode ? COLOR_LIGHT_GRAY : 'gray-600',

  // AI Chat Button
  chatButtonBg: (darkMode) => darkMode ? COLOR_LIGHT_GRAY : COLOR_DARK_BG,
  chatButtonText: (darkMode) => darkMode ? COLOR_LIGHT_TEXT : COLOR_DARK_TEXT,

  // Scroll to Top Button
  scrollButtonBg: (darkMode) => darkMode ? COLOR_LIGHT_GRAY : COLOR_DARK_BG,
  scrollButtonHoverBg: (darkMode) => darkMode ? COLOR_DARK_TEXT : COLOR_HOVER_GRAY,
  scrollButtonText: (darkMode) => darkMode ? COLOR_LIGHT_TEXT : COLOR_DARK_TEXT,
};

// Export all colors for direct use
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
