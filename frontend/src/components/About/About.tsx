import React, { useEffect, useRef, useState } from 'react';
import { Container, Box, Grid, createTheme, useMediaQuery } from '@mui/material';
import bgTop from '../../images/shape2.svg';
import bgBtm from '../../images/shape2.svg';
import { aboutStyles } from './styles';
import MeetTheTeam from './MeetTheTeam';
import Communities from './OurCommunities';
import HowtoJoin from './HowToJoin';
import MeetTheAlumni from './MeetTheAlumni';
import Typewriter from './TypeWriter';
import { motion } from 'framer-motion';

const PLACEHOLDER_BOOKS = 'https://placehold.co/200x200?text=Placeholder';
const PLACEHOLDER_LIGHTBULB = 'https://placehold.co/300x300?text=Placeholder';

const About = () => {
  const styles = aboutStyles();
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Box sx={styles.root}>
        <Box sx={styles.backgroundImage}>
          <img src={bgTop} alt="bg1" style={{ ...styles.bg1, position: 'absolute' }} />
          <img src={bgBtm} alt="bg2" style={{ ...styles.bg2, position: 'absolute' }} />
        </Box>

        <Container maxWidth="xl" sx={styles.body}>
          {/* WHAT IS CSES — text only */}
          <Box
            sx={{
              maxWidth: '900px',
              mx: 'auto',
              py: { xs: 6, md: 10 },
              color: 'white',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <h1
              style={{
                fontFamily: 'Chakra Petch',
                fontSize: 'clamp(32px, 8vw, 65px)',
                fontWeight: 700,
                margin: 0,
              }}
            >
              <Typewriter text="WHAT IS CSES?" speed={200} />
            </h1>

            <p style={{ fontSize: 'clamp(15px, 3vw, 20px)', lineHeight: 1.7, marginTop: 12 }}>
              CSES is growing the largest student-led tech community on campus. Through our Dev,
              OpenSource, and Innovate divisions, we give students the chance to build real-world
              software, contribute to open-source projects, and explore cutting-edge research. We
              celebrate curiosity, foster innovation, and empower the next generation of tech
              leaders.
            </p>
          </Box>

          <h1
            style={{
              color: 'white',
              marginTop: '10%',
              textAlign: 'center',
              fontFamily: 'Chakra Petch',
              fontSize: 'clamp(32px, 8vw, 65px)',
              fontWeight: 700,
            }}
          >
            WHAT DO WE DO?
          </h1>

          <Grid
            container
            sx={{ mt: '10%', display: 'flex', justifyContent: { xs: 'center', sm: 'center' } }}
          >
            <Grid
              item
              sm={4}
              lg={3}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <motion.div
                ref={ref}
                initial={{ x: -100, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1, delay: 0.2 }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <img src={PLACEHOLDER_BOOKS} alt="placeholder" style={{ width: '80%' }} />
              </motion.div>
            </Grid>

            <Grid item sm={5} lg={5}>
              <motion.div
                ref={ref}
                initial={{ x: 100, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1, delay: 0.2 }}
              >
                <Box sx={{ color: 'white', textAlign: { lg: 'left', sm: 'left', xs: 'center' } }}>
                  <h1>Our History</h1>
                  <p style={{ color: 'white', fontSize: 'clamp(15px, 3vw, 20px)' }}>
                    CSES was the first CSE organization at UCSD starting over twenty years ago, and
                    we have innovated over the years to stay relevant in serving the CSE community.
                    We are open to all majors and individuals who are interested in computing!
                  </p>
                </Box>
              </motion.div>
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="center"
            columnSpacing={12}
            mt={12}
            spacing={4}
            direction={isSmallScreen ? 'column-reverse' : 'row'}
          >
            <Grid item sm={5}>
              <motion.div
                ref={ref}
                initial={{ x: -100, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1, delay: 0.6 }}
              >
                <Box sx={{ color: 'white', textAlign: { lg: 'left', sm: 'left', xs: 'center' } }}>
                  <h1>Our Future</h1>
                </Box>
                <p
                  style={{
                    color: 'white',
                    fontSize: 'clamp(15px, 3vw, 20px)',
                    textAlign: isSmallScreen ? 'center' : 'left',
                  }}
                >
                  Our mission statement is to help our members get professional opportunities while
                  fostering a network of individuals. We do this through quarterly career fairs,
                  mentorship programs for career development, and project opportunities to gain
                  experience.
                </p>
              </motion.div>
            </Grid>

            <Grid item sm={4} md={3} lg={3} maxHeight={'100%'}>
              <motion.div
                ref={ref}
                initial={{ x: 100, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1, delay: 0.6 }}
              >
                <img src={PLACEHOLDER_LIGHTBULB} alt="placeholder" />
              </motion.div>
            </Grid>
          </Grid>

          <HowtoJoin />
          <Communities />
          <MeetTheTeam />
          {/* Add Alumni here */}
          <MeetTheAlumni />
        </Container>
      </Box>
    </Box>
  );
};

export default About;
