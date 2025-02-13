import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser({ email });
    } catch (error) {
      throw new Error('Error en el login');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

