import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import { homeStyles } from './styles';
import { colors } from '../../theme';
import SegmentedTabs from '../common/SegmentedTabs';
import HeroIntro from './HeroIntro';
import { ScrollRise, ScrollWords } from './ScrollReveal';
import CommunityFlipCard from './CommunityFlipCard';
import TeamMemberCard from './TeamMemberCard';
import { TEAM_MEMBERS } from './teamData';
import DevLogo from '../../images/ourCommunitiesImages/DevLogo.png';
import InnovateLogo from '../../images/ourCommunitiesImages/InnovateLogo.png';
import OpenSourceLogo from '../../images/ourCommunitiesImages/OpenSourceLogo.png';

const WHAT_IS_CSES_COPY = `For over 21 years, CSES has been at the forefront of undergraduate computing, growing the largest student-led tech community on campus. Through our Dev, OpenSource, and Innovate divisions, we give students the chance to build real-world software, contribute to open-source projects, and explore cutting-edge research. We celebrate curiosity, foster innovation, and empower the next generation of tech leaders.`;

const COMMUNITIES = [
  {
    name: 'Open-Source',
    logo: OpenSourceLogo,
    accent: colors.lightBlue,
    description: 'Contribute to real projects and learn collaborative development practices',
    path: '/opensourcecommunity',
  },
  {
    name: 'Innovate',
    logo: InnovateLogo,
    accent: colors.purple,
    description: 'Turn ideas into reality through hackathons and entrepreneurial ventures',
    path: '/innovatecommunity',
  },
  {
    name: 'Dev',
    logo: DevLogo,
    accent: colors.mint,
    description: 'Build industry-ready skills and connect with mentors in tech',
    path: '/devcommunity',
  },
];

const TEAM_TABS = ['General', 'Open-Source', 'Innovate', 'Dev'];
const MEMBERS_PER_PAGE = { xs: 2, sm: 4, md: 8 };

const Home = () => {
  const navigate = useNavigate();
  const styles = homeStyles();

  const [teamTab, setTeamTab] = useState('General');
  const [teamPage, setTeamPage] = useState(0);

  const filteredMembers = useMemo(
    () => TEAM_MEMBERS.filter((member) => member.community === teamTab),
    [teamTab],
  );

  // Page size follows the md layout; smaller breakpoints wrap within the grid.
  const pageSize = MEMBERS_PER_PAGE.md;
  const pageCount = Math.ceil(filteredMembers.length / pageSize);
  const visibleMembers = filteredMembers.slice(teamPage * pageSize, (teamPage + 1) * pageSize);

  const handleTeamTabChange = (tab: string) => {
    setTeamTab(tab);
    setTeamPage(0);
  };

  return (
    <Box sx={styles.pageWrapper}>
      <HeroIntro />

      <Container maxWidth="xl" sx={styles.container}>
        {/* What is CSES? */}
        <Box sx={styles.sectionWrapper}>
          <ScrollRise>
            <Box component="h2" sx={{ ...styles.sectionTitle, m: 0 }}>
              What is CSES?
            </Box>
          </ScrollRise>
          <Box sx={styles.aboutParagraph}>
            <ScrollWords text={WHAT_IS_CSES_COPY} />
          </Box>
        </Box>

        {/* Communities */}
        <Box sx={styles.sectionWrapper}>
          <Grid container spacing={4} justifyContent="center">
            {COMMUNITIES.map((community, i) => (
              <Grid item xs={12} sm={4} key={community.name}>
                <ScrollRise startVh={0.92 - i * 0.07}>
                  <CommunityFlipCard
                    community={community}
                    onVisit={() => navigate(community.path)}
                  />
                </ScrollRise>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Meet the Team! */}
        <Box sx={styles.sectionWrapper}>
          <ScrollRise>
            <Box component="h2" sx={{ ...styles.sectionTitle, m: 0 }}>
              Meet the Team!
            </Box>
            <Box sx={styles.sectionSubtitle}>The people who make CSE Society possible</Box>
          </ScrollRise>

          <ScrollRise startVh={0.88}>
            <Box sx={styles.teamTabsWrapper}>
              <SegmentedTabs options={TEAM_TABS} value={teamTab} onChange={handleTeamTabChange} />
            </Box>
          </ScrollRise>

          {visibleMembers.length > 0 ? (
            <Grid container spacing={3} justifyContent="center" sx={styles.teamGrid}>
              {visibleMembers.map((member, i) => (
                <Grid item xs={12} sm={6} md={3} key={`${member.community}-${member.name}`}>
                  <TeamMemberCard member={member} index={i} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={styles.emptyText}>Team members coming soon.</Box>
          )}

          {pageCount > 1 && (
            <Box sx={styles.dotsWrapper}>
              {Array.from({ length: pageCount }, (_, index) => (
                <Box
                  key={index}
                  sx={index === teamPage ? styles.dotActive : styles.dot}
                  onClick={() => setTeamPage(index)}
                />
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
