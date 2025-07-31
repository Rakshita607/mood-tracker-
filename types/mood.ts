export interface MoodEntry {
  id: string;
  mood: string;
  date: Date; // ✅ make sure this is Date, not Timestamp
  note?: string;
}
