import * as Crypto from "expo-crypto";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import InputContainer from "../components/InputContainer";
import Task from "../components/Task";
import { colors, radius, sizing } from "../colors";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  function handleDeleteTask(id: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function handleAddTask(text: string) {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Crypto.randomUUID(), text, completed: false },
    ]);
  }

  function handleCompleteTask(id: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  const sortedTasks = [...tasks].sort(
    (a, b) => Number(a.completed) - Number(b.completed),
  );

  return (
    <SafeAreaView style={styles.appContainer} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.tasksContainer}
        keyboardVerticalOffset={10}
      >
        <FlatList
          data={sortedTasks}
          keyExtractor={(item: Task) => item.id}
          renderItem={({ item }: { item: Task }) => (
            <Task
              id={item.id}
              text={item.text}
              completed={item.completed}
              onDelete={handleDeleteTask}
              onComplete={handleCompleteTask}
            />
          )}
          ListHeaderComponent={<Text style={styles.tasksTitle}>Úlohy</Text>}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Zatiaľ žiadne úlohy</Text>
          }
          showsVerticalScrollIndicator={false}
        />
        <Pressable style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]} onPress={() => setIsModalVisible(true)}>
          <Ionicons name="add" size={sizing.icon} color="#fff" />
          <Text style={styles.addButtonText}>Nová úloha</Text>
        </Pressable>
      </KeyboardAvoidingView>
      <InputContainer onAdd={handleAddTask} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  tasksContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  tasksTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 34,
    color: colors.text,
    marginBottom: 20,
    marginTop: 8,
  },
  emptyText: {
    fontFamily: "DMSans_400Regular",
    fontSize: sizing.text,
    color: colors.muted,
    marginTop: 8,
  },
  addButtonText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: sizing.text,
    color: "#fff",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: sizing.buttonHeight,
    paddingHorizontal: 18,
    gap: 8,
    backgroundColor: colors.button,
    borderRadius: radius.pill,
  },
  addButtonPressed: {
    opacity: 0.8,
  },
});
