export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    website?: string;
    company?: {
      name: string;
      catchPhrase?: string;
      bs?: string;
    };
    address?: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo?: {
        lat: string;
        lng: string;
      };
    };
  }
  
  export interface UserStore {
    users: User[];
    setUsers: (users: User[]) => void;
    addUser: (user: User) => void;
    updateUser: (id: number, updatedUser: Partial<User>) => void;
    deleteUser: (id: number) => void;
  }
  
  export interface UserDetailsProps {
    user: User | null;
    open: boolean;
    onClose: () => void;
  }
  
  export interface UserFormProps {
    user?: User;
    open: boolean;
    onClose: () => void;
    onSubmit: (user: Omit<User, 'id'>) => void;
  }