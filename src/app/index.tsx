import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOPE</Text>

      <Text style={styles.subtitle}>
        Patient Transfer Coordination Platform
      </Text>

      <Text style={styles.status}>Foundation initialized</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#475569",
    marginBottom: 24,
  },

  status: {
    fontSize: 14,
    color: "#64748B",
  },
});
