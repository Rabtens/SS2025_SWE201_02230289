import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar, 
  Image, 
  Dimensions, 
  FlatList,
  Modal,
  Animated
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const flatListRef = useRef(null);
  const slideUpAnimation = useRef(new Animated.Value(0)).current;
  
  const images = [
    { 
      id: '1', 
      source: require("/home/kuenzangrabten/Desktop/SS2025_SWE201_02230289/practicals/practical_1/assets/images/image1.png"),
      title: "Get going with us",
      description: "Use GoCar to get across town – from anywhere, at any time."
    },
    { 
      id: '2', 
      source: require("/home/kuenzangrabten/Desktop/SS2025_SWE201_02230289/practicals/practical_1/assets/images/image2.png"),
      title: "Welcome to Gojek!",
      description: "We're your go-to app for hassle-free commutes."
    },
    { 
      id: '3', 
      source: require("/home/kuenzangrabten/Desktop/SS2025_SWE201_02230289/practicals/practical_1/assets/images/image3.png"),
      title: "Rides for all",
      description: "Up to three stops with every trip – perfect for travel with friends and family."
    }
  ];
  
  // Navigate to login screen
  const handleLoginPress = () => {
    navigation.navigate('Login'); // Navigate to the Login screen
  };
  
  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex === 2) {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: 0,
        });
      } else {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: activeIndex + 1,
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);
  
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };
  
  // Function to navigate to a specific dot when tapped
  const goToSlide = (index) => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: index,
    });
  };
  
  // Animation for bottom sheet modal
  const toggleLanguageModal = () => {
    if (languageModalVisible) {
      // Close animation
      Animated.timing(slideUpAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setLanguageModalVisible(false);
      });
    } else {
      // Open animation
      setLanguageModalVisible(true);
      Animated.timing(slideUpAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  
  const selectLanguage = (language) => {
    setSelectedLanguage(language);
  };
  
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slideContainer}>
        <View style={styles.imageWrapper}>
          <Image source={item.source} style={styles.illustration} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };
  
  // Calculate modal translation based on animation value
  const translateY = slideUpAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });
  
  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusBarContainer}>
        <Text style={styles.statusText}>9:41 AM</Text>
        <View style={styles.headerContainer}>
          <Image
            source={require("/home/kuenzangrabten/Desktop/SS2025_SWE201_02230289/practicals/practical_1/assets/images/gojek.png")}
            style={styles.logo}
          />
          <TouchableOpacity
            style={styles.languageButton}
            onPress={toggleLanguageModal}
          >
            <Ionicons name="globe-outline" size={16} color="#008000" style={styles.globeIcon} />
            <Text style={styles.languageText}>{selectedLanguage}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statusIcons}>
          <Ionicons name="wifi" size={16} color="#000" />
          <Ionicons name="battery-full" size={16} color="#000" />
        </View>
      </View>
      
      {/* Spacer to push content down */}
      <View style={styles.topSpacer} />
      
      {/* Main Content Container */}
      <View style={styles.contentContainer}>
        {/* Image Slider */}
        <FlatList
          ref={flatListRef}
          data={images}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
        
        {/* Pagination Dots - Now Clickable */}
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                { opacity: activeIndex === index ? 1 : 0.3 }
              ]}
              onPress={() => goToSlide(index)}
              activeOpacity={0.7}
            >
              <View />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Bottom Section - Buttons and Terms */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>I'm new, sign me up</Text>
        </TouchableOpacity>
        
        {/* Terms & Privacy */}
        <Text style={styles.termsText}>
          By logging in or registering, you agree to our <Text style={styles.linkText}>Terms of service</Text> and <Text style={styles.linkText}>Privacy policy</Text>.
        </Text>
      </View>
      
      {/* Language Selection Modal - Bottom Sheet Style */}
      <Modal
        transparent={true}
        visible={languageModalVisible}
        animationType="none"
        onRequestClose={() => {
          toggleLanguageModal();
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.modalBackdrop} 
            activeOpacity={1} 
            onPress={toggleLanguageModal}
          />
          <Animated.View 
            style={[
              styles.bottomSheetContent,
              { transform: [{ translateY }] }
            ]}
          >
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Change language</Text>
              <Text style={styles.modalSubtitle}>Which language do you prefer?</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleLanguageModal}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            {/* Cartoon Characters Image */}
            <View style={styles.cartoonContainer}>
              {/* No need to add an actual image, this is just a placeholder for the colored background */}
            </View>
            {/* Language Options */}
            <View style={styles.languagesList}>
              <TouchableOpacity
                style={styles.languageOption}
                onPress={() => selectLanguage("English")}
              >
                <Text style={styles.languageText}>English</Text>
                <View style={styles.radioButton}>
                  {selectedLanguage === "English" && <View style={styles.radioButtonInner} />}
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.languageOption}
                onPress={() => selectLanguage("Bahasa Indonesia")}
              >
                <Text style={styles.languageText}>Bahasa Indonesia</Text>
                <View style={styles.radioButton}>
                  {selectedLanguage === "Bahasa Indonesia" && <View style={styles.radioButtonInner} />}
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.languageOption}
                onPress={() => selectLanguage("Tiếng Việt")}
              >
                <Text style={styles.languageText}>Tiếng Việt</Text>
                <View style={styles.radioButton}>
                  {selectedLanguage === "Tiếng Việt" && <View style={styles.radioButtonInner} />}
                </View>
              </TouchableOpacity>
            </View>
            {/* Continue Button */}
            <TouchableOpacity
              style={styles.continueButton}
              onPress={toggleLanguageModal}
            >
              <Text style={styles.continueButtonText}>Continue in {selectedLanguage}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  statusBarContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 60,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: -5,
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    alignSelf: "flex-start",
    marginLeft: -30,
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  globeIcon: {
    marginRight: 4,
  },
  languageText: {
    fontSize: 14,
    color: "#008000",
    fontWeight: "500",
  },
  statusIcons: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    position: "absolute",
    right: 20,
    top: 10,
  },
  topSpacer: {
    height: 40, // Add space at the top to push content down
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center", // Center content vertically
    alignItems: "center",
  },
  slideContainer: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  imageWrapper: {
    width: width * 0.85,
    height: 200,
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 35, // Increased space between image and title
    // Adding a slight shadow - remove if not needed
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16, // Increased space between title and description
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginHorizontal: 20,
    marginBottom: 30, // Increased space after description
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 0,
    marginBottom: 30, // Increased space after dots
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#008000",
    marginHorizontal: 5,
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "auto", // Push to bottom of available space
    paddingBottom: 20,
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
    marginBottom: 20,
  },
  signupText: {
    color: "#008000",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 30,
  },
  linkText: {
    color: "#008000",
    fontWeight: "bold",
  },
  
  // Bottom Sheet Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
  },
  modalHeader: {
    width: '100%',
    position: 'relative',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#aaa',
    lineHeight: 24,
  },
  cartoonContainer: {
    width: '100%',
    height: 110,
    backgroundColor: '#e6f7ff', // Light blue background
    borderRadius: 10,
    marginVertical: 15,
  },
  languagesList: {
    width: '100%',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  languageText: {
    fontSize: 16,
    color: '#000',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#008000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#008000',
  },
  continueButton: {
    backgroundColor: '#008000',
    width: '100%',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});