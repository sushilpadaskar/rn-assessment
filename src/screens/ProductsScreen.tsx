import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useCartStore, Product } from "../store/cartStore";

export default function ProductsScreen() {
  const addToCart = useCartStore((state) => state.addToCart);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const generateProducts = (start: number, count: number): Product[] => {
    return Array.from({ length: count }).map((_, i) => ({
      id: start + i,
      name: `Product ${start + i}`,
      price: Math.floor(Math.random() * 100) + 1,
    }));
  };

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newProducts = generateProducts((page - 1) * 100 + 1, 100);
      setProducts((prev) => [...prev, ...newProducts]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadMore();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.item}>
      <Text>
        {item.name} - ${item.price}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        initialNumToRender={20}
        maxToRenderPerBatch={50}
        windowSize={10}
        removeClippedSubviews
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: { color: "#fff" },
});
