import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [registeredUser, setRegisteredUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // REGISTER USER
  const registerUser = async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);

      console.log("Register Response:", response.data);

      const accessToken = response.data.data.accessToken;
      const user = response.data.data.user;

      // Save access token
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      setRegisteredUser(user);

      return response.data;
    } catch (error) {
      console.log("Register Error:", error.response?.data || error.message);

      throw error;
    }
  };

  // LOGIN USER

  const loginUser = async (userData) => {
    try {
      console.log("Login Data:", userData);

      const response = await api.post("/auth/login", userData);

      console.log("Login Response:", response.data);

      const accessToken = response.data.data.accessToken;

      const user = response.data.data.user;

      console.log("Access Token:", accessToken);

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      setLoggedInUser(user);

      await getCurrentUser();

      return response.data;
    } catch (error) {
      console.log("Login Error:", error.response?.data || error.message);

      throw error;
    }
  };

  // GET CURRENT USER
  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      console.log("Token for /auth/me:", token);

      if (!token) {
        setLoggedInUser(null);
        return null;
      }

      const response = await api.get("/auth/me");

      console.log("Current User Response:", response.data);

      const user = response.data.data.user;

      setLoggedInUser(user);

      return response.data;
    } catch (error) {
      console.log(
        "Get Current User Error:",
        error.response?.data || error.message,
      );

      setLoggedInUser(null);

      throw error;
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await api.post("/auth/refresh");

      console.log("Refresh Response:", response.data);

      const accessToken = response.data.data.accessToken;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      return response.data;
    } catch (error) {
      console.log(
        "Refresh Token Error:",
        error.response?.data || error.message,
      );

      localStorage.removeItem("accessToken");

      return null;
    }
  };

  // LOGOUT USER

  const [currentUser, setCurrentUser] = useState(null);

  const logoutUser = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
    } finally {
      localStorage.removeItem("accessToken");
      setCurrentUser(null);
    }
  };

  // CHECK AUTH ON PAGE RELOAD

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const existingToken = localStorage.getItem("accessToken");

        if (existingToken) {
          try {
            await getCurrentUser();

            setLoading(false);
            return;
          } catch (error) {
            console.log("Access token expired/invalid. Refreshing...");
          }
        }

        const refreshResponse = await refreshAccessToken();

        if (refreshResponse?.data?.accessToken) {
          await getCurrentUser();
        } else {
          setLoggedInUser(null);
        }
      } catch (error) {
        console.log(
          "Authentication Check Failed:",
          error.response?.data || error.message,
        );

        setLoggedInUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  // CONTEXT

  return (
    <Auth.Provider
      value={{
        registeredUser,
        setRegisteredUser,

        loggedInUser,
        setLoggedInUser,

        loading,

        registerUser,
        loginUser,
        getCurrentUser,
        refreshAccessToken,
        logoutUser,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
