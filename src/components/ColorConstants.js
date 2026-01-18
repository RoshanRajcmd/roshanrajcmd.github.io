// Color Constants for consistent color usage throughout the project
// These hex color values are extracted from Tailwind arbitrary color values

// Primary Dark Mode Color
export const COLOR_DARK_BG = '#141414';      // bg-[#141414]
export const COLOR_DARK_TEXT = '#ffffff';    // text-[#ffffff]

// Primary Light Mode Color
export const COLOR_LIGHT_BG = '#ffffff';     // bg-[#ffffff]
export const COLOR_LIGHT_TEXT = '#141414';   // text-[#141414]

// Secondary Neutral Colors
export const COLOR_LIGHT_GRAY = '#ededed';   // bg-[#ededed], text-[#ededed]
export const COLOR_MEDIUM_GRAY = '#bcbbbb';  // bg-[#bcbbbb]
export const COLOR_LIGHT_GRAY_TEXT = '#dadada'; // bg-[#dadada]

// Accent Colors
export const COLOR_NEON_GREEN = '#00ff22';   // bg-[#00ff22]
export const COLOR_HOVER_GRAY = '#4e4d4d';   // hover:bg-[#4e4d4d]

// Chat Component Specific Colors
export const COLOR_CHAT_MODAL_OVERLAY = 'bg-[#141414]/50'; // Overlay with opacity
export const COLOR_CHAT_GREEN = '#00ff22';   // Chat send button

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

// Tailwind Class Generators for ease of use
export const getTailwindClasses = {
  // Dark/Light mode main container
  mainContainer: (darkMode) => darkMode 
    ? `dark bg-[${COLOR_DARK_BG}] text-[${COLOR_DARK_TEXT}]`
    : `bg-[${COLOR_LIGHT_BG}] text-[${COLOR_LIGHT_TEXT}]`,

  // Secondary buttons/cards with dark/light toggle
  secondaryButton: (darkMode) => darkMode
    ? `dark bg-gray-600 text-[${COLOR_LIGHT_GRAY}]`
    : `bg-[${COLOR_LIGHT_GRAY}] text-gray-600`,

  // Project cards
  projectCard: (darkMode) => darkMode
    ? `bg-[${COLOR_LIGHT_GRAY}] text-[${COLOR_LIGHT_TEXT}]`
    : `bg-[${COLOR_DARK_BG}] text-[${COLOR_LIGHT_GRAY}]`,

  // Contact icon buttons
  contactIcon: (darkMode) => darkMode
    ? `dark bg-gray-600 text-[${COLOR_LIGHT_GRAY}]`
    : `bg-[${COLOR_LIGHT_GRAY}] text-gray-600`,

  // AI Chat button
  chatButton: (darkMode) => darkMode
    ? `bg-[${COLOR_LIGHT_GRAY}] text-[${COLOR_LIGHT_TEXT}]`
    : `bg-[${COLOR_DARK_BG}] text-[${COLOR_DARK_TEXT}]`,

  // Scroll to top button
  scrollButton: (darkMode) => darkMode
    ? `bg-[${COLOR_LIGHT_GRAY}] hover:bg-[${COLOR_DARK_TEXT}] text-[${COLOR_LIGHT_TEXT}]`
    : `dark bg-[${COLOR_DARK_BG}] hover:bg-[${COLOR_HOVER_GRAY}] text-[${COLOR_DARK_TEXT}]`,
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
