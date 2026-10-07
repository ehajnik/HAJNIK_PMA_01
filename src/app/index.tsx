import * as Crypto from "expo-crypto";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputContainer from "../components/InputContainer";
import Task from "../components/Task";
import { colors, sizing } from "../constants";

type TaskItem = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Index() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

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
      <View style={styles.tasksContainer}>
        <FlatList
          data={sortedTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Task
              {...item}
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
        <InputContainer onAdd={handleAddTask} />
      </View>
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
    fontWeight: "700",
    fontSize: 34,
    color: colors.text,
    marginBottom: 20,
    marginTop: 8,
  },
  emptyText: {
    fontSize: sizing.text,
    color: colors.muted,
    marginTop: 8,
  },
});
