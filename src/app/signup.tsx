import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  const { role } = useLocalSearchParams<{ role: string }>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.logo}>HOPE</Text>

            <Text style={styles.title}>Create your account</Text>

            <Text style={styles.subtitle}>Register as {roleName}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {role === "hospital" || role === "receiving"
                  ? "Hospital name"
                  : "Full name"}
              </Text>

              <TextInput
                style={styles.input}
                placeholder={
                  role === "hospital" || role === "receiving"
                    ? "Enter hospital name"
                    : "Enter your full name"
                }
                placeholderTextColor="#94A3B8"
                value={name}
                onChangeText={setName}
              />
            </View>

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
              <Text style={styles.label}>Phone number</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                placeholderTextColor="#94A3B8"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>

              <TextInput
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.signupButton}
              activeOpacity={0.8}
              onPress={() => {
                console.log("Signup:", {
                  name,
                  email,
                  phone,
                  password,
                  role,
                });
              }}
            >
              <Text style={styles.signupButtonText}>Create Account</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>

              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/login",
                    params: { role },
                  });
                }}
              >
                <Text style={styles.loginLink}> Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  keyboard: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
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
    marginTop: 32,
  },

  logo: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#0F766E",
    marginBottom: 22,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 8,
  },

  form: {
    marginTop: 32,
  },

  inputContainer: {
    marginBottom: 18,
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

  signupButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#0F766E",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  loginText: {
    color: "#64748B",
    fontSize: 14,
  },

  loginLink: {
    color: "#0F766E",
    fontSize: 14,
    fontWeight: "700",
  },
});
