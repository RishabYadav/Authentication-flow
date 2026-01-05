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
import { getEmailError, getPasswordError } from "../utils/validation";
import { commonStyles } from "../styles/commonStyles";

/**
 * LoginScreen Component
 * Handles user login with email and password
 */
const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Handle login button press
   */
  const handleLogin = async () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    // Validate inputs
    const emailErr = getEmailError(email);
    const passwordErr = getPasswordError(password);

    if (emailErr || passwordErr) {
      setEmailError(emailErr);
      setPasswordError(passwordErr);
      return;
    }

    // Attempt login
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      setLoginError(result.error);
    }
    // Navigation handled automatically by App.js based on auth state
  };

  /**
   * Navigate to signup screen
   */
  const goToSignup = () => {
    navigation.navigate("Signup");
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
            <Text style={commonStyles.title}>Welcome Back</Text>
            <Text style={commonStyles.subtitle}>Login to your account</Text>

            {/* Global error message */}
            {loginError ? <ErrorMessage message={loginError} /> : null}

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

            {/* Login Button */}
            <CustomButton
              title="Login"
              onPress={handleLogin}
              loading={loading}
            />

            {/* Navigate to Signup */}
            <TouchableOpacity
              style={commonStyles.linkButton}
              onPress={goToSignup}
            >
              <Text style={commonStyles.linkText}>
                Don't have an account?{" "}
                <Text style={commonStyles.linkTextBold}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
