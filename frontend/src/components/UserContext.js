import React, { createContext, useState, useContext } from 'react';

// Create a Context for user information
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("asd@gmail.com"); // Initial state is null

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
