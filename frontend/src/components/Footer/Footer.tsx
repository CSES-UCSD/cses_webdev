import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@mui/material';
import InstagramIcon from '../../images/instagram-icon.svg';
import FacebookIcon from '../../images/facebook-icon.svg';
import LinkedInIcon from '../../images/linkedin-icon.svg';
import DiscordIcon from '../../images/discord-icon.svg';
import csesLogo from '../../images/Footer_Logo.png';

const links = [
  { logo: InstagramIcon, link: 'https://www.instagram.com/cses_ucsd/' },
  { logo: DiscordIcon, link: 'https://discord.gg/UkdACyy2h8' },
  { logo: FacebookIcon, link: 'https://www.facebook.com/csesucsd' },
  { logo: LinkedInIcon, link: 'https://www.linkedin.com/in/csesucsd/' },
];

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#203A7E',
        padding: '20px 40px',
        color: 'white',
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        {/* Left - Logo and copyright */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={csesLogo}
              alt="logo"
              style={{ height: '60px', marginRight: '10px' }}
            />
          </Box>
        </Grid>

        {/* Center - Contact text */}
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: '18px', fontStyle: 'italic' }}>
            For all inquiries, contact <Link href="mailto:cses@ucsd.edu" color="inherit">cses@ucsd.edu</Link>.
          </Typography>
        </Grid>

        {/* Right - Social icons */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            {links.map(({ logo, link }, idx) => (
              <Link
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ ml: idx === 0 ? 0 : 2 }}
              >
                <img
                  src={logo}
                  alt="social"
                  style={{ width: '32px', height: '32px' }}
                />
              </Link>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
