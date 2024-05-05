import { Link } from "expo-router";
import { TextField, View, Button} from "react-native-ui-lib";
import { Text, Image } from "react-native-ui-lib";
import { Linking } from "react-native";
import { authStyles } from "./_layout";

export default function LoginScreen() {

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.SecHeader}>Login</Text>
      <Image style={{ width: 170, height: 170}} source={require('../../images/logo.png')} />
      <View style={{marginTop:20}}>
        <Text style={authStyles.LogLabel}>Email:</Text>
        <TextField
          keyboardType="visible-password"
          placeholder="Enter Your Email"
          fieldStyle={authStyles.textField}
          enableErrors
          validate={["required"]}
          validationMessage={["Enter Your Email"]}
          placeholderTextColor={"lightgray"}
        />
      </View>
      <View style={{marginTop:10,marginBottom:0}}>
        <Text style={authStyles.LogLabel}>Password:</Text>
        <TextField
          keyboardType="visible-password"
          placeholder="Enter Your Password"
          fieldStyle={authStyles.textField}
          enableErrors
          validate={["required"]}
          validationMessage={["Enter Your Password"]}
          placeholderTextColor={"lightgray"}
        />
      </View>
      <View style={{marginBottom:10}}>
        <Text style={{fontFamily: "Inter_600SemiBold"}}>I forgot my password</Text>
      </View>
      <View style={{marginTop:5}} >
      <Link href="/auth/login" asChild>
        <Button label="Login" labelStyle={authStyles.LoginlabelStyle} style={authStyles.LoginBtn} />
      </Link>
      </View>
      <View style={{flexDirection: "row",}}>
        <Text style={{fontFamily: "Inter_600SemiBold"}}>Don't have an account yet? </Text>
        <Link href="/auth/register" asChild>
          <Text style={{ color: '#003b6f', fontFamily: "Inter_600SemiBold" }}>
          Register Now!
          </Text>
        </Link>
        </View>
    </View>
  );
}
