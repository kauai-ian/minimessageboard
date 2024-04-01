// create context and then use the context
// wrap application in the provider with the initial context value.
// provider is how you access the context
// uses context to use state to share the cookies

import React, { PropsWithChildren, createContext, useContext } from "react";
import { useCookies } from "react-cookie";

export type CookieContextType = {
  cookies: { [x: string]: unknown };
  removeCookie: (name: string, options?: object) => void;
  setCookie: (name: string, value: string | object, options?: object) => void;
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const useCookieContext = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error(
      "useCookieContext must be used within a CookieContextProvider"
    );
  }
  return context;
};

// context provider
export const CookieProvider: React.FC<PropsWithChildren<object>> = ({
  children,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies();

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
  const contextValue: CookieContextType = {
    cookies,
    setCookie: setCookieHandler,
    removeCookie: removeCookieHandler,
  };

  return (
    <CookieContext.Provider value={contextValue}>
      {children}
    </CookieContext.Provider>
  );
};
