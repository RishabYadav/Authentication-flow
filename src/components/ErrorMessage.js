import React from "react";
import { Text, StyleSheet } from "react-native";

/**
 * ErrorMessage Component
 * Displays validation or error messages
 */
const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return <Text style={styles.errorText}>{message}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: "#d32f2f",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
    marginLeft: 4,
  },
});

export default ErrorMessage;
