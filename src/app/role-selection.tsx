import { router } from "expo-router";
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const roles = [
  {
    id: "hospital",
    title: "Referring Hospital",
    description: "Create and manage patient transfer requests.",
  },
  {
    id: "dispatcher",
    title: "HOPE Dispatcher",
    description: "Coordinate hospitals, ambulances and transfers.",
  },
  {
    id: "ambulance",
    title: "Ambulance Operator",
    description: "Receive and manage ambulance transfer jobs.",
  },
  {
    id: "receiving",
    title: "Receiving Hospital",
    description: "Accept and manage incoming patients.",
  },
];

export default function RoleSelectionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <Text style={styles.title}>Who are you?</Text>

        <Text style={styles.subtitle}>Select how you will use HOPE.</Text>

        <View style={styles.roles}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={styles.roleCard}
              activeOpacity={0.8}
              onPress={() => {
                router.push({
                  pathname: "/login",
                  params: { role: role.id },
                });
              }}
            >
              <View style={styles.icon}>
                <Text style={styles.iconText}>
                  {role.id === "hospital"
                    ? "H"
                    : role.id === "dispatcher"
                      ? "D"
                      : role.id === "ambulance"
                        ? "A"
                        : "R"}
                </Text>
              </View>

              <View style={styles.roleInfo}>
                <Text style={styles.roleTitle}>{role.title}</Text>

                <Text style={styles.roleDescription}>{role.description}</Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
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
    paddingHorizontal: 24,
    paddingTop: 40,
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
    marginBottom: 32,
  },

  roles: {
    gap: 16,
  },

  roleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  icon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#CCFBF1",
    alignItems: "center",
    justifyContent: "center",
  },

  iconText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F766E",
  },

  roleInfo: {
    flex: 1,
    marginLeft: 16,
  },

  roleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  roleDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#64748B",
    marginTop: 4,
  },

  arrow: {
    fontSize: 28,
    color: "#94A3B8",
    marginLeft: 8,
  },
});
