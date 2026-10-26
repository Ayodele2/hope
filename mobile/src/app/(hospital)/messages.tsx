import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>

        <Text style={styles.subtitle}>
          Communication related to your hospital's active transfers.
        </Text>

        <View style={styles.emptyState}>
          <View style={styles.icon}>
            <Text style={styles.iconText}>□</Text>
          </View>

          <Text style={styles.emptyTitle}>No messages yet</Text>

          <Text style={styles.emptyDescription}>
            Messages with receiving hospitals, HOPE dispatchers and ambulance
            operators will appear here.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
  },

  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  icon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#CCFBF1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  iconText: {
    fontSize: 28,
    color: "#0F766E",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },

  emptyDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
    textAlign: "center",
  },
});
