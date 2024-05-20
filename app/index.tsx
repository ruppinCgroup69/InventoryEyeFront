import { useAuth } from "@/context/AuthContext";
import { useFonts } from "@expo-google-fonts/inter";
import {
  Inter_400Regular,
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_300Light,
} from "@expo-google-fonts/inter";
import { Redirect } from "expo-router";

import { Text } from "react-native-ui-lib";
export default function Index() {
  const { user } = useAuth();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_300Light,
  });
  if (!fontsLoaded) {
    return <Text page>Loading...</Text>;
  }
  if (user) {
    return <Redirect href={"home"} />;
  }

  return <Redirect href={"auth"} />;
}
