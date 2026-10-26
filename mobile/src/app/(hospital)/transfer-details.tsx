import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { TransferEvent, TransferStatus } from "../..//types/transfer";
import {
  canTransitionTransferStatus,
  useTransfers,
} from "../../store/TransferContext";

const TRANSFER_STATUSES: TransferStatus[] = [
  "submitted",
  "under_review",
  "receiving_hospital_requested",
  "receiving_hospital_accepted",
  "ambulance_search",
  "ambulance_assigned",
  "ambulance_en_route_to_pickup",
  "patient_picked_up",
  "in_transit",
  "arrived",
  "handed_over",
  "completed",
  "rejected",
  "cancelled",
  "delayed",
  "transfer_failed",
];

function formatStatus(status: string) {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Time unavailable";
  }

  return date.toLocaleString();
}

function getEventTitle(event: TransferEvent) {
  if (event.type === "created") {
    return "Transfer created";
  }

  if (event.type === "status_changed") {
    return "Transfer status updated";
  }

  return formatStatus(event.type);
}

export default function TransferDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();

  const { transfers, updateTransferStatus, getTransferEvents } = useTransfers();

  const transferId = Array.isArray(id) ? id[0] : id;
  const transfer = transfers.find((item) => item.id === transferId);

  const [selectedStatus, setSelectedStatus] = useState<TransferStatus | null>(
    null,
  );

  const [isStatusExpanded, setIsStatusExpanded] = useState(false);

  const activity = transferId ? getTransferEvents(transferId) : [];

  if (!transfer) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </Pressable>

          <Text style={styles.title}>Transfer not found</Text>

          <Text style={styles.description}>
            We couldn't find this transfer in the current session. Return to the
            Transfers list and try again.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const allowedStatuses = TRANSFER_STATUSES.filter((status) =>
    canTransitionTransferStatus(transfer.status, status),
  );

  const isTerminalStatus = allowedStatuses.length === 0;

  const statusToDisplay = selectedStatus ?? transfer.status;

  const handleSaveStatus = () => {
    if (isTerminalStatus) {
      Alert.alert(
        "Transfer closed",
        "This transfer cannot move to another status.",
      );
      return;
    }

    if (!selectedStatus) {
      Alert.alert(
        "Select a status",
        "Choose a valid next status before saving.",
      );
      return;
    }

    if (selectedStatus === transfer.status) {
      Alert.alert("No changes", "Select a different status before saving.");
      return;
    }

    // Recheck the transition immediately before updating.
    if (!canTransitionTransferStatus(transfer.status, selectedStatus)) {
      setSelectedStatus(null);
      Alert.alert(
        "Invalid status change",
        "This status is not available from the transfer's current stage.",
      );
      return;
    }

    const savedStatus = selectedStatus;

    updateTransferStatus(transfer.id, savedStatus);

    setSelectedStatus(null);
    setIsStatusExpanded(false);

    Alert.alert(
      "Status updated",
      `Transfer status changed to ${formatStatus(savedStatus)}.`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back to transfers</Text>
        </Pressable>

        <Text style={styles.title}>Transfer Details</Text>
        <Text style={styles.subtitle}>Reference: {transfer.id}</Text>

        <View style={styles.statusCard}>
          <Text style={styles.sectionLabel}>Current status</Text>
          <Text style={styles.status}>{formatStatus(transfer.status)}</Text>
        </View>

        {/* Collapsible status editor */}
        <View style={styles.card}>
          <Pressable
            style={styles.collapseHeader}
            onPress={() => setIsStatusExpanded((expanded) => !expanded)}
            accessibilityRole="button"
            accessibilityLabel="Update transfer status"
            accessibilityState={{ expanded: isStatusExpanded }}
          >
            <View style={styles.collapseHeaderText}>
              <Text style={styles.collapseTitle}>Update Transfer Status</Text>
              <Text style={styles.collapseSubtitle}>
                {isTerminalStatus
                  ? "This transfer has reached a final status"
                  : isStatusExpanded
                    ? "Choose the next valid stage"
                    : "Tap to view available next statuses"}
              </Text>
            </View>

            <View style={styles.chevronContainer}>
              <Text style={styles.chevron}>{isStatusExpanded ? "▲" : "▼"}</Text>
            </View>
          </Pressable>

          {isStatusExpanded && (
            <View style={styles.expandedStatusContent}>
              {isTerminalStatus ? (
                <View style={styles.closedNotice}>
                  <Text style={styles.closedTitle}>
                    No further status changes
                  </Text>
                  <Text style={styles.helperText}>
                    This transfer is{" "}
                    {formatStatus(transfer.status).toLowerCase()}. Create a new
                    transfer if another transfer is required.
                  </Text>
                </View>
              ) : (
                <>
                  <Text style={styles.helperText}>
                    Current stage: {formatStatus(transfer.status)}. Only valid
                    next stages are shown below.
                  </Text>

                  <View style={styles.statusOptions}>
                    {allowedStatuses.map((status) => {
                      const isSelected = statusToDisplay === status;

                      return (
                        <Pressable
                          key={status}
                          accessibilityRole="radio"
                          accessibilityState={{ selected: isSelected }}
                          onPress={() => setSelectedStatus(status)}
                          style={[
                            styles.statusOption,
                            isSelected && styles.statusOptionSelected,
                          ]}
                        >
                          <Text
                            style={[
                              styles.statusOptionText,
                              isSelected && styles.statusOptionTextSelected,
                            ]}
                          >
                            {isSelected ? "●  " : "○  "}
                            {formatStatus(status)}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>

                  <Pressable
                    onPress={handleSaveStatus}
                    style={[
                      styles.saveButton,
                      !selectedStatus && styles.saveButtonDisabled,
                    ]}
                  >
                    <Text style={styles.saveButtonText}>Save Status</Text>
                  </Pressable>
                </>
              )}
            </View>
          )}
        </View>

        {/* Transfer activity timeline */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Transfer Activity</Text>
          <Text style={styles.helperText}>
            A chronological record of events for this transfer.
          </Text>

          {activity.length === 0 ? (
            <View style={styles.emptyTimeline}>
              <Text style={styles.emptyTimelineTitle}>
                No activity recorded yet
              </Text>
              <Text style={styles.emptyTimelineText}>
                Transfer creation and status updates will appear here.
              </Text>
            </View>
          ) : (
            activity.map((event, index) => {
              const isLast = index === activity.length - 1;

              return (
                <View key={event.id} style={styles.timelineRow}>
                  <View style={styles.timelineRail}>
                    <View
                      style={[
                        styles.timelineDot,
                        event.type === "created" && styles.createdDot,
                        event.type === "status_changed" && styles.updatedDot,
                      ]}
                    />

                    {!isLast && <View style={styles.timelineLine} />}
                  </View>

                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>
                      {getEventTitle(event)}
                    </Text>

                    {event.previousStatus && event.newStatus ? (
                      <View style={styles.statusChange}>
                        <Text style={styles.previousStatus}>
                          {formatStatus(event.previousStatus)}
                        </Text>
                        <Text style={styles.changeArrow}>→</Text>
                        <Text style={styles.newStatus}>
                          {formatStatus(event.newStatus)}
                        </Text>
                      </View>
                    ) : null}

                    {event.note ? (
                      <Text style={styles.timelineNote}>{event.note}</Text>
                    ) : null}

                    <Text style={styles.timelineDate}>
                      {formatDateTime(event.createdAt)}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* Patient information */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <Detail label="Patient name" value={transfer.patient.name} />
          <Detail label="Age" value={`${transfer.patient.age} years`} />
          <Detail label="Gender" value={transfer.patient.gender} />
        </View>

        {/* Medical information */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Medical Information</Text>

          <Detail
            label="Primary condition"
            value={transfer.medical.primaryCondition}
          />

          <Detail
            label="Current condition"
            value={transfer.medical.currentCondition}
          />

          <Detail label="Urgency" value={transfer.urgency} />

          <Detail
            label="Medical support"
            value={
              transfer.medicalSupport.length
                ? transfer.medicalSupport.join(", ").replace(/_/g, " ")
                : "Not specified"
            }
          />
        </View>

        {/* Transfer requirements */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Transfer Requirements</Text>

          <Detail
            label="Receiving hospital"
            value={transfer.receivingHospitalId}
          />

          <Detail
            label="Ambulance type"
            value={transfer.ambulance.type.replace(/_/g, " ")}
          />

          <Detail
            label="Oxygen required"
            value={transfer.ambulance.oxygenRequired ? "Yes" : "No"}
          />

          <Detail
            label="Monitoring required"
            value={transfer.ambulance.monitoringRequired ? "Yes" : "No"}
          />
        </View>

        {/* Timestamps */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Timestamps</Text>

          <Detail label="Created" value={formatDateTime(transfer.createdAt)} />

          <Detail
            label="Last updated"
            value={formatDateTime(transfer.updatedAt)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
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
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    marginBottom: 12,
  },
  backButtonText: {
    color: "#176B5B",
    fontSize: 15,
    fontWeight: "600",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#172B4D",
    marginBottom: 6,
  },
  subtitle: {
    color: "#64748B",
    fontSize: 13,
    marginBottom: 20,
  },
  description: {
    color: "#64748B",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  statusCard: {
    backgroundColor: "#E8F5EF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  sectionLabel: {
    color: "#47665C",
    fontSize: 13,
    marginBottom: 6,
  },
  status: {
    color: "#176B5B",
    fontWeight: "700",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5EAF0",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#172B4D",
    marginBottom: 14,
  },
  collapseHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  collapseHeaderText: {
    flex: 1,
    paddingVertical: 2,
  },
  collapseTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#172B4D",
    marginBottom: 5,
  },
  collapseSubtitle: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
  },
  chevronContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E8F5EF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  chevron: {
    color: "#0F766E",
    fontSize: 14,
    fontWeight: "700",
  },
  expandedStatusContent: {
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5EAF0",
  },
  helperText: {
    color: "#64748B",
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  closedNotice: {
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 14,
  },
  closedTitle: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },
  statusOptions: {
    gap: 8,
  },
  statusOption: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  statusOptionSelected: {
    borderColor: "#0F766E",
    backgroundColor: "#E8F5EF",
  },
  statusOptionText: {
    color: "#475569",
    fontSize: 14,
  },
  statusOptionTextSelected: {
    color: "#0F766E",
    fontWeight: "700",
  },
  saveButton: {
    backgroundColor: "#0F766E",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonDisabled: {
    opacity: 0.55,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  timelineRow: {
    flexDirection: "row",
    minHeight: 88,
  },
  timelineRail: {
    width: 24,
    alignItems: "center",
    marginRight: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#94A3B8",
    backgroundColor: "#FFFFFF",
    marginTop: 4,
  },
  createdDot: {
    borderColor: "#0F766E",
    backgroundColor: "#0F766E",
  },
  updatedDot: {
    borderColor: "#2563EB",
    backgroundColor: "#2563EB",
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 48,
    backgroundColor: "#DCE4EC",
    marginTop: 4,
    marginBottom: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 22,
  },
  timelineTitle: {
    color: "#172B4D",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },
  statusChange: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 6,
  },
  previousStatus: {
    color: "#64748B",
    fontSize: 13,
  },
  changeArrow: {
    color: "#94A3B8",
    fontSize: 14,
  },
  newStatus: {
    color: "#0F766E",
    fontSize: 13,
    fontWeight: "700",
  },
  timelineNote: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 6,
  },
  timelineDate: {
    color: "#94A3B8",
    fontSize: 12,
  },
  emptyTimeline: {
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 14,
  },
  emptyTimelineTitle: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  emptyTimelineText: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
  },
  detailRow: {
    marginBottom: 13,
  },
  detailLabel: {
    color: "#64748B",
    fontSize: 13,
    marginBottom: 4,
    textTransform: "capitalize",
  },
  detailValue: {
    color: "#172B4D",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
