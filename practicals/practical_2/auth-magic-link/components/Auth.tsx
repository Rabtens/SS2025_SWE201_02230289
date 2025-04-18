import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { makeRedirectUri } from "expo-auth-session";
import { useRouter } from "expo-router";

// Create a redirect URI for email magic link redirection
const redirectTo = makeRedirectUri();

// Manage session auto-refresh on app state changes
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Listen for auth state changes and redirect on SIGNED_IN
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        router.replace("./app/Home"); // Navigate to home
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Function to handle magic link sign-in (email)
  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Check your email for the magic link!");
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email Address"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Send Magic Link (Email)"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});