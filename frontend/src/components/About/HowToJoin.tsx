import { useNavigate } from 'react-router-dom';
import { Container, Box, Grid, Typography, Button as MuiButton, useMediaQuery } from '@mui/material';
import about3 from '../../images/aboutpage/about_3.jpg';
import { aboutStyles } from './styles';

const HowtoJoin = () => {
  const navigate = useNavigate();
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
          fontSize: 'clamp(40px, 9vw, 80px)',
          color: 'white',
          marginBottom: '3%',
        }}
      >
        How Do I Join?
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        direction={isMobile ? 'column' : 'row'}
        sx={{ paddingX: { xs: '2%', sm: '3%' } }}
      >
        {/* Image */}
        <Grid item xs={12} sm={5}>
          <Box
            component="img"
            src={about3}
            alt="How to Join"
            sx={{
              width: '100%',
              maxWidth: '460px',
              borderRadius: '8px',
              border: '3px solid',
              borderImage: 'linear-gradient(45deg, #FFCE00, #00F0FF) 1',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </Grid>

        {/* Text */}
        <Grid item xs={12} sm={6}>
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              fontSize: 'clamp(18px, 2.4vw, 22px)',
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            To become a general member, simply sign up with your UCSD email!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              fontSize: 'clamp(18px, 2.4vw, 22px)',
              marginTop: '20px',
              maxWidth: '500px',
              marginX: 'auto',
            }}
          >
            Do you want to be a part of the internal team? Become a member and follow us on our
            socials to be notified of when board applications open on a rolling basis.
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: '40px' }}>
        <MuiButton
          variant="outlined"
          onClick={() => navigate('/membership')}
          sx={{
            border: '2px solid',
            borderImage: 'linear-gradient(to right, #FFCE00, #00F0FF) 1',
            borderRadius: '30px',
            paddingX: '40px',
            paddingY: '22px',
            color: 'white',
            fontSize: '20px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          Become a member now!
        </MuiButton>
      </Box>
    </Container>
  );
};

export default HowtoJoin;
