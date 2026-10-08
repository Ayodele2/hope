import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type Urgency = "routine" | "urgent" | "emergency";

type TransferForm = {
  patientName: string;
  patientAge: string;
  patientGender: string;
  medicalCondition: string;
  currentCondition: string;
  urgency: Urgency | "";
  receivingHospital: string;
  medicalSupport: string[];
  ambulanceType: string;
  oxygenRequired: boolean;
  monitoringRequired: boolean;
};

const TOTAL_STEPS = 7;

export default function CreateTransferScreen() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<TransferForm>({
    patientName: "",
    patientAge: "",
    patientGender: "",
    medicalCondition: "",
    currentCondition: "",
    urgency: "",
    receivingHospital: "",
    medicalSupport: [],
    ambulanceType: "",
    oxygenRequired: false,
    monitoringRequired: false,
  });

  const updateForm = <K extends keyof TransferForm>(
    field: K,
    value: TransferForm[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const toggleMedicalSupport = (support: string) => {
    setForm((current) => {
      const exists = current.medicalSupport.includes(support);

      return {
        ...current,
        medicalSupport: exists
          ? current.medicalSupport.filter((item) => item !== support)
          : [...current.medicalSupport, support],
      };
    });
  };

  const validateStep = () => {
    if (step === 1) {
      if (!form.patientName.trim()) {
        Alert.alert("Missing information", "Please enter the patient's name.");
        return false;
      }

      if (!form.patientAge.trim()) {
        Alert.alert("Missing information", "Please enter the patient's age.");
        return false;
      }

      if (!form.patientGender) {
        Alert.alert(
          "Missing information",
          "Please select the patient's gender.",
        );
        return false;
      }
    }

    if (step === 2) {
      if (!form.medicalCondition.trim()) {
        Alert.alert(
          "Missing information",
          "Please describe the patient's medical condition.",
        );
        return false;
      }

      if (!form.currentCondition.trim()) {
        Alert.alert(
          "Missing information",
          "Please describe the patient's current condition.",
        );
        return false;
      }
    }

    if (step === 3) {
      if (!form.urgency) {
        Alert.alert(
          "Missing information",
          "Please select the transfer urgency.",
        );
        return false;
      }
    }

    if (step === 4) {
      if (!form.receivingHospital.trim()) {
        Alert.alert(
          "Missing information",
          "Please enter the receiving hospital.",
        );
        return false;
      }
    }

    if (step === 6) {
      if (!form.ambulanceType) {
        Alert.alert(
          "Missing information",
          "Please select the ambulance requirement.",
        );
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) {
      return;
    }

    if (step < TOTAL_STEPS) {
      setStep((current) => current + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((current) => current - 1);
      return;
    }

    router.back();
  };

  const handleSubmit = () => {
    Alert.alert(
      "Demo submission",
      "The transfer request is ready to be submitted. Backend submission will be implemented in a later milestone.",
      [
        {
          text: "OK",
          onPress: () => router.replace("/(hospital)/transfers"),
        },
      ],
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Patient information</Text>
            <Text style={styles.sectionDescription}>
              Enter only the information required to coordinate the transfer.
            </Text>

            <Field
              label="Patient name"
              placeholder="Enter patient name"
              value={form.patientName}
              onChangeText={(value) => updateForm("patientName", value)}
            />

            <Field
              label="Age"
              placeholder="Enter patient age"
              keyboardType="numeric"
              value={form.patientAge}
              onChangeText={(value) => updateForm("patientAge", value)}
            />

            <Text style={styles.label}>Gender</Text>

            <View style={styles.optionRow}>
              {["Male", "Female", "Other"].map((gender) => (
                <OptionButton
                  key={gender}
                  label={gender}
                  selected={
                    form.patientGender.toLowerCase() === gender.toLowerCase()
                  }
                  onPress={() => updateForm("patientGender", gender)}
                />
              ))}
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Medical condition</Text>
            <Text style={styles.sectionDescription}>
              Provide enough clinical context for the receiving team and HOPE
              dispatcher to understand the transfer.
            </Text>

            <Field
              label="Primary condition"
              placeholder="e.g. Severe abdominal pain"
              value={form.medicalCondition}
              onChangeText={(value) => updateForm("medicalCondition", value)}
            />

            <Field
              label="Current condition"
              placeholder="Describe the patient's current condition"
              multiline
              value={form.currentCondition}
              onChangeText={(value) => updateForm("currentCondition", value)}
            />
          </View>
        );

      case 3:
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Transfer urgency</Text>
            <Text style={styles.sectionDescription}>
              How quickly does this patient need to be transferred?
            </Text>

            <UrgencyOption
              title="Routine"
              description="Transfer can be coordinated without immediate urgency."
              selected={form.urgency === "routine"}
              onPress={() => updateForm("urgency", "routine")}
            />

            <UrgencyOption
              title="Urgent"
              description="Transfer should be coordinated as soon as possible."
              selected={form.urgency === "urgent"}
              onPress={() => updateForm("urgency", "urgent")}
            />

            <UrgencyOption
              title="Emergency"
              description="Patient requires immediate transfer coordination."
              selected={form.urgency === "emergency"}
              onPress={() => updateForm("urgency", "emergency")}
            />
          </View>
        );

      case 4:
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Receiving hospital</Text>
            <Text style={styles.sectionDescription}>
              Where should the patient be transferred?
            </Text>

            <Field
              label="Hospital"
              placeholder="Enter receiving hospital"
              value={form.receivingHospital}
              onChangeText={(value) => updateForm("receivingHospital", value)}
            />

            <View style={styles.demoBox}>
              <Text style={styles.demoTitle}>DEMO</Text>
              <Text style={styles.demoText}>
                Hospital search and verified hospital selection will be added
                after the backend is connected.
              </Text>
            </View>
          </View>
        );

      case 5:
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Required medical support</Text>
            <Text style={styles.sectionDescription}>
              Select any support the patient may require during transfer.
            </Text>

            {[
              "Doctor",
              "Nurse",
              "Oxygen",
              "Cardiac monitoring",
              "Critical care support",
            ].map((support) => (
              <SelectableRow
                key={support}
                label={support}
                selected={form.medicalSupport.includes(support)}
                onPress={() => toggleMedicalSupport(support)}
              />
            ))}
          </View>
        );

      case 6:
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ambulance requirements</Text>
            <Text style={styles.sectionDescription}>
              Tell HOPE what type of ambulance support is required.
            </Text>

            <Text style={styles.label}>Ambulance type</Text>

            <SelectableRow
              label="Basic ambulance"
              selected={form.ambulanceType === "basic"}
              onPress={() => updateForm("ambulanceType", "basic")}
            />

            <SelectableRow
              label="Advanced ambulance"
              selected={form.ambulanceType === "advanced"}
              onPress={() => updateForm("ambulanceType", "advanced")}
            />

            <SelectableRow
              label="Critical care ambulance"
              selected={form.ambulanceType === "critical_care"}
              onPress={() => updateForm("ambulanceType", "critical_care")}
            />

            <Text style={[styles.label, styles.supportLabel]}>
              Additional requirements
            </Text>

            <SelectableRow
              label="Oxygen required"
              selected={form.oxygenRequired}
              onPress={() => updateForm("oxygenRequired", !form.oxygenRequired)}
            />

            <SelectableRow
              label="Patient monitoring required"
              selected={form.monitoringRequired}
              onPress={() =>
                updateForm("monitoringRequired", !form.monitoringRequired)
              }
            />
          </View>
        );

      case 7:
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Review transfer request</Text>
            <Text style={styles.sectionDescription}>
              Review the information before submitting the transfer request.
            </Text>

            <ReviewRow label="Patient" value={form.patientName} />
            <ReviewRow label="Age" value={form.patientAge} />
            <ReviewRow label="Gender" value={form.patientGender} />
            <ReviewRow
              label="Medical condition"
              value={form.medicalCondition}
            />
            <ReviewRow
              label="Current condition"
              value={form.currentCondition}
            />
            <ReviewRow label="Urgency" value={formatValue(form.urgency)} />
            <ReviewRow
              label="Receiving hospital"
              value={form.receivingHospital}
            />
            <ReviewRow
              label="Medical support"
              value={
                form.medicalSupport.length > 0
                  ? form.medicalSupport.join(", ")
                  : "None selected"
              }
            />
            <ReviewRow
              label="Ambulance"
              value={formatValue(form.ambulanceType)}
            />
            <ReviewRow
              label="Oxygen"
              value={form.oxygenRequired ? "Required" : "Not required"}
            />
            <ReviewRow
              label="Monitoring"
              value={form.monitoringRequired ? "Required" : "Not required"}
            />

            <View style={styles.demoBox}>
              <Text style={styles.demoTitle}>DEMO SUBMISSION</Text>
              <Text style={styles.demoText}>
                This request will not be sent to a server yet. Backend
                submission will be implemented in a later milestone.
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Create transfer</Text>
          <Text style={styles.headerSubtitle}>
            Step {step} of {TOTAL_STEPS}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressSegment,
              index < step && styles.progressSegmentActive,
            ]}
          />
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {renderStep()}
      </ScrollView>

      <View style={styles.footer}>
        {step < TOTAL_STEPS ? (
          <Pressable style={styles.primaryButton} onPress={handleNext}>
            <Text style={styles.primaryButtonText}>Continue</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.primaryButton} onPress={handleSubmit}>
            <Text style={styles.primaryButtonText}>
              Submit transfer request
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

type FieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
  keyboardType?: "default" | "numeric";
};

