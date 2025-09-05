import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "authToken";

export default function TokenScreen() {
  const [token, setToken] = useState<string | null>(null);

  const saveToken = async () => {
    await SecureStore.setItemAsync(TOKEN_KEY, "dummy-auth-token-123");
    loadToken();
  };

  const loadToken = async () => {
    const saved = await SecureStore.getItemAsync(TOKEN_KEY);
    setToken(saved);
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Token Storage</Text>
      <Button title="Save Dummy Token" onPress={saveToken} />
      <Text style={styles.token}>Stored Token: {token ?? "No token yet"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  token: { marginTop: 20, fontSize: 16, color: "blue" },
});
