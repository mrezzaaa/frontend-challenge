import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import { Add, Edit, Delete, ChevronRight } from '@mui/icons-material';
import { useUserStore } from '../store/userStore';
import { User } from '@/props/common';
import UserDetails from './UserDetails';
import UserForm from './UserForm';
import { QRCodeSVG } from 'qrcode.react';

const UserList: React.FC = () => {
  const { users, setUsers, addUser, updateUser, deleteUser } = useUserStore();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [setUsers]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    setEditingUser(undefined);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    deleteUser(id);
  };

  const handleFormSubmit = (userData: Omit<User, 'id'>) => {
    if (editingUser) {
      updateUser(editingUser.id, userData);
    } else {
      addUser({ ...userData, id: Date.now() });
    }
    setIsFormOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Button
        data-testid="add-user-button"
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddUser}
        sx={{ mb: 2, width: '100%', borderRadius: '8px', textTransform: 'none' }}
      >
        Add New User
      </Button>
      <Box display="grid" gridTemplateColumns={isMobile ? '1fr' : '1fr 1fr'} gap={3}>
        {users.map((user) => (
          <Card
            key={user.id}
            sx={{
              borderRadius: '20px',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              background: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
              backdropFilter: 'blur(10px)', // Blur effect for the card
              '&:hover': { transform: 'translateY(-5px)' },
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                padding: 4,
              }}
            >
              {/* Avatar */}
              <Avatar
                src={`https://picsum.photos/seed/${user.id}/200`}
                sx={{ width: 100, height: 100, mb: 2 }}
              />

              {/* Basic Info */}
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {user.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.email}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.phone}
              </Typography>

              {/* QR Code for Website */}
              <Divider sx={{ my: 2, width: '80%' }} />
              <QRCodeSVG
                value={`https://example.com/${user.id}`}
                size={100}
                fgColor="#000"
                bgColor="transparent"
              />
            </CardContent>

            {/* Card Actions */}
            <CardActions
              sx={{
                justifyContent: 'space-between',
                px: 2,
                pb: 2,
              }}
            >
              <Box>
                <Button
                  startIcon={<Edit />}
                  onClick={() => handleEditUser(user)}
                  variant="text"
                  sx={{ mr: 1, textTransform: 'none' }}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<Delete />}
                  onClick={() => handleDeleteUser(user.id)}
                  color="error"
                  variant="text"
                  sx={{ textTransform: 'none' }}
                >
                  Delete
                </Button>
              </Box>
              <Button color="primary" onClick={() => handleUserClick(user)}>
                <small>Details</small>
                <ChevronRight />
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <UserDetails user={selectedUser} open={!!selectedUser} onClose={handleCloseDetails} />
      <UserForm
        user={editingUser}
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default UserList;
