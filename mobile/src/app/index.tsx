import { router } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brandContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>H</Text>
          </View>

          <Text style={styles.brand}>HOPE</Text>

          <Text style={styles.tagline}>
            Coordinating care when every second matters.
          </Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            HOPE connects hospitals, dispatchers and ambulance operators to
            coordinate patient transfers efficiently.
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => router.push("/role-selection")}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Patient transfer coordination platform
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "space-between",
  },

  brandContainer: {
    alignItems: "center",
    marginTop: 80,
  },

  logo: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "#0F766E",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  logoText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  brand: {
    fontSize: 42,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#0F172A",
  },

  tagline: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#334155",
    textAlign: "center",
    maxWidth: 320,
  },

  descriptionContainer: {
    paddingHorizontal: 12,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    color: "#64748B",
  },

  bottomContainer: {
    marginBottom: 12,
  },

  primaryButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: "#0F766E",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  footerText: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 12,
    color: "#94A3B8",
  },
});
