import { Box, Container } from '@mui/material';
import { keyframes } from '@mui/system';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassButton from '../common/GlassButton';
import TypeWriter from '../common/TypeWriter';
import { ScrollRise } from '../Home/ScrollReveal';
import { COMMUNITIES, getCommunity } from './communityData';
import { communityStyles } from './styles';

interface CommunityPageProps {
  // Which community this route renders. One component backs all three pages.
  community: string;
}

const MotionBox = motion(Box);

// Close to GSAP's expo.out: a fast start with a long, soft landing.
const EXPO_OUT = [0.16, 1, 0.3, 1];
// Matches the backdrop's resting opacity in styles.ts.
const backdropIn = keyframes`
  from { opacity: 0; }
  to { opacity: 0.55; }
`;
const SLIDE = 56; // px the copy and logo travel in from the side

const CommunityPage = ({ community: communityKey }: CommunityPageProps) => {
  const styles = communityStyles();
  const navigate = useNavigate();
  const community = getCommunity(communityKey);
  const reduceMotion = useReducedMotion();

  // Entrance for content that's already on screen when the page loads. The blocks that
  // change with the community are keyed by it, so they play again when you switch pills.
  const enter = (delay: number, from: { x?: number; y?: number; scale?: number }) => ({
    initial: reduceMotion ? false : { opacity: 0, x: 0, y: 0, scale: 1, ...from },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    transition: { duration: 0.9, ease: EXPO_OUT, delay },
  });
  const side = (s: 'left' | 'right') => (s === 'left' ? -SLIDE : SLIDE);
  // The logo sits on the opposite side from the copy.
  const logoSide = community.copySide === 'left' ? 'right' : 'left';

  return (
    <Box sx={styles.pageWrapper}>
      <Box
        key={`backdrop-${community.key}`}
        component="img"
        src={community.graphic}
        alt=""
        aria-hidden="true"
        sx={{
          ...styles.backdrop,
          [community.graphicSide]: 0,
          animation: `${backdropIn} 1.4s ease-out`,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      />

      <Container maxWidth="xl" sx={styles.container}>
        <MotionBox component="h1" sx={{ ...styles.pageTitle, m: 0 }} {...enter(0, { y: 24 })}>
          Our Communities
        </MotionBox>

        <Box sx={styles.pills}>
          {COMMUNITIES.map((option, i) => (
            <motion.div key={option.key} {...enter(0.12 + i * 0.07, { y: 16 })}>
              <GlassButton
                tint={option.accent}
                active={option.key === community.key}
                current={option.key === community.key}
                onClick={() => navigate(option.path)}
              >
                {option.name}
              </GlassButton>
            </motion.div>
          ))}
        </Box>

        <Box sx={styles.showcase}>
          <Box
            sx={{
              ...styles.showcaseInner,
              // Copy on the left means the logo column follows it, and vice
              // versa; each page in the design orients this differently.
              flexDirection: {
                xs: 'column',
                md: community.copySide === 'left' ? 'row' : 'row-reverse',
              },
            }}
          >
            <MotionBox
              key={`copy-${community.key}`}
              sx={styles.copyColumn}
              {...enter(0.25, { x: side(community.copySide) })}
            >
              <Box component="h2" sx={{ ...styles.communityName, m: 0 }}>
                {community.name}
              </Box>
              <Box sx={styles.communityDescription}>
                <TypeWriter
                  text={community.description}
                  accent={community.accent}
                  startDelay={700}
                />
              </Box>
            </MotionBox>

            <MotionBox
              key={`logo-${community.key}`}
              sx={{
                ...styles.logoColumn,
              }}
              {...enter(0.4, { x: side(logoSide), scale: 0.92 })}
            >
              <Box
                component="img"
                src={community.logo}
                alt={`CSE Society ${community.name}`}
                sx={styles.logo}
              />
            </MotionBox>
          </Box>
        </Box>

        <ScrollRise key={`heading-${community.key}`}>
          <Box component="h2" sx={{ ...styles.projectsHeading, m: 0 }}>
            Current Projects
          </Box>
          <Box sx={styles.projectsSubtitle}>See what {community.name} is building right now</Box>
        </ScrollRise>

        {community.projects.length > 0 ? (
          <Box sx={styles.projectsList}>
            {community.projects.map((project, i) => (
              <Box key={`${community.key}-${project.name}`} sx={styles.projectItem}>
                {/* Cards in the same row start a beat apart as you scroll. */}
                <ScrollRise startVh={0.95 - (i % 2) * 0.05} fullHeight>
                  <Box className="glow-card" sx={styles.projectCard(community.accent)}>
                    <Box>
                      <Box sx={styles.projectIndex(community.accent)}>
                        {String(i + 1).padStart(2, '0')}
                      </Box>
                      <Box sx={styles.projectName}>{project.name}</Box>
                      <Box sx={styles.projectDescription}>{project.description}</Box>
                      {project.members !== undefined && (
                        <Box sx={styles.projectMembers}>{project.members} members</Box>
                      )}
                    </Box>
                    {project.status && (
                      <Box sx={styles.statusChip(project.status)}>{project.status}</Box>
                    )}
                  </Box>
                </ScrollRise>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={styles.emptyText}>Projects coming soon.</Box>
        )}
      </Container>
    </Box>
  );
};

export default CommunityPage;
