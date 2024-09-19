import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserList from '../../src/components/UserList';
import { useUserStore } from '@/store/userStore';
import { mockUsers } from './__mock__/mockUsers';

jest.mock('@/store/userStore');

describe('UserList', () => {
  beforeEach(() => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      users: mockUsers,
      setUsers: jest.fn(),
      addUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUsers),
      })
    ) as jest.Mock;
  });

  it('renders user list correctly', async () => {
    render(<UserList />);
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText('Shanna@melissa.tv')).toBeInTheDocument();
    });
  });

  it('opens add user form when add button is clicked', async () => {
    render(<UserList />);
    fireEvent.click(screen.getByTestId('add-user-button'));
    await waitFor(() => {
      expect(screen.getByTestId('name-input')).toBeInTheDocument();
    });
  });

  it('opens edit user form when edit button is clicked', async () => {
    render(<UserList />);
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: /edit/i })[0]);
    });
    expect(screen.getByText('Edit User')).toBeInTheDocument();
  });

  it('calls deleteUser when delete button is clicked', async () => {
    const deleteUser = jest.fn();
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      ...useUserStore(),
      deleteUser,
    });

    render(<UserList />);
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: /delete/i })[0]);
    });
    expect(deleteUser).toHaveBeenCalledWith(1);
  });
});
