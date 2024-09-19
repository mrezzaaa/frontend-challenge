import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserList from '../components/UserList';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          OBS Frontend Assignment
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to the OBS Frontend Assignment. Below is a list of users fetched from an API.
        </Typography>
        <UserList />
      </Box>
    </Container>
  );
}
