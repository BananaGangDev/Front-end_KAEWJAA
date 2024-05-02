import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);

  const login = (access_token, refresh_token) => {
    setAuthTokens({ access_token, refresh_token });
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  };

  const logout = () => {
    setAuthTokens(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  return (
    <AuthContext.Provider value={{ authTokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
