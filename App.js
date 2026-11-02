import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(prev => prev + 1);
  }

  function decrement() {
    setCount(prev => Math.max(prev - 1, 0));
  }

  function reset() {
    setCount(0);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Počítadlo objednávok</Text>
      <Text style={[styles.count, count >= 5 && styles.limitReachedCount]}>{count}</Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsRow}>
          <Pressable style={[styles.button, count === 0 && styles.disabledButton]} onPress={decrement} disabled={count === 0}>
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={increment}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>
        <Pressable style={[styles.button, styles.resetButton]} onPress={reset}>
          <Text style={styles.buttonText}>Vynulovať</Text>
        </Pressable>
      </View>
      {count >= 5 && <Text style={styles.limitReached}>Dosiahnutý limit</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
  },
  count: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonsContainer: {
    width: 140,
    gap: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#4e7ddb",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  resetButton: {
    flex: 0,
  },
  disabledButton: {
    opacity: 0.5,
  },
  limitReached: {
    fontSize: 14,
    textAlign: "center",
    color: "#e74c3c",
    marginTop: 16,
  },
  limitReachedCount: {
    color: "#e74c3c",
  }
});
