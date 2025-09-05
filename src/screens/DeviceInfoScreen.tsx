import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Device from "expo-device";

export default function DeviceInfoScreen() {
  const [osVersion, setOsVersion] = useState<string | null>(null);

  useEffect(() => {
    setOsVersion(Device.osVersion ?? "Unknown");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Info</Text>
      <Text style={styles.info}>OS: {Device.osName}</Text>
      <Text style={styles.info}>OS Version: {osVersion}</Text>
      <Text style={styles.info}>Brand: {Device.brand}</Text>
      <Text style={styles.info}>Model: {Device.modelName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 8 },
});
