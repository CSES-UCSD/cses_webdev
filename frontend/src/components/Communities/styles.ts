import { colors, fonts, radii, glowCard } from '../../theme';

export const communityStyles = () => ({
  pageWrapper: {
    position: 'relative' as const,
    // Transparent so the cursor spotlight behind the page shows through; html paints the same color.
    backgroundColor: 'transparent',
    minHeight: '100vh',
    // Clips the oversized backdrop rather than letting it scroll the page.
    overflow: 'hidden' as const,
    pt: { xs: 14, md: 18 },
    pb: { xs: 8, md: 12 },
  },
  // Full-page backdrop: one oversized community graphic behind all content,
  // dropped back far enough to stay legible under the copy.
  backdrop: {
    position: 'absolute' as const,
    top: 0,
    height: '100%',
    width: 'auto',
    minWidth: { xs: '160%', md: '70%' },
    objectFit: 'contain' as const,
    objectPosition: 'top center',
    // The artwork carries its own top-to-bottom fade, so this only needs to
    // knock it back against the dark page rather than do the fading itself.
    opacity: 0.55,
    pointerEvents: 'none' as const,
    userSelect: 'none' as const,
    zIndex: 0,
  },
  container: {
    position: 'relative' as const,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: { xs: 3, md: 6 },
  },
  pageTitle: {
    fontFamily: fonts.heading,
    fontWeight: 700,
    fontSize: { xs: '1.8rem', md: '2.4rem' },
    color: colors.textPrimary,
    textAlign: 'center',
  },

  // Community switcher
  pills: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    mt: 4,
  },
  pill: (accent: string, active: boolean) => ({
    fontFamily: fonts.body,
    fontSize: { xs: '0.85rem', md: '0.95rem' },
    fontWeight: 500,
    textTransform: 'none',
    borderRadius: '8px',
    px: 3,
    py: 1,
    color: active ? colors.background : colors.textPrimary,
    backgroundColor: active ? accent : colors.surface,
    border: `1px solid ${accent}`,
    '&:hover': {
      backgroundColor: active ? accent : `${accent}22`,
    },
  }),

  // Community showcase
  showcase: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: '1100px',
    mt: { xs: 6, md: 9 },
  },
  showcaseInner: {
    position: 'relative' as const,
    zIndex: 1,
    display: 'flex',
    // Copy and logo sit side by side as one centred pair, level with each other.
    alignItems: 'center',
    justifyContent: 'center',
    gap: { xs: 5, md: 8 },
    flexDirection: { xs: 'column', md: 'row' },
  },
  copyColumn: {
    flex: { xs: '1 1 auto', md: '0 1 580px' },
    minWidth: 0,
  },
  communityName: {
    fontFamily: fonts.heading,
    fontWeight: 700,
    fontSize: { xs: '1.6rem', md: '2rem' },
    color: colors.textPrimary,
  },
  communityDescription: {
    fontFamily: fonts.body,
    fontSize: { xs: '1rem', md: '1.2rem' },
    lineHeight: 1.75,
    color: colors.textSecondary,
    mt: 2.5,
    maxWidth: '580px',
  },
  logoColumn: {
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    minWidth: 0,
  },
  logo: {
    width: '100%',
    maxWidth: { xs: '220px', md: '300px' },
    height: 'auto',
  },

  // Current Projects
  projectsHeading: {
    fontFamily: fonts.heading,
    fontWeight: 700,
    fontSize: { xs: '1.5rem', md: '2rem' },
    color: colors.textPrimary,
    textAlign: 'center',
    mt: { xs: 6, md: 8 },
  },
  projectsSubtitle: {
    fontFamily: fonts.heading,
    fontSize: { xs: '0.85rem', md: '0.95rem' },
    color: colors.textSecondary,
    textAlign: 'center',
    mt: 1,
  },
  // Two narrower cards per row on desktop, one on mobile. Wrapping and centring means an odd
  // last card sits in the middle of its row rather than stretching across it.
  projectsList: {
    width: '100%',
    maxWidth: '980px',
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    gap: 1.5,
    mt: { xs: 3, md: 4 },
  },
  projectItem: {
    display: 'flex',
    flex: { xs: '1 1 100%', md: '0 1 calc(50% - 6px)' },
    minWidth: 0,
  },
  projectCard: (accent: string) => ({
    position: 'relative' as const,
    boxSizing: 'border-box' as const,
    ...glowCard(`${accent}40`),
    borderRadius: radii.card,
    // Extra room on the left for the accent bar.
    pl: { xs: 3, md: 3.5 },
    pr: { xs: 2, md: 2.5 },
    py: { xs: 2, md: 2.5 },
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 2,
    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    // Accent-colored bar down the left edge, brighter on hover.
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      left: '12px',
      top: '18px',
      bottom: '18px',
      width: '3px',
      borderRadius: '3px',
      backgroundColor: accent,
      opacity: 0.55,
      transition: 'opacity 0.3s ease',
    },
    '&:hover': { transform: 'translateY(-4px)' },
    '&:hover::before': { opacity: 1 },
  }),
  // Small numbered label above each project name, in the community's color.
  projectIndex: (accent: string) => ({
    fontFamily: fonts.heading,
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    color: accent,
    mb: 0.5,
  }),
  projectName: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: { xs: '0.95rem', md: '1.05rem' },
    color: colors.textPrimary,
  },
  projectDescription: {
    fontFamily: fonts.body,
    fontSize: { xs: '0.8rem', md: '0.9rem' },
    lineHeight: 1.55,
    color: colors.textSecondary,
    mt: 0.5,
  },
  projectMembers: {
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    color: colors.textSecondary,
    mt: 1,
  },
  statusChip: (status: string) => ({
    flexShrink: 0,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    // Active is a muted green with white text; any other status keeps the gold chip.
    color: status === 'Active' ? '#FFFFFF' : colors.background,
    backgroundColor: status === 'Active' ? '#3F9A6B' : colors.gold,
    borderRadius: radii.pill,
    px: 1.75,
    py: 0.5,
  }),
  emptyText: {
    fontFamily: fonts.body,
    fontSize: '0.9rem',
    color: colors.textSecondary,
    textAlign: 'center',
    mt: 4,
  },
});
