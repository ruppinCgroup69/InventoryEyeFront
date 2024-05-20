import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
export const postStyles = StyleSheet.create({
  postForm: {
    flexDirection: "column",
    padding: 16,
  },
  imageSelectionContainer: {
    padding: 8,
    gap: 8,
    flexDirection: "column",
  },
  postFormContainerSecondary: {
    padding:8,
    flexDirection: "column",
  },
  postContentImageContainer: {
    flexDirection: 'column'
  },
  profileImageContainer: {
    width: 100,
    gap: 8,
    flexDirection: 'row',
    alignItems:'center'
  },
  textFieldLabel: {
    padding: 8,
  },
  postContentField: {
    paddingVertical: 16,
    height: 150,
  },
  postContentFieldSecondary: {
    height: 60,
    paddingVertical: 16,
  },
});

export default function HomeLayout() {
  return (
    <Tabs initialRouteName="posts">
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="posts" />
      <Tabs.Screen name="new_post" />
    </Tabs>
  );
}
