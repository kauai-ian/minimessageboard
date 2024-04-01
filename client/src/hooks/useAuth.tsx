import { useCookieContext } from "../context/auth.context";

// useAuth hook

const useAuth = () => {
  const {cookies} = useCookieContext(); // retrieve the value of cookie
  const session = cookies["daCookieMonster"]; //extract the session cookie value
  const isAuthenticated = !!session; // check if the session cookie exists to determine auth status. if exists, user authenticated

  return { isAuthenticated };
};

export default useAuth;


// react cookie uses cookies to  react-cookie
// https://clerk.com/blog/setting-and-using-cookies-in-react

