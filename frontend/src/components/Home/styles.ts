export const homeStyles = () => ({
  /* ===== Page Root ===== */
  root: {
    position: 'relative',
    backgroundColor: '#001a57', // UCSD navy
    minHeight: '100vh',
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
    top: '83px',
    marginBottom: '100px',
  },

  /* ===== Navbar ===== */
  navbar: {
    backgroundColor: '#001a57',
    borderBottom: '3px solid #ffcc00',
    padding: '0.8rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    listStyle: 'none',
    '& a': {
      color: 'white',
      textDecoration: 'none',
      fontWeight: 500,
      transition: '0.3s',
      '&:hover': { color: '#ffcc00' },
    },
  },
  joinButton: {
    backgroundColor: '#001a57',
    border: '2px solid #ffcc00',
    color: 'white',
    padding: '0.4rem 1rem',
    borderRadius: '8px',
    fontWeight: 600,
    transition: '0.3s',
    '&:hover': { backgroundColor: '#ffcc00', color: '#001a57' },
  },

  /* ===== Hero ===== */
  hero: {
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  heroTitle: {
    fontFamily: 'Chakra Petch',
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 700,
    color: 'white',
    marginBottom: '1rem',
  },
  heroHighlight: {
    color: '#ffcc00',
  },
  heroSubtitle: {
    fontFamily: 'Inter, Arial',
    color: 'white',
    fontSize: '1.2rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  heroLogo: {
    width: '160px',
    margin: '2rem auto',
  },

  /* ===== Stats ===== */
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
    margin: '2rem 0',
  },
  statCard: {
    backgroundColor: '#fff',
    color: '#001a57',
    padding: '2rem',
    borderRadius: '12px',
    textAlign: 'center',
    minWidth: '150px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 700,
  },
  statLabel: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#444',
  },

  /* ===== Buttons ===== */
  buttonPrimary: {
    display: 'inline-block',
    backgroundColor: '#001a57',
    color: 'white',
    border: '2px solid #00bfa6',
    padding: '0.7rem 1.4rem',
    borderRadius: '10px',
    fontWeight: 600,
    marginTop: '1rem',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#00bfa6',
      color: '#001a57',
    },
  },

  /* ===== Section Titles ===== */
  sectionHeading: {
    fontFamily: 'Chakra Petch',
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    color: 'white',
    textAlign: 'center',
    margin: '3rem 0 2rem',
  },

  /* ===== Events ===== */
  eventCard: {
    backgroundColor: '#fff',
    color: '#001a57',
    borderRadius: '12px',
    padding: '1rem',
    minWidth: '200px',
    border: '3px solid transparent',
    backgroundImage: 'linear-gradient(white, white), linear-gradient(90deg, #ffcc00, #00bfa6)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    textAlign: 'center',
  },

  /* ===== Communities ===== */
  communityCard: {
    textAlign: 'center',
    padding: '1rem',
  },
  communityLogo: {
    maxWidth: '220px',
    margin: '0 auto',
  },

  /* ===== Team Section ===== */
  teamCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
    border: '3px solid transparent',
    backgroundImage: 'linear-gradient(white, white), linear-gradient(90deg, #ffcc00, #00bfa6)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
  },
  teamInfo: {
    color: '#001a57',
    fontWeight: 500,
    marginTop: '1rem',
  },

  /* ===== Sponsors ===== */
  sponsorsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '2rem',
    marginTop: '2rem',
  },
  sponsorLogo: {
    maxHeight: '70px',
    objectFit: 'contain',
  },

  /* ===== Footer ===== */
  footer: {
    backgroundColor: '#001a57',
    borderTop: '3px solid #ffcc00',
    textAlign: 'center',
    padding: '1.5rem',
    marginTop: '3rem',
  },
  footerText: {
    color: 'white',
    fontSize: '0.9rem',
  },
  socials: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1.2rem',
    '& a': {
      color: 'white',
      fontSize: '1.5rem',
      transition: '0.3s',
      '&:hover': { color: '#ffcc00' },
    },
  },

  /* ===== Responsive ===== */
  '@media (max-width: 768px)': {
    navLinks: { display: 'none' }, // optional hamburger replacement
    statsContainer: { flexDirection: 'column', alignItems: 'center' },
    sponsorsContainer: { flexDirection: 'column' },
  },
});
