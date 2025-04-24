import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useState, useEffect } from "react";
import { getUser } from "@/shared/services/vanilla/userService";
import { useStore } from "zustand";
import store from "@/shared/store/vanilla";

export default function TabTwoScreen() {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        console.log("User data:", user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  });
  // const globalUserVanilla = useStore(store, (state) => state.user);
  const globalUserVanilla = store.getState();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vanilla Global Store</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>{JSON.stringify(globalUserVanilla)}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
