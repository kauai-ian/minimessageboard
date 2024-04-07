// create context and then use the context
// wrap application in the provider with the initial context value.
// provider is how you access the context
// uses context to use state to share the cookies

import React, { PropsWithChildren, createContext, useContext } from "react";
import { useCookies } from "react-cookie";

export type AuthContextType = {
  loggedIn: boolean;
  cookies: { [x: string]: unknown };
  removeCookie: (name: string, options?: object) => void;
  setCookie: (name: string, value: string | object, options?: object) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useCookieContext must be used within a CookieContextProvider"
    );
  }
  return context;
};

// context provider
export const AuthProvider: React.FC<PropsWithChildren<object>> = ({
  children,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const loggedIn = !!cookies["user-cookie"]

  const setCookieHandler = (
    name: string,
    value: string | object,
    options?: object
  ) => {
    setCookie(name, value, options);
  };

  const removeCookieHandler = (name: string, options?: object) => {
    removeCookie(name, options);
  };
  const contextValue: AuthContextType = {
    loggedIn,
    cookies,
    setCookie: setCookieHandler,
    removeCookie: removeCookieHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
