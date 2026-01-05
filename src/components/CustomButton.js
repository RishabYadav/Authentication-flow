import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

/**
 * CustomButton Component
 * Reusable button with loading state
 */
const CustomButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
}) => {
  const buttonStyle =
    variant === "primary" ? styles.primaryButton : styles.secondaryButton;
  const textStyle =
    variant === "primary"
      ? styles.primaryButtonText
      : styles.secondaryButtonText;

  return (
    <TouchableOpacity
      style={[buttonStyle, (disabled || loading) && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : "#6200ee"} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#6200ee",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    shadowColor: "#6200ee",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#6200ee",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  secondaryButtonText: {
    color: "#6200ee",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default CustomButton;
