import {
  Stack,
  useRouter,
  useSegments,
  useRootNavigationState,
  SplashScreen,
} from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import COLORS from "../constants/colors";
import { ActivityIndicator, StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  const { checkAuth, user, token } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth();
      setIsReady(true);
    };
    initializeAuth();
  }, []);

  // // handle navigation based on the auth state
  useEffect(() => {
    if (!isReady || !navigationState?.key) return;

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    console.log(segments, inAuthScreen, isSignedIn);

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [user, token, segments, navigationState, isReady]);

  if (!isReady) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={COLORS.background}
      />
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
