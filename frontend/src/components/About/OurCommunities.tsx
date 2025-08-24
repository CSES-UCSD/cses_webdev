import { Container, Box, Grid, Typography, Link, useMediaQuery } from '@mui/material';
import { aboutStyles } from './styles';
import dev from '../../images/ourCommunitiesImages/cses_dev.png';
import opensource from '../../images/ourCommunitiesImages/cses_opensource.png';
import innovate from '../../images/ourCommunitiesImages/cses_innovate.png';

const Communities = () => {
  const styles = aboutStyles();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Container
      disableGutters
      sx={{
        width: '100%',
        backgroundColor: 'transparent',
        paddingY: '5%',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          ...styles.mainTitleTop,
          fontSize: 'clamp(32px, 8vw, 65px)',
          color: 'white',
          marginBottom: '2%',
        }}
      >
        Our Communities
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: 'white',
          fontSize: 'clamp(15px, 3vw, 20px)',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        At CSES, we have various communities that cover different areas of tech and offer hands-on
        projects that allow you to collaborate with others, gain experience, and build your resume.
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: 'white',
          fontSize: 'clamp(15px, 3vw, 20px)',
          maxWidth: '800px',
          margin: '1% auto 4%',
        }}
      >
        Websites are coming soon, but for now, check out our{' '}
        <Link
          href="https://linktr.ee/csesucsd"
          rel="noopener noreferrer"
          color="inherit"
          target="_blank"
          underline="always"
        >
          Linktree
        </Link>{' '}
        and come to our quarterly kick-off events for the latest updates on each community's
        recruitment and projects!
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        direction={isMobile ? 'column' : 'row'}
      >
        {[opensource, innovate, dev].map((src, idx) => (
          <Grid item key={idx}>
            <Box
              component="img"
              src={src}
              alt={`CSES logo ${idx}`}
              sx={{
                width: isMobile ? '200px' : '250px',
                maxWidth: '90vw',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Communities;
