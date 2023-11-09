import React, { createContext, useState, useContext } from "react";

// Create a context with an empty object as default value.
const UserContext = createContext({});

// Hook to use the user context
export const useUserContext = () => useContext(UserContext);

// Provider component to wrap your application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (newAttributes) => {
    setUser((currentUser) => {
      return { ...currentUser, ...newAttributes };
    });
  };

  const contextValue = {
    user,
    setUser,
    updateUser, // expose updateUser function
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
