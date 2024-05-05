import { useFonts } from "@expo-google-fonts/inter";
import { Redirect } from "expo-router";
import {
  Inter_400Regular,
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_300Light,
} from "@expo-google-fonts/inter";

import { Text } from "react-native-ui-lib";
export default function Index() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_300Light,
  });
  if (!fontsLoaded) {
    return <Text page>Loading...</Text>;
  }
  // TODO: Check localstore to see if user is already logged in
  return <Redirect href={"auth"} />;
}
