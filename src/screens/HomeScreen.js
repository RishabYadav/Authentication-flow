import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useAuth } from "../context/AuthContext";
import CustomButton from "../components/CustomButton";
import { commonStyles } from "../styles/commonStyles";

/**
 * HomeScreen Component
 * Displays user information and logout option
 */
const HomeScreen = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>
              {user?.name?.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.nameText}>{user?.name}</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{user?.name}</Text>
            </View>

            <View style={[styles.infoRow, styles.infoRowLast]}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user?.email}</Text>
            </View>
          </View>

          <CustomButton title="Logout" onPress={logout} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#6200ee",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
  },
  welcomeText: {
    fontSize: 24,
    color: "#666",
    marginBottom: 8,
  },
  nameText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoRowLast: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  infoLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "600",
  },
});

export default HomeScreen;
