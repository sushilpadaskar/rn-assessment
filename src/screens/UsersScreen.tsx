import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";

type User = {
  id: number;
  name: string;
};

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchUsers = async () => {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
        await AsyncStorage.setItem("users", JSON.stringify(data));
      } else {
        const cached = await AsyncStorage.getItem("users");
        if (cached) setUsers(JSON.parse(cached));
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("UserDetails", { id: item.id })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
});
