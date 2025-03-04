import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const countryCodes = [
  { name: "Indonesia", code: "+62", flag: "🇮🇩" },
  { name: "Vietnam", code: "+84", flag: "🇻🇳" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "Afghanistan", code: "+93", flag: "🇦🇫" },
  { name: "Albania", code: "+355", flag: "🇦🇱" },
  { name: "Algeria", code: "+213", flag: "🇩🇿" },
  { name: "Bhutan", code: "+975", flag: "🇧🇹" },
];

export default function SignupScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({ name: "Bhutan", code: "+975", flag: "🇧🇹" });
  const [modalVisible, setModalVisible] = useState(false);

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>🌍 English</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Welcome to Gojek!</Text>
      <Text style={styles.subtitle}>Enter or create an account in a few easy steps.</Text>

      {/* Phone Input */}
      <Text style={styles.label}>Phone number*</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.countryPicker} onPress={() => setModalVisible(true)}>
          <Text style={styles.countryCode}>{selectedCountry.flag} {selectedCountry.code}</Text>
        </TouchableOpacity>
        <TextInput 
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter phone number" 
          keyboardType="phone-pad" 
          style={styles.input} 
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity 
        style={[styles.continueButton, !phoneNumber && { backgroundColor: "#ccc" }]} 
        onPress={() => router.push("/tabs/app/otp-selection")} 
        disabled={!phoneNumber}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {/* Terms & Privacy */}
      <Text style={styles.termsText}>
        I agree to Gojek’s <Text style={styles.linkText}>Terms of Service</Text> & <Text style={styles.linkText}>Privacy Policy</Text>.
      </Text>

      {/* Issue Button */}
      <TouchableOpacity>
        <Text style={styles.issueText}>Issue with number?</Text>
      </TouchableOpacity>

      {/* Footer Logo */}
      <Text style={styles.footerText}>from <Text style={styles.footerLogo}>goto</Text></Text>

      {/* Country Code Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country Code</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <FlatList 
              data={countryCodes}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.countryItem} onPress={() => selectCountry(item)}>
                  <Text style={styles.countryText}>{item.flag} {item.name} ({item.code})</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
  },
  backButton: {
    padding: 10,
  },
  languageButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
  },
  languageText: {
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
  },
  countryPicker: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "#008000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    marginBottom: 10,
  },
  linkText: {
    color: "#008000",
    fontWeight: "bold",
  },
  issueText: {
    fontSize: 14,
    color: "#008000",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#777",
  },
  footerLogo: {
    fontWeight: "bold",
    color: "#008000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  countryText: {
    fontSize: 16,
  },
});
