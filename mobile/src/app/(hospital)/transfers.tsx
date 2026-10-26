import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransfers } from "../../store/TransferContext";

export default function TransfersScreen() {
  const { transfers, isLoading, error, refreshTransfers } = useTransfers();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Transfers</Text>
        <Text style={styles.subtitle}>
          Manage and monitor hospital transfer requests.
        </Text>
        {isLoading && <Text style={styles.detail}>Loading transfers...</Text>}

        {error && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Unable to load transfers</Text>
            <Text style={styles.emptyDescription}>{error}</Text>

            <Pressable
              style={styles.createButton}
              onPress={() => void refreshTransfers()}
            >
              <Text style={styles.createButtonText}>Try again</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total transfers</Text>
          <Text style={styles.summaryCount}>{transfers.length}</Text>
        </View>

        <Pressable
          style={styles.createButton}
          onPress={() => router.push("/create-transfer")}
        >
          <Text style={styles.createButtonText}>+ Create Transfer</Text>
        </Pressable>

        {transfers.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No transfers yet</Text>
            <Text style={styles.emptyDescription}>
              Create a transfer request to see it listed here.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            <Text style={styles.sectionTitle}>Recent Transfers</Text>

            {transfers.map((transfer) => (
              <Pressable
                key={transfer.id}
                style={styles.transferCard}
                onPress={() =>
                  router.push({
                    pathname: "/(hospital)/transfer-details",
                    params: { id: transfer.id },
                  })
                }
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.transferId}>{transfer.id}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      transfer.urgency === "emergency"
                        ? styles.emergencyBadge
                        : transfer.urgency === "urgent"
                          ? styles.urgentBadge
                          : styles.routineBadge,
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {transfer.urgency.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text style={styles.patientName}>{transfer.patient.name}</Text>

                <Text style={styles.detail}>
                  {transfer.medical.primaryCondition}
                </Text>

                <View style={styles.cardFooter}>
                  <View style={styles.statusIndicator} />
                  <Text style={styles.detail}>
                    {transfer.status.replace(/_/g, " ")}
                  </Text>
                </View>

                <Text style={styles.hospital}>
                  Receiving hospital: {transfer.receivingHospitalId}
                </Text>

                <Text style={styles.viewDetails}>View details →</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  content: {
    padding: 20,
    paddingBottom: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#172B4D",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 21,
    marginTop: 6,
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: "#E8F5EF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
  },
  summaryLabel: {
    color: "#47665C",
    fontSize: 14,
  },
  summaryCount: {
    color: "#176B5B",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 4,
  },
  createButton: {
    backgroundColor: "#176B5B",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5EAF0",
    borderRadius: 14,
    padding: 24,
    alignItems: "center",
  },
  emptyTitle: {
    color: "#172B4D",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptyDescription: {
    color: "#64748B",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
  },
  list: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#172B4D",
    marginBottom: 4,
  },
  transferCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5EAF0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  transferId: {
    color: "#64748B",
    fontSize: 12,
    flexShrink: 1,
  },
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },
  emergencyBadge: {
    backgroundColor: "#FEE2E2",
  },
  urgentBadge: {
    backgroundColor: "#FEF3C7",
  },
  routineBadge: {
    backgroundColor: "#E2E8F0",
  },
  statusText: {
    color: "#334155",
    fontSize: 10,
    fontWeight: "700",
  },
  patientName: {
    color: "#172B4D",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },
  detail: {
    color: "#64748B",
    fontSize: 13,
    textTransform: "capitalize",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 14,
    marginBottom: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0F766E",
  },
  hospital: {
    color: "#475569",
    fontSize: 13,
    marginTop: 5,
  },
  viewDetails: {
    color: "#176B5B",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 14,
    textAlign: "right",
  },
});
