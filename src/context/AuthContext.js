import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../utils/validation";

// Create Auth Context
const AuthContext = createContext();

// Storage key for user data
const USER_STORAGE_KEY = "@user_data";

/**
 * AuthProvider Component
 * Manages authentication state and provides auth functions to the app
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * Check AsyncStorage for existing user session
   */
  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login function
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Object} - { success: boolean, error: string }
   */
  const login = async (email, password) => {
    try {
      // Validate inputs
      if (!email || !password) {
        return { success: false, error: "Email and password are required" };
      }

      if (!validateEmail(email)) {
        return { success: false, error: "Invalid email format" };
      }

      if (!validatePassword(password)) {
        return {
          success: false,
          error: "Password must be at least 6 characters",
        };
      }

      // Check credentials (simulated - in real app, call API)
      const storedUsers = await AsyncStorage.getItem("@registered_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userFound = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!userFound) {
        return { success: false, error: "Invalid email or password" };
      }

      // Save user data (without password)
      const userData = { name: userFound.name, email: userFound.email };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "An error occurred during login" };
    }
  };

  /**
   * Signup function
   * @param {string} name - User name
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Object} - { success: boolean, error: string }
   */
  const signup = async (name, email, password) => {
    try {
      // Validate inputs
      if (!name || !email || !password) {
        return { success: false, error: "All fields are required" };
      }

      if (!validateName(name)) {
        return { success: false, error: "Name is required" };
      }

      if (!validateEmail(email)) {
        return { success: false, error: "Invalid email format" };
      }

      if (!validatePassword(password)) {
        return {
          success: false,
          error: "Password must be at least 6 characters",
        };
      }

      // Check if user already exists
      const storedUsers = await AsyncStorage.getItem("@registered_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userExists = users.find((u) => u.email === email);
      if (userExists) {
        return { success: false, error: "User with this email already exists" };
      }

      // Register new user
      const newUser = { name, email, password };
      users.push(newUser);
      await AsyncStorage.setItem("@registered_users", JSON.stringify(users));

      // Auto-login after signup
      const userData = { name, email };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: "An error occurred during signup" };
    }
  };

  /**
   * Logout function
   * Clears user data from state and AsyncStorage
   */
  const logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Context value
  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use Auth Context
 * @returns {Object} - Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
