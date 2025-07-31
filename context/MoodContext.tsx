import React, { createContext, useState, useContext, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { MoodEntry } from "../types/mood";

interface MoodContextType {
  moods: MoodEntry[];
  addMood: (mood: string, note?: string) => Promise<void>;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);

  const fetchMoods = async () => {
    const q = query(collection(db, "moods"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const data: MoodEntry[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate ? doc.data().date.toDate() : new Date(),
    })) as MoodEntry[];
    setMoods(data);
  };

  const addMood = async (mood: string, note?: string) => {
    const newEntry = {
      mood,
      date: serverTimestamp(), // ✅ Fix here
      note: note || "",
    };
    await addDoc(collection(db, "moods"), newEntry);
    fetchMoods(); // 🔁 Refresh mood list
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  return (
    <MoodContext.Provider value={{ moods, addMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) throw new Error("useMood must be used within MoodProvider");
  return context;
};
