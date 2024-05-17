import { Link } from "expo-router";
import { View, Text,Image,Button } from "react-native-ui-lib";
import { authStyles } from "./_layout";
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.SecHeader}>Registration</Text>
      <Image style={{width: 170,height: 170}} source={require('../../images/logo.png')} />
      <Text style={authStyles.label}> Choose an account type </Text>
      <Link href="auth/customerRegister" asChild>
        <Button label="Customer" labelStyle={authStyles.labelStyle} style={authStyles.Btn} />
      </Link>
      <Link href="auth/supplierRegister" asChild>
        <Button label="Supplier" labelStyle={authStyles.labelStyle} style={authStyles.Btn} />
      </Link>
      <Link href="auth/welcome" asChild>
      <Ionicons style={authStyles.backIcon} name="arrow-back-circle-outline" size={
        26} />
      </Link>
    </View>
  );
}
