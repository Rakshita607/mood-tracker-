import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MOODS } from '../context/MoodContext';
import type { MoodEntry } from '../context/MoodContext';

export default function MoodItem({ item }: { item: MoodEntry }) {
  const meta = MOODS.find(m => m.key === item.mood);
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{meta?.emoji ?? '🙂'}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          {meta?.label ?? item.mood}  •  <Text style={styles.date}>{item.date}</Text>
        </Text>
        {!!item.note && <Text style={styles.note}>“{item.note}”</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', gap: 12, padding: 12,
    borderRadius: 12, borderWidth: 1, borderColor: '#ddd',
    marginBottom: 10, backgroundColor: '#fff',
  },
  emoji: { fontSize: 28 },
  title: { fontSize: 16, fontWeight: '600' },
  date: { color: '#666' },
  note: { marginTop: 4, fontStyle: 'italic', color: '#444' },
});
