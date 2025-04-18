import { View, Text } from 'react-native'
import React from 'react'
import { useAuthStore } from '../../store/authStore'
export default function Home() {
  const {user} = useAuthStore();
  return (
    <View>
      <Text>Home {user?.username}</Text>
    </View>
  )
}