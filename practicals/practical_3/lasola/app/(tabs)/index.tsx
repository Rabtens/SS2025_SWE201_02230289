import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { getUser } from "@/shared/services/userService";
import { useState, useEffect } from "react";
import { useStore } from "@/shared/store";
import { DocumentData } from "firebase/firestore";

export default function TabOneScreen() {
  const [user, setUser] = useState<DocumentData | undefined>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        console.log("User data:", user);
        setUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  });

  const updateUser = useStore((state) => state.updateUser);
  updateUser(user);
  const globalUser = useStore((state) => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Component useState Store</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>{JSON.stringify(user)}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>Global Store</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>{JSON.stringify(globalUser)}</Text>
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
