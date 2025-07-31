import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useMood } from "../../context/MoodContext";
import { MoodEntry } from "../../types/mood";
import { format } from "date-fns";

// Modern vibrant color palette
const vibrantColors = [
  "#FFB6B9", // soft coral pink
  "#FFDAC1", // light peach
  "#E2F0CB", // soft green
  "#B5EAD7", // mint
  "#C7CEEA", // periwinkle
];

const HistoryScreen = () => {
  const { moods } = useMood();

  const renderItem = ({ item, index }: { item: MoodEntry; index: number }) => {
    let formattedDate = "Invalid Date";
    try {
      const dateObj = new Date(item.date);
      if (!isNaN(dateObj.getTime())) {
        formattedDate = format(dateObj, "dd MMM yyyy");
      }
    } catch (err) {
      console.error("Error formatting date:", err);
    }

    const backgroundColor = vibrantColors[index % vibrantColors.length];

    return (
      <View style={[styles.item, { backgroundColor }]}>
        <View style={styles.row}>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.emoji}>{item.mood}</Text>
        </View>
        {item.note ? <Text style={styles.note}>📝 {item.note}</Text> : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood History</Text>
      <FlatList
        data={moods}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6", // soft neutral off-white background
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 30,
  },
  item: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#aaa",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    fontWeight: "600",
    color: "#34495E",
  },
  emoji: {
    fontSize: 28,
  },
  note: {
    marginTop: 10,
    fontSize: 15,
    color: "#2F3542",
    fontStyle: "italic",
  },
});
