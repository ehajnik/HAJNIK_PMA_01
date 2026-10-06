import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, sizing } from "../colors";

type TaskProps = {
  id: string;
  text: string;
  completed: boolean;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
};

export default function Task({ id, text, completed, onDelete, onComplete }: TaskProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.task,
        completed && styles.taskCompleted,
        pressed && styles.taskPressed,
      ]}
    >
      <Text style={[styles.taskText, completed && styles.taskTextCompleted]}>
        {text}
      </Text>
      <View style={styles.taskActionButtonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            styles.checkboxButton,
            completed && styles.checkboxButtonCompleted,
            pressed && styles.checkboxButtonPressed,
          ]}
          onPress={() => onComplete(id)}
          hitSlop={8}
        >
          <Ionicons
            name="checkmark"
            size={sizing.icon}
            color={colors.surface}
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            styles.closeButton,
            pressed && styles.closeButtonPressed,
          ]}
          onPress={() => onDelete(id)}
          hitSlop={8}
        >
          <Ionicons name="close" size={sizing.icon} color={colors.surface} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: colors.surface,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: radius.md,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  taskCompleted: {
    opacity: 0.45,
    backgroundColor: colors.completed,
    borderColor: colors.completedBorder,
  },
  taskText: {
    flex: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: sizing.text,
    lineHeight: sizing.textLineHeight,
    color: colors.text,
  },
  taskTextCompleted: {
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  taskActionButtonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: sizing.actionButton,
    height: sizing.actionButton,
    borderRadius: radius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxButton: {
    backgroundColor: colors.add,
  },
  checkboxButtonCompleted: {
    backgroundColor: colors.muted,
  },
  checkboxButtonPressed: {
    backgroundColor: colors.addPressed,
  },
  taskPressed: {
    borderColor: colors.button,
  },
  closeButton: {
    backgroundColor: colors.danger,
  },
  closeButtonPressed: {
    backgroundColor: colors.closePressed,
  },
});
