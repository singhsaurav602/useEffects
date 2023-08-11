import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  //Appwide default state
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userStorredLoginInformation = localStorage.getItem;
    if (userStorredLoginInformation.getItem === 1) setIsLoggedIn(true);
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", 1);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContextProvider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContextProvider>
  );
};

export default AuthContext;
