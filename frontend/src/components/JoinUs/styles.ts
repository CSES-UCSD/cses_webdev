import { colors, fonts, radii, glowCard } from '../../theme';

// Gap between sponsor tiles, in px. Shared by the row gap and the tile width
// calculation so the stagger stays aligned if it changes.
export const SPONSOR_GAP = 24;

export const joinUsStyles = () => ({
  pageWrapper: {
    position: 'relative' as const,
    minHeight: '100vh',
    overflowX: 'hidden' as const,
    color: colors.textPrimary,
    // Accent washes are placed in percentages so they track the viewport
    // instead of the fixed canvas the design was traced onto.
    background: `
      radial-gradient(ellipse 90% 55% at 20% 15%, rgba(114, 93, 240, 0.15), transparent 65%),
      radial-gradient(ellipse 90% 55% at 80% 32%, rgba(100, 195, 227, 0.12), transparent 65%),
      radial-gradient(ellipse 90% 55% at 50% 68%, rgba(93, 240, 196, 0.10), transparent 65%)
    `,
    pt: { xs: 14, md: 18 },
    pb: { xs: 8, md: 12 },
  },
  container: {
    position: 'relative' as const,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: { xs: 3, md: 6 },
  },

  // Decorative artwork behind the copy. Phones get the layout from the mobile mockup
  // (BackgroundOption2.png): sizes in vw, tops in px from the page top, lined up with the
  // subtext (chain, lightbulb) and the stats (gear). Hidden between md and lg, where the
  // desktop placement doesn't fit yet.
  decor: {
    display: { xs: 'block', md: 'none', lg: 'block' },
    position: 'absolute' as const,
    pointerEvents: 'none' as const,
    zIndex: 0,
    userSelect: 'none' as const,
  },
  decorChain: {
    top: { xs: '180px', lg: '11%' },
    left: { xs: '5.6vw', lg: '3%' },
    width: { xs: 'clamp(110px, 36vw, 200px)', lg: 'clamp(180px, 19vw, 340px)' },
  },
  decorLightbulb: {
    top: { xs: '144px', lg: '7%' },
    right: { xs: '4.8vw', lg: '4%' },
    width: { xs: 'clamp(105px, 34vw, 190px)', lg: 'clamp(120px, 12vw, 220px)' },
  },
  decorGear: {
    top: { xs: '415px', lg: '30%' },
    left: { xs: '1.4vw', lg: '-2%' },
    width: { xs: 'clamp(120px, 39.6vw, 220px)', lg: 'clamp(220px, 22vw, 400px)' },
  },

  // Hero
  heading: {
    fontFamily: fonts.heading,
    fontWeight: 400,
    fontSize: { xs: '2rem', md: '2.5rem' },
    color: colors.gold,
    textAlign: 'center',
  },
  subtext: {
    fontFamily: fonts.heading,
    fontSize: { xs: '0.95rem', md: '1.15rem' },
    color: colors.textPrimary,
    textAlign: 'center',
    maxWidth: '620px',
    lineHeight: 1.5,
    mt: 2.5,
  },
  tagline: {
    fontFamily: fonts.heading,
    fontSize: { xs: '1rem', md: '1.15rem' },
    color: colors.textPrimary,
    textAlign: 'center',
    mt: { xs: 7, md: 9 },
  },

  // Stats
  statsGrid: {
    width: '100%',
    maxWidth: '900px',
    mt: 4,
  },
  statBox: {
    boxSizing: 'border-box' as const,
    ...glowCard(colors.purple),
    borderRadius: radii.card,
    height: '100%',
    minHeight: { xs: '110px', md: '150px' },
    px: 2,
    py: { xs: 2.5, md: 4 },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  statNumber: {
    fontFamily: fonts.heading,
    fontWeight: 700,
    fontSize: { xs: '1.75rem', md: '2.25rem' },
    color: colors.textPrimary,
  },
  statLabel: {
    fontFamily: fonts.heading,
    fontSize: { xs: '0.9rem', md: '1.05rem' },
    color: colors.textPrimary,
    lineHeight: 1.3,
    mt: 1,
  },

  // Partners
  partnersHeading: {
    fontFamily: fonts.heading,
    fontWeight: 400,
    fontSize: { xs: '1.5rem', md: '2.2rem' },
    color: colors.textPrimary,
    textAlign: 'center',
    mt: { xs: 7, md: 10 },
  },
  sponsorRows: {
    width: '100%',
    maxWidth: '900px',
    mt: { xs: 4, md: 6 },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: `${SPONSOR_GAP}px`,
  },
  // Rows are centred, so a short row insets itself between the row above —
  // that is what produces the design's staggered brick pattern, with no
  // per-tile positioning.
  sponsorRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
    gap: `${SPONSOR_GAP}px`,
  },
  sponsorTile: (perRow: number) => ({
    boxSizing: 'border-box' as const,
    // Every tile is one third of a full row wide, whatever its row holds.
    width: `calc((100% - ${SPONSOR_GAP * (perRow - 1)}px) / ${perRow})`,
    backgroundColor: '#D9D9D9',
    borderRadius: radii.card,
    // Holds the design's tile proportion at any column width.
    aspectRatio: '267 / 148',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 2,
  }),
  sponsorImg: {
    maxWidth: '85%',
    maxHeight: '85%',
    objectFit: 'contain' as const,
  },
});
