import { createContext, ReactNode, useState } from 'react';

type AuthenticatedUser = {
  children: ReactNode;
};

type User = {
  userId: string;
  loggedIn: boolean;
  role: string;
  profile: object;
};

const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: AuthenticatedUser) => {
  const [auth, setAuth] = useState<User>({
    userId: '',
    loggedIn: false,
    role: '',
    profile: {},
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
