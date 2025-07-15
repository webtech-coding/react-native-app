import { Stack } from 'expo-router';
import './global.css';

export default function RootLayout() {

  const {Screen} = Stack

  return (
    <Stack screenOptions={{headerShown:false}}>
      <Screen name='(tabs)' />
    </Stack>
  )
}
