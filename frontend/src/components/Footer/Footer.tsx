import React from 'react';
import { Box, Typography, Link } from '@mui/material';
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
        padding: { xs: '4px 40px 64px', md: '20px 40px 20px' },
        color: 'white',
        paddingBottom: { xs: '64px', md: '20px' },
      }}
    >
      {/* Desktop Layout */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={csesLogo}
            alt="logo"
            style={{ height: '60px', marginRight: '10px' }}
          />
        </Box>

        {/* Center Contact Info */}
        <Typography sx={{ fontSize: '18px', fontStyle: 'italic' }}>
          For all inquiries, contact{' '}
          <Link href="mailto:cses@ucsd.edu" color="inherit">
            cses@ucsd.edu
          </Link>.
        </Typography>

        {/* Social Icons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {links.map(({ logo, link }, idx) => (
            <Link
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logo}
                alt="social"
                style={{ width: '32px', height: '32px' }}
              />
            </Link>
          ))}
        </Box>
      </Box>

      {/* Mobile Layout */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          paddingTop: 2,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={csesLogo}
            alt="logo"
            style={{ height: '50px', marginRight: '10px' }}
          />
        </Box>

        {/* Social Icons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {links.map(({ logo, link }, idx) => (
            <Link
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logo}
                alt="social"
                style={{ width: '28px', height: '28px' }}
              />
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
