//UseSignup is a custom hook to look into Reacts state management to find out if loading…and its job is to send the request to the server.
//Handles all the logic and state within the Register component in the app.
// Dual purpose: separation of logic and know if the function is working.

import { useState } from "react";
import { useNavigate } from "react-router";
import { SignupFormData } from "../types";
import * as api from "../api/auth";
import getErrorMessage from "../helpers/getErrorMessage";

const useSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<unknown | null>(null);

  const signup = async ({ username, password }: SignupFormData) => {
    setLoading(true);
    try {
      const res = await api.signup({ username, password });
      setData(res.data);
      navigate("/profile");
    } catch (err) {
      throw new Error("failed to signup" + getErrorMessage(err));
    }
    setLoading(false);
  };

  return { loading, data, signup };
};
export default useSignup;
