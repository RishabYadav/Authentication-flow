/**
 * Validation utility functions for form inputs
 */

/**
 * Validate email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password length
 * @param {string} password - Password to validate
 * @returns {boolean} - True if valid (min 6 characters), false otherwise
 */
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Validate name is not empty
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateName = (name) => {
  return name && name.trim().length > 0;
};

/**
 * Get error message for email validation
 * @param {string} email - Email to validate
 * @returns {string} - Error message or empty string
 */
export const getEmailError = (email) => {
  if (!email) return "Email is required";
  if (!validateEmail(email)) return "Invalid email format";
  return "";
};

/**
 * Get error message for password validation
 * @param {string} password - Password to validate
 * @returns {string} - Error message or empty string
 */
export const getPasswordError = (password) => {
  if (!password) return "Password is required";
  if (!validatePassword(password))
    return "Password must be at least 6 characters";
  return "";
};

/**
 * Get error message for name validation
 * @param {string} name - Name to validate
 * @returns {string} - Error message or empty string
 */
export const getNameError = (name) => {
  if (!name || !name.trim()) return "Name is required";
  return "";
};
