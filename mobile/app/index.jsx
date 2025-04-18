import { Redirect } from "expo-router";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Index() {
  const {user, checkAuth, logout, isLoading} = useAuthStore();

  useEffect(() => {
    const init = async () => {
      console.log('Running checkAuth...');
      await checkAuth();
      console.log('CheckAuth completed');
    };
    init();
  }, [])

  if(isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if(user) return (
    <View style={styles.container}>
      <Text>Home {user?.username}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
  else {
    return <Redirect href="/(auth)/login" />
  }
}
