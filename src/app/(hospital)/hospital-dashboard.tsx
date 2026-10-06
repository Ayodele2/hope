import { router } from "expo-router";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function HospitalDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.hospitalName}>Lagos University Hospital</Text>
          </View>

          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileText}>H</Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Card */}
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyIcon}>
            <Text style={styles.emergencyIconText}>!</Text>
          </View>

          <View style={styles.emergencyInfo}>
            <Text style={styles.emergencyTitle}>Need urgent assistance?</Text>

            <Text style={styles.emergencyDescription}>
              Contact the HOPE coordination team immediately.
            </Text>
          </View>

          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* Create Transfer */}
        <TouchableOpacity
          style={styles.createTransfer}
          activeOpacity={0.85}
          onPress={() => router.push("/create-transfer")}
        >
          <View style={styles.createIcon}>
            <Text style={styles.plus}>+</Text>
          </View>

          <View style={styles.createInfo}>
            <Text style={styles.createTitle}>Create Transfer Request</Text>

            <Text style={styles.createDescription}>
              Start a new patient transfer
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Active Transfers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Transfers</Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transferCard}>
          <View style={styles.transferTop}>
            <View>
              <Text style={styles.patientName}>Patient #HOPE-001</Text>

              <Text style={styles.transferRoute}>
                Lagos University Hospital → St. Nicholas Hospital
              </Text>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>In Transit</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.transferBottom}>
            <View>
              <Text style={styles.detailLabel}>Ambulance</Text>
              <Text style={styles.detailValue}>HOPE-AMB-014</Text>
            </View>

            <View>
              <Text style={styles.detailLabel}>ETA</Text>
              <Text style={styles.detailValue}>18 min</Text>
            </View>

            <TouchableOpacity style={styles.trackButton}>
              <Text style={styles.trackText}>Track</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transfers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transfers</Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentCard}>
          <View style={styles.recentIcon}>
            <Text style={styles.check}>✓</Text>
          </View>

          <View style={styles.recentInfo}>
            <Text style={styles.recentPatient}>Patient #HOPE-0008</Text>

            <Text style={styles.recentDestination}>Reddington Hospital</Text>
          </View>

          <Text style={styles.completed}>Completed</Text>
        </View>

        <View style={styles.recentCard}>
          <View style={styles.recentIcon}>
            <Text style={styles.check}>✓</Text>
          </View>

          <View style={styles.recentInfo}>
            <Text style={styles.recentPatient}>Patient #HOPE-0007</Text>

            <Text style={styles.recentDestination}>Lagoon Hospital</Text>
          </View>

          <Text style={styles.completed}>Completed</Text>
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
    paddingBottom: 32,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    marginBottom: 24,
  },

  greeting: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },

  hospitalName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "#CCFBF1",
    alignItems: "center",
    justifyContent: "center",
  },

  profileText: {
    color: "#0F766E",
    fontSize: 18,
    fontWeight: "800",
  },

  emergencyCard: {
    backgroundColor: "#FEF2F2",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  emergencyIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
  },

  emergencyIconText: {
    color: "#DC2626",
    fontSize: 20,
    fontWeight: "800",
  },

  emergencyInfo: {
    flex: 1,
    marginHorizontal: 12,
  },

  emergencyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#991B1B",
  },

  emergencyDescription: {
    fontSize: 11,
    lineHeight: 16,
    color: "#B91C1C",
    marginTop: 3,
  },

  emergencyButton: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },

  emergencyButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },

  createTransfer: {
    backgroundColor: "#0F766E",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  createIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  plus: {
    fontSize: 28,
    color: "#0F766E",
    fontWeight: "400",
  },

  createInfo: {
    flex: 1,
    marginLeft: 14,
  },

  createTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  createDescription: {
    color: "#CCFBF1",
    fontSize: 12,
    marginTop: 4,
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 28,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  viewAll: {
    color: "#0F766E",
    fontSize: 13,
    fontWeight: "700",
  },

  transferCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  transferTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  patientName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  transferRoute: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 5,
    maxWidth: 220,
    lineHeight: 17,
  },

  statusBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    height: 28,
  },

  statusText: {
    color: "#2563EB",
    fontSize: 11,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 16,
  },

  transferBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  detailLabel: {
    fontSize: 11,
    color: "#94A3B8",
    marginBottom: 3,
  },

  detailValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },

  trackButton: {
    backgroundColor: "#CCFBF1",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9,
  },

  trackText: {
    color: "#0F766E",
    fontWeight: "700",
    fontSize: 12,
  },

  recentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
  },

  check: {
    color: "#16A34A",
    fontSize: 18,
    fontWeight: "800",
  },

  recentInfo: {
    flex: 1,
    marginLeft: 12,
  },

  recentPatient: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },

  recentDestination: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },

  completed: {
    color: "#16A34A",
    fontSize: 11,
    fontWeight: "700",
  },
});
