// useLogin hook to reuse login state
import { useState } from "react";
import * as api from "../api/auth";
import getErrorMessage from "../helpers/getErrorMessage";
import { LoginFormData } from "../types";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/auth.context";

const useLogin = () => {
  const navigate = useNavigate();
  const { setCookie } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<unknown | null>(null);

  const login = async ({ username, password }: LoginFormData) => {
    setLoading(true);
    try {
      const res = await api.login({ username, password }); // api login auth
      setData(res.data);
      console.log(res.data)
      setCookie("user-cookie", JSON.stringify(res.data)); // there was no token, so setting the cookie with the user data changed the cookie to not be undefined. 
      navigate("/profile");
    } catch (err) {
      console.error("failed to login", err);
      const error = getErrorMessage(err);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, data, login };
};

export default useLogin;
// login function
// set loading to active
//  get the username and password from the response
// set the data state to hold the response
// redirect to the profile
