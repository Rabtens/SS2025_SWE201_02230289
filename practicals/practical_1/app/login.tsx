import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [countryCode, setCountryCode] = useState('BT'); // default as Bhutan
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require("@/assets/images/back.png")} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Welcome to Gojek!</Text>
      <Text style={styles.subtitle}>Enter or create an account in a few easy steps.</Text>

      <Text style={styles.label}>Phone number*</Text>

      <View style={styles.inputContainer}>
        {/* Country Picker */}
        <CountryPicker 
          countryCode={countryCode}
          withCallingCode
          withFlag
          withFilter
          onSelect={(country) => setCountryCode(country.cca2)}
          containerButtonStyle={styles.countryPicker}
        />
        {/* Phone Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => {
          setTimeout(() => navigation.navigate("verify"), 100);
        }}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Terms & Conditions */}
      <Text style={styles.terms}>
        I agree to Gojek's <Text style={styles.link}>Terms of Service</Text> & <Text style={styles.link}>Privacy Policy</Text>.
      </Text>

      {/* Issue with Number */}
      <TouchableOpacity style={styles.issueButton}>
        <Text style={styles.issueText}>Issue with number?</Text>
      </TouchableOpacity>

      {/* Goto Footer */}
      <Text style={styles.footer}>from <Text style={styles.gotoText}>goto</Text></Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 40,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },

  backButton: {
    position: "absolute",
    top: 10,  // Adjust for status bar
    left: 30,  // Left corner
    zIndex: 10,  // Keep it above other elements
  },
  
  backIcon: {
    width: 30,
    height: 30,
  },

  title: { 
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
  },

  subtitle: { 
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },

  label: { 
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  inputContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
  },

  countryPicker: { 
    marginRight: 10,
  },

  input: { 
    flex: 1, 
    fontSize: 16,
  },

  button: { 
    backgroundColor: 'green', 
    padding: 15,
    borderRadius: 50,
    alignItems: 'center', 
    marginTop: 20,
  },
  
  buttonText: { 
    color: 'white', 
    fontSize: 18,
    fontWeight: 'bold',
  },

  terms: { 
    textAlign: 'center', 
    fontSize: 12, 
    color: 'gray', 
    marginTop: 10,
  },

  link: { 
    color: 'green', 
    textDecorationLine: 'underline',
  },

  issueButton: { 
    alignSelf: 'center', 
    marginTop: 10,
  },

  issueText: { 
    color: 'black', 
    fontSize: 14, 
    fontWeight: 'bold',
  },

  footer: { 
    textAlign: 'center', 
    marginTop: 30, 
    fontSize: 12,
    color: 'gray',
  },

  gotoText: { 
    color: 'green', 
    fontWeight: 'bold',
  },
});
