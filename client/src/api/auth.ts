// api auth
import axios from "axios";
import API_Url from "./config";
import getErrorMessage from "../helpers/getErrorMessage";
// login function async using username and pw.
export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${API_Url}/auth/login`, {
      username,
      password,
    });
    return await res.data;
  } catch (error) {
    throw new Error("Failed to login: " + getErrorMessage(error));
  }
};

// response endpoint login. post body: username, pw return response in json format

// function register async posts to the registration endpoint . username, pw, confirm pw
export const signup = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${API_Url}/auth/signup`, {
      username,
      password,
    });
    return await res.data;
  } catch (error) {
    throw new Error("Failed to login: " + getErrorMessage(error));
  }
};
// function logout async deletes to the logout endpoint

export const logout = async () => {
  try {
    const res = await axios.delete(`${API_Url}/auth/logout`);
    return await res.data;
  } catch (error) {
    throw new Error("Failed to login: " + getErrorMessage(error));
  }
};
