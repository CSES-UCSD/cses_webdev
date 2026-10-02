import { useState } from 'react';
import { Box } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { colors, fonts, glowCard, radii } from '../../theme';
import GlassButton from '../common/GlassButton';

type Community = {
  name: string;
  logo: string;
  accent: string;
  description: string;
  path: string;
};

// Close to GSAP's expo.out: a fast start with a long, soft landing.
const EXPO_OUT = [0.16, 1, 0.3, 1];

// Click to flip: the front shows the community's logo, the back its description and a
// link to its page.
const CommunityFlipCard = ({
  community,
  onVisit,
}: {
  community: Community;
  onVisit: () => void;
}) => {
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();
  const { name, logo, accent, description } = community;

  const face = {
    position: 'absolute' as const,
    inset: 0,
    // Without a global border-box reset, inset + padding + border would overflow the card.
    boxSizing: 'border-box' as const,
    ...glowCard(`${accent}55`),
    borderRadius: radii.card,
    p: 3,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    backfaceVisibility: 'hidden' as const,
    WebkitBackfaceVisibility: 'hidden' as const,
  };

  return (
    <Box
      sx={{
        perspective: '1100px',
        height: { xs: 270, sm: 300 },
        transition: 'transform 0.2s ease',
        '&:hover': { transform: 'translateY(-4px)' },
      }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: EXPO_OUT }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front: the whole face is the flip button */}
        <Box
          component="button"
          className="glow-card"
          type="button"
          aria-label={`${name}: show details`}
          tabIndex={flipped ? -1 : 0}
          onClick={() => setFlipped(true)}
          sx={{
            ...face,
            cursor: 'pointer',
            color: 'inherit',
            font: 'inherit',
            pointerEvents: flipped ? 'none' : 'auto',
          }}
        >
          <Box
            component="img"
            src={logo}
            alt=""
            sx={{ width: '100%', maxWidth: '200px', height: 'auto' }}
          />
          <Box sx={{ fontFamily: fonts.body, fontSize: '0.8rem', color: accent, mt: 2 }}>
            Click to learn more
          </Box>
        </Box>

        {/* Back: click anywhere to flip back, or follow the link to the page */}
        <Box
          className="glow-card"
          onClick={() => setFlipped(false)}
          sx={{ ...face, transform: 'rotateY(180deg)', cursor: 'pointer' }}
        >
          <Box
            component="h3"
            sx={{ m: 0, fontFamily: fonts.heading, fontSize: '1.3rem', color: accent }}
          >
            {name}
          </Box>
          <Box
            sx={{
              fontFamily: fonts.body,
              fontSize: '0.95rem',
              color: colors.textSecondary,
              lineHeight: 1.6,
              mt: 1.5,
            }}
          >
            {description}
          </Box>
          <Box sx={{ mt: 2.5 }}>
            <GlassButton
              tint={accent}
              active
              tabIndex={flipped ? 0 : -1}
              onClick={(e) => {
                // Don't let the click also flip the card back.
                e.stopPropagation();
                onVisit();
              }}
            >
              Learn more →
            </GlassButton>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default CommunityFlipCard;
