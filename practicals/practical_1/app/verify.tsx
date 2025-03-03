import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require("@/assets/images/back.png")} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.headText}>Choose verification method</Text>
        
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("otp")}>
          <Image source={require("@/assets/images/message.png")} style={styles.icon} />
          <Text style={styles.optionText}>OTP via E-mail</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("otp")}>
          <Image source={require("@/assets/images/watsappp.png")} style={styles.icon} />
          <Text style={styles.optionText}>OTP via WhatsApp</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("otp")}>
          <Image source={require("@/assets/images/sms.png")} style={styles.icon} />
          <Text style={styles.optionText}>OTP via SMS</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>from <Text style={styles.gotoText}>goto</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, alignItems: 'center', paddingVertical: 10 },
  backButton: { position: "absolute", top: 10, left: 40, zIndex: 10 },
  backIcon: { width: 30, height: 30 },
  headText: { marginTop: 40, fontSize: 18, fontWeight: '900', marginBottom: 20, marginRight: 60 },
  optionButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#f5f5f5", padding: 15, marginVertical: 10, borderRadius: 10, width: "80%" },
  icon: { width: 24, height: 24, marginRight: 10 },
  optionText: { fontSize: 16 },
  footerContainer: { position: 'absolute', bottom: 20, alignSelf: 'center' },
  footer: { fontSize: 14 },
  gotoText: { color: 'green', fontWeight: 'bold' },
});