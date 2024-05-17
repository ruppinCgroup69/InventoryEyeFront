import { Stack } from "expo-router";

export default function ModalsRoot() {
  return (
    <Stack initialRouteName="choose_address_modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="choose_address_modal"
        options={{ headerShown: true, title: "Choose address" }}
      />
    </Stack>
  );
}
