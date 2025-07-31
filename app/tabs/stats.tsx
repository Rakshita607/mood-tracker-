import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { PieChart } from 'react-native-chart-kit';

interface MoodEntry {
  emoji: string;
  note?: string;
  date: string;
}

const StatsScreen = () => {
  const [moodCounts, setMoodCounts] = useState<{ [key: string]: number }>({});
  const [totalMoods, setTotalMoods] = useState<number>(0);

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'moods'));
        const entries: MoodEntry[] = querySnapshot.docs.map((doc) => doc.data() as MoodEntry);

        const counts: { [key: string]: number } = {};
        entries.forEach((entry) => {
          counts[entry.emoji] = (counts[entry.emoji] || 0) + 1;
        });

        setMoodCounts(counts);
        setTotalMoods(entries.length);
      } catch (error) {
        console.log('Error fetching mood stats:', error);
      }
    };

    fetchMoodData();
  }, []);

  const chartData = Object.entries(moodCounts).map(([emoji, count], index) => ({
    name: emoji,
    population: count,
    color: chartColors[index % chartColors.length],
    legendFontColor: '#333',
    legendFontSize: 14,
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mood Stats</Text>

      {chartData.length > 0 ? (
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: () => '#000',
            labelColor: () => '#000',
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <Text>No data to show.</Text>
      )}

      {chartData.length > 0 && (
        <View style={styles.summary}>
          <Text style={styles.total}>Total Moods Logged: {totalMoods}</Text>
          {Object.entries(moodCounts).map(([emoji, count]) => (
            <Text key={emoji} style={styles.emojiSummary}>
              {emoji}: {count}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default StatsScreen;

const chartColors = ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9800', '#9C27B0', '#00BCD4'];

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summary: {
    marginTop: 20,
    width: '100%',
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  emojiSummary: {
    fontSize: 16,
    marginBottom: 4,
  },
});
