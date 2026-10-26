import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Role = {
  id: string;
  title: string;
  description: string;
  shortLabel: string;
};

const roles: Role[] = [
  {
    id: "referring_hospital",
    title: "Referring Hospital",
    description:
      "Create patient transfer requests and coordinate patients who need care elsewhere.",
    shortLabel: "Hospital",
  },
  {
    id: "receiving_hospital",
    title: "Receiving Hospital",
    description:
      "Review incoming transfer requests and coordinate acceptance of patients.",
    shortLabel: "Hospital",
  },
  {
    id: "dispatcher",
    title: "HOPE Dispatcher",
    description:
      "Coordinate hospitals, ambulances and the movement of patients.",
    shortLabel: "Dispatcher",
  },
  {
    id: "ambulance_operator",
    title: "Ambulance Operator",
    description:
      "Manage ambulance availability and respond to transfer assignments.",
    shortLabel: "Ambulance",
  },
];

export default function RoleSelectionScreen() {
  const handleRoleSelection = (role: Role) => {
    router.push({
      pathname: "/login",
      params: {
        role: role.id,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>‹</Text>
          <Text style={styles.backLabel}>Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>How will you use HOPE?</Text>

          <Text style={styles.subtitle}>
            Select the role that best describes your organization or
            responsibility.
          </Text>
        </View>

        <View style={styles.rolesContainer}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={styles.roleCard}
              activeOpacity={0.8}
              onPress={() => handleRoleSelection(role)}
            >
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>{role.shortLabel.charAt(0)}</Text>
              </View>

              <View style={styles.roleContent}>
                <Text style={styles.roleTitle}>{role.title}</Text>

                <Text style={styles.roleDescription}>{role.description}</Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.footer}>
          You can only access features permitted for your role.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingRight: 12,
  },

  backText: {
    fontSize: 32,
    lineHeight: 32,
    color: "#0F766E",
    marginRight: 4,
  },

  backLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },

  header: {
    marginTop: 28,
    marginBottom: 28,
  },

  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 23,
    color: "#64748B",
  },

  rolesContainer: {
    gap: 14,
  },

  roleCard: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#CCFBF1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  iconText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F766E",
  },

  roleContent: {
    flex: 1,
  },

  roleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },

  roleDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
  },

  arrow: {
    fontSize: 28,
    color: "#94A3B8",
    marginLeft: 8,
  },

  footer: {
    marginTop: 28,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
    color: "#94A3B8",
  },
});
