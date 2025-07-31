import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useMood } from "../../context/MoodContext";
import Colors from "../../constants/Colors";

const moods = ["😊", "😢", "😡", "😴", "😃"];

export default function LogMoodScreen() {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [note, setNote] = useState("");
  const { addMood } = useMood();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!selectedMood) return;
    await addMood(selectedMood, note);
    router.push("/tabs");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>How are you feeling today?</Text>

      <View style={styles.moodsRow}>
        {moods.map((m) => (
          <TouchableOpacity
            key={m}
            style={[
              styles.moodButton,
              selectedMood === m && styles.selectedMood,
            ]}
            onPress={() => setSelectedMood(m)}
          >
            <Text style={styles.mood}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Write something about your day..."
        placeholderTextColor="#aaa"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity
        style={[styles.saveButton, !selectedMood && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!selectedMood}
      >
        <Text style={styles.saveButtonText}>Save Mood</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    color: Colors.text,
    marginBottom: 36,
  },
  moodsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  moodButton: {
    padding: 18,
    borderRadius: 16,
    margin: 8,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  
  },
  selectedMood: {
    backgroundColor: Colors.selected,
    borderColor: Colors.accent,
    borderWidth: 2,
  },
  mood: {
    fontSize: 34,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 16,
    color: Colors.text,
    minHeight: 100,
    fontSize: 16,
    textAlignVertical: "top",
    marginTop: 12,
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#333",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});
