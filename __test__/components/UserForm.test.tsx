import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../../src/components/UserForm';
import { mockUsers } from './__mock__/mockUsers';

describe('UserForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders add user form correctly', () => {
    render(<UserForm open={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Add User')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /phone/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /website/i })).toBeInTheDocument();
  });

  it('renders edit user form correctly', () => {
    render(
      <UserForm user={mockUsers[0]} open={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );

    expect(screen.getByText('Edit User')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue('Leanne Graham');
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('Sincere@april.biz');
    expect(screen.getByRole('textbox', { name: /phone/i })).toHaveValue('1-770-736-8031 x56442');
    expect(screen.getByRole('textbox', { name: /website/i })).toHaveValue('hildegard.org');
  });

  it('submits form with correct data', () => {
    render(<UserForm open={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), {
      target: { value: 'Jane Smith' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /phone/i }), {
      target: { value: '123-456-7890' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /website/i }), {
      target: { value: 'janesmith.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '123-456-7890',
      website: 'janesmith.com',
    });
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<UserForm open={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
