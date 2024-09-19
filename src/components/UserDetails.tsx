import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Avatar, Box, useMediaQuery, Theme, useTheme } from '@mui/material';
import { UserDetailsProps } from '@/props/common';

const UserDetails: React.FC<UserDetailsProps> = ({ user, open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems={isMobile ? 'center' : 'flex-start'} mb={2}>
          <Avatar
            src={`https://picsum.photos/seed/${user.id}/200`}
            sx={{ width: 80, height: 80, mr: isMobile ? 0 : 2, mb: isMobile ? 2 : 0 }}
          />
          <Box textAlign={isMobile ? 'center' : 'left'}>
            <Typography variant="h5" gutterBottom>{user.name}</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Phone: {user.phone}</Typography>
            <Typography variant="body1">Website: {user.website}</Typography>
          </Box>
        </Box>
        {user.company && (
          <Box mt={2}>
            <Typography variant="h6">Company</Typography>
            <Typography variant="body1">Name: {user.company.name}</Typography>
            <Typography variant="body1">Catch Phrase: {user.company.catchPhrase}</Typography>
          </Box>
        )}
        {user.address && (
          <Box mt={2}>
            <Typography variant="h6">Address</Typography>
            <Typography variant="body1">
              {user.address.street}, {user.address.suite}
            </Typography>
            <Typography variant="body1">
              {user.address.city}, {user.address.zipcode}
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDetails;