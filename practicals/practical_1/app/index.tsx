import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Modal } from "react-native";
import { useRouter } from "expo-router";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    image: require("@/assets/images/image.png"),
    title: "Get going with us",
    description: "Use GoCar to get across town – from anywhere, at any time.",
  },
  {
    image: require("@/assets/images/image2.png"),
    title: "Welcome to Gojek!",
    description: "We're your go-to app for hassle-free commutes.",
  },
  {
    image: require("@/assets/images/image3.png"),
    title: "Rides for all",
    description: "Up to three stops with every trip - perfect for travel with friends and family.",
  },
];

const languages = [
  { code: "en", name: "English" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "vi", name: "Tiếng Việt" },
];

export default function HomeScreen() {
  const router = useRouter();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleLanguageModal = () => {
    setLanguageModalVisible(!languageModalVisible);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <View style={styles.container}>
      {/* Header with Logo and Language Button */}
      <View style={styles.header}>
        <Image source={require("@/assets/images/gojek.png")} style={styles.logo} resizeMode="contain" />
        <View style={styles.rightContainer}>
          <TouchableOpacity 
            style={styles.languageButton}
            onPress={toggleLanguageModal}
          >
            <Text style={styles.languageText}>🇬🇧 English</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Swiper for Onboarding Screens */}
      <View style={styles.swiperContainer}>
        <Swiper 
          loop={false}
          onIndexChanged={(index) => setActiveIndex(index)}
          showsPagination={false} // Hide default pagination
        >
          {slides.map((slide, index) => (
            <View key={index} style={styles.slide}>
              <Image source={slide.image} style={styles.illustration} resizeMode="contain" />
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          ))}
        </Swiper>
        
        {/* Custom Dots Pagination - Outside the Swiper but in a fixed position */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex ? styles.activeDot : null
              ]}
            />
          ))}
        </View>
      </View>
      
      {/* Bottom section with buttons */}
      <View style={styles.bottomSection}>
        {/* Buttons */}
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/tabs/app/signup")}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={() => router.push("/tabs/app/signup")}>
          <Text style={styles.signupText}>I'm new, sign me up</Text>
        </TouchableOpacity>
        
        {/* Terms & Privacy */}
        <Text style={styles.termsText}>
          By logging in or registering, you agree to our{" "}
          <Text style={styles.linkText}>Terms of service</Text> and{" "}
          <Text style={styles.linkText}>Privacy policy</Text>.
        </Text>
      </View>
      
      {/* Language Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={languageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Change language</Text>
              <Text style={styles.modalSubtitle}>Which language do you prefer?</Text>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setLanguageModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            {languages.map((language) => (
              <TouchableOpacity 
                key={language.code}
                style={styles.languageOption}
                onPress={() => handleLanguageSelect(language)}
              >
                <Text style={styles.languageOptionText}>{language.name}</Text>
                <View style={styles.radioButton}>
                  {selectedLanguage.code === language.code && (
                    <View style={styles.radioButtonSelected} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => setLanguageModalVisible(false)}
            >
              <Text style={styles.continueButtonText}>Continue in {selectedLanguage.name}</Text>
            </TouchableOpacity>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 50,
    zIndex: 10,
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 10,
  },
  logo: {
    width: 120,
    height: 50,
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderColor: "#e9ecef",
    borderWidth: 1,
  },
  languageText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  swiperContainer: {
    flex: 1,
    marginTop: -20, // Shifted content upward
    position: 'relative',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 140,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#008000",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", 
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  illustration: {
    width: width * 0.9,
    height: 200,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    textAlign: "center",
    color: "#555",
    marginHorizontal: 30,
    marginBottom: 20, // Add more space below the description
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  loginButton: {
    backgroundColor: "#008000",
    width: "85%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupButton: {
    borderColor: "#008000",
    borderWidth: 1,
    width: "85%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  signupText: {
    color: "#008000",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 9,
    color: "#777",
    textAlign: "left",
    marginTop: 5,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  linkText: {
    color: "#008000",
    fontWeight: "bold",
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    marginBottom: 15,
    position: "relative",
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  languageOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
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
    borderColor: "#008000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#008000",
  },
  continueButton: {
    backgroundColor: "#008000",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});