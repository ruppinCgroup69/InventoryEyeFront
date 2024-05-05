import { Stack } from "expo-router";
import { Colors, Spacings, Typography } from "react-native-ui-lib";

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
    <Stack>
      <Stack.Screen
        name="auth"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
