import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OTPSelectionScreen() {
  const router = useRouter();

  const otpMethods = [
    { method: "email", label: "OTP via E-mail", icon: "email", library: MaterialIcons, color: "#00AEEF" },
    { method: "whatsapp", label: "OTP via WhatsApp", icon: "whatsapp", library: FontAwesome, color: "#25D366" },
    { method: "sms", label: "OTP via SMS", icon: "chat", library: MaterialIcons, color: "#FFA500" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Choose verification method</Text>
        <TouchableOpacity>
          <Ionicons name="help-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* OTP Options */}
      {otpMethods.map(({ method, label, icon, library: IconLibrary, color }) => (
        <Pressable key={method} style={styles.option} onPress={() => router.push("/tabs/app/verify")}>
          <View style={styles.optionContent}>
            <IconLibrary name={icon} size={24} color={color} style={styles.icon} />
            <Text style={styles.optionText}>{label}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </Pressable>
      ))}

      {/* Footer */}
      <Text style={styles.footerText}>from <Text style={styles.footerLogo}>goto</Text></Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  option: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#777",
    position: "absolute",
    bottom: 20,
    width: "100%",
    marginLeft: 25,
  },
  footerLogo: {
    fontWeight: "bold",
    color: "#008000",
  },
});
