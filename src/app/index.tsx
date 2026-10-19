import * as Crypto from "expo-crypto";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Sortable, {
  type SortableGridDragEndParams,
  type SortableGridRenderItem,
} from "react-native-sortables";
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
  const scrollableRef = useAnimatedRef<Animated.FlatList<string>>();

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

  const handleDragEnd = useCallback(
    ({ data }: SortableGridDragEndParams<TaskItem>) => {
      setTasks(data);
    },
    [],
  );

  const renderTask = useCallback<SortableGridRenderItem<TaskItem>>(
    ({ item }) => (
      <Task
        {...item}
        onDelete={handleDeleteTask}
        onComplete={handleCompleteTask}
      />
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.appContainer} edges={["top", "bottom"]}>
      <Sortable.PortalProvider>
        <View style={styles.tasksContainer}>
          <Text style={styles.tasksTitle}>Úlohy</Text>
          <Animated.FlatList
            ref={scrollableRef}
            data={tasks.length === 0 ? [] : ["grid"]}
            keyExtractor={(item) => item}
            renderItem={() => (
              <Sortable.Grid
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={renderTask}
                columns={1}
                rowGap={10}
                customHandle
                onDragEnd={handleDragEnd}
                scrollableRef={scrollableRef}
                dragActivationDelay={150}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Zatiaľ žiadne úlohy</Text>
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          />
          <InputContainer onAdd={handleAddTask} />
        </View>
      </Sortable.PortalProvider>
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
  scrollContent: {
    paddingBottom: 88,
    flexGrow: 1,
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
