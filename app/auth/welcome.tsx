import { Link, Redirect, router } from "expo-router";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  Assets,
  Colors,
  Spacings as S,
  View,
  Text,
  Button,
  ButtonProps,
  Constants,
  Typography,
} from "react-native-ui-lib";
import { authStyles } from "./_layout";
import { useAuth } from "@/context/AuthContext";

export default function WelcomeScreen() {
  const { user } = useAuth();

 // if (user) {
  //  return <Redirect href="/home" />;
 // }

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.Header}> InventoryEye </Text>
      <Image style={authStyles.logo} source={require("../../images/logo.png")} />
      <Button
        label="Login"
        onPress={() => router.navigate("/auth/login")}
        labelStyle={authStyles.LoglabelStyle}
        style={authStyles.LogBtn}
      />
      <Button
        label="Register"
        onPress={() => router.navigate("/auth/register")}
        labelStyle={authStyles.labelStyle}
        style={authStyles.Btn}
      />
    </View>
  );
}
