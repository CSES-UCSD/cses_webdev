import { colors, fonts, radii } from '../../theme';

export const navBarStyles = () => ({
  appBar: {
    backgroundColor: colors.background,
    borderBottom: `1px solid ${colors.border}`,
  },
  logoText: {
    fontFamily: fonts.heading,
    fontSize: { xs: '0.8rem', md: '0.95rem' },
    color: colors.textPrimary,
    ml: 1,
    display: { xs: 'none', sm: 'block' },
  },
  button: {
    fontSize: '1rem',
    color: 'white',
    textTransform: 'none',
    fontFamily: fonts.body,
    fontWeight: 500,
    margin: '10px 4px',
    px: 2.5,
    borderRadius: radii.pill,
  },
  buttonActive: {
    backgroundColor: colors.purpleBright,
    '&:hover': { backgroundColor: colors.purpleBright },
  },
  drawerList: {
    background: colors.background,
  },
  drawerSubItem: {
    pl: 6,
  },
  listitem: {
    '&:hover': {
      background: 'rgba(114, 93, 240, 0.15)',
    },
  },
  menuicon: { fontSize: '35px', margin: '10px' },
  closeicon: { color: 'white', fontSize: '35px', margin: '10px 26px' },
});
