import { colors, fonts, radii, glowCard } from '../../theme';

export const homeStyles = () => ({
  pageWrapper: {
    // Transparent so the cursor spotlight behind the page shows through; html paints the same color.
    backgroundColor: 'transparent',
    minHeight: '100vh',
    // `clip` stops sideways overflow like `hidden` but, unlike it, doesn't make this
    // a scroll container, which would break the hero's position: sticky.
    overflowX: 'clip' as const,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: { xs: 3, md: 6 },
  },

  // Hero
  hero: {
    width: '100%',
    minHeight: { xs: '70vh', md: '85vh' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    pt: { xs: 16, md: 18 },
    pb: { xs: 8, md: 10 },
  },
  heroTitle: {
    fontFamily: fonts.heading,
    fontWeight: 700,
    // Capped by viewport width on small screens so "CSE Society" stays on one line.
    fontSize: { xs: 'min(3.9rem, 12.5vw)', sm: 'min(5.25rem, 12.5vw)', md: '6.75rem' },
    color: colors.textPrimary,
    letterSpacing: '0.02em',
  },
  heroSubtitle: {
    fontFamily: fonts.heading,
    fontSize: { xs: '1.2rem', md: '1.75rem' },
    color: colors.textPrimary,
    mt: 1,
  },
  heroTagline: {
    fontFamily: fonts.heading,
    fontSize: { xs: '0.85rem', md: '1rem' },
    color: colors.textSecondary,
    mt: 4,
    px: 2,
  },
  heroButtons: {
    display: 'flex',
    gap: 2,
    mt: 5,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    fontFamily: fonts.body,
    fontSize: '0.95rem',
    fontWeight: 500,
    textTransform: 'none',
    color: colors.textPrimary,
    backgroundColor: colors.purpleButton,
    borderRadius: '8px',
    px: 3,
    py: 1.2,
    '&:hover': { backgroundColor: colors.purpleBright },
  },
  secondaryButton: {
    fontFamily: fonts.body,
    fontSize: '0.95rem',
    fontWeight: 500,
    textTransform: 'none',
    color: colors.textPrimary,
    border: `1px solid ${colors.purple}`,
    borderRadius: '8px',
    px: 3,
    py: 1.2,
    '&:hover': { borderColor: colors.purpleBright, backgroundColor: 'rgba(114, 93, 240, 0.1)' },
  },

  // Shared section pieces
  sectionWrapper: {
    width: '100%',
    maxWidth: '1100px',
    py: { xs: 6, md: 9 },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: fonts.heading,
    fontWeight: 700,
    fontSize: { xs: '1.8rem', md: '2.4rem' },
    color: colors.textPrimary,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontFamily: fonts.heading,
    fontSize: { xs: '0.85rem', md: '0.95rem' },
    color: colors.textSecondary,
    textAlign: 'center',
    mt: 1.5,
  },

  // What is CSES?
  aboutParagraph: {
    fontFamily: fonts.heading,
    fontSize: { xs: '0.85rem', md: '1rem' },
    lineHeight: 1.9,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: '850px',
    mt: 4,
  },

  // Meet the Team!
  teamTabsWrapper: {
    width: '100%',
    maxWidth: '800px',
    mt: 5,
  },
  teamGrid: {
    mt: 4,
    width: '100%',
  },
  teamCard: {
    ...glowCard(),
    borderRadius: radii.card,
    // Same content-box trap as communityCard: without border-box, height 100%
    // plus padding and border overflows the grid cell and collides with the dots.
    boxSizing: 'border-box' as const,
    p: 2.5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
  },
  teamPhoto: {
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
  },
  teamName: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: '1rem',
    color: colors.textPrimary,
    mt: 2,
  },
  teamRole: {
    fontFamily: fonts.body,
    fontSize: '0.85rem',
    color: colors.textSecondary,
    mt: 0.5,
  },
  dotsWrapper: {
    display: 'flex',
    gap: 1.2,
    mt: 6,
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    cursor: 'pointer',
  },
  dotActive: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: colors.purpleBright,
    cursor: 'pointer',
  },
  emptyText: {
    fontFamily: fonts.body,
    color: colors.textSecondary,
    mt: 4,
  },

  // Kept for consumers outside Home (e.g. About/HowToJoin).
  ctaButton: {
    fontFamily: fonts.body,
    fontSize: '0.95rem',
    fontWeight: 500,
    textTransform: 'none',
    color: colors.textPrimary,
    border: `1px solid ${colors.purple}`,
    borderRadius: '8px',
    px: 3,
    py: 1.2,
    '&:hover': { borderColor: colors.purpleBright, backgroundColor: 'rgba(114, 93, 240, 0.1)' },
  },
});
