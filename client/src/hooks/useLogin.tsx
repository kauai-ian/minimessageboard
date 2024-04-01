// useLogin hook to reuse login state
import { useState } from "react";
import * as api from "../api/auth"
import getErrorMessage from "../helpers/getErrorMessage";
import { LoginFormData } from "../types";
import { useNavigate } from "react-router";

const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<unknown | null>(null);

  const login = async ({ username, password }: LoginFormData) => {
    setLoading(true);
    try {
      const res = await api.login({ username, password }); // api login auth
      setData(res.data);
      navigate("/profile");
    } catch (err) {
      console.error("failed to login", err);
      const error = getErrorMessage(err);
      setError(error);
    }
    setLoading(false);
  };
  return { loading, error, data, login };
};

export default useLogin
// login function
// set loading to active
//  get the username and password from the response
// set the data state to hold the response
// redirect to the profile