function Field({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  keyboardType = "default",
}: FieldProps) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        textAlignVertical={multiline ? "top" : "center"}
      />
    </View>
  );
}

type OptionButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function OptionButton({ label, selected, onPress }: OptionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.optionButton, selected && styles.optionButtonSelected]}
    >
      <Text
        style={[
          styles.optionButtonText,
          selected && styles.optionButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

type UrgencyOptionProps = {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

function UrgencyOption({
  title,
  description,
  selected,
  onPress,
}: UrgencyOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.urgencyCard, selected && styles.urgencyCardSelected]}
    >
      <View style={styles.radioOuter}>
        {selected && <View style={styles.radioInner} />}
      </View>

      <View style={styles.urgencyContent}>
        <Text style={styles.urgencyTitle}>{title}</Text>
        <Text style={styles.urgencyDescription}>{description}</Text>
      </View>
    </Pressable>
  );
}

type SelectableRowProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function SelectableRow({ label, selected, onPress }: SelectableRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.selectableRow, selected && styles.selectableRowSelected]}
    >
      <Text
        style={[
          styles.selectableText,
          selected && styles.selectableTextSelected,
        ]}
      >
        {label}
      </Text>

      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </Pressable>
  );
}

type ReviewRowProps = {
  label: string;
  value: string;
};

