import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserList from '../components/UserList';

const svgBackground = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" fill="#D9E4FF"/>
    <circle cx="50" cy="50" r="40" stroke="rgba(0,0,0,0.2)" stroke-width="4" fill="none"/>
    <circle cx="50" cy="50" r="30" stroke="rgba(0,0,0,0.1)" stroke-width="4" fill="none"/>
    <circle cx="50" cy="50" r="20" stroke="rgba(0,0,0,0.05)" stroke-width="4" fill="none"/>
  </svg>
`;

export default function Home() {
  return (
    <Box
      sx={{
        backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(svgBackground)}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        textAlign: 'center', // Center text horizontally
        padding: 0,
        margin: 0,
      }}
    >
      <Container maxWidth="md" sx={{ padding: 0 }}>
        <Box sx={{ my: 0, p: 0 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            OBS Frontend Assignment
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to the OBS Frontend Assignment. Below is a list of users fetched from an API.
          </Typography>
          <UserList />
        </Box>
      </Container>
    </Box>
  );
}
