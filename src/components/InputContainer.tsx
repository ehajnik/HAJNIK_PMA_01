import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radius, sizing } from "../constants";

const INPUT_MIN_HEIGHT = 120;
const INPUT_MAX_HEIGHT = 280;

type InputContainerProps = {
  onAdd: (text: string) => void;
};

export default function InputContainer({ onAdd }: InputContainerProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(INPUT_MIN_HEIGHT);

  function resetForm() {
    setNewTask("");
    setInputHeight(INPUT_MIN_HEIGHT);
    setIsModalVisible(false);
  }

  function handleAdd() {
    const text = newTask.trim();
    if (!text) {
      return;
    }

    onAdd(text);
    resetForm();
  }

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.openButton,
          pressed && styles.openButtonPressed,
        ]}
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name="add" size={sizing.icon} color="#fff" />
        <Text style={styles.openButtonText}>Nová úloha</Text>
      </Pressable>
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <SafeAreaView style={styles.inputContainer}>
          <View style={styles.header}>
            <Ionicons name="pencil" size={28} color={colors.text} />
            <Text style={styles.title}>Pridaj novú úlohu</Text>
          </View>
          <TextInput
            style={[
              styles.input,
              { height: inputHeight },
              isFocused && styles.focused,
            ]}
            maxLength={200}
            placeholder="Pridaj novú úlohu"
            placeholderTextColor={colors.muted}
            value={newTask}
            onChangeText={setNewTask}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            multiline
            textAlignVertical="top"
            onContentSizeChange={(event) => {
              const nextHeight = event.nativeEvent.contentSize.height;
              setInputHeight(
                Math.min(
                  INPUT_MAX_HEIGHT,
                  Math.max(INPUT_MIN_HEIGHT, nextHeight),
                ),
              );
            }}
          />
          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.addButton,
                pressed && styles.addButtonPressed,
              ]}
              onPress={handleAdd}
            >
              <Ionicons name="add" size={sizing.icon} color="#fff" />
              <Text style={styles.addButtonText}>Pridať</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.closeButtonPressed,
              ]}
              onPress={resetForm}
            >
              <Ionicons
                name="close"
                size={sizing.icon}
                color={colors.closeText}
              />
              <Text style={styles.closeButtonText}>Zavrieť</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  openButton: {
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
  openButtonPressed: {
    opacity: 0.8,
  },
  openButtonText: {
    fontWeight: "600",
    fontSize: sizing.text,
    color: "#fff",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 24,
    backgroundColor: colors.bg,
  },
  title: {
    fontWeight: "600",
    fontSize: 30,
    color: colors.text,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    fontSize: sizing.text,
    lineHeight: sizing.textLineHeight,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  addButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: sizing.buttonHeight,
    borderRadius: radius.md,
    gap: 8,
    backgroundColor: colors.add,
  },
  addButtonPressed: {
    backgroundColor: colors.addPressed,
  },
  closeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: sizing.buttonHeight,
    borderRadius: radius.md,
    gap: 8,
    backgroundColor: colors.close,
  },
  closeButtonPressed: {
    backgroundColor: colors.closePressed,
  },
  addButtonText: {
    fontWeight: "600",
    fontSize: sizing.text,
    color: "#fff",
  },
  closeButtonText: {
    fontWeight: "600",
    fontSize: sizing.text,
    color: colors.closeText,
  },
  focused: {
    borderColor: colors.button,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
