import React from 'react';
import { render, screen } from '@testing-library/react';
import UserDetails from '../../src/components/UserDetails';
import { mockUsers } from './__mock__/mockUsers';

describe('UserDetails', () => {
  it('renders user details correctly', () => {
    render(<UserDetails user={mockUsers[0]} open={true} onClose={() => {}} />);

    expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-email')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-phone')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-company')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-company-name')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-company-catch')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-address')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-city')).toBeInTheDocument();
  });

  it('does not render when user is null', () => {
    const { container } = render(<UserDetails user={null} open={true} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });
});
