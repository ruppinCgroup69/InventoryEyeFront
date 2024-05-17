import React from 'react';
import { Stack } from "expo-router";
import { Colors, Spacings, Typography } from "react-native-ui-lib";
import axios from "axios";
import { AuthContextProvider } from "@/context/AuthContext";
import { LocationModalContextProvider } from "./modals/choose_address_modal";

axios.defaults.baseURL = "http://10.100.102.6:5001/api";

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
      <LocationModalContextProvider>
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="modals" options={{ presentation: "modal", headerShown: false }} />
        </Stack>
      </LocationModalContextProvider>
    </AuthContextProvider>
  );
}