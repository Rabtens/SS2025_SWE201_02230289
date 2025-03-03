import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  StatusBar,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

// Image and text data
const slides = [
  {
    image: require("/home/kuenzangrabten/Desktop/SS2025_SWE201_02230289/practicals/practical_1/assets/images/image1.png"),
    title: "Get going with us",
    subtitle: "Use GoCar to get across town – from anywhere, at any time.",
  },
  {
    image: require("/home/kuenzangrabten/Desktop/SS2025_SWE201_02230289/practicals/practical_1/assets/images/image2.png"),
    title: "Welcome to Gojek!",
    subtitle: "We're your go-to app for hassle-free commutes.",
  },
  {
    image: require("/home/kuenzangrabten/Desktop/SS2025_SWE201_02230289/practicals/practical_1/assets/images/image3.png"),
    title: "Rides for all",
    subtitle: "Up to three steps with every trip - perfect for travel with friends and family.",
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [phoneNumber, setPhoneNumber] = useState("92325933");
  const [countryCode, setCountryCode] = useState("+65");

  const openLanguageModal = () => {
    setLanguageModalVisible(true);
  };

  const closeLanguageModal = () => {
    setLanguageModalVisible(false);
  };

  const selectLanguage = (language: string) => {
    setSelectedLanguage(language);
  };

  const languages = [
    { name: "English", code: "en" },
    { name: "Bahasa Indonesia", code: "id" },
    { name: "Tiếng Việt", code: "vi" },
  ];

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <SafeAreaView style={styles.container}>
        {/* Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.timeText}>3:04</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="wifi" size={16} color="#000" />
            <View style={styles.batteryContainer}>
              <Text style={styles.batteryText}>38</Text>
              <Ionicons name="battery-full" size={16} color="#000" />
            </View>
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("/home/kuenzangrabten/Desktop/SS2025_SWE201_02230289/practicals/practical_1/assets/images/gojek.png")}
              style={styles.logo}
            />
          </View>
          <TouchableOpacity style={styles.languageContainer} onPress={openLanguageModal}>
            <View style={styles.languageButton}>
              <Text style={styles.languageText}>{selectedLanguage}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setCurrentIndex(newIndex);
          }}
        >
          {slides.map((slide, index) => (
            <View key={index} style={styles.slide}>
              <Image source={slide.image} style={styles.illustration} />
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.subtitle}>{slide.subtitle}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Page Indicators (Dots) */}
        <View style={styles.dotContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>

        {/* Login and Signup Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupText}>I'm new, sign me up</Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <Text style={styles.terms}>
          By logging in or registering, you agree to our{" "}
          <Text style={styles.link}>Terms of service</Text> and{" "}
          <Text style={styles.link}>Privacy policy</Text>.
        </Text>
      </SafeAreaView>

      {/* Language Selection Modal */}
      <Modal
        visible={languageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeLanguageModal}
      >
        <TouchableWithoutFeedback onPress={closeLanguageModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.languageModalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Change language</Text>
                  <Text style={styles.modalSubtitle}>Which language do you prefer?</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeLanguageModal}
                  >
                    <View style={styles.closeButtonCircle}>
                      <Text style={styles.closeButtonText}>×</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.languageOptions}>
                  {languages.map((language, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.languageOption}
                      onPress={() => selectLanguage(language.name)}
                    >
                      <Text style={styles.languageOptionText}>{language.name}</Text>
                      <View style={styles.radioButton}>
                        {selectedLanguage === language.name && (
                          <View style={styles.radioButtonSelected} />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={closeLanguageModal}
                >
                  <Text style={styles.continueButtonText}>
                    Continue in {selectedLanguage}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 10,
    height: 30,
  },
  timeText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  batteryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  batteryText: {
    fontSize: 12,
    marginRight: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  logoContainer: {
    height: 36,
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 36,
    resizeMode: "contain",
  },
  languageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  languageButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 36,
  },
  languageText: {
    fontSize: 14,
    color: "#555",
  },
  slide: {
    width: screenWidth,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  illustration: {
    width: "90%",
    height: 250,
    resizeMode: "contain",
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "green",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "green",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupButton: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
  },
  terms: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  link: {
    color: "green",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  languageModalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalHeader: {
    marginBottom: 20,
    position: "relative",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  closeButtonCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 18,
    lineHeight: 20,
    color: "#666",
  },
  languageOptions: {
    marginBottom: 20,
  },
  languageOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  languageOptionText: {
    fontSize: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "green",
  },
  continueButton: {
    backgroundColor: "green",
    borderRadius: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});