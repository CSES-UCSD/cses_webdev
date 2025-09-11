import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { Container, Box, Grid } from '@mui/material';
import background from '../../images/shape.svg';
import infinity from '../../images/infinity.svg';
import EventBox from '../Event/Event';
import { homeStyles } from './styles';
import SlideShow from './SlideShow/SlideShow';
import axios from 'axios';
import useMediaQuery from '../../hooks/useMediaQuery';
import MobileEventBox from '../Event/MobileEvent';
import CountUp from 'react-countup';
import Logo from 'public/logo.png';
import { motion } from "framer-motion"

interface EventData {
  calendar_link: string;
  description: string;
  end_time: string;
  instagram_link: string;
  location: string;
  start_time: string;
  title: string;
  _id: string;
}

const Home = () => {
  const navigate = useNavigate();
  const styles = homeStyles();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [totalEvents, setTotalEvents] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);

  // Sample team member data - replace with your actual data
  const teamMembers = [
    {
      name: "Name",
      team: "Team",
      position: "Position",
      company: "Company",
      classOf: "",
      photo: null // placeholder for now
    },
    
    
  ];

  const currentMember = teamMembers[currentPersonIndex];

  const handlePrevPerson = () => {
    setCurrentPersonIndex((prev) => 
      prev === 0 ? teamMembers.length - 1 : prev - 1
    );
  };

  const handleNextPerson = () => {
    setCurrentPersonIndex((prev) => 
      prev === teamMembers.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/events`)
      .then((response) => {
        setTotalEvents(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching total events:', error);
      });
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/usersCount`)
      .then((response) => {
        setTotalUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching total users:', error);
      });
  }, []);

  const [displayedFutureEvents, setDisplayedFutureEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/events?type=upcoming`,
        );
        let mostRecentEvents = await response.json();
        setDisplayedFutureEvents(mostRecentEvents.slice(0, 3));
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      }
    };

    fetchRecentEvents();
  }, []);

  return (
    <div style={{ 
      position: 'relative', 
      paddingBottom: '80px', 
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
      minHeight: '100vh'
    }}>
      <Box sx={styles.root}>
        <Container maxWidth="xl" sx={styles.container}>
          {/* Hero Section */}
          <Grid container spacing={4} alignItems="center" sx={{ minHeight: '80vh', paddingTop: '100px' }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
                >
                  <Box sx={{ 
                    fontSize: { xs: '3rem', md: '5rem' },
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'Chakra Petch',
                    lineHeight: 1.1,
                    marginBottom: '0.5rem'
                  }}>
                    Create.
                  </Box>
                </motion.div>
                
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 50, delay: 0.5 }}
                >
                  <Box sx={{ 
                    fontSize: { xs: '3rem', md: '5rem' },
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'Chakra Petch',
                    lineHeight: 1.1,
                    marginBottom: '0.5rem'
                  }}>
                    Solve.
                  </Box>
                </motion.div>

                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 50, delay: 0.8 }}
                >
                  <Box sx={{ 
                    fontSize: { xs: '3rem', md: '5rem' },
                    fontWeight: 'bold',
                    color: '#FFD700',
                    fontFamily: 'Chakra Petch',
                    lineHeight: 1.1,
                    marginBottom: '2rem'
                  }}>
                    Evolve.
                  </Box>
                </motion.div>

                <Box sx={{ 
                  color: 'white',
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                  fontFamily: 'Arial'
                }}>
                  We're CSES, the <span style={{ color: '#FFD700' }}>largest</span> student-led tech community at UCSD.
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: '400px'
              }}>
            
            {/* CSE Society Logo Image */}
                <img 
                  src="/logo.png"
                  alt="CSE Society Logo"
                  style={{
                  width: "80%",
                  height: "80%",
                  objectFit: "contain",
                  filter: "brightness(1.1)" // Slightly brighten the image
            }}
/>
              </Box>
            </Grid>
          </Grid>
          {/* Scroll Down Arrow */}
          <Box sx={{ 
            textAlign: 'center', 
            marginTop: '2rem',
            animation: 'bounce 2s infinite'
          }}>
            <Box sx={{ 
              color: 'white', 
              fontSize: '2rem',
              cursor: 'pointer'
            }}>
              ⌄
            </Box>
          </Box>
         

          {/* Join Section */}
          <Box sx={{ 
            textAlign: 'center',
            marginTop: '8rem',
            marginBottom: '4rem'
          }}>
            <Box sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '3rem',
              fontFamily: 'Chakra Petch'
            }}>
              Join UCSD's largest computing organisation!
            </Box>

            {/* Statistics Cards */}
            <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: '3rem' }}>
              <Grid item xs={12} sm={4} md={3}>
                <Box sx={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '2rem 1rem',
                  textAlign: 'center',
                  border: '3px solid #FFD700'
                }}>
                  <Box sx={{ 
                    fontSize: '4rem', 
                    fontWeight: 'bold', 
                    color: 'black',
                    marginBottom: '0.5rem',
                    lineHeight: 1
                  }}>
                    400+
                  </Box>
                  <Box sx={{ 
                    fontSize: '1.2rem',
                    color: 'black',
                    fontWeight: '400'
                  }}>
                    Members
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <Box sx={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '2rem 1rem',
                  textAlign: 'center',
                  border: '3px solid #FFD700'
                }}>
                  <Box sx={{ 
                    fontSize: '4rem', 
                    fontWeight: 'bold', 
                    color: 'black',
                    marginBottom: '0.5rem',
                    lineHeight: 1
                  }}>
                   20+
                  </Box>
                  <Box sx={{ 
                    fontSize: '1.2rem',
                    color: 'black',
                    fontWeight: '400'
                  }}>
                    Events
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <Box sx={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '2rem 1rem',
                  textAlign: 'center',
                  border: '3px solid #FFD700'
                }}>
                  <Box sx={{ 
                    fontSize: '4rem', 
                    fontWeight: 'bold', 
                    color: 'black',
                    marginBottom: '0.5rem',
                    lineHeight: 1
                  }}>
                    12+
                  </Box>
                  <Box sx={{ 
                    fontSize: '1.2rem',
                    color: 'black',
                    fontWeight: '400'
                  }}>
                    Annual Projects
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{
              border: '2px solid #FFD700',
              borderRadius: '25px',
              padding: '12px 24px',
              display: 'inline-block',
              background: 'transparent',
              cursor: 'pointer',
              '&:hover': {
                background: 'rgba(255, 215, 0, 0.1)'
              }
            }}
            onClick={() => navigate('/membership')}
            >
              <Box sx={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '500'
              }}>
                Become a member now!
              </Box>
            </Box>
          </Box>

          {/* Events Section */}
          <Box sx={{ 
            textAlign: 'center',
            marginTop: '8rem',
            marginBottom: '4rem',
            position: 'relative'
          }}>
            <Box sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '3rem',
              fontFamily: 'Chakra Petch'
            }}>
              {"{Events}"}
            </Box>

            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Left Arrow */}
              <Box sx={{
                position: 'absolute',
                left: '20px',
                fontSize: '2rem',
                color: 'white',
                cursor: 'pointer',
                zIndex: 2,
                '&:hover': {
                  opacity: 0.7
                }
              }}>
                ‹
              </Box>

              {/* Events Grid */}
              <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: '900px' }}>
                {[1, 2, 3].map((event, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box sx={{
                      background: 'white',
                      borderRadius: '8px',
                      padding: '0',
                      textAlign: 'center',
                      height: '300px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      border: '3px solid #FFD700',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Event content area */}
                      <Box sx={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {/* Placeholder for event content */}
                      </Box>
                      
                      {/* Event label at bottom */}
                      <Box sx={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: 'black',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}>
                        [Event {event}]
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Right Arrow */}
              <Box sx={{
                position: 'absolute',
                right: '20px',
                fontSize: '2rem',
                color: 'white',
                cursor: 'pointer',
                zIndex: 2,
                '&:hover': {
                  opacity: 0.7
                }
              }}>
                ›
              </Box>
            </Box>

            <Box sx={{
              border: '2px solid #FFD700',
              borderRadius: '25px',
              padding: '12px 24px',
              display: 'inline-block',
              background: 'transparent',
              cursor: 'pointer',
              marginTop: '3rem',
              '&:hover': {
                background: 'rgba(255, 215, 0, 0.1)'
              }
            }}
            onClick={() => navigate('/events')}
            >
              <Box sx={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '500'
              }}>
                See Events Page
              </Box>
            </Box>
          </Box>

          {/* Communities Section */}
          <Box sx={{ marginTop: '8rem', textAlign: 'center' }}>
            <Box sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '3rem',
              fontFamily: 'Chakra Petch'
            }}>
              {"{Communities}"}
            </Box>

            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={4}>
                {/* Open Source Logo */}
                <img
                src="/opensourcelogo.png"
                alt="Open Source Logo"
                style={{
                width: "200px",
                height: "190px",
                objectFit: "contain",
                filter: "brightness(1.1)"
                }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                
        
                 {/* Innovate Logo */}
                <img
                src="/innovatelogo.png"
                alt="Innovate Logo"
                style={{
                width: "200px",
                height: "200px",
                objectFit: "contain",
                filter: "brightness(1.1)"
                }}
/>

       
              </Grid>

              <Grid item xs={12} sm={4}>
          
            {/* Dev Logo */}
            <img
            src="/devlogo.png"
            alt="Dev Logo"
            style={{
              width: "200px",
              height: "210px",
              objectFit: "contain",
              filter: "brightness(1.1)"
              }}
/>  
             
                  <Box sx={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    color: 'white',
                    marginBottom: '1rem'
                  }}>
                   
                 
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ marginTop: '3rem' }}>
              <Button size="large" text="About us" onClick={() => navigate('/about')} />
            </Box>
          </Box>

          {/* Where We Are Section - Updated to match screenshot */}
          <Box sx={{ 
            textAlign: 'center',
            marginTop: '8rem',
            marginBottom: '4rem'
          }}>
            <Box sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '3rem',
              fontFamily: 'Chakra Petch'
            }}>
              {"{Where We Are}"}
            </Box>

            {/* Main container with navigation */}
            <Box sx={{ 
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {/* Left Arrow */}
              <Box 
                sx={{
                  position: 'absolute',
                  left: { xs: '10px', md: '20px' },
                  fontSize: '2rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  zIndex: 2,
                  '&:hover': {
                    color: 'white'
                  }
                }}
                onClick={handlePrevPerson}
              >
                ‹
              </Box>

              {/* Content Container */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: '2rem', md: '4rem' },
                flexDirection: { xs: 'column', md: 'row' },
                width: '100%',
                maxWidth: '600px'
              }}>
                {/* Photo Container */}
                <Box sx={{
                  width: { xs: '250px', md: '300px' },
                  height: { xs: '250px', md: '300px' },
                  background: 'linear-gradient(45deg, #FFD700 0%, #00E676 100%)',
                  borderRadius: '15px',
                  padding: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Box sx={{
                    width: '100%',
                    height: '100%',
                    background: '#f0f0f0',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#666',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}>
                    {currentMember.photo || ''}
                  </Box>
                </Box>

                {/* Text Information */}
                <Box sx={{ 
                  textAlign: { xs: 'center', md: 'left' },
                  color: 'white'
                }}>
                  <Box sx={{ 
                    fontSize: { xs: '1rem', md: '1.4rem' },
    
                    marginBottom: '1rem',
                    lineHeight: 1.2
                  }}>
                    {currentMember.position} | {currentMember.company}
                  </Box>
                  
                  <Box sx={{ 
                    fontSize: { xs: '1.4rem', md: '1.6rem' },
                    marginBottom: '1rem',
                    opacity: 0.9
                  }}>
                    Class of {currentMember.classOf}
                  </Box>
                  
                  <Box sx={{ 
                    fontSize: { xs: '1.4rem', md: '2rem' },
         
                    lineHeight: 1.2
                  }}>
                    {currentMember.name} - {currentMember.team}
                  </Box>
                </Box>
              </Box>

              {/* Right Arrow */}
              <Box 
                sx={{
                  position: 'absolute',
                  right: { xs: '10px', md: '20px' },
                  fontSize: '3rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  zIndex: 2,
                  '&:hover': {
                    color: 'white'
                  }
                }}
                onClick={handleNextPerson}
              >
                ›
              </Box>
            </Box>

            {/* Navigation Dots */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '0.5rem',
              marginTop: '2rem',
              marginBottom: '3rem'
            }}>
              {teamMembers.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: index === currentPersonIndex ? '#FFD700' : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: index === currentPersonIndex ? '#FFD700' : 'rgba(255, 255, 255, 0.8)'
                    }
                  }}
                  onClick={() => setCurrentPersonIndex(index)}
                />
              ))}
            </Box>

            <Box sx={{
              border: '2px solid #FFD700',
              borderRadius: '25px',
              padding: '12px 24px',
              display: 'inline-block',
              background: 'transparent',
              cursor: 'pointer',
              '&:hover': {
                background: 'rgba(255, 215, 0, 0.1)'
              }
            }}
            onClick={() => navigate('/team')}
            >
              <Box sx={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '500'
              }}>
                Meet the Team
              </Box>
            </Box>
          </Box>

          {/* Current Sponsors Section */}
          <Box sx={{ marginTop: '8rem', textAlign: 'center' }}>
            <Box sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '1rem',
              fontFamily: 'Chakra Petch'
            }}>
              {"{Current Sponsors}"}
            </Box>

            <Box sx={{
              color: 'white',
              fontSize: '1rem',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem'
            }}>
              Interested in how CSES can help you? Contact csed@ucsd.edu or view our sponsorship package here.
            </Box>

            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item xs={6} sm={4} md={3}>
              <img
              src="/associatedlogo.png"
              alt="associated student"
              style={{
                width: "250px",
                height: "400px",
                objectFit: "contain",
                filter: "brightness(1.1)"
                }}
/>
              </Grid>

              <Grid item xs={6} sm={4} md={3}>
              <img
              src="/csedeplogo.png"
              alt="cse department"
              style={{
                width: "125px",
                height: "125px",
                objectFit: "contain",
                filter: "brightness(1.1)"
                }}
/>
              </Grid>

              <Grid item xs={6} sm={4} md={3}>
                <Box sx={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '120px'
                }}>
                  <Box sx={{ color: '#1a237e', fontWeight: 'bold' }}></Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

        </Container>

        
      </Box>
    </div>
  );
};

export default Home;