import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Button, Box, useMediaQuery, Theme, useTheme } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useUserStore } from '../store/userStore';
import { User } from '@/props/common';
import UserDetails from './UserDetails';
import UserForm from './UserForm';

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
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
        <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddUser}
            sx={{ mb: 2, width: '100%' }}
        >
            Add User
        </Button>
        <List>
            {users.map((user) => (
            <ListItem
                key={user.id}
                sx={{
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                mb: 1,
                p: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: isMobile ? 2 : 0 }}>
                <ListItemAvatar>
                    <Avatar src={`https://picsum.photos/seed/${user.id}/200`} />
                </ListItemAvatar>
                <ListItemText
                    primary={user.name}
                    secondary={
                    <React.Fragment>
                        <Typography component="span" variant="body2" color="text.primary">
                        {user.email}
                        </Typography>
                    </React.Fragment>
                    }
                    onClick={() => handleUserClick(user)}
                    sx={{ cursor: 'pointer' }}
                />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end', width: '100%' }}>
                <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleEditUser(user)}
                    sx={{ mr: 1 }}
                    size="small"
                >
                    Edit
                </Button>
                <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteUser(user.id)}
                    color="error"
                    size="small"
                >
                    Delete
                </Button>
                </Box>
            </ListItem>
            ))}
        </List>
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