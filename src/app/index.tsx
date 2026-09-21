import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [tasks, setTasks] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);
  const [newTask, setNewTask] = useState("");

  function handleNewTask(text: string) {
    setNewTask(text);
  }

  function handleAddTask() {
    const text = newTask.trim();
    if (!text) {
      return;
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), text, completed: false },
    ]);
    setNewTask("");
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.tasksContainer}>
        <View style={styles.tasksHeader}>
          <Text style={styles.tasksTitle}>Úlohy</Text>
        </View>
        {tasks.map((task) => (
          <View key={task.id} style={styles.task}>
            <Text style={styles.taskText}>{task.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pridaj novú úlohu"
          value={newTask}
          onChangeText={handleNewTask}
        />
        <Pressable style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Pridať</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "Roboto",
    fontSize: 16,
  },
  tasksContainer: {
    flex: 10,
    backgroundColor: "#f5f5f5",
    fontFamily: "Roboto",
    fontSize: 16,
  },
  tasksHeader: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tasksTitle: {
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 16,
  },
  inputContainer: {
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    alignItems: "center",
  },
  input: {
    flex: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 16,
    fontFamily: "Roboto",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000",
    flex: 1,
    color: "#fff",
    padding: 8,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 52,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 16,
  },
  task: {
    padding: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  taskText: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#000",
  },
});
