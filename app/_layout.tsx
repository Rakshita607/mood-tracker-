import { Slot } from 'expo-router';
import { MoodProvider } from '../context/MoodContext';

export default function RootLayout() {
  return (
    <MoodProvider>
      <Slot />
    </MoodProvider>
  );
}
