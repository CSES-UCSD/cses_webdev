import { Box } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { homeStyles } from './styles';
import { ScrollRise } from './ScrollReveal';
import { TeamMember } from './teamData';

// Close to GSAP's expo.out: a fast start with a long, soft landing.
const EXPO_OUT = [0.16, 1, 0.3, 1];
const COLUMNS = 4; // cards per row on large screens, used to stagger across a row

// Two layers of motion: the outer wrapper rises in as you scroll to the section, and the
// inner one plays whenever the card appears, which is what animates the cards back in
// when you switch tabs or pages.
const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const styles = homeStyles();
  const reduceMotion = useReducedMotion();

  return (
    <ScrollRise startVh={0.95 - (index % COLUMNS) * 0.05} fullHeight>
      <motion.div
        style={{ height: '100%' }}
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: EXPO_OUT, delay: index * 0.06 }}
      >
        <Box className="glow-card" sx={styles.teamCard}>
          <Box className="team-ring" sx={styles.teamPhotoRing}>
            <Box component="img" src={member.photo} alt={member.name} sx={styles.teamPhoto} />
          </Box>
          <Box sx={styles.teamName}>{member.name}</Box>
          <Box sx={styles.teamRole}>{member.role}</Box>
        </Box>
      </motion.div>
    </ScrollRise>
  );
};

export default TeamMemberCard;
