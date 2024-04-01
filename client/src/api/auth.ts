// api auth
import axios from "axios";
import API_Url from "./config";
import getErrorMessage from "../helpers/getErrorMessage";

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
    }, {
      withCredentials: true // Include credentials to allow cookies sharing
    });
    return await res.data;
  } catch (error) {
    throw new Error("Failed to login: " + getErrorMessage(error));
  }
};

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
    }, {
      withCredentials: true 
    });
    return await res.data;
  } catch (error) {
    throw new Error("Failed to login: " + getErrorMessage(error));
  }
};

export const logout = async () => {
  try {
    const res = await axios.delete(`${API_Url}/auth/logout`);
    return await res.data;
  } catch (error) {
    throw new Error("Failed to login: " + getErrorMessage(error));
  }
};
