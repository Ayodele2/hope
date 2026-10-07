import { router } from "expo-router";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const activeTransfers = [
  {
    id: "HOPE-001",
    patient: "Patient Transfer",
    destination: "Receiving hospital pending",
    status: "Awaiting coordination",
  },
];

export default function HospitalHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>

            <Text style={styles.hospitalName}>City General Hospital</Text>
          </View>

          <TouchableOpacity
            style={styles.notificationButton}
            activeOpacity={0.7}
          >
            <Text style={styles.notificationIcon}>○</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mockBanner}>
          <Text style={styles.mockLabel}>DEMO DATA</Text>

          <Text style={styles.mockText}>
            Hospital information shown on this screen is temporary and will come
            from the HOPE backend later.
          </Text>
        </View>

        <View style={styles.emergencyCard}>
          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyTitle}>Need urgent coordination?</Text>

            <Text style={styles.emergencyDescription}>
              Contact the HOPE coordination team for urgent transfer assistance.
            </Text>
          </View>

          <TouchableOpacity style={styles.emergencyButton} activeOpacity={0.8}>
            <Text style={styles.emergencyButtonText}>Get Help</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.createTransferButton}
          activeOpacity={0.8}
          onPress={() => {
            // Transfer creation will be implemented in a later milestone.
            console.log("Create transfer pressed");
          }}
        >
          <View style={styles.createIcon}>
            <Text style={styles.createIconText}>+</Text>
          </View>

          <View style={styles.createContent}>
            <Text style={styles.createTitle}>Create Transfer Request</Text>

            <Text style={styles.createDescription}>
              Start coordinating a patient transfer with HOPE.
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Transfers</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/(hospital)/transfers")}
          >
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {activeTransfers.map((transfer) => (
          <View key={transfer.id} style={styles.transferCard}>
            <View style={styles.transferHeader}>
              <Text style={styles.transferId}>{transfer.id}</Text>

              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>ACTIVE</Text>
              </View>
            </View>

            <Text style={styles.transferTitle}>{transfer.patient}</Text>

            <Text style={styles.destination}>{transfer.destination}</Text>

            <View style={styles.divider} />

            <Text style={styles.transferStatus}>{transfer.status}</Text>
          </View>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction} activeOpacity={0.8}>
            <Text style={styles.quickActionIcon}>+</Text>

            <Text style={styles.quickActionText}>New Transfer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            activeOpacity={0.8}
            onPress={() => router.push("/(hospital)/messages")}
          >
            <Text style={styles.quickActionIcon}>□</Text>

            <Text style={styles.quickActionText}>Messages</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  greeting: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 4,
  },

  hospitalName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  notificationIcon: {
    fontSize: 22,
    color: "#0F766E",
  },

  mockBanner: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginBottom: 16,
  },

  mockLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#92400E",
    marginBottom: 4,
  },

  mockText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#92400E",
  },

  emergencyCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#0F766E",
    marginBottom: 14,
  },

  emergencyContent: {
    marginBottom: 16,
  },

  emergencyTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 6,
  },

  emergencyDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: "#CCFBF1",
  },

  emergencyButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },

  emergencyButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F766E",
  },

  createTransferButton: {
    minHeight: 88,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCFBF1",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  createIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#CCFBF1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  createIconText: {
    fontSize: 26,
    fontWeight: "500",
    color: "#0F766E",
  },

  createContent: {
    flex: 1,
  },

  createTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },

  createDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
  },

  arrow: {
    fontSize: 28,
    color: "#94A3B8",
    marginLeft: 8,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
  },

  viewAll: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F766E",
  },

  transferCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 28,
  },

  transferHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  transferId: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },

  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#DCFCE7",
  },

  statusText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#166534",
  },

  transferTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },

  destination: {
    fontSize: 13,
    color: "#64748B",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 14,
  },

  transferStatus: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F766E",
  },

  quickActions: {
    flexDirection: "row",
    gap: 12,
  },

  quickAction: {
    flex: 1,
    minHeight: 90,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "space-between",
  },

  quickActionIcon: {
    fontSize: 22,
    color: "#0F766E",
  },

  quickActionText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
});
