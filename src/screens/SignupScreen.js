import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import ErrorMessage from "../components/ErrorMessage";
import {
  getNameError,
  getEmailError,
  getPasswordError,
} from "../utils/validation";
import { commonStyles } from "../styles/commonStyles";

/**
 * SignupScreen Component
 * Handles new user registration
 */
const SignupScreen = ({ navigation }) => {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Handle signup button press
   */
  const handleSignup = async () => {
    // Reset errors
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setSignupError("");

    // Validate inputs
    const nameErr = getNameError(name);
    const emailErr = getEmailError(email);
    const passwordErr = getPasswordError(password);

    if (nameErr || emailErr || passwordErr) {
      setNameError(nameErr);
      setEmailError(emailErr);
      setPasswordError(passwordErr);
      return;
    }

    // Attempt signup
    setLoading(true);
    const result = await signup(name, email, password);
    setLoading(false);

    if (!result.success) {
      setSignupError(result.error);
    }
    // Navigation handled automatically by App.js based on auth state
  };

  /**
   * Navigate to login screen
   */
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={commonStyles.container}
      >
        <ScrollView
          contentContainerStyle={commonStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={commonStyles.card}>
            <Text style={commonStyles.title}>Create Account</Text>
            <Text style={commonStyles.subtitle}>Sign up to get started</Text>

            {/* Global error message */}
            {signupError ? <ErrorMessage message={signupError} /> : null}

            {/* Name Input */}
            <CustomInput
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              iconName="person-outline"
            />
            <ErrorMessage message={nameError} />

            {/* Email Input */}
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              iconName="mail-outline"
            />
            <ErrorMessage message={emailError} />

            {/* Password Input */}
            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              iconName="lock-closed-outline"
            />
            <ErrorMessage message={passwordError} />

            {/* Signup Button */}
            <CustomButton
              title="Sign Up"
              onPress={handleSignup}
              loading={loading}
            />

            {/* Navigate to Login */}
            <TouchableOpacity
              style={commonStyles.linkButton}
              onPress={goToLogin}
            >
              <Text style={commonStyles.linkText}>
                Already have an account?{" "}
                <Text style={commonStyles.linkTextBold}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