function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <View style={styles.reviewRow}>
      <Text style={styles.reviewLabel}>{label}</Text>
      <Text style={styles.reviewValue}>{value || "Not provided"}</Text>
    </View>
  );
}

function formatValue(value: string) {
  if (!value) {
    return "Not selected";
  }

  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
  },

  backText: {
    fontSize: 30,
    color: "#0F172A",
    lineHeight: 32,
  },

  headerContent: {
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  headerSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: "#64748B",
  },

  progressContainer: {
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 4,
    backgroundColor: "#FFFFFF",
  },

  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#E2E8F0",
  },

  progressSegmentActive: {
    backgroundColor: "#0F766E",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  section: {
    width: "100%",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },

  sectionDescription: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
  },

  fieldContainer: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#0F172A",
    backgroundColor: "#FFFFFF",
  },

  multilineInput: {
    minHeight: 130,
    paddingTop: 14,
  },

  optionRow: {
    flexDirection: "row",
    gap: 10,
  },

  optionButton: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  optionButtonSelected: {
    borderColor: "#0F766E",
    backgroundColor: "#ECFDF5",
  },

  optionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },

  optionButtonTextSelected: {
    color: "#0F766E",
  },

  urgencyCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },

  urgencyCardSelected: {
    borderColor: "#0F766E",
    backgroundColor: "#ECFDF5",
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#94A3B8",
    alignItems: "center",
    justifyContent: "center",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0F766E",
  },

  urgencyContent: {
    flex: 1,
    marginLeft: 14,
  },

  urgencyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  urgencyDescription: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19,
    color: "#64748B",
  },

  demoBox: {
    marginTop: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#99F6E4",
    borderRadius: 12,
    backgroundColor: "#F0FDFA",
  },

  demoTitle: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: "#0F766E",
  },

  demoText: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 19,
    color: "#475569",
  },

  selectableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 54,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },

  selectableRowSelected: {
    borderColor: "#0F766E",
    backgroundColor: "#ECFDF5",
  },

  selectableText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },

  selectableTextSelected: {
    color: "#0F766E",
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#94A3B8",
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxSelected: {
    borderColor: "#0F766E",
    backgroundColor: "#0F766E",
  },

  checkmark: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  supportLabel: {
    marginTop: 20,
  },

  reviewRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  reviewLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },

  reviewValue: {
    marginTop: 4,
    fontSize: 15,
    lineHeight: 21,
    color: "#0F172A",
  },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },

  primaryButton: {
    minHeight: 54,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F766E",
  },

  primaryButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
