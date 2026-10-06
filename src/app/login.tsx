import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function LoginScreen() {
  const { role } = useLocalSearchParams<{ role: string }>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roleName =
    role === "hospital"
      ? "Referring Hospital"
      : role === "dispatcher"
        ? "HOPE Dispatcher"
        : role === "ambulance"
          ? "Ambulance Operator"
          : "Receiving Hospital";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.logo}>HOPE</Text>

            <Text style={styles.title}>Welcome back</Text>

            <Text style={styles.subtitle}>Sign in as {roleName}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email address</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.8}
              onPress={() => {
                console.log("Login:", {
                  email,
                  password,
                  role,
                });
              }}
            >
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>

              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/signup",
                    params: { role },
                  });
                }}
              >
                <Text style={styles.signupLink}> Create account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  keyboardView: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  backText: {
    fontSize: 32,
    color: "#0F172A",
    lineHeight: 36,
  },

  header: {
    marginTop: 42,
  },

  logo: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#0F766E",
    marginBottom: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 8,
  },

  form: {
    marginTop: 40,
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },

  input: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#0F172A",
  },

  forgotPassword: {
    textAlign: "right",
    color: "#0F766E",
    fontSize: 14,
    fontWeight: "600",
    marginTop: -4,
    marginBottom: 28,
  },

  loginButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#0F766E",
    alignItems: "center",
    justifyContent: "center",
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  signupText: {
    color: "#64748B",
    fontSize: 14,
  },

  signupLink: {
    color: "#0F766E",
    fontSize: 14,
    fontWeight: "700",
  },
});
