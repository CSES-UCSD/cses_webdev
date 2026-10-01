// Design tokens for the 2026 redesign (Figma: "CSES Website 2026 Redesign").
export const colors = {
  background: '#07070F',
  surface: '#0A0A10',
  border: 'rgba(114, 93, 240, 0.35)',
  purple: '#725DF0',
  // Filled buttons use a brighter purple than outlines and accents do.
  purpleButton: '#8650F0',
  purpleBright: '#8B2BF0',
  navy: '#020F5D',
  gold: '#EBB111',
  mint: '#5DF0C4',
  lightBlue: '#64C3E3',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
};

export const fonts = {
  heading: `'Space Mono', 'Chakra Petch', monospace`,
  body: `'Space Grotesk', 'Inter', sans-serif`,
};

export const radii = {
  card: '12px',
  pill: '999px',
};

// Card that lights up under the cursor. Give the element className="glow-card"
// so components/common/CursorEffects can feed it the pointer position (--glow-x/--glow-y,
// relative to the card). The border is transparent so the layers underneath
// show through it:
//   1. soft glow inside the card
//   2. the card fill (padding-box only, leaving the 1px border ring uncovered)
//   3. a brighter glow that only shows in that ring, lighting up the border
//   4. the resting border color
// The glow reaches past the card's edge, so neighbouring cards share one spotlight.
const GLOW_SIZE = '380px';
const glowGradient = (alpha: string) =>
  `radial-gradient(circle at var(--glow-x, -999px) var(--glow-y, -999px), rgba(243, 244, 246, ${alpha}), transparent ${GLOW_SIZE})`;

export const glowCard = (borderColor: string = colors.border) => ({
  border: '1px solid transparent',
  background: [
    `${glowGradient('var(--glow-opacity)')} padding-box`,
    `linear-gradient(${colors.surface}, ${colors.surface}) padding-box`,
    `${glowGradient('calc(3 * var(--glow-opacity))')} border-box`,
    `linear-gradient(${borderColor}, ${borderColor}) border-box`,
  ].join(', '),
});
