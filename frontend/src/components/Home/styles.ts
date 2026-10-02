import { colors, fonts, radii, glowCard } from '../../theme';
import mobileBackground from '../../images/home-mobile-bg.svg';

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
    // Positioned (and its own stacking context) so the phone artwork below sits behind the
    // hero's content; when the hero is pinned (HeroIntro) it becomes sticky instead.
    position: 'relative' as const,
    isolation: 'isolate' as const,
    // Artwork (chain, lightbulb, gear) behind the hero. It's sized by width, so
    // nothing is clipped at the sides, and fades into the page colour at the bottom, so there
    // is no seam where it ends. It stays with the hero while that is pinned, then leaves with it.
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      aspectRatio: '1109 / 1300',
      backgroundImage: `url(${mobileBackground})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      // Fades to transparent (not a solid colour) so it blends into the page glow with no seam.
      WebkitMaskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%)',
      maskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%)',
      pointerEvents: 'none' as const,
      zIndex: -999,
    },
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
    gap: 3,
    mt: 5,
    flexWrap: 'wrap',
    justifyContent: 'center',
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
    mx: 'auto',
    mt: 5,
  },
  // The gap under the tabs lives on this wrapper, not on the grid itself: MUI gives a grid
  // container a negative top margin (to line up its columns) that overrides any margin set on it.
  teamGridWrapper: {
    width: '100%',
    mt: { xs: 3.5, md: 5 },
  },
  teamGrid: {
    width: '100%',
  },
  teamCard: {
    ...glowCard(),
    borderRadius: radii.card,
    // Same content-box trap as communityCard: without border-box, height 100%
    // plus padding and border overflows the grid cell and collides with the dots.
    boxSizing: 'border-box' as const,
    p: { xs: 1.5, md: 2.5 },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    '&:hover': { transform: 'translateY(-6px)' },
    // The photo ring glows and swells while the card is hovered.
    '&:hover .team-ring': {
      boxShadow: `0 0 30px ${colors.purple}aa, 0 0 16px ${colors.mint}66`,
      transform: 'scale(1.05)',
    },
  },
  // Gradient ring in the theme colors around each photo.
  teamPhotoRing: {
    display: 'inline-flex',
    p: '3px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${colors.purple}, ${colors.lightBlue}, ${colors.mint})`,
    boxShadow: `0 0 18px ${colors.purple}55`,
    transition: 'box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  teamPhoto: {
    display: 'block',
    // Smaller on phones, where two cards share a row.
    width: { xs: '80px', md: '104px' },
    height: { xs: '80px', md: '104px' },
    borderRadius: '50%',
    objectFit: 'cover' as const,
    // A dark gap between the photo and the ring, so the ring reads as a separate band.
    border: `3px solid ${colors.surface}`,
  },
  teamName: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: { xs: '0.9rem', md: '1rem' },
    color: colors.textPrimary,
    mt: { xs: 1.5, md: 2 },
  },
  teamRole: {
    fontFamily: fonts.body,
    fontSize: { xs: '0.75rem', md: '0.85rem' },
    color: colors.lightBlue,
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
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    cursor: 'pointer',
    transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease',
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.45)' },
  },
  // The current page stretches into a gradient pill.
  dotActive: {
    width: '28px',
    height: '10px',
    borderRadius: '5px',
    background: `linear-gradient(90deg, ${colors.purple}, ${colors.lightBlue})`,
    cursor: 'pointer',
    transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease',
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
