import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function TransfersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Transfers</Text>

        <Text style={styles.subtitle}>
          Manage patient transfer requests coordinated through HOPE.
        </Text>

        <View style={styles.demoBanner}>
          <Text style={styles.demoTitle}>Demo state</Text>

          <Text style={styles.demoText}>
            Transfer records will be loaded from the HOPE backend after
            authentication and database integration.
          </Text>
        </View>

        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Text style={styles.emptyIconText}>⇄</Text>
          </View>

          <Text style={styles.emptyTitle}>No transfers yet</Text>

          <Text style={styles.emptyDescription}>
            Patient transfer requests created by your hospital will appear here.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,
    flexGrow: 1,
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

  demoBanner: {
    marginTop: 24,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FDE68A",
  },

  demoTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#92400E",
    marginBottom: 5,
  },

  demoText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#92400E",
  },

  emptyState: {
    flex: 1,
    minHeight: 360,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#CCFBF1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  emptyIconText: {
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
