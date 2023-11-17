import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/libs/supabase";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    "poppins-b": require("../assets/fonts/Poppins-Bold.ttf"),
    "poppins-sb": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const debouncedSession = useDebounce(session, 1000); // delay of 1 second

  useEffect(() => {
    if (!session) router.push("/(modals)/login");
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    // Now this effect runs whenever debouncedSession changes,
    // which is at most once every second
    if (debouncedSession) {
      // handle session change
      if (session) router.push("/");
    }
  }, [debouncedSession]);

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/login"
          options={{
            title: "Login",
            headerTitleStyle: { fontFamily: "poppins-sb" },
            presentation: "modal",
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="(modals)/signup"
          options={{
            title: "Signup",
            headerTitleStyle: { fontFamily: "poppins-sb" },
            presentation: "modal",
            animation: "fade",
          }}
        />
        <Stack.Screen name="recipes/[id]" options={{ headerTitle: "" }} />
      </Stack>
    </ThemeProvider>
  );
}
