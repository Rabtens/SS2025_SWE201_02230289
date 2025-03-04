import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyScreen() {
  const router = useRouter();
  const { method } = useLocalSearchParams();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(58);
  const inputs = useRef<(TextInput | null)[]>([]);

  const methodTitles = {
    email: "E-Mail",
    whatsapp: "WhatsApp",
    sms: "SMS",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (text, index) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 3) inputs.current[index + 1]?.focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="help-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Enter OTP sent via {methodTitles[method] || "E-Mail"}</Text>
      <Text style={styles.subtitle}>We've sent OTP to tshewang7257@gmail.com</Text>

      <Text style={styles.label}>OTP <Text style={{ color: "red" }}>*</Text></Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <View style={styles.timerContainer}>
        <MaterialIcons name="refresh" size={20} color={timer > 0 ? "green" : "gray"} />
        <Text style={styles.timerText}>00:{timer < 10 ? `0${timer}` : timer}</Text>
      </View>

      <TouchableOpacity style={styles.tryButton} onPress={() => router.push('/tabs/app/otp-selection')}>
        <Text style={styles.tryButtonText}>Try another method</Text>
      </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 20,
    borderRadius: 8,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  timerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
    marginLeft: 5,
  },
  tryButton: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  tryButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});