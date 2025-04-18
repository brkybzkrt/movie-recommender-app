import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  register: async ({ username, email, password }) => {
    try {
      set({ isLoading: true });

      const response = await fetch(
        "https://movie-recommender-app-3g9v.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const { user, token } = data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      set({ user, token, isLoading: false });

      return { success: true };
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      return {
        success: false,
        error: error.message || "Registration failed. Please try again.",
      };
    }
  },
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");

      if (token && user) {
        const parsedUser = JSON.parse(user);
        set({ user: parsedUser, token, isLoading: false });
      } else {
        set({ user: null, token: null, isLoading: false });
      }
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ user: null, token: null, isLoading: false });
    }
  },
  logout: async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      set({ user: null, token: null });
    } catch (error) {
      console.log(error);
    }
  },
  login: async ({ usernameOrEmail, password }) => {
    try {
      console.log("Login attempt");
      console.log("Username or email:", usernameOrEmail);
      console.log("Password:", password);
      set({ isLoading: true });

      const response = await fetch("https://movie-recommender-app-3g9v.onrender.com/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usernameOrEmail, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const { user, token } = data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      set({ user, token, isLoading: false });

      return { success: true };
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      return {
        success: false,
        error: error.message || "Login failed. Please try again.",
      };
    }
  },
}));
