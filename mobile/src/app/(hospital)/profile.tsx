import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Profile</Text>

        <Text style={styles.subtitle}>Manage your HOPE hospital account.</Text>

        <View style={styles.demoBanner}>
          <Text style={styles.demoTitle}>Temporary profile</Text>

          <Text style={styles.demoText}>
            Hospital and user information will be loaded from the backend after
            authentication is implemented.
          </Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>CG</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>City General Hospital</Text>

            <Text style={styles.email}>hospital@example.com</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Account role</Text>

          <Text style={styles.infoValue}>Referring Hospital</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>HOPE account</Text>

          <Text style={styles.infoValue}>Demo account</Text>
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
    paddingBottom: 32,
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

  profileCard: {
    marginTop: 18,
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#CCFBF1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  avatarText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F766E",
  },

  profileInfo: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },

  email: {
    fontSize: 13,
    color: "#64748B",
  },

  infoCard: {
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  infoTitle: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 6,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
});
