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
import { colors, radius, sizing } from "../colors";

const INPUT_MIN_HEIGHT = 120;
const INPUT_MAX_HEIGHT = 280;

type InputContainerProps = {
  onAdd: (text: string) => void;
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
};

export default function InputContainer({
  onAdd,
  isModalVisible,
  setIsModalVisible,
}: InputContainerProps) {
  const [newTask, setNewTask] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(INPUT_MIN_HEIGHT);

  function handleClose() {
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
    setNewTask("");
    setInputHeight(INPUT_MIN_HEIGHT);
    setIsModalVisible(false);
  }

  return (
    <Modal visible={isModalVisible} animationType="slide" transparent={true}>
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
            onPress={handleClose}
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
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 24,
    backgroundColor: colors.bg,
  },
  title: {
    fontFamily: "DMSans_600SemiBold",
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
    fontFamily: "DMSans_400Regular",
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
    fontFamily: "DMSans_600SemiBold",
    fontSize: sizing.text,
    color: "#fff",
  },
  closeButtonText: {
    fontFamily: "DMSans_600SemiBold",
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
