import { Link } from "expo-router";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Assets, Colors, Spacings as S, View, Text, Button, ButtonProps, Constants, Typography } from "react-native-ui-lib";
import { authStyles } from "./_layout";


export default function WelcomeScreen() {

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.Header}> InventoryEye </Text>
      <Image style={authStyles.logo} source={require('../../images/logo.png')} />
      <Link href="/auth/login" asChild>
        <Button label="Login" labelStyle={authStyles.LoglabelStyle} style={authStyles.LogBtn} />
      </Link>
      <Link href="/auth/register" asChild>
        <Button label="Register" labelStyle={authStyles.labelStyle} style={authStyles.Btn} />
      </Link>
    </View>
  );
}
