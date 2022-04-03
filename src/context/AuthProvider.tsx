import { createContext, ReactNode, useState } from 'react';

type AuthenticatedUser = {
  children: ReactNode;
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }: AuthenticatedUser) => {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
