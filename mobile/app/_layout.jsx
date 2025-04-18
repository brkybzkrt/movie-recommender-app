import { Stack,useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "./components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useSegments } from "expo-router";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segment = useSegments();

  const {checkAuth, user,token} = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[]);

  useEffect(() => {
    const inAuth = segment[0] === "(auth)";
    const isSignIn = user && token;
    if(!isSignIn && !inAuth) {
      router.replace("/(auth)");
    }
    else if(isSignIn && inAuth) {
      router.replace("/(tabs)");
    }
  },[user,token,segment]);



  return (
  <SafeAreaProvider>
    <SafeScreen>
    <Stack  screenOptions={{headerShown: false}}> 
  <Stack.Screen name="(auth)"  /> 
  <Stack.Screen name="(tabs)"  /> 
  </Stack>
  </SafeScreen>
  <StatusBar style="dark"/>
  </SafeAreaProvider>
  )
}
