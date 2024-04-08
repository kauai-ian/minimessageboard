import { useAuthContext } from "../context/auth.context";

// useAuth hook

const useAuth = () => {
  const {cookies} = useAuthContext(); // retrieve the value of cookie
  const session = cookies["user-cookie"]; //extract the session cookie value
  const isAuthenticated = !!session; // check if the session cookie exists to determine auth status. if exists, user authenticated

  return { isAuthenticated };
};

export default useAuth;




