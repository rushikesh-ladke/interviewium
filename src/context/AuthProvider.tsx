import { createContext, ReactNode, useState } from 'react';

type AuthenticatedUser = {
  children: ReactNode;
};

type User = {
  user: string;
  loggedIn: boolean;
  role: string;
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }: AuthenticatedUser) => {
  const [auth, setAuth] = useState<User>({
    user: '',
    loggedIn: false,
    role: 'HR1',
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
