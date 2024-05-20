import { Stack } from "expo-router";
import { Colors, Spacings, Typography } from "react-native-ui-lib";
import { Modal } from "react-native";
import axios from "axios";
import { AuthContextProvider } from "@/context/AuthContext";
import { LocationModalContextProvider } from "@/app/modals/choose_address_modal";
import { PostContextProvider } from "@/context/PostContext";

axios.defaults.baseURL = "https://proj.ruppin.ac.il/cgroup69/prod/api";

Colors.loadColors({
  primaryBlue: "#1C9BD4",
  secondaryBlue: "#3AD2E0",
  white: "whitesmoke",
});

Typography.loadTypographies({
  label: {
    color: "#1C9BD4",
  },
});

Spacings.loadSpacings({
  page: 18,
  button: 18,
  text: 16,
});

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <LocationModalContextProvider>
          <Stack>
            <Stack.Screen
              name="auth"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="modals"
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="home"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </LocationModalContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}
