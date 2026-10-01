import React, { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Button,
  Toolbar,
  Avatar,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import csesLogo from '../../images/logo.png';
import { navBarStyles } from './styles';
import { AuthContext } from '../../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import { User } from '../../utils/types';
import { APPLY_URL } from '../../constants';
import { COMMUNITIES } from '../Communities/communityData';
import axios from 'axios';

const NavBar = () => {
  const location = useLocation();
  const styles = navBarStyles();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  const { user, isLoggedIn } = useContext(AuthContext);

  const navItems = [
    { text: 'Home', link: '/' },
    { text: 'Events', link: '/events' },
    // Opens the first community page; its pills switch between the three.
    { text: 'Communities', link: COMMUNITIES[0].path },
  ];

  // Any of the three community pages counts as being on "Communities".
  const isActive = (link: string) =>
    location.pathname === link ||
    (link === COMMUNITIES[0].path && COMMUNITIES.some(({ path }) => path === location.pathname));

  const clickItem = (link: string) => {
    setIsDrawerOpen(false);
    navigate(link);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isLoggedIn) {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${user.email}`,
          );
          setUserData(response.data);
        }
      } catch (error) {
        console.log('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, [isLoggedIn, user.email, navigate]);

  return (
    <div>
      <AppBar sx={styles.appBar} position="fixed" elevation={0}>
        <Toolbar>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src={csesLogo}
              alt="CSE Society"
              style={{ margin: 'clamp(20px, 4vw, 25px)', height: '44px' }}
            />
            <Typography sx={styles.logoText}>at UC San Diego</Typography>
          </Link>

          <div style={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.map(({ text, link }) => (
              <Button
                key={text}
                component={Link}
                to={link}
                sx={{
                  ...styles.button,
                  ...(isActive(link) ? styles.buttonActive : {}),
                }}
              >
                {text}
              </Button>
            ))}

            <Button href={APPLY_URL} target="_blank" rel="noopener noreferrer" sx={styles.button}>
              Join us
            </Button>
          </Box>

          {isLoggedIn && userData && (
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <Link to="/membership">
                <Avatar
                  alt="User"
                  src={userData.profilePicture}
                  sx={{ width: 60, height: 60, marginLeft: '1%' }}
                />
              </Link>
              <ProfileDropdown />
            </div>
          )}

          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton onClick={() => setIsDrawerOpen(!isDrawerOpen)} color="inherit">
              {!isDrawerOpen && <MenuIcon sx={styles.menuicon} />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="top" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <List sx={styles.drawerList}>
          <ListItem
            button
            sx={{ justifyContent: 'flex-end' }}
            onClick={() => setIsDrawerOpen(false)}
          >
            <CloseIcon sx={styles.closeicon} />
          </ListItem>

          {navItems.map(({ text, link }) => (
            <ListItem button key={text} sx={styles.listitem} onClick={() => clickItem(link)}>
              <ListItemText
                primary={
                  <Typography align="center" sx={styles.button}>
                    {text}
                  </Typography>
                }
              />
            </ListItem>
          ))}

          <ListItem
            button
            key="Join us"
            sx={styles.listitem}
            onClick={() => {
              setIsDrawerOpen(false);
              window.open(APPLY_URL, '_blank', 'noopener,noreferrer');
            }}
          >
            <ListItemText
              primary={
                <Typography align="center" sx={styles.button}>
                  Join us
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default NavBar;
