import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import { homeStyles } from './styles';
import GlassButton from '../common/GlassButton';
import { colors } from '../../theme';
import { APPLY_URL } from '../../constants';

const TITLE = 'CSE Society';
// Close to GSAP's expo.out: a fast start with a long, soft landing.
const EXPO_OUT = [0.16, 1, 0.3, 1];
const LETTER_DURATION = 1.4; // seconds for each letter to fly in
const LETTER_STAGGER = 0.06; // seconds between letters starting, in random order

// The hero stays pinned to the screen while you scroll PIN_DISTANCE px, then
// scrolls away. Everything below is a scroll position (px) within that stretch,
// and is tied to scrolling, so scrolling back up plays it in reverse.
const PIN_DISTANCE = 500;
// Pulls the next section up over the empty lower part of the hero, closing the gap.
const NEXT_SECTION_OVERLAP = '20vh';
// After HOLD px the hero stops being static and scrolls upward at normal scroll speed,
// so it keeps clear of the next section as that rises into view instead of sitting
// frozen underneath it. By PIN_DISTANCE it has risen PIN_DISTANCE - HOLD px.
const HOLD = 300;
const TAGLINE_IN: [number, number] = [40, 160];
const BUTTONS_IN: [number, number] = [140, 260];
// Whole hero fades out. Ends after PIN_DISTANCE, so the last of the fade overlaps
// with the hero scrolling away and the next section arriving.
const HERO_OUT: [number, number] = [400, 620];
const BUTTONS_CLICKABLE: [number, number] = [200, 500]; // while they're visible enough to be clicked
// Phones and tablets: once the tagline and buttons have been revealed they stay, even if
// you scroll back up (only the hero as a whole still fades with scroll).
const PHONE_QUERY = '(max-width: 899px), (pointer: coarse)';

// Each letter starts scattered off in a random spot, spun, shrunk and invisible,
// then flies into place when the page loads.
const scatter = () =>
  TITLE.split('').map((char) => ({
    char: char === ' ' ? ' ' : char,
    x: (Math.random() - 0.5) * window.innerWidth * 2.2,
    y: (Math.random() - 0.5) * window.innerHeight * 1.4,
    rotate: (Math.random() - 0.5) * 180,
  }));

const HeroIntro = () => {
  const styles = homeStyles();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const pinned = !reduceMotion;
  const { scrollY } = useViewportScroll();
  const isPhone = useMediaQuery(PHONE_QUERY);

  // How far the tagline and buttons have been revealed, as a scroll position. It follows
  // the scroll position, except on phones where it only ever moves forward.
  const reveal = useMotionValue(0);
  const taglineOpacity = useTransform(reveal, TAGLINE_IN, [0, 1]);
  const taglineY = useTransform(reveal, TAGLINE_IN, [20, 0]);
  const buttonsOpacity = useTransform(reveal, BUTTONS_IN, [0, 1]);
  const buttonsY = useTransform(reveal, BUTTONS_IN, [20, 0]);
  const buttonsScale = useTransform(reveal, BUTTONS_IN, [0.92, 1]);
  const heroOpacity = useTransform(scrollY, HERO_OUT, [1, 0]);
  const heroY = useTransform(scrollY, [HOLD, PIN_DISTANCE], [0, HOLD - PIN_DISTANCE], {
    ease: (t: number) => t,
  });

  // Invisible buttons shouldn't catch clicks: they work while revealed and while the hero
  // hasn't faded away.
  const [buttonsClickable, setButtonsClickable] = useState(false);
  useEffect(() => {
    reveal.set(window.scrollY);
    const update = (y: number) => {
      reveal.set(isPhone ? Math.max(reveal.get(), y) : y);
      setButtonsClickable(reveal.get() > BUTTONS_CLICKABLE[0] && y < BUTTONS_CLICKABLE[1]);
    };
    update(window.scrollY);
    return scrollY.onChange(update);
  }, [isPhone, reveal, scrollY]);

  const letters = useMemo(() => {
    const scattered = scatter();
    // Shuffle the start order so letters land randomly rather than left to right.
    const order = scattered.map((_, i) => i).sort(() => Math.random() - 0.5);
    return scattered.map((letter, i) => ({ ...letter, order: order[i] }));
  }, []);
  const lettersDone = LETTER_DURATION + LETTER_STAGGER * letters.length;

  return (
    // Tall wrapper = the scrolling distance the hero stays pinned for.
    <Box
      sx={{
        height: pinned ? `calc(100vh + ${PIN_DISTANCE}px)` : 'auto',
        mb: pinned ? `-${NEXT_SECTION_OVERLAP}` : 0,
      }}
    >
      <Box
        sx={{
          ...styles.hero,
          ...(pinned && {
            position: 'sticky',
            top: 0,
            height: '100vh',
            minHeight: '100vh',
            // Padding is added to the height without a global border-box reset.
            boxSizing: 'border-box',
          }),
        }}
      >
        <motion.div style={pinned ? { opacity: heroOpacity, y: heroY } : undefined}>
          <Box component="h1" aria-label={TITLE} sx={{ ...styles.heroTitle, m: 0 }}>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                style={{ display: 'inline-block' }}
                initial={
                  reduceMotion
                    ? false
                    : { x: letter.x, y: letter.y, rotate: letter.rotate, scale: 0.08, opacity: 0 }
                }
                animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                transition={{
                  duration: LETTER_DURATION,
                  ease: EXPO_OUT,
                  delay: 0.2 + letter.order * LETTER_STAGGER,
                }}
              >
                {letter.char}
              </motion.span>
            ))}
          </Box>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : lettersDone * 0.75 }}
          >
            <Box sx={styles.heroSubtitle}>at UC San Diego</Box>
          </motion.div>
          <motion.div style={pinned ? { opacity: taglineOpacity, y: taglineY } : undefined}>
            <Box sx={styles.heroTagline}>
              Empowering students through technology, innovation, and community
            </Box>
          </motion.div>
          <motion.div
            style={
              pinned
                ? {
                    opacity: buttonsOpacity,
                    y: buttonsY,
                    scale: buttonsScale,
                    pointerEvents: buttonsClickable ? 'auto' : 'none',
                  }
                : undefined
            }
          >
            <Box sx={styles.heroButtons}>
              <GlassButton
                tint={colors.purpleButton}
                active
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join us&nbsp;&nbsp;→
              </GlassButton>
              <GlassButton tint="#B9BEEB" onClick={() => navigate('/events')}>
                Explore Events →
              </GlassButton>
            </Box>
          </motion.div>
        </motion.div>
      </Box>
    </Box>
  );
};

export default HeroIntro;
